import fs from 'fs';

function main() {
  if (!fs.existsSync('temp_sitemap.xml')) {
    console.log('No temp_sitemap.xml found.');
    return;
  }
  const content = fs.readFileSync('temp_sitemap.xml', 'utf8');
  console.log('Sitemap size:', content.length);

  const locs: string[] = [];
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(content)) !== null) {
    locs.push(match[1]);
  }

  console.log(`Found ${locs.length} URLs in sitemap:`);
  locs.forEach((loc, idx) => {
    console.log(`${idx + 1}: ${loc}`);
  });

  fs.writeFileSync('sitemap_urls.json', JSON.stringify(locs, null, 2));
}

main();
