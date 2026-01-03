import { z } from "zod"
import { REGISTRY_URL } from "./config.js"

const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000

export const registryItemFileSchema = z.object({
    path: z.string(),
    content: z.string(),
    type: z.enum(["registry:ui", "registry:lib", "registry:hook", "registry:component"]),
})

export const registryItemSchema = z.object({
    name: z.string(),
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
        name: z.string(),
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
        try {
            const response = await fetch(url)
            if (response.ok) {
                return response
            }
            // Don't retry on 404 - the resource doesn't exist
            if (response.status === 404) {
                throw new Error(`Not found: ${url}`)
            }
            lastError = new Error(`HTTP ${response.status}: ${response.statusText}`)
        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error))
        }

        // Wait before retrying (exponential backoff)
        if (attempt < retries - 1) {
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS * (attempt + 1)))
        }
    }

    throw lastError ?? new Error(`Failed to fetch ${url}`)
}

export async function getRegistryIndex(): Promise<RegistryIndex> {
    const response = await fetchWithRetry(`${REGISTRY_URL}/index.json`)
    const json = await response.json()
    return registryIndexSchema.parse(json)
}

export async function getRegistryItem(name: string): Promise<RegistryItem> {
    const response = await fetchWithRetry(`${REGISTRY_URL}/${name}.json`)
    const json = await response.json()
    return registryItemSchema.parse(json)
}

/**
 * Fetches multiple registry items in parallel for better performance.
 */
export async function getRegistryItems(names: string[]): Promise<RegistryItem[]> {
    const results = await Promise.all(names.map((name) => getRegistryItem(name)))
    return results
}

export async function resolveRegistryDependencies(
    items: RegistryItem[]
): Promise<RegistryItem[]> {
    const resolved = new Map<string, RegistryItem>()
    const queue = [...items]

    while (queue.length > 0) {
        const item = queue.shift()!

        if (resolved.has(item.name)) {
            continue
        }

        resolved.set(item.name, item)

        if (item.registryDependencies?.length) {
            for (const dep of item.registryDependencies) {
                if (!resolved.has(dep)) {
                    const depItem = await getRegistryItem(dep)
                    queue.push(depItem)
                }
            }
        }
    }

    return Array.from(resolved.values())
}
