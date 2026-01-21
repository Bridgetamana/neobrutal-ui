import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Sponsor() {
  return (
    <section className="border-t-2 border-black bg-white">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Help us grow
          </h2>
          <p className="text-base md:text-lg font-medium text-black mb-6">
            Support Neobrutalism UI and help us build better components for everyone.
          </p>
          <Link href="https://github.com/sponsors/Bridgetamana" target="_blank" rel="noopener noreferrer">
            <Button 
              className="h-12 px-8 text-base font-bold"
              variant="default"
            >
              Become a Sponsor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
