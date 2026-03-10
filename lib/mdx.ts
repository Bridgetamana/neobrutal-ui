import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { cache } from 'react'

const DOCS_PATH = path.join(process.cwd(), 'content/docs')
const COMPONENTS_PATH = path.join(DOCS_PATH, 'components')

export const getMdxBySlug = cache(async (slug: string, section: 'components' | 'docs' = 'components') => {
    const basePath = section === 'components' ? COMPONENTS_PATH : DOCS_PATH
    const realSlug = slug.replace(/\.mdx$/, '')
    const filePath = path.join(basePath, `${realSlug}.mdx`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
        frontmatter: data,
        content: content || ""
    }
})

export async function getAllMdxSlugs(section: 'components' | 'docs' = 'components') {
    const basePath = section === 'components' ? COMPONENTS_PATH : DOCS_PATH
    if (!fs.existsSync(basePath)) return []
    const entries = fs.readdirSync(basePath, { withFileTypes: true })
    return entries
        .filter(entry => entry.isFile() && entry.name.endsWith('.mdx'))
        .map(entry => ({
            slug: entry.name.replace(/\.mdx$/, ''),
        }))
}
