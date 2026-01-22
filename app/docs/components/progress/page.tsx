"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `<Progress value={33} />`

const withoutValueCode = `<Progress value={50} showValue={false} />`

const progressProps = [
    {
        name: "value",
        type: "number | null",
        description: "The progress value from 0 to 100.",
    },
    {
        name: "max",
        type: "number",
        description: "The maximum progress value. Defaults to 100.",
    },
    {
        name: "showValue",
        type: "boolean",
        description: "Whether to show the floating percentage badge. Defaults to true.",
    },
]

function AnimatedProgressDemo() {
    const [value, setValue] = React.useState(20)

    React.useEffect(() => {
        const interval = setInterval(() => {
            setValue((current) =>
                current >= 100 ? 0 : Math.min(100, Math.round(current + Math.random() * 15))
            )
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return <Progress value={value} className="w-[60%]" />
}

export default function ProgressPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Progress</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Displays an indicator showing the completion progress of a task, with a floating badge that shows the current percentage.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <AnimatedProgressDemo />
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
                <h2 className="text-xl font-bold">Examples</h2>

                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Without Value Badge</h3>
                    <ComponentPreview code={withoutValueCode}>
                        <Progress value={50} showValue={false} className="w-[60%]" />
                    </ComponentPreview>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <PropsTable data={progressProps} />
            </div>
        </div>
    )
}
