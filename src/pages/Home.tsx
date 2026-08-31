import { Hero } from '../components/Hero'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { ExperienceList, EducationList } from '../components/Entries'
import { ProjectCard } from '../components/ProjectCard'
import { Skills } from '../components/Skills'
import { BlogList } from '../components/Blog'
import { portfolio } from '../data/portfolio'

/**
 * The single-page home view.
 *
 * Every section is wrapped in a check — if you empty out `blog` in
 * portfolio.ts, the Blog section disappears instead of leaving a stray
 * heading behind. The top bar hides its link to match (see App.tsx).
 */
export function Home() {
  const { profile, about, experience, projects, education, skills, blog } = portfolio

  return (
    <main id="main" className="container">
      <Hero profile={profile} />

      {about.length > 0 && (
        <Section id="about" title="About">
          <Reveal>
            <div className="prose">
              {about.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      {experience.length > 0 && (
        <Section id="experience" title="Experience">
          <ExperienceList items={experience} />
        </Section>
      )}

      {projects.length > 0 && (
        <Section id="projects" title="Projects" count={projects.length}>
          <div className="projects">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 90}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {education.length > 0 && (
        <Section id="education" title="Education">
          <EducationList items={education} />
        </Section>
      )}

      {skills.length > 0 && (
        <Section id="skills" title="Skills">
          <Skills groups={skills} />
        </Section>
      )}

      {blog.length > 0 && (
        <Section id="blog" title="Blog">
          <BlogList posts={blog} />
        </Section>
      )}
    </main>
  )
}
