"use client"

import { Progress } from "@/components/ui/progress"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `<Progress value={33} />`

const progressProps = [
    {
        name: "value",
        type: "number",
        description: "The progress value.",
    },
    {
        name: "max",
        type: "number",
        description: "The maximum progress value.",
    },
]

export default function ProgressPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Progress</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <Progress value={33} className="w-[60%]" />
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add progress" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { Progress } from "@/components/ui/progress"`} />
                <CodeBlock code={usageCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <PropsTable data={progressProps} />
            </div>
        </div>
    )
}
