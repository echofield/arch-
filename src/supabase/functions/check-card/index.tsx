// EDGE FUNCTION : check-card
// Vérifie si un code de carte existe et retourne son statut
// SANS JAMAIS exposer le password_hash

import { createClient } from 'jsr:@supabase/supabase-js@2';
import { cors } from "npm:hono/cors@4.6.14";
import { Hono } from "npm:hono@4.6.14";

const app = new Hono();

app.use('*', cors({
  origin: '*',
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Route: /make-server-9060b10a/check-card
app.post('/make-server-9060b10a/check-card', async (c) => {
  try {
    const { code } = await c.req.json();

    if (!code || typeof code !== 'string') {
      return c.json({ error: 'Code de carte requis' }, 400);
    }

    // Créer client Supabase avec service role (accès complet)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Utiliser la fonction RPC sécurisée
    const { data, error } = await supabase.rpc('check_card_status', {
      card_code: code
    });

    if (error) {
      console.error('[check-card] RPC error:', error);
      return c.json({ error: 'Erreur lors de la vérification de la carte' }, 500);
    }

    // Retourner le statut (SANS password_hash)
    return c.json({
      success: true,
      card: data
    });

  } catch (error) {
    console.error('[check-card] Unexpected error:', error);
    return c.json({ error: 'Erreur serveur inattendue' }, 500);
  }
});

Deno.serve(app.fetch);
