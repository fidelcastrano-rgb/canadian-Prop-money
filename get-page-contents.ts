import fs from 'fs';

function main() {
  const data = JSON.parse(fs.readFileSync('pages_metadata.json', 'utf8'));
  
  const mainPaths = ['/', '/about', '/faq', '/contact', '/track-order', '/blog'];
  
  mainPaths.forEach(p => {
    const page = data.find((item: any) => item.path === p);
    if (page) {
      console.log(`=========================================`);
      console.log(`PATH: ${p}`);
      console.log(`TITLE: ${page.title}`);
      console.log(`DESCRIPTION: ${page.description}`);
      console.log(`SCHEMA count: ${page.schema.length}`);
      console.log(`IMAGES count: ${page.images.length}`);
      console.log(`LINKS count: ${page.links.length}`);
    } else {
      console.log(`Path ${p} NOT FOUND`);
    }
  });

  const blogs = data.filter((item: any) => item.path.startsWith('/blog/'));
  console.log(`=========================================`);
  console.log(`Total Blog posts: ${blogs.length}`);
  blogs.forEach((b: any) => {
    console.log(`- Blog: ${b.path}`);
    console.log(`  Title: ${b.blogDetails?.title}`);
    console.log(`  Content length: ${b.blogDetails?.content ? b.blogDetails.content.length : 0}`);
  });
}

main();
