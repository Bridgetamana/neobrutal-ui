"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/home/hero"
import { StatsSection } from "@/components/home/stats"
import { ColorThemePicker } from "@/components/home/color-theme-picker"

export default function Home() {
  return (
    <div className="min-h-screen bg-bg font-sans text-text selection:bg-pastel-purple selection:text-text">
      <SiteHeader />
      <main>
        <HeroSection />
        <StatsSection />
        <SiteFooter />
      </main>
      <ColorThemePicker />
    </div>
  )
}
