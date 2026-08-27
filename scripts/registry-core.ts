import * as fs from "node:fs/promises"
import * as path from "node:path"

const ITEM_NAME_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
const REGISTRY_ITEM_TYPES = new Set([
    "registry:ui",
    "registry:lib",
    "registry:hook",
    "registry:component",
    "registry:style",
])
const REGISTRY_FILE_TYPES = new Set([
    "registry:ui",
    "registry:lib",
    "registry:hook",
    "registry:component",
])

export interface RegistryFile {
    path: string
    type: string
}

export interface RegistryItem {
    name: string
    type: string
    description?: string
    dependencies?: string[]
    devDependencies?: string[]
    registryDependencies?: string[]
    files: RegistryFile[]
}

export interface Registry {
    name: string
    homepage: string
    items: RegistryItem[]
}

interface GeneratedRegistryFile extends RegistryFile {
    content: string
}

interface GeneratedRegistryItem extends Omit<RegistryItem, "files"> {
    $schema: string
    files: GeneratedRegistryFile[]
}

interface RegistryIndexItem {
    name: string
    type: string
    description?: string
    dependencies?: string[]
    registryDependencies?: string[]
}

export interface RegistryArtifacts {
    files: Map<string, string>
    itemCount: number
}

function fail(message: string): never {
    throw new Error(`Invalid registry: ${message}`)
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value)
}

function requiredString(value: unknown, field: string): string {
    if (typeof value !== "string" || value.trim() === "") {
        fail(`${field} must be a non-empty string.`)
    }
    return value
}

function optionalString(value: unknown, field: string): string | undefined {
    if (value === undefined) return undefined
    return requiredString(value, field)
}

function optionalStringArray(value: unknown, field: string): string[] | undefined {
    if (value === undefined) return undefined
    if (!Array.isArray(value)) fail(`${field} must be an array.`)

    const entries = value.map((entry, index) => requiredString(entry, `${field}[${index}]`))
    if (new Set(entries).size !== entries.length) fail(`${field} contains duplicate entries.`)
    return entries
}

function registryType(value: unknown, field: string, allowed: Set<string>): string {
    const type = requiredString(value, field)
    if (!allowed.has(type)) fail(`${field} has unsupported type "${type}".`)
    return type
}

function validateRelativeSourcePath(sourcePath: string): string {
    if (sourcePath.includes("\\")) fail(`file path "${sourcePath}" must use forward slashes.`)
    const normalized = path.posix.normalize(sourcePath)
    if (
        normalized !== sourcePath ||
        path.posix.isAbsolute(normalized) ||
        normalized.split("/").some((part) => part === "" || part === "." || part === "..")
    ) {
        fail(`file path "${sourcePath}" must be a normalized relative path inside the repository.`)
    }
    return normalized
}

function parseFiles(value: unknown, itemName: string, generated: boolean): RegistryFile[] | GeneratedRegistryFile[] {
    if (!Array.isArray(value) || value.length === 0) {
        fail(`items.${itemName}.files must contain at least one file.`)
    }

    const seenPaths = new Set<string>()
    return value.map((entry, index) => {
        const field = `items.${itemName}.files[${index}]`
        if (!isRecord(entry)) fail(`${field} must be an object.`)

        const filePath = validateRelativeSourcePath(requiredString(entry.path, `${field}.path`))
        if (seenPaths.has(filePath)) fail(`${field}.path duplicates "${filePath}".`)
        seenPaths.add(filePath)

        const file = {
            path: filePath,
            type: registryType(entry.type, `${field}.type`, REGISTRY_FILE_TYPES),
        }

        if (!generated) return file
        return { ...file, content: typeof entry.content === "string" ? entry.content : fail(`${field}.content must be a string.`) }
    })
}

function parseItem(value: unknown, index: number, generated: false): RegistryItem
function parseItem(value: unknown, index: number, generated: true): GeneratedRegistryItem
function parseItem(value: unknown, index: number, generated: boolean): RegistryItem | GeneratedRegistryItem {
    if (!isRecord(value)) fail(`items[${index}] must be an object.`)
    const name = requiredString(value.name, `items[${index}].name`)
    if (!ITEM_NAME_PATTERN.test(name)) fail(`items[${index}].name "${name}" is not a safe slug.`)

    const base = {
        name,
        type: registryType(value.type, `items.${name}.type`, REGISTRY_ITEM_TYPES),
        description: optionalString(value.description, `items.${name}.description`),
        dependencies: optionalStringArray(value.dependencies, `items.${name}.dependencies`),
        devDependencies: optionalStringArray(value.devDependencies, `items.${name}.devDependencies`),
        registryDependencies: optionalStringArray(value.registryDependencies, `items.${name}.registryDependencies`),
    }

    if (!generated) return { ...base, files: parseFiles(value.files, name, false) as RegistryFile[] }

    const schema = requiredString(value.$schema, `items.${name}.$schema`)
    return {
        $schema: schema,
        ...base,
        files: parseFiles(value.files, name, true) as GeneratedRegistryFile[],
    }
}

