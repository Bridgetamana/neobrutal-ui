import { searchItems, type SearchItem } from "@/lib/search-data"

const DEFAULT_LIMIT = 24
const MAX_LIMIT = 50

function normalizeTerm(term: string) {
    return term
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ")
}

function getScore(item: SearchItem, normalizedQuery: string, queryTokens: string[]) {
    const normalizedName = item.name.toLowerCase()
    const normalizedKeywords = item.keywords.map((keyword) => keyword.toLowerCase())
    let score = 0

    if (normalizedName === normalizedQuery) {
        score += 120
    } else if (normalizedName.startsWith(normalizedQuery)) {
        score += 90
    } else if (normalizedName.includes(normalizedQuery)) {
        score += 70
    }

    for (const token of queryTokens) {
        if (normalizedName.startsWith(token)) {
            score += 18
        } else if (normalizedName.includes(token)) {
            score += 10
        }

        if (normalizedKeywords.some((keyword) => keyword === token)) {
            score += 14
        } else if (normalizedKeywords.some((keyword) => keyword.includes(token))) {
            score += 8
        }

        if (item.href.includes(token)) {
            score += 4
        }
    }

    return score
}

function clampLimit(limit?: number) {
    if (!Number.isFinite(limit) || !limit || limit <= 0) {
        return DEFAULT_LIMIT
    }

    return Math.min(limit, MAX_LIMIT)
}

export function searchCatalog(query: string, limit?: number) {
    const normalizedQuery = normalizeTerm(query)
    const safeLimit = clampLimit(limit)

    if (!normalizedQuery) {
        return [...searchItems]
            .sort((a, b) => {
                if (a.category !== b.category) {
                    return a.category === "component" ? -1 : 1
                }

                return a.name.localeCompare(b.name)
            })
            .slice(0, safeLimit)
    }

    const queryTokens = normalizedQuery.split(" ").filter(Boolean)

    return searchItems
        .map((item) => ({ item, score: getScore(item, normalizedQuery, queryTokens) }))
        .filter((result) => result.score > 0)
        .sort((a, b) => {
            if (a.score !== b.score) {
                return b.score - a.score
            }

            if (a.item.category !== b.item.category) {
                return a.item.category === "component" ? -1 : 1
            }

            return a.item.name.localeCompare(b.item.name)
        })
        .slice(0, safeLimit)
        .map((result) => result.item)
}
