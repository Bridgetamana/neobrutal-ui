import path from "path"
import fs from "fs-extra"
import { Command } from "commander"
import prompts from "prompts"
import { z } from "zod"
import { logger, highlighter } from "../utils/logger.js"
import { spinner } from "../utils/spinner.js"
import { handleError } from "../utils/errors.js"
import { getConfig, writeConfig, getProjectInfo, type Config } from "../utils/config.js"
import {
    detectPackageManager,
    installDependencies,
    getInstallCommand,
} from "../utils/package-manager.js"

const initOptionsSchema = z.object({
    cwd: z.string(),
    yes: z.boolean(),
    force: z.boolean(),
})

export const init = new Command()
    .name("init")
    .description("initialize your project and install dependencies")
    .option(
        "-c, --cwd <cwd>",
        "the working directory. defaults to the current directory.",
        process.cwd()
    )
    .option("-y, --yes", "skip confirmation prompt.", false)
    .option("-f, --force", "force overwrite of existing configuration.", false)
    .action(async (opts) => {
        try {
            const options = initOptionsSchema.parse({
                cwd: path.resolve(opts.cwd),
                yes: opts.yes,
                force: opts.force,
            })

            await runInit(options)
        } catch (error) {
            handleError(error)
        }
    })

export async function runInit(
    options: z.infer<typeof initOptionsSchema>
): Promise<void> {
    const { cwd, yes, force } = options

    const existingConfig = await getConfig(cwd)

    if (existingConfig && !force) {
        logger.warn(
            `A ${highlighter.info("components.json")} file already exists at ${highlighter.info(cwd)}.`
        )
        const { overwrite } = await prompts({
            type: "confirm",
            name: "overwrite",
            message: "Would you like to overwrite it?",
            initial: false,
        })

        if (!overwrite) {
            logger.info("Initialization cancelled.")
            return
        }
    }

    const projectInfo = await getProjectInfo(cwd)

    logger.info(`Detected ${highlighter.info(projectInfo.framework)} project.`)
    logger.break()

    let config: Partial<Config>

    if (yes) {
        config = getDefaultConfig(projectInfo)
    } else {
        config = await promptForConfig(projectInfo)
    }

    const initSpinner = spinner("Initializing project...").start()

    await ensureDirectories(cwd, config as Config)

    await createUtilsFile(cwd, config as Config)

    await writeConfig(cwd, {
        $schema: "https://neobrutalism.dev/schema.json",
        ...config,
    } as Config)

    initSpinner.succeed("Project initialized successfully.")

    // Install base dependencies
    const baseDeps = ["clsx", "tailwind-merge"]
    const packageManager = await detectPackageManager(cwd)

    logger.break()
    logger.info("Installing base dependencies...")

    const depsSpinner = spinner(
        `Running ${getInstallCommand(packageManager, baseDeps)}`
    ).start()

    const success = await installDependencies(cwd, baseDeps, { silent: true })

    if (success) {
        depsSpinner.succeed("Base dependencies installed.")
    } else {
        depsSpinner.fail("Failed to install dependencies.")
        logger.break()
        logger.warn("Please install manually:")
        logger.log(`  ${getInstallCommand(packageManager, baseDeps)}`)
    }

    logger.break()
    logger.success(
        `${highlighter.success("Success!")} Project initialization completed.`
    )
    logger.info("You may now add components using:")
    logger.break()
    logger.log(`  ${highlighter.code("npx neobrutal add button")}`)
    logger.break()
}

function getDefaultConfig(projectInfo: {
    framework: string
    srcDir: boolean
    typescript: boolean
}): Partial<Config> {
    const baseDir = projectInfo.srcDir ? "src/" : ""

    return {
        style: "default",
        rsc: projectInfo.framework === "next",
        tsx: projectInfo.typescript,
        tailwind: {
            config: "",
            css: `${baseDir}app/globals.css`,
            baseColor: "neutral",
            cssVariables: true,
            prefix: "",
        },
        aliases: {
            components: "@/components",
            utils: "@/lib/utils",
            ui: "@/components/ui",
            lib: "@/lib",
            hooks: "@/hooks",
        },
    }
}

async function promptForConfig(projectInfo: {
    framework: string
    srcDir: boolean
    typescript: boolean
}): Promise<Partial<Config>> {
    const baseDir = projectInfo.srcDir ? "src/" : ""

    const { cssPath } = await prompts({
        type: "text",
        name: "cssPath",
        message: "Where is your global CSS file?",
        initial: `${baseDir}app/globals.css`,
    })

    const { componentsAlias } = await prompts({
        type: "text",
        name: "componentsAlias",
        message: "Configure the import alias for components:",
        initial: "@/components",
    })

    const { utilsAlias } = await prompts({
        type: "text",
        name: "utilsAlias",
        message: "Configure the import alias for utils:",
        initial: "@/lib/utils",
    })

    return {
        style: "default",
        rsc: projectInfo.framework === "next",
        tsx: projectInfo.typescript,
        tailwind: {
            config: "",
            css: cssPath,
            baseColor: "neutral",
            cssVariables: true,
            prefix: "",
        },
        aliases: {
            components: componentsAlias,
            utils: utilsAlias,
            ui: `${componentsAlias}/ui`,
            lib: "@/lib",
            hooks: "@/hooks",
        },
    }
}

/**
 * Strips the alias prefix from a path (e.g., "@/", "~/", "#/").
 */
function stripAliasPrefix(aliasPath: string): string {
    const prefixes = ["@/", "~/", "#/", "$/"]
    for (const prefix of prefixes) {
        if (aliasPath.startsWith(prefix)) {
            return aliasPath.slice(prefix.length)
        }
    }
    return aliasPath
}

async function ensureDirectories(cwd: string, config: Config): Promise<void> {
    const dirs = [
        stripAliasPrefix(config.aliases.components),
        stripAliasPrefix(config.aliases.ui || "components/ui"),
        stripAliasPrefix(config.aliases.lib || "lib"),
    ]

    for (const dir of dirs) {
        await fs.ensureDir(path.resolve(cwd, dir))
    }
}

async function createUtilsFile(cwd: string, config: Config): Promise<void> {
    const utilsPath = path.resolve(
        cwd,
        stripAliasPrefix(config.aliases.utils) + ".ts"
    )

    if (await fs.pathExists(utilsPath)) {
        return
    }

    const utilsContent = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

    await fs.ensureDir(path.dirname(utilsPath))
    await fs.writeFile(utilsPath, utilsContent, "utf-8")
}
