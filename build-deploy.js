const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const HTML_FILES = [
  'index.html',
  'web-development.html',
  'digital-marketing.html',
  'ai-solutions.html',
  'ai-chatbots.html',
  'custom-applications.html',
  'pricing.html',
  'our-work.html',
  'solutions.html',
  'about.html',
  'contact.html',
  'security.html',
  'privacy-policy.html',
  'terms-of-service.html',
  'refund-policy.html',
  'cookie-policy.html',
  '404.html'
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('--- Preparing BlazeByte Studio Deployment Package ---');

// 1. Clean or create dist directory
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
ensureDir(DIST_DIR);

// 2. Copy HTML pages
console.log('Copying 11 production HTML pages...');
HTML_FILES.forEach(file => {
  const src = path.join(ROOT_DIR, file);
  const dest = path.join(DIST_DIR, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`  + ${file}`);
  } else {
    console.error(`  ! Missing ${file}`);
  }
});

// 3. Copy css, js, assets directories
console.log('Copying css/, js/, assets/ directories...');
copyDir(path.join(ROOT_DIR, 'css'), path.join(DIST_DIR, 'css'));
copyDir(path.join(ROOT_DIR, 'js'), path.join(DIST_DIR, 'js'));
copyDir(path.join(ROOT_DIR, 'assets'), path.join(DIST_DIR, 'assets'));
if (fs.existsSync(path.join(ROOT_DIR, '.well-known'))) {
  copyDir(path.join(ROOT_DIR, '.well-known'), path.join(DIST_DIR, '.well-known'));
}
['.htaccess', 'security.txt', 'supabase-schema.sql', 'LEGAL_LICENSES.md', 'favicon.ico', 'google583aea9356961634.html'].forEach(f => {
  const p = path.join(ROOT_DIR, f);
  if (fs.existsSync(p)) fs.copyFileSync(p, path.join(DIST_DIR, f));
});
console.log('  + css/ (global.css, chatbot.css)');
console.log('  + js/ (main.js, pricing-data.js, chatbot-demo.js, enquiry.js, cookie-consent.js, custom-select.js)');
console.log('  + assets/ (all imagery, logos, icons, vector graphics)');
console.log('  + security & legal files (.htaccess, security.txt, .well-known, LEGAL_LICENSES.md)');

// 4. Generate robots.txt
const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: https://www.blazebyte.shop/sitemap.xml
`;
fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf8');
console.log('  + robots.txt created');

// 5. Generate sitemap.xml
const BASE_DOMAIN = 'https://www.blazebyte.shop';
const today = new Date().toISOString().split('T')[0];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_DOMAIN}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_DOMAIN}/web-development.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_DOMAIN}/digital-marketing.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_DOMAIN}/ai-solutions.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_DOMAIN}/ai-chatbots.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_DOMAIN}/custom-applications.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_DOMAIN}/pricing.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_DOMAIN}/our-work.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_DOMAIN}/solutions.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_DOMAIN}/about.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${BASE_DOMAIN}/contact.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_DOMAIN}/security.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${BASE_DOMAIN}/privacy-policy.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${BASE_DOMAIN}/terms-of-service.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${BASE_DOMAIN}/refund-policy.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${BASE_DOMAIN}/cookie-policy.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;
fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('  + sitemap.xml created');

// 6. Generate _redirects (for Netlify / Cloudflare Pages)
const redirectsContent = `# Netlify & Cloudflare Pages Redirects
/home                /                     301
/services            /web-development.html 301
/portfolio           /our-work.html        301
`;
fs.writeFileSync(path.join(DIST_DIR, '_redirects'), redirectsContent, 'utf8');
console.log('  + _redirects created');

// 7. Generate vercel.json (for Vercel deployment)
const vercelConfig = {
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/css/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=604800, stale-while-revalidate=86400"
        }
      ]
    },
    {
      "source": "/js/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=604800, stale-while-revalidate=86400"
        }
      ]
    }
  ]
};
fs.writeFileSync(path.join(DIST_DIR, 'vercel.json'), JSON.stringify(vercelConfig, null, 2), 'utf8');
console.log('  + vercel.json created');

// 8. Generate netlify.toml
const netlifyToml = `[build]
  publish = "."

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=604800"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=604800"
`;
fs.writeFileSync(path.join(DIST_DIR, 'netlify.toml'), netlifyToml, 'utf8');
console.log('  + netlify.toml created');

// 9. Generate deployment guide (README.md)
const deployGuide = `# BlazeByte Studio — Production Deployment Package

This directory contains the self-contained, production-ready release of **BlazeByte Studio**.
All scratch files, development scripts, and design screenshots have been filtered out.

---

## Directory Contents

\`\`\`
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
\`\`\`

---

## Deployment Options

### 1. Netlify (Fastest - 30 Seconds)
- Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
- Drag and drop the **\`dist\`** folder (or \`blazebyte-deploy.zip\`).
- Your website is instantly live with free global CDN and SSL!

### 2. Vercel
- Install Vercel CLI: \`npm i -g vercel\`
- In terminal, navigate inside \`dist\`:
  \`\`\`bash
  cd dist
  vercel deploy --prod
  \`\`\`

### 3. GitHub Pages
- Push the contents of \`dist\` to a GitHub repository's \`main\` or \`gh-pages\` branch.
- In Repository Settings -> Pages, select branch \`main\` -> folder \`/(root)\` and Save.

### 4. cPanel / Shared Hosting / Apache / Nginx (Hostinger, GoDaddy, Namecheap)
- Compress or use \`blazebyte-deploy.zip\`.
- In your hosting File Manager, open \`public_html\`.
- Upload and extract the archive directly into \`public_html\`.

---

## Live Lead Capture Configuration

The consultation form in \`contact.html\` operates with dual-dispatch redundancy:
1. **Primary Database:** Writes directly to the Supabase REST endpoint (\`customer_requests\` table).
2. **Email Fallback:** Dispatches automatically via FormSubmit to \`blazebytestudio7@gmail.com\` with a unique tracking code (\`BB-INTL-XXXXXX\`).
`;
fs.writeFileSync(path.join(DIST_DIR, 'README.md'), deployGuide, 'utf8');
console.log('  + README.md deployment guide created');

console.log('\n--- Deployment Package Built Successfully in /dist ---');
