import fs from 'fs';

function main() {
  const data = JSON.parse(fs.readFileSync('pages_metadata.json', 'utf8'));
  const prods = data.filter((p: any) => p.productDetails);
  console.log('Total scraped products:', prods.length);
  prods.forEach((p: any) => {
    console.log(`Path: ${p.path}`);
    console.log(`Title: ${p.title}`);
    console.log(`Meta Desc: ${p.description}`);
    console.log(`ProductDetails:`, JSON.stringify(p.productDetails, null, 2));
    console.log('Images:', p.images);
    console.log('----------------------------------------------------');
  });
}

main();
