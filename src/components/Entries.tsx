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
            <h3 className="entry__title">{item.title}</h3>
            {item.companyUrl ? (
              <a
                className="entry__org entry__org--link"
                href={item.companyUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                {item.company}
                <Icon name="arrowUpRight" size={16} />
              </a>
            ) : (
              <p className="entry__org">{item.company}</p>
            )}
            <p className="entry__dates">
              {item.start} &ndash; {item.end}
            </p>
            <p className="entry__body">{item.description}</p>
            {item.highlights && item.highlights.length > 0 && (
              <ul className="entry__points">
                {item.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
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
