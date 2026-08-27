import assert from "node:assert/strict"
import * as fs from "node:fs/promises"
import * as os from "node:os"
import * as path from "node:path"
import test from "node:test"
import {
    createRegistryArtifacts,
    findRegistryDrift,
    parseRegistry,
    resolveRegistrySourcePath,
    writeRegistryArtifacts,
} from "../../scripts/registry-core.js"

function fixtureRegistry(registryDependencies: string[] = []): Record<string, unknown> {
    return {
        name: "fixture",
        homepage: "https://example.com",
        items: [{
            name: "button",
            type: "registry:ui",
            description: "Trigger an action.",
            dependencies: [],
            registryDependencies,
            files: [{ path: "components/ui/button.tsx", type: "registry:ui" }],
        }],
    }
}

async function createFixture(): Promise<string> {
    const rootDir = await fs.mkdtemp(path.join(os.tmpdir(), "neobrutal-registry-"))
    await fs.mkdir(path.join(rootDir, "components", "ui"), { recursive: true })
    await fs.writeFile(path.join(rootDir, "components", "ui", "button.tsx"), "export const Button = true\r\n", "utf8")
    await fs.writeFile(path.join(rootDir, "registry.json"), JSON.stringify(fixtureRegistry()), "utf8")
    return rootDir
}

test("rejects registry paths that can escape or vary across platforms", () => {
    const rootDir = path.resolve("fixture")
    for (const unsafePath of ["../secret.ts", "/secret.ts", "components/../secret.ts", "components\\secret.ts"]) {
        assert.throws(() => resolveRegistrySourcePath(rootDir, unsafePath), /Invalid registry/)
    }
    assert.equal(
        resolveRegistrySourcePath(rootDir, "components/ui/button.tsx"),
        path.join(rootDir, "components", "ui", "button.tsx"),
    )
})

test("rejects duplicate, missing, and circular registry dependencies", () => {
    const duplicate = fixtureRegistry()
    const duplicateItems = duplicate.items as unknown[]
    duplicateItems.push((fixtureRegistry().items as unknown[])[0])
    assert.throws(() => parseRegistry(duplicate), /item names must be unique/)
    assert.throws(() => parseRegistry(fixtureRegistry(["missing"])), /references missing item/)

    const circular = fixtureRegistry(["link"])
    const circularItems = circular.items as Array<Record<string, unknown>>
    circularItems.push({
        name: "link",
        type: "registry:ui",
        registryDependencies: ["button"],
        files: [{ path: "components/ui/link.tsx", type: "registry:ui" }],
    })
    assert.throws(() => parseRegistry(circular), /dependency cycle detected/)
})

test("reserves the generated index filename", () => {
    const registry = fixtureRegistry()
    const item = (registry.items as Array<Record<string, unknown>>)[0]
    item.name = "index"
    assert.throws(() => parseRegistry(registry), /reserved for the generated registry index/)
})

test("generation is deterministic and normalizes embedded source line endings", async (context) => {
    const rootDir = await createFixture()
    context.after(() => fs.rm(rootDir, { recursive: true, force: true }))
    const first = await createRegistryArtifacts(rootDir)
    const second = await createRegistryArtifacts(rootDir)
    assert.deepEqual([...first.files], [...second.files])
    assert.match(first.files.get("public/r/button.json") ?? "", /export const Button = true\\n/)
    assert.doesNotMatch(first.files.get("public/r/button.json") ?? "", /\\r/)
})

test("drift check keeps registry output and search data synchronized", async (context) => {
    const rootDir = await createFixture()
    context.after(() => fs.rm(rootDir, { recursive: true, force: true }))
    const artifacts = await createRegistryArtifacts(rootDir)
    await writeRegistryArtifacts(rootDir, artifacts)
    assert.deepEqual(await findRegistryDrift(rootDir), [])

    await fs.appendFile(path.join(rootDir, "lib", "search-data.ts"), "// stale\n", "utf8")
    await fs.writeFile(path.join(rootDir, "public", "r", "removed.json"), "{}\n", "utf8")
    assert.deepEqual(await findRegistryDrift(rootDir), ["lib/search-data.ts", "public/r/removed.json"])
})
