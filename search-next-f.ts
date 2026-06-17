import fs from 'fs';

function main() {
  const file = 'next_f_combined.txt';
  if (fs.existsSync(file)) {
    const text = fs.readFileSync(file, 'utf8');
    console.log('Total characters in next_f_combined:', text.length);
    
    // Look for any word like "Starter", "Bundle"
    const terms = ['Starter', 'Bundle', 'Compact', 'Premium', 'Vault', 'Platinum', 'price', '200', '310', '400', '450', '600', '710', '1200'];
    terms.forEach(term => {
      const idx = text.toLowerCase().indexOf(term.toLowerCase());
      console.log(`Term "${term}": found at index`, idx);
      if (idx !== -1) {
        console.log(`  Context:\n  ...${text.substring(Math.max(0, idx - 150), Math.min(text.length, idx + term.length + 150))}...`);
      }
    });
  }
}

main();
