import * as React from "react"
import { cn } from "@/lib/utils"

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical"
    decorative?: boolean
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
    ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
        const sizeClass = orientation === "horizontal" ? "h-0.5 w-full" : "h-full w-0.5"
        if (decorative) {
            return (
                <div
                    ref={ref}
                    role="none"
                    className={cn("shrink-0 bg-black", sizeClass, className)}
                    {...props}
                />
            )
        }
        if (orientation === "vertical") {
            return (
                <div
                    ref={ref}
                    role="separator"
                    aria-orientation="vertical"
                    className={cn("shrink-0 bg-black h-full w-0.5", className)}
                    {...props}
                />
            )
        }
        return (
            <div
                ref={ref}
                role="separator"
                aria-orientation="horizontal"
                className={cn("shrink-0 bg-black h-0.5 w-full", className)}
                {...props}
            />
        )
    }
)
Separator.displayName = "Separator"

export { Separator }
