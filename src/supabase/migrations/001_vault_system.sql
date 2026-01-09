-- ARCHÉ V1 — VAULT SYSTEM
-- Migration: Tables pour système d'activation par code + vault

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

-- RLS : TOUT VERROUILLÉ (accès uniquement via Edge Functions avec service_role_key)
ALTER TABLE activation_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vaults ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

-- Aucune policy publique : le serveur accède via service_role_key uniquement
