import { Suspense, lazy, useEffect, useMemo } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { portfolio } from './data/portfolio'

/*
 * The project pages are split into their own JavaScript chunk. Someone who
 * only reads the home page never downloads them.
 */
const ProjectDetail = lazy(() =>
  import('./pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail })),
)

/**
 * Makes "/#about" work when you are arriving from another page.
 *
 * Within the home page the browser handles #anchors natively. But a
 * client-side navigation from /projects/x to /#about changes the URL without
 * the browser ever performing a jump, so we do it here.
 */
function useHashScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    // Wait a frame so the target section has actually rendered.
    const id = requestAnimationFrame(() => {
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(id)
  }, [pathname, hash])
}

export function App() {
  useHashScroll()

  /*
   * Only show a top-bar link if its section actually has content. Empty out
   * `blog` in portfolio.ts and both the section and its link disappear.
   */
  const navItems = useMemo(() => {
    // 'about' is deliberately absent — it renders inside the Home section.
    const present = new Set<string>(['home'])
    if (portfolio.experience.length) present.add('experience')
    if (portfolio.projects.length) present.add('projects')
    if (portfolio.education.length) present.add('education')
    if (portfolio.skills.length) present.add('skills')
    if (portfolio.blog.length) present.add('blog')
    return portfolio.nav.filter((item) => present.has(item.id))
  }, [])

  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <NavBar items={navItems} />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer footer={portfolio.footer} />
    </div>
  )
}
