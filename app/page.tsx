import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/home/hero"
import { StatsSection } from "@/components/home/stats"
import { ColorThemePicker } from "@/components/home/color-theme-picker"
import { Sponsor } from "@/components/home/Sponsor"

export default function Home() {
  return (
    <div className="min-h-screen bg-bg font-sans text-black selection:bg-main selection:text-black">
      <SiteHeader />
      <main>
        <HeroSection />
        <StatsSection />
        <Sponsor />
        <SiteFooter />
      </main>
      <ColorThemePicker />
    </div>
  );
}
