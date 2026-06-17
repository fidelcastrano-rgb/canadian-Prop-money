import fs from 'fs';

function main() {
  const file = 'chunk_0.js';
  if (fs.existsSync(file)) {
    const text = fs.readFileSync(file, 'utf8');
    const startIdx = text.indexOf('7455:');
    if (startIdx !== -1) {
      // Find the end of module definition. It starts with `{` and ends with `}`.
      // Let's find the matching closing bracket or grab the next 30,000 characters
      const substring = text.substring(startIdx, startIdx + 45000);
      console.log('EXTRACTED STRING PORTION (length:', substring.length, '):');
      
      // Let's write it to a temporary file for analysis
      fs.writeFileSync('extracted_database_raw.txt', substring);
      console.log('Saved raw extracted module to extracted_database_raw.txt');

      // Let's parse the products array
      // It starts with `let a=[` and ends inside the module `7455` exports.
      // Let's write a custom JS execution script to extract the array, eval it safely (since it's just static JSON-ish JS)
      // or parse it using some substring markers.
    } else {
      console.log('7455: not found');
    }
  } else {
    console.log('chunk_0.js not found');
  }
}

main();
