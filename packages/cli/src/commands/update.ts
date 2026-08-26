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
import {
    getRegistryIndex,
    getRegistryItems,
    resolveRegistryDependencies,
    type RegistryItem,
} from "../utils/registry.js"
import {
    detectPackageManager,
    getInstallCommand,
    getInstalledDependencies,
    installDependencies,
} from "../utils/package-manager.js"
import { resolveRegistryFilePath } from "../utils/paths.js"
import { transformImports } from "../utils/transform.js"

const updateOptionsSchema = z.object({
    components: z.array(z.string()),
    cwd: z.string(),
    all: z.boolean(),
    force: z.boolean(),
    dryRun: z.boolean(),
})

interface FileUpdate {
    path: string
    localPath: string
    localContent: string | null
    registryContent: string
}

interface ComponentUpdate {
    name: string
    files: FileUpdate[]
}

interface MissingDependencies {
    dependencies: string[]
    devDependencies: string[]
}

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
    const { cwd, all, force, dryRun } = options
    const config = await getConfig(cwd)

    if (!config) {
        logger.error(
            `No ${highlighter.info("components.json")} file found at ${highlighter.info(cwd)}.`
        )
        logger.info("Run `npx neobrutal init` to initialize the project.")
        return
    }

    const registryIndex = await getRegistryIndex()
    const requestedItems = all
        ? await findInstalledRegistryItems(cwd, config, registryIndex)
        : await getRequestedRegistryItems(options.components, registryIndex)

    if (requestedItems.length === 0) {
        logger.warn(
            all
                ? "No installed components found."
                : "No valid components specified. Use --all to update all installed components."
        )
        return
    }

    const installedItems: RegistryItem[] = []
    for (const item of requestedItems) {
        if (await isRegistryItemInstalled(cwd, config, item)) {
            installedItems.push(item)
        } else {
            logger.warn(
                `${highlighter.warn(item.name)} is not installed. Run \`npx neobrutal add ${item.name}\` first.`
            )
        }
    }

    if (installedItems.length === 0) {
        return
    }

    logger.break()
    logger.info(`Checking ${installedItems.length} component(s) for updates...`)
    logger.break()

    const resolvedItems = await resolveRegistryDependencies(installedItems)
    const updates = await collectComponentUpdates(cwd, config, resolvedItems)
    const missingDependencies = await findMissingDependencies(cwd, resolvedItems)

    if (
        updates.length === 0 &&
        missingDependencies.dependencies.length === 0 &&
        missingDependencies.devDependencies.length === 0
    ) {
        logger.success("All components are up to date!")
        return
    }

    printUpdateSummary(updates, missingDependencies)

    if (dryRun) {
        logger.break()
        logger.info("Dry run complete. No files or dependencies were modified.")
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

    const updateSpinner = spinner("Applying updates...").start()
    let updatedCount = 0

    try {
        for (const update of updates) {
            for (const file of update.files) {
                await fs.ensureDir(path.dirname(file.localPath))
                await fs.writeFile(file.localPath, file.registryContent, "utf-8")
                updatedCount++
            }
        }

        updateSpinner.succeed(`Updated ${updatedCount} file(s).`)
    } catch (error) {
        updateSpinner.fail("Failed to update component files.")
        throw error
    }

    await installMissingDependencies(cwd, missingDependencies)

    logger.break()
    logger.success("Update complete!")
}

async function getRequestedRegistryItems(
    componentNames: string[],
    registryIndex: Awaited<ReturnType<typeof getRegistryIndex>>
): Promise<RegistryItem[]> {
    const normalizedNames = Array.from(
        new Set(componentNames.map((name) => name.trim().toLowerCase()).filter(Boolean))
    )
    const availableNames = new Set(registryIndex.map((item) => item.name))
    const unavailableNames = normalizedNames.filter((name) => !availableNames.has(name))

    if (unavailableNames.length > 0) {
        logger.warn(`Not available in the registry: ${unavailableNames.join(", ")}`)
    }

    const validNames = normalizedNames.filter((name) => availableNames.has(name))
    return validNames.length > 0 ? getRegistryItems(validNames) : []
}

async function findInstalledRegistryItems(
    cwd: string,
    config: Config,
    registryIndex: Awaited<ReturnType<typeof getRegistryIndex>>
): Promise<RegistryItem[]> {
    const candidateNames = registryIndex
        .filter((item) => item.type !== "registry:style" && item.name !== "utils")
        .map((item) => item.name)
    const candidateItems = await getRegistryItems(candidateNames)
    const installationChecks = await Promise.all(
        candidateItems.map((item) => isRegistryItemInstalled(cwd, config, item))
    )

    return candidateItems.filter((_item, index) => installationChecks[index])
}

