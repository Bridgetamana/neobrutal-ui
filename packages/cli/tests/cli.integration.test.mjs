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

async function startRegistry(items) {
    const registryItems = Array.isArray(items) ? items : [items]
    const registryIndex = registryItems.map((item) => ({
        name: item.name,
        type: item.type,
        description: item.description,
        dependencies: item.dependencies,
        registryDependencies: item.registryDependencies,
    }))
    const itemsByPath = new Map(
        registryItems.map((item) => [`/${item.name}.json`, item])
    )
    const server = createServer((request, response) => {
        const body = request.url === "/index.json"
            ? registryIndex
            : itemsByPath.get(request.url)

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

async function createFixture(config = componentConfig) {
    const cwd = await mkdtemp(path.join(tmpdir(), "neobrutal-cli-"))
    await writeFile(
        path.join(cwd, "components.json"),
        `${JSON.stringify(config, null, 2)}\n`,
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

test("update applies dependencies, new files, and configured aliases", async (t) => {
    const customConfig = {
        ...componentConfig,
        aliases: {
            components: "~/components",
            utils: "$/shared/cn",
            ui: "#/design-system/ui",
            lib: "$/shared",
            hooks: "~/custom-hooks",
        },
    }
    const cwd = await createFixture(customConfig)
    const buttonPath = path.join(cwd, "design-system", "ui", "button.tsx")
    const hookPath = path.join(cwd, "custom-hooks", "use-button.ts")
    const utilsPath = path.join(cwd, "shared", "cn.ts")
    const buttonContent = [
        'import { cn } from "@/lib/utils"',
        'import { useButton } from "@/hooks/use-button"',
        "export const Button = () => cn(useButton())",
        "",
    ].join("\n")
    const expectedButtonContent = [
        'import { cn } from "$/shared/cn"',
        'import { useButton } from "~/custom-hooks/use-button"',
        "export const Button = () => cn(useButton())",
        "",
    ].join("\n")
    const button = {
        ...registryItem(buttonContent),
        registryDependencies: ["utils"],
        files: [
            registryItem(buttonContent).files[0],
            {
                path: "hooks/use-button.ts",
                content: "export const useButton = () => 'button'\n",
                type: "registry:hook",
            },
        ],
    }
    const utils = {
        name: "utils",
        type: "registry:lib",
        description: "Test utilities.",
        files: [
            {
                path: "lib/utils.ts",
                content: "export const cn = (value) => value\n",
                type: "registry:lib",
            },
        ],
    }

    await mkdir(path.dirname(buttonPath), { recursive: true })
    await writeFile(buttonPath, "export const Button = () => 'old'\n", "utf8")
    const registry = await startRegistry([button, utils])
    t.after(async () => {
        await registry.close()
        await rm(cwd, { recursive: true, force: true })
    })

    const result = await runCli(
        ["update", "button", "--force", "--cwd", cwd],
        cwd,
        registry.url
    )

    assert.equal(result.code, 0, result.stderr || result.stdout)
    assert.equal(await readFile(buttonPath, "utf8"), expectedButtonContent)
    assert.equal(
        await readFile(hookPath, "utf8"),
        "export const useButton = () => 'button'\n"
    )
    assert.equal(
        await readFile(utilsPath, "utf8"),
        "export const cn = (value) => value\n"
    )
    assert.match(result.stdout, /new file/)
    assert.match(result.stdout, /Update complete/)
})

test("update --all detects installed components by their registry files", async (t) => {
    const cwd = await createFixture()
    const componentPath = path.join(cwd, "components", "ui", "button-root.tsx")
    const item = registryItem(
        "export const ButtonRoot = () => 'registry'\n",
        "components/ui/button-root.tsx"
    )
    await mkdir(path.dirname(componentPath), { recursive: true })
    await writeFile(componentPath, "export const ButtonRoot = () => 'local'\n", "utf8")
    const registry = await startRegistry(item)
    t.after(async () => {
        await registry.close()
        await rm(cwd, { recursive: true, force: true })
    })

    const result = await runCli(
        ["update", "--all", "--force", "--cwd", cwd],
        cwd,
        registry.url
    )

    assert.equal(result.code, 0, result.stderr || result.stdout)
    assert.equal(
        await readFile(componentPath, "utf8"),
        "export const ButtonRoot = () => 'registry'\n"
    )
})

test("update ignores line-ending-only differences", async (t) => {
    const cwd = await createFixture()
    const componentPath = path.join(cwd, "components", "ui", "button.tsx")
    const localContent = "export const Button = () => null\n"
    const registry = await startRegistry(
        registryItem("export const Button = () => null\r\n")
    )
    await mkdir(path.dirname(componentPath), { recursive: true })
    await writeFile(componentPath, localContent, "utf8")
    t.after(async () => {
        await registry.close()
        await rm(cwd, { recursive: true, force: true })
    })

    const result = await runCli(
        ["update", "button", "--force", "--cwd", cwd],
        cwd,
        registry.url
    )

    assert.equal(result.code, 0, result.stderr || result.stdout)
    assert.equal(await readFile(componentPath, "utf8"), localContent)
    assert.match(result.stdout, /All components are up to date/)
})

test("diff agrees that line-ending-only differences are up to date", async (t) => {
    const cwd = await createFixture()
    const componentPath = path.join(cwd, "components", "ui", "button.tsx")
    const registry = await startRegistry(
        registryItem("export const Button = () => null\r\n")
    )
    await mkdir(path.dirname(componentPath), { recursive: true })
    await writeFile(componentPath, "export const Button = () => null\n", "utf8")
    t.after(async () => {
        await registry.close()
        await rm(cwd, { recursive: true, force: true })
    })

    const result = await runCli(["diff", "button", "--cwd", cwd], cwd, registry.url)

    assert.equal(result.code, 0, result.stderr || result.stdout)
    assert.match(result.stdout, /is up to date/)
    assert.doesNotMatch(result.stdout, /local modifications/)
})

test("update surfaces invalid registry data instead of masking it as not found", async (t) => {
    const cwd = await createFixture()
    const registry = await startRegistry(
        registryItem("malicious content\n", "../escape.ts")
    )
    t.after(async () => {
        await registry.close()
        await rm(cwd, { recursive: true, force: true })
    })

    const result = await runCli(
        ["update", "button", "--force", "--cwd", cwd],
        cwd,
        registry.url
    )

    assert.notEqual(result.code, 0)
    assert.match(result.stdout, /Invalid registry file path/)
    assert.doesNotMatch(result.stdout, /not found in registry/)
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
