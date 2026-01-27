import { ColorThemePicker } from "@/components/home/color-theme-picker"
import { DesktopSidebar, MobileHeader, DocsHeader } from "@/components/docs/docs-sidebar"

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
                <div className="container max-w-4xl py-8 px-6 md:py-10">
                    {children}
                </div>
            </main>
            <ColorThemePicker />
        </div>
    )
}
