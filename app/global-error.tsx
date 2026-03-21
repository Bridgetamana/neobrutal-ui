"use client"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en">
            <body>
                <div className="min-h-dvh flex flex-col items-center justify-center text-center px-4">
                    <h2 className="text-3xl font-bold mb-2">Something went wrong</h2>
                    <p className="text-black/70 mb-6 max-w-md">
                        An unexpected error occurred. Please try again.
                    </p>
                    {error.digest && (
                        <p className="text-xs text-black/40 mb-4 font-mono">
                            Error ID: {error.digest}
                        </p>
                    )}
                    <button
                        onClick={() => reset()}
                        className="inline-flex items-center justify-center rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-bold shadow-brutal transition-brutal focus-brutal hover:translate-x-px hover:translate-y-px hover:shadow-none"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    )
}
