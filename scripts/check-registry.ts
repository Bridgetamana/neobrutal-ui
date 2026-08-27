import * as path from "node:path"
import { fileURLToPath } from "node:url"
import { findRegistryDrift } from "./registry-core.js"

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

async function main(): Promise<void> {
    const drift = await findRegistryDrift(rootDir)
    if (drift.length > 0) {
        throw new Error(`Generated registry files are out of date:\n${drift.map((file) => `  - ${file}`).join("\n")}\nRun npm run registry:build and commit the result.`)
    }
    console.log("Registry source, generated files, and search data are synchronized.")
}

void main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
})
