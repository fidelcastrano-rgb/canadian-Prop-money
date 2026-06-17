import fs from 'fs';

function main() {
  const html = fs.readFileSync('ca-100-stack.html', 'utf8');

  // Let's find all buttons and print their full content or clean text!
  const buttons = [...html.matchAll(/<button[\s\S]*?<\/button>/gi)];
  console.log('Total buttons found:', buttons.length);
  buttons.forEach((b, idx) => {
    const text = b[0].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.includes('$') || text.includes('CAD') || text.includes('USD') || text.includes('Euro') || text.includes('Pound')) {
      console.log(`Button ${idx} text: "${text}"`);
      console.log(`Button ${idx} HTML:`, b[0], '\n');
    }
  });
}

main();
