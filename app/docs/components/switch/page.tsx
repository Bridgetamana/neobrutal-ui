"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `<div className="flex items-center gap-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`

const switchProps = [
    {
        name: "checked",
        type: "boolean",
        description: "The controlled checked state of the switch.",
    },
    {
        name: "defaultChecked",
        type: "boolean",
        description: "The default checked state when uncontrolled.",
    },
    {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        description: "Event handler called when the checked state changes.",
    },
    {
        name: "disabled",
        type: "boolean",
        description: "When true, prevents the user from interacting with the switch.",
    },
]

export default function SwitchPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Switch</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    A control that allows the user to toggle between checked and not checked.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <div className="flex items-center gap-2">
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Airplane Mode</Label>
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add switch" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"`} />
                <CodeBlock code={usageCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <PropsTable data={switchProps} />
            </div>
        </div>
    )
}
