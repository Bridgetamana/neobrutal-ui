"use client"

import { PaletteIcon } from "@phosphor-icons/react"
import { useTheme, type ColorTheme } from "@/components/theme-provider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

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
    const [isOpen, setIsOpen] = useState(false)

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
                            className="h-12 w-12 rounded-full hover:translate-x-0 hover:translate-y-0"
                        >
                            <PaletteIcon weight="bold" className="h-7 w-7" />
                        </Button>
                    }
                />
                <PopoverContent align="end" sideOffset={12} className="w-72">
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold">
                            Color Theme
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            {themes.map((theme) => {
                                const isActive = currentTheme.name === theme.name
                                return (
                                    <Button
                                        key={theme.name}
                                        variant="outline"
                                        onClick={() => onSelectTheme(theme)}
                                        aria-label={`Select ${theme.name} theme`}
                                        aria-pressed={isActive ? "true" : "false"}
                                        className="h-auto flex-col gap-1.5 p-2 hover:bg-transparent"
                                    >
                                        <ColorSwatch
                                            color={theme.main}
                                            className={cn(
                                                "h-8 w-8 rounded-full border-2",
                                                isActive && "ring-2 ring-black ring-offset-2 shadow-brutal"
                                            )}
                                        />
                                        <span className="text-xs font-bold">
                                            {theme.name}
                                        </span>
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export { ColorThemePicker }
