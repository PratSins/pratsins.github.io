import type { PortfolioData } from '../types'

export function Footer({ footer }: { footer: PortfolioData['footer'] }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>{footer.text}</span>
        {footer.linkHref && footer.linkLabel && (
          <a className="footer__link" href={footer.linkHref}>
            {footer.linkLabel}
          </a>
        )}
      </div>
    </footer>
  )
}
