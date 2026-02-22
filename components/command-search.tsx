"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { MagnifyingGlassIcon, FileIcon, HashIcon, TextAaIcon } from "@phosphor-icons/react"
import { useDocsSearch } from "fumadocs-core/search/client"
import type { SharedProps } from "fumadocs-ui/components/dialog/search"

export default function CommandSearch({ open, onOpenChange }: SharedProps) {
    const router = useRouter()
    const { search, setSearch, query } = useDocsSearch({ type: 'fetch' })

    const runCommand = useCallback(
        (command: () => void) => {
            onOpenChange(false)
            setSearch("")
            command()
        },
        [onOpenChange, setSearch],
    )

    const results = query.data && query.data !== 'empty' ? query.data : []

    return (
        <Command.Dialog
            open={open}
            onOpenChange={onOpenChange}
            className="fixed inset-0 z-50"
            shouldFilter={false}
            loop={false}
        >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={() => onOpenChange(false)} />

            <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black rounded-base overflow-hidden">
                <div className="flex items-center gap-2 px-4 border-b">
                    <MagnifyingGlassIcon size={14} className="text-black/60" />
                    <Command.Input
                        autoFocus
                        placeholder="Search components, docs..."
                        className="flex-1 py-3 outline-none"
                        value={search}
                        onValueChange={setSearch}
                    />
                </div>

                <Command.List
                    className="max-h-90 overflow-y-auto p-2"
                    style={{ overflowAnchor: "none" }}
                >
                    {query.isLoading && search ? (
                        <div className="py-6 text-center text-sm text-black/60">
                            Searching...
                        </div>
                    ) : results.length === 0 && search ? (
                        <Command.Empty className="py-6 text-center text-sm text-black/60">
                            No results found.
                        </Command.Empty>
                    ) : !search ? (
                        <div className="py-6 text-center text-sm text-black/60">
                            Type to search docs...
                        </div>
                    ) : (
                        results.map((item) => (
                            <Command.Item
                                key={item.id}
                                value={item.id}
                                onSelect={() =>
                                    runCommand(() => router.push(item.url))
                                }
                                className="flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer data-[selected=true]:bg-main data-[selected=true]:text-black"
                            >
                                {item.type === "page" && (
                                    <FileIcon size={14} className="text-black/60 shrink-0" />
                                )}
                                {item.type === "heading" && (
                                    <HashIcon size={14} className="text-black/60 shrink-0" />
                                )}
                                {item.type === "text" && (
                                    <TextAaIcon size={14} className="text-black/60 shrink-0" />
                                )}
                                <span className="text-sm text-black/80 truncate">
                                    {item.content}
                                </span>
                            </Command.Item>
                        ))
                    )}
                </Command.List>

                <div className="flex items-center gap-1 px-4 py-2 border-t text-xs">
                    <kbd className="px-1 rounded border bg-white">
                        esc
                    </kbd>
                    close
                </div>
            </div>
        </Command.Dialog>
    )
}
