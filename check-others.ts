import fs from 'fs';

function main() {
  const content = fs.readFileSync('lib/data.ts', 'utf8');
  const lines = content.split('\n');
  console.log('Total lines:', lines.length);
  lines.forEach((line, i) => {
    if (line.includes('export const') && !line.includes('PRODUCTS')) {
      console.log(`Line ${i}: ${line}`);
    }
  });
}

main();
