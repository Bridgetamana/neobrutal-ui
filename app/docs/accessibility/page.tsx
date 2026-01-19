import Link from "next/link"

export default function AccessibilityPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold md:text-4xl text-black">Accessibility</h1>
            </header>

            <section className="space-y-4">
                <p className="text-base text-black">
                    Components use semantic HTML and are built on{" "}
                    <a href="https://base-ui.com" className="underline font-bold" target="_blank" rel="noopener noreferrer">Base UI</a>{" "}
                    for keyboard navigation, focus management, and screen reader support.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">Focus Indicators</h2>
                <p className="text-base text-black">
                    All interactive components have visible focus states that meet contrast requirements. Modal dialogs trap focus to prevent tabbing outside the dialog.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-black">Motion</h2>
                <p className="text-base text-black">
                    Animations respect <code className="px-1.5 py-0.5 bg-neutral-200 rounded text-base font-mono">prefers-reduced-motion</code>. Users who prefer reduced motion will see minimal or no animations.
                </p>
            </section>

            <section className="border-2 border-black bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
                    <Link href="/docs/theming" className="block p-3 hover:bg-main">
                        <span className="text-lg font-bold">Theming</span>
                        <p className="truncate">Customize the look and feel of Neobrutal UI components</p>
                    </Link>
                    <Link href="/docs/changelog" className="block p-3 hover:bg-main text-right">
                        <span className="text-lg font-bold">Changelog</span>
                        <p className="truncate">See what&apos;s new in each release</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}
