"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `<RadioGroup defaultValue="comfortable">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>`

const radioGroupProps = [
    {
        name: "defaultValue",
        type: "string",
        description: "The value of the radio item that should be checked by default.",
    },
    {
        name: "value",
        type: "string",
        description: "The controlled value of the radio item to check.",
    },
    {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Event handler called when the value changes.",
    },
    {
        name: "disabled",
        type: "boolean",
        description: "When true, prevents the user from interacting with the radio group.",
    },
]

const radioGroupItemProps = [
    {
        name: "value",
        type: "string",
        description: "The value given as data for the radio item when submitted in a form.",
    },
    {
        name: "disabled",
        type: "boolean",
        description: "When true, prevents the user from interacting with the radio item.",
    },
    {
        name: "required",
        type: "boolean",
        description: "When true, indicates that the user must check the radio item before the owning form can be submitted.",
    },
]

export default function RadioGroupPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Radio Group</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A set of checkable buttons where only one can be selected at a time.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center gap-2">
                        <RadioGroupItem value="default" id="r1" />
                        <Label htmlFor="r1">Default</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <RadioGroupItem value="comfortable" id="r2" />
                        <Label htmlFor="r2">Comfortable</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <RadioGroupItem value="compact" id="r3" />
                        <Label htmlFor="r3">Compact</Label>
                    </div>
                </RadioGroup>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add radio-group" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"`} />
                <CodeBlock code={usageCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Examples</h2>

                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Disabled</h3>
                    <ComponentPreview code={`<RadioGroup defaultValue="option-1" disabled>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-1" id="d1" />
    <Label htmlFor="d1">Option 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-2" id="d2" />
    <Label htmlFor="d2">Option 2</Label>
  </div>
</RadioGroup>`}>
                        <RadioGroup defaultValue="option-1" disabled>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="option-1" id="d1" />
                                <Label htmlFor="d1">Option 1</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="option-2" id="d2" />
                                <Label htmlFor="d2">Option 2</Label>
                            </div>
                        </RadioGroup>
                    </ComponentPreview>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <h3 className="font-bold">RadioGroup</h3>
                <PropsTable data={radioGroupProps} />
                <h3 className="font-bold mt-4">RadioGroupItem</h3>
                <PropsTable data={radioGroupItemProps} />
            </div>
        </div>
    )
}
