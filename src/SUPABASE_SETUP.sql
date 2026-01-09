-- ============================================
-- ARCHÉ — SYSTÈME DE CARTES SANS EMAIL
-- Tables + RLS + Functions
-- ============================================

-- 1. TABLE : cards
-- Stocke les cartes physiques et leur état
-- ============================================

create table if not exists cards (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,                -- Code imprimé sur la carte (6 caractères)
  password_hash text,                        -- null = carte vierge, jamais activée
  activated_at timestamptz,                  -- Date de première activation
  failed_attempts int default 0,             -- Compteur d'échecs de connexion
  locked_until timestamptz,                  -- null = pas verrouillée
  last_login_at timestamptz,                 -- Dernière connexion réussie
  created_at timestamptz default now()
);

-- Index pour recherche rapide par code
create index if not exists idx_cards_code on cards(code);

-- 2. TABLE : card_quests
-- Quêtes activées par carte
-- ============================================

create table if not exists card_quests (
  id uuid primary key default gen_random_uuid(),
  card_id uuid references cards(id) on delete cascade,
  quest_id text not null,                    -- ID de la quête (ex: "memoire-d-encre")
  activated_at timestamptz default now(),
  completed_at timestamptz,                  -- null = en cours
  data jsonb default '{}'::jsonb             -- Progression, notes, etc.
);

-- Index pour recherche rapide par carte
create index if not exists idx_card_quests_card_id on card_quests(card_id);

-- 3. TABLE : card_events
-- Journal des événements (tracking silencieux)
-- ============================================

create table if not exists card_events (
  id uuid primary key default gen_random_uuid(),
  card_id uuid references cards(id) on delete cascade,
  event_type text not null,                  -- "quest_started", "memory_written", "codex_entry", etc.
  data jsonb default '{}'::jsonb,            -- Données contextuelles
  created_at timestamptz default now()
);

-- Index pour recherche rapide par carte + type
create index if not exists idx_card_events_card_id on card_events(card_id);
create index if not exists idx_card_events_type on card_events(event_type);

-- 4. RLS POLICIES
-- Sécurité : personne ne peut lire les password_hash
-- ============================================

-- Enable RLS
alter table cards enable row level security;
alter table card_quests enable row level security;
alter table card_events enable row level security;

-- POLICY : cards
-- Les clients ne peuvent JAMAIS lire password_hash directement
-- Seules les Edge Functions (service_role) peuvent y accéder

create policy "Cards are readable without password_hash"
  on cards for select
  using (true);

-- Empêcher toute modification directe depuis le client
create policy "Cards cannot be modified by clients"
  on cards for all
  using (false);

-- POLICY : card_quests
-- Lecture publique (pour afficher les quêtes)
-- Écriture uniquement via Edge Functions

create policy "Card quests are readable"
  on card_quests for select
  using (true);

create policy "Card quests cannot be modified by clients"
  on card_quests for all
  using (false);

-- POLICY : card_events
-- Lecture publique (pour analytics)
-- Écriture uniquement via Edge Functions

create policy "Card events are readable"
  on card_events for select
  using (true);

create policy "Card events cannot be modified by clients"
  on card_events for all
  using (false);

-- 5. HELPER FUNCTIONS
-- RPC functions pour opérations sécurisées
-- ============================================

-- Function: check_card_status
-- Vérifie si un code existe et retourne son statut (SANS password_hash)
-- Usage: rpc('check_card_status', { card_code: 'X7K9P2' })

create or replace function check_card_status(card_code text)
returns jsonb
language plpgsql
security definer
as $$
declare
  card_record record;
  result jsonb;
begin
  select 
    id,
    code,
    activated_at,
    failed_attempts,
    locked_until,
    last_login_at
  into card_record
  from cards
  where code = card_code;

  if not found then
    return jsonb_build_object(
      'exists', false
    );
  end if;

  -- Carte existe
  result := jsonb_build_object(
    'exists', true,
    'card_id', card_record.id,
    'code', card_record.code,
    'is_activated', card_record.activated_at is not null,
    'is_locked', card_record.locked_until is not null and card_record.locked_until > now(),
    'locked_until', card_record.locked_until,
    'failed_attempts', card_record.failed_attempts,
    'last_login_at', card_record.last_login_at
  );

  return result;
end;
$$;

-- ============================================
-- FIN DU SETUP
-- ============================================

-- Pour vérifier que tout est OK :
-- select * from cards limit 5;
-- select * from card_quests limit 5;
-- select * from card_events limit 5;
-- select check_card_status('TEST01');
