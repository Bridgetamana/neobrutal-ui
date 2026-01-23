"use client"

import * as React from "react"
import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import { cn } from "@/lib/utils"

const Tabs = BaseTabs.Root

type TabsListProps = React.ComponentPropsWithoutRef<typeof BaseTabs.List>

const TabsList = React.forwardRef<
    React.ComponentRef<typeof BaseTabs.List>,
    TabsListProps
>(({ className, ...props }, ref) => (
    <BaseTabs.List
        ref={ref}
        className={cn(
            "inline-flex items-center gap-1 rounded-base border-2 border-black bg-white p-1",
            className
        )}
        {...props}
    />
))
TabsList.displayName = "TabsList"

type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>

const TabsTrigger = React.forwardRef<
    React.ComponentRef<typeof BaseTabs.Tab>,
    TabsTriggerProps
>(({ className, ...props }, ref) => (
    <BaseTabs.Tab
        ref={ref}
        className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-base px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50 data-active:border-2 data-active:border-black data-active:bg-main data-active:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:hover:bg-main/50",
            className
        )}
        {...props}
    />
))
TabsTrigger.displayName = "TabsTrigger"

type TabsContentProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>

const TabsContent = React.forwardRef<
    React.ComponentRef<typeof BaseTabs.Panel>,
    TabsContentProps
>(({ className, ...props }, ref) => (
    <BaseTabs.Panel
        ref={ref}
        className={cn(
            "mt-4 rounded-base border-2 border-black bg-white p-4 shadow-brutal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white",
            className
        )}
        {...props}
    />
))
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
