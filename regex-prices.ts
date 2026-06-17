import fs from 'fs';

function main() {
  const html = fs.readFileSync('ca-100-stack.html', 'utf8');

  // Let's find all matches of prices in various HTML patterns
  const patterns = [
    /\$<!-- -->([\d\.,]+)/gi,
    /\$([\d\.,]+)/gi,
    /Price[^\d]*([\d\.,]+)/gi,
    /lowPrice[^\d]*([\d\.,]+)/gi,
    /highPrice[^\d]*([\d\.,]+)/gi,
  ];

  patterns.forEach((pat, i) => {
    console.log(`\n--- Pattern ${i}: ${pat} ---`);
    const matches = [...html.matchAll(pat)];
    console.log(`Found ${matches.length} matches`);
    matches.forEach((m, idx) => {
      console.log(`Match ${idx + 1}: Whole: "${m[0]}" Group 1: "${m[1]}"`);
      // print context
      const index = html.indexOf(m[0]);
      console.log(`  Context: ... ${html.substring(Math.max(0, index - 80), Math.min(html.length, index + m[0].length + 80))} ...`);
    });
  });
}

main();
