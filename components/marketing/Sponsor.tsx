import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Sponsor() {
  return (
    <section className="border-b-2 border-black bg-main">
      <div className="container mx-auto px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Help Neobrutal UI grow
          </h2>
          <p className="mb-6 text-base font-medium md:text-lg">
            Sponsor the project and help fund better components, documentation,
            and accessibility for everyone.
          </p>
          <Button
            asChild
            className="h-12 px-8 text-base font-bold"
            variant="default"
          >
            <Link
              href="https://github.com/sponsors/Bridgetamana"
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a Sponsor
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
