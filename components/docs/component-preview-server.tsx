import { codeToHtml } from "shiki"
import { normalizeDocsCode } from "@/lib/docs-code"
import { ComponentPreviewClient } from "./component-preview"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    code: string
    children: React.ReactNode
}

export async function ComponentPreview({ code, children, ...props }: ComponentPreviewProps) {
    const normalizedCode = normalizeDocsCode(code)
    const highlightedCode = await codeToHtml(normalizedCode, {
        lang: "tsx",
        theme: "dracula",
    })

    return (
        <ComponentPreviewClient
            code={normalizedCode}
            highlightedCode={highlightedCode}
            {...props}
        >
            {children}
        </ComponentPreviewClient>
    )
}
