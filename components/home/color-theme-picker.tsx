"use client"

import * as React from "react"
import { PaletteIcon } from "@phosphor-icons/react"
import { useTheme, type ColorTheme } from "@/components/theme-provider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function ColorSwatch({ color, className }: { color: string; className?: string }) {
    return (
        <div
            className={className}
            style={{ backgroundColor: color }}
        />
    )
}

function ColorThemePicker() {
    const { currentTheme, setTheme, themes } = useTheme()
    const [isOpen, setIsOpen] = React.useState(false)

    function onSelectTheme(theme: ColorTheme) {
        setTheme(theme)
        setIsOpen(false)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger
                    render={
                        <Button
                            size="icon"
                            aria-label="Change color theme"
                            className="h-14 w-14 rounded-full"
                        >
                            <PaletteIcon weight="bold" className="h-7 w-7" />
                        </Button>
                    }
                />
                <PopoverContent align="end" sideOffset={12} className="w-72">
                    <div className="space-y-3">
                        <div className="border-b-2 border-black pb-2">
                            <h3 className="text-sm font-bold uppercase tracking-wide">
                                Color Theme
                            </h3>
                            <p className="text-xs text-neutral-600">
                                Choose your accent color
                            </p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {themes.map((theme) => {
                                const isActive = currentTheme.name === theme.name
                                return (
                                    <button
                                        key={theme.name}
                                        onClick={() => onSelectTheme(theme)}
                                        aria-label={`Select ${theme.name} theme`}
                                        aria-pressed={isActive ? "true" : "false"}
                                        className={cn(
                                            "group relative flex flex-col items-center gap-1.5 rounded-base p-2 transition-all cursor-pointer",
                                            "hover:bg-neutral-100",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1"
                                        )}
                                    >
                                        <ColorSwatch
                                            color={theme.main}
                                            className={cn(
                                                "h-10 w-10 rounded-full border-2 border-black transition-all",
                                                isActive && "ring-2 ring-black ring-offset-2 shadow-brutal"
                                            )}
                                        />
                                        <span className="text-[10px] font-bold uppercase">
                                            {theme.name}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                        <div className="border-t-2 border-black pt-2">
                            <div className="flex items-center gap-2 text-xs">
                                <span className="font-medium text-neutral-600">Active:</span>
                                <div className="flex items-center gap-1.5">
                                    <ColorSwatch
                                        color={currentTheme.main}
                                        className="h-4 w-4 rounded-full border border-black"
                                    />
                                    <span className="font-bold">{currentTheme.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export { ColorThemePicker }
