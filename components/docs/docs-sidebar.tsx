"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/site/layout/logo"
import type { DocsNavigationGroup } from "@/lib/mdx"

const CommandSearch = dynamic(
    () => import("@/components/site/command-search").then((m) => m.CommandSearch),
    { ssr: false }
)

interface DocsSidebarProps {
    navigation: DocsNavigationGroup[]
}

function formatStarCount(stars: number) {
    if (stars >= 1000) {
        return `${(stars / 1000).toFixed(1).replace(/\.0$/, "")}k`
    }

    return String(stars)
}

interface SidebarContentProps {
    pathname: string
    navigation: DocsNavigationGroup[]
    onLinkClick?: () => void
}

function SidebarContent({ pathname, navigation, onLinkClick }: SidebarContentProps) {
    return (
        <div className="h-full overflow-y-auto p-4 bg-white">
            {navigation.map((group, i) => (
                <div key={i} className="mb-4">
                    <h4 className="mb-2 px-2 font-semibold">
                        {group.title}
                    </h4>
                    <div className="grid grid-cols-1 gap-1">
                        {group.items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onLinkClick}
                                className={cn(
                                    "ml-3 block rounded-base px-2 py-1 text-black/80 focus-brutal focus-visible:bg-main",
                                    pathname === item.href
                                        ? "bg-main"
                                        : "hover:text-black"
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

export function DesktopSidebar({ navigation }: DocsSidebarProps) {
    const pathname = usePathname()

    return (
        <aside className="fixed top-0 left-0 z-30 hidden h-screen w-64 border-r-2 border-black bg-white md:block">
            <Link href="/" className="flex h-14 items-center border-b-2 border-black px-6 bg-main">
                <Logo />
            </Link>
            <div className="h-[calc(100vh-4rem)]">
                <SidebarContent pathname={pathname} navigation={navigation} />
            </div>
        </aside>
    )
}

export function MobileHeader({ navigation }: DocsSidebarProps) {
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleButtonRef = useRef<HTMLButtonElement>(null)
    const mobileSidebarRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!isSidebarOpen) return

        const sidebar = mobileSidebarRef.current
        if (!sidebar) return

        const previouslyFocused = document.activeElement as HTMLElement | null
        const toggleButton = toggleButtonRef.current
        const selector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

        const getFocusable = () =>
            Array.from(sidebar.querySelectorAll<HTMLElement>(selector)).filter(
                (element) => !element.hasAttribute("disabled") && element.tabIndex !== -1
            )

        getFocusable()[0]?.focus()

        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsSidebarOpen(false)
                return
            }

            if (event.key !== "Tab") return

            const focusable = getFocusable()
            if (focusable.length === 0) {
                event.preventDefault()
                return
            }

            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            const active = document.activeElement as HTMLElement | null

            if (event.shiftKey) {
                if (active === first || !sidebar.contains(active)) {
                    last.focus()
                    event.preventDefault()
                }
                return
            }

            if (active === last) {
                first.focus()
                event.preventDefault()
            }
        }

        document.addEventListener("keydown", onKeyDown)

        return () => {
            document.removeEventListener("keydown", onKeyDown)
            document.body.style.overflow = originalOverflow

            if (previouslyFocused && document.contains(previouslyFocused)) {
                previouslyFocused.focus()
                return
            }

            toggleButton?.focus()
        }
    }, [isSidebarOpen])

    return (
        <>
            <div className="sticky top-0 z-40 flex h-12 items-center justify-between border-b-2 border-black bg-main px-6 md:hidden">
                <Link href="/">
                    <Logo />
                </Link>
                <div className="flex items-center gap-10">
                    <div className="md:hidden pb-2">
                        <CommandSearch />
                    </div>
                    <button
                        ref={toggleButtonRef}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="focus-brutal cursor-pointer"
                        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                        aria-controls="docs-mobile-sidebar"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/70 md:hidden backdrop-blur-xs"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            <aside
                ref={mobileSidebarRef}
                id="docs-mobile-sidebar"
                role="dialog"
                aria-modal="true"
                aria-label="Documentation navigation"
                className={cn(
                    "fixed top-12 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r-2 border-black bg-white transition-transform duration-300 md:hidden",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <SidebarContent
                    pathname={pathname}
                    navigation={navigation}
                    onLinkClick={() => setIsSidebarOpen(false)}
                />
            </aside>
        </>
    )
}

export function DocsHeader() {
    const [stars, setStars] = useState("...")

    useEffect(() => {
        let cancelled = false

        const loadStars = async () => {
            try {
                const response = await fetch("https://api.github.com/repos/Bridgetamana/neobrutal-ui", {
                    headers: {
                        Accept: "application/vnd.github+json",
                    },
                })

                if (!response.ok) return

                const data: { stargazers_count?: number } = await response.json()
                if (!cancelled && typeof data.stargazers_count === "number") {
                    setStars(formatStarCount(data.stargazers_count))
                }
            } catch {
                // Keep fallback value when the request fails.
            }
        }

        loadStars()

        return () => {
            cancelled = true
        }
    }, [])

    return (
        <header className="container max-w-7xl pt-4 px-6 lg:px-0 flex gap-2 items-center justify-end">
            <div className="hidden md:block">
                <CommandSearch />
            </div>
            <Link href="https://github.com/bridgetamana/neobrutal-ui" target="_blank" className="flex gap-1 items-center focus-brutal border-2 border-black px-3 py-1.5 rounded-base transition-brutal hover:shadow-brutal-sm">
                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                <p className="text-sm">{stars}</p>
            </Link>
        </header>
    )
}
