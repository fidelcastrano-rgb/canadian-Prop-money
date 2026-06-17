import fs from 'fs';

function main() {
  const products = JSON.parse(fs.readFileSync('extracted_products.json', 'utf8'));
  console.log(`Successfully extracted ${products.length} products.\n`);
  
  products.forEach((p: any, i: number) => {
    console.log(`Product ${i + 1}:`);
    console.log(`  Slug: ${p.slug}`);
    console.log(`  Name: ${p.name}`);
    console.log(`  Category: ${p.category}`);
    console.log(`  BasePrice: $${p.basePrice}`);
    console.log(`  OriginalPrice: $${p.originalPrice}`);
    console.log(`  ImageSet:`, p.imageSet);
    console.log(`  Variants Count: ${p.variants ? p.variants.length : 0}`);
    if (p.variants) {
      p.variants.forEach((v: any, idx: number) => {
        console.log(`    Variant ${idx + 1}: name="${v.name}" price=${v.price} billCount=${v.billCount} savingsLabel="${v.savingsLabel || ''}"`);
      });
    }
    console.log('-----------------------------\n');
  });
}

main();
