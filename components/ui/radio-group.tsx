"use client"

import * as React from "react"
import { Radio } from "@base-ui/react/radio"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import { cn } from "@/lib/utils"

type RadioGroupProps = React.ComponentPropsWithoutRef<typeof BaseRadioGroup>

const RadioGroup = React.forwardRef<
    React.ComponentRef<typeof BaseRadioGroup>,
    RadioGroupProps
>(({ className, ...props }, ref) => (
    <BaseRadioGroup
        className={cn("grid gap-3", className)}
        {...props}
        ref={ref}
    />
))
RadioGroup.displayName = "RadioGroup"

type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof Radio.Root>

const RadioGroupItem = React.forwardRef<
    React.ComponentRef<typeof Radio.Root>,
    RadioGroupItemProps
>(({ className, ...props }, ref) => (
    <Radio.Root
        ref={ref}
        className={cn(
            "peer h-5 w-5 shrink-0 rounded-full border-2 border-black bg-white ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-main",
            className
        )}
        {...props}
    >
        <Radio.Indicator className="flex h-full w-full items-center justify-center data-unchecked:hidden">
            <span className="h-2 w-2 rounded-full bg-black" />
        </Radio.Indicator>
    </Radio.Root>
))
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
