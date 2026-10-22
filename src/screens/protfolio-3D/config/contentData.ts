export const PLATFORM_CONFIG = {
  youtube: {
    color: "#FF0000",
    accentColor: "#cc0000",
    icon: "▶",
    label: "YouTube",
    shape: "tv",
  },
  blog: {
    color: "#4A90D9",
    accentColor: "#2d6cb5",
    icon: "📝",
    label: "Blog",
    shape: "monitor",
  },
  tiktok: {
    color: "#00F2EA",
    accentColor: "#FF0050",
    icon: "🎵",
    label: "TikTok",
    shape: "phone",
  },
  instagram: {
    color: "#E1306C",
    accentColor: "#C13584",
    icon: "📷",
    label: "Instagram",
    shape: "phone",
  },
  x: {
    color: "#000000",
    accentColor: "#14171A",
    icon: "𝕏",
    label: "X (Twitter)",
    shape: "monitor",
  },
  linkedin: {
    color: "#0077B5",
    accentColor: "#005E93",
    icon: "in",
    label: "LinkedIn",
    shape: "monitor",
  },
  codrops: {
    color: "#0099FF",
    accentColor: "#0077CC",
    icon: "💧",
    label: "Codrops",
    shape: "monitor",
  },
};

interface RawContentItem {
  id: string;
  platform: string;
  title: string;
  description: string;
  thumbnail: string | null;
  url: string;
  date: string;
  views?: string;
  duration?: string;
  readTime?: string;
  likes?: string;
  frontTexture?: string;
  paintedFrontTexture?: string;
}

