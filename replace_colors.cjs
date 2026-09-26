const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // Replace primary color
  if (content.includes('#4A5D23')) {
    content = content.replace(/#4A5D23/gi, '#1E3A8A');
    changed = true;
  }
  if (content.includes('#586F2C')) { // Hover for primary
    content = content.replace(/#586F2C/gi, '#1E40AF');
    changed = true;
  }
  // Replace accent color (Moss/Olive) with USA Red
  if (content.includes('#8A9A5B')) {
    content = content.replace(/#8A9A5B/gi, '#DC2626');
    changed = true;
  }
  if (content.includes('#D5DCBF')) { // Light border/accent
    content = content.replace(/#D5DCBF/gi, '#93C5FD'); // Light blue border
    changed = true;
  }
  if (content.includes('#F2F4EB')) { // Light bg
    content = content.replace(/#F2F4EB/gi, '#EFF6FF'); // Light blue bg
    changed = true;
  }
  if (content.includes('#E5EAD9')) { // Light bg hover
    content = content.replace(/#E5EAD9/gi, '#DBEAFE');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated:', filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walk(srcDir);
console.log('Done replacing colors.');
