import { ColorThemePicker } from "@/components/home/color-theme-picker"
import { DesktopSidebar, MobileHeader, DocsHeader } from "@/components/docs/docs-sidebar"
import { OnThisPage } from "@/components/docs/on-this-page"

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-bg">
            <DesktopSidebar />
            <MobileHeader />

            <main className="flex-1 md:pl-64">
                <DocsHeader />
                <div className="max-w-4xl mx-auto py-4 px-6 md:py-6 xl:max-w-none xl:grid xl:grid-cols-[minmax(0,60rem)_8rem] xl:gap-14">
                    <div className="min-w-0" data-docs-content>
                        {children}
                    </div>
                    <OnThisPage />
                </div>
            </main>
            <ColorThemePicker />
        </div>
    )
}
