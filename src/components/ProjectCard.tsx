import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import type { IconName } from './Icons'
import type { Project, ProjectLink, ProjectStatus } from '../types'

const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: 'Live',
  'coming-soon': 'Coming soon',
  archived: 'Archived',
}

const LINK_ICON: Record<NonNullable<ProjectLink['kind']>, IconName> = {
  website: 'website',
  github: 'github',
  demo: 'arrowUpRight',
  docs: 'resume',
}

/** Formats "2025-06-25" without pulling in a date library. */
function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-CA') // → 2025-06-25
}

export function ProjectCard({ project }: { project: Project }) {
  const hasDetail = Boolean(project.detail)
  const detailPath = `/projects/${project.slug}`

  return (
    <article className="project">
      <div className="project__media">
        <img
          className="project__img"
          src={project.image}
          alt={project.imageAlt}
          /* Below the fold — let the browser defer these. */
          loading="lazy"
          decoding="async"
        />
        <span className={`project__status project__status--${project.status}`}>
          <span className="project__status-dot" aria-hidden="true" />
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      <div className="project__body">
        <p className="project__meta">
          <span>{project.category}</span>
          <span className="project__meta-sep" aria-hidden="true">
            &middot;
          </span>
          <time dateTime={project.date}>{formatDate(project.date)}</time>
        </p>

        <h3 className="project__title">
          {hasDetail ? <Link to={detailPath}>{project.title}</Link> : project.title}
        </h3>

        {project.summary && <p className="project__summary">{project.summary}</p>}

        {project.tags.length > 0 && (
          <ul className="tags" aria-label="Technologies used">
            {project.tags.map((tag) => (
              <li className="tag" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="project__links">
          {hasDetail && (
            <Link className="link-inline" to={detailPath}>
              <Icon name="arrowUpRight" size={17} />
              Read more
            </Link>
          )}
          {project.links.map((link) => (
            <a
              key={link.href + link.label}
              className="link-inline"
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon name={LINK_ICON[link.kind ?? 'website']} size={17} />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}
