import Link from "next/link"

const currentYear = new Date().getFullYear()

export function SiteFooter() {
    return (
        <footer className="bg-white py-10">
            <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm font-medium">
                    © {currentYear} <Link href="https://x.com/bridget_amana" target="_blank" className="underline decoration-2 underline-offset-2 hover:bg-main">Bridget Amana</Link>. MIT License.
                </p>
            </div>
        </footer>
    )
}
