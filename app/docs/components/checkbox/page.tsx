"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `<Checkbox />`

const htmlCode = `<input type="checkbox" class="peer h-5 w-5 shrink-0 rounded-[5px] ring-2 border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white accent-[#b6ace4]" />`

const checkboxProps = [
    {
        name: "defaultChecked",
        type: "boolean",
        description: "The default checked state when uncontrolled.",
    },
    {
        name: "disabled",
        type: "boolean",
        description: "When true, prevents the user from interacting with the checkbox.",
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

            <ComponentPreview code={usageCode} htmlCode={htmlCode}>
                <Checkbox />
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
    <Checkbox id="unchecked-state" />
    <Label htmlFor="unchecked-state">Unchecked State</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="checked-state" defaultChecked />
    <Label htmlFor="checked-state">Checked State</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="disabled-state" disabled />
    <Label htmlFor="disabled-state">Disabled State</Label>
  </div>
</div>`}>
                        <div className="grid gap-4">
                            <div className="flex items-center gap-2">
                                <Checkbox id="unchecked-state" />
                                <Label htmlFor="unchecked-state">Unchecked State</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="checked-state" defaultChecked />
                                <Label htmlFor="checked-state">Checked State</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="disabled-state" disabled />
                                <Label htmlFor="disabled-state">Disabled State</Label>
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
