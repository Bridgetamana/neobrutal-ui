import path from "path"
import type { Config } from "./config.js"

const ALIAS_PREFIXES = ["@/", "~/", "#/", "$/"]

export function getAliasPrefix(alias: string): string | null {
    return ALIAS_PREFIXES.find((prefix) => alias.startsWith(prefix)) ?? null
}

export function stripAliasPrefix(alias: string): string {
    const prefix = getAliasPrefix(alias)
    return prefix ? alias.slice(prefix.length) : alias
}

export function ensurePathInProjectRoot(
    cwd: string,
    targetPath: string,
    sourcePath: string
): string {
    const relative = path.relative(cwd, targetPath)
    const outsideProject = relative === ".." ||
        relative.startsWith(`..${path.sep}`) ||
        path.isAbsolute(relative)

    if (outsideProject) {
        throw new Error(`Refusing to access path outside project root for ${sourcePath}`)
    }

    return targetPath
}

export function resolveAliasPath(cwd: string, alias: string): string {
    const targetPath = path.resolve(cwd, stripAliasPrefix(alias))
    return ensurePathInProjectRoot(cwd, targetPath, alias)
}

export function resolveRegistryFilePath(
    cwd: string,
    config: Config,
    filePath: string
): string {
    const normalizedPath = filePath.replace(/\\/g, "/")

    if (
        path.posix.isAbsolute(normalizedPath) ||
        normalizedPath.split("/").includes("..")
    ) {
        throw new Error(`Invalid registry file path: ${filePath}`)
    }

    const aliasPrefix = getAliasPrefix(config.aliases.components) ?? "@/"

    if (normalizedPath === "lib/utils.ts") {
        const configuredUtilsPath = stripAliasPrefix(config.aliases.utils)
        const extension = path.extname(configuredUtilsPath) ? "" : ".ts"
        const targetPath = path.resolve(cwd, `${configuredUtilsPath}${extension}`)
        return ensurePathInProjectRoot(cwd, targetPath, filePath)
    }

    const mappings = [
        {
            prefix: "components/ui/",
            alias: config.aliases.ui || `${config.aliases.components}/ui`,
        },
        {
            prefix: "lib/",
            alias: config.aliases.lib || `${aliasPrefix}lib`,
        },
        {
            prefix: "hooks/",
            alias: config.aliases.hooks || `${aliasPrefix}hooks`,
        },
    ]

    for (const mapping of mappings) {
        if (normalizedPath.startsWith(mapping.prefix)) {
            const relativeFilePath = normalizedPath.slice(mapping.prefix.length)
            const targetPath = path.resolve(
                cwd,
                stripAliasPrefix(mapping.alias),
                relativeFilePath
            )
            return ensurePathInProjectRoot(cwd, targetPath, filePath)
        }
    }

    const targetPath = path.resolve(cwd, normalizedPath)
    return ensurePathInProjectRoot(cwd, targetPath, filePath)
}
