"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog } from "@base-ui/react"
import { Command } from "cmdk"
import { Search, X } from "lucide-react"
import type { SearchItem } from "@/lib/search-data"

const RESULT_LIMIT = 24
const SEARCH_DEBOUNCE_MS = 120

interface SearchResponse {
    items: SearchItem[]
}

interface CommandSearchDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CommandSearchDialog({ open, onOpenChange }: CommandSearchDialogProps) {
    const [query, setQuery] = useState("")
    const [items, setItems] = useState<SearchItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const resetSearch = useCallback(() => {
        setQuery("")
        setItems([])
        setIsLoading(false)
    }, [])

    const handleOpenChange = useCallback((nextOpen: boolean) => {
        onOpenChange(nextOpen)
        if (!nextOpen) resetSearch()
    }, [onOpenChange, resetSearch])

    useEffect(() => {
        if (!open) return

        const controller = new AbortController()
        const trimmedQuery = query.trim()
        const timeout = window.setTimeout(async () => {
            const params = new URLSearchParams({ limit: RESULT_LIMIT.toString() })
            if (trimmedQuery.length > 0) params.set("q", trimmedQuery)

            setIsLoading(true)
            try {
                const response = await fetch(`/api/search?${params.toString()}`, {
                    signal: controller.signal,
                    cache: "no-store",
                })

                if (!response.ok) throw new Error("Search request failed")

                const data = (await response.json()) as SearchResponse
                setItems(Array.isArray(data.items) ? data.items : [])
            } catch {
                if (!controller.signal.aborted) setItems([])
            } finally {
                if (!controller.signal.aborted) setIsLoading(false)
            }
        }, trimmedQuery.length === 0 ? 0 : SEARCH_DEBOUNCE_MS)

        return () => {
            controller.abort()
            window.clearTimeout(timeout)
        }
    }, [open, query])

    const runCommand = useCallback((command: () => void) => {
        handleOpenChange(false)
        command()
    }, [handleOpenChange])

    const componentItems = useMemo(
        () => items.filter((item) => item.category === "component"),
        [items]
    )
    const docsItems = useMemo(
        () => items.filter((item) => item.category === "docs"),
        [items]
    )
    const hasResults = componentItems.length > 0 || docsItems.length > 0

    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange}>
            <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs" />
                <Dialog.Popup
                    id="command-search-dialog"
                    className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden overscroll-contain rounded-base border-2 border-black bg-white"
                >
                    <Dialog.Title className="sr-only">
                        Search components and documentation
                    </Dialog.Title>
                    <Command className="w-full" loop={false} shouldFilter={false}>
                        <div className="flex items-center gap-2 border-b px-4 pr-12">
                            <Search aria-hidden="true" size={14} className="text-black/60" />
                            <Command.Input
                                value={query}
                                onValueChange={setQuery}
                                aria-label="Search components and documentation"
                                placeholder="Search components and docs…"
                                className="flex-1 py-3 focus-brutal"
                                onFocus={(event) => event.target.scrollIntoView({ block: "nearest" })}
                            />
                        </div>

                        <Command.List
                            className="max-h-90 overflow-y-auto p-2"
                            style={{ overflowAnchor: "none" }}
                        >
                            {isLoading ? (
                                <div role="status" aria-live="polite" className="py-6 text-center text-sm text-black/60">
                                    Searching…
                                </div>
                            ) : null}

                            {!isLoading && !hasResults ? (
                                <div role="status" aria-live="polite" className="py-6 text-center text-sm text-black/60">
                                    No results found.
                                </div>
                            ) : null}

                            {!isLoading && componentItems.length > 0 ? (
                                <Command.Group heading="Components" className="p-2">
                                    {componentItems.map((item) => (
                                        <Command.Item
                                            key={item.href}
                                            value={`${item.name} ${item.keywords.join(" ")}`}
                                            onSelect={() => runCommand(() => router.push(item.href))}
                                            className="flex cursor-pointer items-center gap-3 rounded-base data-[selected=true]:bg-main data-[selected=true]:text-black"
                                        >
                                            <p className="ml-3 py-1 text-black/80">{item.name}</p>
                                        </Command.Item>
                                    ))}
                                </Command.Group>
                            ) : null}

                            {!isLoading && docsItems.length > 0 ? (
                                <Command.Group heading="Documentation" className="p-2">
                                    {docsItems.map((item) => (
                                        <Command.Item
                                            key={item.href}
                                            value={`${item.name} ${item.keywords.join(" ")}`}
                                            onSelect={() => runCommand(() => router.push(item.href))}
                                            className="flex cursor-pointer items-center gap-3 rounded-base data-[selected=true]:bg-main data-[selected=true]:text-black"
                                        >
                                            <p className="ml-3 py-1 text-black/80">{item.name}</p>
                                        </Command.Item>
                                    ))}
                                </Command.Group>
                            ) : null}
                        </Command.List>

                        <div className="flex items-center gap-1 border-t px-4 py-2 text-xs">
                            <kbd className="rounded border bg-white px-1">esc</kbd>
                            close
                        </div>
                    </Command>
                    <Dialog.Close
                        aria-label="Close search"
                        className="focus-brutal absolute right-1 top-1 z-10 inline-flex h-11 w-11 items-center justify-center rounded-base hover:bg-main/20"
                    >
                        <X aria-hidden="true" className="h-5 w-5" />
                    </Dialog.Close>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
