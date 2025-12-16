"use client"

import { CodeBlock } from "@/components/docs/code-block"
import Link from "next/link"

export default function QuickStartPage() {
    return (
        <div className="space-y-12">
            <header className="space-y-4">
                <h1 className="text-4xl font-black">Quick Start</h1>
                <p className="text-xl text-neutral-700 max-w-2xl">
                    Add NeoBrutal UI components to your project in under a minute.
                </p>
            </header>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Using the CLI</h2>
                <p className="text-neutral-700">
                    The CLI is the recommended approach. It installs dependencies and places components in the correct directories automatically.
                </p>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-7 h-7 text-sm font-bold border-2 border-black rounded-base bg-main">1</span>
                            <h3 className="font-bold">Initialize your project</h3>
                        </div>
                        <CodeBlock code={`npx neobrutal-ui init`} language="bash" />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-7 h-7 text-sm font-bold border-2 border-black rounded-base bg-main">2</span>
                            <h3 className="font-bold">Add a component</h3>
                        </div>
                        <CodeBlock code={`npx neobrutal-ui add button`} language="bash" />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-7 h-7 text-sm font-bold border-2 border-black rounded-base bg-main">3</span>
                            <h3 className="font-bold">Import and use</h3>
                        </div>
                        <CodeBlock code={`import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Click me</Button>
}`} />
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Manual Installation</h2>
                <p className="text-neutral-700">
                    Copy component code directly from the documentation into your project.
                </p>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-7 h-7 text-sm font-bold border-2 border-black rounded-base bg-bw">1</span>
                            <h3 className="font-bold">Install dependencies</h3>
                        </div>
                        <CodeBlock code={`npm install class-variance-authority clsx tailwind-merge`} language="bash" />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-7 h-7 text-sm font-bold border-2 border-black rounded-base bg-bw">2</span>
                            <h3 className="font-bold">Create the utility function</h3>
                        </div>
                        <p className="text-sm text-neutral-600">
                            Add this to <code className="px-1.5 py-0.5 bg-neutral-200 rounded text-xs font-mono">lib/utils.ts</code>
                        </p>
                        <CodeBlock code={`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`} />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-7 h-7 text-sm font-bold border-2 border-black rounded-base bg-bw">3</span>
                            <h3 className="font-bold">Copy the component</h3>
                        </div>
                        <p className="text-sm text-neutral-600">
                            Browse to any component page, open the Code tab, and copy the source into <code className="px-1.5 py-0.5 bg-neutral-200 rounded text-xs font-mono">components/ui/</code>. Install any required Radix primitives as needed.
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">HTML Only</h2>
                <p className="text-neutral-700">
                    Every component includes an HTML version with Tailwind classes. No React required.
                </p>
                <p className="text-sm text-neutral-600">
                    Open any component page, select the Code tab, then switch to HTML. Copy the markup into any project that uses Tailwind CSS.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Next Steps</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Link href="/docs/cli" className="block">
                        <div className="p-4 border-2 border-black rounded-base bg-bw hover:bg-main transition-colors">
                            <h3 className="font-bold">CLI Reference</h3>
                            <p className="text-sm text-neutral-600">All available commands and options</p>
                        </div>
                    </Link>
                    <Link href="/docs/components/button" className="block">
                        <div className="p-4 border-2 border-black rounded-base bg-bw hover:bg-main transition-colors">
                            <h3 className="font-bold">Components</h3>
                            <p className="text-sm text-neutral-600">Browse all available components</p>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    )
}
