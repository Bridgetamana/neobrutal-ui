"use client"

import { CodeBlock } from "@/components/docs/code-block"

export default function CLIPage() {
    return (
        <div className="space-y-12">
            <header className="space-y-4">
                <h1 className="text-4xl font-black">CLI</h1>
                <p className="text-xl text-neutral-700 max-w-2xl">
                    Command line interface for adding components to your project.
                </p>
            </header>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">init</h2>
                <p className="text-neutral-700">
                    Set up your project for NeoBrutal UI. Creates the configuration file, installs base dependencies, and adds the utility functions.
                </p>
                <CodeBlock code={`npx neobrutal-ui init`} language="bash" />

                <div className="border-2 border-black rounded-base overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-neutral-100 border-b-2 border-black">
                            <tr>
                                <th className="text-left p-3 font-bold w-1/3">Option</th>
                                <th className="text-left p-3 font-bold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-neutral-200">
                                <td className="p-3 font-mono text-sm">-y, --yes</td>
                                <td className="p-3 text-neutral-600">Skip prompts and use defaults</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-sm">-c, --cwd &lt;path&gt;</td>
                                <td className="p-3 text-neutral-600">Working directory (defaults to current)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">add</h2>
                <p className="text-neutral-700">
                    Add one or more components to your project. Resolves dependencies and installs required packages automatically.
                </p>
                <CodeBlock code={`npx neobrutal-ui add [component...]`} language="bash" />

                <div className="border-2 border-black rounded-base overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-neutral-100 border-b-2 border-black">
                            <tr>
                                <th className="text-left p-3 font-bold w-1/3">Option</th>
                                <th className="text-left p-3 font-bold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-neutral-200">
                                <td className="p-3 font-mono text-sm">-y, --yes</td>
                                <td className="p-3 text-neutral-600">Skip confirmation prompts</td>
                            </tr>
                            <tr className="border-b border-neutral-200">
                                <td className="p-3 font-mono text-sm">-o, --overwrite</td>
                                <td className="p-3 text-neutral-600">Overwrite existing files</td>
                            </tr>
                            <tr className="border-b border-neutral-200">
                                <td className="p-3 font-mono text-sm">-a, --all</td>
                                <td className="p-3 text-neutral-600">Add all available components</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-sm">-c, --cwd &lt;path&gt;</td>
                                <td className="p-3 text-neutral-600">Working directory</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <CodeBlock code={`# Add a single component
npx neobrutal-ui add button

# Add multiple components
npx neobrutal-ui add button card dialog

# Add all components
npx neobrutal-ui add --all`} language="bash" />
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">list</h2>
                <p className="text-neutral-700">
                    Display all components available in the registry.
                </p>
                <CodeBlock code={`npx neobrutal-ui list`} language="bash" />
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">diff</h2>
                <p className="text-neutral-700">
                    Compare local components with the registry to check for updates. Useful when you want to see what has changed without overwriting your customizations.
                </p>
                <CodeBlock code={`npx neobrutal-ui diff [component]`} language="bash" />

                <CodeBlock code={`# Check all installed components
npx neobrutal-ui diff

# Check a specific component
npx neobrutal-ui diff button`} language="bash" />
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Configuration</h2>
                <p className="text-neutral-700">
                    The init command creates a <code className="px-1.5 py-0.5 bg-neutral-200 rounded text-sm font-mono">components.json</code> file in your project root. This file tells the CLI where to place components and how to resolve imports.
                </p>

                <CodeBlock code={`{
  "$schema": "https://neobrutal-ui.vercel.app/schema.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "neutral"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}`} language="json" />

                <div className="border-2 border-black rounded-base overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-neutral-100 border-b-2 border-black">
                            <tr>
                                <th className="text-left p-3 font-bold w-1/3">Property</th>
                                <th className="text-left p-3 font-bold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-neutral-200">
                                <td className="p-3 font-mono text-sm">style</td>
                                <td className="p-3 text-neutral-600">Component style variant</td>
                            </tr>
                            <tr className="border-b border-neutral-200">
                                <td className="p-3 font-mono text-sm">tailwind.css</td>
                                <td className="p-3 text-neutral-600">Path to global CSS file</td>
                            </tr>
                            <tr className="border-b border-neutral-200">
                                <td className="p-3 font-mono text-sm">aliases.components</td>
                                <td className="p-3 text-neutral-600">Import alias for components</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-sm">aliases.utils</td>
                                <td className="p-3 text-neutral-600">Import alias for utilities</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}
