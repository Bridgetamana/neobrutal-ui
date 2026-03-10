import { getMdxBySlug } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Metadata } from 'next'
import { mdxComponents } from '@/lib/mdx-components'
import { EditPageLink } from '@/components/docs/edit-page-link'

export const metadata: Metadata = {
    title: "Introduction",
    description: "Neobrutal UI is a free, open-source collection of Neobrutalist React components built with Base UI and Tailwind CSS.",
}

export default async function DocsPage() {
    const { content, frontmatter } = await getMdxBySlug('introduction', 'docs')

    return (
        <div className="space-y-8 text-black">
            <header>
                <h1 className="text-3xl font-semibold md:text-4xl text-black">{frontmatter.title}</h1>
            </header>

            <div className="space-y-6">
                <MDXRemote source={content} components={mdxComponents} />
            </div>

            <EditPageLink editPath="content/docs/introduction.mdx" />
        </div>
    )
}
