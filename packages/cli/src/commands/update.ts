import path from "path"
import fs from "fs-extra"
import { Command } from "commander"
import prompts from "prompts"
import { z } from "zod"
import * as Diff from "diff"
import { logger, highlighter } from "../utils/logger.js"
import { spinner } from "../utils/spinner.js"
import { handleError } from "../utils/errors.js"
import { getConfig, type Config } from "../utils/config.js"
import { getRegistryItem, getRegistryIndex, type RegistryItem } from "../utils/registry.js"
import { transformImports } from "../utils/transform.js"

const updateOptionsSchema = z.object({
    components: z.array(z.string()),
    cwd: z.string(),
    all: z.boolean(),
    force: z.boolean(),
    dryRun: z.boolean(),
})

export const update = new Command()
    .name("update")
    .description("update components to the latest registry version")
    .argument("[components...]", "the components to update")
    .option(
        "-c, --cwd <cwd>",
        "the working directory. defaults to the current directory.",
        process.cwd()
    )
    .option("-a, --all", "update all installed components.", false)
    .option("-f, --force", "skip confirmation prompt and overwrite.", false)
    .option("--dry-run", "show what would be updated without making changes.", false)
    .action(async (components, opts) => {
        try {
            const options = updateOptionsSchema.parse({
                components,
                cwd: path.resolve(opts.cwd),
                all: opts.all,
                force: opts.force,
                dryRun: opts.dryRun,
            })

            await runUpdate(options)
        } catch (error) {
            handleError(error)
        }
    })

async function runUpdate(options: z.infer<typeof updateOptionsSchema>): Promise<void> {
    const { components, cwd, all, force, dryRun } = options

    const config = await getConfig(cwd)

    if (!config) {
        logger.error(
            `No ${highlighter.info("components.json")} file found at ${highlighter.info(cwd)}.`
        )
        logger.info("Run `npx neobrutal init` to initialize the project.")
        return
    }

    let componentsToUpdate: string[] = components

    if (all) {
        const checkSpinner = spinner("Scanning for installed components...").start()
        componentsToUpdate = await getInstalledComponents(cwd, config)
        checkSpinner.succeed(`Found ${componentsToUpdate.length} installed components.`)
    }

    if (componentsToUpdate.length === 0) {
        logger.warn("No components specified. Use --all to update all installed components.")
        return
    }

    logger.break()
    logger.info(`Checking ${componentsToUpdate.length} component(s) for updates...`)
    logger.break()

    const updates: Array<{
        name: string
        files: Array<{
            path: string
            localPath: string
            localContent: string
            registryContent: string
        }>
    }> = []

    for (const componentName of componentsToUpdate) {
        try {
            const registryItem = await getRegistryItem(componentName)
            const componentUpdates = await checkComponentForUpdates(cwd, config, registryItem)

            if (componentUpdates.length > 0) {
                updates.push({
                    name: componentName,
                    files: componentUpdates,
                })
            }
        } catch {
            logger.warn(`Component ${highlighter.warn(componentName)} not found in registry.`)
        }
    }

    if (updates.length === 0) {
        logger.success("All components are up to date!")
        return
    }

    // Show summary of updates
    logger.info(`Found updates for ${updates.length} component(s):`)
    logger.break()

    for (const update of updates) {
        logger.log(`  ${highlighter.info(update.name)}`)
        for (const file of update.files) {
            const additions = countAdditions(file.localContent, file.registryContent)
            const deletions = countDeletions(file.localContent, file.registryContent)
            logger.log(`    ${file.path} (+${additions}/-${deletions})`)
        }
    }

    if (dryRun) {
        logger.break()
        logger.info("Dry run complete. No files were modified.")
        return
    }

    logger.break()

    if (!force) {
        const { proceed } = await prompts({
            type: "confirm",
            name: "proceed",
            message: "Do you want to apply these updates?",
            initial: true,
        })

        if (!proceed) {
            logger.info("Update cancelled.")
            return
        }
    }

    // Apply updates
    const updateSpinner = spinner("Applying updates...").start()

    let updatedCount = 0

    for (const update of updates) {
        for (const file of update.files) {
            const transformedContent = transformImports(file.registryContent, config)
            await fs.writeFile(file.localPath, transformedContent, "utf-8")
            updatedCount++
        }
    }

    updateSpinner.succeed(`Updated ${updatedCount} file(s).`)

    logger.break()
    logger.success("Update complete!")
}

