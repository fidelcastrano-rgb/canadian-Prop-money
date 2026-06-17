import fs from 'fs';

async function main() {
  const url = 'https://canadianpropmoney.org/_next/static/chunks/0-e2d5ef97cebeef49.js';
  console.log(`Fetching: ${url}`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    }
  });
  if (res.ok) {
    const text = await res.text();
    console.log(`Fetched: ${text.length} bytes`);
    fs.writeFileSync('chunk_0.js', text);
    console.log('Saved to chunk_0.js');

    const zvIdx = text.indexOf('.zv');
    const cadIdx = text.indexOf('ca-100-stack');
    const m7455Idx = text.indexOf('7455:');
    console.log(`Contains ".zv": ${zvIdx !== -1}`);
    console.log(`Contains "ca-100-stack": ${cadIdx !== -1}`);
    console.log(`Contains "7455:": ${m7455Idx !== -1}`);

    if (cadIdx !== -1 || m7455Idx !== -1) {
      const idx = cadIdx !== -1 ? cadIdx : m7455Idx;
      console.log('Context MATCH:');
      console.log(`... ${text.substring(Math.max(0, idx - 150), Math.min(text.length, idx + 450))} ...`);
    }
  } else {
    console.log('Fetch failed with status:', res.status);
  }
}

main();
