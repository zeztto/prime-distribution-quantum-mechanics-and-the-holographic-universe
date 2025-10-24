const fs = require('fs');
const puppeteer = require('puppeteer');
const { marked } = require('marked');
const path = require('path');

// Configure marked for math support
marked.setOptions({
  breaks: true,
  gfm: true,
});

async function generatePDF() {
  console.log('Reading markdown file...');
  const markdown = fs.readFileSync('./public/full-paper.md', 'utf8');

  console.log('Converting markdown to HTML...');
  const content = marked.parse(markdown);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
  <style>
    @page {
      size: A4;
      margin: 2.5cm 2cm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Times New Roman', 'Noto Serif KR', serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #000;
      max-width: 100%;
      margin: 0;
      padding: 0;
      background: white;
    }

    h1 {
      font-size: 24pt;
      font-weight: bold;
      text-align: center;
      margin: 0 0 0.5cm 0;
      page-break-after: avoid;
      line-height: 1.3;
    }

    h2 {
      font-size: 16pt;
      font-weight: bold;
      margin: 1cm 0 0.4cm 0;
      page-break-after: avoid;
    }

    h3 {
      font-size: 13pt;
      font-weight: bold;
      margin: 0.8cm 0 0.3cm 0;
      page-break-after: avoid;
    }

    h4 {
      font-size: 12pt;
      font-weight: bold;
      margin: 0.6cm 0 0.3cm 0;
      page-break-after: avoid;
    }

    p {
      margin: 0 0 0.4cm 0;
      text-align: justify;
      orphans: 3;
      widows: 3;
    }

    strong {
      font-weight: bold;
    }

    em {
      font-style: italic;
    }

    ul, ol {
      margin: 0.3cm 0 0.5cm 1.5cm;
      padding: 0;
    }

    li {
      margin: 0.2cm 0;
    }

    blockquote {
      margin: 0.5cm 1.5cm;
      padding-left: 0.5cm;
      border-left: 3px solid #ccc;
      font-style: italic;
    }

    code {
      font-family: 'Courier New', monospace;
      font-size: 10pt;
      background: #f5f5f5;
      padding: 0.1cm 0.2cm;
      border-radius: 2px;
    }

    pre {
      margin: 0.5cm 0;
      padding: 0.4cm;
      background: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 3px;
      overflow-x: auto;
      page-break-inside: avoid;
    }

    pre code {
      background: none;
      padding: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 0.5cm 0;
      page-break-inside: avoid;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 0.3cm;
      text-align: left;
    }

    th {
      background: #f5f5f5;
      font-weight: bold;
    }

    hr {
      border: none;
      border-top: 1px solid #ccc;
      margin: 0.8cm 0;
    }

    a {
      color: #0066cc;
      text-decoration: none;
    }

    /* Footnotes styling */
    .footnotes {
      margin-top: 1cm;
      padding-top: 0.5cm;
      border-top: 1px solid #ccc;
      font-size: 9pt;
    }

    .footnotes ol {
      margin-left: 1cm;
    }

    .footnotes li {
      margin: 0.3cm 0;
    }

    sup {
      font-size: 0.8em;
    }

    /* Math equations */
    .katex {
      font-size: 1.1em;
    }

    /* Page breaks */
    .page-break {
      page-break-after: always;
    }

    /* Abstract section */
    .abstract {
      margin: 1cm 2cm;
      padding: 0.5cm;
      background: #f9f9f9;
      border: 1px solid #ddd;
      page-break-inside: avoid;
    }

    .abstract h2 {
      margin-top: 0;
      font-size: 14pt;
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>
  `;

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log('Loading HTML content...');
  await page.setContent(html, {
    waitUntil: 'networkidle0'
  });

  console.log('Generating PDF...');
  await page.pdf({
    path: './public/paper.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '2.5cm',
      right: '2cm',
      bottom: '2.5cm',
      left: '2cm'
    },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="font-size: 9pt; text-align: center; width: 100%; margin: 0 2cm;">
        <span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>
    `
  });

  await browser.close();

  console.log('PDF generated successfully at ./public/paper.pdf');
}

generatePDF().catch(error => {
  console.error('Error generating PDF:', error);
  process.exit(1);
});
