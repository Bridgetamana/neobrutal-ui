"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const labelVariants = cva(
    "text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black"
)

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> &
    VariantProps<typeof labelVariants>

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, ...props }, ref) => (
        <label
            ref={ref}
            className={cn(labelVariants(), className)}
            {...props}
        />
    )
)
Label.displayName = "Label"

export { Label }
