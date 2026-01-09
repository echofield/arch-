# EXEMPLE D'INTÉGRATION CODEX

## Comment inscrire automatiquement dans le Codex quand une quête est "vécue"

### Contexte

Actuellement, le Codex est vide car aucun événement n'a été inscrit automatiquement.
Voici comment l'intégrer dans le flux de QueteDetail.

---

## Exemple 1 : Bouton "J'ai vécu cette quête"

### Dans QueteDetail.tsx :

```typescript
import { useState } from 'react';
import { inscribeQuest } from '../utils/codex-helpers';

export function QueteDetail({ questId, onBack, onViewMap }: QueteDetailProps) {
  const [inscribed, setInscribed] = useState(false);
  const [inscribing, setInscribing] = useState(false);

  const questData = questsData[questId];

  const handleInscribe = async () => {
    setInscribing(true);
    
    try {
      // Inscrire automatiquement dans le Codex
      await inscribeQuest(
        questData.id,
        questData.name,
        questData.lieuxAffinitaires[0]?.name || 'Paris'
      );
      
      setInscribed(true);
      
      // Optionnel : message discret (pas de gamification)
      setTimeout(() => setInscribed(false), 2000);
    } catch (error) {
      console.error('Error inscribing quest:', error);
    } finally {
      setInscribing(false);
    }
  };

  return (
    <div>
      {/* ... reste du composant ... */}
      
      {/* Bouton d'inscription (neutre, non-gamifié) */}
      <div style={{ padding: 'var(--space-lg)' }}>
        <button
          onClick={handleInscribe}
          disabled={inscribing || inscribed}
          style={{
            width: '100%',
            padding: 'var(--space-md)',
            border: `var(--border-thin) solid var(--grey-light)`,
            background: inscribed ? 'rgba(138, 167, 154, 0.08)' : 'transparent',
            cursor: inscribing || inscribed ? 'default' : 'pointer',
            transition: 'all var(--transition)',
            opacity: inscribed ? 0.6 : 1
          }}
        >
          <span className="small-caps">
            {inscribed ? 'Inscrit dans le Codex' : 'Marquer comme vécu'}
          </span>
        </button>
      </div>
    </div>
  );
}
```

---

## Exemple 2 : Inscription automatique au clic sur "Télécharger le parcours"

```typescript
const handleDownload = async () => {
  // Télécharger le parcours (fonctionnalité existante)
  // ...

  // Inscrire automatiquement dans le Codex
  await inscribeQuest(
    questData.id,
    questData.name,
    questData.lieuxAffinitaires[0]?.name || 'Paris'
  );
};
```

---

## Exemple 3 : Inscription silencieuse au montage du composant

Si tu veux que le simple fait de **consulter** une quête l'inscrive dans le Codex :

```typescript
import { useEffect } from 'react';
import { inscribeQuest } from '../utils/codex-helpers';

export function QueteDetail({ questId, onBack }: QueteDetailProps) {
  const questData = questsData[questId];

  useEffect(() => {
    // Inscrire silencieusement quand la quête est ouverte
    const inscribe = async () => {
      await inscribeQuest(
        questData.id,
        questData.name,
        questData.lieuxAffinitaires[0]?.name || 'Paris'
      );
    };

    inscribe();
  }, [questId]);

  return (
    // ... reste du composant
  );
}
```

⚠️ **Attention** : Cette méthode peut créer des inscriptions multiples si l'utilisateur ouvre/ferme plusieurs fois la quête. Pour éviter ça, tu peux vérifier si la quête est déjà inscrite :

```typescript
useEffect(() => {
  const inscribe = async () => {
    // Check localStorage pour éviter les doublons
    const inscribedQuests = JSON.parse(
      localStorage.getItem('inscribed-quests') || '[]'
    );

    if (!inscribedQuests.includes(questId)) {
      await inscribeQuest(
        questData.id,
        questData.name,
        questData.lieuxAffinitaires[0]?.name || 'Paris'
      );

      // Marquer comme inscrit
      inscribedQuests.push(questId);
      localStorage.setItem('inscribed-quests', JSON.stringify(inscribedQuests));
    }
  };

  inscribe();
}, [questId]);
```

---

## Exemple 4 : Phrases personnalisées pour chaque quête

Au lieu d'utiliser les phrases aléatoires par défaut, tu peux créer des traces spécifiques :

```typescript
import { inscribeCodexEntry } from '../utils/supabase/client';
import { formatDateDisplay } from '../utils/codex-helpers';

// Mapping de phrases par quête
const questTraces: Record<string, string> = {
  passages: "Les passages couverts ont été explorés.",
  jardins: "Les jardins secrets ont été traversés.",
  facades: "Les façades haussmaniennes ont été contemplées.",
  // etc.
};

const handleInscribe = async () => {
  await inscribeCodexEntry({
    dateDisplay: formatDateDisplay(),
    lieu: questData.lieuxAffinitaires[0]?.name || 'Paris',
    trace: questTraces[questId] || "Un parcours a été suivi.",
    eventType: 'quest',
    questId: questData.id,
    source: 'manual'
  });
};
```

---

## Recommandation

Pour respecter la philosophie "zéro gamification" :

### ✅ Option recommandée : Bouton discret "Marquer comme vécu"

- L'utilisateur décide consciemment
- Pas de pop-up, pas de confetti
- Message neutre : "Inscrit dans le Codex" (disparaît après 2s)
- Bouton devient grisé après inscription

### ❌ À éviter :

- Pop-up "Félicitations !"
- Animation de réussite
- Son de validation
- Compteur "3/9 quêtes complétées"
- Badge "Explorateur de passages"

---

## Résultat dans le Codex

Après avoir "vécu" une quête, l'utilisateur verra dans le Codex :

```
12 décembre 2024
Passage des Panoramas

Une attention a été déposée.
```

C'est sobre, factuel, non-gamifié. Exactement ce qu'il faut. 🎯
