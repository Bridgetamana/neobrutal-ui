import { Command } from "commander"
import { createRequire } from "module"
import { init } from "./commands/init.js"
import { add } from "./commands/add.js"
import { list } from "./commands/list.js"
import { diff } from "./commands/diff.js"
import { update } from "./commands/update.js"

const require = createRequire(import.meta.url)
const packageJson = require("../package.json") as { name: string; version: string }

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
    const program = new Command()
        .name("neobrutal")
        .description("Add Neobrutal UI components to your project")
        .version(
            packageJson.version,
            "-v, --version",
            "display the version number"
        )

    program
        .addCommand(init)
        .addCommand(add)
        .addCommand(list)
        .addCommand(diff)
        .addCommand(update)

    program.parse()
}

main()
