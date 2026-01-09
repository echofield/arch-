-- ARCHÉ Cards System
-- Run this in Supabase SQL Editor

-- Cards table
CREATE TABLE IF NOT EXISTS cards (
  id TEXT PRIMARY KEY,                    -- "PS-0001", "PS-0002"...
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  activated_at TIMESTAMP WITH TIME ZONE,  -- NULL until first scan
  device_fingerprint TEXT,                -- Browser fingerprint of activator
  access_count INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb      -- Flexible extra data
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_cards_activated ON cards(activated_at);

-- Enable Row Level Security
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read cards (to check if valid)
CREATE POLICY "Cards are readable by everyone" ON cards
  FOR SELECT USING (true);

-- Policy: Anyone can update cards (for activation/tracking)
CREATE POLICY "Cards can be updated by everyone" ON cards
  FOR UPDATE USING (true);

-- Function to activate a card
CREATE OR REPLACE FUNCTION activate_card(
  card_id TEXT,
  fingerprint TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  card_record RECORD;
  result JSONB;
BEGIN
  -- Get the card
  SELECT * INTO card_record FROM cards WHERE id = card_id;

  -- Card doesn't exist
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'CARD_NOT_FOUND',
      'message', 'Cette carte n''existe pas.'
    );
  END IF;

  -- Card already activated by someone else
  IF card_record.activated_at IS NOT NULL
     AND card_record.device_fingerprint IS NOT NULL
     AND card_record.device_fingerprint != fingerprint THEN
    -- Still allow access but note it's already activated
    UPDATE cards SET
      access_count = access_count + 1,
      last_accessed_at = NOW()
    WHERE id = card_id;

    RETURN jsonb_build_object(
      'success', true,
      'status', 'ALREADY_ACTIVATED',
      'message', 'Carte déjà activée. Accès autorisé.',
      'activated_at', card_record.activated_at
    );
  END IF;

  -- First activation or same device
  IF card_record.activated_at IS NULL THEN
    -- First activation
    UPDATE cards SET
      activated_at = NOW(),
      device_fingerprint = fingerprint,
      access_count = 1,
      last_accessed_at = NOW()
    WHERE id = card_id;

    RETURN jsonb_build_object(
      'success', true,
      'status', 'ACTIVATED',
      'message', 'Carte activée. Bienvenue dans ARCHÉ.'
    );
  ELSE
    -- Same device returning
    UPDATE cards SET
      access_count = access_count + 1,
      last_accessed_at = NOW()
    WHERE id = card_id;

    RETURN jsonb_build_object(
      'success', true,
      'status', 'WELCOME_BACK',
      'message', 'Bon retour.',
      'access_count', card_record.access_count + 1
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to batch create cards
CREATE OR REPLACE FUNCTION create_cards(
  prefix TEXT,
  count INTEGER,
  start_from INTEGER DEFAULT 1
)
RETURNS TABLE(card_id TEXT) AS $$
BEGIN
  FOR i IN start_from..(start_from + count - 1) LOOP
    INSERT INTO cards (id) VALUES (prefix || '-' || LPAD(i::TEXT, 4, '0'))
    ON CONFLICT (id) DO NOTHING;
    card_id := prefix || '-' || LPAD(i::TEXT, 4, '0');
    RETURN NEXT;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create initial batch of cards
SELECT * FROM create_cards('PS', 100, 1);
