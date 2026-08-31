import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons'

export function NotFound() {
  return (
    <main id="main" className="container notfound">
      <h1>404</h1>
      <p className="prose">That page doesn&rsquo;t exist &mdash; or it moved.</p>
      <Link className="btn" to="/">
        <Icon name="arrowLeft" size={18} />
        Back home
      </Link>
    </main>
  )
}
