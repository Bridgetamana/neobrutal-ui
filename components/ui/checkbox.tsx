"use client"

import * as React from "react"
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type CheckboxProps = React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>

const Checkbox = React.forwardRef<
    React.ComponentRef<typeof BaseCheckbox.Root>,
    CheckboxProps
>(({ className, disabled, ...props }, ref) => (
    <BaseCheckbox.Root
        ref={ref}
        disabled={disabled}
        className={cn(
            "peer h-5 w-5 shrink-0 rounded-base border-2 border-black focus-brutal disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-main data-checked:text-black",
            className
        )}
        {...props}
    >
        <BaseCheckbox.Indicator
            className={cn("flex items-center justify-center text-current transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] data-starting-style:scale-50 data-starting-style:opacity-0 data-ending-style:scale-50 data-ending-style:opacity-0", disabled && "opacity-50")}
        >
            <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] [stroke-dasharray:50] [stroke-dashoffset:0] data-starting-style:[stroke-dashoffset:50] delay-100"
            >
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
))
Checkbox.displayName = "Checkbox"

export { Checkbox }
