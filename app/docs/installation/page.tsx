import { CodeBlock } from "@/components/docs/code-block"
import Link from "next/link"

export default function QuickStartPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Quick Start</h1>
            </header>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">Using the CLI</h2>
                <p className="text-base text-black">
                    This guide will walk you through the installation steps for using Neobrutal UI via the CLI.
                </p>

                <div className="space-y-5">
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold">1. Initialize your project</h3>
                        <CodeBlock code={`npx neobrutal init`} language="bash" />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold">2. Add a component</h3>
                        <CodeBlock code={`npx neobrutal add button`} language="bash" />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold">3. Import and use</h3>
                        <CodeBlock code=
                            {
                                `import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Click me</Button>
}`}
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">Manual Installation</h2>
                <p className="text-base text-black">
                    Follow these steps to add components to your project without the CLI
                </p>

                <div className="space-y-5">
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-black">1. Install dependencies</h3>
                        <CodeBlock code={`npm install class-variance-authority clsx tailwind-merge`} language="bash" />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-black">2. Create the utility function</h3>
                        <p className="text-base text-black">
                            Add this to <code className="px-1.5 py-0.5 bg-neutral-200 rounded text-base font-mono">lib/utils.ts</code>
                        </p>
                        <CodeBlock code=
                            {
                                `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-black">3. Copy the component</h3>
                        <p className="text-base text-black">
                            Browse to any component page, open the Code tab, and copy the source into <code className="px-1.5 py-0.5 bg-neutral-200 rounded text-base font-mono">components/ui/</code>. Install Base UI if required.
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">HTML Only</h2>
                <p className="text-base text-black">
                    Don&apos;t use React? Every component includes a plain HTML version with Tailwind classes. Open any component page, select the Code tab, switch to HTML, and paste it into the{" "}
                    <a
                        href="https://play.tailwindcss.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold underline underline-offset-2 hover:text-main"
                    >
                        Tailwind CSS Playground
                    </a>{" "}
                    to try it out.
                </p>
            </section>

            <section className="border-2 border-black bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
                    <Link href="/docs" className="block p-3 hover:bg-main">
                        <span className="text-lg font-bold">About</span>
                        <p className="truncate">Neobrutal UI is a collection of neobrutalism-styled components with smooth animations built with Base UI, React and Tailwind CSS.</p>
                    </Link>
                    <Link href="/docs/cli" className="block p-3 hover:bg-main text-right">
                        <span className="text-lg font-bold">CLI Reference</span>
                        <p className="truncate">All available commands and options</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}
