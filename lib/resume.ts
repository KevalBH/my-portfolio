import type {
  Company,
  EducationItem,
  NavItem,
  Profile,
  SkillGroup,
  Stat,
  WorkItem,
} from "@/lib/content";

export const profile = {
  name: "Keval Bhatt",
  title: "Lead Frontend Engineer",
  location: "Mahuva, Gujarat, India",
  email: "keval.bhatt.777@gmail.com",
  phone: "+91 97766-91766",
  phoneHref: "tel:+919776691766",
  linkedin: "https://www.linkedin.com/in/keval-dev",
  github: "https://github.com/KevalBH",
  summary:
    "Results-driven Lead Frontend Engineer with 5+ years of experience architecting and scaling high-performance web applications using React.js, Next.js, TypeScript, and Cursor. Proven track record of leading cross-functional teams to deliver over 25 production-grade releases across fintech, e-commerce, and real-time collaboration domains. Expert in building centralized UI design systems, optimizing client-side performance (Core Web Vitals), and establishing robust engineering standards that accelerate development velocity.",
} satisfies Profile;

export const stats = [
  { value: "5+", label: "Years shipping product" },
  { value: "25+", label: "Production releases" },
  { value: "2–10", label: "Engineers mentored" },
  { value: "30%", label: "Faster delivery via design system" },
] satisfies readonly Stat[];

export const skillGroups = [
  {
    title: "Architecture & performance",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Cursor",
      "JavaScript (ES6+)",
      "Core Web Vitals",
      "SSR / SSG",
      "Code-splitting",
      "Webpack",
      "Vite",
      "Node.js",
      "Express.js",
      "Serverless",
    ],
  },
  {
    title: "UI & design systems",
    items: ["Tailwind CSS", "Design-to-code", "Shadcn UI", "Ant Design", "Monorepos"],
  },
  {
    title: "State & data",
    items: ["Context API", "REST APIs", "WebSockets", "React Query", "Redux"],
  },
  {
    title: "Testing",
    items: ["Jest", "React Testing Library", "Enzyme"],
  },
  {
    title: "Cloud & delivery",
    items: ["AWS", "Google Cloud", "Firebase", "GitHub Actions", "CI/CD"],
  },
  {
    title: "Leadership",
    items: [
      "Git / GitHub",
      "PR reviews",
      "Team management",
      "Project estimation",
      "Task distribution",
      "Execution planning",
    ],
  },
] satisfies readonly SkillGroup[];

export const experience = [
  {
    company: "21Twelve Interactive Pvt Ltd",
    place: "Ahmedabad, Gujarat",
    roles: [
      {
        title: "Lead Frontend Engineer",
        period: "Jan 2024 — Jun 2026",
        points: [
          "Mentor, coach, and manage cross-functional engineering teams of 2–10 developers through technical guidance, architecture design, and rigorous code reviews.",
          "Engineer a centralized, reusable UI design system and custom UI library using React and Tailwind CSS, accelerating frontend development velocity by 30% across 4 distinct project teams.",
          "Oversee the end-to-end frontend architecture for high-performance fintech, trading, and real-time collaboration web products.",
        ],
      },
      {
        title: "Senior Frontend Engineer",
        period: "Jan 2023 — Dec 2023",
        points: [
          "Architected and engineered high-performance frontend solutions using React.js and Next.js for 15+ web products spanning fintech, healthcare, education, and B2B/B2C domains.",
          "Delivered 25+ production-grade releases while improving Core Web Vitals (FID, LCP), resulting in a 25% reduction in bounce rates and faster page discovery.",
          "Established modern frontend engineering standards, introducing automated testing workflows (Jest/RTL) with 85%+ code coverage and optimized CI/CD pipelines.",
        ],
      },
      {
        title: "Junior Frontend Engineer",
        period: "Jan 2022 — Dec 2022",
        points: [
          "Translated complex UI/UX designs into responsive, clean, and reusable React components using modern JavaScript.",
          "Streamlined client-side data fetching, caching, and state hydration by implementing structured state management via the Context API.",
        ],
      },
    ],
  },
  {
    company: "E-logicals Technology Pvt Ltd",
    place: "Gandhinagar, Gujarat",
    roles: [
      {
        title: "Junior Frontend Developer",
        period: "Sep 2020 — Oct 2021",
        points: [
          "Developed highly responsive, accessible user interfaces and reusable UI components using React.js and modern JavaScript.",
          "Seamlessly integrated complex REST APIs and collaborated closely with backend teams to optimize data fetching and state hydration.",
          "Reduced technical debt by transitioning legacy workflows into modern component-driven architectures, cutting feature onboarding time for new developers.",
          "Contributed actively to team code quality initiatives, writing unit tests and assisting in release stability efforts.",
        ],
      },
    ],
  },
] satisfies readonly Company[];

