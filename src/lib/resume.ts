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
  location: "Bhavnagar, India",
  email: "keval.bhatt.777@gmail.com",
  phone: "+91 97766-91766",
  phoneHref: "tel:+919776691766",
  linkedin: "https://www.linkedin.com/in/keval-dev",
  github: "https://github.com/KevalBH",
  summary:
    "MERN Stack Developer with 5+ years of experience building and scaling web applications, with strong expertise in frontend engineering using React.js, Next.js, TypeScript, and JavaScript, and limited hands-on backend experience. Focused on scalable UI architecture, reusable component systems, performance, and Core Web Vitals, contributing to 25+ products across fintech, e-commerce, and real-time collaboration. Experienced in Agentic AI development using tools such as Cursor and Claude to build applications, with hands-on experience in AI-assisted coding and workflow automation using GitHub Copilot, Codeium, and n8n to improve development speed and quality.",
} satisfies Profile;

export const sidebarTitle = "MERN Stack Developer";

export const stats = [
  { value: "5+", label: "Years shipping product" },
  { value: "25+", label: "Products shipped" },
  { value: "2–10", label: "Developers mentored" },
  { value: "30%", label: "Faster delivery via design system" },
] satisfies readonly Stat[];

export const skillGroups = [
  {
    title: "Frontend architecture & performance",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "PWA",
      "Micro Frontends",
      "Monorepos",
      "Web Accessibility",
      "Core Web Vitals",
      "SSR/SSG",
      "Code-Splitting",
      "Webpack",
      "Browser DevTools",
    ],
  },
  {
    title: "UI & design systems",
    items: [
      "Tailwind CSS",
      "Styled Components",
      "Shadcn UI",
      "Ant Design",
      "Material UI",
      "HTML5",
      "CSS3",
      "SCSS",
    ],
  },
  {
    title: "State & data management",
    items: ["Context API", "Redux Toolkit", "React Query", "GraphQL", "Axios", "Zustand"],
  },
  {
    title: "Backend & realtime",
    items: [
      "Node.js",
      "Express.js",
      "JWT",
      "WebSockets",
      "MongoDB",
      "Serverless",
      "PM2",
      "REST APIs",
    ],
  },
  {
    title: "AI-assisted development",
    items: ["Cursor", "Claude", "GitHub Copilot", "LLMs", "n8n", "MCP", "Agentic AI"],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "AWS",
      "Google Cloud",
      "Firebase",
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "Render",
      "Vercel",
      "Netlify",
    ],
  },
  {
    title: "Leadership & testing",
    items: [
      "Technical Leadership",
      "PR Reviews",
      "Estimation",
      "Scrum",
      "Jira",
      "Jest",
      "RTL",
      "Git",
      "GitHub",
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
          "Mentored and supported engineering teams of 2–10 developers, contributing to technical decisions, architecture discussions, and code reviews.",
          "Built and standardized a reusable UI design system and component library using React and Tailwind CSS, helping 4 project teams improve development speed by 30%.",
          "Led frontend architecture for high-performance fintech, trading, and real-time collaboration applications, focusing on scalable, maintainable, and performant solutions.",
        ],
      },
      {
        title: "Senior Frontend Developer",
        period: "Jan 2023 — Dec 2023",
        points: [
          "Built and scaled high-performance frontend applications using React.js and Next.js across 15+ web products spanning fintech, healthcare, education, and B2B/B2C domains.",
          "Led technical estimation and requirement analysis for complex frontend initiatives, breaking down scope, identifying dependencies and risks, and supporting effective delivery planning.",
          "Established frontend engineering standards and automated testing workflows using Jest and React Testing Library, maintaining 95%+ code coverage while improving CI/CD pipelines and release reliability.",
        ],
      },
      {
        title: "Junior Frontend Developer",
        period: "Jan 2022 — Dec 2022",
        points: [
          "Translated complex UI/UX designs into responsive, reusable React components using modern JavaScript, maintaining consistent user experiences across applications.",
          "Improved client-side data fetching, caching, and state management using Axios, Context API, and Redux, simplifying data flow and reducing unnecessary re-renders.",
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
          "Built responsive and accessible user interfaces and reusable UI components using React.js and modern JavaScript, following clean and maintainable frontend practices.",
          "Integrated complex REST APIs and collaborated with backend teams to improve data fetching and state management across frontend workflows.",
          "Modernized legacy workflows by moving them to component-driven architectures, reducing technical debt and making the codebase easier for new developers to understand and extend.",
        ],
      },
    ],
  },
] satisfies readonly Company[];

