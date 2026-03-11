"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/site/layout/logo"
import { Menu, X } from "lucide-react"

const CommandSearch = dynamic(
    () => import("@/components/site/command-search").then((mod) => mod.CommandSearch),
    { ssr: false }
)

export function SiteHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuButtonRef = useRef<HTMLButtonElement>(null)
    const mobileMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isMenuOpen) return

        const menu = mobileMenuRef.current
        if (!menu) return

        const previouslyFocused = document.activeElement as HTMLElement | null
        const selector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

        const getFocusable = () =>
            Array.from(menu.querySelectorAll<HTMLElement>(selector)).filter(
                (element) => !element.hasAttribute("disabled") && element.tabIndex !== -1
            )

        getFocusable()[0]?.focus()

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false)
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
                if (active === first || !menu.contains(active)) {
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

            if (previouslyFocused && document.contains(previouslyFocused)) {
                previouslyFocused.focus()
                return
            }

            menuButtonRef.current?.focus()
        }
    }, [isMenuOpen])

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b-2 bg-white">
            <div className="container mx-auto flex h-14 lg:h-16 items-center justify-between px-4 md:px-8">
                <Link href="/">
                    <Logo />
                </Link>
                <nav className="hidden lg:flex items-center gap-6 font-medium">
                    <Link href="/docs" className="hover:text-black/80  focus-brutal">Docs</Link>
                    <Link href="https://github.com/bridgetamana/neobrutal-ui" target="_blank" className="hover:text-black/80  focus-brutal">Github</Link>
                </nav>
                <div className="flex items-center gap-8 md:gap-2 lg:gap-4">
                    <CommandSearch />
                    <Link href="/docs/components/accordion" aria-label="Explore Components" className="hidden lg:flex ">
                        <Button className="font-bold shadow-brutal hover:bg-main">
                            Explore Components
                        </Button>
                    </Link>
                    <button
                        ref={menuButtonRef}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 focus-brutal cursor-pointer"
                        aria-label="Toggle menu"
                        aria-controls="site-mobile-menu"
                    >
                        {isMenuOpen ? <X aria-hidden="true" size={24} strokeWidth={3} /> : <Menu aria-hidden="true" size={24} strokeWidth={3} />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div
                    id="site-mobile-menu"
                    ref={mobileMenuRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Site navigation"
                    className="lg:hidden bg-white border-t-2"
                >
                    <nav className="flex flex-col items-center gap-4 py-6 font-medium text-lg">
                        <Link href="/docs" className="hover:text-black/80 focus-brutal" onClick={() => setIsMenuOpen(false)}>Docs</Link>
                        <Link href="https://github.com/bridgetamana/neobrutal-ui" target="_blank" className="hover:text-black/80 focus-brutal" onClick={() => setIsMenuOpen(false)}>GitHub</Link>
                        <Link href="/docs/components/accordion" onClick={() => setIsMenuOpen(false)}>
                            <Button className="font-bold shadow-brutal hover:bg-main">
                                Explore Components
                            </Button>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
