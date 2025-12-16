"use client"

import { CodeBlock } from "@/components/docs/code-block"

export default function ThemingPage() {
    return (
        <div className="space-y-12">
            <header className="space-y-4">
                <h1 className="text-4xl font-black">Theming</h1>
                <p className="text-xl text-neutral-700 max-w-2xl">
                    Customize colors, shadows, and spacing using CSS variables.
                </p>
            </header>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Overview</h2>
                <p className="text-neutral-700 leading-relaxed">
                    All visual properties are controlled through CSS custom properties defined in your <code className="px-1.5 py-0.5 bg-neutral-200 rounded text-sm font-mono">globals.css</code> file. Change a variable once and every component updates automatically.
                </p>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Color Variables</h2>
                <p className="text-neutral-700">
                    The default theme uses a soft purple accent with a light background.
                </p>

                <div className="grid gap-3">
                    <div className="flex items-center gap-4 p-4 border-2 border-black rounded-base bg-bw">
                        <div className="w-10 h-10 rounded-base border-2 border-black bg-main"></div>
                        <div className="flex-1">
                            <code className="font-mono text-sm font-bold">--main</code>
                            <p className="text-sm text-neutral-600">Primary accent color</p>
                        </div>
                        <code className="text-sm text-neutral-500 font-mono">#B6ACE4</code>
                    </div>
                    <div className="flex items-center gap-4 p-4 border-2 border-black rounded-base bg-bw">
                        <div className="w-10 h-10 rounded-base border-2 border-black bg-bg"></div>
                        <div className="flex-1">
                            <code className="font-mono text-sm font-bold">--bg</code>
                            <p className="text-sm text-neutral-600">Page background</p>
                        </div>
                        <code className="text-sm text-neutral-500 font-mono">#f0eefc</code>
                    </div>
                    <div className="flex items-center gap-4 p-4 border-2 border-black rounded-base bg-bw">
                        <div className="w-10 h-10 rounded-base border-2 border-black bg-white"></div>
                        <div className="flex-1">
                            <code className="font-mono text-sm font-bold">--white</code>
                            <p className="text-sm text-neutral-600">Component backgrounds</p>
                        </div>
                        <code className="text-sm text-neutral-500 font-mono">#ffffff</code>
                    </div>
                    <div className="flex items-center gap-4 p-4 border-2 border-black rounded-base bg-bw">
                        <div className="w-10 h-10 rounded-base border-2 border-black bg-black"></div>
                        <div className="flex-1">
                            <code className="font-mono text-sm font-bold">--black</code>
                            <p className="text-sm text-neutral-600">Text and borders</p>
                        </div>
                        <code className="text-sm text-neutral-500 font-mono">#000000</code>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Changing Colors</h2>
                <p className="text-neutral-700">
                    Edit the <code className="px-1.5 py-0.5 bg-neutral-200 rounded text-sm font-mono">:root</code> block in your CSS file.
                </p>
                <CodeBlock code={`:root {
  --white: #ffffff;
  --black: #000000;
  --main: #B6ACE4;
  --bg: #f0eefc;
  --radius: 5px;
}`} language="css" />
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Shadows</h2>
                <p className="text-neutral-700">
                    The signature Neobrutalist shadow is a hard offset with no blur.
                </p>
                <CodeBlock code={`--shadow-brutal: 4px 4px 0px 0px var(--black);`} language="css" />
                <p className="text-sm text-neutral-600">
                    Adjust the first two values to change the offset distance. The third value (blur) should remain 0 to maintain the hard edge.
                </p>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Border Radius</h2>
                <p className="text-neutral-700">
                    All components use the <code className="px-1.5 py-0.5 bg-neutral-200 rounded text-sm font-mono">--radius</code> variable for consistent corners.
                </p>
                <CodeBlock code={`--radius: 5px;`} language="css" />
                <p className="text-sm text-neutral-600">
                    Set to 0 for sharp corners or increase for softer edges.
                </p>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Example Themes</h2>

                <div className="space-y-4">
                    <div className="p-5 border-2 border-black rounded-base bg-bw">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-6 h-6 rounded-base border-2 border-black bg-black"></div>
                            <h3 className="font-bold">Monochrome</h3>
                        </div>
                        <CodeBlock code={`:root {
  --main: #000000;
  --bg: #ffffff;
}`} language="css" />
                    </div>

                    <div className="p-5 border-2 border-black rounded-base bg-bw">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-6 h-6 rounded-base border-2 border-black bg-pink-500"></div>
                            <h3 className="font-bold">Hot Pink</h3>
                        </div>
                        <CodeBlock code={`:root {
  --main: #ec4899;
  --bg: #fdf2f8;
}`} language="css" />
                    </div>

                    <div className="p-5 border-2 border-black rounded-base bg-bw">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-6 h-6 rounded-base border-2 border-black bg-yellow-300"></div>
                            <h3 className="font-bold">Sunshine</h3>
                        </div>
                        <CodeBlock code={`:root {
  --main: #fde047;
  --bg: #fefce8;
}`} language="css" />
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Design Principles</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="p-4 border-2 border-black rounded-base bg-bw">
                        <h3 className="font-bold mb-1">High Contrast</h3>
                        <p className="text-sm text-neutral-600">
                            Keep borders and text dark against light backgrounds for readability.
                        </p>
                    </div>
                    <div className="p-4 border-2 border-black rounded-base bg-bw">
                        <h3 className="font-bold mb-1">Bold Colors</h3>
                        <p className="text-sm text-neutral-600">
                            Use saturated, vibrant colors. Muted tones weaken the aesthetic.
                        </p>
                    </div>
                    <div className="p-4 border-2 border-black rounded-base bg-bw">
                        <h3 className="font-bold mb-1">Hard Shadows</h3>
                        <p className="text-sm text-neutral-600">
                            No blur. The offset shadow is a defining characteristic.
                        </p>
                    </div>
                    <div className="p-4 border-2 border-black rounded-base bg-bw">
                        <h3 className="font-bold mb-1">Thick Borders</h3>
                        <p className="text-sm text-neutral-600">
                            Use 2px minimum. Thin lines break the brutalist look.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
