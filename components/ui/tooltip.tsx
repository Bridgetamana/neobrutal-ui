"use client"

import * as React from "react"
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"
import { cn } from "@/lib/utils"

const TooltipProvider = BaseTooltip.Provider

const Tooltip = BaseTooltip.Root

const TooltipTrigger = BaseTooltip.Trigger

type TooltipContentProps = React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup> & {
    sideOffset?: number
    side?: "top" | "bottom" | "left" | "right"
}

const TooltipContent = React.forwardRef<
    React.ComponentRef<typeof BaseTooltip.Popup>,
    TooltipContentProps
>(({ className, sideOffset = 8, side = "top", ...props }, ref) => (
    <BaseTooltip.Portal>
        <BaseTooltip.Positioner sideOffset={sideOffset} side={side}>
            <BaseTooltip.Popup
                ref={ref}
                className={cn(
                    "z-50 overflow-hidden rounded-base border-2 border-black bg-main px-3 py-1.5 text-sm font-medium text-black shadow-brutal transition-[transform,scale,opacity] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
                    className
                )}
                {...props}
            />
        </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
))
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
