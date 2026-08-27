"use client"

import { useCallback, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog } from "@base-ui/react"
import { Command } from "cmdk"
import { Search, X } from "lucide-react"
import { searchCatalog } from "@/lib/search"

const RESULT_LIMIT = 24

interface CommandSearchDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CommandSearchDialog({ open, onOpenChange }: CommandSearchDialogProps) {
    const [query, setQuery] = useState("")
    const router = useRouter()

    const resetSearch = useCallback(() => {
        setQuery("")
    }, [])

    const handleOpenChange = useCallback((nextOpen: boolean) => {
        onOpenChange(nextOpen)
        if (!nextOpen) resetSearch()
    }, [onOpenChange, resetSearch])

    const items = useMemo(
        () => searchCatalog(query, RESULT_LIMIT),
        [query]
    )

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
                    className="fixed inset-x-4 top-[max(1rem,env(safe-area-inset-top))] z-50 max-h-[calc(100dvh-2rem)] overflow-hidden overscroll-contain rounded-base border-2 border-black bg-white sm:left-1/2 sm:right-auto sm:top-1/2 sm:w-[calc(100%-2rem)] sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2"
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
                            className="max-h-[min(22.5rem,calc(100dvh-9rem))] overflow-y-auto overscroll-contain p-2"
                            style={{ overflowAnchor: "none" }}
                        >
                            {!hasResults ? (
                                <div role="status" aria-live="polite" className="py-6 text-center text-sm text-black/60">
                                    No results found.
                                </div>
                            ) : null}

                            {componentItems.length > 0 ? (
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

                            {docsItems.length > 0 ? (
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
