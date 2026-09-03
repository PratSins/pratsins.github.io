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
      slug: 'house-price-estimator',
      title: 'House Price Estimator',
      category: 'Machine Learning',
      date: '2025-10-26',
      status: 'live',
      image: '/images/projects/house-price-estimator.svg',
      imageAlt: 'House Price Estimator — a form for property details beside the predicted price',
      tags: ['Python', 'Flask', 'scikit-learn', 'React', 'Pandas', 'NumPy'],
      summary:
        'A price prediction tool for Bangalore real estate: a regression model trained on Kaggle housing data, served through a Flask API and driven from a React front end.',
      links: [
        {
          label: 'Source',
          href: 'https://github.com/PratSins/house-price-estimator',
          kind: 'github',
        },
      ],
      detail: {
        intro:
          'Predicting Bangalore house prices from location, size and other listing attributes — the model work in a notebook, wrapped in an API and a small interface so the prediction is usable rather than just plotted.',
        sections: [
          {
            heading: 'The problem',
            body: [
              'Placeholder — worth replacing with the real motivation. What made the pricing question interesting? Bangalore listings vary wildly by locality and the raw Kaggle data is messy, so there is a genuine story here about what had to be cleaned before anything could be modelled.',
            ],
          },
          {
            heading: 'How it works',
            body: [
              'The dataset comes from Kaggle Bangalore house prices. Feature engineering and model training happen in a Jupyter notebook using Pandas, NumPy and scikit-learn; the trained model is then served by a Flask endpoint that the React front end calls with the property details a visitor enters.',
              'Expand this with the specifics: which features you kept, how you handled outliers and the location column, and which regression you settled on and why.',
            ],
          },
          {
            heading: 'Results',
            body: [
              'Placeholder — add the numbers. Model accuracy or error against your holdout set is the single most persuasive thing you can put on this page, and it is the part a reader will look for.',
            ],
          },
        ],
      },
    },
    {
      slug: 'frameverse',
      title: 'FrameVerse',
      category: 'Computer Vision & GenAI',
      date: '2026-08-28',
      status: 'live',
      image: '/images/projects/frameverse.svg',
      imageAlt: 'FrameVerse — real-time finger frame gesture tracking with AI video restyling',
      tags: [
        'Go',
        'React 19',
        'TypeScript',
        'Google Cloud',
        'Vertex AI',
        'MongoDB',
        'MediaPipe',
        'Canvas 2D',
      ],
      summary:
        'An interactive AI video transformation platform that turns finger gestures into a live window to stylized animated worlds (Anime, 3D CGI, Pixar) using MediaPipe and Gemini Omni Flash on Vertex AI.',
      links: [
        {
          label: 'Source',
          href: 'https://github.com/PratSins/FrameVerse-Backend',
          kind: 'github',
        },
      ],
      detail: {
        intro:
          'FrameVerse bridges real-time computer vision and multimodal generative AI by turning a two-handed "L" finger-frame gesture into a dynamic portal displaying AI-stylized animated worlds.',
        sections: [
          {
            heading: 'The concept',
            body: [
              'Traditional video stylization models restyle full frames indiscriminately. FrameVerse recreates the viral "AI world inside a finger frame" effect: the real person and environment stay untouched outside the gesture, while the area inside the fingertip boundary dynamically reveals the AI-stylized universe.',
            ],
          },
          {
            heading: 'Architecture & pipeline',
            body: [
              'The frontend runs MediaPipe Hand Landmarker in the browser (via WebAssembly & WebGL) to track 21 hand landmarks, detects the dual-hand "L" gesture across index and thumb tips, and applies velocity-adaptive exponential smoothing and teleport rejection to maintain a stable 4-point quadrilateral.',
              'Video restyling is powered by Google Cloud Vertex AI (Gemini Omni Flash) with pixel-alignment prompts ensuring matching head poses, facial expressions, and camera geometry. A Go (Chi) backend orchestrates GCS V4 Signed URLs for direct browser-to-cloud streaming and coordinates job state in a Kubernetes-deployed MongoDB cluster on GKE.',
            ],
          },
          {
            heading: 'Dual-video composition & export',
            body: [
              'An HTML5 Canvas 2D engine synchronizes the original and AI-stylized video streams frame-by-frame, clipping the stylized layer strictly within the dynamic finger polygon while drawing animated dashed borders and glowing corner dots. The final composite can be exported locally in real time as MP4 or WebM via MediaRecorder without server transcoding overhead.',
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
      coursework: [
        'Data Structures & Algorithms',
        'Distributed Systems',
        'Databases',
        'Machine Learning',
        'Operating Systems',
        'Computer Networks',
      ],
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
   * 5b. CERTIFICATIONS
   *
   * `href` is the credential / verification link. Omit it and the card
   * renders as plain text — better than a link that goes nowhere.
   * ------------------------------------------------------------------ */
  certifications: [
    {
      name: 'Machine Learning Specialization',
      issuer: 'Andrew Ng · DeepLearning.AI',
      href: 'https://www.coursera.org/account/accomplishments/specialization/8SUVNYQSV6AU',
    },
    {
      name: 'Web Development Bootcamp',
      issuer: 'Angela Yu · Udemy',
      href: 'https://www.udemy.com/certificate/UC-4203db48-1a45-469b-9b8a-617c912aca93/',
    },
    {
      name: 'Google Cloud Certified Professional Program',
      issuer: 'Google Cloud',
      href: 'https://www.skills.google/public_profiles/ef6fab07-cd91-4bcc-bb60-a57b0be7714b',
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
  blog: [],

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
    { id: 'education', label: 'Education', icon: 'graduation' },
    { id: 'experience', label: 'Experience', icon: 'briefcase' },
    { id: 'projects', label: 'Projects', icon: 'code' },
    { id: 'skills', label: 'Skills', icon: 'wrench' },
    { id: 'certifications', label: 'Certifications', icon: 'award' },
    { id: 'activity', label: 'Activity', icon: 'activity' },
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