export const work = [
  {
    index: "01",
    title: "Virtual meeting and collaboration platform",
    domain: "Real-time collaboration",
    stack: ["React.js", "TypeScript", "Jitsi Meet", "Konva.js"],
    points: [
      "Architected a real-time, multi-tenant video conferencing platform on a scalable React.js and TypeScript infrastructure, embedding the Jitsi Meet framework for signaling and media streams.",
      "Engineered an interactive, synchronized collaboration stage using Konva.js with drag-and-drop avatars and multi-user canvas interactions without sacrificing rendering performance.",
      "Designed a proximity-based spatial audio feature by calculating coordinate vectors between avatars to scale audio volume with closeness.",
      "Built a virtual projector subsystem for synchronized screen sharing, with REST APIs for secure session allocation and authentication.",
    ],
  },
  {
    index: "02",
    title: "Enterprise trading & portfolio analytics platform",
    domain: "Fintech",
    stack: ["React.js", "Next.js", "TypeScript", "Redux Toolkit", "WebSockets"],
    points: [
      "Architected a high-frequency trading platform and administration dashboard with React.js, Next.js, and TypeScript for desktop and mobile web.",
      "Integrated Alpaca APIs and WebSocket pipelines to ingest and render real-time market data, order books, and live trade executions with minimal client-side latency.",
      "Embedded MetaMap APIs for KYC/AML onboarding, biometric verification, and identity document processing.",
      "Implemented RBAC and data-masking in the admin platform for profiles, audit logs, and transaction monitoring.",
      "Optimized state with Redux Toolkit and caching layers so rapid financial streams did not drop frames or trigger redundant re-renders.",
    ],
  },
  {
    index: "03",
    title: "Geospatial dating & real-time messaging platform",
    domain: "Consumer",
    stack: ["Mapbox", "Google Maps", "Firebase", "REST"],
    points: [
      "Translated complex UI/UX wireframes into a pixel-perfect, component-driven frontend with micro-interactions.",
      "Built a dual-provider geospatial engine with Mapbox and Google Maps for location tracking, proximity matchmaking, and heatmaps.",
      "Implemented low-latency chat and notifications on Firebase (Firestore / Realtime Database), with careful listener design for battery and data cost.",
      "Optimized asset loading, image caching, and lazy-loading for media-heavy profiles and discovery decks.",
      "Integrated REST APIs for profile verification, matchmaking, MFA, and premium subscription payments.",
    ],
  },
  {
    index: "04",
    title: "High-performance web properties & design-to-code",
    domain: "Marketing / product sites",
    stack: ["Next.js", "SSG", "Tailwind CSS", "Styled Components"],
    points: [
      "Engineered responsive, SEO-optimized static properties with Next.js SSG and semantic HTML5 from visual UI/UX designs.",
      "Built atomic component structures with Tailwind CSS, Styled Components, and CSS3 to keep styling tight to the design system.",
      "Optimized production builds with compression, image work, and code-splitting for cross-device rendering and fast first load.",
      "Delivered modular frontend codebases intended for clean backend handoff.",
    ],
  },
] satisfies readonly WorkItem[];

export const education = [
  {
    school: "Marwadi Education Foundation",
    place: "Rajkot, Gujarat",
    credential: "Master of Computer Applications with Distinction; GTU Syllabus",
    period: "2017 — 2019",
  },
  {
    school: "K. B. Parekh College of Computer Science",
    place: "Mahuva, Gujarat",
    credential: "Bachelor of Computer Applications; Bhavnagar University Syllabus",
    period: "2014 — 2017",
  },
] satisfies readonly EducationItem[];

export const nav = [
  { href: "#overview", label: "Overview" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Selected work" },
  { href: "#stack", label: "Stack" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
] as const satisfies readonly NavItem[];
