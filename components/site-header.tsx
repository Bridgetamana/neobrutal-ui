"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { CommandSearch } from "@/components/command-search"
import { ListIcon, XIcon } from "@phosphor-icons/react"

export function SiteHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-border bg-white">
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
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 focus-brutal cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <XIcon size={24} weight="bold" /> : <ListIcon size={24} weight="bold" />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t-2 border-black">
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
