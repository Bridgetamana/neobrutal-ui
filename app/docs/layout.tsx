"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ListIcon, XIcon } from "@phosphor-icons/react"
import Image from "next/image"

const sidebarItems = [
    {
        title: "Getting Started",
        items: [
            { title: "Introduction", href: "/docs" },
            { title: "Installation", href: "/docs/installation" },
            // { title: "Theming", href: "/docs/theming" },
        ],
    },
    {
        title: "Components",
        items: [
            { title: "Accordion", href: "/docs/components/accordion" },
            { title: "Alert", href: "/docs/components/alert" },
            { title: "Avatar", href: "/docs/components/avatar" },
            { title: "Badge", href: "/docs/components/badge" },
            // { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
            // { title: "Button", href: "/docs/components/button" },
            // { title: "Card", href: "/docs/components/card" },
            // { title: "Checkbox", href: "/docs/components/checkbox" },
            // { title: "Dialog", href: "/docs/components/dialog" },
            // { title: "Input", href: "/docs/components/input" },
            // { title: "Label", href: "/docs/components/label" },
            // { title: "Pagination", href: "/docs/components/pagination" },
            // { title: "Popover", href: "/docs/components/popover" },
            // { title: "Progress", href: "/docs/components/progress" },
            // { title: "Radio Group", href: "/docs/components/radio-group" },
            // { title: "Select", href: "/docs/components/select" },
            // { title: "Skeleton", href: "/docs/components/skeleton" },
            // { title: "Slider", href: "/docs/components/slider" },
            // { title: "Switch", href: "/docs/components/switch" },
            // { title: "Tabs", href: "/docs/components/tabs" },
            // { title: "Textarea", href: "/docs/components/textarea" },
            // { title: "Toast", href: "/docs/components/toast" },
            // { title: "Tooltip", href: "/docs/components/tooltip" },
        ],
    },
]

interface SidebarContentProps {
    pathname: string
    onLinkClick?: () => void
}

const SidebarContent = ({ pathname, onLinkClick }: SidebarContentProps) => (
    <div className="h-full overflow-y-auto p-4 bg-white">
        {sidebarItems.map((group, i) => (
            <div key={i} className="mb-6">
                <h4 className="mb-2 px-2 text-sm font-medium">
                    {group.title}
                </h4>
                <div className="ml-4 grid grid-cols-1 gap-1">
                    {group.items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onLinkClick}
                            className={cn(
                                "block rounded-base px-2 py-1.5 text-sm font-medium",
                                pathname === item.href
                                    ? "bg-main border border-black"
                                    : "hover:bg-main"
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>
        ))}
    </div>
)

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-bg">
            <aside className="fixed top-0 left-0 z-30 hidden h-screen w-64 border-r-2 border-black bg-white md:block">
                <div className="flex h-16 items-center border-b-2 border-black px-6 bg-main">
                    <Link href="/" className="flex items-center gap-1">
                        <Image src="/neobrutalui-logo.svg" alt="NeoBrutal UI Logo" width={24} height={24} />
                        <span className="text-lg md:text-xl font-bold italic">NeoBrutal UI</span>
                    </Link>
                </div>
                <div className="h-[calc(100vh-4rem)]">
                    <SidebarContent pathname={pathname} />
                </div>
            </aside>

            <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b-2 border-black bg-main px-6 md:hidden">
                <Link href="/" className="text-xl font-black italic">
                    NeoBrutal UI
                    <div className="flex items-center gap-1">
                        <Image src="/neobrutalui-logo.svg" alt="NeoBrutal UI Logo" width={24} height={24} />
                        <span className="text-lg md:text-xl font-bold italic">NeoBrutal UI</span>
                    </div>
                </Link>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 hover:bg-black/10 rounded-base"
                >
                    {isSidebarOpen ? <XIcon size={24} weight="bold" /> : <ListIcon size={24} weight="bold" />}
                </button>
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside className={cn(
                "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r-2 border-black bg-white transition-transform duration-300 md:hidden",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <SidebarContent pathname={pathname} onLinkClick={() => setIsSidebarOpen(false)} />
            </aside>

            <main className="flex-1 md:pl-64">
                <div className="container max-w-4xl py-10 px-6 md:py-12">
                    {children}
                </div>
            </main>
        </div>
    )
}
