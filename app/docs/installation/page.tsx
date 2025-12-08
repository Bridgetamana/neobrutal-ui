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
                    Get started with NeoBrutal UI in minutes. Copy the components you need directly into your project.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Prerequisites</h2>
                <p className="text-neutral-600">
                    NeoBrutal UI is designed for Next.js 16+ projects using React 19 and Tailwind CSS v4.
                </p>
                <div className="space-y-2">
                    <Card>
                        <CardContent className="pt-6">
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li><strong>Next.js 16.0+</strong> with App Router</li>
                                <li><strong>React 19.0+</strong></li>
                                <li><strong>Tailwind CSS v4</strong></li>
                                <li><strong>TypeScript</strong> (recommended)</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Setup Steps</h2>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold">1. Install Dependencies</h3>
                        <p className="text-neutral-600 mb-2">
                            Install Radix UI primitives and utilities that components depend on:
                        </p>
                        <CodeBlock code={`npm install \\
  @radix-ui/react-accordion \\
  @radix-ui/react-checkbox \\
  @radix-ui/react-dialog \\
  @radix-ui/react-label \\
  @radix-ui/react-radio-group \\
  @radix-ui/react-select \\
  @radix-ui/react-slider \\
  @radix-ui/react-switch \\
  @radix-ui/react-tooltip \\
  @phosphor-icons/react \\
  class-variance-authority \\
  clsx \\
  tailwind-merge \\
  sonner`} language="bash" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-bold">2. Copy Components</h3>
                        <p className="text-neutral-600 mb-2">
                            Copy component files from the <code className="bg-neutral-200 px-1 py-0.5 rounded">components/ui/</code> folder into your project:
                        </p>
                        <CodeBlock code={`# Your project structure
your-project/
├── app/
│   └── layout.tsx
├── components/
│   └── ui/              # ← Copy all components here
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ...
├── lib/
│   └── utils.ts        # Uses cn() from class-variance-authority
└── tailwind.config.ts`} language="bash" />
                        <p className="text-sm text-neutral-600 mt-2">
                            You only need to copy the components you actually use. It&quot;s a copy-paste library, not an npm package!
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-bold">3. Set Up Utils</h3>
                        <p className="text-neutral-600 mb-2">
                            Create a utility file for the <code className="bg-neutral-200 px-1 py-0.5 rounded">cn()</code> function:
                        </p>
                        <CodeBlock code={`// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`} />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-bold">4. Add Toaster (Optional)</h3>
                        <p className="text-neutral-600 mb-2">
                            If using Toast notifications, add the Toaster component to your root layout:
                        </p>
                        <CodeBlock code={`// app/layout.tsx
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}`} />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-bold">5. Add TooltipProvider (Optional)</h3>
                        <p className="text-neutral-600 mb-2">
                            If using Tooltips, wrap your app with TooltipProvider:
                        </p>
                        <CodeBlock code={`// app/layout.tsx
import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}`} />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Verify Installation</h2>
                <p className="text-neutral-600 mb-2">
                    Test that everything is working:
                </p>
                <CodeBlock code={`// app/page.tsx
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="p-8">
      <Button>Click me!</Button>
    </div>
  )
}`} />
                <p className="text-sm text-neutral-600 mt-2">
                    If the button renders with a bold border and shadow, you&quot;re all set!
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Component Checklist</h2>
                <p className="text-neutral-600 mb-4">
                    Copy only the components you need. Here&quot;s the full list:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Core Primitives</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1 text-sm">
                            <p>✓ Button</p>
                            <p>✓ Card</p>
                            <p>✓ Badge</p>
                            <p>✓ Input</p>
                            <p>✓ Textarea</p>
                            <p>✓ Label</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Form Elements</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1 text-sm">
                            <p>✓ Checkbox</p>
                            <p>✓ Radio Group</p>
                            <p>✓ Switch</p>
                            <p>✓ Select</p>
                            <p>✓ Slider</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Feedback & Overlays</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1 text-sm">
                            <p>✓ Alert</p>
                            <p>✓ Dialog</p>
                            <p>✓ Toast</p>
                            <p>✓ Tooltip</p>
                            <p>✓ Accordion</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Customization</h2>
                <p className="text-neutral-600 mb-2">
                    Since you own the code, you can customize any component. Learn more in the <Link href="/docs/theming" className="font-bold underline hover:no-underline">Theming guide</Link>.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Troubleshooting</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold mb-1">Module not found errors?</h3>
                        <p className="text-sm text-neutral-600">
                            Make sure all dependencies are installed and your import paths are correct. Check that `lib/utils.ts` exists.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">Styles not applying?</h3>
                        <p className="text-sm text-neutral-600">
                            Ensure Tailwind CSS v4 is installed and configured. Components use Tailwind utilities, not CSS modules.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-1">Missing Radix UI dependency?</h3>
                        <p className="text-sm text-neutral-600">
                            Each component lists its Radix UI dependency in the docs. Install the specific package before using the component.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Next Steps</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/docs/components" className="flex-1">
                        <div className="p-4 border-2 border-border rounded-base hover:bg-main hover:text-black transition-colors">
                            <h3 className="font-bold">Browse Components</h3>
                            <p className="text-sm text-neutral-600">View all available components</p>
                        </div>
                    </Link>
                    <Link href="/docs/theming" className="flex-1">
                        <div className="p-4 border-2 border-border rounded-base hover:bg-main hover:text-black transition-colors">
                            <h3 className="font-bold">Learn Theming</h3>
                            <p className="text-sm text-neutral-600">Customize colors and styles</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
