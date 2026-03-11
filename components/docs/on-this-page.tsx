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
        <ul className="space-y-1 text-[13px]">
          {headings.map((heading) => {
            const isActive = activeId === heading.id

            return (
              <li key={heading.id} className={cn(heading.level === 3 && "ml-3")}>
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
                    "block rounded-base px-2 py-1 transition-colors leading-snug focus-brutal",
                    heading.level === 3 && "text-[12px]",
                    isActive
                      ? "bg-main text-black font-medium"
                      : "text-black/70 hover:bg-white hover:text-black"
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
