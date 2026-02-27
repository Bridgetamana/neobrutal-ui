"use client"

import * as React from "react"
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type CheckboxProps = React.ComponentProps<typeof BaseCheckbox.Root>

const Checkbox = ({ className, disabled, ref, ...props }: CheckboxProps) => (
    <BaseCheckbox.Root
        ref={ref}
        disabled={disabled}
        className={cn(
            "peer h-5 w-5 shrink-0 rounded-base border-2 border-black ring-offset-white focus-brutal disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-main data-checked:text-black",
            className
        )}
        {...props}
    >
        <BaseCheckbox.Indicator
            className={cn("flex items-center justify-center text-current data-unchecked:hidden", disabled && "opacity-50")}
        >
            <Check strokeWidth={3} className="h-3.5 w-3.5" />
        </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
)

export { Checkbox }
