const fs = require('fs');

let content = fs.readFileSync('./public/full-paper.md', 'utf8');

// Remove backslashes before dots, parentheses, and other special characters
content = content.replace(/\\\./g, '.');
content = content.replace(/\\\(/g, '(');
content = content.replace(/\\\)/g, ')');
content = content.replace(/\\\-/g, '-');

fs.writeFileSync('./public/full-paper.md', content);

console.log('Fixed markdown file!');
