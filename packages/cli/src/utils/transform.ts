import type { Config } from "./config.js"

/**
 * Transforms import paths in component source code to match the user's configured aliases.
 * 
 * For example, if the source has `import { cn } from "@/lib/utils"` and the user
 * configured their utils alias as "~/lib/utils", this will transform the import
 * to `import { cn } from "~/lib/utils"`.
 */
export function transformImports(content: string, config: Config): string {
    let transformed = content

    // Extract the alias prefix from the user's config (e.g., "@/", "~/", "#/")
    const utilsPrefix = extractAliasPrefix(config.aliases.utils)
    const componentsPrefix = extractAliasPrefix(config.aliases.components)

    // If the user is using the default "@/" prefix, no transformation needed
    if (utilsPrefix === "@/" && componentsPrefix === "@/") {
        return transformed
    }

    // Transform @/lib/utils imports to use the configured utils alias
    if (utilsPrefix !== "@/") {
        // Handle the utils import specifically since it has its own alias
        const utilsPath = config.aliases.utils
        transformed = transformed.replace(
            /from\s+["']@\/lib\/utils["']/g,
            `from "${utilsPath}"`
        )
    }

    // Transform @/components imports to use the configured components alias
    if (componentsPrefix !== "@/") {
        const componentsBase = config.aliases.components
        transformed = transformed.replace(
            /from\s+["']@\/components\/(.*?)["']/g,
            `from "${componentsBase}/$1"`
        )
    }

    // Transform any remaining @/ imports to use the detected prefix
    // This handles edge cases like @/hooks, @/lib/other, etc.
    if (utilsPrefix !== "@/") {
        transformed = transformed.replace(
            /from\s+["']@\/(.*?)["']/g,
            `from "${utilsPrefix}$1"`
        )
    }

    return transformed
}

/**
 * Extracts the alias prefix from a configured alias path.
 * 
 * Examples:
 * - "@/components" -> "@/"
 * - "~/lib/utils" -> "~/"
 * - "#/components" -> "#/"
 * - "src/components" -> "src/"
 */
function extractAliasPrefix(alias: string): string {
    // Common alias patterns
    const prefixPatterns = ["@/", "~/", "#/", "$/"]
    
    for (const prefix of prefixPatterns) {
        if (alias.startsWith(prefix)) {
            return prefix
        }
    }

    // If no recognized prefix, try to extract up to the first slash
    const slashIndex = alias.indexOf("/")
    if (slashIndex > 0) {
        return alias.substring(0, slashIndex + 1)
    }

    return alias
}

/**
 * Transforms file content for TypeScript to JavaScript conversion.
 * This is a basic transformation - for full conversion, use a proper tool like sucrase.
 */
export function transformToJavaScript(content: string): string {
    let transformed = content

    // Remove type imports
    transformed = transformed.replace(/import\s+type\s+\{[^}]+\}\s+from\s+["'][^"']+["'];?\n?/g, "")
    
    // Remove type annotations from import statements
    transformed = transformed.replace(/,\s*type\s+([A-Z]\w+)/g, "")
    
    // Remove type annotations (: Type)
    transformed = transformed.replace(/:\s*[A-Z]\w+(<[^>]+>)?(\[\])?/g, "")
    
    // Remove generic type parameters
    transformed = transformed.replace(/<[A-Z]\w+(\s*,\s*[A-Z]\w+)*>/g, "")
    
    // Remove interface declarations
    transformed = transformed.replace(/^interface\s+\w+\s*\{[\s\S]*?\}\n?/gm, "")
    
    // Remove type declarations
    transformed = transformed.replace(/^type\s+\w+\s*=[\s\S]*?;\n?/gm, "")
    
    // Change file extension in imports
    transformed = transformed.replace(/\.tsx["']/g, '.jsx"')
    transformed = transformed.replace(/\.ts["']/g, '.js"')

    return transformed
}