function validateDependencies(items: RegistryItem[]): void {
    const names = new Set(items.map((item) => item.name))
    const visiting = new Set<string>()
    const visited = new Set<string>()

    for (const item of items) {
        for (const dependency of item.registryDependencies ?? []) {
            if (!names.has(dependency)) fail(`items.${item.name}.registryDependencies references missing item "${dependency}".`)
        }
    }

    const byName = new Map(items.map((item) => [item.name, item]))
    function visit(name: string, stack: string[]): void {
        if (visited.has(name)) return
        if (visiting.has(name)) fail(`registry dependency cycle detected: ${[...stack, name].join(" -> ")}.`)

        visiting.add(name)
        for (const dependency of byName.get(name)?.registryDependencies ?? []) {
            visit(dependency, [...stack, name])
        }
        visiting.delete(name)
        visited.add(name)
    }

    for (const item of items) visit(item.name, [])
}

export function parseRegistry(value: unknown): Registry {
    if (!isRecord(value)) fail("registry.json must contain an object.")
    const name = requiredString(value.name, "name")
    const homepage = requiredString(value.homepage, "homepage")
    try {
        const url = new URL(homepage)
        if (url.protocol !== "https:" && url.protocol !== "http:") fail("homepage must use HTTP or HTTPS.")
    } catch (error) {
        if (error instanceof Error && error.message.startsWith("Invalid registry:")) throw error
        fail("homepage must be a valid URL.")
    }
    if (!Array.isArray(value.items) || value.items.length === 0) fail("items must contain at least one registry item.")

    const items = value.items.map((item, index) => parseItem(item, index, false))
    const names = items.map((item) => item.name)
    if (new Set(names).size !== names.length) fail("item names must be unique.")
    if (names.includes("index")) fail('item name "index" is reserved for the generated registry index.')
    validateDependencies(items)
    return { name, homepage, items }
}

export function parseGeneratedRegistryItem(value: unknown): GeneratedRegistryItem {
    return parseItem(value, 0, true)
}

export function parseRegistryIndex(value: unknown): RegistryIndexItem[] {
    if (!Array.isArray(value)) fail("generated index must be an array.")
    const entries = value.map((entry, index) => {
        if (!isRecord(entry)) fail(`index[${index}] must be an object.`)
        const name = requiredString(entry.name, `index[${index}].name`)
        if (!ITEM_NAME_PATTERN.test(name)) fail(`index[${index}].name "${name}" is not a safe slug.`)
        return {
            name,
            type: registryType(entry.type, `index.${name}.type`, REGISTRY_ITEM_TYPES),
            description: optionalString(entry.description, `index.${name}.description`),
            dependencies: optionalStringArray(entry.dependencies, `index.${name}.dependencies`),
            registryDependencies: optionalStringArray(entry.registryDependencies, `index.${name}.registryDependencies`),
        }
    })
    const names = entries.map((entry) => entry.name)
    if (new Set(names).size !== names.length) fail("generated index item names must be unique.")
    return entries
}

function isInside(rootDir: string, candidate: string): boolean {
    const relative = path.relative(rootDir, candidate)
    return relative !== "" && relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative)
}

export function resolveRegistrySourcePath(rootDir: string, sourcePath: string): string {
    const normalized = validateRelativeSourcePath(sourcePath)
    const candidate = path.resolve(rootDir, ...normalized.split("/"))
    if (!isInside(path.resolve(rootDir), candidate)) fail(`file path "${sourcePath}" escapes the repository.`)
    return candidate
}

function json(value: unknown): string {
    return `${JSON.stringify(value, null, 2)}\n`
}

