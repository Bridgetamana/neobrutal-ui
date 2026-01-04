"use client"

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
                    Set up your project for NeoBrutal UI. Creates the configuration file, installs base dependencies, and adds the utility functions.
                </p>
                <CodeBlock code={`npx neobrutal init`} language="bash" />

                <div className="border-2 border-black overflow-hidden">
                    <table className="w-full text-base">
                        <thead className="bg-main border-b-2 border-black">
                            <tr>
                                <th className="text-left p-3 font-bold text-black w-1/3">Option</th>
                                <th className="text-left p-3 font-bold text-black">Description</th>
                            </tr>
                        </thead>
                        <tbody className="bg-bw">
                            <tr className="border-b-2 border-black">
                                <td className="p-3 font-mono text-base text-black">-y, --yes</td>
                                <td className="p-3 text-black">Skip prompts and use defaults</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-base text-black">-c, --cwd &lt;path&gt;</td>
                                <td className="p-3 text-black">Working directory (defaults to current)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">add</h2>
                <p className="text-base text-black">
                    Add one or more components to your project. Resolves dependencies and installs required packages automatically.
                </p>
                <CodeBlock code={`npx neobrutal add [component...]`} language="bash" />

                <div className="border-2 border-black overflow-hidden">
                    <table className="w-full text-base">
                        <thead className="bg-main border-b-2 border-black">
                            <tr>
                                <th className="text-left p-3 font-bold text-black w-1/3">Option</th>
                                <th className="text-left p-3 font-bold text-black">Description</th>
                            </tr>
                        </thead>
                        <tbody className="bg-bw">
                            <tr className="border-b-2 border-black">
                                <td className="p-3 font-mono text-base text-black">-y, --yes</td>
                                <td className="p-3 text-black">Skip confirmation prompts</td>
                            </tr>
                            <tr className="border-b-2 border-black">
                                <td className="p-3 font-mono text-base text-black">-o, --overwrite</td>
                                <td className="p-3 text-black">Overwrite existing files</td>
                            </tr>
                            <tr className="border-b-2 border-black">
                                <td className="p-3 font-mono text-base text-black">-a, --all</td>
                                <td className="p-3 text-black">Add all available components</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-base text-black">-c, --cwd &lt;path&gt;</td>
                                <td className="p-3 text-black">Working directory</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <CodeBlock code={`# Add a single component
npx neobrutal add button

# Add multiple components
npx neobrutal add button card dialog

# Add all components
npx neobrutal add --all`} language="bash" />
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">list</h2>
                <p className="text-base text-black">
                    Display all components available in the registry.
                </p>
                <CodeBlock code={`npx neobrutal list`} language="bash" />
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">diff</h2>
                <p className="text-base text-black">
                    Compare local components with the registry to check for updates. Useful when you want to see what has changed without overwriting your customizations.
                </p>
                <CodeBlock code={`npx neobrutal diff [component]`} language="bash" />

                <CodeBlock code={`# Check all installed components
npx neobrutal diff

# Check a specific component
npx neobrutal diff button`} language="bash" />
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">Configuration</h2>
                <p className="text-base text-black">
                    The init command creates a <code className="px-1.5 py-0.5 bg-neutral-200 rounded text-base font-mono">components.json</code> file in your project root. This file tells the CLI where to place components and how to resolve imports.
                </p>

                <CodeBlock code={`{
  "$schema": "https://www.neobrutalui.live/schema.json",
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

                <div className="border-2 border-black overflow-hidden">
                    <table className="w-full text-base">
                        <thead className="bg-main border-b-2 border-black">
                            <tr>
                                <th className="text-left p-3 font-bold text-black w-1/3">Property</th>
                                <th className="text-left p-3 font-bold text-black">Description</th>
                            </tr>
                        </thead>
                        <tbody className="bg-bw">
                            <tr className="border-b-2 border-black">
                                <td className="p-3 font-mono text-base text-black">style</td>
                                <td className="p-3 text-black">Component style variant</td>
                            </tr>
                            <tr className="border-b-2 border-black">
                                <td className="p-3 font-mono text-base text-black">tailwind.css</td>
                                <td className="p-3 text-black">Path to global CSS file</td>
                            </tr>
                            <tr className="border-b-2 border-black">
                                <td className="p-3 font-mono text-base text-black">aliases.components</td>
                                <td className="p-3 text-black">Import alias for components</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-base text-black">aliases.utils</td>
                                <td className="p-3 text-black">Import alias for utilities</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}
