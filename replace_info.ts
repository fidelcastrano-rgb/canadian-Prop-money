import fs from 'fs';
import path from 'path';

function replaceInFolder(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(file)) {
        replaceInFolder(fullPath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      let newContent = content;
      // Replace old numbers and emails if we had any placeholders, though it seems they might already be what the user asked
      newContent = newContent.replace(/18437320661/g, '18437320661');
      newContent = newContent.replace(/\+1 \(843\) 732-0661/g, '+1 (843) 732-0661');
      newContent = newContent.replace(/sales@canadianpropmoney\.org/g, 'sales@canadianpropmoney.org');
      
      // The user just said "connect this number to the whatsapp (+18437320661 and this email to where it is needed: sales@canadianpropmoney.org"
      // Let's make sure the whatsapp links actually use that number.
      newContent = newContent.replace(/wa\.me\/\d+/g, 'wa.me/18437320661');
      newContent = newContent.replace(/mailto:sales@canadianpropmoney.org"'\?]+/g, 'mailto:sales@canadianpropmoney.org');

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

replaceInFolder(process.cwd());
console.log("Replacements complete");
