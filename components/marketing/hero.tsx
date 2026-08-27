import Link from "next/link"
import { ArrowRight, Heart, Share2, TrendingUp, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

function ShowcaseItems() {
    return (
        <>
            <Card className="w-44 shrink-0 bg-mint">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm uppercase">Revenue</CardTitle>
                        <TrendingUp className="h-5 w-5" strokeWidth={3} />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-black">$8,420</div>
                    <div className="mt-1 text-xs font-bold">+12.5% vs last week</div>
                </CardContent>
            </Card>

            <div className="flex gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-lemon shadow-brutal">
                    <Heart className="h-6 w-6 fill-black" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-sky shadow-brutal">
                    <Share2 className="h-6 w-6" strokeWidth={3} />
                </div>
            </div>

            <div className="flex min-w-62.5 items-center gap-4 rounded-base border-2 border-black bg-white p-4 shadow-brutal">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-main font-bold">
                    BA
                </div>
                <div>
                    <div className="font-bold">Bridget Amana</div>
                    <div className="text-xs font-medium text-black/60">@bridgetamana</div>
                </div>
            </div>

            <div className="flex h-6 w-11 items-center rounded-full border-2 border-black bg-white p-0.5">
                <span className="h-4 w-4 rounded-full bg-black" />
            </div>

            <div className="flex h-10 w-52 items-center rounded-base border-2 border-black bg-white px-3 text-sm text-black/60">
                you@example.com…
            </div>

            <Badge variant="default" className="bg-hot-pink">New</Badge>

            <div className="flex items-center gap-2 rounded-base border-2 border-black bg-sky p-3 shadow-brutal">
                <span className="flex h-5 w-5 items-center justify-center rounded-base border-2 border-black bg-main text-xs font-black">
                    ✓
                </span>
                <span className="font-medium">Subscribe</span>
            </div>

            <div className="relative h-2 w-40 rounded-full border-2 border-black bg-white">
                <span className="absolute -top-2 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-black bg-main" />
            </div>

            <Alert className="w-full bg-hot-pink">
                <TriangleAlert className="h-5 w-5" />
                <AlertTitle className="font-bold">Heads up!</AlertTitle>
                <AlertDescription>Your session is about to expire.</AlertDescription>
            </Alert>
        </>
    )
}

function ShowcaseMarquee() {
    return (
        <div className="flex select-none overflow-hidden" aria-hidden="true" inert>
            <div className="flex min-w-full shrink-0 animate-marquee items-center gap-3 pr-3 motion-reduce:animate-none">
                <ShowcaseItems />
            </div>
            <div className="flex min-w-full shrink-0 animate-marquee items-center gap-3 pr-3 motion-reduce:hidden">
                <ShowcaseItems />
            </div>
        </div>
    )
}

export function HeroSection() {
    return (
        <section className="relative flex min-h-screen min-h-dvh flex-col justify-center overflow-hidden pb-0 pt-20 md:pt-32">
            <div className="container relative mx-auto mb-10 px-4 text-center md:px-8">
                <h1 className="mb-6 text-[clamp(2.5rem,13vw,4.5rem)] font-bold leading-[0.92] text-balance">
                    Neobrutalism <br />
                    Components
                </h1>
                <p className="mx-auto mb-6 max-w-2xl text-lg font-medium text-black md:text-xl">
                    A collection of Neobrutalism components built with Base UI and Tailwind CSS.
                </p>
                <Button asChild className="h-12 w-full px-6 text-lg font-bold shadow-brutal sm:w-auto sm:px-8">
                    <Link href="/docs/installation">
                        Browse Components
                        <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" strokeWidth={3} />
                    </Link>
                </Button>
            </div>
            <ShowcaseMarquee />
        </section>
    )
}
