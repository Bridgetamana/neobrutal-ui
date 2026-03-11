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

    return (
        <div className={cn("border-2 shadow-brutal bg-white rounded-base", className)} {...props}>
            <div className="flex border-b-2 divide-x-2 divide-black">
                <button
                    onClick={() => setView("preview")}
                    className={cn(
                        "flex-1 py-2 text-sm font-medium uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset",
                        view === "preview" ? "bg-main" : "bg-white hover:bg-main/30"
                    )}
                >
                    Preview
                </button>
                <button
                    onClick={() => setView("code")}
                    className={cn(
                        "flex-1 py-2 text-sm font-medium uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset",
                        view === "code" ? "bg-main" : "bg-white hover:bg-main/30"
                    )}
                >
                    Code
                </button>
            </div>

            <div className="bg-white">
                {view === "preview" ? (
                    <div className="p-4 min-h-50 flex items-center justify-center">
                        {children}
                    </div>
                ) : (
                    <div className="relative group bg-black text-white font-mono text-sm border-0 rounded-none shadow-none m-0">
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
