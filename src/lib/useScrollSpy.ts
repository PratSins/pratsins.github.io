import { useEffect, useState } from 'react'

/**
 * Returns the id of the section you are currently looking at, so the top bar
 * can highlight the matching link.
 *
 * The rule: the active section is the LAST one whose top edge has scrolled
 * above the sticky bar. The moment a heading tucks under the bar, its tab
 * lights up.
 *
 * This deliberately uses a scroll listener rather than IntersectionObserver.
 * An observer only fires when a section crosses the edge of its observation
 * band, and that is a *different moment* from when a heading passes under the
 * bar — so between the two the highlight goes stale and lags behind the page.
 * The listener is throttled to one check per animation frame, and each check
 * is a handful of getBoundingClientRect() reads, so the cost is negligible.
 */
export function useScrollSpy(ids: string[], offset = 96): string {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    if (ids.length === 0) return

    const pick = () => {
      /*
       * Bottom of the page first: a short final section can never reach the
       * line, because the page runs out of room to scroll. Without this the
       * last tab could never activate.
       */
      const scrollBottom = window.scrollY + window.innerHeight
      if (scrollBottom >= document.documentElement.scrollHeight - 2) {
        setActiveId(ids[ids.length - 1])
        return
      }

      // Sections sit flush against each other, so exactly one owns the line
      // just under the bar. Walking in order, the last one past it wins.
      const line = offset + 8 // a few px of tolerance
      let current = ids[0]
      for (const id of ids) {
        const element = document.getElementById(id)
        if (!element) continue
        if (element.getBoundingClientRect().top <= line) current = id
        else break
      }
      setActiveId(current)
    }

    // One check per frame at most, no matter how fast the wheel spins.
    let frame = 0
    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        pick()
      })
    }

    pick() // correct tab on first paint, e.g. when arriving at /#skills

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids, offset])

  return activeId
}
