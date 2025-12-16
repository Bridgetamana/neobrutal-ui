import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRightIcon, GithubLogoIcon, ChatCircleIcon, HeartIcon } from "@phosphor-icons/react/dist/ssr"

export default function DocsPage() {
    return (
        <div className="space-y-12">
            <header className="space-y-4">
                <h1 className="text-4xl font-black md:text-5xl">Introduction</h1>
                <p className="text-xl text-neutral-700 max-w-2xl">
                    A collection of accessible, Neobrutalist UI components. Open source, copy-paste ready, and fully customizable.
                </p>
            </header>

            <section className="space-y-4">
                <p className="text-neutral-700 leading-relaxed">
                    NeoBrutal UI bridges the gap between raw Neobrutalist aesthetics and structured accessibility. Each component is built on Radix UI primitives, ensuring proper keyboard navigation, focus management, and ARIA support out of the box.
                </p>
                <p className="text-neutral-700 leading-relaxed">
                    Components are distributed via CLI or direct copy-paste. There is no npm package to install. You own the code, customize it freely, and never worry about breaking changes from upstream updates.
                </p>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Why NeoBrutal UI</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-5 border-2 border-black rounded-base bg-bw">
                        <h3 className="font-bold mb-2">Open Code</h3>
                        <p className="text-sm text-neutral-600">
                            No hidden abstractions or version lock-in. Every line lives in your project.
                        </p>
                    </div>
                    <div className="p-5 border-2 border-black rounded-base bg-bw">
                        <h3 className="font-bold mb-2">Accessible</h3>
                        <p className="text-sm text-neutral-600">
                            Built on Radix UI with keyboard navigation and screen reader support.
                        </p>
                    </div>
                    <div className="p-5 border-2 border-black rounded-base bg-bw">
                        <h3 className="font-bold mb-2">Two Formats</h3>
                        <p className="text-sm text-neutral-600">
                            React components for applications. Plain HTML with Tailwind for prototypes.
                        </p>
                    </div>
                    <div className="p-5 border-2 border-black rounded-base bg-bw">
                        <h3 className="font-bold mb-2">Tailwind CSS v4</h3>
                        <p className="text-sm text-neutral-600">
                            Styled with CSS variables for straightforward theming and customization.
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Get Involved</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                    <Link
                        href="https://github.com/bridgetamana/neobrutal-ui"
                        target="_blank"
                        className="flex items-center gap-3 p-4 border-2 border-black rounded-base bg-bw hover:bg-main transition-colors"
                    >
                        <GithubLogoIcon className="h-5 w-5" weight="bold" />
                        <div>
                            <p className="font-bold text-sm">GitHub</p>
                            <p className="text-xs text-neutral-600">Star the repository</p>
                        </div>
                    </Link>
                    <Link
                        href="https://github.com/bridgetamana/neobrutal-ui/issues"
                        target="_blank"
                        className="flex items-center gap-3 p-4 border-2 border-black rounded-base bg-bw hover:bg-main transition-colors"
                    >
                        <ChatCircleIcon className="h-5 w-5" weight="bold" />
                        <div>
                            <p className="font-bold text-sm">Issues</p>
                            <p className="text-xs text-neutral-600">Report bugs or request features</p>
                        </div>
                    </Link>
                    <Link
                        href="https://github.com/bridgetamana/neobrutal-ui/blob/main/CONTRIBUTING.md"
                        target="_blank"
                        className="flex items-center gap-3 p-4 border-2 border-black rounded-base bg-bw hover:bg-main transition-colors"
                    >
                        <HeartIcon className="h-5 w-5" weight="bold" />
                        <div>
                            <p className="font-bold text-sm">Contribute</p>
                            <p className="text-xs text-neutral-600">Help improve the project</p>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">FAQ</h2>
                <div className="space-y-4">
                    <div className="p-5 border-2 border-black rounded-base bg-bw">
                        <h3 className="font-bold mb-2">Is this a component library I install from npm?</h3>
                        <p className="text-sm text-neutral-600">
                            No. NeoBrutal UI uses a CLI to copy component source code directly into your project. You own and control every file.
                        </p>
                    </div>
                    <div className="p-5 border-2 border-black rounded-base bg-bw">
                        <h3 className="font-bold mb-2">Can I use this with frameworks other than React?</h3>
                        <p className="text-sm text-neutral-600">
                            Yes. Every component includes an HTML version with Tailwind classes that works with Vue, Svelte, plain HTML, or any other framework.
                        </p>
                    </div>
                    <div className="p-5 border-2 border-black rounded-base bg-bw">
                        <h3 className="font-bold mb-2">How do I customize the colors?</h3>
                        <p className="text-sm text-neutral-600">
                            All styling uses CSS variables defined in your globals.css file. Change the values and the entire library updates automatically.
                        </p>
                    </div>
                    <div className="p-5 border-2 border-black rounded-base bg-bw">
                        <h3 className="font-bold mb-2">What if a component updates after I copy it?</h3>
                        <p className="text-sm text-neutral-600">
                            Use the diff command to compare your local version with the registry. Apply updates selectively while preserving your customizations.
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Credits</h2>
                <p className="text-neutral-700 leading-relaxed">
                    NeoBrutal UI is built on the work of several open source projects and design systems.
                </p>
                <ul className="space-y-2 text-sm text-neutral-700">
                    <li>
                        <Link href="https://www.radix-ui.com" target="_blank" className="font-bold hover:text-main">Radix UI</Link>
                        <span className="text-neutral-600"> — Accessible component primitives</span>
                    </li>
                    <li>
                        <Link href="https://tailwindcss.com" target="_blank" className="font-bold hover:text-main">Tailwind CSS</Link>
                        <span className="text-neutral-600"> — Utility-first CSS framework</span>
                    </li>
                    <li>
                        <Link href="https://ui.shadcn.com" target="_blank" className="font-bold hover:text-main">shadcn/ui</Link>
                        <span className="text-neutral-600"> — Inspiration for the copy-paste distribution model</span>
                    </li>
                    <li>
                        <Link href="https://phosphoricons.com" target="_blank" className="font-bold hover:text-main">Phosphor Icons</Link>
                        <span className="text-neutral-600"> — Icon library used throughout the documentation</span>
                    </li>
                </ul>
            </section>

            <div className="flex gap-4 pt-4">
                <Link href="/docs/installation">
                    <Button className="gap-2">
                        Get Started <ArrowRightIcon className="h-4 w-4" weight="bold" />
                    </Button>
                </Link>
                <Link href="https://github.com/bridgetamana/neobrutal-ui" target="_blank">
                    <Button variant="neutral">View on GitHub</Button>
                </Link>
            </div>
        </div>
    )
}
