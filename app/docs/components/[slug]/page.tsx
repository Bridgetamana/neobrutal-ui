import { getMdxBySlug, getAllMdxSlugs, getAllMdxDocuments, type MdxFrontmatter } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { EditPageLink } from "@/components/docs/edit-page-link"
import { mdxComponents } from '@/lib/mdx/components'
import { DocPager } from '@/components/docs/doc-pager'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    try {
        const p = await params
        const { frontmatter } = await getMdxBySlug(p.slug)
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
    const slugs = await getAllMdxSlugs()
    return slugs.map(({ slug }) => ({ slug }))
}

export default async function ComponentDocPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    let content: string
    let frontmatter: MdxFrontmatter
    try {
        const result = await getMdxBySlug(slug)
        content = result.content
        frontmatter = result.frontmatter
    } catch {
        notFound()
    }

    const allComponents = await getAllMdxDocuments('components')
    const currentIndex = allComponents.findIndex((doc) => doc.slug === slug)
    const prev = currentIndex > 0
        ? { href: allComponents[currentIndex - 1].href, title: allComponents[currentIndex - 1].frontmatter.title }
        : undefined
    const next = currentIndex >= 0 && currentIndex < allComponents.length - 1
        ? { href: allComponents[currentIndex + 1].href, title: allComponents[currentIndex + 1].frontmatter.title }
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

            <EditPageLink editPath={`content/docs/components/${slug}.mdx`} />
            <DocPager prev={prev} next={next} />
        </div>
    )
}