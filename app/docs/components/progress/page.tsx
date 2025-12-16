"use client"

import { Progress } from "@/components/ui/progress"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const progressCode = `import * as React from "react"
import { cn } from "@/lib/utils"

export type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
    value?: number
    max?: number
    variant?: "default" | "destructive"
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
    ({ className, value = 0, max = 100, variant = "default", ...props }, ref) => {
        const percentage = (value / max) * 100

        return (
            <div
                ref={ref}
                className={cn(
                    "relative h-4 w-full overflow-hidden rounded-full border-2 border-black bg-white",
                    className
                )}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
                {...props}
            >
                <div
                    className={cn(
                        "h-full transition-all",
                        variant === "destructive" ? "bg-red-400" : "bg-main"
                    )}
                    style={{ width: \`\${percentage}%\` }}
                />
            </div>
        )
    }
)
Progress.displayName = "Progress"

export { Progress }`

export default function ProgressPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black md:text-4xl text-black">Progress</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Show progress of file uploads, loading states, or task completion with visual indicators.
                </p>
            </section>

            <ComponentPreview code={progressCode}>
                <div className="w-full space-y-4">
                    <Progress value={33} max={100} />
                    <Progress value={66} max={100} variant="destructive" />
                </div>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-black">Installation</h2>
                <CodeBlock code={`No dependencies required.`} language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-black">Accessibility</h2>
                <ul className="space-y-2 list-disc list-inside font-bold">
                    <li>Uses <code className="bg-neutral-200 px-2 py-1 rounded">role=&quot;progressbar&quot;</code></li>
                    <li>Supports <code className="bg-neutral-200 px-2 py-1 rounded">aria-valuenow</code>, <code className="bg-neutral-200 px-2 py-1 rounded">aria-valuemin</code>, <code className="bg-neutral-200 px-2 py-1 rounded">aria-valuemax</code></li>
                    <li>Screen reader friendly</li>
                    <li>Color contrast compliant</li>
                </ul>
            </div>
        </div>
    )
}
