import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import { Reveal } from './Reveal'
import type { BlogPost } from '../types'

export function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="entry-list">
      {posts.map((post, i) => (
        <Reveal key={post.href} delay={i * 70}>
          <article className="entry">
            <h3 className="entry__title">
              {post.external ? (
                <a href={post.href} target="_blank" rel="noreferrer noopener">
                  {post.title}
                  <Icon name="arrowUpRight" size={18} />
                </a>
              ) : (
                <Link to={post.href}>
                  {post.title}
                  <Icon name="arrowUpRight" size={18} />
                </Link>
              )}
            </h3>
            {post.date && <p className="entry__dates">{post.date}</p>}
            <p className="entry__body">{post.description}</p>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
