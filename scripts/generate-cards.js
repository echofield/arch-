#!/usr/bin/env node

/**
 * ARCHÉ — Card Generator
 *
 * Generates card IDs and QR codes for physical cards.
 *
 * Usage:
 *   node scripts/generate-cards.js --count 10 --prefix PS --start 1
 *   node scripts/generate-cards.js --count 50 --prefix PS --start 101 --output ./cards
 *
 * Output:
 *   - cards.json: List of card IDs and URLs
 *   - Individual QR code SVGs (if qrcode package is installed)
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (name, defaultValue) => {
  const index = args.indexOf(`--${name}`);
  return index !== -1 ? args[index + 1] : defaultValue;
};

const count = parseInt(getArg('count', '10'));
const prefix = getArg('prefix', 'PS');
const startFrom = parseInt(getArg('start', '1'));
const outputDir = getArg('output', './generated-cards');
const baseUrl = getArg('url', 'https://arche-one.vercel.app');

console.log(`
╔═══════════════════════════════════════╗
║        ARCHÉ Card Generator           ║
╚═══════════════════════════════════════╝

Generating ${count} cards...
  Prefix: ${prefix}
  Starting from: ${startFrom}
  Base URL: ${baseUrl}
  Output: ${outputDir}
`);

// Generate card IDs
const cards = [];
for (let i = startFrom; i < startFrom + count; i++) {
  const cardId = `${prefix}-${String(i).padStart(4, '0')}`;
  const url = `${baseUrl}/?card=${cardId}`;
  cards.push({ id: cardId, url });
}

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write JSON file
const jsonPath = path.join(outputDir, 'cards.json');
fs.writeFileSync(jsonPath, JSON.stringify(cards, null, 2));
console.log(`✓ Created ${jsonPath}`);

// Write CSV file (useful for printing services)
const csvPath = path.join(outputDir, 'cards.csv');
const csvContent = 'Card ID,URL\n' + cards.map(c => `${c.id},${c.url}`).join('\n');
fs.writeFileSync(csvPath, csvContent);
console.log(`✓ Created ${csvPath}`);

// Write SQL insert statements (for Supabase)
const sqlPath = path.join(outputDir, 'insert-cards.sql');
const sqlContent = `-- Insert cards into Supabase
-- Run this in the Supabase SQL Editor

INSERT INTO cards (id) VALUES
${cards.map(c => `  ('${c.id}')`).join(',\n')}
ON CONFLICT (id) DO NOTHING;

-- Verify
SELECT COUNT(*) as total_cards FROM cards;
`;
fs.writeFileSync(sqlPath, sqlContent);
console.log(`✓ Created ${sqlPath}`);

// Try to generate QR codes if qrcode package is available
try {
  const QRCode = require('qrcode');

  console.log(`\nGenerating QR codes...`);

  const qrDir = path.join(outputDir, 'qr-codes');
  if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir, { recursive: true });
  }

  cards.forEach((card, index) => {
    const svgPath = path.join(qrDir, `${card.id}.svg`);
    QRCode.toFile(svgPath, card.url, {
      type: 'svg',
      width: 300,
      margin: 2,
      color: {
        dark: '#003D2C',
        light: '#FAF8F2'
      }
    });
    if ((index + 1) % 10 === 0 || index === cards.length - 1) {
      console.log(`  Generated ${index + 1}/${cards.length} QR codes`);
    }
  });

  console.log(`✓ QR codes saved to ${qrDir}`);
} catch (e) {
  console.log(`
Note: QR code images not generated.
To generate QR codes, install the qrcode package:
  npm install qrcode
Then run this script again.
`);
}

// Print summary
console.log(`
═══════════════════════════════════════
Summary:
  Cards generated: ${cards.length}
  First card: ${cards[0].id}
  Last card: ${cards[cards.length - 1].id}

Next steps:
  1. Run the SQL in Supabase to create the cards
  2. Print QR codes on physical cards
  3. Users scan → Experience begins
═══════════════════════════════════════
`);

// Print first few cards as sample
console.log('Sample cards:');
cards.slice(0, 5).forEach(c => {
  console.log(`  ${c.id} → ${c.url}`);
});
if (cards.length > 5) {
  console.log(`  ... and ${cards.length - 5} more`);
}
