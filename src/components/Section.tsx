import type { ReactNode } from 'react'

interface SectionProps {
  /** Becomes the anchor target: <a href="#id"> scrolls here. */
  id: string
  title: string
  /** Optional muted number after the title, e.g. Projects (2). */
  count?: number
  children: ReactNode
}

/** A titled block of the home page, with the underlined heading. */
export function Section({ id, title, count, children }: SectionProps) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div>
        <div className="section__head">
          <h2 className="section__title" id={`${id}-title`}>
            {title}
          </h2>
          {count !== undefined && <span className="section__count">({count})</span>}
        </div>
      </div>
      {children}
    </section>
  )
}
