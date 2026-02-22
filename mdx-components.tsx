import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ChangelogContent } from '@/components/docs/changelog-content';
import { Preview } from '@/components/docs/preview';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ChangelogContent,
    Preview,
    ...components,
  };
}