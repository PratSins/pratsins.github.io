/**
 * Shapes for everything in src/data/portfolio.ts.
 *
 * You do not need to touch this file to change your content — it only
 * describes what fields exist, so your editor autocompletes them and
 * warns you if a required one is missing.
 */

export type SocialKind =
  | 'email'
  | 'github'
  | 'twitter'
  | 'linkedin'
  | 'website'
  | 'resume'
  | 'leetcode'

export interface SocialLink {
  kind: SocialKind
  /** Text shown next to the icon. */
  label: string
  /** Use "mailto:you@example.com" for email. */
  href: string
}

export interface Profile {
  name: string
  role: string
  location: string
  /** Path inside /public, e.g. "/images/avatar.jpg" */
  avatar: string
  /** Shows the green "Open to work" badge when true. */
  openToWork: boolean
  openToWorkLabel: string
  /**
   * Optional pill shown to the LEFT of the "Open to work" badge. Clicking it
   * jumps to a section — set `href` to '#experience', '#projects', etc.
   * Remove the whole block to hide it.
   */
  currentRole?: {
    label: string
    href: string
  }
  socials: SocialLink[]
}

export interface ExperienceItem {
  title: string
  company: string
  /** Optional — renders the ↗ arrow and makes the title a link. */
  companyUrl?: string
  /** Free text, e.g. "March 2022" */
  start: string
  /** Free text, e.g. "Present" */
  end: string
  /** A sentence or two of context, shown above the bullets. */
  description: string
  /**
   * Bullet points, one string each — no "•" characters, the styling adds
   * those. Leave it out entirely if the description says enough.
   */
  highlights?: string[]
}

export interface EducationItem {
  school: string
  /** Shown on the right of the card, opposite the school name. Optional. */
  location?: string
  start: string
  end: string
  degree: string
  description?: string
}

export type ProjectStatus = 'live' | 'coming-soon' | 'archived'

export interface ProjectLink {
  label: string
  href: string
  kind?: 'website' | 'github' | 'demo' | 'docs'
}

export interface ProjectSection {
  heading: string
  /** Each string is one paragraph. */
  body: string[]
}

export interface Project {
  /** URL-safe id. The detail page lives at /projects/<slug>. */
  slug: string
  title: string
  category: string
  /** ISO date string, e.g. "2025-06-25" */
  date: string
  status: ProjectStatus
  /** Path inside /public, e.g. "/images/projects/my-project.jpg" */
  image: string
  /** Alt text for the card image — keep it descriptive. */
  imageAlt: string
  tags: string[]
  /** One or two sentences, shown on the card. */
  summary: string
  links: ProjectLink[]
  /** Long-form content for the /projects/<slug> page. Optional. */
  detail?: {
    intro: string
    sections: ProjectSection[]
  }
}

export interface BlogPost {
  title: string
  description: string
  /** External URL, or an internal path like "/blog/my-post". */
  href: string
  date?: string
  /** true = opens in a new tab and shows the ↗ arrow. */
  external?: boolean
}

export interface SkillItem {
  name: string
  /**
   * Slug of a logo in src/components/SkillIcons.tsx (e.g. 'go', 'react').
   * Leave it out and the pill simply shows text, which is fine.
   */
  icon?: string
}

export interface SkillGroup {
  /** Row label, e.g. "Backend & Cloud". Hidden when there is only one group. */
  name: string
  items: SkillItem[]
}

export interface NavItem {
  /** Must match a section id rendered on the home page. */
  id: string
  label: string
  icon: string
}

export interface PortfolioData {
  profile: Profile
  about: string[]
  experience: ExperienceItem[]
  projects: Project[]
  education: EducationItem[]
  skills: SkillGroup[]
  blog: BlogPost[]
  nav: NavItem[]
  footer: {
    text: string
    linkLabel?: string
    linkHref?: string
  }
}

/**
 * Shape of src/data/contributions.json, written by `npm run contributions`.
 *
 * Stored compactly: only the daily counts, plus the first date and its
 * weekday. Each cell's date and grid position is derived from those, which
 * keeps the file near 1 KB instead of repeating a date string 366 times.
 */
export interface Contributions {
  username: string
  /** Total contributions across the whole range. */
  total: number
  /** ISO date of the first cell. */
  from: string
  /** ISO date of the last cell. */
  to: string
  /** Weekday of `from`. 0 = Sunday, matching the grid's top row. */
  startWeekday: number
  /** One entry per day, consecutive from `from`. */
  counts: number[]
  generatedAt: string
}
