"use client"

import * as React from "react"
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import { CheckIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

type CheckboxProps = React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>

const Checkbox = React.forwardRef<
    React.ComponentRef<typeof BaseCheckbox.Root>,
    CheckboxProps
>(({ className, ...props }, ref) => (
    <BaseCheckbox.Root
        ref={ref}
        className={cn(
            "peer h-5 w-5 shrink-0 rounded-base border-2 border-black ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-main data-checked:text-black",
            className
        )}
        {...props}
    >
        <BaseCheckbox.Indicator
            className={cn("flex items-center justify-center text-current data-unchecked:hidden")}
        >
            <CheckIcon weight="bold" className="h-3.5 w-3.5" />
        </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
))
Checkbox.displayName = "Checkbox"

export { Checkbox }
