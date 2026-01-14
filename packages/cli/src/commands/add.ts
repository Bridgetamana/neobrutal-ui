import path from "path"
import fs from "fs-extra"
import { Command } from "commander"
import prompts from "prompts"
import { z } from "zod"
import { logger, highlighter } from "../utils/logger.js"
import { spinner } from "../utils/spinner.js"
import { handleError } from "../utils/errors.js"
import { getConfig, type Config } from "../utils/config.js"
import {
    getRegistryIndex,
    getRegistryItems,
    resolveRegistryDependencies,
} from "../utils/registry.js"
import {
    detectPackageManager,
    installDependencies,
    getInstallCommand,
    getInstalledDependencies,
} from "../utils/package-manager.js"
import { transformImports } from "../utils/transform.js"
import { runInit } from "./init.js"

const addOptionsSchema = z.object({
    components: z.array(z.string()).optional(),
    cwd: z.string(),
    yes: z.boolean(),
    overwrite: z.boolean(),
    all: z.boolean(),
})

export const add = new Command()
    .name("add")
    .description("add components to your project")
    .argument("[components...]", "the components to add")
    .option(
        "-c, --cwd <cwd>",
        "the working directory. defaults to the current directory.",
        process.cwd()
    )
    .option("-y, --yes", "skip confirmation prompt.", false)
    .option("-o, --overwrite", "overwrite existing files.", false)
    .option("-a, --all", "add all available components.", false)
    .action(async (components, opts) => {
        try {
            const options = addOptionsSchema.parse({
                components,
                cwd: path.resolve(opts.cwd),
                yes: opts.yes,
                overwrite: opts.overwrite,
                all: opts.all,
            })

            await runAdd(options)
        } catch (error) {
            handleError(error)
        }
    })

