"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    code: string
}

export function CopyButton({ code, className, ...props }: CopyButtonProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    const onCopy = () => {
        try {
            navigator.clipboard.writeText(code)
            setHasCopied(true)
            setTimeout(() => setHasCopied(false), 2000)
        } catch (err) {
            console.error({ err })
        }
    }

    return (
        <button
            type="button"
            onClick={onCopy}
            className={cn(
                "h-6 w-6 flex items-center justify-center bg-transparent text-white hover:text-white/80 cursor-pointer",
                className
            )}
            aria-label="Copy code"
            {...props}
        >
            {hasCopied ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" />
                </svg>
            )}
        </button>
    )
}
