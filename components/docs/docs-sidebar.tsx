"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ListIcon, XIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { CommandSearch } from "@/components/command-search"

const sidebarItems = [
    {
        title: "Getting Started",
        items: [
            { title: "About", href: "/docs" },
            { title: "Quick Start", href: "/docs/installation" },
            { title: "CLI", href: "/docs/cli" },
            { title: "Theming", href: "/docs/theming" },
            { title: "Accessibility", href: "/docs/accessibility" },
            { title: "Changelog", href: "/docs/changelog" },
        ],
    },
    {
        title: "Components",
        items: [
            { title: "Accordion", href: "/docs/components/accordion" },
            { title: "Alert", href: "/docs/components/alert" },
            { title: "Avatar", href: "/docs/components/avatar" },
            { title: "Badge", href: "/docs/components/badge" },
            { title: "Button", href: "/docs/components/button" },
            { title: "Card", href: "/docs/components/card" },
            { title: "Checkbox", href: "/docs/components/checkbox" },
            { title: "Dialog", href: "/docs/components/dialog" },
            { title: "Input", href: "/docs/components/input" },
            { title: "Label", href: "/docs/components/label" },
            { title: "Pagination", href: "/docs/components/pagination" },
            { title: "Popover", href: "/docs/components/popover" },
            { title: "Progress", href: "/docs/components/progress" },
            { title: "Radio Group", href: "/docs/components/radio-group" },
            { title: "Select", href: "/docs/components/select" },
            { title: "Slider", href: "/docs/components/slider" },
            { title: "Switch", href: "/docs/components/switch" },
            { title: "Tabs", href: "/docs/components/tabs" },
            { title: "Textarea", href: "/docs/components/textarea" },
            { title: "Toast", href: "/docs/components/toast" },
            { title: "Tooltip", href: "/docs/components/tooltip" },
        ],
    },
]

interface SidebarContentProps {
    pathname: string
    onLinkClick?: () => void
}

function SidebarContent({ pathname, onLinkClick }: SidebarContentProps) {
    return (
        <div className="h-full overflow-y-auto p-4 bg-white">
            {sidebarItems.map((group, i) => (
                <div key={i} className="mb-6">
                    <h4 className="mb-2 px-2 font-bold">
                        {group.title}
                    </h4>
                    <div className="grid grid-cols-1 gap-1">
                        {group.items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onLinkClick}
                                className={cn(
                                    "ml-2 block rounded-base px-2.5 py-1.5 font-medium",
                                    pathname === item.href
                                        ? "bg-main border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold"
                                        : "hover:bg-bg"
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
}

export function DesktopSidebar() {
    const pathname = usePathname()

    return (
        <aside className="fixed top-0 left-0 z-30 hidden h-screen w-64 border-r-2 border-black bg-white md:block">
            <Link href="/" className="flex h-16 items-center border-b-2 border-black px-6 bg-main">
                <Logo />
            </Link>
            <div className="h-[calc(100vh-4rem)]">
                <SidebarContent pathname={pathname} />
            </div>
        </aside>
    )
}

export function MobileHeader() {
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <>
            <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b-2 border-black bg-main px-6 md:hidden">
                <Link href="/">
                    <Logo />
                </Link>
                <div className="flex items-center gap-10">
                    <div className="md:hidden pb-2">
                        <CommandSearch />
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="focus-brutal cursor-pointer"
                        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                    >
                        {isSidebarOpen ? <XIcon size={24} weight="bold" /> : <ListIcon size={24} weight="bold" />}
                    </button>
                </div>
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/70 md:hidden backdrop-blur-xs"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside className={cn(
                "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r-2 border-black bg-white transition-transform duration-300 md:hidden",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <SidebarContent pathname={pathname} onLinkClick={() => setIsSidebarOpen(false)} />
            </aside>
        </>
    )
}

export function DocsHeader() {
    return (
        <header className="container max-w-7xl pt-6 flex gap-3 items-center justify-end px-6">
            <div className="hidden md:block">
                <CommandSearch />
            </div>
            <Link href="https://github.com/bridgetamana/neobrutal-ui" target="_blank" className="flex gap-2 items-center focus-brutal border-2 border-black px-3 py-1 rounded-base hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                <span>22</span>
            </Link>
        </header>
    )
}
