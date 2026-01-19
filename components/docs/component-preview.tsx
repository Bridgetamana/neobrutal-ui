"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { cn } from "@/lib/utils"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    code: string
    htmlCode?: string
    children: React.ReactNode
}

export function ComponentPreview({ code, htmlCode, children, className, ...props }: ComponentPreviewProps) {
    const [view, setView] = React.useState<"preview" | "code">("preview")
    const [codeType, setCodeType] = React.useState<"react" | "html">("react")

    return (
        <div className={cn("border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white", className)} {...props}>
            <div className="flex border-b-2 border-black divide-x-2 divide-black">
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
                    <div className="p-4 min-h-[200px] flex items-center justify-center">
                        {children}
                    </div>
                ) : (
                    <div>
                        {htmlCode && (
                            <div className="flex border-b-2 border-black bg-neutral-100">
                                <button
                                    onClick={() => setCodeType("react")}
                                    className={cn(
                                        "px-4 py-2 text-xs font-bold uppercase transition-colors",
                                        codeType === "react"
                                            ? "bg-black text-white"
                                            : "bg-transparent text-black hover:bg-black/10"
                                    )}
                                >
                                    React
                                </button>
                                <button
                                    onClick={() => setCodeType("html")}
                                    className={cn(
                                        "px-4 py-2 text-xs font-bold uppercase transition-colors",
                                        codeType === "html"
                                            ? "bg-black text-white"
                                            : "bg-transparent text-black hover:bg-black/10"
                                    )}
                                >
                                    HTML
                                </button>
                            </div>
                        )}
                        <CodeBlock
                            code={codeType === "html" && htmlCode ? htmlCode : code}
                            language={codeType === "html" ? "html" : "tsx"}
                            className="border-0 rounded-none shadow-none m-0"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
