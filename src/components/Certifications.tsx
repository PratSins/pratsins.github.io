import { Icon } from './Icons'
import type { Certification } from '../types'

/**
 * Certifications, one compact card each.
 *
 * A grid is right here where it was wrong for Projects: these entries are all
 * the same shape — a name, an issuer, a link — so equal-height cards line up
 * rather than leaving one stretched beside a short one.
 */
export function Certifications({ items }: { items: Certification[] }) {
  return (
    <ul className="certs">
      {items.map((cert) => (
        <li className="cert" key={cert.name}>
          <span className="cert__badge" aria-hidden="true">
            <Icon name="award" size={21} />
          </span>

          <div>
            <h3 className="cert__name">{cert.name}</h3>
            <p className="cert__issuer">
              {cert.issuer}
              {cert.date ? ` · ${cert.date}` : ''}
            </p>

            {cert.href && (
              <a
                className="link-inline cert__link"
                href={cert.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon name="arrowUpRight" size={16} />
                View credential
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
