"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const usageCode = `<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`

export default function InputPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Input</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A text input field with bold borders and accessible focus states.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Email" />
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add input" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"`} />
                <CodeBlock code={usageCode} />
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold">Examples</h2>

                <div className="space-y-4">
                    <h3 className="font-bold">File Input</h3>
                    <ComponentPreview code={`<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="picture">Picture</Label>
  <Input id="picture" type="file" />
</div>`}>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="picture">Picture</Label>
                            <Input id="picture" type="file" />
                        </div>
                    </ComponentPreview>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">Disabled</h3>
                    <ComponentPreview code={`<Input disabled type="email" placeholder="Email" />`}>
                        <Input disabled type="email" placeholder="Email" />
                    </ComponentPreview>
                </div>
            </div>
        </div>
    )
}
