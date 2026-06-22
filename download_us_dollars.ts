import fs from 'fs';
import path from 'path';

const downloadImage = async (url: string, filename: string) => {
  try {
    console.log(`Downloading ${url} to ${filename}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(filename, Buffer.from(buffer));
    console.log(`Successfully downloaded ${filename}`);
  } catch (err) {
    console.error(`Failed to download ${url}:`, err);
  }
};

const images = [
  { url: 'https://propcounterfeitnotes.com/public/upload/product/buy-50-us-dollar-bills.225webp', filename: 'buy-50-us-dollar-bills.webp' },
  { url: 'https://propcounterfeitnotes.com/public/upload/product/buy-100-us-dollar-bills.224webp', filename: 'buy-100-us-dollar-bills.webp' },
  { url: 'https://propcounterfeitnotes.com/public/upload/product/buy-20-us-dollar-bills.73webp', filename: 'buy-20-us-dollar-bills.webp' },
  { url: 'https://propcounterfeitnotes.com/public/upload/product/buy-10-us-dollar-bills.85webp', filename: 'buy-10-us-dollar-bills.webp' },
  { url: 'https://propcounterfeitnotes.com/public/upload/product/buy-5-us-dollar-bills.223webp', filename: 'buy-5-us-dollar-bills.webp' }
];

async function run() {
  for (const img of images) {
    await downloadImage(img.url, path.join(process.cwd(), 'public/upload/product', img.filename));
  }
}

run();
