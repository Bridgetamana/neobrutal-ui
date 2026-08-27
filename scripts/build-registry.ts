import * as path from "node:path"
import { fileURLToPath } from "node:url"
import { createRegistryArtifacts, writeRegistryArtifacts } from "./registry-core.js"

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

async function main(): Promise<void> {
    console.log("Building registry...")
    const artifacts = await createRegistryArtifacts(rootDir)
    await writeRegistryArtifacts(rootDir, artifacts)
    console.log(`Built ${artifacts.itemCount} registry items and synchronized search data.`)
}

void main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
})
