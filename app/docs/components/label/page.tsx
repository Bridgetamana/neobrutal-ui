"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const labelCode = `"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const labelVariants = cva(
    "text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
    React.ComponentRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants(), className)}
        {...props}
    />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }`

export default function LabelPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black md:text-4xl text-black">Label</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    An accessible form label component built on Radix UI. Essential for semantic form markup.
                </p>
            </section>

            <ComponentPreview code={labelCode}>
                <div className="w-full max-w-sm space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="demo-input">Your Name</Label>
                        <Input id="demo-input" placeholder="Enter your name" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="demo-checkbox" />
                        <Label htmlFor="demo-checkbox">I agree to the terms</Label>
                    </div>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage with Form Controls</h2>
                <p className="text-black mb-4">
                    Labels should be paired with form controls using the <code className="bg-neutral-200 px-1 py-0.5">htmlFor</code> attribute.
                </p>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold mb-3">With Input</h3>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="your@email.com" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-3">With Checkbox</h3>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <Label htmlFor="terms">I agree to the terms of service</Label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Accessibility Features</h2>
                <ul className="list-disc list-inside space-y-2 text-black">
                    <li><strong>Built on Radix:</strong> Full accessibility support out of the box</li>
                    <li><strong>Semantic HTML:</strong> Uses native &lt;label&gt; element</li>
                    <li><strong>htmlFor attribute:</strong> Connects to form control via id</li>
                    <li><strong>Peer modifiers:</strong> Automatically responds to disabled control state</li>
                    <li><strong>Screen readers:</strong> Properly announces associations</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Styling</h2>
                <ul className="list-disc list-inside space-y-2 text-black">
                    <li><strong>Typography:</strong> Small (text-sm) bold font for clarity</li>
                    <li><strong>Disabled state:</strong> Reduced opacity when paired control is disabled</li>
                    <li><strong>Spacing:</strong> Designed for use with form components</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Installation</h2>
                <p className="text-black mb-2">First, install the Radix UI dependency:</p>
                <CodeBlock code="npm install @radix-ui/react-label" language="bash" />
                <p className="text-black mb-2">Copy the component code into <code className="bg-neutral-200 px-2 py-1 rounded">components/ui/label.tsx</code>:</p>
                <CodeBlock code={labelCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage</h2>
                <CodeBlock code={`import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function LabelDemo() {
  return (
    <div className="space-y-2">
      <Label htmlFor="username">Username</Label>
      <Input id="username" placeholder="Enter username" />
    </div>
  )
}`} />
            </div>
        </div>
    )
}