function buildSearchData(registry: Registry): string {
    const componentItems = registry.items
        .filter((item) => item.type === "registry:ui")
        .map((item) => {
            const name = item.name.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
            const keywords = (item.description ?? "").toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ").filter(Boolean)
            return `    { name: ${JSON.stringify(name)}, href: "/docs/components/${item.name}", keywords: [${keywords.map((keyword) => JSON.stringify(keyword)).join(", ")}], category: "component" },`
        })
        .join("\n")

    const docsItems = [
        `    { name: "Getting Started", href: "/docs", keywords: ["start", "intro", "introduction", "overview"], category: "docs" },`,
        `    { name: "Installation", href: "/docs/installation", keywords: ["setup", "install", "npm", "cli"], category: "docs" },`,
        `    { name: "Theming", href: "/docs/theming", keywords: ["theme", "colors", "customize", "tokens"], category: "docs" },`,
        `    { name: "CLI", href: "/docs/cli", keywords: ["command", "add", "terminal"], category: "docs" },`,
        `    { name: "Accessibility", href: "/docs/accessibility", keywords: ["a11y", "aria", "keyboard", "screen reader"], category: "docs" },`,
    ].join("\n")

    return `// Auto-generated by scripts/build-registry.ts — do not edit manually.
// Run \`npm run registry:build\` to regenerate after adding new components or docs pages.

export interface SearchItem {
    name: string
    href: string
    keywords: string[]
    category: "component" | "docs"
}

export const searchItems: SearchItem[] = [
${componentItems}
${docsItems}
]
`
}

export async function createRegistryArtifacts(rootDir: string): Promise<RegistryArtifacts> {
    const registryPath = path.join(rootDir, "registry.json")
    let source: unknown
    try {
        source = JSON.parse(await fs.readFile(registryPath, "utf8"))
    } catch (error) {
        throw new Error(`Could not read ${registryPath}: ${error instanceof Error ? error.message : String(error)}`)
    }
    const registry = parseRegistry(source)
    const realRoot = await fs.realpath(rootDir)
    const files = new Map<string, string>()
    const index: RegistryIndexItem[] = []

    for (const item of registry.items) {
        const generatedFiles = await Promise.all(item.files.map(async (file) => {
            const sourceFile = resolveRegistrySourcePath(rootDir, file.path)
            const realSourceFile = await fs.realpath(sourceFile)
            if (!isInside(realRoot, realSourceFile)) fail(`file path "${file.path}" resolves outside the repository.`)
            const content = (await fs.readFile(sourceFile, "utf8")).replace(/\r\n?/g, "\n")
            return { path: file.path, content, type: file.type }
        }))
        const outputItem: GeneratedRegistryItem = {
            $schema: "https://ui.shadcn.com/schema/registry-item.json",
            name: item.name,
            type: item.type,
            description: item.description,
            dependencies: item.dependencies,
            devDependencies: item.devDependencies,
            registryDependencies: item.registryDependencies,
            files: generatedFiles,
        }
        parseGeneratedRegistryItem(JSON.parse(json(outputItem)))
        files.set(`public/r/${item.name}.json`, json(outputItem))
        index.push({
            name: item.name,
            type: item.type,
            description: item.description,
            dependencies: item.dependencies,
            registryDependencies: item.registryDependencies,
        })
    }

    parseRegistryIndex(JSON.parse(json(index)))
    files.set("public/r/index.json", json(index))
    files.set("lib/search-data.ts", buildSearchData(registry))
    return { files, itemCount: registry.items.length }
}

export async function writeRegistryArtifacts(rootDir: string, artifacts: RegistryArtifacts): Promise<void> {
    const outputDir = path.join(rootDir, "public", "r")
    await fs.rm(outputDir, { recursive: true, force: true })
    await fs.mkdir(outputDir, { recursive: true })

    for (const [relativePath, content] of artifacts.files) {
        const outputPath = path.join(rootDir, ...relativePath.split("/"))
        await fs.mkdir(path.dirname(outputPath), { recursive: true })
        await fs.writeFile(outputPath, content, "utf8")
    }
}

export async function findRegistryDrift(rootDir: string): Promise<string[]> {
    const artifacts = await createRegistryArtifacts(rootDir)
    const drift = new Set<string>()

    for (const [relativePath, expected] of artifacts.files) {
        const filePath = path.join(rootDir, ...relativePath.split("/"))
        try {
            const actual = await fs.readFile(filePath, "utf8")
            if (actual !== expected) drift.add(relativePath)
            if (relativePath.startsWith("public/r/") && relativePath.endsWith(".json")) {
                const parsed: unknown = JSON.parse(actual)
                if (relativePath.endsWith("/index.json")) parseRegistryIndex(parsed)
                else parseGeneratedRegistryItem(parsed)
            }
        } catch {
            drift.add(relativePath)
        }
    }

    const outputDir = path.join(rootDir, "public", "r")
    const expectedRegistryFiles = new Set([...artifacts.files.keys()].filter((file) => file.startsWith("public/r/")))
    for (const entry of await fs.readdir(outputDir, { withFileTypes: true }).catch(() => [])) {
        const relativePath = `public/r/${entry.name}`
        if (!entry.isFile() || !expectedRegistryFiles.has(relativePath)) drift.add(relativePath)
    }
    return [...drift].sort()
}
