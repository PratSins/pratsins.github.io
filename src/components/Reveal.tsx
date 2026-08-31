import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Milliseconds to stagger this element behind its siblings. */
  delay?: number
  /** Render as something other than a <div>. */
  as?: 'div' | 'li' | 'section' | 'article'
  className?: string
}

/**
 * Fades its children up into place the first time they scroll into view.
 *
 * Uses IntersectionObserver rather than a scroll listener, so the browser
 * does the work off the main thread and the page stays smooth. Once an
 * element has appeared it stops being observed — it never re-animates.
 *
 * Readers who have "reduce motion" enabled see everything immediately;
 * that is handled in app.css, not here.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // No IntersectionObserver (very old browser) — just show the content.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      // Start the animation slightly before the element reaches the viewport.
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
