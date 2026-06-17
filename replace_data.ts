import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'lib/data.ts');
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(/\.\d+webp/g, '.webp');

fs.writeFileSync(file, content);
console.log('Done');
