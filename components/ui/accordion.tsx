"use client"

import * as React from "react"
import { Accordion as BaseAccordion } from "@base-ui/react/accordion"
import { CaretDownIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

const Accordion = BaseAccordion.Root

type AccordionItemProps = React.ComponentPropsWithoutRef<typeof BaseAccordion.Item>

const AccordionItem = React.forwardRef<
    React.ComponentRef<typeof BaseAccordion.Item>,
    AccordionItemProps
>(({ className, ...props }, ref) => (
    <BaseAccordion.Item
        ref={ref}
        className={cn(
            "mb-4 border-2 border-black bg-bw data-panel-open:bg-main/30 data-panel-open:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
            className
        )}
        {...props}
    />
))
AccordionItem.displayName = "AccordionItem"

type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof BaseAccordion.Trigger>

const AccordionTrigger = React.forwardRef<
    React.ComponentRef<typeof BaseAccordion.Trigger>,
    AccordionTriggerProps
>(({ className, children, ...props }, ref) => (
    <BaseAccordion.Header className="flex">
        <BaseAccordion.Trigger
            ref={ref}
            className={cn(
                "flex flex-1 items-center text-left justify-between p-3 font-medium [&[data-panel-open]>svg]:rotate-180 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset",
                className
            )}
            {...props}
        >
            {children}
            <CaretDownIcon
                aria-hidden="true"
                className="h-4 w-4 shrink-0 transition-transform duration-200"
                />

        </BaseAccordion.Trigger>
    </BaseAccordion.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"

type AccordionContentProps = React.ComponentPropsWithoutRef<typeof BaseAccordion.Panel>

const AccordionContent = React.forwardRef<
    React.ComponentRef<typeof BaseAccordion.Panel>,
    AccordionContentProps
>(({ className, children, ...props }, ref) => (
    <BaseAccordion.Panel
        ref={ref}
        className="overflow-hidden text-sm h-(--accordion-panel-height) transition-[height] duration-200 motion-reduce:transition-none data-ending-style:h-0 data-starting-style:h-0"
        {...props}
    >
        <div className={cn("p-3 pt-0 border-black", className)}>{children}</div>
    </BaseAccordion.Panel>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
