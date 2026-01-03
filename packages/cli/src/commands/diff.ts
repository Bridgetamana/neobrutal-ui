import path from "path"
import fs from "fs-extra"
import { Command } from "commander"
import { z } from "zod"
import * as Diff from "diff"
import { logger, highlighter } from "../utils/logger.js"
import { spinner } from "../utils/spinner.js"
import { handleError } from "../utils/errors.js"
import { getConfig, type Config } from "../utils/config.js"
import { getRegistryItem } from "../utils/registry.js"

const diffOptionsSchema = z.object({
    component: z.string(),
    cwd: z.string(),
    noDiff: z.boolean(),
    context: z.number(),
})

export const diff = new Command()
    .name("diff")
    .description("show differences between local and registry version")
    .argument("<component>", "the component to diff")
    .option(
        "-c, --cwd <cwd>",
        "the working directory. defaults to the current directory.",
        process.cwd()
    )
    .option(
        "--no-diff",
        "only show if files differ, don't show the actual diff",
        false
    )
    .option(
        "--context <lines>",
        "number of context lines to show",
        "3"
    )
    .action(async (component, opts) => {
        try {
            const options = diffOptionsSchema.parse({
                component,
                cwd: path.resolve(opts.cwd),
                noDiff: opts.noDiff ?? false,
                context: parseInt(opts.context ?? "3", 10),
            })

            await runDiff(options)
        } catch (error) {
            handleError(error)
        }
    })

async function runDiff(options: z.infer<typeof diffOptionsSchema>): Promise<void> {
    const { component, cwd, noDiff, context } = options

    const config = await getConfig(cwd)

    if (!config) {
        logger.error(
            `No ${highlighter.info("components.json")} file found at ${highlighter.info(cwd)}.`
        )
        logger.info("Run `npx neobrutal init` to initialize the project.")
        return
    }

    const diffSpinner = spinner(`Checking ${component}...`).start()

    try {
        const registryItem = await getRegistryItem(component)

        diffSpinner.succeed(`Found ${component} in registry.`)

        let hasChanges = false

        for (const file of registryItem.files) {
            const localPath = resolveFilePath(cwd, config, file.path)

            if (!await fs.pathExists(localPath)) {
                logger.break()
                logger.warn(`${highlighter.warn(file.path)} does not exist locally.`)
                logger.info("  Run `npx neobrutal add " + component + "` to add it.")
                hasChanges = true
                continue
            }

            const localContent = await fs.readFile(localPath, "utf-8")
            const registryContent = file.content

            if (localContent === registryContent) {
                logger.break()
                logger.success(`${highlighter.success(file.path)} is up to date.`)
            } else {
                hasChanges = true
                logger.break()
                logger.warn(`${highlighter.warn(file.path)} has local modifications.`)

                if (!noDiff) {
                    printUnifiedDiff(file.path, localContent, registryContent, context)
                }
            }
        }

        if (hasChanges) {
            logger.break()
            logger.info("To update to the latest version, run:")
            logger.break()
            logger.log(`  ${highlighter.code(`npx neobrutal add ${component} --overwrite`)}`)
            logger.break()
        }
    } catch (error) {
        diffSpinner.fail(`Failed to check ${component}.`)
        throw error
    }
}

function printUnifiedDiff(
    filePath: string,
    localContent: string,
    registryContent: string,
    contextLines: number
): void {
    const patch = Diff.createPatch(
        filePath,
        localContent,
        registryContent,
        "local",
        "registry",
        { context: contextLines }
    )

    const lines = patch.split("\n")

    // Skip the header lines and print with colors
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        // Skip first 4 header lines (---, +++, @@)
        if (i < 2) {
            continue
        }

        if (line.startsWith("@@")) {
            // Hunk header - cyan
            console.log(`\x1b[36m${line}\x1b[0m`)
        } else if (line.startsWith("-")) {
            // Deletion - red (this is what's in local that's not in registry)
            console.log(`\x1b[31m${line}\x1b[0m`)
        } else if (line.startsWith("+")) {
            // Addition - green (this is what's in registry that's not in local)
            console.log(`\x1b[32m${line}\x1b[0m`)
        } else {
            // Context line
            console.log(line)
        }
    }
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
