import * as React from "react"
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
                "inline-flex h-10 w-10 items-center justify-center rounded-base border-2 border-black text-sm font-bold transition-all",
                isActive
                    ? "bg-main text-black shadow-brutal hover:translate-x-px hover:translate-y-px hover:shadow-none"
                    : "bg-white text-black hover:bg-neutral-100",
                className
            )}
            aria-current={isActive ? "page" : undefined}
            {...props}
        />
    )
)
PaginationItem.displayName = "PaginationItem"

export { Pagination, PaginationItem }