export const work = [
  {
    index: "01",
    title: "Tablekart — AI booking, ordering & management",
    href: "https://cv-byt.vercel.app/",
    domain: "Hospitality · AI",
    stack: [
      "WebMCP",
      "MCP",
      "React.js",
      "REST APIs",
      "Real-time reservations",
      "Admin dashboards",
    ],
    aiPoints: [
      "Built Tablekart, a dining product for finding a restaurant, locking a table in real time, and ordering from the seat once you are there.",
      "Turned the customer portal into an AI tool surface with WebMCP, so an assistant in the browser, Claude, or Cursor can search restaurants, read a menu, check live slots, and book a table in the page.",
      "Kept those tools on guest routes only — discovery, cart, and reservations — and left back-office panels out of the agent context.",
    ],
    points: [
      "Built and scaled the React.js frontend for restaurant discovery, table reservations, and food ordering across dine-in, pickup, and delivery, using reusable components and modular architecture.",
      "Implemented key customer workflows including location-based restaurant discovery, voice search, search, filter, and sort, nearby and trending restaurants, hotspots, menu details, bookings, and customer reviews.",
      "Designed and developed Restaurant Admin and Super Admin dashboards, integrating APIs for menus, orders, table arrangements, employees, inventory, restaurants, reviews, and Excel-based data import and export.",
      "Built interactive reporting and analytics dashboards with charts for revenue, order trends, restaurant activity, and performance, along with responsive forms, validation, and reusable data-driven components.",
      "Structured shared UI components, business logic, and data-handling patterns to reduce duplication and keep customer-facing and admin workflows easier to maintain and extend.",
      "Worked closely with API and backend teams to integrate data-driven workflows, handle loading and error states, validate responses, and provide reliable user feedback across booking, ordering, and management flows.",
    ],
  },
  {
    index: "02",
    title: "Come closer — AI-powered chat",
    href: "https://cv-chat-app-five.vercel.app/",
    domain: "Spatial meetings · AI",
    stack: ["WebMCP", "Spatial audio", "Screen share", "Browser agents"],
    aiPoints: [
      "Opened the room to browser AI agents through WebMCP, so an agent can discover the stage and invoke join_stage on its own.",
    ],
    points: [
      "Built a browser meeting stage where someone walks in with a name and hears the room change with distance — voices soften as they step away, so presence is spatial rather than a flat grid of tiles.",
      "When a person shares a screen, the whole room sees it, keeping the stage one shared place instead of a private window.",
    ],
  },
  {
    index: "03",
    title: "Trading & portfolio management platform",
    href: "https://prospuh.com",
    domain: "Fintech",
    stack: ["React.js", "Next.js", "TypeScript", "Redux Toolkit", "WebSockets"],
    points: [
      "Built the React.js and Next.js frontend for a trading and portfolio management platform and admin dashboard using TypeScript, supporting responsive experiences across desktop and mobile web.",
      "Integrated Alpaca APIs and WebSocket data streams to display real-time market data, order books, and trade executions while optimizing client-side rendering and update handling.",
      "Integrated MetaMap APIs into the frontend onboarding flow for identity verification and document processing.",
      "Implemented frontend role-based access controls and data-masking workflows to securely manage user profiles, audit logs, and transaction monitoring.",
      "Improved client-side state management with Redux Toolkit and caching strategies to handle high-frequency financial data updates while minimizing unnecessary UI re-renders and dropped frames.",
    ],
  },
  {
    index: "04",
    title: "Dating & real-time messaging platform",
    href: "https://matchnmeet.io",
    domain: "Consumer",
    stack: ["Mapbox", "Google Maps", "Firebase", "REST"],
    points: [
      "Built a highly visual, cross-platform dating application, turning complex UI/UX wireframes into a pixel-perfect, component-driven frontend with smooth interactions and consistent visual quality.",
      "Integrated Mapbox and Google Maps APIs to support real-time location tracking, proximity-based matchmaking, and dynamic user heatmaps.",
      "Integrated Firebase Firestore and Realtime Database for real-time chat and notifications, optimizing client-side listeners to keep messages synchronized while reducing unnecessary updates.",
      "Improved client-side asset loading, image caching, and lazy-loading to deliver faster rendering for media-heavy profiles and discovery experiences.",
      "Integrated secure REST APIs for user profile verification, matchmaking, multi-factor authentication, and premium subscription payment flows.",
    ],
  },
  {
    index: "05",
    title: "Responsive websites & UI development",
    href: "https://odhavindustries.org",
    domain: "Marketing / product sites",
    stack: ["Next.js", "SSG", "Tailwind CSS", "Styled Components"],
    points: [
      "Built multiple responsive, SEO-friendly static websites using Next.js static generation and semantic HTML5, turning detailed UI/UX designs into accurate, production-ready frontend implementations.",
      "Developed reusable and scalable UI components with Tailwind CSS, Styled Components, and modern CSS3, keeping the codebase consistent, maintainable, and aligned with design standards.",
      "Improved website performance through image optimization, asset compression, and code-splitting, resulting in fast page loads and consistent experiences across devices and browsers.",
      "Maintained clean, modular frontend code that made future updates, backend integration, and team handoffs straightforward.",
    ],
  },
] satisfies readonly WorkItem[];

export const education = [
  {
    school: "Marwadi Education Foundation's Group of Institutions",
    place: "Rajkot, Gujarat",
    credential: "Master in Computer Applications, Gujarat Technological University",
    period: "2017 — 2019",
  },
  {
    school: "Smt. K. B. Parekh College of Computer Science",
    place: "Mahuva, Gujarat",
    credential: "Bachelor in Computer Applications, Bhavnagar University",
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
