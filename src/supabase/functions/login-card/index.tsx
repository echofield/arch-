// EDGE FUNCTION : login-card
// Vérifie le mot de passe et retourne une session si valide
// Gère anti-bruteforce (5 tentatives → lock 15 min)

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

const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MINUTES = 15;

// Route: /make-server-9060b10a/login-card
app.post('/make-server-9060b10a/login-card', async (c) => {
  try {
    const { code, password } = await c.req.json();

    // Validation
    if (!code || typeof code !== 'string') {
      return c.json({ error: 'Code de carte requis' }, 400);
    }

    if (!password || typeof password !== 'string') {
      return c.json({ error: 'Mot de passe requis' }, 400);
    }

    // Créer client Supabase avec service role
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Récupérer la carte (avec password_hash car service_role)
    const { data: card, error: fetchError } = await supabase
      .from('cards')
      .select('id, code, password_hash, activated_at, failed_attempts, locked_until')
      .eq('code', code)
      .single();

    if (fetchError || !card) {
      console.error('[login-card] Card not found:', code);
      return c.json({ error: 'Code de carte invalide' }, 404);
    }

    // Vérifier si la carte est activée
    if (!card.password_hash || !card.activated_at) {
      console.error('[login-card] Card not activated:', code);
      return c.json({ error: 'Cette carte n\'a pas encore été activée' }, 400);
    }

    // Vérifier si la carte est verrouillée
    if (card.locked_until) {
      const lockedUntil = new Date(card.locked_until);
      const now = new Date();

      if (lockedUntil > now) {
        const minutesRemaining = Math.ceil((lockedUntil.getTime() - now.getTime()) / 60000);
        console.error('[login-card] Card locked:', code, 'until', card.locked_until);
        return c.json({ 
          error: `Carte verrouillée. Réessayez dans ${minutesRemaining} minute${minutesRemaining > 1 ? 's' : ''}.`,
          locked: true,
          locked_until: card.locked_until,
          minutes_remaining: minutesRemaining
        }, 403);
      } else {
        // Le lock a expiré → réinitialiser
        await supabase
          .from('cards')
          .update({
            failed_attempts: 0,
            locked_until: null
          })
          .eq('id', card.id);
      }
    }

    // Vérifier le mot de passe
    const isValid = await bcrypt.compare(password, card.password_hash);

    if (!isValid) {
      // Mot de passe incorrect → incrémenter failed_attempts
      const newFailedAttempts = (card.failed_attempts || 0) + 1;
      let lockedUntil = null;

      if (newFailedAttempts >= MAX_ATTEMPTS) {
        // Verrouiller pour LOCK_DURATION_MINUTES
        lockedUntil = new Date(Date.now() + LOCK_DURATION_MINUTES * 60 * 1000).toISOString();
        console.error(`[login-card] Card locked after ${MAX_ATTEMPTS} attempts:`, code);
      }

      await supabase
        .from('cards')
        .update({
          failed_attempts: newFailedAttempts,
          locked_until: lockedUntil
        })
        .eq('id', card.id);

      // Logger l'événement
      await supabase.from('card_events').insert({
        card_id: card.id,
        event_type: 'login_failed',
        data: {
          failed_attempts: newFailedAttempts,
          locked: lockedUntil !== null
        }
      });

      if (lockedUntil) {
        return c.json({ 
          error: `Trop de tentatives incorrectes. Carte verrouillée pour ${LOCK_DURATION_MINUTES} minutes.`,
          locked: true,
          locked_until: lockedUntil,
          minutes_remaining: LOCK_DURATION_MINUTES
        }, 403);
      } else {
        const remainingAttempts = MAX_ATTEMPTS - newFailedAttempts;
        return c.json({ 
          error: 'Mot de passe incorrect',
          failed_attempts: newFailedAttempts,
          remaining_attempts: remainingAttempts
        }, 401);
      }
    }

    // ✅ Mot de passe correct → Réinitialiser failed_attempts et logger
    await supabase
      .from('cards')
      .update({
        failed_attempts: 0,
        locked_until: null,
        last_login_at: new Date().toISOString()
      })
      .eq('id', card.id);

    // Logger l'événement
    await supabase.from('card_events').insert({
      card_id: card.id,
      event_type: 'login_success',
      data: {
        logged_in_at: new Date().toISOString()
      }
    });

    console.log(`[login-card] Login successful: ${code}`);

    // Retourner les infos de session (SANS password_hash)
    return c.json({
      success: true,
      card: {
        id: card.id,
        code: card.code,
        activated_at: card.activated_at
      },
      session: {
        card_id: card.id,
        logged_in_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('[login-card] Unexpected error:', error);
    return c.json({ error: 'Erreur serveur inattendue' }, 500);
  }
});

Deno.serve(app.fetch);
