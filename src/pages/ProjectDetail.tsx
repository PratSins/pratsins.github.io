import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { Reveal } from '../components/Reveal'
import { portfolio } from '../data/portfolio'
import { NotFound } from './NotFound'
import type { IconName } from '../components/Icons'
import type { ProjectLink } from '../types'

const LINK_ICON: Record<NonNullable<ProjectLink['kind']>, IconName> = {
  website: 'website',
  github: 'github',
  demo: 'arrowUpRight',
  docs: 'resume',
}

/**
 * One project's own page, at /projects/<slug>.
 *
 * This is the "extra pages" hook you asked for. Adding a project with a
 * `detail` block in portfolio.ts creates its page automatically — there is
 * no route to register and no file to add.
 */
export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = portfolio.projects.find((candidate) => candidate.slug === slug)

  // Arriving from a card halfway down the home page would otherwise drop
  // you halfway down this one.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [slug])

  useEffect(() => {
    if (!project) return
    const previous = document.title
    document.title = `${project.title} — ${portfolio.profile.name}`
    return () => {
      document.title = previous
    }
  }, [project])

  if (!project) return <NotFound />

  return (
    <main id="main" className="container detail">
      <Link className="detail__back" to="/#projects">
        <Icon name="arrowLeft" size={18} />
        All projects
      </Link>

      <Reveal>
        <h1 className="detail__title">{project.title}</h1>
        <p className="detail__meta">
          <span>{project.category}</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime={project.date}>{project.date}</time>
        </p>

        {project.tags.length > 0 && (
          <ul className="tags" style={{ marginTop: '1.25rem' }} aria-label="Technologies used">
            {project.tags.map((tag) => (
              <li className="tag" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}
      </Reveal>

      <Reveal delay={60}>
        <figure className="detail__hero">
          <img src={project.image} alt={project.imageAlt} loading="eager" decoding="async" />
        </figure>
      </Reveal>

      {project.detail && (
        <>
          <Reveal delay={90}>
            <p className="detail__intro">{project.detail.intro}</p>
          </Reveal>

          {project.detail.sections.map((section, i) => (
            <Reveal key={section.heading} delay={120 + i * 60}>
              <section className="detail__section">
                <h2>{section.heading}</h2>
                <div className="prose">
                  {section.body.map((paragraph, j) => (
                    <p key={j}>{paragraph}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </>
      )}

      {project.links.length > 0 && (
        <Reveal>
          <div className="detail__links">
            {project.links.map((link) => (
              <a
                key={link.href + link.label}
                className="btn"
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon name={LINK_ICON[link.kind ?? 'website']} size={18} />
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>
      )}
    </main>
  )
}
