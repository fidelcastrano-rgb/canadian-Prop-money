import fs from 'fs';

function main() {
  const data = JSON.parse(fs.readFileSync('extracted_products.json', 'utf8'));
  const us = data.filter((p: any) => p.slug.startsWith('us-'));
  us.forEach((p: any) => {
    console.log(`Product: ${p.slug} Name: ${p.name}`);
    console.log(`ImageSet:`, p.imageSet);
  });
}

main();
