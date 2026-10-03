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
      status: 'Finished',
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
      category: 'Cloud-Native GenAI & Real-Time WebRTC',
      date: '2026-10-04',
      status: 'Finished',
      image: '/images/projects/frameverse.svg',
      imageAlt: 'FrameVerse — Cloud-Native Generative AI Video Transformation & WebRTC Meet Platform',
      tags: [
        'Go',
        'React',
        'TypeScript',
        'Google Kubernetes Engine (GKE)',
        'NGINX Ingress',
        'cert-manager',
        'WebRTC Mesh',
        'Google Cloud Storage',
        'Vertex AI',
        'Gemini Omni Flash',
        'MediaPipe WASM',
        'PostgreSQL (Cloud SQL)',
        'MongoDB',
        'JWT RS256 & JWKS',
        'Firebase Hosting',
      ],
      summary:
        'A production-grade, cloud-native universe uniting multimodal Generative AI video transformation with real-time WebRTC mesh communications, orchestrated across Google Kubernetes Engine (GKE), Cloud SQL, and Firebase Hosting with automated zero-cost TLS.',
      links: [
        {
          label: 'Overview & Docs',
          href: 'https://github.com/PratSins/frameverse',
          kind: 'github',
        },
        {
          label: 'Backend (Go)',
          href: 'https://github.com/PratSins/FrameVerse-Backend',
          kind: 'github',
        },
        {
          label: 'Frontend (React / Vite)',
          href: 'https://github.com/PratSins/FrameVerse-client',
          kind: 'github',
        },
        {
          label: 'Auth Service (Go)',
          href: 'https://github.com/PratSins/FrameVerse-Auth',
          kind: 'github',
        },
        {
          label: 'LinkedIn Showcase',
          href: 'https://www.linkedin.com/feed/update/urn:li:activity:7512135912521334784/',
          kind: 'website',
        },
        {
          label: 'Watch Full Demo',
          href: '/videos/frameverse-demo.mp4',
          kind: 'demo',
        },
      ],
      detail: {
        intro:
          'FrameVerse is an end-to-end, production-grade cloud-native platform that pairs real-time browser-based computer vision and multimodal Generative AI with a Google Meet-style WebRTC mesh video calling engine. The system is architected as an asynchronous microservices topology orchestrated on Google Kubernetes Engine (GKE), providing automated zero-cost TLS termination, sub-millisecond asymmetric JWT authentication, and direct-to-cloud video streaming.',
        video: '/videos/frameverse-demo.mp4',
        videoCaption:
          'FrameVerse Live Demonstration — featuring MediaPipe dual-hand gesture portal tracking, asynchronous Gemini Omni Flash stylization, and low-latency WebRTC mesh video conferencing.',
        sections: [
          {
            heading: 'The Core Vision: Interactive AI World Portals',
            body: [
              'Traditional video stylization models restyle whole frames indiscriminately, which erases context and disconnects the subject from their surroundings. FrameVerse pioneers an interactive "AI world inside a finger frame" effect: a two-handed "L" gesture acts as an active physical viewport into stylized animated dimensions (Anime, Cyberpunk 2077, Claymation, Pixel Art, Watercolor). Outside the finger frame, the user and their physical surroundings remain completely real and untouched.',
              'Beyond artistic transformation, FrameVerse integrates low-latency WebRTC mesh video calling with a modern Google Meet-inspired interface, providing teams with instant video communication alongside AI creative tooling.',
            ],
          },
          {
            heading: 'Cloud-Native Microservices Topology & Zero-Cost TLS Gateway',
            body: [
              'The production infrastructure is hosted on a regional Google Kubernetes Engine (GKE) cluster in asia-south1-a. A custom NGINX Ingress Controller acts as the single high-throughput API Gateway, orchestrating request traffic across internal cluster microservices: /api/v1/auth/* routes to the Auth Service, /api/v1/toonify/* to the AI Video Engine, /api/v1/* to general REST endpoints, and /ws/vchat/* to real-time WebSockets.',
              'Security is automated via cert-manager integrated with Let\'s Encrypt ACME HTTP-01 challenges, terminating SSL/TLS certificates on custom domain 34.47.229.61.sslip.io with zero operational cost and automatic 90-day certificate rotations.',
            ],
            diagram: "flowchart TD\n    subgraph Clients[\"Client Layer\"]\n        Browser[\"React 18 SPA (Firebase Hosting CDN)\\nMediaPipe WASM + WebRTC Mesh\"]\n    end\n\n    subgraph IngressGateway[\"Ingress & Security Gateway (GKE)\"]\n        LB[\"GCP External TCP Load Balancer\\nStatic IP: 34.47.229.61\"]\n        CertMgr[\"cert-manager v1.16\\nLet's Encrypt Production ClusterIssuer\"]\n        Ingress[\"NGINX Ingress Controller\\n34.47.229.61.sslip.io (Port 443 TLS)\"]\n    end\n\n    subgraph ClusterServices[\"GKE Kubernetes Cluster (asia-south1-a)\"]\n        subgraph AuthNamespace[\"Auth Service\"]\n            AuthSvc[\"frameverse-auth (Go 1.23 / Chi)\\nClusterIP:8080\"]\n        end\n        subgraph BackendNamespace[\"Core Backend & Real-Time Engine\"]\n            BackendSvc[\"frameverse-backend (Go 1.23 / Chi)\\nClusterIP:8080\"]\n            WSHub[\"Gorilla WebSocket Signaling Hub\\nFull-Mesh WebRTC Broker\"]\n        end\n        subgraph DataNamespace[\"Stateful Storage\"]\n            Mongo[\"MongoDB 8 Pod\\nPersistentVolumeClaim (10Gi RWO)\"]\n        end\n    end\n\n    subgraph ManagedCloud[\"Google Cloud Managed Services\"]\n        CloudSQL[(\"Cloud SQL\\nPostgreSQL 16\")]\n        GCS[\"Google Cloud Storage\\nframeverse-videos Bucket\"]\n        VertexAI[\"Google Vertex AI\\nGemini Omni Flash Model\"]\n    end\n\n    Browser -->|\"HTTPS / REST API\"| Ingress\n    Browser -->|\"WSS / WebSockets\"| Ingress\n    CertMgr -.->|\"Automated ACME HTTP-01\"| Ingress\n    LB --> Ingress\n\n    Ingress -->|\"/api/v1/auth/*, /.well-known/jwks.json\"| AuthSvc\n    Ingress -->|\"/api/v1/toonify/*, /api/v1/*\"| BackendSvc\n    Ingress -->|\"/ws/vchat/*\"| WSHub\n\n    AuthSvc -->|\"pgx/v5 Connection Pool\"| CloudSQL\n    BackendSvc -->|\"Asynchronous Multimodal Job\"| VertexAI\n    BackendSvc -->|\"V4 Signed URLs\"| GCS\n    Browser -->|\"Direct Video Upload (PUT)\"| GCS\n    BackendSvc -->|\"Job Metadata & Rooms\"| Mongo\n    BackendSvc -.->|\"Internal JWKS Query (cluster.local)\"| AuthSvc",
            diagramCaption: 'System Architecture: Multi-tier microservices topology, NGINX Ingress Gateway, and managed GCP cloud services.',
          },
          {
            heading: 'In-Browser Computer Vision & Dual-Stream Compositing',
            body: [
              'The frontend runs Google MediaPipe Hand Landmarker entirely within the browser via WebAssembly and WebGL, tracking 21 3D joint landmarks across both hands at a smooth 60 FPS without incurring server GPU expenses. Proprietary heuristic algorithms detect index-thumb intersections to construct a dynamic four-point quadrilateral.',
              'To eliminate hand jitter and momentary tracking dropouts, the coordinate pipeline applies velocity-adaptive exponential smoothing and teleportation rejection filters. A custom HTML5 Canvas 2D engine synchronizes the raw webcam stream with the Gemini-generated video track frame-by-frame, clipping the stylized world into the polygon with animated neon dashed borders. The resulting composite exports locally via MediaRecorder to MP4 or WebM with zero server transcoding overhead.',
            ],
          },
          {
            heading: 'Asynchronous Multimodal AI Video Pipeline',
            body: [
              'To prevent gateway memory exhaustion and support high-concurrency workloads, the client obtains Google Cloud Storage (GCS) V4 Signed URLs to stream recordings directly from the browser to cloud buckets. Once uploaded, an asynchronous Go worker triggers Google Cloud Vertex AI (Gemini Omni Flash).',
              'Custom prompt engineering guarantees strict pixel alignment, matching head poses, facial expressions, and spatial geometry between raw and stylized frames. Job state transitions (pending, processing, completed, failed) are persisted in a stateful MongoDB replica set running on GKE, while the client monitors progress via resilient polling hooks.',
            ],
            diagram: "sequenceDiagram\n    autonumber\n    actor User as User / Camera\n    participant Frontend as Frontend (MediaPipe & Canvas)\n    participant Backend as FrameVerse-Backend (Go)\n    participant GCS as Google Cloud Storage\n    participant Gemini as Vertex AI (Gemini Omni Flash)\n    participant Mongo as MongoDB on GKE\n\n    User->>Frontend: Dual-Hand \"L\" Gesture Detected\n    Frontend->>Frontend: 3s Countdown & 30s Video Recording\n    Frontend->>Backend: POST /api/v1/toonify/upload-url (Bearer Token)\n    Backend->>Backend: Validate Claims via Cached JWKS\n    Backend->>GCS: Generate V4 Signed PUT URL (15m expiry)\n    Backend->>Mongo: Create Job Record (Status: queued)\n    Backend-->>Frontend: 200 OK { job_id, upload_url }\n\n    Frontend->>GCS: Direct PUT Video Stream (Bypasses Backend Gateway)\n    GCS-->>Frontend: 200 OK (Upload Complete)\n\n    Frontend->>Backend: POST /api/v1/toonify/{job_id}/process\n    Backend->>Mongo: Update Job Status: processing\n    Backend-->>Frontend: 202 Accepted { status: \"processing\" }\n\n    par Asynchronous Processing Worker\n        Backend->>Gemini: Stream Video & Prompt (Pixel-Aligned Restyling)\n        Gemini-->>Backend: Return Stylized Video Output\n        Backend->>GCS: Save Stylized Video & Generate Download URL\n        Backend->>Mongo: Update Job Status: completed { download_url }\n    and Polling with Resilient Auto-Retry\n        loop Every 3 seconds\n            Frontend->>Backend: GET /api/v1/toonify/{job_id}\n            Backend-->>Frontend: Job Status Response\n        end\n    end\n\n    Frontend->>Frontend: Dual-Video Canvas 2D Compositor (Gesture Portal Clipping)",
            diagramCaption: 'GenAI Pipeline: Direct browser-to-bucket GCS streaming and asynchronous Vertex AI Gemini Omni Flash processing sequence.',
          },
          {
            heading: 'Asymmetric Authentication & Security Subsystem (FrameVerse-Auth)',
            body: [
              'Identity and access control are isolated in a dedicated Go 1.23 microservice powered by Chi and pgx/v5, backed by PostgreSQL on Cloud SQL. Authentication utilizes asymmetric RS256 JWT tokens with public JWKS key discovery (.well-known/jwks.json), enabling any service in the cluster to verify cryptographic tokens in sub-milliseconds without querying the database.',
              'For session longevity, the service issues cryptographically hashed rotating refresh tokens (SHA-256) stored with automatic token-reuse detection: replayed tokens instantly trigger complete session revocation across all devices. The frontend integrates a custom fetchWithAuth wrapper that silently intercepts 401 Unauthorized responses to perform instant background token rotation and auto-retry.',
            ],
            diagram: "sequenceDiagram\n    autonumber\n    actor User as Client (React 18 SPA)\n    participant Ingress as NGINX Ingress (TLS 443)\n    participant Auth as FrameVerse-Auth (Go)\n    participant DB as Cloud SQL (Postgres)\n    participant Backend as FrameVerse-Backend (Go)\n\n    User->>Ingress: POST /api/v1/auth/login { email, password }\n    Ingress->>Auth: Forward to Auth Service\n    Auth->>DB: Query User & Verify Argon2id Password Hash\n    DB-->>Auth: User Record OK\n    Auth->>Auth: Sign RS256 JWT (Access Token 15m) + Generate Refresh Token (7d)\n    Auth->>DB: Store SHA-256 Hashed Refresh Token\n    Auth-->>User: 200 OK { tokens: { access_token, refresh_token }, user }\n\n    Note over User,Backend: Stateless Asymmetric Verification (Zero DB round-trips!)\n    User->>Ingress: POST /api/v1/toonify/upload-url (Bearer JWT)\n    Ingress->>Backend: Forward Request with Authorization Header\n    alt Public Key not in Memory Cache\n        Backend->>Auth: GET http://frameverse-auth.default.svc.cluster.local:8080/.well-known/jwks.json\n        Auth-->>Backend: Public RSA Key (JWKS)\n        Backend->>Backend: Cache Public Key in Memory\n    end\n    Backend->>Backend: Verify RS256 Signature & Claims Locally\n    Backend-->>User: 200 OK { job_id, upload_url }",
            diagramCaption: 'Asymmetric Auth Architecture: Stateless RS256 token verification and internal cluster JWKS key discovery.',
          },
          {
            heading: 'Full-Mesh WebRTC Video Calling ("vChat") & Google Meet UX',
            body: [
              'The real-time communications module employs a full-mesh WebRTC topology orchestrated through a Gorilla WebSocket signaling hub in Go. The hub coordinates peer handshakes, SDP offer/answer exchanges, and trickle ICE candidate routing across redundant public STUN servers.',
              'The call UI adopts an iconic Google Meet dark aesthetic (#202124) with floating glass docks, active speaker indicators, participant drawers, and Room ID admission controls. For hardware privacy, muting video doesn\'t merely hide the HTML element—it terminates media tracks at the driver level, turning off physical laptop webcam LEDs.',
            ],
            diagram: "flowchart LR\n    subgraph Browser1[\"Peer A (Host)\"]\n        CamA[\"Local Webcam\"]\n        PCA[\"RTCPeerConnection\"]\n        UI_A[\"Meet UI (Dark #202124)\"]\n    end\n\n    subgraph Signaling[\"Signaling Broker (GKE)\"]\n        WSHub[\"Gorilla WebSocket Hub\\nws/vchat/rooms/:roomId\"]\n    end\n\n    subgraph STUN[\"NAT Traversal\"]\n        StunPool[\"Multi-Provider STUN Pool\\nGoogle | Cloudflare | OpenRelay\"]\n    end\n\n    subgraph Browser2[\"Peer B (Participant)\"]\n        CamB[\"Local Webcam\"]\n        PCB[\"RTCPeerConnection\"]\n        UI_B[\"Meet UI (Dark #202124)\"]\n    end\n\n    Browser1 -->|\"1. WebSocket Connect (JWT Auth)\"| WSHub\n    Browser2 -->|\"2. WebSocket Connect (Room Knock)\"| WSHub\n    WSHub -->|\"3. SDP Offer / Answer Exchange\"| WSHub\n\n    PCA -.->|\"Trickle ICE Candidate Discovery\"| StunPool\n    PCB -.->|\"Trickle ICE Candidate Discovery\"| StunPool\n\n    PCA ===|\"P2P Encrypted Audio/Video (DTLS/SRTP)\"| PCB\n    PCB ===|\"P2P Encrypted Audio/Video (DTLS/SRTP)\"| PCA",
            diagramCaption: 'WebRTC Full-Mesh Signaling: Gorilla WebSocket hub broker and multi-provider STUN NAT traversal.',
          },
          {
            heading: 'Production DevOps, Kubernetes & CI/CD Automation',
            body: [
              'Every microservice is containerized with multi-stage Docker builds and deployed to GKE using declarative Kubernetes manifests maintained in the main repository (https://github.com/PratSins/frameverse), featuring readiness/liveness health probes (/healthz), explicit resource limits, and RollingUpdate zero-downtime release strategies.',
              'The frontend Single Page Application is distributed through Firebase Hosting with global edge CDN caching and atomic rollbacks. GitHub Actions workflows automatically test, build container images, push versioned tags to Docker Hub, and apply rolling cluster updates on every release.',
            ],
            diagram: "flowchart TD\n    GitPush[\"Git Tag Push to main\"] --> Splitter{\"Tag Pattern\"}\n\n    Splitter -->|\"tag: cert-*\"| WF1[\"deploy-cert-manager.yml\"]\n    Splitter -->|\"tag: v* or ingress-*\"| WF2[\"deploy-ingress.yml\"]\n    Splitter -->|\"tag: mongo-*\"| WF3[\"deploy-mongo.yml\"]\n\n    subgraph Actions[\"GitHub Actions Automated Execution\"]\n        AuthGCP[\"1. Authenticate to Google Cloud (GCP Workload Identity / SA)\"]\n        GetKube[\"2. Retrieve GKE Cluster Credentials (frameverse-cluster)\"]\n        ApplyK8s[\"3. Apply Declarative K8s Manifests (helm / kubectl)\"]\n        Rollout[\"4. Verify Zero-Downtime Rollout (rollout status)\"]\n    end\n\n    WF1 --> AuthGCP\n    WF2 --> AuthGCP\n    WF3 --> AuthGCP\n\n    AuthGCP --> GetKube --> ApplyK8s --> Rollout --> Complete[\"Production Live & Healthy\"]",
            diagramCaption: 'CI/CD Infrastructure: Independent tag-triggered GitHub Actions workflows and rolling GKE deployment.',
          },
        ],
      }
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
