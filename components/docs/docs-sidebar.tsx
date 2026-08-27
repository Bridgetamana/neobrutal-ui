"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/site/layout/logo"
import { CommandSearch } from "@/components/site/command-search"
import type { DocsNavigationGroup } from "@/lib/mdx"

interface DocsSidebarProps {
    navigation: DocsNavigationGroup[]
}

interface SidebarContentProps {
    pathname: string
    navigation: DocsNavigationGroup[]
    onLinkClick?: () => void
    className?: string
}

function SidebarContent({ pathname, navigation, onLinkClick, className }: SidebarContentProps) {
    return (
        <div className={cn("min-h-0 overflow-y-auto bg-white p-4", className)}>
            {navigation.map((group, i) => (
                <div key={i} className="mb-4">
                    <p className="mb-2 px-2 font-semibold">
                        {group.title}
                    </p>
                    <div className="grid grid-cols-1 gap-1">
                        {group.items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onLinkClick}
                                className={cn(
                                    "ml-3 flex min-h-11 items-center border-l-2 py-1 pl-2 transition-brutal active:scale-[0.97] focus-brutal",
                                    pathname === item.href
                                        ? "border-black font-semibold text-black"
                                        : "border-transparent text-black/60 hover:border-black/30 hover:text-black"
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
                <SidebarContent className="h-full" pathname={pathname} navigation={navigation} />
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
            <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b-2 border-black bg-main px-4 md:hidden">
                <Link href="/" className="focus-brutal flex min-h-11 items-center rounded-base">
                    <Logo />
                </Link>
                <div className="flex items-center gap-1">
                    <CommandSearch />
                    <button
                        ref={toggleButtonRef}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="focus-brutal inline-flex h-11 w-11 items-center justify-center rounded-base transition-brutal active:scale-[0.97] cursor-pointer"
                        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                        aria-controls="docs-mobile-sidebar"
                        aria-expanded={isSidebarOpen}
                    >
                        {isSidebarOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
                    </button>
                </div>
            </div>

            {isSidebarOpen && (
                <button
                    type="button"
                    aria-label="Close documentation navigation"
                    className="focus-brutal fixed inset-0 top-14 z-30 bg-black/70 backdrop-blur-xs md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside
                ref={mobileSidebarRef}
                id="docs-mobile-sidebar"
                role="dialog"
                aria-modal="true"
                aria-label="Documentation navigation"
                aria-hidden={!isSidebarOpen}
                inert={!isSidebarOpen}
                className={cn(
                    "fixed left-0 top-14 z-40 flex h-[calc(100dvh-3.5rem)] w-[min(20rem,calc(100vw-3rem))] flex-col overscroll-contain border-r-2 border-black bg-white transition-transform duration-300 motion-reduce:transition-none md:hidden",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <SidebarContent
                    className="flex-1"
                    pathname={pathname}
                    navigation={navigation}
                    onLinkClick={() => setIsSidebarOpen(false)}
                />
                <div className="border-t-2 border-black bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                    <Link
                        href="https://github.com/bridgetamana/neobrutal-ui"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setIsSidebarOpen(false)}
                        className="focus-brutal flex min-h-11 items-center justify-center rounded-base border-2 border-black px-4 font-semibold transition-brutal hover:bg-main/30 active:scale-[0.97]"
                    >
                        View on GitHub
                    </Link>
                </div>
            </aside>
        </>
    )
}
