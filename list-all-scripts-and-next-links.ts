import fs from 'fs';

function main() {
  const html = fs.readFileSync('ca-100-stack.html', 'utf8');

  // Find all <script src="...">
  const srcRegex = /<script[^>]+src="([^"]*)"/gi;
  let match;
  console.log('--- ALL SCRIPT SRCS ---');
  while ((match = srcRegex.exec(html)) !== null) {
    console.log(match[1]);
  }

  // Find all link preloads / prefetches
  const linkRegex = /<link[^>]+href="([^"]*)"/gi;
  console.log('\n--- ALL LINK HREFS ---');
  while ((match = linkRegex.exec(html)) !== null) {
    const relMatch = match[0].match(/rel="([^"]*)"/i);
    const rel = relMatch ? relMatch[1] : '';
    if (match[1].includes('.js') || match[1].includes('.json') || rel === 'preload' || rel === 'prefetch') {
      console.log(`[${rel}] ${match[1]}`);
    }
  }
}

main();
