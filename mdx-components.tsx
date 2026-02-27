import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ChangelogContent } from '@/components/docs/changelog-content';
import { Preview } from '@/components/docs/preview';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ChangelogContent,
    Preview,
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 className="text-2xl font-bold mt-10 mb-4 text-black border-0 pb-0" {...props} />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3 className="text-xl font-bold mt-8 mb-3 text-black border-0 pb-0" {...props} />
    ),
    ...components,
  };
}