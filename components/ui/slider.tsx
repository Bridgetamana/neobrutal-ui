"use client"

import * as React from "react"
import { Slider as BaseSlider } from "@base-ui/react/slider"
import { cn } from "@/lib/utils"

type SliderProps = React.ComponentPropsWithoutRef<typeof BaseSlider.Root>

const Slider = React.forwardRef<
    React.ComponentRef<typeof BaseSlider.Root>,
    SliderProps
>(({ className, ...props }, ref) => (
    <BaseSlider.Root
        ref={ref}
        className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
        )}
        {...props}
    >
        <BaseSlider.Control className="flex w-full touch-none items-center select-none">
            <BaseSlider.Track className="relative h-3 w-full grow overflow-hidden rounded-base border-2 border-black bg-white">
                <BaseSlider.Indicator className="h-full rounded-s-base bg-main" />
            </BaseSlider.Track>
            <BaseSlider.Thumb className="block h-6 w-6 rounded-full border-2 border-black bg-main ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50" />
        </BaseSlider.Control>
    </BaseSlider.Root>
))
Slider.displayName = "Slider"

export { Slider }
