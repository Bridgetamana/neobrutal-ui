import { SiteHeader } from "@/components/site/layout/site-header"
import { SiteFooter } from "@/components/site/layout/site-footer"
import { HeroSection } from "@/components/home/hero"
import { StatsSection } from "@/components/home/stats"
import { ColorThemePicker } from "@/components/site/color-theme-picker"

export default function Home() {
  return (
    <div className="min-h-screen bg-bg font-sans text-black selection:bg-main selection:text-black">
      <SiteHeader />
      <main>
        <HeroSection />
        <StatsSection />
        <SiteFooter />
      </main>
      <ColorThemePicker />
    </div>
  );
}
