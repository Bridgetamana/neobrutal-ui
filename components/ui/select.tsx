"use client"

import * as React from "react"
import { Select as BaseSelect } from "@base-ui/react/select"
import { CheckIcon, CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const Select = BaseSelect.Root

const SelectGroup = BaseSelect.Group

type SelectValueProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Value> & {
    placeholder?: string
}

const SelectValue = React.forwardRef<
    React.ComponentRef<typeof BaseSelect.Value>,
    SelectValueProps
>(({ placeholder, ...props }, ref) => (
    <BaseSelect.Value ref={ref} {...props}>
        {(value) => value ?? placeholder}
    </BaseSelect.Value>
))
SelectValue.displayName = "SelectValue"

type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger>

const SelectTrigger = React.forwardRef<
    React.ComponentRef<typeof BaseSelect.Trigger>,
    SelectTriggerProps
>(({ className, children, ...props }, ref) => (
    <BaseSelect.Trigger
        ref={ref}
        className={cn(
            "flex h-10 w-full items-center justify-between rounded-base border-2 border-black bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
            className
        )}
        {...props}
    >
        {children}
        <BaseSelect.Icon>
            <CaretDownIcon
                aria-hidden="true"
                className="h-4 w-4 opacity-50"
            />
        </BaseSelect.Icon>

    </BaseSelect.Trigger>
))
SelectTrigger.displayName = "SelectTrigger"

type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<typeof BaseSelect.ScrollUpArrow>

const SelectScrollUpButton = React.forwardRef<
    React.ComponentRef<typeof BaseSelect.ScrollUpArrow>,
    SelectScrollUpButtonProps
>(({ className, ...props }, ref) => (
    <BaseSelect.ScrollUpArrow
        ref={ref}
        className={cn(
            "flex cursor-default items-center justify-center py-1",
            className
        )}
        {...props}
    >
        <CaretUpIcon aria-hidden="true" className="h-4 w-4" />

    </BaseSelect.ScrollUpArrow>
))
SelectScrollUpButton.displayName = "SelectScrollUpButton"

type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<typeof BaseSelect.ScrollDownArrow>

const SelectScrollDownButton = React.forwardRef<
    React.ComponentRef<typeof BaseSelect.ScrollDownArrow>,
    SelectScrollDownButtonProps
>(({ className, ...props }, ref) => (
    <BaseSelect.ScrollDownArrow
        ref={ref}
        className={cn(
            "flex cursor-default items-center justify-center py-1",
            className
        )}
        {...props}
    >
        <CaretDownIcon aria-hidden="true" className="h-4 w-4" />
    </BaseSelect.ScrollDownArrow>
))
SelectScrollDownButton.displayName = "SelectScrollDownButton"

type SelectContentProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Popup>

const SelectContent = React.forwardRef<
    React.ComponentRef<typeof BaseSelect.Popup>,
    SelectContentProps
>(({ className, children, ...props }, ref) => (
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
))
SelectContent.displayName = "SelectContent"

type SelectLabelProps = React.ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>

const SelectLabel = React.forwardRef<
    React.ComponentRef<typeof BaseSelect.GroupLabel>,
    SelectLabelProps
>(({ className, ...props }, ref) => (
    <BaseSelect.GroupLabel
        ref={ref}
        className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
        {...props}
    />
))
SelectLabel.displayName = "SelectLabel"

type SelectItemProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Item>

const SelectItem = React.forwardRef<
    React.ComponentRef<typeof BaseSelect.Item>,
    SelectItemProps
>(({ className, children, ...props }, ref) => (
    <BaseSelect.Item
        ref={ref}
        className={cn(
            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm font-bold outline-none data-highlighted:bg-main data-highlighted:text-black data-disabled:pointer-events-none data-disabled:opacity-50",
            className
        )}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <BaseSelect.ItemIndicator>
                <CheckIcon aria-hidden="true" className="h-4 w-4" />
            </BaseSelect.ItemIndicator>
        </span>

        <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
))
SelectItem.displayName = "SelectItem"

type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Separator>

const SelectSeparator = React.forwardRef<
    React.ComponentRef<typeof BaseSelect.Separator>,
    SelectSeparatorProps
>(({ className, ...props }, ref) => (
    <BaseSelect.Separator
        ref={ref}
        className={cn("-mx-1 my-1 h-px bg-black", className)}
        {...props}
    />
))
SelectSeparator.displayName = "SelectSeparator"

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
