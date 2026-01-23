"use client"

import * as React from "react"
import { Switch as BaseSwitch } from "@base-ui/react/switch"
import { cn } from "@/lib/utils"

type SwitchProps = React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>

const Switch = React.forwardRef<
    React.ComponentRef<typeof BaseSwitch.Root>,
    SwitchProps
>(({ className, ...props }, ref) => (
    <BaseSwitch.Root
        className={cn(
            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-main data-unchecked:bg-white",
            className
        )}
        {...props}
        ref={ref}
    >
        <BaseSwitch.Thumb className="pointer-events-none block h-4 w-4 rounded-full border-2 border-black bg-white ring-0 transition-transform data-checked:translate-x-5 data-checked:bg-black data-unchecked:translate-x-0.5" />
    </BaseSwitch.Root>
))
Switch.displayName = "Switch"

export { Switch }
