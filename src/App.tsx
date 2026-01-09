import { useState, useEffect } from 'react';
import { HomepageV1 } from './components/HomepageV1';
import { QuetesV1 } from './components/QuetesV1';
import { QueteDetail } from './components/QueteDetail';
import { OrigineMap } from './components/OrigineMap';
import { HistoireArchives } from './components/HistoireArchives';
import { CarnetParisien } from './components/CarnetParisien';
import { runMigration } from './utils/migrate-database';

type Screen = 'homepage' | 'origine' | 'quetes' | 'histoire' | 'detail' | 'carnet';

/**
 * APP V1 — ARCHÉ
 * 
 * Architecture multi-tenant via card_id :
 * - Chaque carte physique a un QR unique : ?card=LUT-2847
 * - Le card_id est lu depuis l'URL et stocké
 * - TOUTES les données sont filtrées par card_id
 * - Isolation totale entre les cartes
 * 
 * Écrans :
 * 1. Homepage — Monument d'entrée
 * 2. Origine — Carte révélation progressive
 * 3. Quêtes — 3 portes (Lutèce / 1789 / Table)
 * 4. Histoire — Archives éditoriales
 * 5. Détail — Texte long + Google Maps
 * 6. Carnet — Journal intime parisien
 */
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('homepage');
  const [selectedQueteId, setSelectedQueteId] = useState<string | null>(null);
  const [cardId, setCardId] = useState<string | null>(null);

  // Lire card_id depuis URL au montage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cardFromUrl = urlParams.get('card');
    
    if (cardFromUrl) {
      // Nouvelle carte scannée - stocker
      console.log('🎫 Carte détectée:', cardFromUrl);
      localStorage.setItem('arche_card_id', cardFromUrl);
      setCardId(cardFromUrl);
    } else {
      // Pas de card dans URL - vérifier localStorage
      const storedCard = localStorage.getItem('arche_card_id');
      if (storedCard) {
        console.log('🎫 Carte en mémoire:', storedCard);
        setCardId(storedCard);
      } else {
        // Mode démo pour développement
        console.log('⚠️ Aucune carte - Mode démo avec DEMO-0001');
        const demoCard = 'DEMO-0001';
        localStorage.setItem('arche_card_id', demoCard);
        setCardId(demoCard);
      }
    }
  }, []);

  // Gérer le routing via hash URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      
      if (!hash) {
        setCurrentScreen('homepage');
        return;
      }
      
      if (hash === 'origine') {
        setCurrentScreen('origine');
      } else if (hash === 'histoire') {
        setCurrentScreen('histoire');
      } else if (hash === 'carnet') {
        setCurrentScreen('carnet');
      } else if (hash === 'quetes') {
        setCurrentScreen('quetes');
      } else if (hash.startsWith('quete/')) {
        const queteId = hash.split('/')[1];
        setSelectedQueteId(queteId);
        setCurrentScreen('detail');
      } else {
        setCurrentScreen('homepage');
      }
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  const navigateTo = (screen: Screen, queteId?: string) => {
    if (screen === 'homepage') {
      window.location.hash = '';
    } else if (screen === 'detail' && queteId) {
      window.location.hash = `quete/${queteId}`;
    } else {
      window.location.hash = screen;
    }
  };

  // Attendre que le cardId soit chargé
  if (!cardId) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#FAF8F2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-serif)',
        fontSize: '14px',
        fontStyle: 'italic',
        color: '#1A1A1A',
        opacity: 0.3
      }}>
        Chargement...
      </div>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'homepage':
        return (
          <HomepageV1 
            onEnterQuetes={() => navigateTo('quetes')}
            onEnterOrigine={() => navigateTo('origine')}
            onEnterHistoire={() => navigateTo('histoire')}
            onEnterCarnet={() => navigateTo('carnet')}
          />
        );

      case 'origine':
        return (
          <OrigineMap 
            onBack={() => navigateTo('homepage')}
          />
        );

      case 'histoire':
        return (
          <HistoireArchives 
            onBack={() => navigateTo('homepage')}
          />
        );

      case 'quetes':
        return (
          <QuetesV1 
            onBack={() => navigateTo('homepage')}
            onSelectQuete={(queteId) => navigateTo('detail', queteId)}
          />
        );

      case 'detail':
        if (!selectedQueteId) {
          navigateTo('quetes');
          return null;
        }
        return (
          <QueteDetail 
            queteId={selectedQueteId}
            onBack={() => navigateTo('quetes')}
          />
        );

      case 'carnet':
        return (
          <CarnetParisien 
            cardId={cardId}
            onBack={() => navigateTo('homepage')}
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