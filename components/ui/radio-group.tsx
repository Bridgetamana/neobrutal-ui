"use client"

import * as React from "react"
import { Radio } from "@base-ui/react/radio"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import { cn } from "@/lib/utils"

type RadioGroupProps = React.ComponentProps<typeof BaseRadioGroup>

const RadioGroup = ({ className, ref, ...props }: RadioGroupProps) => (
    <BaseRadioGroup
        className={cn("grid gap-3", className)}
        {...props}
        ref={ref}
    />
)

type RadioGroupItemProps = React.ComponentProps<typeof Radio.Root>

const RadioGroupItem = ({ className, ref, ...props }: RadioGroupItemProps) => (
    <Radio.Root
        ref={ref}
        className={cn(
            "peer h-5 w-5 shrink-0 rounded-full border-2 border-black bg-white ring-offset-white focus-brutal disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-main",
            className
        )}
        {...props}
    >
        <Radio.Indicator className="flex h-full w-full items-center justify-center data-unchecked:hidden">
            <span className="h-2 w-2 rounded-full bg-black" />
        </Radio.Indicator>
    </Radio.Root>
)

export { RadioGroup, RadioGroupItem }
