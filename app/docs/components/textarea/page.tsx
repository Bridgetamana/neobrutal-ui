"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const usageCode = `<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your message</Label>
  <Textarea placeholder="Type your message here." id="message" />
</div>`

export default function TextareaPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Textarea</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A multi-line text input field with bold styling.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <div className="grid w-full gap-1.5">
                    <Label htmlFor="message">Your message</Label>
                    <Textarea placeholder="Type your message here." id="message" />
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add textarea" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"`} />
                <CodeBlock code={usageCode} />
            </div>
        </div>
    )
}
