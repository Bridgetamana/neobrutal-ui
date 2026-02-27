"use client"

import * as React from "react"
import { Progress as BaseProgress } from "@base-ui/react/progress"

import { cn } from "@/lib/utils"

type ProgressProps = React.ComponentProps<typeof BaseProgress.Root> & {
    showValue?: boolean
}

const Progress = ({ className, value, showValue = true, ref, ...props }: ProgressProps) => {
    const percentage = value ?? 0

    return (
        <BaseProgress.Root
            ref={ref}
            value={value}
            className={cn("relative w-full pt-10", className)}
            {...props}
        >
            {showValue && (
                <div
                    className="absolute top-0 -translate-x-1/2 transition-all duration-300 motion-reduce:transition-none"
                    style={{ left: `${percentage}%` }}
                >
                    <span className="relative inline-flex items-center rounded-base border-2 border-black bg-white px-2 py-0.5 text-xs font-medium text-black">
                        {percentage}%
                        <svg
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path d="M5 8L0 0H10L5 8Z" className="fill-black" />
                            <path
                                d="M0 0L5 8L10 0"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </div>
            )}
            <BaseProgress.Track className="relative h-3 w-full overflow-hidden rounded-base border-2 border-black bg-white">
                <BaseProgress.Indicator className="h-full bg-main transition-all duration-300 motion-reduce:transition-none" />
            </BaseProgress.Track>
        </BaseProgress.Root>
    )
}

const ProgressLabel = ({ className, ref, ...props }: React.ComponentProps<typeof BaseProgress.Label>) => (
    <BaseProgress.Label
        ref={ref}
        className={cn("text-sm font-bold text-black", className)}
        {...props}
    />
)

export { Progress, ProgressLabel }
