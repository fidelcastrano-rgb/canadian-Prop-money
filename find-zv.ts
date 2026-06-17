import fs from 'fs';

function main() {
  const js = fs.readFileSync('page-chunk.js', 'utf8');

  // Find occurrences of "zv" or "g.zv" or look for imports
  const index = js.indexOf('.zv');
  console.log('Occurrences of .zv:', index !== -1);
  if (index !== -1) {
    console.log('Context:', js.substring(Math.max(0, index - 200), index + 200));
  }

  // Let's search for how "g" is defined
  // Look for something like "g =" or "g =" or imports at the top
  const importMatches = [...js.matchAll(/import[\s\S]*?from[\s\S]*?;/g)];
  console.log('Imports:', importMatches.length);
  importMatches.forEach(m => console.log(m[0]));

  // Usually in Webpack/Turbopack, imports are like e.abc, or there's a require/import statement
  // Let's search for something that references product list
  const matches = [...js.matchAll(/[\w_]+\.zv/g)];
  console.log('Matches for zv:', matches.length);
  matches.forEach(m => {
    const idx = js.indexOf(m[0]);
    console.log(`Match: ${m[0]} at ${idx}`);
    console.log(`Context: ${js.substring(Math.max(0, idx - 150), idx + 150)}`);
  });
}

main();
