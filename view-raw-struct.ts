import fs from 'fs';

function main() {
  const file = 'extracted_database_raw.txt';
  if (fs.existsSync(file)) {
    const text = fs.readFileSync(file, 'utf8');
    // search for ca-100-stack and print the next 2000 characters
    const idx = text.indexOf('"ca-100-stack"');
    if (idx !== -1) {
      console.log('--- RAW STRUCT FOR ca-100-stack ---');
      console.log(text.substring(idx - 50, idx + 2000));
    }
  }
}

main();