async function runAdd(options: z.infer<typeof addOptionsSchema>): Promise<void> {
    const { cwd, overwrite, all } = options
    let { components } = options

    let config = await getConfig(cwd)

    if (!config) {
        logger.warn(
            `No ${highlighter.info("components.json")} file found at ${highlighter.info(cwd)}.`
        )
        const { proceed } = await prompts({
            type: "confirm",
            name: "proceed",
            message: "Would you like to initialize the project first?",
            initial: true,
        })

        if (!proceed) {
            logger.info("Add cancelled.")
            return
        }

        await runInit({ cwd, yes: false, force: false })
        config = await getConfig(cwd)

        if (!config) {
            logger.error("Failed to initialize project.")
            return
        }
    }

    const registryIndex = await getRegistryIndex()

    if (all) {
        components = registryIndex
            .filter((item) => item.type === "registry:ui")
            .map((item) => item.name)
    }

    if (!components || components.length === 0) {
        const { selectedComponents } = await prompts({
            type: "multiselect",
            name: "selectedComponents",
            message: "Which components would you like to add?",
            hint: "Space to select. A to toggle all. Enter to submit.",
            instructions: false,
            choices: registryIndex
                .filter((item) => item.type === "registry:ui")
                .map((item) => ({
                    title: item.name,
                    value: item.name,
                    description: item.description,
                })),
        })

        if (!selectedComponents?.length) {
            logger.info("No components selected. Exiting.")
            return
        }

        components = selectedComponents
    }

    if (!components || components.length === 0) {
        logger.info("No components selected. Exiting.")
        return
    }

    const invalidComponents = components.filter(
        (component) => !registryIndex.find((item) => item.name === component)
    )

    if (invalidComponents.length > 0) {
        logger.error(
            `The following components are not available: ${invalidComponents.join(", ")}`
        )
        logger.info("Run `npx neobrutal list` to see all available components.")
        return
    }

    const addSpinner = spinner("Fetching components...").start()

    try {
        const items = await getRegistryItems(components)
        const resolvedItems = await resolveRegistryDependencies(items)

        addSpinner.succeed(`Found ${resolvedItems.length} component(s).`)

        const npmDependencies = new Set<string>()
        const filesToWrite: Array<{ path: string; content: string }> = []

        for (const item of resolvedItems) {
            if (item.dependencies) {
                item.dependencies.forEach((dep) => npmDependencies.add(dep))
            }

            for (const file of item.files) {
                const targetPath = resolveFilePath(cwd, config, file.path)

                if (await fs.pathExists(targetPath)) {
                    // For utils file, check if content is identical - skip silently if so
                    if (file.path === "lib/utils.ts") {
                        const existingContent = await fs.readFile(targetPath, "utf-8")
                        const transformedContent = transformImports(file.content, config)
                        // Normalize line endings for comparison
                        const normalizedExisting = existingContent.replace(/\r\n/g, "\n").trim()
                        const normalizedNew = transformedContent.replace(/\r\n/g, "\n").trim()
                        if (normalizedExisting === normalizedNew) {
                            // Skip silently - file is identical
                            continue
                        }
                    }

                    if (!overwrite) {
                        const { shouldOverwrite } = await prompts({
                            type: "confirm",
                            name: "shouldOverwrite",
                            message: `File ${highlighter.info(path.relative(cwd, targetPath))} already exists. Overwrite?`,
                            initial: false,
                        })

                        if (!shouldOverwrite) {
                            logger.info(`Skipping ${file.path}`)
                            continue
                        }
                    }
                }

                // Transform import paths to match user's configured aliases
                const transformedContent = transformImports(file.content, config)

                filesToWrite.push({
                    path: targetPath,
                    content: transformedContent,
                })
            }
        }

        const writeSpinner = spinner("Writing files...").start()

        for (const file of filesToWrite) {
            await fs.ensureDir(path.dirname(file.path))
            await fs.writeFile(file.path, file.content, "utf-8")
        }

        writeSpinner.succeed(`Wrote ${filesToWrite.length} file(s).`)

        // Auto-install npm dependencies (only those not already installed)
        if (npmDependencies.size > 0) {
            const installedDeps = await getInstalledDependencies(cwd)
            const depsToInstall = Array.from(npmDependencies).filter(
                (dep) => !installedDeps.has(dep)
            )

            if (depsToInstall.length > 0) {
                const packageManager = await detectPackageManager(cwd)

                logger.break()
                logger.info(`Installing ${depsToInstall.length} dependencies...`)

                const installSpinner = spinner(
                    `Running ${getInstallCommand(packageManager, depsToInstall)}`
                ).start()

                const success = await installDependencies(cwd, depsToInstall, { silent: true })

                if (success) {
                    installSpinner.succeed("Dependencies installed.")
                } else {
                    installSpinner.fail("Failed to install dependencies.")
                    logger.break()
                    logger.warn("Please install manually:")
                    logger.log(`  ${getInstallCommand(packageManager, depsToInstall)}`)
                }
            }
        }

        logger.break()
        logger.success(`${highlighter.success("Success!")} Components added.`)
        logger.break()

        const addedComponents = resolvedItems.map((item) => item.name)
        logger.info(`Added: ${addedComponents.join(", ")}`)
    } catch (error) {
        addSpinner.fail("Failed to add components.")
        throw error
    }
}

/**
 * Strips the alias prefix from a path (e.g., "@/", "~/", "#/").
 */
function stripAliasPrefix(aliasPath: string): string {
    // Common alias prefixes to strip
    const prefixes = ["@/", "~/", "#/", "$/"]
    for (const prefix of prefixes) {
        if (aliasPath.startsWith(prefix)) {
            return aliasPath.slice(prefix.length)
        }
    }
    return aliasPath
}

function resolveFilePath(cwd: string, config: Config, filePath: string): string {
    if (filePath.startsWith("components/ui/")) {
        const uiAlias = config.aliases.ui || `${config.aliases.components}/ui`
        const resolvedPath = stripAliasPrefix(uiAlias)
        return path.resolve(
            cwd,
            filePath.replace("components/ui/", resolvedPath + "/")
        )
    }

    if (filePath.startsWith("lib/")) {
        const libAlias = config.aliases.lib || "@/lib"
        const resolvedPath = stripAliasPrefix(libAlias)
        return path.resolve(
            cwd,
            filePath.replace("lib/", resolvedPath + "/")
        )
    }

    if (filePath.startsWith("hooks/")) {
        const hooksAlias = config.aliases.hooks || "@/hooks"
        const resolvedPath = stripAliasPrefix(hooksAlias)
        return path.resolve(
            cwd,
            filePath.replace("hooks/", resolvedPath + "/")
        )
    }

    return path.resolve(cwd, filePath)
}
