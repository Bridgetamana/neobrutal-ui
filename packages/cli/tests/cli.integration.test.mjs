import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { once } from "node:events"
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { createServer } from "node:http"
import { tmpdir } from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import test from "node:test"

const cliPath = fileURLToPath(new URL("../dist/index.js", import.meta.url))

const registryIndex = [
    {
        name: "button",
        type: "registry:ui",
        description: "A test button.",
    },
]

const componentConfig = {
    style: "default",
    rsc: true,
    tsx: true,
    tailwind: {
        css: "app/globals.css",
        baseColor: "neutral",
        cssVariables: true,
    },
    aliases: {
        components: "@/components",
        utils: "@/lib/utils",
        ui: "@/components/ui",
        lib: "@/lib",
        hooks: "@/hooks",
    },
}

function registryItem(content, filePath = "components/ui/button.tsx") {
    return {
        name: "button",
        type: "registry:ui",
        description: "A test button.",
        files: [
            {
                path: filePath,
                content,
                type: "registry:ui",
            },
        ],
    }
}

async function startRegistry(item) {
    const server = createServer((request, response) => {
        const body = request.url === "/index.json"
            ? registryIndex
            : request.url === "/button.json"
                ? item
                : null

        if (!body) {
            response.writeHead(404).end()
            return
        }

        response.writeHead(200, { "content-type": "application/json" })
        response.end(JSON.stringify(body))
    })

    server.listen(0, "127.0.0.1")
    await once(server, "listening")

    const address = server.address()
    assert.ok(address && typeof address === "object")

    return {
        url: `http://127.0.0.1:${address.port}`,
        async close() {
            const closed = once(server, "close")
            server.close()
            server.closeAllConnections()
            await closed
        },
    }
}

function runCli(args, cwd, registryUrl) {
    return new Promise((resolve, reject) => {
        const child = spawn(process.execPath, [cliPath, ...args], {
            cwd,
            env: {
                ...process.env,
                FORCE_COLOR: "0",
                NEOBRUTAL_REGISTRY_URL: registryUrl,
            },
            windowsHide: true,
        })

        let stdout = ""
        let stderr = ""

        child.stdout.setEncoding("utf8")
        child.stderr.setEncoding("utf8")
        child.stdout.on("data", (chunk) => { stdout += chunk })
        child.stderr.on("data", (chunk) => { stderr += chunk })
        child.on("error", reject)
        child.on("close", (code, signal) => resolve({ code, signal, stdout, stderr }))
    })
}

async function createFixture() {
    const cwd = await mkdtemp(path.join(tmpdir(), "neobrutal-cli-"))
    await writeFile(
        path.join(cwd, "components.json"),
        `${JSON.stringify(componentConfig, null, 2)}\n`,
        "utf8"
    )
    return cwd
}

test("list reads components from the configured registry", async (t) => {
    const cwd = await createFixture()
    const registry = await startRegistry(registryItem("export const Button = () => null\n"))
    t.after(async () => {
        await registry.close()
        await rm(cwd, { recursive: true, force: true })
    })

    const result = await runCli(["list"], cwd, registry.url)

    assert.equal(result.code, 0, result.stderr || result.stdout)
    assert.match(result.stdout, /button/)
    assert.match(result.stdout, /A test button/)
})

test("add writes a registry component into the configured UI directory", async (t) => {
    const content = "export const Button = () => null\n"
    const cwd = await createFixture()
    const registry = await startRegistry(registryItem(content))
    t.after(async () => {
        await registry.close()
        await rm(cwd, { recursive: true, force: true })
    })

    const result = await runCli(["add", "button", "--yes", "--cwd", cwd], cwd, registry.url)

    assert.equal(result.code, 0, result.stderr || result.stdout)
    assert.equal(
        await readFile(path.join(cwd, "components", "ui", "button.tsx"), "utf8"),
        content
    )
    assert.match(result.stdout, /Components added/)
})

test("update --dry-run reports changes without modifying local files", async (t) => {
    const cwd = await createFixture()
    const componentPath = path.join(cwd, "components", "ui", "button.tsx")
    const localContent = "export const Button = () => 'local'\n"
    const registry = await startRegistry(
        registryItem("export const Button = () => 'registry'\n")
    )
    await mkdir(path.dirname(componentPath), { recursive: true })
    await writeFile(componentPath, localContent, "utf8")
    t.after(async () => {
        await registry.close()
        await rm(cwd, { recursive: true, force: true })
    })

    const result = await runCli(
        ["update", "button", "--dry-run", "--cwd", cwd],
        cwd,
        registry.url
    )

    assert.equal(result.code, 0, result.stderr || result.stdout)
    assert.equal(await readFile(componentPath, "utf8"), localContent)
    assert.match(result.stdout, /Dry run complete/)
})

test("add rejects registry paths that escape the project", async (t) => {
    const cwd = await createFixture()
    const escapedPath = path.resolve(cwd, "..", "escape.ts")
    const registry = await startRegistry(
        registryItem("malicious content\n", "../escape.ts")
    )
    t.after(async () => {
        await registry.close()
        await rm(cwd, { recursive: true, force: true })
        await rm(escapedPath, { force: true })
    })

    const result = await runCli(["add", "button", "--yes", "--cwd", cwd], cwd, registry.url)

    assert.notEqual(result.code, 0)
    assert.match(result.stdout, /Invalid registry file path/)
    await assert.rejects(readFile(escapedPath, "utf8"), { code: "ENOENT" })
})
