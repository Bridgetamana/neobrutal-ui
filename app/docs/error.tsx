"use client"

import { Button } from "@/components/ui/button"

export default function DocsError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-black/70 mb-6 max-w-md">
                An error occurred while loading this page. Please try again.
            </p>
            {error.digest && (
                <p className="text-xs text-black/40 mb-4 font-mono">
                    Error ID: {error.digest}
                </p>
            )}
            <Button onClick={() => reset()}>Try again</Button>
        </div>
    )
}
