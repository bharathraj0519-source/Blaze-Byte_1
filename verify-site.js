const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
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
  '404.html',
  'sitemap.xml',
  'robots.txt',
  '.well-known/security.txt',
  'security.txt',
  'google583aea9356961634.html'
];

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(BASE_URL + urlPath, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, data }));
    }).on('error', err => reject(err));
  });
}

async function runVerification() {
  console.log('========================================================');
  console.log('BLAZEBYTE STUDIO — FULL SITE VERIFICATION');
  console.log('========================================================\n');

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const page of PAGES) {
    process.stdout.write(`Checking /${page}... `);
    try {
      const res = await fetchUrl('/' + page);
      if (res.statusCode !== 200) {
        console.log(`[FAIL] HTTP ${res.statusCode}`);
        totalErrors++;
        continue;
      }
      
      const content = res.data;
      
      const isHtml = page.endsWith('.html');
      const brokenHrefs = [];
      const brokenSrcs = [];

      if (isHtml) {
        // Check for broken links (href)
        const hrefMatches = content.matchAll(/href="([^"#][^"]*)"/g);
        for (const m of hrefMatches) {
          let href = m[1].split('?')[0].split('#')[0];
          if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
            continue; // external or protocols
          }
          const localPath = path.join(__dirname, href.startsWith('/') ? href.slice(1) : href);
          if (!fs.existsSync(localPath)) {
            brokenHrefs.push(href);
          }
        }

        // Check images (src)
        const srcMatches = content.matchAll(/src="([^"]+)"/g);
        for (const m of srcMatches) {
          let src = m[1].split('?')[0].split('#')[0];
          if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
            continue;
          }
          const localPath = path.join(__dirname, src.startsWith('/') ? src.slice(1) : src);
          if (!fs.existsSync(localPath)) {
            brokenSrcs.push(src);
          }
        }
      }

      if (brokenHrefs.length > 0 || brokenSrcs.length > 0) {
        console.log(`[WARN/FAIL]`);
        if (brokenHrefs.length > 0) {
          console.log(`   Broken hrefs: ${brokenHrefs.join(', ')}`);
          totalErrors += brokenHrefs.length;
        }
        if (brokenSrcs.length > 0) {
          console.log(`   Broken srcs: ${brokenSrcs.join(', ')}`);
          totalErrors += brokenSrcs.length;
        }
      } else {
        const info = isHtml ? `(Title: ${getTitle(content)})` : `(Size: ${content.length} bytes)`;
        console.log(`[PASS 200 OK] ${info}`);
      }
    } catch (err) {
      console.log(`[ERROR] ${err.message}`);
      totalErrors++;
    }
  }

  console.log('\n========================================================');
  console.log(`SUMMARY: ${totalErrors} Errors, ${totalWarnings} Warnings`);
  console.log('========================================================');
}

function getTitle(html) {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  return match ? match[1].trim() : 'No Title';
}

runVerification();
