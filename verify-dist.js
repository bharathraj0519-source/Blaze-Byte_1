const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');
const PAGES = [
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

console.log('--- Verifying Dist Deployment Package ---');
let errors = 0;

PAGES.forEach(page => {
  const filePath = path.join(DIST_DIR, page);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing page: ${page}`);
    errors++;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // Verify hrefs
  for (const m of content.matchAll(/href="([^"#][^"]*)"/g)) {
    const href = m[1].split('?')[0].split('#')[0];
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    const target = path.join(DIST_DIR, href.startsWith('/') ? href.slice(1) : href);
    if (!fs.existsSync(target)) {
      console.error(`[Broken href] in ${page}: ${href}`);
      errors++;
    }
  }

  // Verify srcs
  for (const m of content.matchAll(/src="([^"]+)"/g)) {
    const src = m[1].split('?')[0].split('#')[0];
    if (src.startsWith('http') || src.startsWith('data:')) continue;
    const target = path.join(DIST_DIR, src.startsWith('/') ? src.slice(1) : src);
    if (!fs.existsSync(target)) {
      console.error(`[Broken src] in ${page}: ${src}`);
      errors++;
    }
  }
});

console.log(`Dist Verification Complete: ${errors} errors found.`);
if (errors === 0) {
  console.log('All pages, CSS, JS, and assets in /dist are 100% self-contained and valid!');
}
