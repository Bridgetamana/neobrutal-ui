"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ListIcon, XIcon } from "@phosphor-icons/react"

export function SiteHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-border bg-white">
            <div className="container mx-auto flex h-14 lg:h-16 items-center justify-between px-4 lg:px-0">
                <div className="flex items-center gap-1">
                    <Image src="/neobrutalui-logo.svg" alt="NeoBrutal UI Logo" width={24} height={24} />
                    <span className="text-lg md:text-xl font-bold italic">NeoBrutal UI</span>
                </div>
                <nav className="hidden lg:flex items-center gap-6 font-medium">
                    <Link href="/docs" className="hover:text-black/80  focus-brutal">Docs</Link>
                    <Link href="https://github.com/bridgetamana/neobrutal-ui" target="_blank" className="hover:text-black/80  focus-brutal">Github</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/docs/components">
                        <Button className="hidden lg:flex font-bold shadow-brutal hover:bg-main">
                            Explore Components
                        </Button>
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 focus-brutal cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <XIcon size={28} /> : <ListIcon size={28} />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden bg-bw border-t-2 border-black">
                    <nav className="flex flex-col items-center gap-4 py-6 font-medium text-lg">
                        <Link href="/docs" className="hover:text-black/80 focus-brutal" onClick={() => setIsMenuOpen(false)}>Docs</Link>
                        <Link href="https://github.com/bridgetamana/neobrutal-ui" target="_blank" className="hover:text-black/80 focus-brutal" onClick={() => setIsMenuOpen(false)}>GitHub</Link>
                        <Link href="/docs/components" onClick={() => setIsMenuOpen(false)}>
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
