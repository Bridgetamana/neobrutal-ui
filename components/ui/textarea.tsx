import * as React from "react"
import { cn } from "@/lib/utils"

export type TextareaProps = React.ComponentProps<"textarea">

const Textarea = ({ className, ref, ...props }: TextareaProps) => {
    return (
        <textarea
            className={cn(
                "flex min-h-20 w-full rounded-base border-2 border-black bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-black/60 focus-brutal disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
        />
    )
}

export { Textarea }
