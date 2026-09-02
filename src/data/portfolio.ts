import type { PortfolioData } from '../types'

/* ============================================================================
 *
 *   👋  THIS IS THE ONLY FILE YOU NEED TO EDIT.
 *
 *   Everything on the site is read from the object below. Change the text,
 *   save the file, and the browser updates instantly (while `npm run dev`
 *   is running).
 *
 *   Images are NOT imported here. They live in the `public/images/` folder
 *   and are referenced by path, e.g. "/images/avatar.jpg". To swap an image,
 *   drop your file into that folder and point the path at it. See
 *   public/images/README.md for the full list of what goes where.
 *
 * ========================================================================== */

export const portfolio: PortfolioData = {
  /* --------------------------------------------------------------------
   * 1. WHO YOU ARE  — the big hero block at the top of the page
   * ------------------------------------------------------------------ */
  profile: {
    name: 'Pratyush Singh',
    // role: 'AI Native Microservices Engineer',
    role: 'Backend & Applied ML Engineer',
    location: 'Bangalore',
    avatar: '/images/avatar.jpeg',
    openToWork: true,
    openToWorkLabel: 'Open to work',
    currentRole: {
      label: 'Currently Employed at SellerApp',
      href: '#experience',
    },
    socials: [
      { kind: 'email', label: 'Email', href: 'mailto:pratyush2002ps@gmail.com' },
      { kind: 'github', label: 'GitHub', href: 'https://github.com/PratSins' },
      // { kind: 'twitter', label: 'Twitter', href: 'https://x.com/yourhandle' },
      // Add more if you like — 'website' also has an icon:
      { kind: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/pratsingh4069' },
      { kind: 'leetcode', label: 'LeetCode', href: 'https://leetcode.com/u/pratyush2024/' },
      { kind: 'resume', label: 'Résumé', href: '/resume.pdf' },
    ],
  },

  /* --------------------------------------------------------------------
   * 2. ABOUT  — each string in the array becomes its own paragraph
   *
   * This renders beside the hero, inside the Home section, so it has no
   * tab of its own in the top bar.
   * ------------------------------------------------------------------ */
  about: [
    'I am a software engineer who enjoys building scalable backend systems and putting AI to work in real products. My work spans microservices, distributed systems, cloud infrastructure, and applied ML — with a focus on turning ideas into reliable, production-ready software.',
    'I am particularly interested in AI-native systems: applications where AI is part of the architecture rather than just an add-on. Whether it\'s building high-performance services, integrating LLMs and computer vision, or designing systems that scale, I enjoy working at the intersection of backend engineering and applied AI.',
  ],

  /* --------------------------------------------------------------------
   * 3. EXPERIENCE  — newest first
   * ------------------------------------------------------------------ */
  experience: [
    {
      title: 'Software Development Engineer (SDE-1)',
      company: 'SellerApp',
      companyUrl: 'https://www.sellerapp.com/',
      start: 'January 2026',
      end: 'Present',
      description:
        'Developed and Optimized Backend Systems, achieving notable improvements in performance and cost efficiency.',
      highlights: [
        'Built Real-time APIs to fetch Amazon SERP data',
        'Designed secure backend APIs following authentication, authorization, and secure coding best practices.',
        'Built WebSocket-based real-time data collection pipelines for faster insights from multiple IP sources.',
        'Automated workflows with Camunda-Zeebe, reducing manual effort by 40% and streamlining processes.',
        'Leveraged AI-assisted development tools to improve development productivity, debugging, documentation, and code quality.',
        'Developed unit and integration tests to ensure reliability and maintainability of backend services.',
      ],
    },
    {
      title: 'Backend Intern',
      company: 'Nimblix Technologies',
      companyUrl: '',
      start: 'July 2025',
      end: 'November 2025',
      description:
        'Developed robust APIs and scalable backend applications using Java Spring Boot.',
      highlights: [
        'Developed robust APIs and scalable applications using Java Spring Boot',
        'Collaborated with a dynamic team to store user data efficiently, ensuring data integrity and accessibility',
      ],
    },
  ],

  /* --------------------------------------------------------------------
   * 4. PROJECTS
   *
   * `slug` becomes the URL of the project's own page: /projects/<slug>.
   * The optional `detail` block is what that page shows — leave it out
   * and the card simply won't link to a detail page.
   * ------------------------------------------------------------------ */
  projects: [
    {
      slug: 'ecommerce-platform',
      title: 'E-commerce Platform',
      category: 'Web Application',
      date: '2025-06-25',
      status: 'live',
      image: '/images/projects/project-one.svg',
      imageAlt: 'Laptop showing the E-commerce Platform storefront',
      tags: ['Next.js', 'TypeScript', 'Stripe', 'GraphQL'],
      summary:
        'A full-stack storefront with a custom checkout, subscription billing and a real-time inventory dashboard.',
      links: [
        { label: 'Website', href: 'https://example.com', kind: 'website' },
        { label: 'Source', href: 'https://github.com/yourhandle/repo', kind: 'github' },
      ],
      detail: {
        intro:
          'A complete rewrite of a legacy storefront, rebuilt for speed and for a checkout flow that converts. This page is a placeholder — replace the sections below with the real story.',
        sections: [
          {
            heading: 'The problem',
            body: [
              'Describe what was broken or missing before you started. What did it cost the business or the user? Concrete numbers land better than adjectives.',
              'Every string in this list is a separate paragraph, so you can write as much as you want.',
            ],
          },
          {
            heading: 'What I built',
            body: [
              'Walk through the architecture and the decisions you actually had to make. Which trade-offs were real? What did you deliberately not build?',
            ],
          },
          {
            heading: 'Results',
            body: [
              'Close with the outcome. Page load went from X to Y, conversion moved by Z, the on-call pager stopped going off at 3am.',
            ],
          },
        ],
      },
    },
    {
      slug: 'lorem-management-platform',
      title: 'Lorem Management Platform',
      category: 'Startup',
      date: '2026-02-17',
      status: 'coming-soon',
      image: '/images/projects/project-two.svg',
      imageAlt: 'Laptop showing the Lorem Management Platform dashboard',
      tags: ['Python', 'ML', 'AI', 'Docker'],
      summary:
        'An internal tool that turns messy operational data into a single dashboard the whole team can act on.',
      links: [{ label: 'Website', href: 'https://example.com', kind: 'website' }],
      detail: {
        intro:
          'A second example, so you can see what two project pages look like side by side.',
        sections: [
          {
            heading: 'Overview',
            body: [
              'Swap this out for the real write-up whenever you are ready. Until then it keeps the page from looking empty.',
            ],
          },
        ],
      },
    },
  ],

  /* --------------------------------------------------------------------
   * 5. EDUCATION  — newest first
   * ------------------------------------------------------------------ */
  education: [
    {
      school: 'Indian Institute of Information Technology, Sri City',
      location: 'Chittoor, Andhra Pradesh',
      start: '2021',
      end: '2025',
      degree: 'B.Tech in Computer Science & Engineering',
      description:
        'Relevant Coursework: Data Structures & Algorithms, Distributed Systems, Databases, Machine Learning, Operating Systems, and Computer Networks.',
    },
    {
      school: 'Don Bosco School, Liluah',
      location: 'Howrah, West Bengal',
      start: 'Graduated in',
      end: '2020',
      degree: 'ISC',
    },
  ],

  /* --------------------------------------------------------------------
   * 6. SKILLS
   *
   * Each group is one labelled row. `icon` is a slug from
   * src/components/SkillIcons.tsx — omit it for a text-only pill.
   * ------------------------------------------------------------------ */
  skills: [
    {
      name: 'Backend & Cloud',
      items: [
        { name: 'Go', icon: 'go' },
        { name: 'Java', icon: 'java' },
        { name: 'Spring Boot', icon: 'spring' },
        { name: 'Google Cloud', icon: 'gcp' },
      ],
    },
    {
      name: 'Frontend',
      items: [
        { name: 'React', icon: 'react' },
        { name: 'TypeScript', icon: 'typescript' },
      ],
    },
    {
      name: 'Databases',
      items: [
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'MongoDB', icon: 'mongodb' },
      ],
    },
    {
      name: 'Machine Learning',
      items: [
        { name: 'PyTorch', icon: 'pytorch' },
        { name: 'scikit-learn', icon: 'scikitlearn' },
        { name: 'OpenCV', icon: 'opencv' },
        { name: 'NumPy', icon: 'numpy' },
        { name: 'pandas', icon: 'pandas' },
      ],
    },
  ],

  /* --------------------------------------------------------------------
   * 7. BLOG / WRITING  — links out, or to your own pages
   * ------------------------------------------------------------------ */
  blog: [
    {
      title: 'How I built this portfolio',
      description:
        'A short write-up of the stack and the decisions behind this site. Point this anywhere — your blog, dev.to, Medium, or a page in this project.',
      href: 'https://example.com/blog/post',
      date: '2026-01-12',
      external: true,
    },
    {
      title: 'Notes on running LLMs in production',
      description:
        'Second placeholder post, so you can see how a list of them stacks up. Swap the title, date and link for something real whenever you are ready.',
      href: 'https://example.com/blog/second-post',
      date: '2026-02-04',
      external: true,
    },
  ],

  /* --------------------------------------------------------------------
   * 8. TOP BAR
   *
   * Each `id` must match a section id on the home page. These are plain
   * anchor / jump links — clicking one scrolls to <section id="...">.
   * Remove an entry to hide it from the bar; the section itself also
   * disappears automatically if its data above is empty.
   *
   * `icon` must be one of the names in src/components/Icons.tsx.
   * ------------------------------------------------------------------ */
  nav: [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'experience', label: 'Experience', icon: 'briefcase' },
    { id: 'projects', label: 'Projects', icon: 'code' },
    { id: 'education', label: 'Education', icon: 'graduation' },
    { id: 'skills', label: 'Skills', icon: 'wrench' },
    { id: 'activity', label: 'Activity', icon: 'activity' },
    { id: 'blog', label: 'Blog', icon: 'link' },
  ],

  /* --------------------------------------------------------------------
   * 9. FOOTER
   * ------------------------------------------------------------------ */
  footer: {
    text: '© 2026 Pratyush Singh',
    linkLabel: 'Back to top',
    linkHref: '#home',
  },
}
