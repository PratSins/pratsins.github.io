import { Icon } from './Icons'
import type { IconName } from './Icons'
import type { Profile, SocialKind } from '../types'

const SOCIAL_ICON: Record<SocialKind, IconName> = {
  email: 'mail',
  github: 'github',
  twitter: 'twitter',
  linkedin: 'linkedin',
  website: 'website',
  resume: 'resume',
  leetcode: 'leetcode',
}

export function Hero({ profile }: { profile: Profile }) {
  return (
    <div className="hero">
      <div className="hero__avatar-wrap">
        <img
          className="hero__avatar"
          src={profile.avatar}
          alt={profile.name}
          width={250}
          height={250}
          /* The avatar is the first thing on screen, so load it eagerly
             and tell the browser to prioritise it. */
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {(profile.currentRole || profile.openToWork) && (
        <div className="hero__badges">
          {/* A plain jump link — clicking it scrolls to the section named in
              currentRole.href, exactly like the top bar does. */}
          {profile.currentRole && (
            <a className="hero__badge hero__badge--link" href={profile.currentRole.href}>
              <Icon name="building" size={15} />
              {profile.currentRole.label}
            </a>
          )}

          {profile.openToWork && (
            <span className="hero__badge">
              <span className="hero__dot" aria-hidden="true" />
              {profile.openToWorkLabel}
            </span>
          )}
        </div>
      )}

      <h1 className="hero__name">{profile.name}</h1>

      <p className="hero__role">
        <Icon name="briefcase" size={19} />
        {profile.role}
      </p>

      {profile.location && (
        <p className="hero__location">
          <Icon name="mapPin" size={18} />
          {profile.location}
        </p>
      )}

      {profile.socials.length > 0 && (
        <nav className="hero__socials" aria-label="Contact and profiles">
          {profile.socials.map((social) => {
            const external = !social.href.startsWith('mailto:')
            return (
              <a
                key={social.kind + social.href}
                className="hero__social"
                href={social.href}
                {...(external
                  ? { target: '_blank', rel: 'noreferrer noopener' }
                  : {})}
              >
                <Icon name={SOCIAL_ICON[social.kind]} size={22} />
                {social.label}
              </a>
            )
          })}
        </nav>
      )}
    </div>
  )
}
