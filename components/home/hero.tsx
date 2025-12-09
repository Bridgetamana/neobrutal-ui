"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    ArrowRightIcon,
    WarningIcon,
    HeartIcon,
    TrendUpIcon,
    ShareNetworkIcon
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const Marquee = ({ className, children }: { className?: string, children: React.ReactNode }) => {
    return (
        <div className={cn("flex overflow-hidden select-none", className)}>
            <div className={cn("flex min-w-full shrink-0 gap-4 items-center animate-marquee pr-4")}>
                {children}
            </div>
            <div className={cn("flex min-w-full shrink-0 gap-4 items-center animate-marquee pr-4")}>
                {children}
            </div>
        </div>
    )
}

export function HeroSection() {
    return (
        <section className="relative pt-20 pb-0 md:pt-32 overflow-hidden min-h-dvh min-h-vh flex flex-col justify-center">
            <div className="container mx-auto px-4 md:px-8 text-center relative z-10 mb-10">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[0.9]">
                    Make It <br />
                    <span className="text-main relative inline-block">
                        Pop
                    </span>
                    Like That.
                </h1>
                <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto mb-6 text-black/80">
                    The component library that refuses to be boring.
                    Accessible, customizable, and unapologetically bold.
                </p>
                <Link href="/docs/components">
                    <Button className="h-14 px-8 text-lg font-bold shadow-brutal hover:bg-main">
                        Start Building <ArrowRightIcon weight="bold" className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
            </div>
            <Marquee>
                <Card className="w-44 shrink-0 bg-pastel-green border-2 border-black shadow-brutal">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-sm uppercase">Revenue</CardTitle>
                            <TrendUpIcon weight="bold" className="w-5 h-5" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black">$8,420</div>
                        <div className="text-xs font-bold mt-1">+12.5% vs last week</div>
                    </CardContent>
                </Card>
                <div className="flex gap-2">
                    <Button size="icon" className="rounded-full w-12 h-12 border-2 shadow-brutal bg-pastel-yellow text-black hover:translate-y-1 hover:shadow-none">
                        <HeartIcon weight="fill" className="w-6 h-6" />
                    </Button>
                    <Button size="icon" className="rounded-full w-12 h-12 border-2 shadow-brutal bg-pastel-blue text-black hover:translate-y-1 hover:shadow-none">
                        <ShareNetworkIcon weight="bold" className="w-6 h-6" />
                    </Button>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white border-2 border-black shadow-brutal rounded-base min-w-[250px]">
                    <Avatar className="w-12 h-12 border-2 border-black">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>UI</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-bold">Jane Doe</div>
                        <div className="text-xs font-medium text-gray-500">@janedoe</div>
                    </div>
                </div>
                <Switch className="data-[state=checked]:bg-black" />
                <Input placeholder="Enter your email..." />
                <div className="flex gap-2">
                    <Badge variant="default" className="bg-pastel-red text-black border-2 border-black">New</Badge>
                    <Badge variant="outline" className="bg-white text-black border-2 border-black rounded-4xl">Featured</Badge>
                </div>
                <Alert className="w-full bg-pastel-red border-2 border-black shadow-brutal">
                    <WarningIcon className="h-5 w-5" />
                    <AlertTitle className="font-bold">Heads up!</AlertTitle>
                    <AlertDescription>
                        Your session is about to expire.
                    </AlertDescription>
                </Alert>
            </Marquee>
        </section>
    )
}
