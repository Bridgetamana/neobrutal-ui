import { logo } from "@/components/shared/logo";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { GithubInfo } from 'fumadocs-ui/components/github-info';

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
        type: 'custom',
        children: <GithubInfo owner="Bridgetamana" repo="neobrutal-ui" className="lg:-mx-2" />,
      },
    ],
    themeSwitch: {
      enabled: false,
    },
  };
}
