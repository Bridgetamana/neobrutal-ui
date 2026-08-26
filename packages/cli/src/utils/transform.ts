import type { Config } from "./config.js"
import { getAliasPrefix } from "./paths.js"

/**
 * Transforms import paths in component source code to match the user's configured aliases.
 * 
 * For example, if the source has `import { cn } from "@/lib/utils"` and the user
 * configured their utils alias as "~/lib/utils", this will transform the import
 * to `import { cn } from "~/lib/utils"`.
 */
export function transformImports(content: string, config: Config): string {
    const rootPrefix = getAliasPrefix(config.aliases.components) ?? "@/"
    const aliases = [
        ["@/lib/utils", config.aliases.utils],
        ["@/components/ui", config.aliases.ui || `${config.aliases.components}/ui`],
        ["@/components", config.aliases.components],
        ["@/hooks", config.aliases.hooks || `${rootPrefix}hooks`],
        ["@/lib", config.aliases.lib || `${rootPrefix}lib`],
    ] as const

    let transformed = content

    for (const [registryAlias, configuredAlias] of aliases) {
        const escapedAlias = registryAlias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        const aliasPattern = new RegExp(
            `(["'])${escapedAlias}(?=\\/|["'])`,
            "g"
        )
        transformed = transformed.replace(
            aliasPattern,
            (_match, quote: string) => `${quote}${configuredAlias}`
        )
    }

    if (rootPrefix !== "@/") {
        transformed = transformed.replace(/(["'])@\//g, `$1${rootPrefix}`)
    }

    return transformed
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
