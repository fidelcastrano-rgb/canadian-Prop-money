import fs from 'fs';

async function fetchChunk() {
  const url = 'https://canadianpropmoney.org/_next/static/chunks/app/products/%5Bslug%5D/page-acb326f123d028c7.js';
  console.log(`Fetching Next.js page chunk: ${url}`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    }
  });
  if (res.ok) {
    const js = await res.text();
    console.log(`Successfully fetched JS chunk. Length: ${js.length}`);
    fs.writeFileSync('page-chunk.js', js);
    console.log('Saved to page-chunk.js');

    // Search for any arrays or patterns like JSON-LD or actual pricing list
    // We can search for words that look like pricing structures or look for arrays in the code.
    const keywords = ['Starter Bundle', 'Compact Bundle', 'v-price', 'qtyLabel', 'price', 'originalPrice', '200', '310'];
    keywords.forEach(kw => {
      const idx = js.indexOf(kw);
      console.log(`Contains "${kw}":`, idx !== -1);
      if (idx !== -1) {
        console.log(`  Context around "${kw}":\n  ...${js.substring(Math.max(0, idx - 150), Math.min(js.length, idx + kw.length + 150))}...`);
      }
    });
  } else {
    console.log('Fetch failed with status:', res.status);
  }
}

fetchChunk();
