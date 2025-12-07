"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRightIcon, CopyIcon, GithubLogoIcon, LightningIcon, PaintBrushIcon } from "@phosphor-icons/react"

export default function Home() {
  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      {/* Header */}
      <header className="border-b-2 border-border bg-bg sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-main border-2 border-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"></div>
            <span className="text-xl font-black">NeoBrutal UI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 font-medium">
            <Link href="/docs" className="hover:underline decoration-2 underline-offset-4">Documentation</Link>
            <Link href="/docs/components" className="hover:underline decoration-2 underline-offset-4">Components</Link>
            <Link href="https://github.com" target="_blank" className="hover:underline decoration-2 underline-offset-4">GitHub</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/docs">
              <Button size="sm" className="hidden md:flex">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b-2 border-border bg-bw">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border-2 border-border bg-main text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            v1.0.0 is now available!
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            Make your UI <br className="hidden md:block" />
            <span className="bg-main px-2 border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-black">Pop.</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10">
            A collection of copy-paste components for React, Next.js, and Tailwind CSS.
            Styled with a bold, neobrutalist aesthetic.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/docs">
              <Button size="lg" className="h-14 px-8 text-lg gap-2">
                Get Started <ArrowRightIcon weight="bold" />
              </Button>
            </Link>
            <Link href="https://github.com/bridgetamana/neobrutal-ui" target="_blank">
              <Button variant="neutral" size="lg" className="h-14 px-8 text-lg gap-2">
                <GithubLogoIcon weight="bold" /> GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-bg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-bw">
              <CardHeader>
                <PaintBrushIcon weight="fill" className="h-10 w-10 mb-2 text-main" />
                <CardTitle className="text-2xl">Styled to Pop</CardTitle>
                <CardDescription className="text-base">
                  Hard shadows, bold borders, and high contrast. Designed to stand out from the sea of gray.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-bw">
              <CardHeader>
                <CopyIcon weight="fill" className="h-10 w-10 mb-2 text-main" />
                <CardTitle className="text-2xl">Copy & Paste</CardTitle>
                <CardDescription className="text-base">
                  Not a dependency. Copy the code you need directly into your project and customize it.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-bw">
              <CardHeader>
                <LightningIcon weight="fill" className="h-10 w-10 mb-2 text-main" />
                <CardTitle className="text-2xl">Fast & Accessible</CardTitle>
                <CardDescription className="text-base">
                  Built on top of Radix UI primitives for full accessibility and keyboard navigation support.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20 border-t-2 border-border bg-bw">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-black mb-4">Component Showcase</h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-xl">
                Beautifully brutal components ready for your next project.
              </p>
            </div>
            <Link href="/docs/components">
              <Button variant="neutral">View All Components</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-6 border-2 border-border shadow-brutal rounded-base bg-bg flex flex-col items-center justify-center gap-4 min-h-[200px]">
              <Button>Primary Button</Button>
              <Button variant="neutral">Neutral Button</Button>
            </div>

            {/* Card 2 */}
            <div className="p-6 border-2 border-border shadow-brutal rounded-base bg-bg flex flex-col items-center justify-center gap-4 min-h-[200px]">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-red-500 border-2 border-border"></div>
                <div className="h-4 w-4 rounded-full bg-yellow-500 border-2 border-border"></div>
                <div className="h-4 w-4 rounded-full bg-green-500 border-2 border-border"></div>
              </div>
              <div className="w-full h-2 bg-neutral-300 border-2 border-border rounded-full overflow-hidden">
                <div className="h-full bg-main w-2/3"></div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 border-2 border-border shadow-brutal rounded-base bg-bg flex flex-col items-center justify-center gap-4 min-h-[200px]">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-main border-2 border-border rounded-full text-xs font-bold">New</span>
                <span className="px-3 py-1 bg-bw border-2 border-border rounded-full text-xs font-bold">Badge</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t-2 border-border bg-bg">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-main border-2 border-border"></div>
            <span className="font-bold">NeoBrutal UI</span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Built by Bridget. Open Source. MIT License.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-neutral-600 hover:text-black dark:hover:text-white">
              <GithubLogoIcon weight="fill" className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
