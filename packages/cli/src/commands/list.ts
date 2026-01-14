import { Command } from "commander"
import { logger, highlighter } from "../utils/logger.js"
import { spinner } from "../utils/spinner.js"
import { handleError } from "../utils/errors.js"
import { getRegistryIndex } from "../utils/registry.js"

export const list = new Command()
    .name("list")
    .description("list all available components")
    .action(async () => {
        try {
            await runList()
        } catch (error) {
            handleError(error)
        }
    })

async function runList(): Promise<void> {
    const listSpinner = spinner("Fetching components...").start()

    try {
        const registryIndex = await getRegistryIndex()
        listSpinner.succeed(`Found ${registryIndex.length} component(s).`)

        logger.break()

        const uiComponents = registryIndex.filter((item) => item.type === "registry:ui")
        const libComponents = registryIndex.filter((item) => item.type === "registry:lib")
        const hookComponents = registryIndex.filter((item) => item.type === "registry:hook")

        if (uiComponents.length > 0) {
            logger.log(highlighter.info("UI Components:"))
            logger.break()

            const maxNameLength = Math.max(...uiComponents.map((c) => c.name.length))

            for (const component of uiComponents) {
                const name = component.name.padEnd(maxNameLength + 2)
                const description = component.description || ""
                logger.log(`  ${highlighter.success(name)} ${description}`)
            }

            logger.break()
        }

        if (libComponents.length > 0) {
            logger.log(highlighter.info("Utilities:"))
            logger.break()

            for (const component of libComponents) {
                const description = component.description || ""
                logger.log(`  ${highlighter.success(component.name)} ${description}`)
            }

            logger.break()
        }

        if (hookComponents.length > 0) {
            logger.log(highlighter.info("Hooks:"))
            logger.break()

            for (const component of hookComponents) {
                const description = component.description || ""
                logger.log(`  ${highlighter.success(component.name)} ${description}`)
            }

            logger.break()
        }

        logger.info("To add a component, run:")
        logger.break()
        logger.log(`  ${highlighter.code("npx neobrutal add <component>")}`)
        logger.break()
    } catch (error) {
        listSpinner.fail("Failed to fetch components.")
        throw error
    }
}
