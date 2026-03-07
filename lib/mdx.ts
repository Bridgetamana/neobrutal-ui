import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_PATH = path.join(process.cwd(), 'content/docs/components')

export async function getMdxBySlug(slug: string) {
    const realSlug = slug.replace(/\.mdx$/, '')
    const filePath = path.join(CONTENT_PATH, `${realSlug}.mdx`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
        frontmatter: data,
        content
    }
}

export async function getAllMdxSlugs() {
    if (!fs.existsSync(CONTENT_PATH)) return []
    const paths = fs.readdirSync(CONTENT_PATH)
    return paths.filter(path => path.endsWith('.mdx')).map(pathname => ({
        slug: pathname.replace(/\.mdx$/, ''),
    }))
}