const RAW_CONTENT_DATA: RawContentItem[] = [
  {
    id: "yt-001",
    platform: "youtube",
    title: "Lead frontend, from Bhavnagar",
    description:
      "Five years shipping React and Next.js. A walk through how I lead frontend at 21Twelve — architecture, reviews, and teams of 2 to 10.",
    thumbnail: null,
    url: "https://www.linkedin.com/in/keval-dev",
    date: "2026-06-12",
    views: "2.1K",
    duration: "14:20",
  },
  {
    id: "yt-002",
    platform: "youtube",
    title: "Tablekart: book a table with an agent",
    description:
      "How WebMCP turns the guest site into a tool surface so Claude or Cursor can search restaurants, read a menu, and lock a live slot.",
    thumbnail: null,
    url: "https://cv-byt.vercel.app/",
    date: "2026-04-02",
    views: "1.6K",
    duration: "11:08",
  },
  {
    id: "yt-003",
    platform: "youtube",
    title: "Come closer: a room that hears distance",
    description:
      "A browser meeting stage where voices soften as you step away, and a shared screen belongs to the whole room.",
    thumbnail: null,
    url: "https://cv-chat-app-five.vercel.app/",
    date: "2026-02-18",
    views: "980",
    duration: "9:41",
  },
  {
    id: "yt-004",
    platform: "youtube",
    title: "Realtime markets without dropped frames",
    description:
      "Alpaca streams, order books, and Redux Toolkit on a trading frontend — how to paint high-frequency data without re-rendering the page.",
    thumbnail: null,
    url: "https://prospuh.com",
    date: "2025-11-07",
    views: "3.4K",
    duration: "18:55",
  },
  {
    id: "yt-005",
    platform: "youtube",
    title: "Maps, heat, and a chat that stays in sync",
    description:
      "Mapbox, Google Maps, and Firebase listeners on a dating product: proximity matches, heatmaps, and messages that do not thrash the client.",
    thumbnail: null,
    url: "https://matchnmeet.io",
    date: "2025-08-21",
    views: "2.7K",
    duration: "16:12",
  },
  {
    id: "yt-006",
    platform: "youtube",
    title: "A design system that cut delivery by 30%",
    description:
      "The React and Tailwind library four project teams actually used — tokens, primitives, and the reviews that kept it from forking.",
    thumbnail: null,
    url: "https://www.21twelveinteractive.com",
    date: "2025-05-14",
    views: "1.9K",
    duration: "13:27",
  },
  {
    id: "yt-007",
    platform: "youtube",
    title: "Core Web Vitals on a Next.js product",
    description:
      "Code-splitting, image weight, and SSR/SSG choices that kept marketing sites and app shells fast on mid-range phones.",
    thumbnail: null,
    url: "https://github.com/KevalBH",
    date: "2025-01-29",
    views: "1.4K",
    duration: "12:03",
  },
  {
    id: "yt-008",
    platform: "youtube",
    title: "Shipping with Cursor, Claude, and Copilot",
    description:
      "How I use agentic tools and n8n on real product work — faster drafts, the same review bar, and where the model is not allowed to guess.",
    thumbnail: null,
    url: "https://www.linkedin.com/in/keval-dev",
    date: "2024-10-03",
    views: "4.2K",
    duration: "10:36",
  },
  {
    id: "blog-001",
    platform: "blog",
    title: "Frontend architecture for fintech screens",
    description:
      "Role-based views, masked fields, and a state shape that can take a market tick without redrawing the whole dashboard.",
    thumbnail: null,
    url: "https://prospuh.com",
    date: "2026-05-19",
    readTime: "8 min",
  },
  {
    id: "blog-002",
    platform: "blog",
    title: "Jest, RTL, and a 95% coverage habit",
    description:
      "The testing bar we set on frontend initiatives: what belongs in a component test, and what we left to the pipeline.",
    thumbnail: null,
    url: "https://github.com/KevalBH",
    date: "2026-03-11",
    readTime: "6 min",
  },
  {
    id: "blog-003",
    platform: "blog",
    title: "Guest tools only: scoping WebMCP",
    description:
      "Discovery, cart, and reservations stay in the agent context. Admin panels do not. Notes from Tablekart.",
    thumbnail: null,
    url: "https://cv-byt.vercel.app/",
    date: "2026-01-22",
    readTime: "7 min",
  },
  {
    id: "blog-004",
    platform: "blog",
    title: "From E-logicals components to a lead seat",
    description:
      "What carried over from the first React job in Gandhinagar: REST integration, accessible UI, and killing legacy page scripts.",
    thumbnail: null,
    url: "https://www.elogicals.com",
    date: "2025-09-16",
    readTime: "9 min",
  },
  {
    id: "blog-005",
    platform: "blog",
    title: "Static sites that still feel designed",
    description:
      "Next.js SSG, Tailwind, and Styled Components on marketing builds — semantic HTML, compressed images, and a handoff a backend can extend.",
    thumbnail: null,
    url: "https://odhavindustries.org",
    date: "2025-06-04",
    readTime: "5 min",
  },
  {
    id: "blog-006",
    platform: "blog",
    title: "Redux Toolkit when the socket will not stop",
    description:
      "Caching and selectors for trade executions, so a live book updates the row that changed and leaves the rest alone.",
    thumbnail: null,
    url: "https://prospuh.com",
    date: "2025-02-27",
    readTime: "11 min",
  },
  {
    id: "blog-007",
    platform: "blog",
    title: "Mentoring without becoming the bottleneck",
    description:
      "Estimation, PR reviews, and architecture notes that let a team of ten ship while the lead still writes code.",
    thumbnail: null,
    url: "https://www.linkedin.com/in/keval-dev",
    date: "2024-11-18",
    readTime: "8 min",
  },
  {
    id: "blog-008",
    platform: "blog",
    title: "Axios, Context, and fewer re-renders",
    description:
      "Early lessons from client data flow: where Context is enough, where Redux earned its keep, and what we stopped fetching twice.",
    thumbnail: null,
    url: "https://github.com/KevalBH",
    date: "2023-08-09",
    readTime: "6 min",
  },
  {
    id: "tt-001",
    platform: "tiktok",
    title: "25 products, one frontend habit",
    description: "Reusable components first. The feature comes second.",
    thumbnail: null,
    url: "https://www.linkedin.com/in/keval-dev",
    date: "2026-06-02",
    views: "9.4K",
    likes: "840",
  },
  {
    id: "tt-002",
    platform: "tiktok",
    title: "WebMCP books the table",
    description: "Search, menu, live slot, confirm. The agent stays on the guest route.",
    thumbnail: null,
    url: "https://cv-byt.vercel.app/",
    date: "2026-04-28",
    views: "12.8K",
    likes: "1.1K",
  },
  {
    id: "tt-003",
    platform: "tiktok",
    title: "Step back, the voice fades",
    description: "Spatial audio on a browser stage. Presence, not a grid of tiles.",
    thumbnail: null,
    url: "https://cv-chat-app-five.vercel.app/",
    date: "2026-03-06",
    views: "7.2K",
    likes: "690",
  },
  {
    id: "tt-004",
    platform: "tiktok",
    title: "Order book, no jank",
    description: "One tick should update one row.",
    thumbnail: null,
    url: "https://prospuh.com",
    date: "2026-01-15",
    views: "15.6K",
    likes: "1.4K",
  },
  {
    id: "tt-005",
    platform: "tiktok",
    title: "Heatmap of who is nearby",
    description: "Mapbox plus a match list that does not refetch the whole city.",
    thumbnail: null,
    url: "https://matchnmeet.io",
    date: "2025-12-02",
    views: "18.1K",
    likes: "2.0K",
  },
  {
    id: "tt-006",
    platform: "tiktok",
    title: "Tailwind library, four teams",
    description: "Shared UI. About 30% faster delivery. Fewer one-off buttons.",
    thumbnail: null,
    url: "https://www.21twelveinteractive.com",
    date: "2025-09-23",
    views: "6.5K",
    likes: "510",
  },
  {
    id: "tt-007",
    platform: "tiktok",
    title: "95% coverage is a habit",
    description: "Jest and React Testing Library on the paths users actually touch.",
    thumbnail: null,
    url: "https://github.com/KevalBH",
    date: "2025-07-11",
    views: "4.8K",
    likes: "430",
  },
  {
    id: "tt-008",
    platform: "tiktok",
    title: "Cursor drafts, I still review",
    description: "Copilot, Claude, n8n. The PR does not merge itself.",
    thumbnail: null,
    url: "https://www.linkedin.com/in/keval-dev",
    date: "2025-04-17",
    views: "21.3K",
    likes: "2.6K",
  },
  {
    id: "tt-009",
    platform: "tiktok",
    title: "PWA shell, thin first paint",
    description: "Code-split the admin. Keep the landing honest.",
    thumbnail: null,
    url: "https://github.com/KevalBH",
    date: "2025-01-08",
    views: "5.9K",
    likes: "470",
  },
  {
    id: "tt-010",
    platform: "tiktok",
    title: "Firebase chat without listener spam",
    description: "Subscribe to the thread you opened. Leave the rest alone.",
    thumbnail: null,
    url: "https://matchnmeet.io",
    date: "2024-10-30",
    views: "11.2K",
    likes: "980",
  },
  {
    id: "tt-011",
    platform: "tiktok",
    title: "Ahmedabad standup, Bhavnagar desk",
    description: "Lead frontend at 21Twelve. Still writing the components.",
    thumbnail: null,
    url: "https://www.21twelveinteractive.com",
    date: "2024-06-19",
    views: "3.7K",
    likes: "290",
  },
  {
    id: "tt-012",
    platform: "tiktok",
    title: "First React job, Gandhinagar",
    description: "REST, accessible UI, and a legacy page turned into components.",
    thumbnail: null,
    url: "https://www.elogicals.com",
    date: "2022-04-06",
    views: "2.4K",
    likes: "180",
  },
];

