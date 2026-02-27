"use client"

import * as React from "react"
import { Select as BaseSelect } from "@base-ui/react/select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = BaseSelect.Root

const SelectGroup = BaseSelect.Group

type SelectValueProps = React.ComponentProps<typeof BaseSelect.Value> & {
    placeholder?: string
}

const SelectValue = ({ placeholder, ref, ...props }: SelectValueProps) => (
    <BaseSelect.Value ref={ref} {...props}>
        {(value) => value ?? placeholder}
    </BaseSelect.Value>
)

type SelectTriggerProps = React.ComponentProps<typeof BaseSelect.Trigger>

const SelectTrigger = ({ className, children, ref, ...props }: SelectTriggerProps) => (
    <BaseSelect.Trigger
        ref={ref}
        className={cn(
            "flex h-10 w-full items-center justify-between rounded-base border-2 border-black bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-black focus-brutal disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
            className
        )}
        {...props}
    >
        {children}
        <BaseSelect.Icon>
            <ChevronDown
                aria-hidden="true"
                strokeWidth={2.5}
                className="h-4 w-4 opacity-50"
            />
        </BaseSelect.Icon>

    </BaseSelect.Trigger>
)

type SelectScrollUpButtonProps = React.ComponentProps<typeof BaseSelect.ScrollUpArrow>

const SelectScrollUpButton = ({ className, ref, ...props }: SelectScrollUpButtonProps) => (
    <BaseSelect.ScrollUpArrow
        ref={ref}
        className={cn(
            "flex cursor-default items-center justify-center py-1",
            className
        )}
        {...props}
    >
        <ChevronUp aria-hidden="true" strokeWidth={2.5} className="h-4 w-4" />

    </BaseSelect.ScrollUpArrow>
)

type SelectScrollDownButtonProps = React.ComponentProps<typeof BaseSelect.ScrollDownArrow>

const SelectScrollDownButton = ({ className, ref, ...props }: SelectScrollDownButtonProps) => (
    <BaseSelect.ScrollDownArrow
        ref={ref}
        className={cn(
            "flex cursor-default items-center justify-center py-1",
            className
        )}
        {...props}
    >
        <ChevronDown aria-hidden="true" strokeWidth={2.5} className="h-4 w-4" />
    </BaseSelect.ScrollDownArrow>
)

type SelectContentProps = React.ComponentProps<typeof BaseSelect.Popup>

const SelectContent = ({ className, children, ref, ...props }: SelectContentProps) => (
    <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={4} alignItemWithTrigger={false}>
            <BaseSelect.Popup
                ref={ref}
                className={cn(
                    "relative z-50 max-h-96 min-w-(--anchor-width) overflow-hidden rounded-base border-2 border-black bg-white text-black shadow-brutal motion-reduce:transition-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
                    className
                )}
                {...props}
            >
                <SelectScrollUpButton />
                <BaseSelect.List className="p-1">
                    {children}
                </BaseSelect.List>
                <SelectScrollDownButton />
            </BaseSelect.Popup>
        </BaseSelect.Positioner>
    </BaseSelect.Portal>
)

type SelectLabelProps = React.ComponentProps<typeof BaseSelect.GroupLabel>

const SelectLabel = ({ className, ref, ...props }: SelectLabelProps) => (
    <BaseSelect.GroupLabel
        ref={ref}
        className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold text-black", className)}
        {...props}
    />
)

type SelectItemProps = React.ComponentProps<typeof BaseSelect.Item>

const SelectItem = ({ className, children, ref, ...props }: SelectItemProps) => (
    <BaseSelect.Item
        ref={ref}
        className={cn(
            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm font-bold outline-none data-highlighted:bg-main data-highlighted:text-black data-disabled:pointer-events-none data-disabled:opacity-50 text-black",
            className
        )}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <BaseSelect.ItemIndicator>
                <Check aria-hidden="true" strokeWidth={2.5} className="h-4 w-4" />
            </BaseSelect.ItemIndicator>
        </span>

        <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
)

type SelectSeparatorProps = React.ComponentProps<typeof BaseSelect.Separator>

const SelectSeparator = ({ className, ref, ...props }: SelectSeparatorProps) => (
    <BaseSelect.Separator
        ref={ref}
        className={cn("-mx-1 my-1 h-px bg-black", className)}
        {...props}
    />
)

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
}
