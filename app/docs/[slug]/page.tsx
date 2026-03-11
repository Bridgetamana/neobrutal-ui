import { getMdxBySlug, getAllMdxSlugs } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { mdxComponents } from '@/lib/mdx-components'
import { EditPageLink } from '@/components/docs/edit-page-link'

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

export async function generateStaticParams() {
    const slugs = await getAllMdxSlugs('docs')
    return slugs
        .filter(({ slug }) => slug !== 'introduction')
        .map(({ slug }) => ({ slug }))
}

export default async function DocsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    let content: string
    let frontmatter: Record<string, string>
    try {
        const result = await getMdxBySlug(slug, 'docs')
        content = result.content
        frontmatter = result.frontmatter as Record<string, string>
    } catch {
        notFound()
    }

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
        </div>
    )
}
