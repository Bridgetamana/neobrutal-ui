import Link from "next/link"
import { CodeBlock } from "@/components/docs/code-block"

export default function CLIPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">CLI</h1>
            </header>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">init</h2>
                <p className="text-base text-black">
                    Set up your project for neobrutal ui. Creates components.json, installs dependencies, and adds utilities.
                </p>
                <CodeBlock code={`npx neobrutal init`} language="bash" />
                <p className="text-base text-black">
                    Use <strong>-y</strong> to skip prompts.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">add</h2>
                <p className="text-base text-black">
                    Add components to your project. Resolves dependencies automatically.
                </p>
                <CodeBlock code={`npx neobrutal add button dialog`} language="bash" />
                <p className="text-base text-black">
                    Use <strong>-a</strong> for all components, <strong>-o</strong> to overwrite existing files.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">list</h2>
                <p className="text-base text-black">
                    Display all available components.
                </p>
                <CodeBlock code={`npx neobrutal list`} language="bash" />
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">diff</h2>
                <p className="text-base text-black">
                    Compare local components with the registry to check for updates.
                </p>
                <CodeBlock code={`npx neobrutal diff button`} language="bash" />
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">Configuration</h2>
                <p className="text-base text-black">
                    The <strong>components.json</strong> file configures component paths and import aliases.
                </p>
                <CodeBlock code={`{
  "tailwind": {
    "css": "app/globals.css"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}`} language="json" />
            </section>

            <section className="border-2 border-black bg-bw">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
                    <Link href="/docs/installation" className="block p-3 hover:bg-main">
                        <span className="text-lg font-bold">Installation</span>
                        <p className="truncate">Learn how to install Neobrutal UI components</p>
                    </Link>
                    <Link href="/docs/theming" className="block p-3 hover:bg-main text-right">
                        <span className="text-lg font-bold">Theming</span>
                        <p className="truncate">Customize the look and feel of Neobrutal UI components</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}
