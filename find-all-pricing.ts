import fs from 'fs';

function main() {
  const html = fs.readFileSync('ca-100-stack.html', 'utf8');

  // Let's find all script blocks, some might contain serialized JSON state (like next.js state or standard json)
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let index = 0;
  while ((match = scriptRegex.exec(html)) !== null) {
    const content = match[1];
    index++;
    if (content.length > 50) {
      console.log(`Script ${index} length:`, content.length);
      fs.writeFileSync(`script_${index}.js`, content);
      
      // Look inside script for pricing elements, like array of options
      if (content.includes('lowPrice') || content.includes('AggregateOffer') || content.includes('"price"') || content.includes('v-price') || content.includes('200') || content.includes('10000')) {
        console.log(`-> Script ${index} matches keywords!`);
        // Print first 500 characters and last 500 characters
        console.log('START OF SCRIPT:', content.substring(0, 300));
        console.log('END OF SCRIPT:', content.substring(content.length - 300));
      }
    }
  }
  
  // Let's also look at all Select, Input, Button elements in the whole HTML!
  console.log('\n--- BUTTON ELEMENTS ---');
  const buttons = [...html.matchAll(/<button[\s\S]*?<\/button>/gi)];
  buttons.forEach((b, idx) => {
    console.log(`Button ${idx}:`, b[0].substring(0, 300));
  });

  console.log('\n--- SELECT ELEMENTS ---');
  const selects = [...html.matchAll(/<select[\s\S]*?<\/select>/gi)];
  selects.forEach((s, idx) => {
    console.log(`Select ${idx}:`, s[0]);
  });

  console.log('\n--- INPUT ELEMENTS ---');
  const inputs = [...html.matchAll(/<input[^>]*>/gi)];
  inputs.forEach((inp, idx) => {
    console.log(`Input ${idx}:`, inp[0]);
  });
}

main();
