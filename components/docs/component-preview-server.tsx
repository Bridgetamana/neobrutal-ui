import fs from "fs/promises"
import path from "path"
import { codeToHtml } from "shiki"
import { normalizeDocsCode } from "@/lib/mdx/docs-code"
import { ComponentPreviewClient } from "./component-preview"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    code?: string
    codeFile?: string
    children: React.ReactNode
}

async function getExampleCode(code: string | undefined, codeFile: string | undefined) {
    if (codeFile) {
        const docsExamplesDir = path.resolve(process.cwd(), "content/docs/examples")
        const resolvedPath = path.resolve(docsExamplesDir, codeFile)

        // Guard against directory traversal from MDX content.
        if (!resolvedPath.startsWith(docsExamplesDir)) {
            throw new Error(`Invalid codeFile path: ${codeFile}`)
        }

        return fs.readFile(resolvedPath, "utf-8")
    }

    if (code) return code

    throw new Error("ComponentPreview requires either `code` or `codeFile`.")
}

export async function ComponentPreview({ code, codeFile, children, ...props }: ComponentPreviewProps) {
    const source = await getExampleCode(code, codeFile)
    const normalizedCode = normalizeDocsCode(source)
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
