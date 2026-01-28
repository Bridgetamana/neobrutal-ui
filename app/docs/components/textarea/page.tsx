import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your message</Label>
  <Textarea placeholder="Type your message here." id="message" />
</div>`

const disabledCode = `<Textarea placeholder="Disabled textarea" disabled />`

const textareaProps = [
    {
        name: "placeholder",
        type: "string",
        description: "Placeholder text displayed when the textarea is empty.",
    },
    {
        name: "disabled",
        type: "boolean",
        description: "When true, prevents the user from interacting with the textarea.",
    },
    {
        name: "rows",
        type: "number",
        description: "The number of visible text lines.",
    },
]

export default function TextareaPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Textarea</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A multi-line text input field for longer form content.
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

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Examples</h2>

                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Disabled</h3>
                    <ComponentPreview code={disabledCode}>
                        <Textarea placeholder="Disabled textarea" disabled className="max-w-sm" />
                    </ComponentPreview>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <PropsTable data={textareaProps} />
            </div>
        </div>
    )
}
