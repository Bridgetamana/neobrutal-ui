"use client"

import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const buttonCode = `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="neutral">Neutral</Button>
      <Button variant="reverse">Reverse</Button>
      <Button variant="outline">Outline</Button>
    </div>
  )
}`

const buttonHtmlCode = `<!-- Default Button -->
<button class="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-bold bg-[#88aaee] text-black border-2 border-black rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
  Default
</button>

<!-- Neutral Button -->
<button class="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-bold bg-white text-black border-2 border-black rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
  Neutral
</button>

<!-- Reverse Button -->
<button class="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-bold bg-black text-white border-2 border-black rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-neutral-800 transition-all">
  Reverse
</button>

<!-- Outline Button -->
<button class="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-bold bg-white text-black border-2 border-black rounded-[5px] hover:bg-neutral-100 transition-all">
  Outline
</button>`

export default function ButtonPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-black">Button</h1>
                <p className="text-xl text-neutral-600">
                    A versatile button component with multiple variants and sizes. Core component for triggering actions.
                </p>
            </div>

            <ComponentPreview code={buttonCode} htmlCode={buttonHtmlCode}>
                <div className="flex flex-wrap items-center gap-4">
                    <Button variant="default">Default</Button>
                    <Button variant="neutral">Neutral</Button>
                    <Button variant="reverse">Reverse</Button>
                    <Button variant="outline">Outline</Button>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Installation</h2>
                <div className="space-y-4">
                    <p>Copy the source code into <code className="bg-neutral-200 px-1 py-0.5 rounded">components/ui/button.tsx</code>:</p>
                    <CodeBlock code={buttonCode} />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Usage</h2>
                <CodeBlock code={`import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Click me</Button>
}`} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Examples</h2>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Variants</h3>
                    <p className="text-neutral-600">Different styles for different contexts.</p>
                    <ComponentPreview code={`<div className="flex flex-wrap gap-4">
  <Button variant="default">Default</Button>
  <Button variant="neutral">Neutral</Button>
  <Button variant="reverse">Reverse</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="noShadow">No Shadow</Button>
</div>`}>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="default">Default</Button>
                            <Button variant="neutral">Neutral</Button>
                            <Button variant="reverse">Reverse</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="noShadow">No Shadow</Button>
                        </div>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Sizes</h3>
                    <p className="text-neutral-600">Different sizes for different contexts.</p>
                    <ComponentPreview code={`<div className="flex items-center gap-4">
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
  <Button size="icon">🔍</Button>
</div>`}>
                        <div className="flex flex-wrap items-center gap-4">
                            <Button size="sm">Small</Button>
                            <Button size="default">Default</Button>
                            <Button size="lg">Large</Button>
                            <Button size="icon">🔍</Button>
                        </div>
                    </ComponentPreview>
                </div>
            </div>
        </div>
    )
}
