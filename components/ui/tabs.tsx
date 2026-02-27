"use client"

import * as React from "react"
import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import { cn } from "@/lib/utils"

const Tabs = BaseTabs.Root

type TabsListProps = React.ComponentProps<typeof BaseTabs.List>

const TabsList = ({ className, ref, ...props }: TabsListProps) => (
    <BaseTabs.List
        ref={ref}
        className={cn(
            "inline-flex items-center gap-1 rounded-base border-2 border-black bg-white p-1",
            className
        )}
        {...props}
    />
)

type TabsTriggerProps = React.ComponentProps<typeof BaseTabs.Tab>

const TabsTrigger = ({ className, ref, ...props }: TabsTriggerProps) => (
    <BaseTabs.Tab
        ref={ref}
        className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-base px-4 py-2 text-sm font-bold transition-colors focus-brutal disabled:pointer-events-none disabled:opacity-50 data-active:border-2 data-active:border-black data-active:bg-main data-active:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:hover:bg-main/50 text-black",
            className
        )}
        {...props}
    />
)

type TabsContentProps = React.ComponentProps<typeof BaseTabs.Panel>

const TabsContent = ({ className, ref, ...props }: TabsContentProps) => (
    <BaseTabs.Panel
        ref={ref}
        className={cn(
            "mt-4 rounded-base border-2 border-black bg-white p-4 shadow-brutal focus-brutal text-black",
            className
        )}
        {...props}
    />
)

export { Tabs, TabsList, TabsTrigger, TabsContent }
