/* ============================================
   data.js — ALL editable content lives here.

   To update your portfolio:
   - Change what you're building now → NOW
   - Add a job     → push to EXPERIENCE array
   - Add a project → push to PROJECTS array
   - Add a skill   → push into SKILLS group items
   - Edit links / headline → PROFILE

   Then refresh the page. No HTML to touch.
   ============================================ */

const PROFILE = {
  name: "Avi Bhawnani",
  monogram: "A",
  role: "Software Engineer",
  craft: "Backend & distributed systems",
  tagline: "building LAYN on the side",
  intro: "I build high-throughput microservices and the distributed backends behind them — fast, reliable, and ready for scale.",
  current: "SDE I @ Shiprocket",
  headline: "I build the high-throughput backends that keep distributed systems fast, reliable, and ready for scale.",
  status: "open to opportunities",
  building: "building LAYN",
  award: "Star Performer · Nov 2025",
  location: "Gurugram, India · open to remote",
  photo: "/content/avi.png",
  lastUpdated: "Aug 2026",
  email: "avibhawnani.in@gmail.com",
  leetcode: "https://leetcode.com/u/avibhawnani/",
  github: "https://github.com/avibhawnani",
  linkedin: "https://www.linkedin.com/in/avibhawnani/",
  footerTagline: "avi bhawnani · gurugram, india",
};

/* LAYN — the thing I'm building. Plain language, no tech talk. */
const NOW = {
  name: "LAYN",
  status: "Coming soon",
  url: "http://layn.in/",
  tagline: "Find your lane through what's happening.",
  movesTitle: "Sofa to street in three moves.",
  note: "Your lane. Your people. Tonight.",
  lead: `LAYN is a live map of small, local plans happening near you <strong>tonight</strong> — a kickabout, a supper for six, an open mic, chess in the park. Never a ticketed event; just people with room for a few more.`,
  body: `Anyone can host anything worth leaving the house for. You open the map, find a plan starting soon, and ask to join with a short note — and once the host says yes, the address appears and the chat opens.`,
  steps: [
    { t: "Open the map", d: "Every plan near you tonight, coloured by what it is and sorted by how soon it starts." },
    { t: "Read the plan", d: "The host, the headcount, how long it runs — everything except the exact address." },
    { t: "Ask to join", d: "Add a short note. They say yes, the address appears, and the chat opens." },
  ],
  categories: ["Games", "Music", "Rides", "Food"],
  cities: "Opening city by city across India — Delhi, Gurugram and Noida first.",
  role: "Founding engineer — building it end to end.",
};

const SKILLS = [
  {
    category: "Languages",
    desc: "What I build in",
    items: ["Java 21", "Java 17", "Core Java", "SQL"],
  },
  {
    category: "Backend",
    desc: "The backbone of my services",
    items: ["Spring Boot", "Spring MVC", "Spring Security", "Spring Data JPA", "Spring Cloud", "Hibernate"],
  },
  {
    category: "Messaging",
    desc: "For the things that can't block",
    items: ["Apache Kafka", "Event-Driven Architecture"],
  },
  {
    category: "Data & Search",
    desc: "Where state lives",
    items: ["PostgreSQL", "MySQL", "Oracle DB", "MongoDB", "ClickHouse", "Elasticsearch", "Caffeine"],
  },
  {
    category: "Architecture",
    desc: "How I think about systems",
    items: ["Microservices", "REST API Design", "System Design", "Design Patterns", "Concurrency"],
  },
  {
    category: "Tooling",
    desc: "Day to day",
    items: ["Docker", "Azure DevOps", "Git", "Maven", "JUnit", "K6", "VisualVM", "Eclipse MAT"],
  },
];

/* About me — short, first-person. Edit freely. */
const ABOUT = [
  `I'm a software engineer drawn to the unglamorous half of the stack — the systems underneath that have to stay fast and correct when everything else is on fire. Give me a slow request and I'll trace it to the real cause, cut the fat, and leave behind something that holds up under load.`,
  `Three years in, I've taken backends from first commit to production at <strong>Reliance Jio</strong> and <strong>Shiprocket</strong> — and I'm building <strong>LAYN</strong> on the side. Clean systems, honest metrics, things people actually use.`,
];

