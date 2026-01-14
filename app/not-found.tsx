"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "@phosphor-icons/react"

export default function NotFound() {
    return (
        <div className="min-h-vh min-h-dvh flex flex-col items-center justify-center bg-bg text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Page Not Found
            </h2>

            <p className="max-w-md mb-6">
            
                This page doesn&apos;t exist or has been moved. Please check the URL or return to the homepage.
            </p>

            <Link href="/">
                <Button className="h-12 px-6 font-bold shadow-brutal hover:bg-main">
                    <ArrowLeftIcon className="mr-2 h-4 w-4" weight="bold" />
                    Return Home
                </Button>
            </Link>
        </div>
    )
}
