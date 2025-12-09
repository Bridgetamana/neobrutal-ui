import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

export default function DocsPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-black md:text-5xl">Introduction</h1>
                <p className="text-xl text-neutral-600">
                    A bold, accessible component library with Neobrutalist design. Copy-paste components for React and pure HTML/Tailwind.
                </p>
            </div>

            <div className="prose prose-neutral max-w-none space-y-4">
                <p>
                    <strong>NeoBrutal UI</strong> is a collection of re-usable components built with Radix UI primitives and Tailwind CSS. It bridges the gap between chaotic Neobrutalism and structured accessibility.
                </p>

                <div className="not-prose border-2 border-black p-4 bg-pastel-yellow shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="font-bold text-lg mb-2">Two Ways to Use</h3>
                    <ul className="space-y-2 text-sm">
                        <li><strong>React Components:</strong> Full-featured components with Radix UI for accessibility. Install dependencies, copy components, customize.</li>
                        <li><strong>HTML/Tailwind:</strong> Pure HTML with Tailwind classes. No dependencies, no build step. Just copy and paste.</li>
                    </ul>
                </div>

                <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mt-8">What Makes It Different?</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Copy-paste architecture</strong> - You own the code. No npm package to install.</li>
                    <li><strong>Neobrutalist design</strong> - Bold borders, hard shadows, high contrast.</li>
                    <li><strong>Accessible by default</strong> - Built on Radix UI primitives with proper ARIA support.</li>
                    <li><strong>Tailwind CSS v4</strong> - Uses the latest Tailwind features and CSS variables.</li>
                    <li><strong>Two code formats</strong> - React for apps, HTML for quick prototypes or non-React projects.</li>
                </ul>

                <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mt-8">Prerequisites</h2>
                <div className="not-prose border-2 border-black p-4 bg-bw">
                    <p className="font-bold mb-2">For React Components:</p>
                    <ul className="text-sm space-y-1 list-disc list-inside mb-4">
                        <li>Tailwind CSS v4</li>
                        <li>React 19+ / Next.js 16+</li>
                        <li>Phosphor Icons (recommended for icons)</li>
                    </ul>
                    <p className="font-bold mb-2">For HTML/Tailwind:</p>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Tailwind CSS v4 only</li>
                        <li>Icons: Use inline SVGs or install Phosphor Icons</li>
                    </ul>
                </div>
            </div>

            <div className="flex gap-4">
                <Link href="/docs/installation">
                    <Button className="gap-2">
                        Get Started <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                </Link>
                <Link href="https://github.com/bridgetamana/neobrutal-ui" target="_blank">
                    <Button variant="neutral">GitHub</Button>
                </Link>
            </div>
        </div>
    )
}
