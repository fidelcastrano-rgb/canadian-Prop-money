import fs from 'fs';

function main() {
  const products = JSON.parse(fs.readFileSync('extracted_products.json', 'utf8'));
  console.log(`Analyzing pricing for ${products.length} products`);

  products.forEach((p: any) => {
    console.log(`Product: ${p.slug} (${p.name})`);
    console.log(`  BasePrice (Sale): $${p.basePrice}`);
    console.log(`  OriginalPrice (Regular): $${p.originalPrice}`);
    
    if (p.variants) {
      p.variants.forEach((v: any, idx: number) => {
        // Calculate original price based on billCount (same as live Next.js script)
        const price = v.price;
        const billCount = v.billCount || 100;
        const originalPriceVal = p.originalPrice ? Math.round(p.originalPrice * (billCount / 100)) : undefined;
        
        console.log(`    Var ${idx + 1}: ${v.name}`);
        console.log(`      Sale Price: $${price}`);
        console.log(`      Regular Price (Original): $${originalPriceVal}`);
        console.log(`      Savings: ${v.savingsLabel || ''}`);
      });
    }
    console.log('-----------------------------\n');
  });
}

main();
