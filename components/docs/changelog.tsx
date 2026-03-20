import fs from "fs/promises"
import path from "path"
import { Badge } from "@/components/ui/badge"

async function getChangelog() {
    try {
        const changelogPath = path.join(process.cwd(), "CHANGELOG.md")
        return await fs.readFile(changelogPath, "utf-8")
    } catch {
        return ""
    }
}

function parseChangelog(content: string) {
    if (!content) return []

    const normalizedContent = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n")
    const lines = normalizedContent.split("\n")
    const sections: Array<{
        version: string
        date: string
        changes: Array<{ type: string; items: string[] }>
    }> = []

    let currentSection: (typeof sections)[0] | null = null
    let currentChangeType: { type: string; items: string[] } | null = null

    for (const line of lines) {
        const versionMatch = line.match(/^## \[(.+?)\](?: - (.+))?$/)
        if (versionMatch) {
            if (currentSection) {
                if (currentChangeType) {
                    currentSection.changes.push(currentChangeType)
                }
                sections.push(currentSection)
            }
            currentSection = {
                version: versionMatch[1],
                date: versionMatch[2] || "",
                changes: [],
            }
            currentChangeType = null
            continue
        }

        const typeMatch = line.match(/^### (.+)$/)
        if (typeMatch && currentSection) {
            if (currentChangeType) {
                currentSection.changes.push(currentChangeType)
            }
            currentChangeType = { type: typeMatch[1], items: [] }
            continue
        }

        const itemMatch = line.match(/^- (.+)$/)
        if (itemMatch && currentChangeType) {
            currentChangeType.items.push(itemMatch[1])
        }
    }

    if (currentSection) {
        if (currentChangeType) {
            currentSection.changes.push(currentChangeType)
        }
        sections.push(currentSection)
    }

    return sections
}

function renderInlineTokens(text: string) {
    return text
        .split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
        .filter(Boolean)
        .map((part, index) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return (
                    <strong key={index} className="font-bold">
                        {part.slice(2, -2)}
                    </strong>
                )
            }

            if (part.startsWith("`") && part.endsWith("`")) {
                return (
                    <code
                        key={index}
                        className="text-xs bg-bg px-1 py-0.5 rounded border border-black"
                    >
                        {part.slice(1, -1)}
                    </code>
                )
            }

            return <span key={index}>{part}</span>
        })
}

export async function Changelog() {
    const content = await getChangelog()
    const sections = parseChangelog(content)

    return (
        <div className="space-y-6">
            {sections.length === 0 ? (
                <div className="border-2 border-black rounded-lg p-8 bg-white text-center">
                    <p className="text-black/60">No changelog entries found.</p>
                    <p className="text-sm text-black/60 mt-2">
                        View the full changelog on{" "}
                        <a
                            href="https://github.com/bridgetamana/neobrutal-ui/blob/main/CHANGELOG.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                        >
                            GitHub
                        </a>
                    </p>
                </div>
            ) : (
                sections.map((section) => (
                    <div key={section.version}>
                        <div className="flex items-center justify-between border-b-2 border-black bg-bg">
                            <h2 className="text-xl font-semibold">
                                {section.version === "Next" ? (
                                    <span>Next</span>
                                ) : (
                                    `v${section.version}`
                                )}
                            </h2>
                            {section.date && (
                                <time className="text-sm text-black">
                                    {section.date}
                                </time>
                            )}
                        </div>
                        <div className="pt-2 space-y-2">
                            {section.changes.map((change, idx) => (
                                <div key={idx}>
                                    <Badge>{change.type}</Badge>
                                    <ul className="space-y-1 ml-4">
                                        {change.items.map((item, itemIdx) => (
                                            <li
                                                key={itemIdx}
                                                className="text-sm list-disc list-outside ml-2"
                                            >
                                                {renderInlineTokens(item)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}
