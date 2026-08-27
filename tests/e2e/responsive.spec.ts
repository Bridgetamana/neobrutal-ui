import { expect, test, type Page } from "@playwright/test"

const MOBILE_VIEWPORT = { width: 320, height: 568 }

async function expectNoPageOverflow(page: Page): Promise<void> {
    await expect.poll(() => page.evaluate(() => (
        document.documentElement.scrollWidth - document.documentElement.clientWidth
    ))).toBeLessThanOrEqual(1)
}

test.describe("mobile layout", () => {
    test.use({ viewport: MOBILE_VIEWPORT })

    for (const route of ["/", "/docs", "/docs/installation", "/docs/components/select"]) {
        test(`${route} does not overflow the viewport`, async ({ page }) => {
            await page.goto(route)
            await expect(page.locator("#main-content")).toBeVisible()
            await expectNoPageOverflow(page)
        })
    }

    test("site navigation provides full-width touch targets and backdrop dismissal", async ({ page }) => {
        await page.goto("/")
        await page.getByRole("button", { name: "Open menu" }).click()

        const menu = page.getByRole("dialog", { name: "Site navigation" })
        const docsLink = menu.getByRole("link", { name: "Docs" })
        await expect(menu).toBeVisible()
        await expect(docsLink).toBeFocused()

        const linkBox = await docsLink.boundingBox()
        expect(linkBox?.height).toBeGreaterThanOrEqual(44)
        expect(linkBox?.width).toBeGreaterThanOrEqual(280)

        await page.getByRole("button", { name: "Close site navigation" }).click()
        await expect(menu).toBeHidden()
        await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused()
    })

    test("docs toolbar and drawer fit without collisions", async ({ page }) => {
        await page.goto("/docs")

        const search = page.getByRole("button", { name: "Search documentation" })
        const menuTrigger = page.getByRole("button", { name: "Open menu" })
        await expect(search).toBeVisible()
        await expect(menuTrigger).toBeVisible()

        const searchBox = await search.boundingBox()
        const menuBox = await menuTrigger.boundingBox()
        expect(searchBox).not.toBeNull()
        expect(menuBox).not.toBeNull()
        expect((searchBox?.x ?? 0) + (searchBox?.width ?? 0)).toBeLessThanOrEqual(menuBox?.x ?? 0)

        await menuTrigger.click()
        const drawer = page.getByRole("dialog", { name: "Documentation navigation" })
        await expect(drawer).toBeVisible()
        await expect(drawer.getByRole("link", { name: "View on GitHub" })).toBeVisible()
        await expect.poll(async () => (await drawer.boundingBox())?.x ?? -1).toBeGreaterThanOrEqual(-0.5)

        const drawerBox = await drawer.boundingBox()
        expect(drawerBox?.x).toBeGreaterThanOrEqual(-0.5)
        expect((drawerBox?.x ?? 0) + (drawerBox?.width ?? 0)).toBeLessThanOrEqual(MOBILE_VIEWPORT.width)

        await page.getByRole("button", { name: "Close documentation navigation" }).click({
            position: { x: MOBILE_VIEWPORT.width - 8, y: 44 },
        })
        await expect(page.locator("#docs-mobile-sidebar")).toHaveAttribute("aria-hidden", "true")
    })

    test("search opens as a viewport-bounded mobile sheet", async ({ page }) => {
        await page.goto("/")
        await page.getByRole("button", { name: "Search documentation" }).click()

        const dialog = page.locator("#command-search-dialog")
        await expect(dialog).toBeVisible()
        const box = await dialog.boundingBox()
        expect(box?.x).toBeGreaterThanOrEqual(16)
        expect(box?.y).toBeGreaterThanOrEqual(16)
        expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(MOBILE_VIEWPORT.width - 16)
        expect((box?.y ?? 0) + (box?.height ?? 0)).toBeLessThanOrEqual(MOBILE_VIEWPORT.height - 16)
    })

    test("toast notifications stay within mobile safe insets", async ({ page }) => {
        await page.goto("/docs/components/toast")
        await page.getByRole("button", { name: "Basic toast" }).click()

        const notification = page
            .getByRole("region", { name: "Notifications" })
            .getByRole("dialog")
        await expect(notification).toBeVisible()

        const box = await notification.boundingBox()
        expect(box?.x).toBeGreaterThanOrEqual(16)
        expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(
            MOBILE_VIEWPORT.width - 16
        )
        await expectNoPageOverflow(page)
    })

    test("switches and inputs provide 44px touch targets", async ({ page }) => {
        await page.goto("/docs/components/switch")
        const switchBox = await page.getByRole("switch").first().boundingBox()
        expect(switchBox?.height).toBeGreaterThanOrEqual(44)

        await page.goto("/docs/components/input")
        const inputBox = await page.getByRole("textbox").first().boundingBox()
        expect(inputBox?.height).toBeGreaterThanOrEqual(44)
    })

    test("home reveals its current React offering within the first viewport", async ({ page }) => {
        await page.goto("/")

        const hero = page.locator("main > section").first()
        const stats = page.locator("main > section").nth(1)
        const statsBox = await stats.boundingBox()

        await expect(hero.getByRole("link", { name: "Get Started" })).toHaveAttribute(
            "href",
            "/docs/installation"
        )
        await expect(stats).toContainText("React")
        await expect(stats).not.toContainText("HTML")
        expect(statsBox?.y).toBeLessThan(MOBILE_VIEWPORT.height)
    })

    test("documentation pagination stacks at narrow widths", async ({ page }) => {
        await page.goto("/docs/components/select")
        const previous = page.getByRole("link", { name: /Previous Radio Group/ })
        const next = page.getByRole("link", { name: /Next Slider/ })

        const previousBox = await previous.boundingBox()
        const nextBox = await next.boundingBox()
        expect(nextBox?.y).toBeGreaterThan((previousBox?.y ?? 0) + (previousBox?.height ?? 0))
    })
})

test.describe("desktop documentation", () => {
    test.use({ viewport: { width: 1440, height: 900 } })

    test("table of contents has enough width for readable headings", async ({ page }) => {
        await page.goto("/docs/components/date-picker")

        const toc = page.getByRole("complementary", { name: "Table of contents" })
        const box = await toc.boundingBox()
        expect(box?.width).toBeGreaterThanOrEqual(208)
    })

    test("package manager tabs preserve their brand casing", async ({ page }) => {
        await page.goto("/docs/installation")

        const tablists = page.getByRole("tablist", {
            name: "CLI package manager",
        })
        await expect(tablists).toHaveCount(2)

        const tabs = tablists.first()
        await expect(tabs.getByRole("tab", { name: "npm", exact: true })).toBeVisible()
        await expect(tabs.getByRole("tab", { name: "pnpm", exact: true })).toBeVisible()
        await expect(tabs.getByRole("tab", { name: "Yarn", exact: true })).toBeVisible()
        await expect(tabs.getByRole("tab", { name: "Bun", exact: true })).toBeVisible()
    })
})
