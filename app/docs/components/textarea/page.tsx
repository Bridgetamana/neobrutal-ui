"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const textareaCode = `import * as React from "react"
import { cn } from "@/lib/utils"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => (
        <textarea
            className={cn(
                "flex min-h-20 w-full rounded-base border-2 border-border bg-bw px-3 py-2 text-sm ring-offset-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
        />
    )
)
Textarea.displayName = "Textarea"

export { Textarea }`

export default function TextareaPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black md:text-4xl text-black">Textarea</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A multi-line text input field with bold styling. Perfect for longer form content.
                </p>
            </section>

            <ComponentPreview code={textareaCode}>
                <div className="w-full max-w-sm space-y-4">
                    <div>
                        <Label htmlFor="textarea-demo">Message</Label>
                        <Textarea id="textarea-demo" placeholder="Enter your message here..." />
                    </div>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Features</h2>
                <ul className="list-disc list-inside space-y-2 text-black">
                    <li><strong>Resizable:</strong> Users can resize by default (use resize-none to prevent)</li>
                    <li><strong>Min-height:</strong> Default 80px minimum for usable space</li>
                    <li><strong>Scrolling:</strong> Inherits overflow behavior for long content</li>
                    <li><strong>Focus states:</strong> Bold ring matching other form inputs</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">States</h2>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="normal-textarea">Normal</Label>
                        <Textarea id="normal-textarea" placeholder="Type something..." />
                    </div>
                    <div>
                        <Label htmlFor="disabled-textarea">Disabled</Label>
                        <Textarea id="disabled-textarea" placeholder="Cannot type here" disabled />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Customization</h2>
                <p className="text-black mb-4">
                    Adjust sizing using Tailwind utilities:
                </p>
                <CodeBlock code={`// Custom height
<Textarea className="min-h-[200px]" />

// Prevent resizing
<Textarea className="resize-none" />

// Change width
<Textarea className="w-full max-w-4xl" />`} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Accessibility</h2>
                <ul className="list-disc list-inside space-y-2 text-black">
                    <li><strong>Labels:</strong> Always pair with &lt;Label&gt; component</li>
                    <li><strong>Focus states:</strong> Clear visual indicator for keyboard users</li>
                    <li><strong>Character count:</strong> Consider adding with aria-live region</li>
                    <li><strong>Disabled state:</strong> Clear visual and functional indication</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Installation</h2>
                <p className="text-black mb-2">Copy the component code into <code className="bg-neutral-200 px-2 py-1 rounded">components/ui/textarea.tsx</code>:</p>
                <CodeBlock code={textareaCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage</h2>
                <CodeBlock code={`import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function TextareaDemo() {
  return (
    <div className="space-y-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Enter your message..." />
    </div>
  )
}`} />
            </div>
        </div>
    )
}