const ytTextures = [
  "/textures/studio/tvfront_filmikprojektdlamultiego.webp",
  "/textures/studio/tvfront_filmikedytowaniezdjec.webp",
];
const ytPaintedTextures = [
  "/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp",
  "/textures/studio/tvfront_filmikedytowaniezdjec_painted.webp",
];
const blogTextures = ["/textures/studio/monitorfront_postnafbdoublewinner.webp"];
const blogPaintedTextures = [
  "/textures/studio/monitorfront_postnafbdoublewinner_painted.webp",
];
const ttTextures = ["/textures/studio/phonefront_followmeontiktok.webp"];
const ttPaintedTextures = ["/textures/studio/phonefront_followmeontiktok_painted.webp"];

let ytIdx = 0,
  blogIdx = 0,
  ttIdx = 0;
let ytPIdx = 0,
  blogPIdx = 0,
  ttPIdx = 0;

export const CONTENT_DATA = RAW_CONTENT_DATA.map((item) => {
  return {
    ...item,
    frontTexture:
      item.frontTexture ||
      (item.platform === "youtube"
        ? ytTextures[ytIdx++ % ytTextures.length]
        : item.platform === "blog"
          ? blogTextures[blogIdx++ % blogTextures.length]
          : ttTextures[ttIdx++ % ttTextures.length]),
    paintedFrontTexture:
      item.paintedFrontTexture ||
      (item.platform === "youtube"
        ? ytPaintedTextures[ytPIdx++ % ytPaintedTextures.length]
        : item.platform === "blog"
          ? blogPaintedTextures[blogPIdx++ % blogPaintedTextures.length]
          : ttPaintedTextures[ttPIdx++ % ttPaintedTextures.length]),
  };
});

export const getContentByPlatform = (platform: string) => {
  if (platform === "all") return CONTENT_DATA;
  return CONTENT_DATA.filter((item) => item.platform === platform);
};

export const getLatestContent = () => {
  return [...CONTENT_DATA].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )[0];
};
