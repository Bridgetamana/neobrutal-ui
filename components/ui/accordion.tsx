"use client"

import * as React from "react"
import { Accordion as BaseAccordion } from "@base-ui/react/accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = BaseAccordion.Root

const AccordionItem = ({ className, ref, ...props }: React.ComponentProps<typeof BaseAccordion.Item>) => (
    <BaseAccordion.Item
        ref={ref}
        className={cn(
            "mb-4 border-2 border-black bg-white shadow-brutal hover:bg-main/20 data-open:bg-main/20 data-open:shadow-brutal transition-colors duration-200 rounded-base",
            className
        )}
        {...props}
    />
)

const AccordionTrigger = ({ className, children, ref, ...props }: React.ComponentProps<typeof BaseAccordion.Trigger>) => (
    <BaseAccordion.Header className="flex">
        <BaseAccordion.Trigger
            ref={ref}
            className={cn(
                "flex flex-1 items-center text-left justify-between p-3 font-bold text-black hover:bg-main/20 focus-brutal transition-colors duration-200 [&[data-open]>svg]:rotate-180",
                className
            )}
            {...props}
        >
            {children}
            <ChevronDown strokeWidth={3} className="h-4 w-4 shrink-0 transition-transform duration-200 text-black" />
        </BaseAccordion.Trigger>
    </BaseAccordion.Header>
)

const AccordionContent = ({ className, children, ref, ...props }: React.ComponentProps<typeof BaseAccordion.Panel>) => (
    <BaseAccordion.Panel
        ref={ref}
        className="overflow-hidden text-sm h-(--accordion-panel-height) transition-[height] duration-200 motion-reduce:transition-none data-ending-style:h-0 data-starting-style:h-0 text-black"
        {...props}
    >
        <div className={cn("p-3 pt-0", className)}>{children}</div>
    </BaseAccordion.Panel>
)

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
