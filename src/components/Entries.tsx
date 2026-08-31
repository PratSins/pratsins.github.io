import { Icon } from './Icons'
import type { EducationItem, ExperienceItem } from '../types'

/**
 * Experience and Education share one card shape, so they share one component.
 * The translucent panel you see is a hover state — see `.entry` in app.css.
 */

export function ExperienceList({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="entry-list">
      {items.map((item) => (
        <div key={`${item.company}-${item.title}`}>
          <article className="entry">
            <h3 className="entry__title">
              {item.companyUrl ? (
                <a href={item.companyUrl} target="_blank" rel="noreferrer noopener">
                  {item.title}
                  <Icon name="arrowUpRight" size={18} />
                </a>
              ) : (
                item.title
              )}
            </h3>
            <p className="entry__org">{item.company}</p>
            <p className="entry__dates">
              {item.start} &ndash; {item.end}
            </p>
            <p className="entry__body">{item.description}</p>
          </article>
        </div>
      ))}
    </div>
  )
}

export function EducationList({ items }: { items: EducationItem[] }) {
  return (
    <div className="entry-list">
      {items.map((item) => (
        <div key={item.school + item.start}>
          <article className="entry">
            <h3 className="entry__title">{item.school}</h3>
            <p className="entry__dates">
              {item.start} &ndash; {item.end}
            </p>
            <p className="entry__body">
              {item.degree}
              {item.description ? `. ${item.description}` : ''}
            </p>
          </article>
        </div>
      ))}
    </div>
  )
}
