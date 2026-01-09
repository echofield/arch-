import { useState } from 'react';
import { HomepageV1 } from './components/HomepageV1';
import { QuetesV1 } from './components/QuetesV1';
import { QueteDetail } from './components/QueteDetail';
import { OrigineManifeste } from './components/OrigineManifeste';
import { HistoireArchives } from './components/HistoireArchives';

type Screen = 'homepage' | 'origine' | 'quetes' | 'histoire' | 'detail';

/**
 * APP V1 — ARCHÉ
 * 
 * Version minimaliste éditoriale.
 * 
 * 5 écrans uniquement :
 * 1. Homepage — Monument d'entrée (avec 3 cartes éditoriales)
 * 2. Origine — Manifeste fondateur
 * 3. Quêtes — 3 portes (Lutèce / 1789 / Table)
 * 4. Histoire — Archives éditoriales
 * 5. Détail — Texte long + Google Maps
 * 
 * Pas de :
 * - Quiz
 * - Profiling
 * - Parcours complexes
 * - Cartes interactives centrales
 * - Filtres
 * - Listes exhaustives
 * - Navigation dense
 * - Indicateurs de complétion
 * - Gamification
 */
export default function AppV1() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('homepage');
  const [selectedQueteId, setSelectedQueteId] = useState<string | null>(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'homepage':
        return (
          <HomepageV1 
            onEnterQuetes={() => setCurrentScreen('quetes')}
            onEnterOrigine={() => setCurrentScreen('origine')}
            onEnterHistoire={() => setCurrentScreen('histoire')}
          />
        );

      case 'origine':
        return (
          <OrigineManifeste 
            onBack={() => setCurrentScreen('homepage')}
          />
        );

      case 'histoire':
        return (
          <HistoireArchives 
            onBack={() => setCurrentScreen('homepage')}
          />
        );

      case 'quetes':
        return (
          <QuetesV1 
            onBack={() => setCurrentScreen('homepage')}
            onQueteSelect={(queteId) => {
              setSelectedQueteId(queteId);
              setCurrentScreen('detail');
            }}
          />
        );

      case 'detail':
        if (!selectedQueteId) {
          setCurrentScreen('quetes');
          return null;
        }
        return (
          <QueteDetail 
            queteId={selectedQueteId}
            onBack={() => setCurrentScreen('quetes')}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FAF8F2' }}>
      {renderScreen()}
    </div>
  );
}