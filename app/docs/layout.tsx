import { ColorThemePicker } from "@/components/site/color-theme-picker"
import { DesktopSidebar, MobileHeader } from "@/components/docs/docs-sidebar"
import { DocsHeader } from "@/components/docs/docs-header"
import { OnThisPage } from "@/components/docs/on-this-page"
import { Suspense } from "react"
import { getDocsNavigation } from "@/lib/mdx"

export default async function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const navigation = await getDocsNavigation()

    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-bg">
            <Suspense fallback={<aside aria-hidden className="fixed top-0 left-0 z-30 hidden h-screen w-64 border-r-2 border-black bg-white md:block" />}>
                <DesktopSidebar navigation={navigation} />
            </Suspense>
            <Suspense fallback={<div aria-hidden className="sticky top-0 z-40 h-12 border-b-2 border-black bg-main md:hidden" />}>
                <MobileHeader navigation={navigation} />
            </Suspense>

            <main id="main-content" tabIndex={-1} className="flex-1 md:pl-64">
                <Suspense fallback={<div aria-hidden className="hidden h-[3.75rem] md:block" />}>
                    <DocsHeader />
                </Suspense>
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 xl:grid xl:max-w-none xl:grid-cols-[minmax(0,60rem)_13rem] xl:gap-10">
                    <div className="min-w-0" data-docs-content>
                        {children}
                    </div>
                    <Suspense fallback={null}>
                        <OnThisPage />
                    </Suspense>
                </div>
            </main>
            <ColorThemePicker />
        </div>
    )
}
