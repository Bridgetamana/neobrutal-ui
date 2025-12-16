"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const radioGroupCode = `"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
    React.ComponentRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
    <RadioGroupPrimitive.Root
        className={cn("grid gap-2", className)}
        {...props}
        ref={ref}
    />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
    React.ComponentRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                "aspect-square h-5 w-5 rounded-full border-2 border-border text-text ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-main",
                className
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <CircleIcon weight="fill" className="h-2.5 w-2.5 fill-current text-current" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }`

export default function RadioGroupPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black md:text-4xl text-black">Radio Group</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A set of radio buttons where only one option can be selected at a time. Perfect for mutually exclusive choices.
                </p>
            </section>

            <ComponentPreview code={radioGroupCode}>
                <RadioGroup defaultValue="option-1">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-1" id="radio-1" />
                        <Label htmlFor="radio-1">Option 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-2" id="radio-2" />
                        <Label htmlFor="radio-2">Option 2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-3" id="radio-3" />
                        <Label htmlFor="radio-3">Option 3</Label>
                    </div>
                </RadioGroup>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Features</h2>
                <ul className="list-disc list-inside space-y-2 text-black">
                    <li><strong>Mutual exclusion:</strong> Only one option selected at a time</li>
                    <li><strong>Circular shape:</strong> Classic radio button look</li>
                    <li><strong>Radix UI:</strong> Built on accessible primitives</li>
                    <li><strong>Group layout:</strong> Default gap-2 spacing between options</li>
                    <li><strong>Inner indicator:</strong> Filled circle when selected</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage Example</h2>
                <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="size-default" />
                        <Label htmlFor="size-default">Default</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="size-comfortable" />
                        <Label htmlFor="size-comfortable">Comfortable</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="size-compact" />
                        <Label htmlFor="size-compact">Compact</Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Accessibility</h2>
                <ul className="list-disc list-inside space-y-2 text-black">
                    <li><strong>WAI-ARIA compliant:</strong> Full Radix UI accessibility support</li>
                    <li><strong>Keyboard navigation:</strong> Arrow keys move between options, Space/Enter to select</li>
                    <li><strong>Labels:</strong> Always pair items with &lt;Label&gt; using htmlFor</li>
                    <li><strong>Focus ring:</strong> Clear visual indicator for keyboard navigation</li>
                    <li><strong>Screen readers:</strong> Announces group role and selected option</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Installation</h2>
                <p className="text-black mb-2">Install Radix UI dependency:</p>
                <CodeBlock code="npm install @radix-ui/react-radio-group @phosphor-icons/react" language="bash" />
                <p className="text-black mb-2">Copy the component code into <code className="bg-neutral-200 px-2 py-1 rounded">components/ui/radio-group.tsx</code>:</p>
                <CodeBlock code={radioGroupCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage</h2>
                <CodeBlock code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="opt1" />
        <Label htmlFor="opt1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="opt2" />
        <Label htmlFor="opt2">Option 2</Label>
      </div>
    </RadioGroup>
  )
}`} />
            </div>
        </div>
    )
}
