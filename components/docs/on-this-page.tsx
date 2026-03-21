"use client"

import { useEffect, useRef, useState } from "react"
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
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const content = document.querySelector("[data-docs-content]")
    if (!content) return

    const elements = Array.from(content.querySelectorAll<HTMLElement>("h2, h3"))
    const usedIds = new Set<string>()
    const items: TocItem[] = []

    elements.forEach((el) => {
      const raw = (el.id || slugify(el.textContent ?? "") || "section").trim()
      let id = raw
      let n = 2
      while (usedIds.has(id)) {
        id = `${raw}-${n++}`
      }
      el.id = id
      usedIds.add(id)
      items.push({ id, text: el.textContent?.trim() ?? "", level: el.tagName === "H2" ? 2 : 3 })
    })

    setHeadings(items)
    if (items.length > 0) setActiveId(items[0].id)

    observerRef.current?.disconnect()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.toggleAttribute("data-visible", entry.isIntersecting)
        })

        const visible = elements.filter((el) => el.hasAttribute("data-visible"))
        if (visible.length > 0) {
          setActiveId(visible[0].id)
        }
      },
      {
        rootMargin: "-10% 0px -65% 0px",
      }
    )

    elements.forEach((el) => observer.observe(el))
    observerRef.current = observer

    return () => observer.disconnect()
  }, [pathname])

  if (headings.length === 0) return null

  return (
    <aside className="hidden xl:block" aria-label="Table of contents">
      <nav className="sticky top-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-black/50 mb-3 px-3">
          On This Page
        </p>
        <ul className="text-sm">
          {headings.map((heading) => {
            const isActive = activeId === heading.id
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" })
                    setActiveId(heading.id)
                  }}
                  className={cn(
                    "flex py-1 leading-snug transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black",
                    heading.level === 2
                      ? "pl-3 border-l-2"
                      : "pl-6 border-l-2",
                    isActive
                      ? "border-black font-medium text-black"
                      : "border-transparent text-black/60 hover:border-black/30 hover:text-black"
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
