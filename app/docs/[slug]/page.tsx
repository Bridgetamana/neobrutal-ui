import { getMdxBySlug, getAllMdxSlugs, getAllMdxDocuments, type MdxFrontmatter } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { mdxComponents } from '@/lib/mdx/components'
import { EditPageLink } from '@/components/docs/edit-page-link'
import { DocPager } from '@/components/docs/doc-pager'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    try {
        const p = await params
        const { frontmatter } = await getMdxBySlug(p.slug, 'docs')
        return {
            title: frontmatter.title,
            description: frontmatter.description
        }
    } catch {
        return {}
    }
}

export const dynamicParams = false

export async function generateStaticParams() {
    const slugs = await getAllMdxSlugs('docs')
    return slugs
        .filter(({ slug }) => slug !== 'introduction')
        .map(({ slug }) => ({ slug }))
}

export default async function DocsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    let content: string
    let frontmatter: MdxFrontmatter
    try {
        const result = await getMdxBySlug(slug, 'docs')
        content = result.content
        frontmatter = result.frontmatter
    } catch {
        notFound()
    }

    const allDocs = await getAllMdxDocuments('docs')
    const currentIndex = allDocs.findIndex((doc) => doc.slug === slug)
    const prev = currentIndex > 0
        ? { href: allDocs[currentIndex - 1].href, title: allDocs[currentIndex - 1].frontmatter.title }
        : undefined
    const next = currentIndex >= 0 && currentIndex < allDocs.length - 1
        ? { href: allDocs[currentIndex + 1].href, title: allDocs[currentIndex + 1].frontmatter.title }
        : undefined

    return (
        <div className="space-y-8 text-black">
            <header>
                <h1 className="text-3xl font-semibold md:text-4xl text-black">{frontmatter.title}</h1>
                {frontmatter.description && (
                    <p className="text-base text-black mt-4">{frontmatter.description}</p>
                )}
            </header>

            <div className="space-y-6">
                <MDXRemote source={content} components={mdxComponents} />
            </div>

            <EditPageLink editPath={`content/docs/${slug}.mdx`} />
            <DocPager prev={prev} next={next} />
        </div>
    )
}
