"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const sidebarItems = [
    {
        title: "Getting Started",
        items: [
            { title: "Introduction", href: "/docs" },
            { title: "Installation", href: "/docs/installation" },
            { title: "Theming", href: "/docs/theming" },
        ],
    },
    {
        title: "Components",
        items: [
            { title: "All Components", href: "/docs/components" },
            { title: "Button", href: "/docs/components/button" },
            { title: "Card", href: "/docs/components/card" },
            { title: "Input", href: "/docs/components/input" },
        ],
    },
]

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 z-30 hidden h-screen w-64 border-r-2 border-border bg-bg md:block">
                <div className="flex h-16 items-center border-b-2 border-border px-6">
                    <Link href="/" className="text-xl font-black">
                        NeoBrutal UI
                    </Link>
                </div>
                <div className="h-[calc(100vh-4rem)] overflow-y-auto py-6 px-4">
                    {sidebarItems.map((group, i) => (
                        <div key={i} className="mb-8">
                            <h4 className="mb-2 px-2 text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                {group.title}
                            </h4>
                            <div className="grid grid-cols-1 gap-1">
                                {group.items.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "block rounded-base px-2 py-1.5 text-sm font-medium transition-colors hover:bg-main hover:text-black",
                                            pathname === item.href
                                                ? "bg-main text-black border-2 border-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                                                : "text-neutral-700 dark:text-neutral-300"
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Mobile Header (Visible only on small screens) */}
            <div className="flex h-16 items-center border-b-2 border-border bg-bg px-6 md:hidden">
                <Link href="/" className="text-xl font-black">
                    NeoBrutal UI
                </Link>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:pl-64">
                <div className="container max-w-4xl py-10 px-6 md:py-12">
                    {children}
                </div>
            </main>
        </div>
    )
}
