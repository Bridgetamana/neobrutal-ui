"use client"

import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const usageCode = `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Button</Button>
}`

const htmlCode = `<button class="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-bold bg-[#88aaee] text-black border-2 border-black rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
  Button
</button>`

export default function ButtonPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold">Button</h1>
                <p className="text-lg text-black/90">
                    Displays a button or a component that looks like a button.
                </p>
            </div>

            <ComponentPreview code={usageCode} htmlCode={htmlCode}>
                <Button>Button</Button>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal-ui add button" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { Button } from "@/components/ui/button"`} />
                <CodeBlock code={`<Button variant="outline">Button</Button>`} />
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold">Examples</h2>

                <div className="space-y-4">
                    <h3 className="font-bold">Default</h3>
                    <ComponentPreview code={`<Button>Default</Button>`}>
                        <Button>Default</Button>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Neutral</h3>
                    <ComponentPreview code={`<Button variant="neutral">Neutral</Button>`}>
                        <Button variant="neutral">Neutral</Button>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Reverse</h3>
                    <ComponentPreview code={`<Button variant="reverse">Reverse</Button>`}>
                        <Button variant="reverse">Reverse</Button>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Outline</h3>
                    <ComponentPreview code={`<Button variant="outline">Outline</Button>`}>
                        <Button variant="outline">Outline</Button>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">No Shadow</h3>
                    <ComponentPreview code={`<Button variant="noShadow">No Shadow</Button>`}>
                        <Button variant="noShadow">No Shadow</Button>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Sizes</h3>
                    <ComponentPreview code={`<div className="flex items-center gap-4">
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
</div>`}>
                        <div className="flex items-center gap-4">
                            <Button size="sm">Small</Button>
                            <Button size="default">Default</Button>
                            <Button size="lg">Large</Button>
                        </div>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Icon</h3>
                    <ComponentPreview code={`<Button size="icon">🔍</Button>`}>
                        <Button size="icon">🔍</Button>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Link</h3>
                    <p className="text-sm text-black/90">Use the asChild prop to render as a link.</p>
                    <CodeBlock code={`import Link from "next/link"

<Button asChild>
  <Link href="/login">Login</Link>
</Button>`} />
                </div>
            </div>
        </div>
    )
}
