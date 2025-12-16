"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const checkboxCode = `"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
    React.ComponentRef<typeof CheckboxPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
            "peer h-5 w-5 shrink-0 rounded-base border-2 border-border ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-main data-[state=checked]:text-black",
            className
        )}
        {...props}
    >
        <CheckboxPrimitive.Indicator
            className={cn("flex items-center justify-center text-current")}
        >
            <CheckIcon weight="bold" className="h-3.5 w-3.5" />
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }`

export default function CheckboxPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black md:text-4xl text-black">Checkbox</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A customizable checkbox input with bold styling and accessible controls.
                </p>
            </section>

            <ComponentPreview code={checkboxCode}>
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="cb1" />
                        <Label htmlFor="cb1">Unchecked</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="cb2" defaultChecked />
                        <Label htmlFor="cb2">Checked</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="cb3" disabled />
                        <Label htmlFor="cb3">Disabled</Label>
                    </div>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Features</h2>
                <ul className="list-disc list-inside space-y-2 text-black">
                    <li><strong>Bold Styling:</strong> 2px border with hard edges for Neobrutalist look</li>
                    <li><strong>Radix UI:</strong> Built on accessible primitives (WAI-ARIA compliant)</li>
                    <li><strong>Icon:</strong> Uses Phosphor CheckIcon for visual feedback</li>
                    <li><strong>States:</strong> Supports checked, unchecked, and disabled states</li>
                    <li><strong>Square Shape:</strong> Classic checkbox aesthetic (not rounded)</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">States</h2>
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="normal" />
                        <Label htmlFor="normal">Normal (unchecked)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="checked" defaultChecked />
                        <Label htmlFor="checked">Checked</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="disabled" disabled />
                        <Label htmlFor="disabled">Disabled</Label>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Accessibility</h2>
                <ul className="list-disc list-inside space-y-2 text-black">
                    <li><strong>Built on Radix UI:</strong> Full WAI-ARIA compliance</li>
                    <li><strong>Keyboard support:</strong> Space key to toggle, Tab to navigate</li>
                    <li><strong>Labels:</strong> Always pair with &lt;Label&gt; using htmlFor</li>
                    <li><strong>Focus ring:</strong> Clear 2px black ring for keyboard users</li>
                    <li><strong>Screen readers:</strong> Properly announces checked state</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Installation</h2>
                <p className="text-black mb-2">Install Radix UI dependency:</p>
                <CodeBlock code="npm install @radix-ui/react-checkbox @phosphor-icons/react" language="bash" />
                <p className="text-black mb-2">Copy the component code into <code className="bg-neutral-200 px-2 py-1 rounded">components/ui/checkbox.tsx</code>:</p>
                <CodeBlock code={checkboxCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage</h2>
                <CodeBlock code={`import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CheckboxDemo() {
  const [checked, setChecked] = React.useState(false)
  
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="agree" checked={checked} onCheckedChange={setChecked} />
      <Label htmlFor="agree">I agree to the terms</Label>
    </div>
  )
}`} />
            </div>
        </div>
    )
}
