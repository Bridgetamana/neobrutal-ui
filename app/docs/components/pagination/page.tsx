"use client"

import { Pagination, PaginationItem } from "@/components/ui/pagination"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const paginationCode = `import * as React from "react"
import { cn } from "@/lib/utils"

export type PaginationProps = React.HTMLAttributes<HTMLDivElement>

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
    ({ className, ...props }, ref) => (
        <nav
            ref={ref}
            aria-label="Pagination"
            className={cn("flex items-center justify-center gap-1", className)}
            {...props}
        />
    )
)
Pagination.displayName = "Pagination"

export type PaginationItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isActive?: boolean
}

const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
    ({ className, isActive, ...props }, ref) => (
        <button
            ref={ref}
            className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-base border-2 border-border text-sm font-bold transition-all",
                isActive
                    ? "bg-main text-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                    : "bg-bw text-text hover:bg-neutral-100"
            )}
            aria-current={isActive ? "page" : undefined}
            {...props}
        />
    )
)
PaginationItem.displayName = "PaginationItem"

export { Pagination, PaginationItem }`

export default function PaginationPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black md:text-4xl text-black">Pagination</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Provide navigation for large datasets. Use numbered pages with previous/next controls.
                </p>
            </section>

            <ComponentPreview code={paginationCode}>
                <Pagination>
                    <PaginationItem>Prev</PaginationItem>
                    <PaginationItem>1</PaginationItem>
                    <PaginationItem isActive>2</PaginationItem>
                    <PaginationItem>3</PaginationItem>
                    <PaginationItem>Next</PaginationItem>
                </Pagination>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-black">Installation</h2>
                <CodeBlock code={`No dependencies required.`} language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-black">Accessibility</h2>
                <ul className="space-y-2 list-disc list-inside font-bold">
                    <li>Uses <code className="bg-neutral-200 px-2 py-1 rounded">aria-current=&quot;page&quot;</code> for active item</li>
                    <li>Uses <code className="bg-neutral-200 px-2 py-1 rounded">role=&quot;button&quot;</code> for items</li>
                    <li>Semantic HTML structure with list markup</li>
                    <li>Clear focus states for keyboard navigation</li>
                </ul>
            </div>
        </div>
    )
}
