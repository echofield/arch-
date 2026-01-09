/**
 * Script de vérification de la connexion Supabase
 * Exécutez : node check-supabase.js
 */

const SUPABASE_URL = 'https://qvyrpzgxsppkwfvqvgcn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2eXJwemd4c3Bwa3dmdnF2Z2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NTc0MDIsImV4cCI6MjA3NzQzMzQwMn0.mYqlWWtonfV2etTLLsMQ0eXP805vpqC3nTZ6Pwy4on0';

async function checkSupabase() {
  console.log('🔍 Vérification de la connexion Supabase...\n');
  
  try {
    // Test 1: Health check
    console.log('1️⃣ Test de connexion...');
    const healthResponse = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    if (healthResponse.ok) {
      console.log('✅ Connexion Supabase OK\n');
    } else {
      console.log('❌ Erreur de connexion:', healthResponse.status, healthResponse.statusText);
      return;
    }
    
    // Test 2: Vérifier les tables
    console.log('2️⃣ Vérification des tables...');
    const tablesResponse = await fetch(`${SUPABASE_URL}/rest/v1/cards?select=code&limit=1`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    if (tablesResponse.ok) {
      console.log('✅ Table "cards" accessible\n');
    } else if (tablesResponse.status === 404) {
      console.log('⚠️  Table "cards" non trouvée (peut-être pas encore créée)\n');
    } else {
      console.log('❌ Erreur:', tablesResponse.status, tablesResponse.statusText);
    }
    
    // Test 3: Vérifier les Edge Functions
    console.log('3️⃣ Vérification des Edge Functions...');
    const functions = [
      'check-card',
      'activate-card',
      'login-card',
      'server'
    ];
    
    for (const func of functions) {
      try {
        const funcResponse = await fetch(
          `${SUPABASE_URL}/functions/v1/make-server-9060b10a/${func === 'server' ? 'health' : func}`,
          {
            method: func === 'server' ? 'GET' : 'POST',
            headers: {
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json'
            },
            body: func === 'server' ? undefined : JSON.stringify({ code: 'TEST' })
          }
        );
        
        if (funcResponse.status === 200 || funcResponse.status === 404) {
          console.log(`   ${funcResponse.status === 200 ? '✅' : '⚠️ '} ${func} (${funcResponse.status})`);
        } else {
          console.log(`   ❌ ${func} (${funcResponse.status})`);
        }
      } catch (error) {
        console.log(`   ⚠️  ${func} (non déployée ou erreur)`);
      }
    }
    
    console.log('\n📋 RÉSUMÉ :');
    console.log('   - Connexion Supabase : ✅');
    console.log('   - Vérifiez les Edge Functions dans Supabase Dashboard');
    console.log('   - URL Dashboard : https://supabase.com/dashboard/project/qvyrpzgxsppkwfvqvgcn');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

checkSupabase();

