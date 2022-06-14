const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '../dist');
const indexHtml = 'index.html';
const notFoundHtml = '404.html';

fs.copyFileSync(path.join(distPath, indexHtml), path.join(distPath, notFoundHtml));
