import { Reveal } from './Reveal'
import type { SkillGroup } from '../types'

export function Skills({ groups }: { groups: SkillGroup[] }) {
  /* A single group renders as one bare row of pills, matching the reference.
     Two or more groups each get a small label above them. */
  const showLabels = groups.length > 1

  return (
    <div>
      {groups.map((group, i) => (
        <Reveal key={group.name} className="skill-group" delay={i * 80}>
          {showLabels && <p className="skill-group__name">{group.name}</p>}
          <ul className="skills">
            {group.items.map((skill) => (
              <li className="skill" key={skill}>
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  )
}
