import fs from 'fs';

function getCurrencySymbol(category: string): string {
  if (category.includes('Euro') || category.includes('EUR')) return '€';
  if (category.includes('UK') || category.includes('Pound') || category.includes('GBP')) return '£';
  return '$';
}

function cleanImagePath(url: string): string {
  if (!url) return '';
  // Convert 'https://propcounterfeitnotes.com/public/upload/product/...' -> '/upload/product/...'
  let path = url.replace('https://propcounterfeitnotes.com/public', '');
  path = path.replace('https://canadianpropmoney.orghttps://propcounterfeitnotes.com/public', '');
  path = path.replace('https://canadianpropmoney.org', '');
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  return path;
}

function main() {
  const file = 'extracted_products.json';
  if (!fs.existsSync(file)) {
    console.error('extracted_products.json does not exist!');
    return;
  }

  const products = JSON.parse(fs.readFileSync(file, 'utf8'));
  console.log(`Loaded ${products.length} products to generate final lib/data.ts`);

  const finalProducts = products.map((p: any) => {
    const rawImage = p.imageSet && p.imageSet.length > 0 ? p.imageSet[0] : '';
    const cleanImage = cleanImagePath(rawImage);
    const symbol = getCurrencySymbol(p.category);

    // Map variants
    const variants = (p.variants || []).map((v: any, idx: number) => {
      const billCount = v.billCount || 100;
      // Calculate originalPrice exactly as original site
      const calculatedOrigPrice = p.originalPrice ? Math.round(p.originalPrice * (billCount / 100)) : undefined;

      return {
        id: `v${idx + 1}`,
        qtyLabel: v.name,
        price: v.price,
        originalPrice: calculatedOrigPrice,
        savingsLabel: v.savingsLabel || undefined,
        billCount: v.billCount
      };
    });

    return {
      id: p.slug,
      name: p.name,
      description: p.description || p.tagline || '',
      longDescription: p.longDescription || '',
      badge: p.badge || undefined,
      category: p.category,
      image: cleanImage,
      rating: p.rating || 4.8,
      reviewCount: p.reviewCount || 50,
      coaText: p.coaText || '',
      packageContents: p.packageContents || [],
      storageInstructions: p.storageInstructions || '',
      variants: variants
    };
  });

  // Let's print out the file content
  let tsContent = `import { Product } from './store';\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(finalProducts, null, 2)};\n`;

  fs.writeFileSync('lib/data.ts', tsContent);
  console.log('Successfully wrote combined products into lib/data.ts!');
}

main();
