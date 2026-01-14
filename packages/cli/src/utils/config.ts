import path from "path"
import fs from "fs-extra"
import { z } from "zod"

export const REGISTRY_URL = "https://www.neobrutalui.live/r"

export const configSchema = z.object({
    $schema: z.string().optional(),
    style: z.string().default("default"),
    rsc: z.boolean().default(true),
    tsx: z.boolean().default(true),
    tailwind: z.object({
        config: z.string().optional(),
        css: z.string(),
        baseColor: z.string().default("neutral"),
        cssVariables: z.boolean().default(true),
        prefix: z.string().optional(),
    }),
    aliases: z.object({
        components: z.string(),
        utils: z.string(),
        ui: z.string().optional(),
        lib: z.string().optional(),
        hooks: z.string().optional(),
    }),
})

export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd: string): Promise<Config | null> {
    const configPath = path.resolve(cwd, "components.json")

    if (!await fs.pathExists(configPath)) {
        return null
    }

    try {
        const configContent = await fs.readFile(configPath, "utf-8")
        const rawConfig = JSON.parse(configContent)
        return configSchema.parse(rawConfig)
    } catch {
        return null
    }
}

export async function writeConfig(cwd: string, config: Config): Promise<void> {
    const configPath = path.resolve(cwd, "components.json")
    await fs.writeFile(
        configPath,
        JSON.stringify(config, null, 2) + "\n",
        "utf-8"
    )
}

export function resolveImport(alias: string, cwd: string): string {
    if (alias.startsWith("@/")) {
        return path.resolve(cwd, alias.replace("@/", ""))
    }
    if (alias.startsWith("~/")) {
        return path.resolve(cwd, alias.replace("~/", ""))
    }
    return path.resolve(cwd, alias)
}

export type Framework = "next-app" | "next-pages" | "vite" | "remix" | "astro" | "unknown"

export interface ProjectInfo {
    framework: Framework
    srcDir: boolean
    typescript: boolean
    tailwindCss: boolean
    aliasPrefix: string
    cssPath: string | null
}

/**
 * Detects framework by checking for config files and package.json dependencies.
 */
export async function getProjectInfo(cwd: string): Promise<ProjectInfo> {
    const [packageJson, srcDir, typescript, tailwindCss, aliasPrefix, cssPath] = await Promise.all([
        getPackageJson(cwd),
        fs.pathExists(path.resolve(cwd, "src")),
        fs.pathExists(path.resolve(cwd, "tsconfig.json")),
        detectTailwindCss(cwd),
        getTsConfigAliasPrefix(cwd),
        detectCssPath(cwd),
    ])

    if (!packageJson) {
        return {
            framework: "unknown",
            srcDir,
            typescript,
            tailwindCss,
            aliasPrefix,
            cssPath,
        }
    }

    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies }

    // Check for Next.js and determine if it's App Router or Pages Router
    if (deps.next) {
        const hasAppDir = await fs.pathExists(path.resolve(cwd, "app")) ||
            await fs.pathExists(path.resolve(cwd, "src/app"))
        return {
            framework: hasAppDir ? "next-app" : "next-pages",
            srcDir,
            typescript,
            tailwindCss,
            aliasPrefix,
            cssPath,
        }
    }

    if (deps["@remix-run/react"]) {
        return {
            framework: "remix",
            srcDir,
            typescript,
            tailwindCss,
            aliasPrefix,
            cssPath,
        }
    }

    if (deps.astro) {
        return {
            framework: "astro",
            srcDir,
            typescript,
            tailwindCss,
            aliasPrefix,
            cssPath,
        }
    }

    if (deps.vite) {
        return {
            framework: "vite",
            srcDir,
            typescript,
            tailwindCss,
            aliasPrefix,
            cssPath,
        }
    }

    return {
        framework: "unknown",
        srcDir,
        typescript,
        tailwindCss,
        aliasPrefix,
        cssPath,
    }
}

async function getPackageJson(cwd: string): Promise<Record<string, unknown> | null> {
    const packageJsonPath = path.resolve(cwd, "package.json")
    if (!await fs.pathExists(packageJsonPath)) {
        return null
    }
    return fs.readJson(packageJsonPath)
}

/**
 * Detects if Tailwind CSS is installed.
 */
async function detectTailwindCss(cwd: string): Promise<boolean> {
    const packageJson = await getPackageJson(cwd)
    if (!packageJson) {
        return false
    }

    const deps = {
        ...packageJson.dependencies as Record<string, string>,
        ...packageJson.devDependencies as Record<string, string>
    }

    return !!deps.tailwindcss
}

/**
 * Reads tsconfig.json to extract the alias prefix (e.g., "@/", "~/", "#/").
 */
async function getTsConfigAliasPrefix(cwd: string): Promise<string> {
    const tsconfigPath = path.resolve(cwd, "tsconfig.json")

    if (!await fs.pathExists(tsconfigPath)) {
        return "@/" // Default to @/
    }

    try {
        const content = await fs.readFile(tsconfigPath, "utf-8")
        // Remove comments (tsconfig allows comments)
        const jsonContent = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "")
        const tsconfig = JSON.parse(jsonContent)

        const paths = tsconfig.compilerOptions?.paths
        if (!paths) {
            return "@/"
        }

        // Look for common patterns: @/*, ~/*, #/*
        for (const [alias, targets] of Object.entries(paths)) {
            if (alias.endsWith("/*") && Array.isArray(targets)) {
                const prefix = alias.replace("/*", "/")
                if (["@/", "~/", "#/", "$/"].includes(prefix)) {
                    return prefix
                }
            }
        }

        // Return first found alias prefix
        const firstAlias = Object.keys(paths)[0]
        if (firstAlias?.endsWith("/*")) {
            return firstAlias.replace("/*", "/")
        }

        return "@/"
    } catch {
        return "@/"
    }
}

/**
 * Detects the global CSS file path based on framework conventions.
 */
async function detectCssPath(cwd: string): Promise<string | null> {
    const possiblePaths = [
        "app/globals.css",
        "src/app/globals.css",
        "src/index.css",
        "src/styles/globals.css",
        "styles/globals.css",
        "app/global.css",
        "src/app/global.css",
    ]

    for (const cssPath of possiblePaths) {
        if (await fs.pathExists(path.resolve(cwd, cssPath))) {
            return cssPath
        }
    }

    return null
}
