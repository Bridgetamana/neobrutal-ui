import { getMdxBySlug, getAllMdxSlugs } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PropsTable } from "@/components/docs/props-table"
import { Button } from "@/components/ui/button"

const components = {
    h1: (props: any) => <h1 className="text-3xl font-semibold md:text-4xl mt-8 mb-4 text-black" {...props} />,
    h2: (props: any) => <h2 className="text-xl font-semibold mt-8 mb-4 group flex items-center text-black" {...props} />,
    h3: (props: any) => <h3 className="text-lg font-semibold mt-6 mb-3 text-black" {...props} />,
    p: (props: any) => <p className="text-base text-black leading-relaxed" {...props} />,
    a: (props: any) => <a className="text-black underline underline-offset-4 font-semibold hover:text-black/70 transition-colors" {...props} />,
    ul: (props: any) => <ul className="list-disc list-inside space-y-2 my-4 text-black" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-inside space-y-2 my-4 text-black" {...props} />,
    code: (props: any) => <code className="font-mono text-sm bg-bg border-2 border-black rounded-base px-1.5 py-0.5 font-bold text-black" {...props} />,
    ComponentPreview,
    CodeBlock,
    PropsTable,
    Button
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    try {
        const p = await params
        const { frontmatter } = await getMdxBySlug(p.slug)
        return {
            title: frontmatter.title,
            description: frontmatter.description
        }
    } catch (e) {
        return {}
    }
}

export async function generateStaticParams() {
    const slugs = await getAllMdxSlugs()
    return slugs.map(({ slug }) => ({ slug }))
}

export default async function ComponentDocPage({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const p = await params
        const { content, frontmatter } = await getMdxBySlug(p.slug)

        return (
            <div className="space-y-8 text-black">
                <header>
                    <h1 className="text-3xl font-semibold md:text-4xl text-black">{frontmatter.title}</h1>
                    {frontmatter.description && (
                        <p className="text-base text-black mt-4">{frontmatter.description}</p>
                    )}
                </header>

                <div className="space-y-6">
                    <MDXRemote source={content} components={components} />
                </div>
            </div>
        )
    } catch (e) {
        return notFound()
    }
}
