import fs from 'fs';
import path from 'path';

// Import raw URLs from sitemap
const urls: string[] = JSON.parse(fs.readFileSync('sitemap_urls.json', 'utf8'));

interface ParsedPage {
  url: string;
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  schema: string[];
  images: Array<{ src: string; alt: string }>;
  links: string[];
  productDetails?: any;
  blogDetails?: any;
  faqDetails?: any;
}

async function downloadFile(url: string, destPath: string) {
  try {
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to download ${url}: status ${res.status}`);
      return false;
    }
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
    console.log(`Downloaded image ${url} color-safe and saved to ${destPath}`);
    return true;
  } catch (error) {
    console.error(`Error downloading ${url}:`, error);
    return false;
  }
}

async function scrapePage(url: string): Promise<ParsedPage | null> {
  const urlObj = new URL(url);
  const pagePath = urlObj.pathname;
  console.log(`Crawling: ${url} (Path: ${pagePath})`);

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) {
      console.error(`Status ${res.status} for ${url}`);
      return null;
    }

    const html = await res.text();

    // Parse Meta elements using RegEx safely
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    const descMatch = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i) ||
                      html.match(/<meta[^>]+content="([^"]*)"[^>]+name="description"/i);
    const description = descMatch ? descMatch[1] : '';

    const ogTitleMatch = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]*)"/i);
    const ogTitle = ogTitleMatch ? ogTitleMatch[1] : '';

    const ogDescMatch = html.match(/<meta[^>]+property="og:description"[^>]+content="([^"]*)"/i);
    const ogDescription = ogDescMatch ? ogDescMatch[1] : '';

    const ogImgMatch = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]*)"/i);
    const ogImage = ogImgMatch ? ogImgMatch[1] : '';

    const ogTypeMatch = html.match(/<meta[^>]+property="og:type"[^>]+content="([^"]*)"/i);
    const ogType = ogTypeMatch ? ogTypeMatch[1] : '';

    const canonMatch = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i);
    const canonical = canonMatch ? canonMatch[1] : '';

    // Find JSON-LD Schema Script Blocks
    const schemas: string[] = [];
    const schemaRegex = /<script[^>]+type="application\/ld\+json"[\s\S]*?>([\s\S]*?)<\/script>/gi;
    let schemaMatch;
    while ((schemaMatch = schemaRegex.exec(html)) !== null) {
      schemas.push(schemaMatch[1].trim());
    }

    // Find all image tags
    const images: Array<{ src: string; alt: string }> = [];
    const imgRegex = /<img[^>]+src="([^"]*)"[^>]*>/gi;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(html)) !== null) {
      let src = imgMatch[1];
      const altMatch = imgMatch[0].match(/alt="([^"]*)"/i);
      const alt = altMatch ? altMatch[1] : '';
      if (src && !src.startsWith('data:') && !src.startsWith('blob:')) {
        // Resolve absolute URL
        if (src.startsWith('//')) {
          src = 'https:' + src;
        } else if (src.startsWith('/')) {
          src = `${urlObj.protocol}//${urlObj.host}${src}`;
        } else if (!src.startsWith('http://') && !src.startsWith('https://')) {
          src = `${urlObj.protocol}//${urlObj.host}/${src}`;
        }
        images.push({ src, alt });
      }
    }

    // Find all links
    const links: string[] = [];
    const linkRegex = /<a[^>]+href="([^"]*)"[^>]*>/gi;
    let aMatch;
    while ((aMatch = linkRegex.exec(html)) !== null) {
      let href = aMatch[1];
      if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
        if (href.startsWith('//')) {
          href = 'https:' + href;
        } else if (href.startsWith('/')) {
          href = `${urlObj.protocol}//${urlObj.host}${href}`;
        } else if (!href.startsWith('http://') && !href.startsWith('https://')) {
          href = `${urlObj.protocol}//${urlObj.host}/${href}`;
        }
        links.push(href);
      }
    }

    const uniqueLinks = [...new Set(links)];

    // Check if it is a product page and scrape details if possible
    let productDetails: any = null;
    if (pagePath.startsWith('/products/')) {
      const slug = pagePath.split('/').pop() || '';
      console.log(`Product page detected: ${slug}`);

      // Try finding the main title
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const prodName = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : '';

      // Try finding the price block or variants
      // Look for select tags or standard pricing elements
      const selectBlockMatch = html.match(/<select id="v-price"[\s\S]*?<\/select>/i) || html.match(/<select[^>]+name="variant"[\s\S]*?<\/select>/i);
      const variants: any[] = [];
      if (selectBlockMatch) {
         const optionMatches = [...selectBlockMatch[0].matchAll(/<option[\s\S]*?value="([^"]+)"[\s\S]*?>([\s\S]*?)<\/option>/gi)];
         optionMatches.forEach((m, idx) => {
           const priceVal = parseFloat(m[1]);
           const qtyLabelVal = m[2].trim()
             .replace(/&amp;/g, '&')
             .replace(/&quot;/g, '"')
             .replace(/&#039;/g, "'")
             .replace(/&apos;/g, "'")
             .replace(/&pound;/g, '£');
           variants.push({
             id: `v-${idx + 1}`,
             qtyLabel: qtyLabelVal,
             price: priceVal,
             originalPrice: Math.round(priceVal * 1.3),
             savingsLabel: "Save 23%"
           });
         });
      }

      // If no select variants, look for any price
      let price = 50.0;
      const priceRegex = /\$\s*(\d+(\.\d{2})?)/i;
      const priceTextMatch = html.match(priceRegex);
      if (priceTextMatch && !selectBlockMatch) {
        price = parseFloat(priceTextMatch[1]);
      }

      productDetails = {
        slug,
        name: prodName || title.split('|')[0].trim(),
        description: description,
        variants: variants.length > 0 ? variants : [
          { id: "v1", qtyLabel: "Stack ($10,000)", price: price, originalPrice: Math.round(price * 1.3), savingsLabel: "Save 23%" }
        ]
      };
    }

    // Check if it is blog page
    let blogDetails: any = null;
    if (pagePath.startsWith('/blog/')) {
      const slug = pagePath.split('/').pop() || '';
      console.log(`Blog article detected: ${slug}`);
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const blogTitle = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : '';
      
      // Attempt to extract core text content of the article (div with content or raw text blocks)
      const articleMatch = html.match(/<article[\s\S]*?<\/article>/i) || html.match(/<div[^>]+class="[^"]*blog-content[^"]*"[\s\S]*?<\/div>/i) || html.match(/<div[^>]+class="[^"]*content[^"]*"[\s\S]*?<\/div>/i);
      let contentHtml = articleMatch ? articleMatch[0] : '';
      if (!contentHtml) {
        // Fallback: extract main text components
        contentHtml = html; 
      }

      blogDetails = {
        slug,
        title: blogTitle || title.split('|')[0].trim(),
        date: new Date().toLocaleDateString(),
        content: contentHtml
      };
    }

    return {
      url,
      path: pagePath,
      title,
      description,
      canonical,
      ogTitle,
      ogDescription,
      ogImage,
      ogType,
      schema: schemas,
      images,
      links: uniqueLinks,
      productDetails,
      blogDetails
    };

  } catch (error) {
    console.error(`Error crawling ${url}:`, error);
    return null;
  }
}

