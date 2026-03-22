"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type PaginationProps = React.HTMLAttributes<HTMLDivElement>

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
    ({ className, onKeyDown, ...props }, ref) => {
        const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
            onKeyDown?.(event)
            if (event.defaultPrevented) return

            if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return

            const items = Array.from(
                event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)")
            )
            if (items.length === 0) return

            const activeElement = document.activeElement as HTMLElement | null
            const currentIndex = items.findIndex((item) => item === activeElement)

            let nextIndex = currentIndex
            if (event.key === "Home") {
                nextIndex = 0
            } else if (event.key === "End") {
                nextIndex = items.length - 1
            } else if (event.key === "ArrowRight") {
                nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % items.length
            } else if (event.key === "ArrowLeft") {
                nextIndex = currentIndex < 0 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length
            }

            items[nextIndex]?.focus()
            event.preventDefault()
        }

        return (
            <nav
                ref={ref}
                aria-label="Pagination"
                className={cn("flex items-center justify-center border-2 border-black rounded-base", className)}
                onKeyDown={handleKeyDown}
                {...props}
            />
        )
    }
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
                "inline-flex h-10 w-10 items-center justify-center text-sm font-bold transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:scale-[0.97] focus-brutal border-r-2 border-black last:border-r-0",
                isActive
                    ? "bg-main text-black"
                    : "bg-white text-black hover:bg-neutral-50",
                className
            )}
            aria-current={isActive ? "page" : undefined}
            {...props}
        />
    )
)
PaginationItem.displayName = "PaginationItem"

export { Pagination, PaginationItem }
