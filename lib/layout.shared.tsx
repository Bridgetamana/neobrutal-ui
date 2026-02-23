import { logo } from "@/components/logo";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { GitHubButton } from "@/components/github-button"

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          {logo}
          <span className="font-medium sr-only">Neobrutal</span>
        </>
      ),
    },
    links: [
      {
        type: "custom",
        children: 
          <GitHubButton />
        ,
        secondary: true,
      },
    ],
  };
}
