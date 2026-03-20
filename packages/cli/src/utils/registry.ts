import { z } from "zod"
import { REGISTRY_URL } from "./config.js"

const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000
const REQUEST_TIMEOUT_MS = 10_000
const COMPONENT_NAME_PATTERN = /^[a-z0-9][a-z0-9-]*$/
const SAFE_FILE_PATH_PATTERN = /^(?!\.)(?!.*(?:^|\/)\.\.(?:\/|$))[a-zA-Z0-9._/-]+$/

let registryIndexCache: RegistryIndex | null = null
const registryItemCache = new Map<string, RegistryItem>()

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function normalizeComponentName(name: string): string {
    return name.trim().toLowerCase()
}

function isSafeRegistryFilePath(filePath: string): boolean {
    const normalized = filePath.replace(/\\/g, "/")
    return SAFE_FILE_PATH_PATTERN.test(normalized)
}

export const registryItemFileSchema = z.object({
    path: z.string().refine(isSafeRegistryFilePath, {
        message: "Invalid registry file path.",
    }),
    content: z.string(),
    type: z.enum(["registry:ui", "registry:lib", "registry:hook", "registry:component"]),
})

export const registryItemSchema = z.object({
    name: z.string().regex(COMPONENT_NAME_PATTERN, "Invalid registry item name."),
    type: z.enum(["registry:ui", "registry:lib", "registry:hook", "registry:component", "registry:style"]),
    description: z.string().optional(),
    dependencies: z.array(z.string()).optional(),
    devDependencies: z.array(z.string()).optional(),
    registryDependencies: z.array(z.string()).optional(),
    files: z.array(registryItemFileSchema),
    tailwind: z.object({
        config: z.record(z.unknown()).optional(),
    }).optional(),
    cssVars: z.record(z.record(z.string())).optional(),
    docs: z.string().optional(),
})

export const registryIndexSchema = z.array(
    z.object({
        name: z.string().regex(COMPONENT_NAME_PATTERN, "Invalid registry item name."),
        type: z.enum(["registry:ui", "registry:lib", "registry:hook", "registry:component", "registry:style"]),
        description: z.string().optional(),
        dependencies: z.array(z.string()).optional(),
        registryDependencies: z.array(z.string()).optional(),
    })
)

export type RegistryItem = z.infer<typeof registryItemSchema>
export type RegistryIndex = z.infer<typeof registryIndexSchema>

/**
 * Fetches with retry logic for resilience against transient network failures.
 */
async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
    let lastError: Error | undefined

    for (let attempt = 0; attempt < retries; attempt++) {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

        try {
            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    Accept: "application/json",
                },
            })

            if (response.ok) {
                clearTimeout(timeout)
                return response
            }

            // Don't retry on 404 - the resource doesn't exist
            if (response.status === 404) {
                throw new Error(`Not found: ${url}`)
            }

            // Non-throttling 4xx errors are unlikely to recover on retry
            if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                throw new Error(`Request failed: HTTP ${response.status} ${response.statusText}`)
            }

            lastError = new Error(`HTTP ${response.status}: ${response.statusText}`)
        } catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
                lastError = new Error(`Request timed out after ${REQUEST_TIMEOUT_MS}ms: ${url}`)
            } else {
                lastError = error instanceof Error ? error : new Error(String(error))
            }
        } finally {
            clearTimeout(timeout)
        }

        // Wait before retrying (exponential backoff)
        if (attempt < retries - 1) {
            await sleep(RETRY_DELAY_MS * (attempt + 1))
        }
    }

    throw lastError ?? new Error(`Failed to fetch ${url}`)
}

async function fetchJson(url: string): Promise<unknown> {
    const response = await fetchWithRetry(url)

    try {
        return await response.json()
    } catch {
        throw new Error(`Invalid JSON response from ${url}`)
    }
}

export async function getRegistryIndex(): Promise<RegistryIndex> {
    if (registryIndexCache) {
        return registryIndexCache
    }

    const json = await fetchJson(`${REGISTRY_URL}/index.json`)
    const parsed = registryIndexSchema.parse(json)
    registryIndexCache = parsed
    return parsed
}

export async function getRegistryItem(name: string): Promise<RegistryItem> {
    const normalizedName = normalizeComponentName(name)

    if (!COMPONENT_NAME_PATTERN.test(normalizedName)) {
        throw new Error(`Invalid component name: ${name}`)
    }

    const cached = registryItemCache.get(normalizedName)
    if (cached) {
        return cached
    }

    const json = await fetchJson(`${REGISTRY_URL}/${normalizedName}.json`)
    const parsed = registryItemSchema.parse(json)
    registryItemCache.set(normalizedName, parsed)
    return parsed
}

/**
 * Fetches multiple registry items in parallel for better performance.
 */
export async function getRegistryItems(names: string[]): Promise<RegistryItem[]> {
    const uniqueNames = Array.from(
        new Set(names.map((name) => normalizeComponentName(name)).filter(Boolean))
    )

    const results = await Promise.all(uniqueNames.map((name) => getRegistryItem(name)))
    return results
}

export async function resolveRegistryDependencies(
    items: RegistryItem[]
): Promise<RegistryItem[]> {
    const resolved = new Map<string, RegistryItem>()
    const inProgress = new Set<string>()

    async function visit(item: RegistryItem, stack: string[]): Promise<void> {
        if (resolved.has(item.name)) {
            return
        }

        if (inProgress.has(item.name)) {
            throw new Error(
                `Circular registry dependency detected: ${[...stack, item.name].join(" -> ")}`
            )
        }

        inProgress.add(item.name)

        if (item.registryDependencies?.length) {
            for (const dependencyName of item.registryDependencies) {
                const depItem = await getRegistryItem(dependencyName)
                await visit(depItem, [...stack, item.name])
            }
        }

        inProgress.delete(item.name)
        resolved.set(item.name, item)
    }

    for (const item of items) {
        await visit(item, [])
    }

    return Array.from(resolved.values())
}
