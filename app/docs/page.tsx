import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Introduction",
    description: "Neobrutal UI is a free, open-source collection of Neobrutalist React components built with Base UI and Tailwind CSS.",
}

export default function DocsPage() {
    return (
        <div className="space-y-8 text-black">
            <header>
                <h1 className="text-3xl font-semibold md:text-4xl">Introduction</h1>
            </header>

            <section className="space-y-4">
                <p>
                    Neobrutal UI is a collection of neobrutalism-styled components with smooth animations built with Base UI, React and Tailwind CSS.
                </p>
                <p>
                    Components are distributed via CLI or direct copy-paste. You own the code, customize it freely, and never worry about breaking changes from upstream updates.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Why Neobrutal UI</h2>
                <div className="border-2 border-black bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
                        <div className="p-4">
                            <span className="text-xl font-medium">Open Code</span>
                            <p className="mt-1">
                                No hidden abstractions or version lock-in. Every line lives in your project.
                            </p>
                        </div>
                        <div className="p-4">
                            <span className="text-xl font-medium">Accessible</span>
                            <p className="mt-1">
                                Built on Base UI with keyboard navigation and screen reader support.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black border-t-2 border-black">
                        <div className="p-4">
                            <span className="text-xl font-medium">Two Formats</span>
                            <p className="mt-1">
                                React components for applications. Plain HTML with Tailwind for prototypes.
                            </p>
                        </div>
                        <div className="p-4">
                            <span className="text-xl font-medium">Customizable</span>
                            <p className="mt-1">
                                Styled with CSS variables for straightforward theming and customization.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">FAQ</h2>
                <Accordion className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            Is this a component library I install from npm?
                        </AccordionTrigger>
                        <AccordionContent>
                            No. Neobrutalism UI uses a CLI to copy component source code directly into your project. You own and control every file.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                            How do I customize the colors?
                        </AccordionTrigger>
                        <AccordionContent>
                            All styling uses CSS variables defined in your globals.css file. Change the values and the entire library updates automatically.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>
                            What if a component updates after I copy it?
                        </AccordionTrigger>
                        <AccordionContent>
                            Use the diff command to compare your local version with the registry. Apply updates selectively while preserving your customizations.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Credits</h2>
                <p>
                    Neobrutal UI is built on the work of several open source projects and design systems.
                </p>
                <ul className="space-y-2 list-disc list-inside font-semibold">
                    <li>
                        <Link href="https://base-ui.com" target="_blank" className="underline underline-offset-4">Base UI</Link>
                    </li>
                    <li>
                        <Link href="https://tailwindcss.com" target="_blank" className="underline underline-offset-4">Tailwind CSS</Link>
                    </li>
                    <li>
                        <Link href="https://ui.shadcn.com" target="_blank" className="underline underline-offset-4">shadcn/ui</Link>
                    </li>
                    <li>
                        <Link href="https://phosphoricons.com" target="_blank" className="underline underline-offset-4">Phosphor Icons</Link>
                    </li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Get Involved</h2>
                <ul className="space-y-2 list-disc list-inside font-semibold">
                    <li>
                        <Link href="https://github.com/bridgetamana/neobrutal-ui" target="_blank" className="underline underline-offset-4">
                            Star the repository on GitHub
                        </Link>
                    </li>
                    <li>
                        <Link href="https://github.com/bridgetamana/neobrutal-ui/issues" target="_blank" className="underline underline-offset-4">
                            Report bugs or request features
                        </Link>
                    </li>
                    <li>
                        <Link href="https://github.com/bridgetamana/neobrutal-ui/blob/main/CONTRIBUTING.md" target="_blank" className="underline underline-offset-4">
                            Contribute to the project
                        </Link>
                    </li>
                </ul>
            </section>

            <section className="border-2 border-black bg-white">
                <Link href="/docs/installation" className="block p-3 hover:bg-main text-right">
                    <span className="text-lg font-bold">Installation</span>
                    <p className="truncate">Learn how to install Neobrutal UI components</p>
                </Link>
            </section>
        </div>
    )
}
