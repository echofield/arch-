// SCRIPT : Génération de codes de cartes ARCHÉ
// Usage : node --loader ts-node/esm scripts/generate-card-codes.ts
// Ou directement dans Deno/Bun si disponible

const NUM_CARDS = 50;
const CODE_LENGTH = 6;

// Alphabet sans confusion (pas de I/O/1/0)
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/**
 * Génère un code aléatoire de CODE_LENGTH caractères
 */
function generateCode(): string {
  let code = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return code;
}

/**
 * Génère NUM_CARDS codes uniques
 */
function generateCodes(count: number): string[] {
  const codes = new Set<string>();
  
  while (codes.size < count) {
    codes.add(generateCode());
  }
  
  return Array.from(codes).sort();
}

/**
 * Format SQL pour insertion directe dans Supabase
 */
function generateSQL(codes: string[]): string {
  const values = codes.map(code => `  ('${code}')`).join(',\n');
  
  return `-- Generated ${codes.length} unique card codes
-- Execute in Supabase SQL Editor

INSERT INTO cards (code) VALUES
${values};

-- Verify insertion
SELECT code FROM cards ORDER BY code;
`;
}

/**
 * Format CSV pour impression
 */
function generateCSV(codes: string[]): string {
  let csv = 'index,code\n';
  codes.forEach((code, index) => {
    csv += `${index + 1},${code}\n`;
  });
  return csv;
}

/**
 * Format JSON pour backup
 */
function generateJSON(codes: string[]): string {
  return JSON.stringify({
    generated_at: new Date().toISOString(),
    count: codes.length,
    codes: codes
  }, null, 2);
}

// ============================================
// MAIN EXECUTION
// ============================================

console.log('🏛  ARCHÉ — Générateur de codes de cartes\n');

console.log(`Génération de ${NUM_CARDS} codes uniques...`);
const codes = generateCodes(NUM_CARDS);
console.log(`✅ ${codes.length} codes générés\n`);

console.log('═'.repeat(50));
console.log('CODES GÉNÉRÉS (triés alphabétiquement)');
console.log('═'.repeat(50));
codes.forEach((code, index) => {
  console.log(`${String(index + 1).padStart(2, '0')}. ${code}`);
});
console.log('═'.repeat(50));
console.log('');

// Générer les fichiers
const sql = generateSQL(codes);
const csv = generateCSV(codes);
const json = generateJSON(codes);

// Afficher les outputs
console.log('\n📋 SQL (à exécuter dans Supabase) :');
console.log('─'.repeat(50));
console.log(sql);
console.log('');

console.log('📋 CSV (pour impression) :');
console.log('─'.repeat(50));
console.log(csv.split('\n').slice(0, 6).join('\n') + '\n...');
console.log('');

console.log('📋 JSON (backup) :');
console.log('─'.repeat(50));
console.log(json);
console.log('');

// Optionnel : Sauvegarder dans des fichiers
// Décommenter si vous voulez créer les fichiers automatiquement
/*
import { writeFileSync } from 'fs';
writeFileSync('card-codes.sql', sql);
writeFileSync('card-codes.csv', csv);
writeFileSync('card-codes.json', json);
console.log('✅ Fichiers sauvegardés : card-codes.sql, card-codes.csv, card-codes.json\n');
*/

console.log('🎯 PROCHAINES ÉTAPES :');
console.log('1. Copier le SQL ci-dessus');
console.log('2. L\'exécuter dans Supabase SQL Editor');
console.log('3. Vérifier avec : SELECT COUNT(*) FROM cards;');
console.log('4. Imprimer les codes sur les cartes physiques\n');

// Export pour utilisation programmatique
export { generateCode, generateCodes, generateSQL, generateCSV, generateJSON };
