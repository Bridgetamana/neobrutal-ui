"use client"

import { Slider } from "@/components/ui/slider"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"

const usageCode = `<Slider defaultValue={[50]} max={100} step={1} />`

const sliderProps = [
    {
        name: "defaultValue",
        type: "number[]",
        description: "The default value of the slider when uncontrolled.",
    },
    {
        name: "value",
        type: "number[]",
        description: "The controlled value of the slider.",
    },
    {
        name: "onValueChange",
        type: "(value: number[]) => void",
        description: "Event handler called when the value changes.",
    },
    {
        name: "min",
        type: "number",
        description: "The minimum value of the slider.",
    },
    {
        name: "max",
        type: "number",
        description: "The maximum value of the slider.",
    },
    {
        name: "step",
        type: "number",
        description: "The step value of the slider.",
    },
]

export default function SliderPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Slider</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    An input where the user selects a value from within a given range.
                </p>
            </section>

            <ComponentPreview code={usageCode}>
                <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Installation</h2>
                <CodeBlock code="npx neobrutal add slider" language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Usage</h2>
                <CodeBlock code={`import { Slider } from "@/components/ui/slider"`} />
                <CodeBlock code={usageCode} />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Props</h2>
                <PropsTable data={sliderProps} />
            </div>
        </div>
    )
}
