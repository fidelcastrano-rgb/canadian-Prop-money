import fs from 'fs';
import path from 'path';

const products = JSON.parse(fs.readFileSync('extracted_products.json', 'utf-8'));
const outDir = path.join(process.cwd(), 'public/upload/product');

async function downloadImages() {
  for (const product of products) {
    if (product.category === 'Canadian Dollars') {
      const url = product.imageSet[0];
      if (url) {
        let filename = url.split('/').pop();
        // The original downloaded filename had .251webp, we replaced the trailing \.\d+webp with .webp in data.ts
        const saveName = filename.replace(/\.\d+webp$/, '.webp');
        const outPath = path.join(outDir, saveName);
        console.log(`Downloading ${url} to ${saveName}`);
        
        try {
          const res = await fetch(url);
          if (res.ok) {
            const buffer = await res.arrayBuffer();
            fs.writeFileSync(outPath, Buffer.from(buffer));
            console.log(`Success: ${saveName}`);
          } else {
            console.log(`Failed (HTTP ${res.status}): ${url}`);
          }
        } catch (e) {
          console.error(`Error downloading ${url}`, e);
        }
      }
    }
  }
}

downloadImages();
