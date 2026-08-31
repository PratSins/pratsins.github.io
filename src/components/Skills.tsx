import { BRAND_ICONS } from './SkillIcons'
import type { SkillGroup } from '../types'

/**
 * How the logos are coloured.
 *   'brand' — each logo in its official colour (Go cyan, MongoDB green, …)
 *   'ink'   — monochrome, matching the rest of the site
 * Change this one word to switch the whole section.
 */
const LOGO_COLOUR: 'brand' | 'ink' = 'brand'

/**
 * Logos that get a disc behind them, and which colour it is.
 *
 * Several brand marks are drawn in light colours meant for a white page —
 * Go's and React's cyan, Spring's and MongoDB's green, scikit-learn's orange.
 * On mustard they wash out. A disc gives them the background they were
 * designed for, and reads as deliberate rather than accidental.
 *
 * A logo not listed here is drawn straight onto the pill, which is right for
 * the already-dark marks (TypeScript, PostgreSQL, PyTorch, NumPy, pandas).
 *
 * The three colours are defined in theme.css.
 */
const DISC_LOGOS: Record<string, string> = {
  go: 'var(--logo-disc-go)',
  java: 'var(--logo-disc-light)',
  spring: 'var(--logo-disc-grey)',
  postgresql: 'var(--logo-disc-grey)',
  gcp: 'var(--logo-disc)',
  react: 'var(--logo-disc)',
  mongodb: 'var(--logo-disc)',
  scikitlearn: 'var(--logo-disc)',
  opencv: 'var(--logo-disc-grey)',
}

export function Skills({ groups }: { groups: SkillGroup[] }) {
  /* One group renders as a bare row of pills. Two or more and each row gets
     a small label above it. */
  const showLabels = groups.length > 1

  return (
    <div>
      {groups.map((group) => (
        <div key={group.name} className="skill-group">
          {showLabels && <p className="skill-group__name">{group.name}</p>}
          <ul className="skills">
            {group.items.map((skill) => {
              const brand = skill.icon ? BRAND_ICONS[skill.icon] : undefined
              const disc = skill.icon ? DISC_LOGOS[skill.icon] : undefined
              return (
                <li className="skill" key={skill.name}>
                  {brand && (
                    <span
                      className={`skill__logo${disc ? ' skill__logo--disc' : ''}`}
                      style={disc ? { background: disc } : undefined}
                    >
                    <svg
                      viewBox={brand.viewBox}
                      width="17"
                      height="17"
                      aria-hidden="true"
                      focusable="false"
                    >
                      {brand.paths.map((segment, index) => (
                        <path
                          key={index}
                          d={segment.d}
                          /* Multi-colour logos carry their own fills; flat
                             ones fall back to the brand colour. 'ink' mode
                             overrides both. */
                          fill={
                            LOGO_COLOUR === 'ink'
                              ? 'currentColor'
                              : (segment.fill ?? brand.hex)
                          }
                        />
                      ))}
                    </svg>
                    </span>
                  )}
                  {skill.name}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
