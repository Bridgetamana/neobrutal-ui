"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const selectCode = `"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
            "flex h-10 w-full items-center justify-between rounded-base border-2 border-border bg-bw px-3 py-2 text-sm ring-offset-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        {...props}
    >
        {children}
        <SelectPrimitive.Icon asChild>
            <CaretDownIcon className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            ref={ref}
            className={cn(
                "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-base border-2 border-border bg-bw text-text shadow-brutal",
                className
            )}
            position={position}
            {...props}
        >
            <SelectPrimitive.Viewport className="p-1">
                {children}
            </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectItem = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm font-bold outline-none focus:bg-main focus:text-black",
            className
        )}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
                <CheckIcon className="h-4 w-4" />
            </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
}`

export default function SelectPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black md:text-4xl text-black">Select</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A dropdown select component with full accessibility. Perfect for choosing from a list of options.
                </p>
            </section>

            <ComponentPreview code={selectCode}>
                <div className="w-full max-w-sm space-y-4">
                    <div>
                        <Label htmlFor="select-demo">Choose a framework</Label>
                        <Select>
                            <SelectTrigger id="select-demo">
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="react">React</SelectItem>
                                <SelectItem value="next">Next.js</SelectItem>
                                <SelectItem value="vue">Vue</SelectItem>
                                <SelectItem value="svelte">Svelte</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Features</h2>
                <ul className="list-disc list-inside space-y-2 text-black">
                    <li><strong>Dropdown portal:</strong> Renders above all content</li>
                    <li><strong>Keyboard navigation:</strong> Arrow keys to move, Enter to select</li>
                    <li><strong>Search/type:</strong> Type to jump to matching options</li>
                    <li><strong>Check indicator:</strong> Shows selected item</li>
                    <li><strong>Radix UI:</strong> Full WAI-ARIA compliance</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Components</h2>
                <ul className="list-disc list-inside space-y-2 text-black">
                    <li><strong>Select:</strong> Root component (Radix SelectPrimitive.Root)</li>
                    <li><strong>SelectTrigger:</strong> Button that opens the dropdown</li>
                    <li><strong>SelectValue:</strong> Shows selected value or placeholder</li>
                    <li><strong>SelectContent:</strong> Dropdown menu container</li>
                    <li><strong>SelectItem:</strong> Individual option</li>
                    <li><strong>SelectGroup:</strong> Group items with a label</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Accessibility</h2>
                <ul className="list-disc list-inside space-y-2 text-black">
                    <li><strong>Full ARIA support:</strong> Built on Radix UI select primitive</li>
                    <li><strong>Keyboard navigation:</strong> Tab, Arrow keys, Enter/Space</li>
                    <li><strong>Screen readers:</strong> Announces selected option and availability</li>
                    <li><strong>Focus management:</strong> Proper focus trap in dropdown</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Installation</h2>
                <p className="text-black mb-2">Install Radix UI dependencies:</p>
                <CodeBlock code="npm install @radix-ui/react-select @phosphor-icons/react" language="bash" />
                <p className="text-black mb-2">Copy the component code into <code className="bg-neutral-200 px-2 py-1 rounded">components/ui/select.tsx</code>:</p>
                <CodeBlock code={selectCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b-2 border-border pb-2">Usage</h2>
                <CodeBlock code={`import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Pick an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option-1">Option 1</SelectItem>
        <SelectItem value="option-2">Option 2</SelectItem>
        <SelectItem value="option-3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  )
}`} />
            </div>
        </div>
    )
}
