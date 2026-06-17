import fs from 'fs';

function main() {
  const html = fs.readFileSync('ca-100-stack.html', 'utf8');

  // Let's find all chunks of self.__next_f.push
  const regex = /self\.__next_f\.push\(\[1,\s*"([\s\S]*?)"\]\)/g;
  let match;
  let combined = '';
  while ((match = regex.exec(html)) !== null) {
    // Unescape the string content
    const raw = match[1];
    const unescaped = raw
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\\\/g, '\\');
    combined += unescaped;
  }

  console.log('Combined next_f length:', combined.length);
  fs.writeFileSync('next_f_combined.txt', combined);

  // Search for price-related matches in the combined payload
  const lines = combined.split('\n');
  console.log('Total next_f unescaped lines:', lines.length);

  lines.forEach((line, i) => {
    // Look for lines that mention "Starter Bundle" or "Compact Bundle" or "price" or "variants"
    if (line.includes('Starter Bundle') || line.includes('Compact Bundle') || line.includes('savingsLabel') || line.includes('"price"') || line.includes('originalPrice')) {
      console.log(`Line ${i} (length ${line.length}):`);
      console.log(line.trim().substring(0, 500));
    }
  });
}

main();
