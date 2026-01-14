"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `<Popover>
  <PopoverTrigger render={<Button variant="neutral" />}>
    Open Popover
  </PopoverTrigger>
  <PopoverContent>
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-bold leading-none">Dimensions</h4>
        <p className="text-sm text-black">
          Set the dimensions for the layer.
        </p>
      </div>
    </div>
  </PopoverContent>
</Popover>`

const popoverProps = [
    {
        name: "open",
        type: "boolean",
        description: "The controlled open state of the popover.",
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
]

export default function PopoverPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Popover</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Displays rich content in a portal, triggered by a button.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <Popover>
                    <PopoverTrigger render={<Button variant="neutral" />}>
                        Open Popover
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-bold leading-none">Dimensions</h4>
                                <p className="text-sm text-black">
                                    Set the dimensions for the layer.
                                </p>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add popover" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"`} />
                <CodeBlock code={usageCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <h3 className="font-bold">Popover</h3>
                <PropsTable data={popoverProps} />
            </div>
        </div>
    )
}
