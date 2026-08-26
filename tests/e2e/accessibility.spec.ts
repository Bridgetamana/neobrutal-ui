import AxeBuilder from "@axe-core/playwright"
import { expect, test, type Page } from "@playwright/test"

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]

async function expectNoAccessibilityViolations(page: Page) {
    const results = await new AxeBuilder({ page })
        .withTags(WCAG_TAGS)
        .analyze()

    expect(
        results.violations,
        results.violations
            .map((violation) => {
                const targets = violation.nodes
                    .flatMap((node) => node.target)
                    .join(", ")
                return `${violation.id}: ${violation.help}\n${targets}`
            })
            .join("\n\n")
    ).toEqual([])
}

test.describe("page accessibility", () => {
    for (const route of [
        "/",
        "/docs/installation",
        "/docs/components/button",
        "/docs/components/date-picker",
    ]) {
        test(`${route} has no detectable WCAG A/AA violations`, async ({ page }) => {
            await page.goto(route)
            await expect(page.locator("#main-content")).toBeVisible()
            await expectNoAccessibilityViolations(page)
        })
    }
})

test("command search remains accessible while loading results", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("button", { name: "Search documentation" }).click()

    const search = page.getByRole("combobox", {
        name: "Search components and documentation",
    })
    await expect(search).toBeFocused()
    await search.fill("button")
    await expect(page.getByRole("option", { name: "Button" })).toBeVisible()

    await expectNoAccessibilityViolations(page)

    await page.keyboard.press("Escape")
    await expect(page.getByRole("button", { name: "Search documentation" })).toBeFocused()
})

test("mobile navigation traps and restores keyboard focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/")

    const trigger = page.getByRole("button", { name: "Open menu" })
    await trigger.click()

    const menu = page.getByRole("dialog", { name: "Site navigation" })
    await expect(menu).toBeVisible()
    await expect(menu.getByRole("link", { name: "Docs" })).toBeFocused()
    await expectNoAccessibilityViolations(page)

    await page.keyboard.press("Escape")
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused()
})

test("component preview supports arrow-key tab navigation", async ({ page }) => {
    await page.goto("/docs/components/button")

    const tablist = page.getByRole("tablist", { name: "Component example" }).first()
    const previewTab = tablist.getByRole("tab", { name: "Preview" })
    const codeTab = tablist.getByRole("tab", { name: "Code" })

    await previewTab.focus()
    await previewTab.press("ArrowRight")
    await expect(codeTab).toBeFocused()
    await expect(codeTab).toHaveAttribute("aria-selected", "true")
    await expectNoAccessibilityViolations(page)
})

test("date picker supports keyboard date selection", async ({ page }) => {
    await page.goto("/docs/components/date-picker")
    await page.getByRole("button", { name: "Choose date" }).first().click()

    const calendar = page.getByRole("grid")
    await expect(calendar).toBeVisible()

    const focusedDay = calendar.locator("button:focus")
    await expect(focusedDay).toHaveCount(1)
    await focusedDay.press("ArrowRight")

    const selectedDay = calendar.locator('[role="gridcell"][aria-selected="true"] button')
    await expect(selectedDay).toBeFocused()
    await expectNoAccessibilityViolations(page)

    await page.getByRole("button", { name: "Apply" }).click()
    await expect(page.getByRole("button", { name: /^Change date,/ }).first()).toBeVisible()
})
