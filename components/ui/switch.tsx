"use client"

import * as React from "react"
import { Switch as BaseSwitch } from "@base-ui/react/switch"
import { cn } from "@/lib/utils"

type SwitchRootProps = React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>

type SwitchA11yProps =
    | { "aria-label": string; "aria-labelledby"?: string; id?: string }
    | { "aria-labelledby": string; "aria-label"?: string; id?: string }
    | { id: string; "aria-label"?: string; "aria-labelledby"?: string }

type SwitchProps = Omit<SwitchRootProps, "aria-label" | "aria-labelledby" | "id"> & SwitchA11yProps

const Switch = React.forwardRef<
    React.ComponentRef<typeof BaseSwitch.Root>,
    SwitchProps
>(({ className, ...props }, ref) => (
    <BaseSwitch.Root
        className={cn(
            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-black transition-colors focus-brutal disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-main data-unchecked:bg-white",
            className
        )}
        {...props}
        ref={ref}
    >
        <BaseSwitch.Thumb className="pointer-events-none block h-4 w-4 rounded-full border-2 border-black bg-white ring-0 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] data-checked:translate-x-5 data-checked:bg-black data-unchecked:translate-x-0.5" />
    </BaseSwitch.Root>
))
Switch.displayName = "Switch"

export { Switch }
