/**
 * ARCHÉ — Générateur de codes d'activation
 * 
 * Script admin pour générer des codes ARCHE-XXXX-XXXX
 * 
 * Usage:
 * deno run --allow-env --allow-net generate_codes.tsx 100
 */

import { createClient } from 'npm:@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

/**
 * Générer un code unique au format ARCHE-XXXX-XXXX
 * Sans caractères ambigus (I, O, 0, 1)
 */
function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  
  const randomPart = (length: number) => {
    return Array.from({ length }, () => 
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  };
  
  return `ARCHE-${randomPart(4)}-${randomPart(4)}`;
}

/**
 * Générer N codes uniques et les insérer en DB
 */
async function generateCodes(count: number = 100) {
  console.log(`🎯 Génération de ${count} codes d'activation ARCHÉ...`);
  
  const codes: string[] = [];
  const errors: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const code = generateCode();
    
    try {
      const { error } = await supabase
        .from('activation_codes')
        .insert({
          code,
          status: 'issued',
          created_at: new Date().toISOString()
        });
      
      if (error) {
        if (error.code === '23505') {
          // Code déjà existant (collision), réessayer
          console.log(`⚠️  Code ${code} existe déjà, régénération...`);
          i--; // Réessayer
          continue;
        }
        errors.push(`${code}: ${error.message}`);
      } else {
        codes.push(code);
        if ((i + 1) % 10 === 0) {
          console.log(`✅ ${i + 1}/${count} codes générés...`);
        }
      }
    } catch (err) {
      errors.push(`${code}: ${err}`);
    }
  }
  
  console.log('\n📋 RÉSUMÉ');
  console.log(`✅ Codes générés: ${codes.length}`);
  console.log(`❌ Erreurs: ${errors.length}`);
  
  if (errors.length > 0) {
    console.log('\n⚠️  ERREURS:');
    errors.forEach(err => console.log(`  - ${err}`));
  }
  
  console.log('\n📝 CODES GÉNÉRÉS (à imprimer sur cartes):');
  console.log('─'.repeat(50));
  codes.forEach((code, index) => {
    console.log(`${(index + 1).toString().padStart(3, '0')}. ${code}`);
  });
  console.log('─'.repeat(50));
  
  // Sauvegarder dans un fichier
  const filename = `codes_${new Date().toISOString().split('T')[0]}.txt`;
  await Deno.writeTextFile(
    `/tmp/${filename}`,
    codes.join('\n')
  );
  console.log(`\n💾 Codes sauvegardés dans /tmp/${filename}`);
  
  return codes;
}

// Exécution
const count = parseInt(Deno.args[0]) || 100;
await generateCodes(count);
