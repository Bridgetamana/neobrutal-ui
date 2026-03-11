"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  text: string
  level: number
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
}

export function OnThisPage() {
  const pathname = usePathname()
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const content = document.querySelector("[data-docs-content]")
    if (!content) return

    const elements = content.querySelectorAll<HTMLElement>("h2, h3")
    const items: TocItem[] = []

    elements.forEach((el) => {
      if (!el.id) el.id = slugify(el.textContent || "")
      if (el.id) {
        items.push({
          id: el.id,
          text: el.textContent?.trim() || "",
          level: el.tagName === "H2" ? 2 : 3,
        })
      }
    })

    let isInitialCallback = true

    const observer = new IntersectionObserver(
      (entries) => {
        if (isInitialCallback) {
          setHeadings(items)
        }

        const visible = entries.filter((e) => e.isIntersecting)

        if (visible.length > 0) {
          visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )
          setActiveId(visible[0].target.id)
        } else if (isInitialCallback && items.length > 0) {
          setActiveId(items[0].id)
        }

        isInitialCallback = false
      },
      { rootMargin: "0px 0px -80% 0px" }
    )

    elements.forEach((el) => {
      if (el.id) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [pathname])

  if (headings.length === 0) return null

  return (
    <aside className="hidden xl:block">
      <nav className="sticky top-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
        <p className="text-sm font-semibold mb-3">On This Page</p>
        <ul className="text-[13px]">
          {headings.map((heading, i) => {
            const isActive = activeId === heading.id
            const isLast = i === headings.length - 1

            return (
              <li key={heading.id} className="relative flex items-center min-h-7">
                {/* Vertical stem — runs full height except for the last item */}
                {!isLast && (
                  <span className="absolute left-1.25 top-1/2 bottom-0 w-px bg-black/10" />
                )}

                {/* L-bend: top-to-middle vertical + short horizontal arm */}
                <span
                  className={cn(
                    "absolute left-1.25 top-0 h-1/2 w-3 border-l border-b rounded-bl-sm transition-colors",
                    isActive ? "border-black/50" : "border-black/10"
                  )}
                />

                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: "smooth",
                    })
                    setActiveId(heading.id)
                  }}
                  className={cn(
                    "relative pl-5 py-0.5 transition-colors leading-snug focus-brutal",
                    heading.level === 3 && "pl-7 text-[12px]",
                    isActive
                      ? "text-black font-medium"
                      : "text-black/60 hover:text-black/80"
                  )}
                >
                  {heading.text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
