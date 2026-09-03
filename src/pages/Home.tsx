import { Hero } from '../components/Hero'
import { Section } from '../components/Section'
import { ExperienceList, EducationList } from '../components/Entries'
import { ProjectCard } from '../components/ProjectCard'
import { Skills } from '../components/Skills'
import { Certifications } from '../components/Certifications'
import { Activity } from '../components/Activity'
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
  const { profile, about, experience, projects, education, certifications, skills, blog } =
    portfolio

  return (
    <main id="main" className="container">
      {/*
        Hero and About share one section so they sit side by side: profile on
        the left, About on the right. Below 900px the grid collapses and About
        drops underneath.
      */}
      <section id="home" className="section intro" aria-label="Introduction">
        <Hero profile={profile} />

        {about.length > 0 && (
          <div className="intro__about" id="about">
            <div className="section__head">
              <h2 className="section__title">About</h2>
            </div>
            <div className="prose">
              {about.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </section>

      {education.length > 0 && (
        <Section id="education" title="Education">
          <EducationList items={education} />
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
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>
      )}

      {skills.length > 0 && (
        <Section id="skills" title="Skills">
          <Skills groups={skills} />
        </Section>
      )}

      {certifications.length > 0 && (
        <Section id="certifications" title="Certifications">
          <Certifications items={certifications} />
        </Section>
      )}

      <Section id="activity" title="Activity">
        <Activity />
      </Section>

      {blog.length > 0 && (
        <Section id="blog" title="Blog">
          <BlogList posts={blog} />
        </Section>
      )}
    </main>
  )
}
