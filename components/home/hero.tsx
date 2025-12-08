"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, GithubLogoIcon } from "@phosphor-icons/react"

export function HeroSection() {
    return (
        <section className="relative border-b-4 border-border bg-pastel-yellow py-24 md:py-32 overflow-hidden">

            <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                    MAKE YOUR UI <br />
                    <span className="text-main drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">SCREAM</span> FUN.
                </h1>
                <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
                    A collection of <span className="bg-pastel-green px-1 border-2 border-border">copy-paste</span> components that bring the
                    neobrutalist aesthetic to your React apps.
                    Cute, bold, and accessible.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <Link href="/docs">
                        <Button size="lg" className="h-16 px-10 text-xl border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
                            Get Started <ArrowRightIcon weight="bold" className="ml-2 h-6 w-6" />
                        </Button>
                    </Link>
                    <Link href="https://github.com/bridgetamana/neobrutal-ui" target="_blank">
                        <Button variant="neutral" size="lg" className="h-16 px-10 text-xl border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] bg-bw">
                            <GithubLogoIcon weight="fill" className="mr-2 h-6 w-6" /> Star on GitHub
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
