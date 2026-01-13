import path from "path"
import fs from "fs-extra"
import { Command } from "commander"
import prompts from "prompts"
import { z } from "zod"
import { logger, highlighter } from "../utils/logger.js"
import { spinner } from "../utils/spinner.js"
import { handleError } from "../utils/errors.js"
import { getConfig, writeConfig, getProjectInfo, type Config, type ProjectInfo } from "../utils/config.js"
import {
    detectPackageManager,
    installDependencies,
    getInstallCommand,
} from "../utils/package-manager.js"

const initOptionsSchema = z.object({
    cwd: z.string(),
    yes: z.boolean(),
    force: z.boolean(),
    skipCss: z.boolean(),
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
    .option("--skip-css", "skip CSS variable injection.", false)
    .action(async (opts) => {
        try {
            const options = initOptionsSchema.parse({
                cwd: path.resolve(opts.cwd),
                yes: opts.yes,
                force: opts.force,
                skipCss: opts.skipCss,
            })

            await runInit(options)
        } catch (error) {
            handleError(error)
        }
    })

export async function runInit(
    options: z.infer<typeof initOptionsSchema>
): Promise<void> {
    const { cwd, yes, force, skipCss } = options

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

    const frameworkDisplay = getFrameworkDisplayName(projectInfo.framework)
    logger.info(`Detected ${highlighter.info(frameworkDisplay)} project.`)
    if (projectInfo.tailwindCss) {
        logger.info(`Tailwind CSS detected.`)
    }
    if (projectInfo.aliasPrefix !== "@/") {
        logger.info(`Using alias prefix: ${highlighter.info(projectInfo.aliasPrefix)}`)
    }
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

    await writeConfig(cwd, config as Config)

    initSpinner.succeed("Project initialized successfully.")

    // Inject CSS variables if CSS file exists
    if (!skipCss && (config as Config).tailwind?.css) {
        const cssPath = path.resolve(cwd, (config as Config).tailwind.css)
        if (await fs.pathExists(cssPath)) {
            const cssSpinner = spinner("Injecting CSS variables...").start()
            const injected = await injectCssVariables(cssPath)
            if (injected) {
                cssSpinner.succeed("Neobrutalism CSS variables added.")
            } else {
                cssSpinner.succeed("CSS variables already present.")
            }
        }
    }

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

function getFrameworkDisplayName(framework: string): string {
    const displayNames: Record<string, string> = {
        "next-app": "Next.js (App Router)",
        "next-pages": "Next.js (Pages Router)",
        vite: "Vite",
        remix: "Remix",
        astro: "Astro",
        unknown: "Unknown",
    }
    return displayNames[framework] || framework
}

function getDefaultConfig(projectInfo: ProjectInfo): Partial<Config> {
    const baseDir = projectInfo.srcDir ? "src/" : ""
    const prefix = projectInfo.aliasPrefix

    return {
        style: "default",
        rsc: projectInfo.framework === "next-app",
        tsx: projectInfo.typescript,
        tailwind: {
            config: "",
            css: projectInfo.cssPath || `${baseDir}app/globals.css`,
            baseColor: "neutral",
            cssVariables: true,
            prefix: "",
        },
        aliases: {
            components: `${prefix}components`,
            utils: `${prefix}lib/utils`,
            ui: `${prefix}components/ui`,
            lib: `${prefix}lib`,
            hooks: `${prefix}hooks`,
        },
    }
}

async function promptForConfig(projectInfo: ProjectInfo): Promise<Partial<Config>> {
    const baseDir = projectInfo.srcDir ? "src/" : ""
    const prefix = projectInfo.aliasPrefix

    const { cssPath } = await prompts({
        type: "text",
        name: "cssPath",
        message: "Where is your global CSS file?",
        initial: projectInfo.cssPath || `${baseDir}app/globals.css`,
    })

    const { componentsAlias } = await prompts({
        type: "text",
        name: "componentsAlias",
        message: "Configure the import alias for components:",
        initial: `${prefix}components`,
    })

    const { utilsAlias } = await prompts({
        type: "text",
        name: "utilsAlias",
        message: "Configure the import alias for utils:",
        initial: `${prefix}lib/utils`,
    })

    return {
        style: "default",
        rsc: projectInfo.framework === "next-app",
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
            lib: `${prefix}lib`,
            hooks: `${prefix}hooks`,
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

/**
 * Neobrutalism CSS variables for the design system.
 * Includes @theme inline block for Tailwind v4 compatibility.
 */
const NEOBRUTAL_CSS_VARIABLES = `
/* Neobrutal UI - Tailwind v4 Theme */
@theme inline {
  --color-background: var(--bg);
  --color-foreground: var(--black);
  --color-main: var(--main);
  --color-bg: var(--bg);
  --shadow-brutal: 4px 4px 0px 0px var(--black);
  --radius-base: var(--radius);
}

:root {
  --white: #ffffff;
  --black: #000000;
  --main: #b6ace4;
  --bg: #f0eefc;
  --radius: 5px;
}

@layer utilities {
  .shadow-brutal {
    box-shadow: var(--shadow-brutal);
  }
}
`

/**
 * Injects neobrutalism CSS variables into the user's global CSS file.
 * Returns true if variables were injected, false if they already exist.
 */
async function injectCssVariables(cssPath: string): Promise<boolean> {
    const content = await fs.readFile(cssPath, "utf-8")

    // Check if CSS variables are already present
    if (content.includes("--main:") && content.includes("--shadow-brutal:")) {
        return false
    }

    // Find the best injection point
    let newContent: string

    // If there's a :root block, inject after @import statements
    if (content.includes("@import")) {
        const importEndIndex = content.lastIndexOf("@import")
        const lineEnd = content.indexOf(";", importEndIndex)
        newContent =
            content.slice(0, lineEnd + 1) +
            "\n" +
            NEOBRUTAL_CSS_VARIABLES +
            content.slice(lineEnd + 1)
    } else {
        // Inject at the top
        newContent = NEOBRUTAL_CSS_VARIABLES + "\n" + content
    }

    await fs.writeFile(cssPath, newContent, "utf-8")
    return true
}
