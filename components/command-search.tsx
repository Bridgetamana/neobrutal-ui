"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { Input } from "@/components/ui/input"
import { Dialog } from "@base-ui/react"

interface SearchItem {
    name: string
    href: string
    keywords: string[]
    category: "component" | "docs"
}

const searchItems: SearchItem[] = [
    {
        name: "Accordion",
        href: "/docs/components/accordion",
        keywords: ["collapse", "expand"],
        category: "component",
    },
    {
        name: "Alert",
        href: "/docs/components/alert",
        keywords: ["notification", "warning", "error", "info"],
        category: "component",
    },
    {
        name: "Avatar",
        href: "/docs/components/avatar",
        keywords: ["user", "profile", "image", "picture"],
        category: "component",
    },
    {
        name: "Badge",
        href: "/docs/components/badge",
        keywords: ["tag", "label", "status"],
        category: "component",
    },
    {
        name: "Button",
        href: "/docs/components/button",
        keywords: ["click", "action"],
        category: "component",
    },
    {
        name: "Card",
        href: "/docs/components/card",
        keywords: ["container"],
        category: "component",
    },
    {
        name: "Checkbox",
        href: "/docs/components/checkbox",
        keywords: ["form"],
        category: "component",
    },
    {
        name: "Dialog",
        href: "/docs/components/dialog",
        keywords: ["modal", "popup", "overlay"],
        category: "component",
    },
    {
        name: "Input",
        href: "/docs/components/input",
        keywords: ["field", "form"],
        category: "component",
    },
    {
        name: "Label",
        href: "/docs/components/label",
        keywords: ["text", "form"],
        category: "component",
    },
    {
        name: "Pagination",
        href: "/docs/components/pagination",
        keywords: ["pages", "navigation", "next", "previous"],
        category: "component",
    },
    {
        name: "Popover",
        href: "/docs/components/popover",
        keywords: ["popup", "overlay"],
        category: "component",
    },
    {
        name: "Progress",
        href: "/docs/components/progress",
        keywords: ["loading", "bar", "indicator"],
        category: "component",
    },
    {
        name: "Radio Group",
        href: "/docs/components/radio-group",
        keywords: ["form"],
        category: "component",
    },
    {
        name: "Select",
        href: "/docs/components/select",
        keywords: ["dropdown", "form"],
        category: "component",
    },
    {
        name: "Slider",
        href: "/docs/components/slider",
        keywords: ["range"],
        category: "component",
    },
    {
        name: "Switch",
        href: "/docs/components/switch",
        keywords: ["toggle", "on", "off"],
        category: "component",
    },
    {
        name: "Tabs",
        href: "/docs/components/tabs",
        keywords: ["navigation", "panel"],
        category: "component",
    },
    {
        name: "Textarea",
        href: "/docs/components/textarea",
        keywords: ["form", "input"],
        category: "component",
    },
    {
        name: "Toast",
        href: "/docs/components/toast",
        keywords: ["notification", "sonner"],
        category: "component",
    },
    {
        name: "Tooltip",
        href: "/docs/components/tooltip",
        keywords: ["hint", "help"],
        category: "component",
    },
    {
        name: "Getting Started",
        href: "/docs",
        keywords: ["start", "intro"],
        category: "docs",
    },
    {
        name: "Installation",
        href: "/docs/installation",
        keywords: ["setup", "install"],
        category: "docs",
    },
    {
        name: "Theming",
        href: "/docs/theming",
        keywords: ["theme", "colors", "customize"],
        category: "docs",
    },
    {
        name: "Changelog",
        href: "/docs/changelog",
        keywords: ["changelog", "releases", "updates"],
        category: "docs",
    },
    {
        name: "CLI",
        href: "/docs/cli",
        keywords: ["command", "add"],
        category: "docs",
    },
]

export function CommandSearch() {
    const [open, setOpen] = useState(false)
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

    const runCommand = useCallback((command: () => void) => {
        setOpen(false)
        command()
    }, [])

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger id="command-search-trigger">
                <div className="relative block cursor-default">
                    <MagnifyingGlassIcon
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 md:hidden"
                    />
                    <MagnifyingGlassIcon
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

                    <Command className="w-full" loop={false} shouldFilter={true}>
                        <div className="flex items-center gap-2 px-4 border-b">
                            <MagnifyingGlassIcon size={14} className="text-black/60" />
                            <Command.Input
                                autoFocus
                                placeholder="Search components, docs..."
                                className="flex-1 py-3 outline-none"
                                onFocus={(e) => e.target.scrollIntoView({ block: "nearest" })}
                            />
                        </div>

                        <Command.List
                            className="max-h-90 overflow-y-auto p-2"
                            style={{ overflowAnchor: "none" }}
                        >
                            <Command.Empty className="py-6 text-center text-sm text-black/60">
                                No results found.
                            </Command.Empty>

                            <Command.Group heading="Components" className="p-2">
                                {searchItems
                                    .filter((i) => i.category === "component")
                                    .map((item) => (
                                        <Command.Item
                                            key={item.href}
                                            value={`${item.name}} ${item.keywords.join(" ")}`}
                                            onSelect={() => runCommand(() => router.push(item.href))}
                                            className="flex items-center gap-3 rounded-md cursor-pointer data-[selected=true]:bg-main data-[selected=true]:text-black"
                                        >
                                            <p className="py-1 text-black/80 ml-3">{item.name}</p>
                                        </Command.Item>
                                    ))}
                            </Command.Group>

                            <Command.Group heading="Documentation" className="p-2">
                                {searchItems
                                    .filter((i) => i.category === "docs")
                                    .map((item) => (
                                        <Command.Item
                                            key={item.href}
                                            value={`${item.name}} ${item.keywords.join(" ")}`}
                                            onSelect={() => runCommand(() => router.push(item.href))}
                                            className="flex items-center gap-3 rounded-md cursor-pointer data-[selected=true]:bg-main data-[selected=true]:text-black"
                                        >
                                            <p className="py-1 text-black/80 ml-3">{item.name}</p>
                                        </Command.Item>
                                    ))}
                            </Command.Group>
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