async function isRegistryItemInstalled(
    cwd: string,
    config: Config,
    item: RegistryItem
): Promise<boolean> {
    const checks = await Promise.all(
        item.files.map((file) =>
            fs.pathExists(resolveRegistryFilePath(cwd, config, file.path))
        )
    )
    return checks.some(Boolean)
}

async function collectComponentUpdates(
    cwd: string,
    config: Config,
    items: RegistryItem[]
): Promise<ComponentUpdate[]> {
    const updates: ComponentUpdate[] = []

    for (const item of items) {
        const files: FileUpdate[] = []

        for (const file of item.files) {
            const localPath = resolveRegistryFilePath(cwd, config, file.path)
            const registryContent = transformImports(file.content, config)
            const exists = await fs.pathExists(localPath)
            const localContent = exists ? await fs.readFile(localPath, "utf-8") : null

            if (
                localContent === null ||
                normalizeLineEndings(localContent) !== normalizeLineEndings(registryContent)
            ) {
                files.push({
                    path: file.path,
                    localPath,
                    localContent,
                    registryContent,
                })
            }
        }

        if (files.length > 0) {
            updates.push({ name: item.name, files })
        }
    }

    return updates
}

async function findMissingDependencies(
    cwd: string,
    items: RegistryItem[]
): Promise<MissingDependencies> {
    const installedDependencies = await getInstalledDependencies(cwd)
    const dependencies = new Set<string>()
    const devDependencies = new Set<string>()

    for (const item of items) {
        item.dependencies?.forEach((dependency) => dependencies.add(dependency))
        item.devDependencies?.forEach((dependency) => devDependencies.add(dependency))
    }

    const missingDependencies = Array.from(dependencies).filter(
        (dependency) => !installedDependencies.has(dependency)
    )
    const missingDevDependencies = Array.from(devDependencies).filter(
        (dependency) =>
            !installedDependencies.has(dependency) &&
            !missingDependencies.includes(dependency)
    )

    return {
        dependencies: missingDependencies,
        devDependencies: missingDevDependencies,
    }
}

function printUpdateSummary(
    updates: ComponentUpdate[],
    missingDependencies: MissingDependencies
): void {
    if (updates.length > 0) {
        logger.info(`Found updates for ${updates.length} registry item(s):`)
        logger.break()

        for (const update of updates) {
            logger.log(`  ${highlighter.info(update.name)}`)
            for (const file of update.files) {
                if (file.localContent === null) {
                    logger.log(`    ${file.path} (new file)`)
                    continue
                }

                const additions = countAdditions(file.localContent, file.registryContent)
                const deletions = countDeletions(file.localContent, file.registryContent)
                logger.log(`    ${file.path} (+${additions}/-${deletions})`)
            }
        }
    }

    const packages = [
        ...missingDependencies.dependencies,
        ...missingDependencies.devDependencies,
    ]
    if (packages.length > 0) {
        logger.break()
        logger.info(`Missing dependencies: ${packages.join(", ")}`)
    }
}

async function installMissingDependencies(
    cwd: string,
    missingDependencies: MissingDependencies
): Promise<void> {
    const { dependencies, devDependencies } = missingDependencies
    if (dependencies.length === 0 && devDependencies.length === 0) {
        return
    }

    const packageManager = await detectPackageManager(cwd)

    if (dependencies.length > 0) {
        const installSpinner = spinner(
            `Running ${getInstallCommand(packageManager, dependencies)}`
        ).start()
        const success = await installDependencies(cwd, dependencies, { silent: true })

        if (success) {
            installSpinner.succeed("Dependencies installed.")
        } else {
            installSpinner.fail("Failed to install dependencies.")
            logger.warn(`Install manually: ${getInstallCommand(packageManager, dependencies)}`)
        }
    }

    if (devDependencies.length > 0) {
        const installSpinner = spinner(
            `Running ${getInstallCommand(packageManager, devDependencies, true)}`
        ).start()
        const success = await installDependencies(cwd, devDependencies, {
            isDev: true,
            silent: true,
        })

        if (success) {
            installSpinner.succeed("Dev dependencies installed.")
        } else {
            installSpinner.fail("Failed to install dev dependencies.")
            logger.warn(
                `Install manually: ${getInstallCommand(packageManager, devDependencies, true)}`
            )
        }
    }
}

function normalizeLineEndings(content: string): string {
    return content.replace(/\r\n?/g, "\n")
}

function countAdditions(localContent: string, registryContent: string): number {
    return Diff.diffLines(localContent, registryContent).reduce(
        (count, change) => count + (change.added ? change.count || 1 : 0),
        0
    )
}

function countDeletions(localContent: string, registryContent: string): number {
    return Diff.diffLines(localContent, registryContent).reduce(
        (count, change) => count + (change.removed ? change.count || 1 : 0),
        0
    )
}
