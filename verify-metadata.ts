import fs from 'fs';

function main() {
  const data = JSON.parse(fs.readFileSync('pages_metadata.json', 'utf8'));
  console.log('Total pages:', data.length);
  
  // Show high-level structure of first few pages
  data.slice(0, 12).forEach((p: any) => {
    console.log(`Path: ${p.path}`);
    console.log(`- Title: ${p.title}`);
    console.log(`- Desc: ${p.description}`);
    if (p.productDetails) {
      console.log(`- ProductDetails:`, p.productDetails);
    }
    if (p.blogDetails) {
      console.log(`- BlogDetails: Title: ${p.blogDetails.title}`);
    }
    console.log('---');
  });
}

main();
