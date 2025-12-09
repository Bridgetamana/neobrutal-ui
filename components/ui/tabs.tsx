"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tabsVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-bold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-border",
    {
        variants: {
            variant: {
                default: "bg-bw text-text border-border hover:bg-main hover:text-black",
                active: "bg-main text-black border-black shadow-brutal",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-11 px-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export type TabsProps = React.HTMLAttributes<HTMLDivElement>

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            role="tablist"
            className={cn("inline-flex gap-1 rounded-base border-2 border-border bg-bw p-1", className)}
            {...props}
        />
    )
)
Tabs.displayName = "Tabs"

export type TabsTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof tabsVariants> & {
        isActive?: boolean
    }

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
    ({ className, size, isActive, ...props }, ref) => (
        <button
            ref={ref}
            role="tab"
            className={cn(
                tabsVariants({
                    variant: isActive ? "active" : "default",
                    size,
                    className,
                })
            )}
            {...props}
        />
    )
)
TabsTrigger.displayName = "TabsTrigger"

export type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & {
    isActive?: boolean
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
    ({ className, isActive, ...props }, ref) => (
        <div
            ref={ref}
            role="tabpanel"
            className={cn("hidden", isActive && "block", className)}
            {...props}
        />
    )
)
TabsContent.displayName = "TabsContent"

export { Tabs, TabsTrigger, TabsContent, tabsVariants }
