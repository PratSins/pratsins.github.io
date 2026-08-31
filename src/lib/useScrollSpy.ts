import { useEffect, useState } from 'react'

/**
 * Returns the id of the section you are currently looking at, so the top bar
 * can highlight the matching link.
 *
 * The rule is deliberately simple: the active section is the LAST one whose
 * top edge has scrolled above the sticky bar. So the moment a heading tucks
 * under the bar, its tab lights up — no scrolling past it first.
 *
 * IntersectionObserver is used only as a cheap trigger for "something moved,
 * re-check". The decision itself reads live positions, because an observer
 * entry's boundingClientRect is a snapshot from whenever it last fired and
 * goes stale as you keep scrolling.
 */
export function useScrollSpy(ids: string[], offset = 96): string {
  const [spyId, setSpyId] = useState(ids[0] ?? '')
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    if (ids.length === 0) return

    /* Sections sit flush against each other, so exactly one of them owns the
       line just under the bar. Walking in document order, the last one whose
       top has crossed that line is the one on screen. */
    const pick = () => {
      const line = offset + 8 // a few px of tolerance
      let current = ids[0]
      for (const id of ids) {
        const element = document.getElementById(id)
        if (!element) continue
        if (element.getBoundingClientRect().top <= line) current = id
        else break
      }
      setSpyId(current)
    }

    const observer = new IntersectionObserver(pick, {
      /* A band from just under the sticky bar down to 40% of the viewport.
         Because sections are adjacent, one leaving the top of this band is
         the same instant the next one's heading passes under the bar — which
         is exactly when we want to re-check. */
      rootMargin: `-${offset}px 0px -60% 0px`,
      threshold: 0,
    })

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)
    nodes.forEach((node) => observer.observe(node))

    pick() // set the correct tab on first paint, e.g. after a deep link

    /*
     * The last-section problem: a short final section can never reach the
     * line above, because the page runs out of room to scroll. This 1px
     * marker sits after everything else — when it appears, you are at the
     * true bottom and the final tab wins regardless.
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

  return atBottom ? (ids[ids.length - 1] ?? spyId) : spyId
}
