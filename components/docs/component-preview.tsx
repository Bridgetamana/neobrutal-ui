"use client"

import * as React from "react"
import { CopyButton } from "./copy-button"
import { cn } from "@/lib/utils"

interface ComponentPreviewClientProps extends React.HTMLAttributes<HTMLDivElement> {
    code: string
    highlightedCode: string
    children: React.ReactNode
}

export function ComponentPreviewClient({
    code,
    highlightedCode,
    children,
    className,
    ...props
}: ComponentPreviewClientProps) {
    const [view, setView] = React.useState<"preview" | "code">("preview")
    const id = React.useId()
    const previewTabId = `${id}-preview-tab`
    const codeTabId = `${id}-code-tab`
    const previewPanelId = `${id}-preview-panel`
    const codePanelId = `${id}-code-panel`

    function handleTabKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return

        const nextView = view === "preview" ? "code" : "preview"
        setView(nextView)
        requestAnimationFrame(() => {
            document.getElementById(nextView === "preview" ? previewTabId : codeTabId)?.focus()
        })
        event.preventDefault()
    }

    return (
        <div className={cn("border-2 shadow-brutal bg-white rounded-base", className)} {...props}>
            <div role="tablist" aria-label="Component example" onKeyDown={handleTabKeyDown} className="flex border-b-2 divide-x-2 divide-black">
                <button
                    type="button"
                    role="tab"
                    id={previewTabId}
                    aria-selected={view === "preview"}
                    aria-controls={previewPanelId}
                    tabIndex={view === "preview" ? 0 : -1}
                    onClick={() => setView("preview")}
                    className={cn(
                        "flex-1 py-2 text-sm font-medium uppercase focus-brutal-inset",
                        view === "preview" ? "bg-main" : "bg-white hover:bg-main/30"
                    )}
                >
                    Preview
                </button>
                <button
                    type="button"
                    role="tab"
                    id={codeTabId}
                    aria-selected={view === "code"}
                    aria-controls={codePanelId}
                    tabIndex={view === "code" ? 0 : -1}
                    onClick={() => setView("code")}
                    className={cn(
                        "flex-1 py-2 text-sm font-medium uppercase focus-brutal-inset",
                        view === "code" ? "bg-main" : "bg-white hover:bg-main/30"
                    )}
                >
                    Code
                </button>
            </div>

            <div className="bg-white">
                {view === "preview" ? (
                    <div id={previewPanelId} role="tabpanel" aria-labelledby={previewTabId} className="flex min-h-50 max-w-full items-center justify-center overflow-x-auto overscroll-x-contain p-4 sm:p-6">
                        {children}
                    </div>
                ) : (
                    <div id={codePanelId} role="tabpanel" aria-labelledby={codeTabId} className="relative group bg-black text-white font-mono text-sm border-0 rounded-none shadow-none m-0">
                        <div className="absolute right-4 top-4 z-10">
                            <CopyButton code={code} />
                        </div>
                        <div
                            className="overflow-x-auto p-4 [&_pre]:bg-transparent! [&_code]:bg-transparent!"
                            dangerouslySetInnerHTML={{ __html: highlightedCode }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
