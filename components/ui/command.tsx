"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type CommandProps = React.HTMLAttributes<HTMLDivElement>

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "flex h-full w-full flex-col overflow-hidden rounded-base border-2 border-border bg-bw",
                className
            )}
            {...props}
        />
    )
)
Command.displayName = "Command"

export type CommandInputProps = React.InputHTMLAttributes<HTMLInputElement>

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
    ({ className, ...props }, ref) => (
        <input
            ref={ref}
            type="text"
            placeholder="Search..."
            className={cn(
                "w-full border-b-2 border-border bg-bw px-4 py-3 text-sm font-bold outline-none placeholder:text-neutral-400 focus:bg-main focus:text-black",
                className
            )}
            {...props}
        />
    )
)
CommandInput.displayName = "CommandInput"

export type CommandListProps = React.HTMLAttributes<HTMLDivElement>

const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("max-h-[300px] overflow-y-auto", className)}
            {...props}
        />
    )
)
CommandList.displayName = "CommandList"

export type CommandItemProps = React.HTMLAttributes<HTMLDivElement> & {
    isSelected?: boolean
}

const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
    ({ className, isSelected, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "cursor-pointer px-4 py-2 text-sm font-bold transition-colors",
                isSelected ? "bg-main text-black" : "hover:bg-neutral-100"
            )}
            {...props}
        />
    )
)
CommandItem.displayName = "CommandItem"

export { Command, CommandInput, CommandList, CommandItem }
