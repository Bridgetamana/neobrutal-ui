"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>`

const selectProps = [
    {
        name: "value",
        type: "string",
        description: "The controlled value of the select.",
    },
    {
        name: "defaultValue",
        type: "string",
        description: "The default value of the select when uncontrolled.",
    },
    {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Event handler called when the value changes.",
    },
    {
        name: "open",
        type: "boolean",
        description: "The controlled open state of the select.",
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

export default function SelectPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Select</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Displays a list of options for the user to pick from—triggered by a button.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add select" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"`} />
                <CodeBlock code={usageCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <h3 className="font-bold">Select</h3>
                <PropsTable data={selectProps} />
            </div>
        </div>
    )
}
