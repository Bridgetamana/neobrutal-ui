"use client"

import * as React from "react"
import { Progress as BaseProgress } from "@base-ui/react/progress"

import { cn } from "@/lib/utils"

export type ProgressProps = React.ComponentPropsWithoutRef<typeof BaseProgress.Root> & {
    variant?: "default" | "destructive"
}

const Progress = React.forwardRef<
    React.ComponentRef<typeof BaseProgress.Root>,
    ProgressProps
>(({ className, value, variant = "default", ...props }, ref) => (
    <BaseProgress.Root
        ref={ref}
        value={value}
        className={cn(
            "relative h-4 w-full overflow-hidden rounded-full border-2 border-black bg-white",
            className
        )}
        {...props}
    >
        <BaseProgress.Track className="h-full w-full overflow-hidden">
            <BaseProgress.Indicator
                className={cn(
                    "h-full w-full flex-1 transition-transform motion-reduce:transition-none",
                    variant === "destructive" ? "bg-red-400" : "bg-main"
                )}
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            />
        </BaseProgress.Track>
    </BaseProgress.Root>
))
Progress.displayName = "Progress"

export { Progress }
