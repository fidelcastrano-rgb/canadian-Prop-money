import fs from 'fs';

function main() {
  const content = fs.readFileSync('extracted_database_raw.txt', 'utf8');

  // We want to find `let a=[` and then walk until matching closing bracket `]` of the array
  const listStart = content.indexOf('let a=[');
  if (listStart !== -1) {
    const arrayStart = listStart + 'let a='.length;
    let bracketCount = 0;
    let endIdx = -1;
    for (let i = arrayStart; i < content.length; i++) {
      const char = content[i];
      if (char === '[') bracketCount++;
      if (char === ']') {
        bracketCount--;
        if (bracketCount === 0) {
          endIdx = i;
          break;
        }
      }
    }

    if (endIdx !== -1) {
      const arrayString = content.substring(arrayStart, endIdx + 1);
      console.log('Found array of length:', arrayString.length);
      fs.writeFileSync('raw_array_string.js', `const products = ${arrayString}; console.log(JSON.stringify(products, null, 2));`);
      console.log('Saved raw_array_string.js. Now running it to output products...');
    } else {
      console.log('Could not find matching closing bracket');
    }
  } else {
    console.log('let a=[ not found');
  }
}

main();
