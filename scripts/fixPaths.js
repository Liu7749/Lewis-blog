// Normalize repeated /Lewis-blog segments in generated _site HTML/XML files
// Usage: node scripts/fixPaths.js

const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const dirent of list) {
    const full = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      results = results.concat(walk(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

function fixFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.html', '.xml', '.xsl'].includes(ext)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace repeated segments like /Lewis-blog/Lewis-blog/... with /Lewis-blog
  const fixed = content.replace(/(\/Lewis-blog)+/g, '/Lewis-blog');
  if (fixed !== content) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    console.log('Fixed:', filePath);
  }
}

const siteDir = path.join(__dirname, '..', '_site');
if (!fs.existsSync(siteDir)) {
  console.error('_site directory not found');
  process.exit(1);
}

const files = walk(siteDir);
for (const f of files) fixFile(f);
console.log('Done.');

