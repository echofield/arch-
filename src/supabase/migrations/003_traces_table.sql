-- ARCHÉ — Les Traces
-- The sediment of memory. Each walker leaves a mark.
-- Run this in Supabase SQL Editor

-- Traces table
CREATE TABLE IF NOT EXISTS traces (
  id SERIAL PRIMARY KEY,
  card_id TEXT NOT NULL,               -- Which card left this trace
  quest_id TEXT NOT NULL,              -- lutece, 1789, table
  etape_id TEXT NOT NULL,              -- stop identifier
  content TEXT NOT NULL CHECK (char_length(content) BETWEEN 3 AND 140),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_traces_location ON traces(quest_id, etape_id);
CREATE INDEX IF NOT EXISTS idx_traces_card ON traces(card_id);
CREATE INDEX IF NOT EXISTS idx_traces_recent ON traces(created_at DESC);

-- Enable Row Level Security
ALTER TABLE traces ENABLE ROW LEVEL SECURITY;

-- Anyone can read traces (they're anonymous, just card_id visible)
CREATE POLICY "Traces are readable by everyone" ON traces
  FOR SELECT USING (true);

-- Anyone can insert traces (tied to their card)
CREATE POLICY "Anyone can leave a trace" ON traces
  FOR INSERT WITH CHECK (true);

-- Function to get random traces for a location (returns 1-3)
CREATE OR REPLACE FUNCTION get_traces(
  p_quest_id TEXT,
  p_etape_id TEXT,
  p_limit INTEGER DEFAULT 3
)
RETURNS TABLE (
  content TEXT,
  card_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT t.content, t.card_id, t.created_at
  FROM traces t
  WHERE t.quest_id = p_quest_id
    AND t.etape_id = p_etape_id
  ORDER BY RANDOM()
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Function to leave a trace (with duplicate prevention)
CREATE OR REPLACE FUNCTION leave_trace(
  p_card_id TEXT,
  p_quest_id TEXT,
  p_etape_id TEXT,
  p_content TEXT
)
RETURNS JSONB AS $$
DECLARE
  existing_count INTEGER;
BEGIN
  -- Check if this card already left a trace at this location
  SELECT COUNT(*) INTO existing_count
  FROM traces
  WHERE card_id = p_card_id
    AND quest_id = p_quest_id
    AND etape_id = p_etape_id;

  IF existing_count > 0 THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'ALREADY_LEFT_TRACE',
      'message', 'Vous avez déjà laissé une trace ici.'
    );
  END IF;

  -- Validate content length
  IF char_length(p_content) < 3 OR char_length(p_content) > 140 THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'INVALID_LENGTH',
      'message', 'La trace doit faire entre 3 et 140 caractères.'
    );
  END IF;

  -- Insert the trace
  INSERT INTO traces (card_id, quest_id, etape_id, content)
  VALUES (p_card_id, p_quest_id, p_etape_id, p_content);

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Trace laissée.'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Stats view (optional, for analytics)
CREATE OR REPLACE VIEW trace_stats AS
SELECT
  quest_id,
  etape_id,
  COUNT(*) as trace_count,
  COUNT(DISTINCT card_id) as unique_walkers,
  MAX(created_at) as last_trace
FROM traces
GROUP BY quest_id, etape_id
ORDER BY trace_count DESC;
