"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`

const checkboxProps = [
    {
        name: "checked",
        type: "boolean | 'indeterminate'",
        description: "The controlled checked state of the checkbox.",
    },
    {
        name: "defaultChecked",
        type: "boolean",
        description: "The default checked state when uncontrolled.",
    },
    {
        name: "onCheckedChange",
        type: "(checked: boolean | 'indeterminate') => void",
        description: "Event handler called when the checked state changes.",
    },
    {
        name: "disabled",
        type: "boolean",
        description: "When true, prevents the user from interacting with the checkbox.",
    },
    {
        name: "required",
        type: "boolean",
        description: "When true, indicates that the user must check the checkbox before the owning form can be submitted.",
    },
    {
        name: "name",
        type: "string",
        description: "The name of the checkbox. Submitted with its owning form as part of a name/value pair.",
    },
    {
        name: "value",
        type: "string",
        description: "The value given as data for the checkbox when submitted in a form.",
    },
]

export default function CheckboxPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Checkbox</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A customizable checkbox input with bold styling and accessible controls.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <div className="flex items-center gap-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add checkbox" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"`} />
                <CodeBlock code={`<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`} />
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold">Examples</h2>

                <div className="space-y-4">
                    <h3 className="font-bold">States</h3>
                    <ComponentPreview code={`<div className="grid gap-4">
  <div className="flex items-center gap-2">
    <Checkbox id="cb1" />
    <Label htmlFor="cb1">Unchecked</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="cb2" defaultChecked />
    <Label htmlFor="cb2">Checked</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="cb3" disabled />
    <Label htmlFor="cb3">Disabled</Label>
  </div>
</div>`}>
                        <div className="grid gap-4">
                            <div className="flex items-center gap-2">
                                <Checkbox id="cb1" />
                                <Label htmlFor="cb1">Unchecked</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="cb2" defaultChecked />
                                <Label htmlFor="cb2">Checked</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="cb3" disabled />
                                <Label htmlFor="cb3">Disabled</Label>
                            </div>
                        </div>
                    </ComponentPreview>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <PropsTable data={checkboxProps} />
            </div>
        </div>
    )
}
