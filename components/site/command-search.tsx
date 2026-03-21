"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog } from "@base-ui/react"
import type { SearchItem } from "@/lib/search-data"

const RESULT_LIMIT = 24
const SEARCH_DEBOUNCE_MS = 120

interface SearchResponse {
    items: SearchItem[]
}

export function CommandSearch() {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [items, setItems] = useState<SearchItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault()
                setOpen((prev) => !prev)
            }
        }

        document.addEventListener("keydown", onKeyDown)
        return () => document.removeEventListener("keydown", onKeyDown)
    }, [])

    useEffect(() => {
        if (!open) {
            setQuery("")
            setItems([])
            setIsLoading(false)
        }
    }, [open])

    useEffect(() => {
        if (!open) {
            return
        }

        const controller = new AbortController()
        const trimmedQuery = query.trim()
        const timeout = window.setTimeout(async () => {
            const params = new URLSearchParams({
                limit: RESULT_LIMIT.toString(),
            })

            if (trimmedQuery.length > 0) {
                params.set("q", trimmedQuery)
            }

            setIsLoading(true)
            try {
                const response = await fetch(`/api/search?${params.toString()}`, {
                    signal: controller.signal,
                    cache: "no-store",
                })

                if (!response.ok) {
                    throw new Error("Search request failed")
                }

                const data = (await response.json()) as SearchResponse
                setItems(Array.isArray(data.items) ? data.items : [])
            } catch {
                if (!controller.signal.aborted) {
                    setItems([])
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false)
                }
            }
        }, trimmedQuery.length === 0 ? 0 : SEARCH_DEBOUNCE_MS)

        return () => {
            controller.abort()
            window.clearTimeout(timeout)
        }
    }, [open, query])

    const runCommand = useCallback((command: () => void) => {
        setOpen(false)
        command()
    }, [])

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
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger id="command-search-trigger" aria-label="Search documentation">
                <div className="relative block cursor-default">
                    <Search
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 md:hidden"
                    />
                    <Search
                        size={14}
                        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 text-black/60"
                    />
                    <Input
                        readOnly
                        placeholder="Search..."
                        className="w-44 h-9 pl-8 hidden md:block cursor-default"
                    />
                </div>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50" />

                <Dialog.Popup
                    className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black rounded-base overflow-hidden"
                >
                    <Dialog.Title className="sr-only">
                        Search components and documentation
                    </Dialog.Title>

                    <Command className="w-full" loop={false} shouldFilter={false}>
                        <div className="flex items-center gap-2 px-4 border-b">
                            <Search size={14} className="text-black/60" />
                            <Command.Input
                                autoFocus
                                value={query}
                                onValueChange={setQuery}
                                placeholder="Search components, docs..."
                                className="flex-1 py-3 focus-brutal"
                                onFocus={(e) => e.target.scrollIntoView({ block: "nearest" })}
                            />
                        </div>

                        <Command.List
                            className="max-h-90 overflow-y-auto p-2"
                            style={{ overflowAnchor: "none" }}
                        >
                            {isLoading && (
                                <div className="py-6 text-center text-sm text-black/60">
                                    Searching...
                                </div>
                            )}

                            {!isLoading && !hasResults && (
                                <div className="py-6 text-center text-sm text-black/60">
                                    No results found.
                                </div>
                            )}

                            {!isLoading && componentItems.length > 0 && (
                                <Command.Group heading="Components" className="p-2">
                                    {componentItems.map((item) => (
                                        <Command.Item
                                            key={item.href}
                                            value={`${item.name} ${item.keywords.join(" ")}`}
                                            onSelect={() => runCommand(() => router.push(item.href))}
                                            className="flex items-center gap-3 rounded-base cursor-pointer data-[selected=true]:bg-main data-[selected=true]:text-black"
                                        >
                                            <p className="py-1 text-black/80 ml-3">{item.name}</p>
                                        </Command.Item>
                                    ))}
                                </Command.Group>
                            )}

                            {!isLoading && docsItems.length > 0 && (
                                <Command.Group heading="Documentation" className="p-2">
                                    {docsItems.map((item) => (
                                        <Command.Item
                                            key={item.href}
                                            value={`${item.name} ${item.keywords.join(" ")}`}
                                            onSelect={() => runCommand(() => router.push(item.href))}
                                            className="flex items-center gap-3 rounded-base cursor-pointer data-[selected=true]:bg-main data-[selected=true]:text-black"
                                        >
                                            <p className="py-1 text-black/80 ml-3">{item.name}</p>
                                        </Command.Item>
                                    ))}
                                </Command.Group>
                            )}
                        </Command.List>

                        <div className="flex items-center gap-1 px-4 py-2 border-t text-xs">
                            <kbd className="px-1 rounded border bg-white">
                                esc
                            </kbd>
                            close
                        </div>
                    </Command>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
