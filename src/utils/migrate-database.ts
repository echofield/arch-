/**
 * 🔧 Script de migration automatique
 * Ajoute card_id à journal_entries via l'API du serveur
 */

import { projectId, publicAnonKey } from './supabase/info';

export async function runMigration() {
  console.log('🔧 Lancement de la migration...');
  
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-9060b10a/admin/migrate-add-card-id`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  const result = await response.json();
  
  if (result.success) {
    console.log('✅ Migration réussie:', result);
  } else {
    console.error('❌ Migration échouée:', result);
  }
  
  return result;
}

// Auto-exécuter si appelé directement
if (typeof window !== 'undefined') {
  (window as any).runMigration = runMigration;
  console.log('💡 Pour lancer la migration, taper: runMigration()');
}
