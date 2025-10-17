#!/usr/bin/env node

// Script to generate Google Search Console verification file
// Usage: node generate-verification.js YOUR_VERIFICATION_CODE

const fs = require('fs');
const path = require('path');

const verificationCode = process.argv[2];

if (!verificationCode) {
  console.log('Usage: node generate-verification.js YOUR_VERIFICATION_CODE');
  console.log('Example: node generate-verification.js abc123def456');
  process.exit(1);
}

const fileName = `google${verificationCode}.html`;
const filePath = path.join(__dirname, '..', 'public', fileName);

const content = `google-site-verification: ${fileName}`;

fs.writeFileSync(filePath, content);

console.log(`✅ Generated verification file: ${fileName}`);
console.log(`📁 Location: public/${fileName}`);
console.log(`🔗 URL: https://amirmohammadikarbalai.github.io/DataScience.github.io/${fileName}`);
console.log('\n📋 Next steps:');
console.log('1. Commit and push this file to GitHub');
console.log('2. Go to Google Search Console');
console.log('3. Verify your site ownership');
console.log('4. Submit your sitemap: https://amirmohammadikarbalai.github.io/DataScience.github.io/sitemap.xml');