import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { HeroSection } from "@/components/home/hero"
import { StatsSection } from "@/components/home/stats"
import { ColorThemePicker } from "@/components/home/color-theme-picker"
import { GitHubStars } from "@/components/shared/github-stars"


export default function Home() {
  return (
    <div className="min-h-screen bg-bg font-sans text-black selection:bg-main selection:text-black">
      <SiteHeader githubStars={<GitHubStars owner="bridgetamana" repo="neobrutal-ui" />} />
      <main>
        <HeroSection />
        <StatsSection />
      </main>
      <SiteFooter />
      <ColorThemePicker />
    </div>
  );
}
