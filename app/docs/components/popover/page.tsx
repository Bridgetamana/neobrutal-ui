"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const popoverCode = `import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-base border-2 border-black bg-white p-4 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }`

export default function PopoverPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black md:text-4xl text-black">Popover</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Displays rich content in a portal, triggered by a button.
                </p>
            </section>

            <ComponentPreview code={popoverCode}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button>Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-bold leading-none">Dimensions</h4>
                                <p className="text-sm text-black">
                                    Set the dimensions for the layer.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label htmlFor="width" className="text-sm font-bold">Width</label>
                                    <input
                                        id="width"
                                        defaultValue="100%"
                                        className="col-span-2 h-8 border-2 border-black px-2 text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label htmlFor="maxWidth" className="text-sm font-bold">Max. width</label>
                                    <input
                                        id="maxWidth"
                                        defaultValue="300px"
                                        className="col-span-2 h-8 border-2 border-black px-2 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-black">Installation</h2>
                <CodeBlock code={`npm install @radix-ui/react-popover`} language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-black">Accessibility</h2>
                <ul className="space-y-2 list-disc list-inside font-bold">
                    <li>Follows WAI-ARIA Popover pattern</li>
                    <li>Focus management handled by Radix UI</li>
                    <li>Keyboard navigation support (Esc to close)</li>
                    <li>Screen reader announcements</li>
                </ul>
            </div>
        </div>
    )
}
