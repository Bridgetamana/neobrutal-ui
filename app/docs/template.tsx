"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface DocsTemplateProps {
  children: React.ReactNode;
}

export default function DocsTemplate({ children }: DocsTemplateProps) {
  const pathname = usePathname();

  let editPath: string;
  if (pathname === "/docs") {
    editPath = "content/docs/introduction.mdx";
  } else if (pathname.startsWith("/docs/components/")) {
    const slug = pathname.replace("/docs/components/", "");
    editPath = `content/docs/components/${slug}.mdx`;
  } else {
    const slug = pathname.replace("/docs/", "");
    editPath = `content/docs/${slug}.mdx`;
  }

  const githubUrl = `https://github.com/Bridgetamana/neobrutal-ui/blob/main/${editPath}`;

  return (
    <div className="flex flex-col">
      {children}
      <Link
        href={githubUrl}
        target="_blank"
        className="mt-2 text-sm font-semibold underline"
      >
        Edit this page on GitHub
      </Link>
    </div>
  );
}