async function getInstalledComponents(cwd: string, config: Config): Promise<string[]> {
    const uiDir = resolveAliasPath(cwd, config.aliases.ui || `${config.aliases.components}/ui`)

    if (!await fs.pathExists(uiDir)) {
        return []
    }

    const index = await getRegistryIndex()
    const installedComponents: string[] = []

    for (const item of index) {
        if (item.name === "utils") continue

        const componentPath = path.resolve(uiDir, `${item.name}.tsx`)
        if (await fs.pathExists(componentPath)) {
            installedComponents.push(item.name)
        }
    }

    return installedComponents
}

async function checkComponentForUpdates(
    cwd: string,
    config: Config,
    registryItem: RegistryItem
): Promise<Array<{
    path: string
    localPath: string
    localContent: string
    registryContent: string
}>> {
    const updates: Array<{
        path: string
        localPath: string
        localContent: string
        registryContent: string
    }> = []

    for (const file of registryItem.files) {
        const localPath = resolveFilePath(cwd, config, file.path)

        if (!await fs.pathExists(localPath)) {
            continue
        }

        const localContent = await fs.readFile(localPath, "utf-8")
        const transformedRegistryContent = transformImports(file.content, config)

        if (localContent !== transformedRegistryContent) {
            updates.push({
                path: file.path,
                localPath,
                localContent,
                registryContent: file.content,
            })
        }
    }

    return updates
}

function countAdditions(localContent: string, registryContent: string): number {
    const changes = Diff.diffLines(localContent, registryContent)
    let count = 0
    for (const change of changes) {
        if (change.added) {
            count += change.count || 1
        }
    }
    return count
}

function countDeletions(localContent: string, registryContent: string): number {
    const changes = Diff.diffLines(localContent, registryContent)
    let count = 0
    for (const change of changes) {
        if (change.removed) {
            count += change.count || 1
        }
    }
    return count
}

function resolveFilePath(cwd: string, config: Config, filePath: string): string {
    const aliasPrefix = extractAliasPrefix(config)

    if (filePath.startsWith("components/ui/")) {
        const uiAlias = config.aliases.ui || `${config.aliases.components}/ui`
        return path.resolve(
            cwd,
            filePath.replace("components/ui/", stripAliasPrefix(uiAlias, aliasPrefix) + "/")
        )
    }

    if (filePath.startsWith("lib/")) {
        const libAlias = config.aliases.lib || `${aliasPrefix}lib`
        return path.resolve(
            cwd,
            filePath.replace("lib/", stripAliasPrefix(libAlias, aliasPrefix) + "/")
        )
    }

    return path.resolve(cwd, filePath)
}

function resolveAliasPath(cwd: string, alias: string): string {
    const prefixes = ["@/", "~/", "#/", "$/"]
    for (const prefix of prefixes) {
        if (alias.startsWith(prefix)) {
            return path.resolve(cwd, alias.slice(prefix.length))
        }
    }
    return path.resolve(cwd, alias)
}

function extractAliasPrefix(config: Config): string {
    const prefixes = ["@/", "~/", "#/", "$/"]
    for (const prefix of prefixes) {
        if (config.aliases.components.startsWith(prefix)) {
            return prefix
        }
    }
    return "@/"
}

function stripAliasPrefix(alias: string, prefix: string): string {
    if (alias.startsWith(prefix)) {
        return alias.slice(prefix.length)
    }
    return alias
}
