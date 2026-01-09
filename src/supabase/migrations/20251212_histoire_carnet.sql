-- Migration pour HISTOIRE — Journal de Paris
-- Tables pour persistence discrète du Carnet Parisien et tracking Histoire

-- Table 1 : Tracking silencieux des lectures d'Histoire Quotidienne
CREATE TABLE IF NOT EXISTS daily_history_reads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  date_key TEXT NOT NULL, -- Format: "MM-DD" (ex: "12-06")
  read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour requêtes rapides par user et date
CREATE INDEX IF NOT EXISTS idx_history_reads_user ON daily_history_reads(user_id);
CREATE INDEX IF NOT EXISTS idx_history_reads_date ON daily_history_reads(date_key);

-- Table 2 : Persistence du Carnet Parisien
CREATE TABLE IF NOT EXISTS carnet_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  content TEXT NOT NULL,
  lieu TEXT, -- Optionnel
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour récupération chronologique par user
CREATE INDEX IF NOT EXISTS idx_carnet_entries_user ON carnet_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_carnet_entries_created ON carnet_entries(created_at DESC);

-- Table 3 : Codex — Archive automatique des événements vécus
CREATE TABLE IF NOT EXISTS codex_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  date_display TEXT NOT NULL, -- Ex: "6 décembre 2024"
  lieu TEXT NOT NULL, -- Nom du lieu (rue, passage, quartier)
  trace TEXT NOT NULL, -- Phrase générée automatiquement
  event_type TEXT, -- Type d'événement (quête, scan, présence, etc.) - métadonnée technique
  quest_id TEXT, -- ID de la quête associée (si applicable)
  source TEXT, -- Source de l'événement (scan, présence, lecture, etc.)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour récupération chronologique par user
CREATE INDEX IF NOT EXISTS idx_codex_entries_user ON codex_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_codex_entries_created ON codex_entries(created_at DESC);

-- Row Level Security (RLS)
-- Les utilisateurs ne peuvent voir que leurs propres données

ALTER TABLE daily_history_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE carnet_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE codex_entries ENABLE ROW LEVEL SECURITY;

-- Politique : Lecture de ses propres données
CREATE POLICY "Users can read own history reads"
  ON daily_history_reads FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can read own carnet entries"
  ON carnet_entries FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can read own codex entries"
  ON codex_entries FOR SELECT
  USING (user_id = auth.uid());

-- Politique : Insertion de ses propres données
CREATE POLICY "Users can insert own history reads"
  ON daily_history_reads FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can insert own carnet entries"
  ON carnet_entries FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can insert own codex entries"
  ON codex_entries FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Politique : Suppression de ses propres entrées de carnet
CREATE POLICY "Users can delete own carnet entries"
  ON carnet_entries FOR DELETE
  USING (user_id = auth.uid());