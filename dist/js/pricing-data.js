/**
 * BLAZEBYTE STUDIO — CENTRALIZED INTERNATIONAL PRICING DATA
 * Single Source of Truth for all 4 Divisions
 */

const PRICING_DATA = {
  currency: "USD",
  symbol: "$",
  divisions: {
    web: {
      id: "web",
      name: "Web Development",
      badge: "High Performance",
      tagline: "High-Performance Websites Built to Convert.",
      packages: [
        {
          id: "web-starter",
          name: "Starter Landing Page",
          price: 199,
          billing: "One-time",
          popular: false,
          summary: "Perfect for new product launches, paid ad campaigns, or single service promotions.",
          features: [
            "One responsive custom landing page",
            "Professional international layout",
            "Conversion-optimized contact form",
            "Basic SEO setup & metadata",
            "Speed & mobile optimization",
            "One structured revision round",
            "Delivery: 3–5 business days"
          ],
          cta: "Start Your Website"
        },
        {
          id: "web-business",
          name: "Business Website",
          price: 499,
          billing: "One-time",
          popular: true,
          summary: "Essential digital presence for SMEs, service agencies, and growing startups.",
          features: [
            "Up to 5 custom responsive pages",
            "Bespoke UI/UX design (No cookie-cutter templates)",
            "Services, About, Case Studies & Contact sections",
            "Enquiry & lead capture integration",
            "Foundational technical SEO & Open Graph",
            "Google Analytics 4 setup",
            "Two structured revision rounds",
            "Delivery: 7–10 business days"
          ],
          cta: "Build Business Website"
        },
        {
          id: "web-premium",
          name: "Premium Corporate Website",
          price: 999,
          billing: "One-time",
          popular: false,
          summary: "High-end corporate platform with premium interactions and CMS capabilities.",
          features: [
            "Up to 10 custom pages",
            "High-end bespoke UI/UX & micro-interactions",
            "Headless CMS integration where suitable",
            "Full conversion event tracking",
            "Sub-second performance optimization",
            "Advanced technical SEO & schema markup",
            "Three structured revision rounds",
            "30-day post-launch warranty support"
          ],
          cta: "Get Premium Platform"
        },
        {
          id: "web-ecommerce",
          name: "E-Commerce Website",
          price: 1299,
          billing: "Starting at / One-time",
          popular: false,
          summary: "High-converting online store with full catalogue, cart, and payment gateway.",
          features: [
            "Full product catalogue & category system",
            "Shopping cart & dynamic checkout flow",
            "Secure payment gateway integration",
            "Order & inventory management dashboard",
            "Mobile-first responsive storefront",
            "Core store analytics & conversion funnels",
            "Transaction emails & invoice generation",
            "45-day warranty & maintenance handover"
          ],
          cta: "Launch Your Store"
        },
        {
          id: "web-custom",
          name: "Custom Web Platform",
          price: 1499,
          billing: "Starting at / One-time",
          popular: false,
          summary: "Bespoke digital platform built for specialized workflows and member portals.",
          features: [
            "Custom frontend & backend architecture",
            "User authentication & protected member areas",
            "Tailored database schema & API integrations",
            "Custom administration dashboard",
            "Enterprise-grade security & SSL",
            "Dedicated performance architecture",
            "Comprehensive technical documentation",
            "Custom milestone roadmap"
          ],
          cta: "Discuss Platform"
        },
        {
          id: "web-maintenance",
          name: "Website Maintenance & Care",
          price: 79,
          billing: "Monthly",
          popular: false,
          summary: "Continuous security monitoring, uptime checks, and content updates.",
          features: [
            "24/7 uptime & SSL monitoring",
            "Weekly database & asset backups",
            "Core framework & security patches",
            "Up to 2 hours of monthly content updates",
            "Monthly speed & performance audit report",
            "Priority developer email support"
          ],
          cta: "Subscribe to Care"
        }
      ]
    },

    marketing: {
      id: "marketing",
      name: "Digital Marketing",
      badge: "Measurable ROI",
      tagline: "Marketing That Turns Attention Into Business Growth.",
      packages: [
        {
          id: "mkt-social",
          name: "Social Media Starter",
          price: 249,
          billing: "Monthly",
          popular: false,
          summary: "Establish an authentic, consistent brand presence across key social channels.",
          features: [
            "8 custom branded social media posts / month",
            "Engaging copywriting & caption strategy",
            "Targeted hashtag & audience research",
            "Content calendar planning & scheduling",
            "Monthly engagement performance summary",
            "One round of monthly content revisions"
          ],
          cta: "Start Social Growth"
        },
        {
          id: "mkt-seo",
          name: "SEO Growth Engine",
          price: 399,
          billing: "Monthly",
          popular: true,
          summary: "Systematic technical and on-page SEO to capture high-intent international search.",
          features: [
            "In-depth technical SEO audit & fix plan",
            "High-intent commercial keyword research",
            "Up to 10 priority pages optimized per month",
            "Google Search Console & sitemap health",
            "GA4 conversion tracking & organic monitoring",
            "Monthly keyword ranking & traffic progress report",
            "Competitor keyword gap analysis"
          ],
          cta: "Boost Search Rankings"
        },
        {
          id: "mkt-ads",
          name: "Ads Management",
          price: 299,
          billing: "Monthly (Ad spend separate)",
          popular: false,
          summary: "Data-driven Google or Meta ad campaigns designed for qualified lead generation.",
          features: [
            "Management of 1 primary channel (Google or Meta)",
            "Audience segmentation & targeting setup",
            "Ad copy & creative direction",
            "Conversion tracking & pixel verification",
            "A/B split testing of ad copy & headlines",
            "Weekly campaign bid & budget optimization",
            "Bi-weekly performance reporting"
          ],
          cta: "Launch Ad Campaigns"
        },
        {
          id: "mkt-business",
          name: "Business Growth Package",
          price: 699,
          billing: "Monthly (Ad spend separate)",
          popular: false,
          summary: "Integrated multi-channel marketing combining organic search, social, and ads.",
          features: [
            "Complete SEO management (up to 15 pages)",
            "12 bespoke social media posts & graphics",
            "Full management of 1 advertising channel",
            "Monthly growth strategy review session",
            "Conversion rate audit & landing page recommendations",
            "Consolidated monthly executive report"
          ],
          cta: "Scale Business Growth"
        },
        {
          id: "mkt-automation",
          name: "Growth + Marketing Automation",
          price: 999,
          billing: "Monthly (Ad spend separate)",
          popular: false,
          summary: "Omni-channel marketing paired with automated lead nurturing workflows.",
          features: [
            "Everything in Business Growth package",
            "1 automated lead nurturing sequence (Email/CRM)",
            "Lead scoring & attribution configuration",
            "Management of up to 2 advertising channels",
            "Monthly conversion rate optimization (CRO) tests",
            "Bi-weekly strategic growth consulting"
          ],
          cta: "Accelerate With Automation"
        }
      ]
    },

    ai: {
      id: "ai",
      name: "AI Solutions & Chatbots",
      badge: "Intelligent Systems",
      tagline: "Intelligent AI Solutions That Work for Your Business.",
      packages: [
        {
          id: "ai-basic-bot",
          name: "Basic AI Website Chatbot",
          price: 149,
          billing: "One-time Setup (API usage separate)",
          popular: false,
          summary: "Custom AI assistant trained on your business FAQs to guide website visitors.",
          features: [
            "Custom-trained chatbot for your website",
            "Answers business FAQs & company details",
            "Explains services, packages, and pricing",
            "Basic lead contact collection (Email & Phone)",
            "Custom brand styling & floating chat launcher",
            "Mobile-responsive chat interface",
            "Human handoff / fallback notification"
          ],
          cta: "Build Website Chatbot"
        },
        {
          id: "ai-lead-bot",
          name: "AI Lead Capture Chatbot",
          price: 299,
          billing: "One-time Setup (API usage separate)",
          popular: true,
          summary: "Proactive AI agent that qualifies inbound traffic and captures structured leads.",
          features: [
            "Proactive chat prompts based on page context",
            "Multi-step lead qualification questionnaire",
            "Instant email / webhook lead notifications",
            "Google Sheets or Airtable CRM sync",
            "Custom booking calendar link handoff",
            "Conversation history dashboard",
            "Standard prompt guardrails & privacy compliance"
          ],
          cta: "Deploy Lead Bot"
        },
        {
          id: "ai-support-agent",
          name: "AI Customer Support Agent",
          price: 399,
          billing: "One-time Setup (API usage separate)",
          popular: false,
          summary: "Automated support assistant utilizing custom knowledge bases and documentation.",
          features: [
            "Trained on your knowledge base, manuals & docs",
            "Automated enquiry classification & tagging",
            "Support ticket generation via webhooks",
            "Multi-language support for international clients",
            "Human agent escalation protocols",
            "Analytics on common user questions & gaps"
          ],
          cta: "Automate Support"
        },
        {
          id: "ai-workflow",
          name: "AI Workflow Automation",
          price: 499,
          billing: "One-time Setup (Integrations separate)",
          popular: false,
          summary: "Bridge disjointed business tools with intelligent autonomous data flows.",
          features: [
            "2 multi-step automated workflows",
            "CRM, email, and Google Workspace integrations",
            "Automated enquiry summarization & routing",
            "WhatsApp Business notification triggers",
            "Error handling & failure alert system",
            "Testing, verification & client handover training"
          ],
          cta: "Automate Workflows"
        },
        {
          id: "ai-advanced-agent",
          name: "Advanced Custom AI Agent",
          price: 999,
          billing: "One-time Setup",
          popular: false,
          summary: "Autonomous AI agent capable of multi-tool execution and retrieval pipelines.",
          features: [
            "Retrieval-Augmented Generation (RAG) pipeline",
            "Vector database integration for enterprise data",
            "Custom function & tool calling execution",
            "Strict hallucination guardrails & role prompting",
            "Comprehensive conversation telemetry",
            "Private API deployment & key security"
          ],
          cta: "Build Custom AI Agent"
        },
        {
          id: "ai-platform",
          name: "Custom AI Platform",
          price: 1999,
          billing: "Starting at / One-time Setup",
          popular: false,
          summary: "Full-scale proprietary AI application tailored to internal operations.",
          features: [
            "Custom web interface for internal team use",
            "Multi-model orchestration (OpenAI, Gemini, Anthropic)",
            "Role-based access control & enterprise security",
            "Automated reporting & batch processing",
            "Custom API endpoints for third-party systems",
            "Dedicated architecture & deployment documentation"
          ],
          cta: "Discuss AI Architecture"
        }
      ]
    },

    apps: {
      id: "apps",
      name: "Custom Applications",
      badge: "Scalable Software",
      tagline: "Custom Software Built Around Your Business.",
      packages: [
        {
          id: "app-dashboard",
          name: "Basic Business Dashboard",
          price: 499,
          billing: "Starting at / One-time",
          popular: false,
          summary: "Centralized internal dashboard for tracking operational metrics and team workflows.",
          features: [
            "Custom data visualization & KPIs",
            "Secure admin authentication",
            "Data entry & management forms",
            "Export to CSV / Excel functionality",
            "Responsive layout for tablet & desktop",
            "Database connection (Supabase / PostgreSQL)"
          ],
          cta: "Build Dashboard"
        },
        {
          id: "app-booking",
          name: "Booking & Scheduling System",
          price: 799,
          billing: "Starting at / One-time",
          popular: false,
          summary: "Automated booking application with real-time calendar availability and alerts.",
          features: [
            "Customer appointment booking portal",
            "Staff calendar & schedule management",
            "Automated email / SMS reminders",
            "Timezone conversion for international clients",
            "Payment / deposit capture option",
            "Google Calendar / Outlook sync"
          ],
          cta: "Build Booking App"
        },
        {
          id: "app-crm",
          name: "Custom CRM System",
          price: 1299,
          billing: "Starting at / One-time",
          popular: true,
          summary: "Purpose-built CRM matching your exact sales stages, lead tags, and pipeline.",
          features: [
            "Bespoke sales pipeline & deal stages",
            "Customer profile & contact history tracking",
            "Team role-based permissions (Admin, Sales, Support)",
            "Automated lead assignment rules",
            "Activity timeline & communication notes",
            "Revenue forecasting & conversion reporting"
          ],
          cta: "Build Custom CRM"
        },
        {
          id: "app-web-app",
          name: "Custom Web Application",
          price: 1499,
          billing: "Starting at / One-time",
          popular: false,
          summary: "Full-stack web application designed for external users and customer self-service.",
          features: [
            "Complete user signup, auth & profile system",
            "Customer self-service portal / dashboard",
            "Relational database design & optimization",
            "REST / GraphQL API architecture",
            "Stripe / Razorpay payment integration",
            "Enterprise-grade security & audit logs"
          ],
          cta: "Develop Web App"
        },
        {
          id: "app-mobile",
          name: "Cross-Platform Mobile Application",
          price: 2499,
          billing: "Starting at / One-time",
          popular: false,
          summary: "Native-quality mobile application built with Flutter for iOS and Android.",
          features: [
            "Single codebase for iOS & Android (Flutter)",
            "Fluid 60fps mobile UI/UX design",
            "Push notifications & device permissions",
            "Offline data caching & sync",
            "App Store & Google Play preparation assistance",
            "Backend API integration"
          ],
          cta: "Develop Mobile App"
        },
        {
          id: "app-saas-mvp",
          name: "SaaS MVP Development",
          price: 2999,
          billing: "Starting at / One-time",
          popular: false,
          summary: "Rapid production-ready Minimum Viable Product to validate your startup concept.",
          features: [
            "Multi-tenant SaaS architecture",
            "Subscription billing & tier management (Stripe)",
            "User onboarding & team workspaces",
            "Core proprietary product workflow implementation",
            "Transactional email infrastructure",
            "Production deployment on Vercel / AWS / Cloudflare",
            "Full code ownership & Git repository transfer"
          ],
          cta: "Launch SaaS MVP"
        }
      ]
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = PRICING_DATA;
}
