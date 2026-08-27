"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/site/layout/logo"
import { CommandSearch } from "@/components/site/command-search"
import { Menu, X } from "lucide-react"

export function SiteHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuButtonRef = useRef<HTMLButtonElement>(null)
    const mobileMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isMenuOpen) return

        const menu = mobileMenuRef.current
        if (!menu) return

        const previouslyFocused = document.activeElement as HTMLElement | null
        const menuButton = menuButtonRef.current
        const selector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

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
            document.body.style.overflow = originalOverflow

            if (previouslyFocused && document.contains(previouslyFocused)) {
                previouslyFocused.focus()
                return
            }

            menuButton?.focus()
        }
    }, [isMenuOpen])

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-black bg-white">
                <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-8 lg:h-16">
                    <Link href="/" className="focus-brutal flex min-h-11 items-center rounded-base">
                        <Logo />
                    </Link>
                    <nav className="hidden items-center gap-6 font-medium lg:flex">
                        <Link href="/docs" className="focus-brutal hover:text-black/80">Docs</Link>
                        <Link href="https://github.com/bridgetamana/neobrutal-ui" target="_blank" rel="noreferrer" className="focus-brutal hover:text-black/80">GitHub</Link>
                    </nav>
                    <div className="flex items-center gap-1 md:gap-2 lg:gap-4">
                        <CommandSearch />
                        <Button asChild className="hidden font-bold shadow-brutal hover:bg-main lg:flex">
                            <Link href="/docs/components/accordion" aria-label="Explore Components">
                                Explore Components
                            </Link>
                        </Button>
                        <button
                            ref={menuButtonRef}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="focus-brutal inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-base lg:hidden"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            aria-controls="site-mobile-menu"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X aria-hidden="true" size={24} strokeWidth={3} /> : <Menu aria-hidden="true" size={24} strokeWidth={3} />}
                        </button>
                    </div>
                </div>
            </header>
            {isMenuOpen ? (
                <button
                    type="button"
                    aria-label="Close site navigation"
                    className="focus-brutal fixed inset-0 top-14 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            ) : null}
            <div
                id="site-mobile-menu"
                ref={mobileMenuRef}
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                hidden={!isMenuOpen}
                className="fixed inset-x-0 top-14 z-50 max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain border-b-2 border-black bg-white lg:hidden"
            >
                <nav className="flex flex-col items-center gap-3 px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-lg font-medium">
                    <Link href="/docs" className="focus-brutal flex min-h-11 w-full items-center justify-center rounded-base hover:bg-main/30" onClick={() => setIsMenuOpen(false)}>Docs</Link>
                    <Link href="https://github.com/bridgetamana/neobrutal-ui" target="_blank" rel="noreferrer" className="focus-brutal flex min-h-11 w-full items-center justify-center rounded-base hover:bg-main/30" onClick={() => setIsMenuOpen(false)}>GitHub</Link>
                    <Button asChild className="min-h-11 w-full font-bold shadow-brutal hover:bg-main sm:w-auto">
                        <Link href="/docs/components/accordion" onClick={() => setIsMenuOpen(false)}>
                            Explore Components
                        </Link>
                    </Button>
                </nav>
            </div>
        </>
    )
}
