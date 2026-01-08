import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Introduction",
    description: "Neobrutal UI is a free, open-source collection of Neobrutalist React components built with Base UI and Tailwind CSS. Accessible, customizable, and copy-paste ready.",
}

export default function DocsPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Introduction</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black leading-relaxed">
                    Neobrutal UI is a collection of neobrutalism-styled components with smooth animations built with Base UI, React and Tailwind CSS.
                </p>
                <p className="text-base text-black leading-relaxed">
                    Components are distributed via CLI or direct copy-paste. You own the code, customize it freely, and never worry about breaking changes from upstream updates.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">Why Neobrutal UI</h2>
                <div className="border-2 border-black bg-bw">
                    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
                        <div className="p-6">
                            <span className="text-2xl font-bold text-black">Open Code</span>
                            <p className="text-base text-black mt-2">
                                No hidden abstractions or version lock-in. Every line lives in your project.
                            </p>
                        </div>
                        <div className="p-6 bg-main">
                            <span className="text-2xl font-bold text-black">Accessible</span>
                            <p className="text-base text-black mt-2">
                                Built on Base UI with keyboard navigation and screen reader support.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black border-t-2 border-black">
                        <div className="p-6 sm:bg-main">
                            <span className="text-2xl font-bold text-black">Two Formats</span>
                            <p className="text-base text-black mt-2">
                                React components for applications. Plain HTML with Tailwind for prototypes.
                            </p>
                        </div>
                        <div className="p-6 bg-main sm:bg-transparent">
                            <span className="text-2xl font-bold text-black">Customizable</span>
                            <p className="text-base text-black mt-2">
                                Styled with CSS variables for straightforward theming and customization.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">FAQ</h2>
                <Accordion className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-base font-bold text-black">
                            Is this a component library I install from npm?
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-black">
                            No. Neobrutalism UI uses a CLI to copy component source code directly into your project. You own and control every file.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-base font-bold text-black">
                            Can I use this with frameworks other than React?
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-black">
                            Yes. Every component includes an HTML version with Tailwind classes that works with Vue, Svelte, plain HTML, or any other framework.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-base font-bold text-black">
                            How do I customize the colors?
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-black">
                            All styling uses CSS variables defined in your globals.css file. Change the values and the entire library updates automatically.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="text-base font-bold text-black">
                            What if a component updates after I copy it?
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-black">
                            Use the diff command to compare your local version with the registry. Apply updates selectively while preserving your customizations.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">Credits</h2>
                <p className="text-base text-black leading-relaxed">
                    Neobrutal UI is built on the work of several open source projects and design systems.
                </p>
                <ul className="space-y-2 text-base list-disc list-inside text-black font-bold">
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
                <h2 className="text-2xl font-bold text-black">Get Involved</h2>
                <ul className="space-y-3 text-base list-disc list-inside text-black font-bold">
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

            <Link href="/docs/installation">
                <Button className="gap-2">
                    Get Started <ArrowRightIcon className="h-4 w-4" weight="bold" />
                </Button>
            </Link>
        </div>
    )
}
