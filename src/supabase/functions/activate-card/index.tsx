// EDGE FUNCTION : activate-card
// Active une carte vierge avec un mot de passe
// Hash le mot de passe avec bcrypt (JAMAIS en clair)

import { createClient } from 'jsr:@supabase/supabase-js@2';
import { cors } from "npm:hono/cors@4.6.14";
import { Hono } from "npm:hono@4.6.14";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const app = new Hono();

app.use('*', cors({
  origin: '*',
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Route: /make-server-9060b10a/activate-card
app.post('/make-server-9060b10a/activate-card', async (c) => {
  try {
    const { code, password } = await c.req.json();

    // Validation
    if (!code || typeof code !== 'string') {
      return c.json({ error: 'Code de carte requis' }, 400);
    }

    if (!password || typeof password !== 'string' || password.length < 4) {
      return c.json({ error: 'Mot de passe requis (minimum 4 caractères)' }, 400);
    }

    // Créer client Supabase avec service role
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Vérifier que la carte existe et n'est pas déjà activée
    const { data: existingCard, error: fetchError } = await supabase
      .from('cards')
      .select('id, code, password_hash, activated_at')
      .eq('code', code)
      .single();

    if (fetchError || !existingCard) {
      console.error('[activate-card] Card not found:', code);
      return c.json({ error: 'Code de carte invalide' }, 404);
    }

    if (existingCard.password_hash || existingCard.activated_at) {
      console.error('[activate-card] Card already activated:', code);
      return c.json({ error: 'Cette carte a déjà été activée' }, 400);
    }

    // Hash du mot de passe avec bcrypt
    const passwordHash = await bcrypt.hash(password);

    // Activer la carte
    const { data: updatedCard, error: updateError } = await supabase
      .from('cards')
      .update({
        password_hash: passwordHash,
        activated_at: new Date().toISOString(),
        failed_attempts: 0,
        locked_until: null
      })
      .eq('id', existingCard.id)
      .select('id, code, activated_at')
      .single();

    if (updateError) {
      console.error('[activate-card] Update error:', updateError);
      return c.json({ error: 'Erreur lors de l\'activation' }, 500);
    }

    // Logger l'événement
    await supabase.from('card_events').insert({
      card_id: updatedCard.id,
      event_type: 'card_activated',
      data: {
        activated_at: updatedCard.activated_at
      }
    });

    console.log(`[activate-card] Card activated successfully: ${code}`);

    // Retourner les infos (SANS password_hash)
    return c.json({
      success: true,
      card: {
        id: updatedCard.id,
        code: updatedCard.code,
        activated_at: updatedCard.activated_at
      }
    });

  } catch (error) {
    console.error('[activate-card] Unexpected error:', error);
    return c.json({ error: 'Erreur serveur inattendue' }, 500);
  }
});

Deno.serve(app.fetch);
