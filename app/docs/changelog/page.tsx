import fs from "fs"
import path from "path"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export const metadata = {
    title: "Changelog - Neobrutal UI",
    description: "All notable changes to Neobrutal UI.",
}

async function getChangelog() {
    try {
        const changelogPath = path.join(process.cwd(), "CHANGELOG.md")
        const content = fs.readFileSync(changelogPath, "utf-8")
        return content
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
        // Match version headers like ## [0.2.0] - 2026-01-03 or ## [Unreleased]
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

        // Match change type headers like ### Added, ### Fixed
        const typeMatch = line.match(/^### (.+)$/)
        if (typeMatch && currentSection) {
            if (currentChangeType) {
                currentSection.changes.push(currentChangeType)
            }
            currentChangeType = { type: typeMatch[1], items: [] }
            continue
        }

        // Match list items (including indented sub-items)
        const itemMatch = line.match(/^- (.+)$/)
        if (itemMatch && currentChangeType) {
            currentChangeType.items.push(itemMatch[1])
        }
    }

    // Push last section
    if (currentSection) {
        if (currentChangeType) {
            currentSection.changes.push(currentChangeType)
        }
        sections.push(currentSection)
    }

    return sections
}

export default async function ChangelogPage() {
    const content = await getChangelog()
    const sections = parseChangelog(content)

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Changelog</h1>
                <p className="text-black/70">
                    All notable changes to Neobrutal UI are documented here.
                </p>
            </div>

            <div className="space-y-6">
                {sections.length === 0 ? (
                    <div className="border-2 border-black rounded-lg p-8 bg-white text-center">
                        <p className="text-black/60">No changelog entries found.</p>
                        <p className="text-sm text-black/40 mt-2">
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
                        <div
                            key={section.version}
                        >
                            <div className="flex items-center justify-between border-b-2 border-black bg-bg">
                                <h2 className="text-xl font-bold">
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
                                                    dangerouslySetInnerHTML={{
                                                        __html: item
                                                            .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                                                            .replace(/`(.+?)`/g, "<code class='text-xs bg-bg px-1 py-0.5 rounded border border-black'>$1</code>")
                                                    }}
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <section className="border-2 border-black bg-white">
                <Link href="/docs/accessibility" className="block p-3 hover:bg-main">
                    <span className="text-lg font-bold">Accessibility</span>
                    <p className="truncate">Learn about how neobrutal ui is built with accessibility in mind</p>
                </Link>
            </section>
        </div>
    )
}
