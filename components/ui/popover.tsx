"use client"

import * as React from "react"
import { Popover as BasePopover } from "@base-ui/react/popover"
import { cn } from "@/lib/utils"

const Popover = BasePopover.Root

const PopoverTrigger = BasePopover.Trigger

type PopoverContentProps = React.ComponentPropsWithoutRef<typeof BasePopover.Popup> & {
    align?: "start" | "center" | "end"
    sideOffset?: number
}

const PopoverContent = React.forwardRef<
    React.ComponentRef<typeof BasePopover.Popup>,
    PopoverContentProps
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <BasePopover.Portal>
        <BasePopover.Positioner sideOffset={sideOffset} align={align}>
            <BasePopover.Popup
                ref={ref}
                className={cn(
                    "z-50 w-72 rounded-base border-2 border-black bg-white p-4 text-black shadow-brutal outline-none transition-opacity motion-reduce:transition-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
                    className
                )}
                {...props}
            />
        </BasePopover.Positioner>
    </BasePopover.Portal>
))
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
