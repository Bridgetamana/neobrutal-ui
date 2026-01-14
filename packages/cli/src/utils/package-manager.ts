import path from "path"
import fs from "fs-extra"
import { spawn } from "child_process"
import { logger } from "./logger.js"

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

interface PackageManagerConfig {
    name: PackageManager
    installCommand: string
    addFlag: string
    devFlag: string
    lockfile: string
}

interface PackageJson {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
}

const PACKAGE_MANAGERS: Record<PackageManager, PackageManagerConfig> = {
    pnpm: {
        name: "pnpm",
        installCommand: "pnpm",
        addFlag: "add",
        devFlag: "-D",
        lockfile: "pnpm-lock.yaml",
    },
    yarn: {
        name: "yarn",
        installCommand: "yarn",
        addFlag: "add",
        devFlag: "-D",
        lockfile: "yarn.lock",
    },
    bun: {
        name: "bun",
        installCommand: "bun",
        addFlag: "add",
        devFlag: "-d",
        lockfile: "bun.lockb",
    },
    npm: {
        name: "npm",
        installCommand: "npm",
        addFlag: "install",
        devFlag: "--save-dev",
        lockfile: "package-lock.json",
    },
}

/**
 * Detects the package manager used in the project by checking for lockfiles.
 * Falls back to npm if no lockfile is found.
 */
export async function detectPackageManager(cwd: string): Promise<PackageManager> {
    // Check in order of preference: pnpm > yarn > bun > npm
    const checks: Array<{ pm: PackageManager; lockfile: string }> = [
        { pm: "pnpm", lockfile: "pnpm-lock.yaml" },
        { pm: "yarn", lockfile: "yarn.lock" },
        { pm: "bun", lockfile: "bun.lockb" },
        { pm: "npm", lockfile: "package-lock.json" },
    ]

    for (const { pm, lockfile } of checks) {
        if (await fs.pathExists(path.resolve(cwd, lockfile))) {
            return pm
        }
    }

    // Default to npm if no lockfile found
    return "npm"
}

/**
 * Gets the set of already-installed dependencies from package.json.
 */
export async function getInstalledDependencies(cwd: string): Promise<Set<string>> {
    const packageJsonPath = path.resolve(cwd, "package.json")
    const installed = new Set<string>()

    try {
        if (await fs.pathExists(packageJsonPath)) {
            const content = await fs.readFile(packageJsonPath, "utf-8")
            const pkg: PackageJson = JSON.parse(content)

            if (pkg.dependencies) {
                Object.keys(pkg.dependencies).forEach((dep) => installed.add(dep))
            }
            if (pkg.devDependencies) {
                Object.keys(pkg.devDependencies).forEach((dep) => installed.add(dep))
            }
        }
    } catch {
        // If we can't read package.json, assume nothing is installed
    }

    return installed
}

/**
 * Gets the install command for a list of dependencies.
 */
export function getInstallCommand(
    packageManager: PackageManager,
    dependencies: string[],
    isDev = false
): string {
    const config = PACKAGE_MANAGERS[packageManager]
    const devFlag = isDev ? ` ${config.devFlag}` : ""
    return `${config.installCommand} ${config.addFlag}${devFlag} ${dependencies.join(" ")}`
}

/**
 * Installs dependencies using the detected package manager.
 * Returns true if installation succeeded, false otherwise.
 */
export async function installDependencies(
    cwd: string,
    dependencies: string[],
    options: { isDev?: boolean; silent?: boolean } = {}
): Promise<boolean> {
    const { isDev = false, silent = false } = options

    if (dependencies.length === 0) {
        return true
    }

    const packageManager = await detectPackageManager(cwd)
    const config = PACKAGE_MANAGERS[packageManager]

    const args = [config.addFlag]
    if (isDev) {
        args.push(config.devFlag)
    }
    args.push(...dependencies)

    if (!silent) {
        logger.info(`Installing dependencies with ${packageManager}...`)
    }

    return new Promise((resolve) => {
        // Use shell: true on Windows for proper command resolution
        const isWindows = process.platform === "win32"
        const child = spawn(config.installCommand, args, {
            cwd,
            stdio: silent ? "ignore" : "inherit",
            shell: isWindows,
        })

        child.on("close", (code) => {
            resolve(code === 0)
        })

        child.on("error", () => {
            resolve(false)
        })
    })
}
