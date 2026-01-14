import Link from "next/link"
import { CodeBlock } from "@/components/docs/code-block"

export default function ThemingPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Theming</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Edit the CSS variables in your <strong>globals.css</strong> to customize colors, shadows, and border radius.
                </p>
                <CodeBlock code={`:root {
  --main: #B6ACE4;      /* accent color */
  --bg: #f0eefc;        /* page background */
  --white: #ffffff;     /* component backgrounds */
  --black: #000000;     /* text and borders */
  --radius: 5px;        /* border radius */
  --shadow-brutal: 4px 4px 0px 0px var(--black);
}`} language="css" />
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">Example Themes</h2>
                <div className="border-2 border-black divide-y-2 divide-black">
                    <div className="p-5 bg-white">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-6 h-6 border-2 border-black bg-[#97ee88]"></div>
                            <h3 className="font-bold text-black text-lg">Mint</h3>
                        </div>
                        <CodeBlock code={`--main: #97ee88;
--bg: #eefbec;`} language="css" />
                    </div>
                    <div className="p-5 bg-white">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-6 h-6 border-2 border-black bg-[#fed170]"></div>
                            <h3 className="font-bold text-black text-lg">Lemon</h3>
                        </div>
                        <CodeBlock code={`--main: #fed170;
--bg: #fffbf0;`} language="css" />
                    </div>
                </div>
            </section>

            <section className="border-2 border-black bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
                    <Link href="/docs/cli" className="block p-3 hover:bg-main">
                        <span className="text-lg font-bold">CLI Reference</span>
                        <p className="truncate">All available commands and options</p>
                    </Link>
                    <Link href="/docs/accessibility" className="block p-3 hover:bg-main text-right">
                        <span className="text-lg font-bold">Accessibility</span>
                        <p className="truncate">Learn about how neobrutal ui is built with accessibility in mind</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}
