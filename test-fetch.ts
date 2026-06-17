import fs from 'fs';

function main() {
  const html = fs.readFileSync('ca-100-stack.html', 'utf8');
  console.log('HTML total length:', html.length);

  const keywords = [
    'AggregateOffer',
    'lowPrice',
    'highPrice',
    'offerCount',
    'variants',
    'CAD',
    'USD',
    'stack',
    'bundle',
    'qtyLabel',
    'v1'
  ];

  keywords.forEach(keyword => {
    let index = 0;
    console.log(`\n=== KEYWORD: ${keyword} ===`);
    let count = 0;
    while ((index = html.indexOf(keyword, index)) !== -1) {
      count++;
      if (count <= 5) {
        const start = Math.max(0, index - 150);
        const end = Math.min(html.length, index + keyword.length + 150);
        console.log(`Match ${count} (idx ${index}):\n... ${html.substring(start, end).trim()} ...\n`);
      }
      index += keyword.length;
    }
    console.log(`Total occurrences of '${keyword}': ${count}`);
  });
}

main();
