"use client"

import { CodeBlock } from "@/components/docs/code-block"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function InstallationPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-black">Installation</h1>
                <p className="text-xl text-neutral-600">
                    Choose your installation method: full React components or pure HTML/Tailwind.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-2 border-black">
                    <CardHeader>
                        <CardTitle className="text-lg">React Components</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                        <p>Full-featured components with:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Radix UI for accessibility</li>
                            <li>TypeScript support</li>
                            <li>Variants and props</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className="border-2 border-black">
                    <CardHeader>
                        <CardTitle className="text-lg">HTML / Tailwind</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                        <p>Zero-dependency HTML with:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Pure Tailwind classes</li>
                            <li>No JavaScript required*</li>
                            <li>Copy and paste ready</li>
                        </ul>
                        <p className="text-xs text-neutral-500">*Some components use native HTML features like details/summary</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Option 1: React Components</h2>
                <p className="text-neutral-600">
                    For Next.js / React projects with full functionality.
                </p>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold">1. Prerequisites</h3>
                        <Card>
                            <CardContent className="pt-6">
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li><strong>Next.js 16+</strong> with App Router (or React 19+)</li>
                                    <li><strong>Tailwind CSS v4</strong></li>
                                    <li><strong>TypeScript</strong> (recommended)</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-bold">2. Install Core Dependencies</h3>
                        <CodeBlock code={`npm install class-variance-authority clsx tailwind-merge @phosphor-icons/react`} language="bash" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-bold">3. Add the cn() Utility</h3>
                        <p className="text-neutral-600 text-sm mb-2">
                            Create <code className="bg-neutral-200 px-1 py-0.5 rounded">lib/utils.ts</code>:
                        </p>
                        <CodeBlock code={`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`} />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-bold">4. Copy Components</h3>
                        <p className="text-neutral-600 text-sm mb-2">
                            Browse the components, copy the source code into <code className="bg-neutral-200 px-1 py-0.5 rounded">components/ui/</code>.
                        </p>
                        <p className="text-neutral-600 text-sm">
                            Some components require additional Radix UI packages. Check each component&apos;s docs for specific dependencies.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Option 2: HTML / Tailwind Only</h2>
                <p className="text-neutral-600">
                    For quick prototypes, non-React projects, or when you want zero dependencies.
                </p>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold">1. Prerequisites</h3>
                        <Card>
                            <CardContent className="pt-6">
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li><strong>Tailwind CSS v4</strong> installed and configured</li>
                                    <li>That&apos;s it!</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-bold">2. Copy HTML Code</h3>
                        <p className="text-neutral-600 text-sm mb-2">
                            On each component page, click the <strong>Code</strong> tab, then select <strong>HTML</strong> to see the pure Tailwind version.
                        </p>
                        <p className="text-neutral-600 text-sm">
                            Copy and paste directly into your HTML files. Colors are hardcoded (e.g., <code className="bg-neutral-200 px-1 py-0.5 rounded">#88aaee</code> for the primary color).
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-bold">3. Icons</h3>
                        <p className="text-neutral-600 text-sm mb-2">
                            HTML snippets include inline SVGs from <a href="https://phosphoricons.com" target="_blank" className="font-bold underline hover:no-underline">Phosphor Icons</a>. You can:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600">
                            <li>Use the inline SVGs as-is</li>
                            <li>Replace with your own icon library</li>
                            <li>Install Phosphor: <code className="bg-neutral-200 px-1 py-0.5 rounded">npm install @phosphor-icons/react</code></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Color Reference</h2>
                <p className="text-neutral-600 text-sm mb-4">
                    These are the hardcoded color values used in HTML snippets:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded border-2 border-black bg-[#88aaee]"></div>
                        <div>
                            <p className="font-bold text-sm">Primary</p>
                            <p className="text-xs text-neutral-500">#88aaee</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded border-2 border-black bg-[#dfe5f2]"></div>
                        <div>
                            <p className="font-bold text-sm">Background</p>
                            <p className="text-xs text-neutral-500">#dfe5f2</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded border-2 border-black bg-[#97ee88]"></div>
                        <div>
                            <p className="font-bold text-sm">Success</p>
                            <p className="text-xs text-neutral-500">#97ee88</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded border-2 border-black bg-[#ee8888]"></div>
                        <div>
                            <p className="font-bold text-sm">Error</p>
                            <p className="text-xs text-neutral-500">#ee8888</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded border-2 border-black bg-[#eeeb88]"></div>
                        <div>
                            <p className="font-bold text-sm">Warning</p>
                            <p className="text-xs text-neutral-500">#eeeb88</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Next Steps</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/docs/components/button" className="flex-1">
                        <div className="p-4 border-2 border-black rounded-base hover:bg-main transition-colors">
                            <h3 className="font-bold">Start with Button</h3>
                            <p className="text-sm text-neutral-600">The most common component</p>
                        </div>
                    </Link>
                    <Link href="/docs/theming" className="flex-1">
                        <div className="p-4 border-2 border-black rounded-base hover:bg-main transition-colors">
                            <h3 className="font-bold">Learn Theming</h3>
                            <p className="text-sm text-neutral-600">Customize colors and styles</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
