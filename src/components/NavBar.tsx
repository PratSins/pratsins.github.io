import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon, isIconName } from './Icons'
import { useScrollSpy } from '../lib/useScrollSpy'
import type { NavItem } from '../types'

interface NavBarProps {
  items: NavItem[]
}

/**
 * The sticky top bar.
 *
 * The links are ordinary HTML jump links — <a href="#about"> — exactly like
 * the plain-HTML version you had in mind. The browser does the scrolling
 * itself; `scroll-behavior: smooth` in theme.css makes it glide, and each
 * section's `scroll-margin-top` stops this bar from covering the heading.
 *
 * The one wrinkle: on a project page the URL is /projects/something, so a
 * bare "#about" would point at a section that isn't on screen. There we
 * link to "/#about" instead, which loads the home page and then jumps.
 */
export function NavBar({ items }: NavBarProps) {
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  // Memoised so the observer inside useScrollSpy isn't torn down every render.
  const ids = useMemo(() => items.map((item) => item.id), [items])
  const activeId = useScrollSpy(ids)

  return (
    <header className="topbar">
      <nav className="container topbar__inner" aria-label="Sections">
        {items.map((item) => {
          const icon = isIconName(item.icon) ? item.icon : 'link'
          const content = (
            <>
              <Icon name={icon} size={19} />
              <span>{item.label}</span>
            </>
          )

          return onHome ? (
            <a
              key={item.id}
              className="topbar__link"
              href={`#${item.id}`}
              aria-current={activeId === item.id ? 'true' : undefined}
            >
              {content}
            </a>
          ) : (
            <Link key={item.id} className="topbar__link" to={`/#${item.id}`}>
              {content}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
