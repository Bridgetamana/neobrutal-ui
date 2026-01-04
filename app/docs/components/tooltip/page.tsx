"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button variant="neutral" />}>
      Hover
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`

const tooltipProps = [
    {
        name: "open",
        type: "boolean",
        description: "The controlled open state of the tooltip.",
    },
    {
        name: "defaultOpen",
        type: "boolean",
        description: "The default open state when uncontrolled.",
    },
    {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Event handler called when the open state changes.",
    },
    {
        name: "delay",
        type: "number",
        description: "The duration from when the mouse enters a tooltip trigger until the tooltip opens.",
    },
]

export default function TooltipPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Tooltip</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger render={<Button variant="neutral" />}>
                            Hover
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add to library</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add tooltip" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"`} />
                <CodeBlock code={usageCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <h3 className="font-bold">Tooltip</h3>
                <PropsTable data={tooltipProps} />
            </div>
        </div>
    )
}
