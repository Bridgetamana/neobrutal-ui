import { NextResponse } from "next/server"
import { searchCatalog } from "@/lib/search"

const DEFAULT_LIMIT = 24

function parseLimit(limit: string | null) {
    if (!limit) {
        return DEFAULT_LIMIT
    }

    const parsed = Number.parseInt(limit, 10)
    return Number.isNaN(parsed) ? DEFAULT_LIMIT : parsed
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") ?? ""
    const limit = parseLimit(searchParams.get("limit"))

    const items = searchCatalog(query, limit)

    return NextResponse.json({
        items,
    })
}
