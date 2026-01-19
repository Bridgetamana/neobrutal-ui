"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface DocsTemplateProps {
  children: React.ReactNode;
}

export default function DocsTemplate({ children }: DocsTemplateProps) {
  const pathname = usePathname();
  const githubUrl = new URL("https://github.com");
  githubUrl.pathname = `/Bridgetamana/neobrutal-ui/blob/main/app${pathname}/page.tsx`;

  return (
    <div className="flex flex-col">
      {children}
      <Link
        href={githubUrl}
        target="_blank"
        className="text-xs font-bold text-main"
      >
        Edit this page on GitHub
      </Link>
    </div>
  );
}
