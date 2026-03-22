import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { cache } from "react"

const DOCS_PATH = path.join(process.cwd(), "content/docs")
const COMPONENTS_PATH = path.join(DOCS_PATH, "components")

const DOCS_FALLBACK_ORDER: Record<string, number> = {
    introduction: 0,
    installation: 1,
    cli: 2,
    theming: 3,
    accessibility: 4,
    changelog: 5,
}

export type MdxSection = "components" | "docs"

export interface MdxFrontmatter {
    title: string
    description?: string
    order?: number
}

export interface MdxDocument {
    slug: string
    section: MdxSection
    href: string
    frontmatter: MdxFrontmatter
    content: string
}

export interface DocsNavigationItem {
    title: string
    href: string
}

export interface DocsNavigationGroup {
    title: string
    items: DocsNavigationItem[]
}

function getBasePath(section: MdxSection) {
    return section === "components" ? COMPONENTS_PATH : DOCS_PATH
}

function toHref(section: MdxSection, slug: string) {
    if (section === "components") {
        return `/docs/components/${slug}`
    }

    return slug === "introduction" ? "/docs" : `/docs/${slug}`
}

function parseAndValidateMdx(filePath: string, section: MdxSection): MdxDocument {
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)
    const slug = path.basename(filePath, ".mdx")

    if (typeof data.title !== "string" || data.title.trim().length === 0) {
        throw new Error(`Invalid frontmatter in ${filePath}: "title" must be a non-empty string.`)
    }

    if (
        data.description !== undefined &&
        typeof data.description !== "string"
    ) {
        throw new Error(`Invalid frontmatter in ${filePath}: "description" must be a string.`)
    }

    if (data.order !== undefined && (!Number.isFinite(data.order) || typeof data.order !== "number")) {
        throw new Error(`Invalid frontmatter in ${filePath}: "order" must be a number.`)
    }

    return {
        slug,
        section,
        href: toHref(section, slug),
        frontmatter: {
            title: data.title,
            description: data.description,
            order: data.order,
        },
        content: content || "",
    }
}

function getSortOrder(doc: MdxDocument) {
    if (typeof doc.frontmatter.order === "number") {
        return doc.frontmatter.order
    }

    if (doc.section === "docs") {
        return DOCS_FALLBACK_ORDER[doc.slug] ?? Number.MAX_SAFE_INTEGER
    }

    return Number.MAX_SAFE_INTEGER
}

function sortDocuments(a: MdxDocument, b: MdxDocument) {
    const orderDiff = getSortOrder(a) - getSortOrder(b)
    if (orderDiff !== 0) {
        return orderDiff
    }

    return a.frontmatter.title.localeCompare(b.frontmatter.title)
}

export const getAllMdxDocuments = cache(async (section: MdxSection = "components") => {
    const basePath = getBasePath(section)
    if (!fs.existsSync(basePath)) {
        return [] as MdxDocument[]
    }

    const entries = fs.readdirSync(basePath, { withFileTypes: true })
    const documents = entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
        .map((entry) => parseAndValidateMdx(path.join(basePath, entry.name), section))

    documents.sort(sortDocuments)
    return documents
})

export const getMdxBySlug = cache(async (slug: string, section: MdxSection = "components") => {
    const basePath = getBasePath(section)
    const realSlug = slug.replace(/\.mdx$/, "")
    const filePath = path.join(basePath, `${realSlug}.mdx`)

    if (!fs.existsSync(filePath)) {
        throw new Error(`MDX file not found: ${filePath}`)
    }

    const document = parseAndValidateMdx(filePath, section)

    return {
        frontmatter: document.frontmatter,
        content: document.content,
    }
})

export async function getAllMdxSlugs(section: MdxSection = "components") {
    const docs = await getAllMdxDocuments(section)
    return docs.map((doc) => ({ slug: doc.slug }))
}

export const getDocsNavigation = cache(async (): Promise<DocsNavigationGroup[]> => {
    const [docsPages, componentPages] = await Promise.all([
        getAllMdxDocuments("docs"),
        getAllMdxDocuments("components"),
    ])

    const gettingStartedItems = docsPages.map((doc) => ({
        title: doc.frontmatter.title,
        href: doc.href,
    }))

    const componentItems = componentPages.map((doc) => ({
        title: doc.frontmatter.title,
        href: doc.href,
    }))

    return [
        {
            title: "Getting Started",
            items: gettingStartedItems,
        },
        {
            title: "Components",
            items: componentItems,
        },
    ]
})
