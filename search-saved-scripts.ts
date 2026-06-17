import fs from 'fs';

function main() {
  const scripts = ['script_10.js', 'script_11.js', 'script_14.js', 'script_15.js'];
  scripts.forEach(s => {
    if (fs.existsSync(s)) {
      const content = fs.readFileSync(s, 'utf8');
      console.log(`\n=== SEARCHING IN ${s} (length: ${content.length}) ===`);
      
      // search for prices or names
      const keywords = ['Starter Bundle', 'Compact Bundle', '200', '10000', 'offerCount', 'priceCurrency'];
      keywords.forEach(kw => {
        const found = content.includes(kw);
        console.log(`Contains "${kw}":`, found);
        if (found) {
          // print surrounding characters of first match
          const idx = content.indexOf(kw);
          console.log(`  Match context for "${kw}":\n  ...${content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + kw.length + 100))}...`);
        }
      });
    }
  });
}

main();
