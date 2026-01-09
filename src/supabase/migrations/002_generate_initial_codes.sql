-- ARCHÉ — Génération de 100 codes d'activation initiaux
-- Alternative simple si Deno/Edge Functions pas disponible

-- Note: Cette approche génère des codes pseudo-aléatoires
-- Pour production, utiliser generate_codes.tsx pour meilleure entropie

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
    
    -- Log progress (tous les 10)
    IF i % 10 = 0 THEN
      RAISE NOTICE 'Généré % codes...', i;
    END IF;
  END LOOP;
  
  RAISE NOTICE 'Génération terminée !';
END $$;

-- Afficher les codes générés
SELECT 
  ROW_NUMBER() OVER (ORDER BY created_at) as num,
  code,
  status,
  created_at
FROM activation_codes
ORDER BY created_at DESC
LIMIT 100;
