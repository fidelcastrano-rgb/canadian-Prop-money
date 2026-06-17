import fs from 'fs';

function main() {
  const data = JSON.parse(fs.readFileSync('extracted_products.json', 'utf8'));
  console.log('Total extracted products in database:', data.length);
  data.forEach((p: any, idx: number) => {
    console.log(`Product ${idx + 1}: slug=${p.slug} name="${p.name}" basePrice=${p.basePrice} variantsCount=${p.variants ? p.variants.length : 0}`);
    if (p.variants && p.variants.length > 0) {
      p.variants.forEach((v: any, vIdx: number) => {
        console.log(`  Var ${vIdx + 1}: id=${v.id} label="${v.qtyLabel}" price=${v.price} flag=${v.savingsLabel || ''}`);
      });
    }
    console.log('-----------------------------\n');
  });
}

main();
