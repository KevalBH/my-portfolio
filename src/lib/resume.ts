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
  title: "Lead Frontend Developer",
  location: "Mahuva 364290, Gujarat, India",
  email: "keval.bhatt.777@gmail.com",
  phone: "+91 97766-91766",
  phoneHref: "tel:+919776691766",
  linkedin: "https://www.linkedin.com/in/keval-dev",
  github: "https://github.com/KevalBH",
  summary:
    "Frontend Developer with 5+ years of experience building and scaling web applications using React.js, Next.js, and TypeScript. Experienced in leading cross-functional teams and delivering 25+ releases across fintech, e-commerce, and real-time collaboration products. Strong focus on frontend architecture, reusable UI systems, performance optimization, and Core Web Vitals, with hands-on experience using AI-assisted development tools and VS Code-based AI workflows to improve development efficiency, code quality, and team productivity.",
} satisfies Profile;

export const stats = [
  { value: "5+", label: "Years shipping product" },
  { value: "25+", label: "Production releases" },
  { value: "2–10", label: "Developers mentored" },
  { value: "30%", label: "Faster delivery via design system" },
] satisfies readonly Stat[];

export const skillGroups = [
  {
    title: "Architecture & performance",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Core Web Vitals",
      "SSR/SSG optimization",
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
    items: ["Context API", "RESTful APIs", "WebSockets", "React Query", "Redux"],
  },
  {
    title: "Testing",
    items: ["Jest", "React Testing Library (RTL)", "Enzyme"],
  },
  {
    title: "Cloud & delivery",
    items: ["AWS", "Google Cloud", "Firebase", "GitHub Actions", "CI/CD pipelines"],
  },
  {
    title: "Leadership",
    items: [
      "Cursor",
      "GitHub",
      "PR reviews",
      "Team management",
      "Estimations",
      "Task distribution",
      "Execution planning",
    ],
  },
] satisfies readonly SkillGroup[];

export const experience = [
  {
    company: "21Twelve Interactive Pvt Ltd",
    href: "https://www.21twelveinteractive.com",
    place: "Ahmedabad, Gujarat",
    roles: [
      {
        title: "Lead Frontend Developer",
        period: "Jan 2024 — Jun 2026",
        points: [
          "Mentor and guide cross-functional engineering teams of 2–10 developers, providing technical direction, architecture guidance, and code reviews.",
          "Built and standardized a reusable UI design system and custom component library using React and Tailwind CSS, improving frontend development velocity by 30% across 4 project teams.",
          "Lead frontend architecture for high-performance fintech, trading, and real-time collaboration products, focusing on scalability, maintainability, and performance.",
        ],
      },
      {
        title: "Senior Frontend Developer",
        period: "Jan 2023 — Dec 2023",
        points: [
          "Built and scaled high-performance frontend applications using React.js and Next.js across 15+ web products in fintech, healthcare, education, and B2B/B2C domains.",
          "Led technical estimation and requirement analysis for complex frontend initiatives, breaking down scope, identifying dependencies, assessing risks, and improving delivery planning across multiple project teams.",
          "Established frontend engineering standards and automated testing workflows using Jest and React Testing Library, achieving 95%+ code coverage while improving CI/CD pipelines and release reliability.",
        ],
      },
      {
        title: "Junior Frontend Developer",
        period: "Jan 2022 — Dec 2022",
        points: [
          "Translated complex UI/UX designs into responsive, clean, and reusable React components using modern JavaScript.",
          "Streamlined client-side data fetching, caching, and state management using React Query, Context API, and Redux, improving data flow and reducing unnecessary re-renders.",
        ],
      },
    ],
  },
  {
    company: "E-logicals Technology Pvt Ltd",
    href: "https://www.elogicals.com",
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
    title: "Enterprise trading & portfolio analytics platform",
    href: "https://prospuh.com",
    domain: "Fintech",
    stack: ["React.js", "Next.js", "TypeScript", "Redux Toolkit", "WebSockets"],
    points: [
      "Architected a high-frequency trading platform and administration dashboard with React.js, Next.js, and TypeScript for desktop and mobile web.",
      "Integrated Alpaca APIs and WebSocket pipelines to ingest, map, and render real-time market data, order books, and live trade executions with minimal client-side latency.",
      "Engineered secure onboarding and automated verification with MetaMap APIs for KYC/AML, biometric checks, and identity document processing.",
      "Implemented role-based access controls and data-masking in the admin platform for profiles, audit logs, and transaction monitoring.",
      "Optimized client-side state with Redux Toolkit and caching layers so rapid financial streams did not drop frames or trigger redundant re-renders.",
    ],
  },
  {
    index: "02",
    title: "Geospatial dating & real-time messaging platform",
    href: "https://matchnmeet.io",
    domain: "Consumer",
    stack: ["Mapbox", "Google Maps", "Firebase", "REST"],
    points: [
      "Architected a visual, cross-platform dating application, translating complex UI/UX wireframes into a pixel-perfect, component-driven frontend with micro-interactions.",
      "Engineered a dual-provider geospatial engine with Mapbox and Google Maps for location tracking, proximity matchmaking, and heatmaps.",
      "Implemented low-latency chat and notifications on Firebase (Firestore / Realtime Database), optimizing listeners so messaging stays light on battery and data.",
      "Optimized asset loading, image caching, and lazy-loading for media-heavy profiles and discovery decks.",
      "Integrated REST APIs for profile verification, matchmaking, multi-factor authentication, and premium subscription payments.",
    ],
  },
  {
    index: "03",
    title: "High-performance web properties & design-to-code",
    href: "https://odhavindustries.org",
    domain: "Marketing / product sites",
    stack: ["Next.js", "SSG", "Tailwind CSS", "Styled Components"],
    points: [
      "Engineered responsive, SEO-optimized static properties with Next.js static generation and semantic HTML5, translating visual UI/UX designs into code.",
      "Architected reusable atomic components with Tailwind CSS, Styled Components, and CSS3 so styling stayed tight to the design guidelines.",
      "Optimized production builds with compression, image work, and code-splitting for cross-device rendering and a fast first load.",
      "Delivered modular frontend codebases structured for maintainability and a clean backend handoff.",
    ],
  },
  {
    index: "04",
    title: "Restaurant booking, ordering & management system",
    href: "https://bookyourtable.com",
    domain: "Hospitality",
    stack: ["React.js", "REST APIs", "Admin dashboards", "Charts"],
    points: [
      "Architected a scalable React.js frontend for restaurant discovery, table reservations, and food ordering across dine-in, pickup, and delivery, using reusable components, modular architecture, and client-side state.",
      "Owned discovery and customer workflows, including live location filtering, voice search, search and sort, nearby and trending restaurants, hotspots, menus, booking, and reviews.",
      "Designed role-based Restaurant Admin and Super Admin dashboards with API integrations for menus, orders, tables, employees, inventory, restaurants, reviews, and Excel import and export.",
      "Built reporting dashboards with chart visualizations for revenue, order trends, restaurant activity, and performance, plus form validation and a responsive, data-driven UI.",
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
