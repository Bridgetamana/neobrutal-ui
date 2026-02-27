import * as React from "react"
import { cn } from "@/lib/utils"

export type InputProps = React.ComponentProps<"input">

const Input = ({ className, type = "text", ref, ...props }: InputProps) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-base border-2 border-black bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black/60 focus-brutal disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
        />
    )
}

export { Input }
