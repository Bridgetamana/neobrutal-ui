export function StatsSection() {
    return (
        <section className="border-y-2 border-black bg-white">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">
                    <div className="flex flex-col items-center justify-center py-8 px-2">
                        <span className="text-4xl md:text-5xl font-bold mb-2">20+</span>
                        <span className="text-lg">Components</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-8 px-2">
                        <span className="text-4xl md:text-5xl font-bold mb-2">2</span>
                        <span className="text-lg">Formats (React + HTML)</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-8 px-2">
                        <span className="text-4xl md:text-5xl font-bold mb-2">MIT</span>
                        <span className="text-lg">Open Source License</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
