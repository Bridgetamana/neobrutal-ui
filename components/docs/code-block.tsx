import { codeToHtml } from "shiki"
import { cn } from "@/lib/utils"
import { normalizeDocsCode } from "@/lib/mdx/docs-code"
import { CopyButton } from "./copy-button"

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    code: string
    language?: string
}

export async function CodeBlock({ code, language = "tsx", className, ...props }: CodeBlockProps) {
    const normalizedCode = normalizeDocsCode(code)

    const highlightedHtml = await codeToHtml(normalizedCode, {
        lang: language,
        theme: "dracula",
    })

    return (
        <div className={cn("relative group rounded-base bg-black text-white font-mono text-sm", className)} {...props}>
            <div className="absolute right-4 top-4 z-10">
                <CopyButton code={normalizedCode} />
            </div>
            <div
                className="overflow-x-auto p-4 [&_pre]:bg-transparent! [&_code]:bg-transparent!"
                dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
        </div>
    )
}
