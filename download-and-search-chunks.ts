import fs from 'fs';

async function main() {
  const chunks = [
    '4bd1b696-21f374d1156f834a.js',
    '255-6a3064acda041a34.js',
    'webpack-1e4aac2b32fa836b.js'
  ];

  for (const chunk of chunks) {
    const url = `https://canadianpropmoney.org/_next/static/chunks/${chunk}`;
    console.log(`\nFetching ${url}...`);
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    });
    if (res.ok) {
      const text = await res.text();
      console.log(`  Fetched: ${text.length} bytes`);
      const m7455Idx = text.indexOf('7455:');
      const zvIdx = text.indexOf('.zv');
      const cadIdx = text.indexOf('ca-100-stack');
      console.log(`  Contains "7455:": ${m7455Idx !== -1}`);
      console.log(`  Contains ".zv": ${zvIdx !== -1}`);
      console.log(`  Contains "ca-100-stack": ${cadIdx !== -1}`);

      if (cadIdx !== -1 || m7455Idx !== -1 || zvIdx !== -1) {
        fs.writeFileSync(`chunk_${chunk.replace(/\//g, '_')}`, text);
        console.log(`  Saved to chunk_${chunk.replace(/\//g, '_')}`);
        // Let's print context
        const bestIdx = cadIdx !== -1 ? cadIdx : (m7455Idx !== -1 ? m7455Idx : zvIdx);
        console.log(`  Context around Match:`);
        console.log(`  ...${text.substring(Math.max(0, bestIdx - 150), Math.min(text.length, bestIdx + 450))}...`);
      }
    } else {
      console.log(`  Failed to fetch: ${res.status}`);
    }
  }
}

main();
