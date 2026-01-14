"use client"

import * as React from "react"
import { Radio } from "@base-ui/react/radio"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import { CircleIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

type RadioGroupProps = React.ComponentPropsWithoutRef<typeof BaseRadioGroup>

const RadioGroup = React.forwardRef<
    React.ComponentRef<typeof BaseRadioGroup>,
    RadioGroupProps
>(({ className, ...props }, ref) => (
    <BaseRadioGroup
        className={cn("grid gap-2", className)}
        {...props}
        ref={ref}
    />
))
RadioGroup.displayName = "RadioGroup"

type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof Radio.Root>

const RadioGroupItem = React.forwardRef<
    React.ComponentRef<typeof Radio.Root>,
    RadioGroupItemProps
>(({ className, ...props }, ref) => {
    return (
        <Radio.Root
            ref={ref}
            className={cn(
                "aspect-square h-5 w-5 rounded-full border-2 border-black text-black ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-main",
                className
            )}
            {...props}
        >
            <Radio.Indicator className="flex items-center justify-center data-unchecked:hidden">
                <CircleIcon weight="fill" className="h-2.5 w-2.5 fill-current text-current" />
            </Radio.Indicator>
        </Radio.Root>
    )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
