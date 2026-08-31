import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently nearest the top of the viewport,
 * so the top bar can highlight the matching link as you scroll.
 *
 * Like <Reveal>, this uses IntersectionObserver instead of a scroll handler.
 * A scroll handler fires dozens of times per second and would make the page
 * feel heavy; the observer only wakes up when a section actually crosses
 * the line we care about.
 */
export function useScrollSpy(ids: string[], offset = 96): string {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    if (ids.length === 0) return

    const visible = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top)
          } else {
            visible.delete(entry.target.id)
          }
        }

        if (visible.size === 0) return

        // Of the sections on screen, pick the one highest up the page.
        let best = ''
        let bestTop = Infinity
        for (const [id, top] of visible) {
          if (top < bestTop) {
            bestTop = top
            best = id
          }
        }
        if (best) setActiveId(best)
      },
      {
        // Shrink the observation box so a section counts as "active" only
        // once it has cleared the sticky bar.
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: 0,
      },
    )

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [ids, offset])

  return activeId
}
