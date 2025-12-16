"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"

const breadcrumbCode = `import * as React from "react"
import { cn } from "@/lib/utils"

export type BreadcrumbProps = React.HTMLAttributes<HTMLDivElement>

const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
    ({ className, ...props }, ref) => (
        <nav
            ref={ref}
            aria-label="Breadcrumb"
            className={cn("flex items-center gap-2 text-sm", className)}
            {...props}
        />
    )
)
Breadcrumb.displayName = "Breadcrumb"

export type BreadcrumbItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
    isActive?: boolean
}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
    ({ className, isActive, ...props }, ref) => (
        <li
            ref={ref}
            className={cn("flex items-center gap-2", className)}
            aria-current={isActive ? "page" : undefined}
            {...props}
        />
    )
)
BreadcrumbItem.displayName = "BreadcrumbItem"

export type BreadcrumbLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
    ({ className, ...props }, ref) => (
        <a
            ref={ref}
            className={cn(
                "font-bold text-text hover:text-main transition-colors underline decoration-2 underline-offset-2 hover:no-underline",
                className
            )}
            {...props}
        />
    )
)
BreadcrumbLink.displayName = "BreadcrumbLink"

export type BreadcrumbSeparatorProps = React.HTMLAttributes<HTMLSpanElement>

const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
    ({ className, children = "/", ...props }, ref) => (
        <span
            ref={ref}
            className={cn("font-bold text-neutral-400", className)}
            {...props}
        >
            {children}
        </span>
    )
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator }`

export default function BreadcrumbPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-black md:text-4xl text-black">Breadcrumb</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Display navigation breadcrumbs to show users where they are in the page hierarchy.
                </p>
            </section>

            <ComponentPreview code={breadcrumbCode}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Docs</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem isActive>
                        Components
                    </BreadcrumbItem>
                </Breadcrumb>
            </ComponentPreview>

            <div className="space-y-4">
                <h2 className="text-2xl font-black">Installation</h2>
                <CodeBlock code={`No dependencies required.`} language="bash" />
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-black">Accessibility</h2>
                <ul className="space-y-2 list-disc list-inside font-bold">
                    <li>Uses <code className="bg-neutral-200 px-2 py-1 rounded">nav</code> element with aria-label</li>
                    <li>Uses <code className="bg-neutral-200 px-2 py-1 rounded">aria-current=&quot;page&quot;</code> for current page</li>
                    <li>Semantic list structure</li>
                    <li>Clear link semantics</li>
                </ul>
            </div>
        </div>
    )
}
