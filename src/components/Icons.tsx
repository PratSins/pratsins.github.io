/**
 * Every icon on the site, inlined as SVG.
 *
 * Inlining costs no extra network request and no icon-library dependency,
 * which keeps the page fast. To add one: paste an SVG's inner markup as a
 * new entry below, then use its name in src/data/portfolio.ts.
 *
 * Icon shapes follow the Lucide / Simple Icons conventions on a 24x24 grid.
 */

import type { ReactNode } from 'react'

export type IconName =
  | 'home'
  | 'user'
  | 'briefcase'
  | 'code'
  | 'graduation'
  | 'wrench'
  | 'link'
  | 'mail'
  | 'github'
  | 'twitter'
  | 'linkedin'
  | 'website'
  | 'resume'
  | 'leetcode'
  | 'mapPin'
  | 'arrowUpRight'
  | 'arrowLeft'

/** Brand marks are solid shapes; the rest are drawn with strokes. */
const FILLED = new Set<IconName>(['github', 'twitter', 'linkedin'])

const PATHS: Record<IconName, ReactNode> = {
  home: (
    <>
      <path d="M3 10.6 12 3l9 7.6" />
      <path d="M5 9.8V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.8" />
      <path d="M9.5 21v-6h5v6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-3.9 3.6-6.2 8-6.2s8 2.3 8 6.2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2.5" y="7" width="19" height="13.5" rx="2.5" />
      <path d="M8.5 7V5.5A2.5 2.5 0 0 1 11 3h2a2.5 2.5 0 0 1 2.5 2.5V7" />
      <path d="M2.5 12.5h19" />
    </>
  ),
  code: (
    <>
      <path d="M8.5 5.5 2.5 12l6 6.5" />
      <path d="M15.5 5.5 21.5 12l-6 6.5" />
      <path d="M13.5 3.5 10.5 20.5" />
    </>
  ),
  graduation: (
    <>
      <path d="M12 3.5 2 8.5l10 5 10-5-10-5Z" />
      <path d="M6 11v4.6c0 1.7 2.7 3.1 6 3.1s6-1.4 6-3.1V11" />
      <path d="M22 8.5v5" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.6 6.3a3.9 3.9 0 0 0 5.1 5.1l1.6 1.6a1.4 1.4 0 0 1 0 2l-2.3 2.3a1.4 1.4 0 0 1-2 0l-1.6-1.6a3.9 3.9 0 0 0-5.1-5.1Z" />
      <path d="m10.3 10.6-7 7a1.9 1.9 0 0 0 2.7 2.7l7-7" />
    </>
  ),
  link: (
    <>
      <path d="M10 13.5a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5" />
      <path d="M14 10.5a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 7 7.4 5.3a2 2 0 0 0 2.2 0L20.5 7" />
    </>
  ),
  github: (
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.834 2.81 1.3 3.5.99.11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
  ),
  twitter: (
    <path d="M18.9 2.3h3.4l-7.4 8.5L23.6 22h-6.8l-5.3-7-6.1 7H2l7.9-9.1L1.5 2.3h7l4.8 6.4 5.6-6.4Zm-1.2 17.6h1.9L7.4 4.3H5.4l12.3 15.6Z" />
  ),
  linkedin: (
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  ),
  website: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19" />
      <path d="M12 2.5a15 15 0 0 1 0 19 15 15 0 0 1 0-19Z" />
    </>
  ),
  resume: (
    <>
      <path d="M14 2.5H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5Z" />
      <path d="M14 2.5v5h5" />
      <path d="M8.5 13h7M8.5 17h4.5" />
    </>
  ),
  leetcode: (
    <>
      <path d="M15.6 3.4 8.2 10.8a4.3 4.3 0 0 0 0 6.1l3 3a4.3 4.3 0 0 0 6.1 0l1.4-1.4" />
      <path d="M10.3 13.8h9.4" />
    </>
  ),
  mapPin: (
    <>
      <path d="M20 10.5c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10.3" r="2.9" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7.5 16.5 16.5 7.5" />
      <path d="M8.8 7.5h7.7v7.7" />
    </>
  ),
  arrowLeft: (
    <>
      <path d="M19 12H5" />
      <path d="m11.5 18.5-6.5-6.5 6.5-6.5" />
    </>
  ),
}

interface IconProps {
  name: IconName
  size?: number
  className?: string
}

export function Icon({ name, size = 20, className }: IconProps) {
  const filled = FILLED.has(name)
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={filled ? undefined : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}

/** Narrows an arbitrary string from the data file to a real icon name. */
export function isIconName(value: string): value is IconName {
  return value in PATHS
}
