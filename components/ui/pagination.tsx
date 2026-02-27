import * as React from "react"
import { cn } from "@/lib/utils"

export type PaginationProps = React.ComponentProps<"nav">

const Pagination = ({ className, ref, ...props }: PaginationProps) => (
    <nav
        ref={ref}
        aria-label="Pagination"
        className={cn("flex items-center justify-center border-2 border-black rounded-base", className)}
        {...props}
    />
)

export type PaginationItemProps = React.ComponentProps<"button"> & {
    isActive?: boolean
}

const PaginationItem = ({ className, isActive, ref, ...props }: PaginationItemProps) => (
    <button
        ref={ref}
        className={cn(
            "inline-flex h-10 w-10 items-center justify-center text-sm font-bold transition-all border-r-2 border-black last:border-r-0",
            isActive
                ? "bg-main text-black"
                : "bg-white text-black hover:bg-neutral-50",
            className
        )}
        aria-current={isActive ? "page" : undefined}
        {...props}
    />
)

export { Pagination, PaginationItem }
