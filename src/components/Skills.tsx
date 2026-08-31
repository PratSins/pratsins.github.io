import { Reveal } from './Reveal'
import { BRAND_ICONS } from './SkillIcons'
import type { SkillGroup } from '../types'

/**
 * How the logos are coloured.
 *   'brand' — each logo in its official colour (Go cyan, MongoDB green, …)
 *   'ink'   — monochrome, matching the rest of the site
 * Change this one word to switch the whole section.
 */
const LOGO_COLOUR: 'brand' | 'ink' = 'brand'

export function Skills({ groups }: { groups: SkillGroup[] }) {
  /* One group renders as a bare row of pills. Two or more and each row gets
     a small label above it. */
  const showLabels = groups.length > 1

  return (
    <div>
      {groups.map((group, i) => (
        <Reveal key={group.name} className="skill-group" delay={i * 80}>
          {showLabels && <p className="skill-group__name">{group.name}</p>}
          <ul className="skills">
            {group.items.map((skill) => {
              const brand = skill.icon ? BRAND_ICONS[skill.icon] : undefined
              return (
                <li className="skill" key={skill.name}>
                  {brand && (
                    <svg
                      className="skill__logo"
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
                  )}
                  {skill.name}
                </li>
              )
            })}
          </ul>
        </Reveal>
      ))}
    </div>
  )
}
