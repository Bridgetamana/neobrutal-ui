"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "@phosphor-icons/react"
import { Highlight, themes } from "prism-react-renderer"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    code: string
    language?: string
}

export function CodeBlock({ code, language = "tsx", className, ...props }: CodeBlockProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    const onCopy = () => {
        try {
            navigator.clipboard.writeText(code)
            setHasCopied(true)
            setTimeout(() => setHasCopied(false), 2000)
        } catch (err) {
            // ignore copy failures in insecure contexts
            console.error({ err })
        }
    }

    return (
        <div className={cn("relative group rounded-base bg-black text-white font-mono text-sm", className)} {...props}>
            <div className="absolute right-4 top-4 z-10">
                <Button
                    size="icon"
                    className="h-6 w-6 bg-transparent text-white hover:translate-0"
                    onClick={onCopy}
                >
                    {hasCopied ? (
                        <CheckIcon className="h-6 w-6" />
                    ) : (
                        <CopyIcon className="h-6 w-6" />
                    )}
                    <span className="sr-only">Copy code</span>
                </Button>
            </div>
            <div className="overflow-x-auto p-4">
                <Highlight
                    theme={themes.dracula}
                    code={code}
                    language={language}
                >
                    {({ style, tokens, getLineProps, getTokenProps }) => (
                        <pre style={{ ...style, background: "transparent" }}>
                            {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line })}>
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token })} />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            </div>
        </div>
    )
}
