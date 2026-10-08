# BlazeByte Studio — Production Deployment Package

This directory contains the self-contained, production-ready release of **BlazeByte Studio**.
All scratch files, development scripts, and design screenshots have been filtered out.

---

## Directory Contents

```
dist/
├── index.html                 # Global Home Page
├── web-development.html       # Web Development Division ($199 - $1,299)
├── digital-marketing.html     # Digital Marketing Division ($249 - $699/mo)
├── ai-solutions.html          # AI Solutions & Automations ($149 - $499)
├── ai-chatbots.html           # Interactive Chatbot Sandbox ($149 - $499)
├── custom-applications.html   # Custom App Development ($499 - $1,499)
├── pricing.html               # Transparent Global USD Pricing Hub
├── our-work.html              # Verified Production Case Studies
├── solutions.html             # Solutions by Industry
├── about.html                 # About Studio, Coimbatore HQ & Philosophy
├── contact.html               # International Project Consultation Form
│
├── css/
│   ├── global.css             # Design tokens, layouts, cards, header, footer
│   └── chatbot.css            # Floating and embedded chatbot styles
│
├── js/
│   ├── pricing-data.js        # Single-source-of-truth USD pricing structure
│   ├── main.js                # Nav toggle, sticky header, FAQs
│   ├── chatbot-demo.js        # Interactive AI chatbot sandbox engine
│   └── enquiry.js             # Dual-dispatch lead capture (Supabase + FormSubmit)
│
├── assets/                    # Optimized logos, SVG icons, and case study visuals
├── sitemap.xml                # Search Engine Sitemap for international SEO
├── robots.txt                 # Search Engine Crawler rules
├── _redirects                 # 301 redirects for Netlify / Cloudflare Pages
├── vercel.json                # Cache policies and clean URLs for Vercel
└── netlify.toml               # Cache headers for Netlify
```

---

## Deployment Options

### 1. Netlify (Fastest - 30 Seconds)
- Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
- Drag and drop the **`dist`** folder (or `blazebyte-deploy.zip`).
- Your website is instantly live with free global CDN and SSL!

### 2. Vercel
- Install Vercel CLI: `npm i -g vercel`
- In terminal, navigate inside `dist`:
  ```bash
  cd dist
  vercel deploy --prod
  ```

### 3. GitHub Pages
- Push the contents of `dist` to a GitHub repository's `main` or `gh-pages` branch.
- In Repository Settings -> Pages, select branch `main` -> folder `/(root)` and Save.

### 4. cPanel / Shared Hosting / Apache / Nginx (Hostinger, GoDaddy, Namecheap)
- Compress or use `blazebyte-deploy.zip`.
- In your hosting File Manager, open `public_html`.
- Upload and extract the archive directly into `public_html`.

---

## Live Lead Capture Configuration

The consultation form in `contact.html` operates with dual-dispatch redundancy:
1. **Primary Database:** Writes directly to the Supabase REST endpoint (`customer_requests` table).
2. **Email Fallback:** Dispatches automatically via FormSubmit to `blazebytestudio7@gmail.com` with a unique tracking code (`BB-INTL-XXXXXX`).
