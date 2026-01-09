-- ================================================
-- ARCHÉ V1 — SETUP COMPLET EN 1 REQUÊTE
-- ================================================
-- Copie-colle ce code dans Supabase SQL Editor
-- et clique "Run"
-- ================================================

-- 1. CRÉER LES TABLES
-- ================================================

-- Table : activation_codes
CREATE TABLE IF NOT EXISTS activation_codes (
  code TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'issued' CHECK (status IN ('issued', 'activated', 'revoked')),
  vault_id UUID NULL,
  activated_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table : vaults
CREATE TABLE IF NOT EXISTS vaults (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table : journal_entries
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vault_id UUID NOT NULL REFERENCES vaults(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  place_id TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_journal_vault ON journal_entries(vault_id);
CREATE INDEX IF NOT EXISTS idx_activation_status ON activation_codes(status);

-- 2. ACTIVER RLS (sécurité)
-- ================================================

ALTER TABLE activation_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vaults ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

-- 3. GÉNÉRER 100 CODES DE TEST
-- ================================================

DO $$
DECLARE
  i INT;
  new_code TEXT;
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  part1 TEXT;
  part2 TEXT;
BEGIN
  FOR i IN 1..100 LOOP
    -- Générer partie 1 (4 caractères)
    part1 := '';
    FOR j IN 1..4 LOOP
      part1 := part1 || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;
    
    -- Générer partie 2 (4 caractères)
    part2 := '';
    FOR j IN 1..4 LOOP
      part2 := part2 || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;
    
    new_code := 'ARCHE-' || part1 || '-' || part2;
    
    -- Insérer (ignorer si collision)
    INSERT INTO activation_codes (code, status, created_at)
    VALUES (new_code, 'issued', now())
    ON CONFLICT (code) DO NOTHING;
  END LOOP;
  
  RAISE NOTICE '✅ 100 codes générés !';
END $$;

-- 4. AFFICHER LES CODES (pour test)
-- ================================================

SELECT 
  ROW_NUMBER() OVER (ORDER BY created_at) as num,
  code,
  status
FROM activation_codes
ORDER BY created_at
LIMIT 10;

-- ================================================
-- ✅ SETUP TERMINÉ !
-- ================================================
-- Tu peux maintenant :
-- 1. Copier un code dans le résultat ci-dessus
-- 2. Tester l'activation dans l'app
-- ================================================
