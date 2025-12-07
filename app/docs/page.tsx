import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

export default function DocsPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-black md:text-5xl">Introduction</h1>
                <p className="text-xl text-neutral-600 dark:text-neutral-400">
                    NeoBrutal UI is a collection of re-usable components built with Radix UI and Tailwind CSS.
                </p>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p>
                    This is <strong>NOT</strong> a component library. It&apos;s a collection of re-usable components that you can copy and paste into your apps.
                </p>
                <p>
                    <strong>What do you mean by not a component library?</strong>
                </p>
                <p>
                    I mean you do not install it as a dependency. It is not available or distributed via npm.
                </p>
                <p>
                    Pick the components you need. Copy and paste the code into your project and customize to your needs. The code is yours.
                </p>
            </div>

            <div className="flex gap-4">
                <Link href="/docs/components">
                    <Button className="gap-2">
                        Browse Components <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                </Link>
                <Link href="https://github.com/bridgetamana/neobrutal-ui" target="_blank">
                    <Button variant="neutral">GitHub</Button>
                </Link>
            </div>
        </div>
    )
}
