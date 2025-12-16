"use client"

import { CodeBlock } from "@/components/docs/code-block"
import Link from "next/link"

export default function QuickStartPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black md:text-4xl text-black">Quick Start</h1>
            </header>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">Using the CLI</h2>
                <p className="text-base text-black">
                    The CLI is the recommended approach. It installs dependencies and places components in the correct directories automatically.
                </p>

                <div className="space-y-5">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 text-base font-bold border-2 border-black rounded-base bg-main">1</span>
                            <h3 className="text-lg font-bold text-black">Initialize your project</h3>
                        </div>
                        <CodeBlock code={`npx neobrutal-ui init`} language="bash" />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 text-base font-bold border-2 border-black rounded-base bg-main">2</span>
                            <h3 className="text-lg font-bold text-black">Add a component</h3>
                        </div>
                        <CodeBlock code={`npx neobrutal-ui add button`} language="bash" />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 text-base font-bold border-2 border-black rounded-base bg-main">3</span>
                            <h3 className="text-lg font-bold text-black">Import and use</h3>
                        </div>
                        <CodeBlock code={`import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Click me</Button>
}`} />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">Manual Installation</h2>
                <p className="text-base text-black">
                    Copy component code directly from the documentation into your project.
                </p>

                <div className="space-y-5">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 text-base font-bold border-2 border-black rounded-base bg-bw">1</span>
                            <h3 className="text-lg font-bold text-black">Install dependencies</h3>
                        </div>
                        <CodeBlock code={`npm install class-variance-authority clsx tailwind-merge`} language="bash" />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 text-base font-bold border-2 border-black rounded-base bg-bw">2</span>
                            <h3 className="text-lg font-bold text-black">Create the utility function</h3>
                        </div>
                        <p className="text-base text-black">
                            Add this to <code className="px-1.5 py-0.5 bg-neutral-200 rounded text-base font-mono">lib/utils.ts</code>
                        </p>
                        <CodeBlock code={`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`} />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 text-base font-bold border-2 border-black rounded-base bg-bw">3</span>
                            <h3 className="text-lg font-bold text-black">Copy the component</h3>
                        </div>
                        <p className="text-base text-black">
                            Browse to any component page, open the Code tab, and copy the source into <code className="px-1.5 py-0.5 bg-neutral-200 rounded text-base font-mono">components/ui/</code>. Install any required Radix primitives as needed.
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">HTML Only</h2>
                <p className="text-base text-black">
                    Every component includes an HTML version with Tailwind classes. No React required. Open any component page, select the Code tab, then switch to HTML.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">Next Steps</h2>
                <div className="border-2 border-black bg-bw">
                    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
                        <Link href="/docs/cli" className="block p-5 hover:bg-main transition-colors">
                            <span className="text-lg font-bold text-black">CLI Reference</span>
                            <p className="text-base text-black mt-1">All available commands and options</p>
                        </Link>
                        <Link href="/docs/components/button" className="block p-5 hover:bg-main transition-colors">
                            <span className="text-lg font-bold text-black">Components</span>
                            <p className="text-base text-black mt-1">Browse all available components</p>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
