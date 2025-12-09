"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const accordionCode = `"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { CaretDown } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
    React.ComponentRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn("border-b-2 border-border", className)}
        {...props}
    />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    React.ComponentRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                className
            )}
            {...props}
        >
            {children}
            <CaretDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
    React.ComponentRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}
    >
        <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
`

export default function AccordionPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-medium">Accordion</h1>
                <p className="text-black/90">
                    A vertically stacked set of interactive headings that each reveal a section of content.
                </p>
            </div>

            <ComponentPreview code={accordionCode}>
                <Accordion type="single" collapsible className="w-full max-w-[400px]">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is it styled?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It comes with default styles that matches the other components&apos; aesthetic.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Is it animated?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It&apos;s animated by default, but you can disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-medium border-b-2 border-black pb-2">Installation</h2>
                <div className="space-y-4">
                    <p>1. Install the Radix UI primitive:</p>
                    <CodeBlock code="npm install @radix-ui/react-accordion" language="bash" />

                    <p>2. Copy the source code into <code className="bg-neutral-200 px-1 py-0.5 rounded">components/ui/accordion.tsx</code>:</p>
                    <CodeBlock code={accordionCode} />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-medium border-b-2 border-black pb-2">Usage</h2>
                <CodeBlock code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`} />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-medium border-b-2 border-black pb-2">Examples</h2>

                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Multiple Items Open</h3>
                    <p className="text-black/90">Allow multiple items to be open at the same time.</p>
                    <ComponentPreview code={`<Accordion type="multiple" className="w-full max-w-[400px]">
  <AccordionItem value="item-1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Item 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
</Accordion>`}>
                        <Accordion type="multiple" className="w-full max-w-[400px]">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Item 1</AccordionTrigger>
                                <AccordionContent>
                                    Content 1
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Item 2</AccordionTrigger>
                                <AccordionContent>
                                    Content 2
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </ComponentPreview>
                </div>
            </div>
        </div>
    )
}
