import { useState, useEffect } from 'react';
import { PathwaysOverlay } from './PathwaysOverlay';
import { GeometricBackground } from './GeometricBackground';
import { inscribeCodexEntry } from '../utils/supabase/client';
import { formatDateDisplay } from '../utils/codex-helpers';

interface PathwaysMapProps {
  onBack: () => void;
}

type VoieType = 'flaneur' | 'caviste' | 'jardins' | 'ateliers' | 'all';

export function PathwaysMap({ onBack }: PathwaysMapProps) {
  const [selectedVoie, setSelectedVoie] = useState<VoieType>('all');

  // INSCRIPTION SILENCIEUSE : Ouverture des cartes
  useEffect(() => {
    const inscribed = localStorage.getItem('codex-pathways-opened');
    if (!inscribed) {
      const traces = [
        "Une cartographie a été consultée.",
        "Un territoire a été ouvert.",
        "Des chemins ont été révélés.",
        "Une géographie a été déployée."
      ];
      const randomTrace = traces[Math.floor(Math.random() * traces.length)];

      inscribeCodexEntry({
        dateDisplay: formatDateDisplay(),
        lieu: 'Paris — Quêtes',
        trace: randomTrace,
        eventType: 'map_opened',
        source: 'pathways_map'
      }).catch(() => {
        // Silencieux
      });

      localStorage.setItem('codex-pathways-opened', 'true');
    }
  }, []);

  const voies = [
    { 
      id: 'all' as VoieType, 
      name: 'Toutes les Quêtes',
      description: 'Vue d\'ensemble des inspirations parisiennes',
      color: 'var(--ink)',
      locations: []
    },
    { 
      id: 'flaneur' as VoieType, 
      name: 'Quête du Flâneur',
      description: 'Promenade & découverte sans but précis',
      color: 'var(--ink)',
      locations: ['Jardin du Luxembourg', 'Rue de Seine', 'Pont Neuf', 'Île de la Cité', 'Place Dauphine']
    },
    { 
      id: 'caviste' as VoieType, 
      name: 'Quête du Caviste',
      description: 'Gastronomie, vins & tables d\'exception',
      color: 'var(--green)',
      locations: ['Marché des Enfants Rouges', 'Rue Montorgueil', 'Cave Legrand Filles et Fils', 'Le Comptoir du Relais', 'La Dernière Goutte']
    },
    { 
      id: 'jardins' as VoieType, 
      name: 'Quête des Jardins',
      description: 'Nature, silence & havres de paix',
      color: 'var(--gold)',
      locations: ['Square Georges-Cain', 'Promenade Plantée', 'Jardin des Tuileries', 'Square Récamier', 'Jardin Sauvage Saint-Vincent']
    },
    { 
      id: 'ateliers' as VoieType, 
      name: 'Quête des Ateliers',
      description: 'Art, création & espaces culturels',
      color: '#8B4513',
      locations: ['Musée Rodin', 'Atelier Brancusi', 'Galerie Vero-Dodat', 'Montmartre Cité des Arts', 'Musée de la Vie Romantique']
    }
  ];

  return (
    <div className="min-h-screen pb-16" style={{ background: 'var(--paper)', position: 'relative' }}>
      {/* Geometric Background - Pathways composition */}
      <GeometricBackground composition="pathways" opacity={0.04} />
      
      {/* Header */}
      <div style={{ padding: 'var(--space-xl) var(--space-lg) var(--space-lg)', borderBottom: `var(--border-thin) solid var(--grey-light)` }}>
        <button
          onClick={onBack}
          className="transition-opacity small-caps"
          style={{
            background: 'transparent',
            opacity: 0.5,
            marginBottom: 'var(--space-md)',
            transition: 'opacity var(--transition)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
        >
          ‹ Retour
        </button>

        <h1 style={{ marginBottom: 'var(--space-xs)' }}>Les Quêtes Parisiennes</h1>
        <p 
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '17px',
            fontStyle: 'italic',
            fontWeight: '300',
            opacity: 0.6
          }}
        >
          Cartographie poétique de vos découvertes
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8" style={{ padding: 'var(--space-xl) var(--space-lg)' }}>
        
        {/* Left Panel - Voie Selector */}
        <div>
          <h3 style={{ marginBottom: 'var(--space-md)', fontSize: '19px' }}>Sélectionnez une Quête</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {voies.map((voie) => (
              <button
                key={voie.id}
                onClick={() => setSelectedVoie(voie.id)}
                style={{
                  background: selectedVoie === voie.id ? 'rgba(0, 61, 44, 0.08)' : 'transparent',
                  border: `var(--border-thin) solid ${selectedVoie === voie.id ? voie.color : 'var(--grey-light)'}`,
                  borderRadius: '2px',
                  padding: 'var(--space-md)',
                  textAlign: 'left',
                  transition: 'all var(--transition)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (selectedVoie !== voie.id) {
                    e.currentTarget.style.borderColor = voie.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedVoie !== voie.id) {
                    e.currentTarget.style.borderColor = 'var(--grey-light)';
                  }
                }}
              >
                {/* Color accent bar */}
                <div 
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '3px',
                    background: voie.color,
                    opacity: selectedVoie === voie.id ? 0.8 : 0.3,
                    transition: 'opacity var(--transition)'
                  }}
                />
                
                <div style={{ paddingLeft: 'var(--space-sm)' }}>
                  <p 
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '16px',
                      fontWeight: '400',
                      marginBottom: '4px',
                      color: selectedVoie === voie.id ? voie.color : 'var(--ink)'
                    }}
                  >
                    {voie.name}
                  </p>
                  <p 
                    style={{
                      fontSize: '12px',
                      opacity: 0.6,
                      lineHeight: '1.5',
                      marginBottom: voie.locations.length > 0 ? '8px' : '0'
                    }}
                  >
                    {voie.description}
                  </p>
                  
                  {/* Real locations */}
                  {voie.locations.length > 0 && (
                    <div style={{ marginTop: '8px' }}>
                      {voie.locations.map((location, idx) => (
                        <p 
                          key={idx}
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '11px',
                            color: 'var(--gold)',
                            lineHeight: '1.4',
                            marginBottom: '3px',
                            opacity: 0.8
                          }}
                        >
                          {location}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Map Display */}
        <div className="lg:col-span-2">
          <div 
            style={{
              background: 'white',
              border: `var(--border-medium) solid var(--grey-light)`,
              borderRadius: '2px',
              padding: 'var(--space-xl)',
              position: 'relative',
              boxShadow: 'var(--shadow-md)',
              aspectRatio: '3/2'
            }}
          >
            {/* Corner ornaments */}
            <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '24px', height: '24px', borderTop: '1.5px solid var(--ink)', borderLeft: '1.5px solid var(--ink)', opacity: 0.1 }} />
            <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '24px', height: '24px', borderTop: '1.5px solid var(--ink)', borderRight: '1.5px solid var(--ink)', opacity: 0.1 }} />
            <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '24px', height: '24px', borderBottom: '1.5px solid var(--ink)', borderLeft: '1.5px solid var(--ink)', opacity: 0.1 }} />
            <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '24px', height: '24px', borderBottom: '1.5px solid var(--ink)', borderRight: '1.5px solid var(--ink)', opacity: 0.1 }} />

            {/* Title & Locations */}
            <div style={{ marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
              <h2 style={{ fontSize: '24px', marginBottom: 'var(--space-sm)' }}>
                {voies.find(v => v.id === selectedVoie)?.name}
              </h2>
              
              {/* Display locations below title */}
              {selectedVoie !== 'all' && voies.find(v => v.id === selectedVoie)?.locations && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: 'var(--space-md)' }}>
                  {voies.find(v => v.id === selectedVoie)?.locations.map((location, idx) => (
                    <span 
                      key={idx}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '11px',
                        color: 'var(--gold)',
                        letterSpacing: '0.05em',
                        opacity: 0.7
                      }}
                    >
                      {location}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Pathways Overlay with symbolic traces */}
            <div style={{ width: '100%', flex: 1, position: 'relative', minHeight: '400px' }}>
              <PathwaysOverlay 
                activeVoie={selectedVoie} 
                opacity={0.7}
                showLabels={selectedVoie === 'all'}
              />
            </div>
            
            {/* Subtle horizontal line (replacing scale) */}
            {selectedVoie !== 'all' && (
              <div 
                style={{ 
                  marginTop: 'var(--space-md)',
                  borderTop: '0.5px solid var(--grey-light)',
                  paddingTop: 'var(--space-sm)'
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}