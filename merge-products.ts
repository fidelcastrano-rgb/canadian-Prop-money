import fs from 'fs';
import path from 'path';

function getLocalImgPath(src: string): string {
  if (!src) return '';
  try {
    const parsed = new URL(src);
    if (parsed.pathname.includes('/upload/') || parsed.pathname.includes('/product/')) {
      return parsed.pathname; // starts with /public/upload/... which maps to public folder
    }
    const baseName = path.basename(parsed.pathname) || 'image.webp';
    return `/images/${baseName}`;
  } catch (e) {
    return src;
  }
}

function main() {
  const crawledData = JSON.parse(fs.readFileSync('pages_metadata.json', 'utf8'));
  const crawledProducts = crawledData.filter((item: any) => item.productDetails);

  console.log(`Analyzing ${crawledProducts.length} crawled products...`);

  // Map crawled products to our Product format
  const mappedCrawled = crawledProducts.map((p: any) => {
    const details = p.productDetails;
    let cat = 'Canadian Dollars';
    if (p.path.includes('/us-')) cat = 'US Dollars';
    else if (p.path.includes('/au-')) cat = 'Australian Dollars';
    else if (p.path.includes('/eu-')) cat = 'Euro';

    // Find main image from images list or og
    let mainImg = details.image || '';
    if (!mainImg && p.images.length > 1) {
      // Find image contains slug or main product webp
      const slug = details.slug;
      const found = p.images.find((img: any) => img.src && (img.src.includes(slug) || img.src.includes('upload/product')));
      if (found) mainImg = found.src;
    }
    if (!mainImg && p.images.length > 0) {
      mainImg = p.images[0].src;
    }
    if (!mainImg) {
      mainImg = p.ogImage;
    }

    const localImg = getLocalImgPath(mainImg);

    // Filter variants
    const vars = details.variants && details.variants.length > 0 ? details.variants : [
      { id: "v1", qtyLabel: "Stack ($10,000)", price: 100, originalPrice: 130, savingsLabel: "Save 23%" },
      { id: "v2", qtyLabel: "Bundle ($50,000)", price: 400, originalPrice: 520, savingsLabel: "Save 23%" }
    ];

    return {
      id: details.slug,
      name: details.name,
      description: details.description || p.description,
      badge: p.path.includes('100') ? "Best Seller" : (p.path.includes('50') ? "Popular" : undefined),
      category: cat,
      image: localImg,
      variants: vars
    };
  });

  // Read existing products from current data.ts
  const dataContent = fs.readFileSync('lib/data.ts', 'utf8');
  
  // We want to combine both lists
  // Let's create a robust static file data.ts
  console.log(`Writing merged PRODUCTS to merged_products.json`);
  fs.writeFileSync('merged_products.json', JSON.stringify(mappedCrawled, null, 2));
}

main();
