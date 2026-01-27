import Link from "next/link"
import { Button } from "@/components/ui/button"

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
                <Button className="h-12 px-6">
                    <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path></svg>
                    Return Home
                </Button>
            </Link>
        </div>
    )
}