const EXPERIENCE = [
  {
    role:     "Software Development Engineer I",
    company:  "Shiprocket",
    team:     "Fastrr Checkout",
    location: "Gurugram",
    period:   "May 2026 — Present",
    current:  true,
    logo:     "/content/shiprocket.png",
    summary:  "Own the promotion, wallet & merchant-dashboard backends for Fastrr 1-click checkout.",
    highlights: [
      { m: "50+ brands" },
      { m: "10K+ orders/day" },
    ],
    tags: ["Java 21", "Spring Boot", "Kafka", "MongoDB", "ClickHouse"],
  },
  {
    role:     "Software Development Engineer I",
    company:  "Reliance Jio",
    team:     "CloudXP",
    location: "Mumbai",
    period:   "Dec 2023 — May 2026",
    logo:     "/content/jio_logo.webp",
    summary:  "Built the backend of a multi-tenant cloud-management SaaS platform.",
    highlights: [
      { m: "94% ↓", t: "Cut p95 latency 15s→800ms on a 5-hop flow with CompletableFuture, Caffeine caching & pagination." },
      { m: "50+ APIs", t: "Designed & owned 50+ production REST APIs; shared validation layers reused by 15+ modules." },
      { m: "20K+/day", t: "Architected a Kafka→Elasticsearch pipeline at sub-150ms sync, DLQ retries, zero message loss." },
      { m: "−25%", t: "Root-caused P0/P1 incidents (JVM heap, SQL deadlocks); guardrails cut recurrence 25%." },
    ],
    tags: ["Java 17", "Spring Boot", "Kafka", "Elasticsearch", "Oracle"],
  },
];

const PROJECTS = [
  {
    name: "LAYN",
    year: 2026,
    kind: "Founding engineer · building",
    url: "http://layn.in/",
    live: true,
    blurb: "A cross-platform React Native app for iOS and Android. Supabase (Postgres + Realtime) powers the backend, with row-level security gating each plan's address until a host approves; Firebase handles auth, and Mapbox renders the live map. Built end to end.",
    tags: ["React Native", "iOS", "Android", "Supabase", "PostgreSQL", "Firebase Auth", "Mapbox"],
  },
  {
    name: "Async Job Processing Engine",
    year: 2025,
    kind: "Backend · Systems",
    url: "https://github.com/avibhawnani/asyncJobEngine",
    blurb: "Distributed, DB-backed job engine — no Kafka or Redis. Optimistic locking stops double-processing across instances; Strategy-pattern handlers, DLQ retries, graceful shutdown.",
    description: `A distributed, DB-backed async job engine built with Spring Boot 3 and PostgreSQL — no Kafka or Redis required. Uses <span class="inline-code">ThreadPoolExecutor</span> for concurrency, <span class="inline-code">@Version</span> optimistic locking to prevent double-processing across instances, and a Strategy Pattern for pluggable job handlers. Includes DEAD-state DLQ retries with exponential backoff, graceful JVM shutdown, and a custom Actuator health indicator — verified with H2 + Awaitility integration tests.`,
    tags: ["Java 17", "Spring Boot 3", "PostgreSQL", "ThreadPoolExecutor", "Optimistic Locking", "Docker"],
  },
  {
    name: "MED3 — Decentralised EHR",
    year: 2023,
    kind: "Blockchain · ⭐ 20",
    url: "https://github.com/avibhawnani/MED3",
    blurb: "Decentralised Electronic Health Records on Polygon — Solidity smart contracts for access control, Web3 Storage, wallet-based auth.",
    description: `A decentralised Electronic Health Record system built on the Polygon blockchain. Providers securely access and share patient data without a central authority — Solidity smart contracts handle access control, with Web3 Storage for persistence and RainbowKit for wallet-based auth. Built with React.js and MaterialUI. ⭐ 20 stars on GitHub.`,
    tags: ["Solidity", "Polygon", "Hardhat", "Web3", "React.js"],
  },
  {
    name: "PreShop — E-commerce",
    year: 2023,
    kind: "Full-stack",
    url: "https://github.com/avibhawnani/PreShop-Ecommerce-App",
    blurb: "Full-stack storefront — Strapi headless CMS, Stripe live payments, full cart-to-checkout flow.",
    description: `Full-stack e-commerce storefront built with React.js, Strapi as the headless CMS for product and order management, and Stripe for real payment processing. Features product catalogue browsing, cart management, and a complete checkout flow with live payment integration.`,
    tags: ["React.js", "Strapi", "Stripe", "SCSS"],
  },
  {
    name: "Coursify — Course Platform",
    year: 2023,
    kind: "Full-stack",
    url: "https://github.com/avibhawnani/coursify-frontend",
    blurb: "Udemy-style course publishing — instructors publish structured courses; students enroll and track progress over a REST API.",
    description: `A full-stack course publishing platform inspired by Udemy. Instructors create and publish structured courses; students browse, enroll, and track progress. Built with React.js on the frontend and Node.js + Express.js on the backend, connected by a REST API. Deployed on Vercel.`,
    tags: ["React.js", "Node.js", "Express.js", "REST API"],
  },
];

const EDUCATION = [
  {
    degree:    "B.Tech, Computer Science & Engineering",
    institute: "Pranveer Singh Institute of Technology",
    location:  "Kanpur, India",
    period:    "Aug 2019 – Jun 2023",
  },
];
