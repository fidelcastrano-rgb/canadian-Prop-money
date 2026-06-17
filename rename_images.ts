import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public/upload/product');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.includes('webp')) {
    const newName = file.replace(/\.\d+webp$/, '.webp');
    fs.renameSync(path.join(dir, file), path.join(dir, newName));
    console.log(`Renamed ${file} to ${newName}`);
  }
});
