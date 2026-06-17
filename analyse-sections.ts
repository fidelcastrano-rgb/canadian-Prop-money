import fs from 'fs';

function main() {
  const html = fs.readFileSync('temp_canadian.html', 'utf8');
  console.log('Homepage length:', html.length);
  
  // Find all headings
  const headings: string[] = [];
  const headingRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    headings.push(`H${match[1]}: ${match[2].replace(/<[^>]*>/g, '').trim()}`);
  }
  
  console.log('Found headings on homepage:');
  headings.forEach(h => console.log(' - ' + h));
}

main();