async function run() {
  const dataset: ParsedPage[] = [];
  const rawDir = path.join(process.cwd(), 'raw_pages');
  if (!fs.existsSync(rawDir)) {
    fs.mkdirSync(rawDir, { recursive: true });
  }

  // Crawl all 31 URLs
  for (const url of urls) {
    const data = await scrapePage(url);
    if (data) {
      dataset.push(data);
      // Wait to be polite
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }

  // Write all collected pages metadata
  fs.writeFileSync('pages_metadata.json', JSON.stringify(dataset, null, 2));
  console.log(`Successfully completed crawling of ${dataset.length} pages! Initial results saved.`);

  // Now, let's identify all unique images
  const allImages: Array<{ src: string; alt: string }> = [];
  const visitedImgSrcs = new Set<string>();

  dataset.forEach(page => {
    // Add page OG image if it exists
    if (page.ogImage && page.ogImage.startsWith('http') && !visitedImgSrcs.has(page.ogImage)) {
      visitedImgSrcs.add(page.ogImage);
      allImages.push({ src: page.ogImage, alt: page.title });
    }
    // Add inline page images
    page.images.forEach(img => {
      if (img.src && img.src.startsWith('http') && !visitedImgSrcs.has(img.src)) {
        visitedImgSrcs.add(img.src);
        allImages.push(img);
      }
    });
  });

  console.log(`Found ${allImages.length} unique images. Downloading files...`);

  const downloadedImagesList: string[] = [];
  // Download each image to public folder keeping paths local
  for (const img of allImages) {
    const parsedImgUrl = new URL(img.src);
    let relativeDestPath = '';

    if (parsedImgUrl.pathname.includes('/upload/') || parsedImgUrl.pathname.includes('/product/')) {
      // Recreate paths under public/upload/...
      const normalizedPath = parsedImgUrl.pathname.replace(/^\/public\//, '/').replace(/^\//, ''); // remove leading slash
      relativeDestPath = path.join('public', normalizedPath);
    } else {
      // Recreate general images
      const baseName = path.basename(parsedImgUrl.pathname) || 'image.webp';
      relativeDestPath = path.join('public', 'images', baseName);
    }

    const fullDestPath = path.join(process.cwd(), relativeDestPath);
    const success = await downloadFile(img.src, fullDestPath);
    if (success) {
      // Store local relative path in public (e.g. /public/upload/product/... or /images/...)
      const publicRelativePath = relativeDestPath.replace(/^public/, '');
      downloadedImagesList.push(publicRelativePath);
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  fs.writeFileSync('downloaded_images.json', JSON.stringify(downloadedImagesList, null, 2));
  console.log(`Finished downloading all images. Count: ${downloadedImagesList.length}`);
}

run();
