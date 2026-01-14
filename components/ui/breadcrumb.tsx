import * as React from "react"
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
                "font-bold text-black hover:text-main transition-colors underline decoration-2 underline-offset-2 hover:no-underline",
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

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator }
