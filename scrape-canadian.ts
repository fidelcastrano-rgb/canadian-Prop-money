import fs from 'fs';

async function main() {
  try {
    console.log('Fetching canadianpropmoney.org homepage...');
    const res = await fetch('https://canadianpropmoney.org');
    const html = await res.text();
    console.log('Successfully fetched homepage. Status:', res.status);
    console.log('Content length:', html.length);
    fs.writeFileSync('temp_canadian.html', html);
    console.log('Wrote to temp_canadian.html');

    // Also try fetching robots.txt and sitemap.xml if they exist
    try {
      const rob = await fetch('https://canadianpropmoney.org/robots.txt');
      if (rob.ok) {
        console.log('robots.txt fetched successfully');
        fs.writeFileSync('temp_robots.txt', await rob.text());
      }
    } catch (e) {}

    try {
      const site = await fetch('https://canadianpropmoney.org/sitemap.xml');
      if (site.ok) {
        console.log('sitemap.xml fetched successfully');
        fs.writeFileSync('temp_sitemap.xml', await site.text());
      }
    } catch (e) {}

  } catch (error) {
    console.error('Fetch error:', error);
  }
}

main();
