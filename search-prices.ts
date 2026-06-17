import fs from 'fs';

function main() {
  const html = fs.readFileSync('ca-100-stack.html', 'utf8');

  // Let's search for how the prices are handled in the client!
  // Look for any pattern in HTML that looks like JSON or array containing numbers
  // Next.js (App Router) has hydration data in `<script` elements or sometimes self-contained data.
  // Let's find all script tags, including self-closing ones or external files.
  const scriptTagsMatched: string[] = [];
  const scriptRegex = /<script([\s\S]*?)>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    scriptTagsMatched.push(match[0]);
  }

  console.log('Total script tags:', scriptTagsMatched.length);
  scriptTagsMatched.forEach((s, idx) => {
    console.log(`Script ${idx} tag opening:`, s.substring(0, 150));
  });

  // Let's search inside the entire HTML for any prices
  // Since we know the starting price is $200.00 and high price is $10000,
  // let's look for numbers like "200", "200.00", "10000", "10,000" in the HTML.
  const numbersToFind = ['200', '10000'];
  numbersToFind.forEach(num => {
    let pos = 0;
    console.log(`\n--- Matches for "${num}" ---`);
    let matches = 0;
    while ((pos = html.indexOf(num, pos)) !== -1) {
      matches++;
      if (matches <= 10) {
        console.log(`Match ${matches} (idx ${pos}): ... ${html.substring(Math.max(0, pos - 100), Math.min(html.length, pos + 100))} ...`);
      }
      pos += num.length;
    }
  });
}

main();
