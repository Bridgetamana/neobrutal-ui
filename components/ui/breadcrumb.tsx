import * as React from "react"
import { cn } from "@/lib/utils"

export type BreadcrumbProps = React.HTMLAttributes<HTMLDivElement>

const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
    ({ className, ...props }, ref) => (
        <nav
            ref={ref}
            aria-label="Breadcrumb"
            className={cn("flex items-center gap-1 text-sm", className)}
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
            className={cn("flex items-center", className)}
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
                "inline-flex items-center px-3 py-1 font-bold text-black bg-white border-2 border-black shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all duration-200 rounded-base",
                className
            )}
            {...props}
        />
    )
)
BreadcrumbLink.displayName = "BreadcrumbLink"

export type BreadcrumbSeparatorProps = React.HTMLAttributes<HTMLSpanElement>

const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
    ({ className, children = ">", ...props }, ref) => (
        <span
            ref={ref}
            className={cn("inline-flex items-center justify-center w-6 h-6 font-bold text-black bg-main border-2 border-black shadow-brutal rounded-base mx-1", className)}
            {...props}
        >
            {children}
        </span>
    )
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

export type BreadcrumbPageProps = React.HTMLAttributes<HTMLSpanElement>

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
    ({ className, ...props }, ref) => (
        <span
            ref={ref}
            className={cn(
                "inline-flex items-center px-3 py-1 font-bold text-black bg-main border-2 border-black shadow-brutal rounded-base",
                className
            )}
            {...props}
        />
    )
)
BreadcrumbPage.displayName = "BreadcrumbPage"

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage }
