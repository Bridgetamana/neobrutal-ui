"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { Search } from "lucide-react"

const loadCommandSearchDialog = () => import("./command-search-dialog")

const CommandSearchDialog = dynamic(
    () => loadCommandSearchDialog().then((mod) => mod.CommandSearchDialog),
    { ssr: false }
)

export function CommandSearch() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [open, setOpen] = useState(false)
    const triggerRef = useRef<HTMLButtonElement>(null)

    const preload = useCallback(() => {
        void loadCommandSearchDialog()
    }, [])

    const openSearch = useCallback(() => {
        preload()
        setIsLoaded(true)
        setOpen(true)
    }, [preload])

    const handleOpenChange = useCallback((nextOpen: boolean) => {
        setOpen(nextOpen)
        if (!nextOpen) {
            requestAnimationFrame(() => triggerRef.current?.focus())
        }
    }, [])

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                event.preventDefault()
                if (open) handleOpenChange(false)
                else openSearch()
            }
        }

        document.addEventListener("keydown", onKeyDown)
        return () => document.removeEventListener("keydown", onKeyDown)
    }, [handleOpenChange, open, openSearch])

    return (
        <>
            <button
                ref={triggerRef}
                id="command-search-trigger"
                type="button"
                aria-label="Search documentation"
                aria-expanded={open}
                aria-controls={isLoaded ? "command-search-dialog" : undefined}
                onClick={openSearch}
                onFocus={preload}
                onPointerEnter={preload}
                className="focus-brutal inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-base border-2 border-transparent px-2 text-sm md:w-48 md:justify-start md:border-black md:bg-white"
            >
                <Search aria-hidden="true" size={18} className="shrink-0 text-black/70" />
                <span className="hidden flex-1 text-left text-black/60 md:inline">Search…</span>
                <kbd className="hidden rounded border border-black/30 px-1.5 py-0.5 text-xs text-black/60 md:inline">
                    Ctrl&nbsp;K
                </kbd>
            </button>

            {isLoaded ? (
                <CommandSearchDialog open={open} onOpenChange={handleOpenChange} />
            ) : null}
        </>
    )
}
