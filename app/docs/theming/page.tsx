"use client"

import { CodeBlock } from "@/components/docs/code-block"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function ThemingPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-black">Theming</h1>
                <p className="text-xl text-neutral-600">
                    Customize NeoBrutal UI to match your brand. All styling is CSS-based and fully customizable.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">How Theming Works</h2>
                <p className="text-neutral-600">
                    NeoBrutal UI uses CSS custom properties (variables) defined in <code className="bg-neutral-200 px-1 py-0.5 rounded">app/globals.css</code>.
                    Since you own the code, customization is straightforward—just edit the variables!
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">CSS Variables</h2>
                <p className="text-neutral-600 mb-4">
                    Here are the key CSS variables you can customize:
                </p>

                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Color Variables</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-1 gap-3 text-sm">
                                <div className="p-3 bg-neutral-100 rounded-base border-2 border-border">
                                    <code className="font-mono">--main</code>
                                    <p className="text-xs text-neutral-600 mt-1">Primary accent color (default: #88aaee)</p>
                                </div>
                                <div className="p-3 bg-neutral-100 rounded-base border-2 border-border">
                                    <code className="font-mono">--bg</code>
                                    <p className="text-xs text-neutral-600 mt-1">Background color (default: #f4f4f5)</p>
                                </div>
                                <div className="p-3 bg-neutral-100 rounded-base border-2 border-border">
                                    <code className="font-mono">--bw</code>
                                    <p className="text-xs text-neutral-600 mt-1">Card/component background (default: #ffffff)</p>
                                </div>
                                <div className="p-3 bg-neutral-100 rounded-base border-2 border-border">
                                    <code className="font-mono">--text</code>
                                    <p className="text-xs text-neutral-600 mt-1">Text color (default: #09090b)</p>
                                </div>
                                <div className="p-3 bg-neutral-100 rounded-base border-2 border-border">
                                    <code className="font-mono">--border</code>
                                    <p className="text-xs text-neutral-600 mt-1">Border color (default: #000000)</p>
                                </div>
                                <div className="p-3 bg-neutral-100 rounded-base border-2 border-border">
                                    <code className="font-mono">--overlay</code>
                                    <p className="text-xs text-neutral-600 mt-1">Modal backdrop (default: rgba(0,0,0,0.8))</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Customize Colors</h2>
                <p className="text-neutral-600 mb-2">
                    Edit <code className="bg-neutral-200 px-1 py-0.5 rounded">app/globals.css</code>:
                </p>
                <CodeBlock code={`/* app/globals.css */
:root {
  --main: #88aaee;      /* Change to your brand color */
  --bg: #f4f4f5;        /* Page background */
  --bw: #ffffff;        /* Component background */
  --text: #09090b;      /* Text color */
  --border: #000000;    /* Border color */
  --overlay: rgba(0,0,0,0.8);
}`} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Customize Shadows</h2>
                <p className="text-neutral-600 mb-2">
                    The brutal shadow is defined as:
                </p>
                <CodeBlock code={`/* Default brutal shadow */
--shadow-brutal: 4px 4px 0px 0px var(--border);

/* Customize the offset and blur */
/* First two values: horizontal and vertical offset */
/* Third value: blur radius (0 for hard shadow) */
/* Fourth value: spread radius */`} />
                <p className="text-neutral-600 mt-2">
                    To change the shadow effect, modify the <code className="bg-neutral-200 px-1 py-0.5 rounded">--shadow-brutal</code> variable or update the Tailwind utility classes in components.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Customize Border Radius</h2>
                <p className="text-neutral-600 mb-2">
                    Components use <code className="bg-neutral-200 px-1 py-0.5 rounded">rounded-base</code> for consistency. Adjust in your Tailwind config:
                </p>
                <CodeBlock code={`/* tailwind.config.ts */
import type { Config } from "tailwindcss"

const config: Config = {
  theme: {
    extend: {
      borderRadius: {
        base: "5px", /* Change to 8px, 12px, or 0px for strict brutalism */
      },
    },
  },
}

export default config`} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Brand Color Example</h2>
                <p className="text-neutral-600 mb-2">
                    Here&quot;s how to change the primary accent to pink:
                </p>
                <CodeBlock code={`/* app/globals.css */
:root {
  --main: #ec4899; /* Pink instead of blue */
  --bg: #fdf2f8;   /* Light pink background */
  /* ... other variables ... */
}`} />
                <p className="text-sm text-neutral-600 mt-2">
                    Now all buttons, badges, and active states will use pink instead. The rest of the design stays consistent!
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Component-Specific Customization</h2>
                <p className="text-neutral-600 mb-4">
                    Since you own the code, you can customize individual components:
                </p>
                <CodeBlock code={`// components/ui/button.tsx
// Want thinner borders? Change border-2 to border
// Want rounded buttons? Change rounded-base to rounded-full
// Want different hover effect? Modify hover:translate-x-[2px]

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-bold border-2 border-border",
    {
      variants: {
        variant: {
          default: "bg-main text-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
          // ↑ Customize this press effect
        },
      },
    }
)`} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Color Palette Ideas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Modern Blue (Default)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex gap-2">
                                <div className="w-12 h-12 bg-blue-400 border-2 border-black rounded-base"></div>
                                <div>
                                    <p className="text-xs font-bold">#88aaee</p>
                                    <p className="text-xs text-neutral-600">Primary</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Hot Pink</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex gap-2">
                                <div className="w-12 h-12 bg-pink-400 border-2 border-black rounded-base"></div>
                                <div>
                                    <p className="text-xs font-bold">#ec4899</p>
                                    <p className="text-xs text-neutral-600">Primary</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Bright Yellow</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex gap-2">
                                <div className="w-12 h-12 bg-yellow-300 border-2 border-black rounded-base"></div>
                                <div>
                                    <p className="text-xs font-bold">#fde047</p>
                                    <p className="text-xs text-neutral-600">Primary</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Neon Green</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex gap-2">
                                <div className="w-12 h-12 bg-green-400 border-2 border-black rounded-base"></div>
                                <div>
                                    <p className="text-xs font-bold">#4ade80</p>
                                    <p className="text-xs text-neutral-600">Primary</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>


            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Best Practices</h2>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li><strong>High contrast:</strong> Keep text and borders dark for accessibility</li>
                    <li><strong>Saturated colors:</strong> Neobrutalism uses bold, high-saturation colors</li>
                    <li><strong>Consistent shadows:</strong> Hard shadows (no blur) maintain the aesthetic</li>
                    <li><strong>Bold borders:</strong> Use 2px or 4px borders, never thin lines</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Examples</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold mb-2">Minimalist Theme (Black & White)</h3>
                        <CodeBlock code={`:root {
  --main: #000000;
  --bg: #ffffff;
  --bw: #ffffff;
  --text: #000000;
  --border: #000000;
}`} />
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Vibrant Theme (Purple & Orange)</h3>
                        <CodeBlock code={`:root {
  --main: #a855f7;  /* Purple */
  --bg: #fff7ed;
  --bw: #ffffff;
  --text: #000000;
  --border: #000000;
}`} />
                    </div>
                </div>
            </div>
        </div>
    )
}
