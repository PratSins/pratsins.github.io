import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently nearest the top of the viewport,
 * so the top bar can highlight the matching link as you scroll.
 *
 * Uses IntersectionObserver rather than a scroll handler. A scroll handler
 * fires dozens of times per second and would make the page feel heavy; the
 * observer only wakes up when a section actually crosses the line we care
 * about.
 */
export function useScrollSpy(ids: string[], offset = 96): string {
  const [spyId, setSpyId] = useState(ids[0] ?? '')
  const [atBottom, setAtBottom] = useState(false)

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
        if (best) setSpyId(best)
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

    /*
     * The last-section problem.
     *
     * A short final section can never reach the observation band above,
     * because the page simply runs out of room to scroll — so the previous
     * section stays highlighted even though you are looking at the last one.
     *
     * The fix is a 1px marker appended after everything else. When it comes
     * into view you are at the true bottom of the page, and the final nav
     * link wins regardless of what the band says.
     */
    const endMarker = document.createElement('div')
    endMarker.setAttribute('aria-hidden', 'true')
    endMarker.style.cssText = 'height:1px;width:100%;pointer-events:none;'
    document.body.appendChild(endMarker)

    const endObserver = new IntersectionObserver(
      ([entry]) => setAtBottom(entry.isIntersecting),
      { threshold: 0 },
    )
    endObserver.observe(endMarker)

    return () => {
      observer.disconnect()
      endObserver.disconnect()
      endMarker.remove()
    }
  }, [ids, offset])

  // At the bottom of the page the final section always wins.
  return atBottom ? (ids[ids.length - 1] ?? spyId) : spyId
}
