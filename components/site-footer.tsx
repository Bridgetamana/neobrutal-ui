"use client"

import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
    return (
        <footer className="bg-white py-10">
            <div className="container mx-auto px-4 md:px-0 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-1">
                    <Image src="/neobrutalui-logo.svg" alt="NeoBrutal UI Logo" width={24} height={24} />
                    <span className="text-lg md:text-xl font-bold italic">NeoBrutal UI</span>
                </div>
                <div className="flex gap-4 font-medium">
                    <Link href="/docs" className="hover:text-black/80 focus-brutal">Docs</Link>
                    <Link href="https://github.com/bridgetamana/neobrutal-ui" className="hover:text-black/80 focus-brutal">GitHub</Link>
                </div>
                <p className="text-sm font-medium">
                    © {new Date().getFullYear()} <Link href="https://x.com/bridget_amana" target="_blank" className="underline decoration-2 underline-offset-2 hover:bg-main">Bridget Amana</Link>. MIT License.
                </p>
            </div>
        </footer>
    )
}
