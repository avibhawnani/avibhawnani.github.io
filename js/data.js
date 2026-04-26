/* ============================================
   data.js — ALL editable content lives here.
   
   To update your portfolio:
   - Add a post → push to POSTS array
   - Add a job  → push to EXPERIENCE array
   - Add a project → push to PROJECTS array
   - Add an essay  → push to WRITINGS array
   
   Then refresh the page. No HTML to touch.
   ============================================ */

const PROFILE = {
  name: "Avi Bhawnani",
  headline: "Hi, I am Avi. I build the systems that keep distributed backends fast, reliable, and ready for scale.",
  status: "open to opportunities",
  lastUpdated: "Apr 2026",
  email: "avibhawnani.in@gmail.com",
  twitter: "https://leetcode.com/u/avibhawnani/",
  github: "https://github.com/avibhawnani",
  linkedin: "https://www.linkedin.com/in/avibhawnani/",
  footerTagline: "avi bhawnani · india",
};

const WORK_BLURB = {
  company: "Reliance Jio Platforms",
  product: "CloudXP CMDB",
  description: `My most recent role is at <span class="inline-company"><img src="content/jio_logo.webp" class="company-logo" alt="Jio" /> Reliance Jio</span> where I worked as a Backend Engineer on the <strong>CloudXP</strong> platform — an enterprise SaaS product that provides a unified control plane for cloud resource management across multiple cloud service providers.</span>`,
};

const STATS = [];

const SKILLS = [
  {
    category: "Languages",
    items: ["Java 17", "Core Java", "SQL"],
  },
  {
    category: "Frameworks",
    items: ["Spring Boot", "Spring MVC", "Spring Security", "Spring Data JPA", "Hibernate", "Spring Cloud"],
  },
  {
    category: "Messaging",
    items: ["Apache Kafka"],
  },
  {
    category: "Databases & Search",
    items: ["Oracle DB", "PostgreSQL", "Elasticsearch"],
  },
  {
    category: "DevOps & Tools",
    items: ["Azure DevOps", "Git", "Maven"],
  },
  {
    category: "Testing & Debugging",
    items: ["JUnit", "Postman", "VisualVM", "Eclipse MAT"],
  },
  {
    category: "Core Concepts",
    items: ["Microservices", "REST APIs", "Multithreading & Concurrency", "System Design", "Design Patterns"],
  },
];

const EXPERIENCE = [
  {
    role:    "Software Development Engineer 1",
    company: "Reliance Jio Platforms",
    location: "Mumbai, India",
    period:  "Dec 2023 – Present",
    description: `Owned the backend of <strong>CloudXP CMDB</strong> — an enterprise SaaS control plane used by large organisations to manage cloud assets across GCP, Azure, and OpenShift. Designed and maintained <strong>50+ production REST APIs</strong> in Java 17 and Spring Boot spanning cloud asset lifecycle, database provisioning, and infrastructure workflows; reusable architecture patterns cut feature delivery time by <span class="metric">80% faster delivery</span>.
      <br><br>
      Diagnosed a 5-hop synchronous bottleneck in the asset-fetch critical path and rebuilt it end-to-end — collapsing 5 sequential service calls to 2, parallelizing the remainder with <strong>CompletableFuture</strong>, and layering <strong>Caffeine in-process caching</strong> with TTL-based invalidation. Added <strong>cursor-based pagination</strong> to eliminate unbounded result sets. Outcome: <span class="metric">94% p95 latency cut</span> (15s → 800ms), validated at 30 RPS under K6 load testing.
      <br><br>
      Architected <strong>Kafka-based async event pipelines</strong> for near real-time Elasticsearch synchronization across distributed microservices — fault-tolerant message processing with guaranteed delivery semantics across the cloud management workflow.
      <br><br>
      Led <strong>P0/P1 incident response</strong> across the event-driven pipeline — diagnosing JVM heap pressure from unbounded Kafka batch queries and SQL deadlocks using VisualVM and Eclipse MAT. Authored post-incident RCAs and partnered with solution architects and DBAs on design reviews, driving a <span class="metric">25% fewer incidents</span> and maintaining SLA stability.`,
    tags: ["Java 17", "Spring Boot", "Kafka", "PostgreSQL", "Oracle", "Elasticsearch", "CompletableFuture", "Caffeine", "K6", "REST APIs"],
  },
];

const EDUCATION = [
  {
    degree:     "B.Tech in Computer Science & Engineering",
    institute:  "Dr. A.P.J. Abdul Kalam Technical University",
    location:   "Lucknow, India",
    period:     "Aug 2019 – Jun 2023",
  },
];

const WRITINGS = [];

const PROJECTS = [
  {
    name: "Async Job Processing Engine",
    year: 2025,
    featured: true,
    url: "https://github.com/avibhawnani/asyncJobEngine",
    description: `A production-grade, DB-backed async job engine built with Spring Boot 3 and PostgreSQL — no Kafka or Redis required. Uses <span class="inline-code">ThreadPoolExecutor</span> for concurrency, <span class="inline-code">@Version</span> optimistic locking to prevent double-processing across horizontal instances, and a Strategy Pattern for pluggable job handlers. Includes bounded retry with exponential backoff, a dead-job audit trail, and a custom Spring Actuator health indicator. Fully containerised with Docker Compose.`,
    tags: ["Java 17", "Spring Boot", "PostgreSQL", "ThreadPoolExecutor", "Optimistic Locking", "Docker"],
  },
  {
    name: "PreShop — E-commerce Storefront",
    year: 2023,
    url: "https://github.com/avibhawnani/PreShop-Ecommerce-App",
    description: `Full-stack e-commerce storefront built with React.js, Strapi as the headless CMS for product and order management, and Stripe for real payment processing. Features product catalogue browsing, cart management, and a complete checkout flow with live payment integration.`,
    tags: ["React.js", "Strapi", "Stripe", "JavaScript", "SCSS"],
  },
  {
    name: "MED3 — Decentralised EHR System",
    year: 2023,
    url: "https://github.com/avibhawnani/MED3",
    description: `A decentralised Electronic Health Record system built on the Polygon blockchain. Healthcare providers can securely access and share patient data without a central authority — smart contracts written in Solidity handle access control, with Web3 Storage for data persistence and RainbowKit for wallet-based auth. Built with React.js and MaterialUI. ⭐ 20 stars on GitHub.`,
    tags: ["Solidity", "React.js", "Polygon", "Blockchain", "Hardhat", "Web3"],
  },
  {
    name: "Coursify — Course Publishing Platform",
    year: 2023,
    url: "https://github.com/avibhawnani/coursify-frontend",
    description: `A full-stack course publishing platform inspired by Udemy. Instructors can create and publish structured courses; students can browse, enroll, and track progress. Built with React.js on the frontend and Node.js + Express.js on the backend, with a REST API connecting both. Deployed on Vercel.`,
    tags: ["React.js", "Node.js", "Express.js", "JavaScript", "REST API"],
  },
];
