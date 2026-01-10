import { useState } from 'react';
import { MamlukGrid } from './MamlukGrid';
import { BackButton } from './BackButton';
import { SYMBOLS, getSymbolsByArrondissement, type Symbol } from '../data/symbols';
import { getCollectionStats, collectSymbol, isSymbolCollected } from '../utils/collection-service';

interface CollectionMapProps {
  onBack: () => void;
}

// SVG Paths for Paris arrondissements (escargot pattern from center)
const ARRONDISSEMENT_PATHS: { arr: number; path: string; labelX: number; labelY: number }[] = [
  // 1er - Louvre (centre)
  { arr: 1, path: "M360,280 L390,275 L395,300 L385,320 L360,315 Z", labelX: 375, labelY: 300 },
  // 2e - Bourse (nord du 1er)
  { arr: 2, path: "M390,275 L420,270 L425,295 L395,300 Z", labelX: 407, labelY: 285 },
  // 3e - Temple (est du 2e)
  { arr: 3, path: "M420,270 L460,280 L455,310 L425,295 Z", labelX: 440, labelY: 290 },
  // 4e - Hôtel-de-Ville (sud du 3e)
  { arr: 4, path: "M395,300 L425,295 L455,310 L450,340 L410,350 L385,320 Z", labelX: 420, labelY: 320 },
  // 5e - Panthéon (sud du 4e)
  { arr: 5, path: "M385,320 L410,350 L420,390 L380,400 L350,370 L360,315 Z", labelX: 385, labelY: 360 },
  // 6e - Luxembourg (ouest du 5e)
  { arr: 6, path: "M310,340 L360,315 L350,370 L380,400 L340,420 L290,380 Z", labelX: 335, labelY: 370 },
  // 7e - Palais-Bourbon (ouest du 6e)
  { arr: 7, path: "M220,310 L310,340 L290,380 L340,420 L280,450 L200,400 L180,340 Z", labelX: 260, labelY: 375 },
  // 8e - Élysée (nord du 7e)
  { arr: 8, path: "M250,220 L330,240 L360,280 L310,340 L220,310 L180,340 L170,280 L200,230 Z", labelX: 270, labelY: 280 },
  // 9e - Opéra (est du 8e)
  { arr: 9, path: "M330,240 L380,230 L390,275 L360,280 Z", labelX: 365, labelY: 255 },
  // 10e - Enclos-St-Laurent (est du 9e)
  { arr: 10, path: "M380,230 L460,210 L480,250 L460,280 L420,270 L390,275 Z", labelX: 430, labelY: 250 },
  // 11e - Popincourt (sud-est du 10e)
  { arr: 11, path: "M460,280 L520,270 L540,330 L500,370 L450,340 L455,310 Z", labelX: 495, labelY: 320 },
  // 12e - Reuilly (sud du 11e)
  { arr: 12, path: "M450,340 L500,370 L540,330 L600,380 L580,480 L480,450 L420,390 L410,350 Z", labelX: 510, labelY: 410 },
  // 13e - Gobelins (sud-ouest du 12e)
  { arr: 13, path: "M380,400 L420,390 L480,450 L500,520 L400,540 L350,480 Z", labelX: 420, labelY: 475 },
  // 14e - Observatoire (ouest du 13e)
  { arr: 14, path: "M280,450 L340,420 L380,400 L350,480 L400,540 L320,560 L250,500 Z", labelX: 330, labelY: 490 },
  // 15e - Vaugirard (nord-ouest du 14e)
  { arr: 15, path: "M120,380 L200,400 L280,450 L250,500 L320,560 L200,570 L100,500 Z", labelX: 200, labelY: 480 },
  // 16e - Passy (nord du 15e)
  { arr: 16, path: "M80,240 L170,280 L180,340 L120,380 L100,500 L60,420 L40,320 Z", labelX: 110, labelY: 360 },
  // 17e - Batignolles-Monceau (nord-est du 16e)
  { arr: 17, path: "M170,120 L280,140 L330,180 L330,240 L250,220 L200,230 L170,280 L80,240 L100,160 Z", labelX: 200, labelY: 195 },
  // 18e - Butte-Montmartre (est du 17e)
  { arr: 18, path: "M280,140 L380,120 L430,150 L460,210 L380,230 L330,240 L330,180 Z", labelX: 375, labelY: 180 },
  // 19e - Buttes-Chaumont (est du 18e)
  { arr: 19, path: "M430,150 L540,140 L600,200 L560,250 L520,270 L460,280 L480,250 L460,210 Z", labelX: 515, labelY: 210 },
  // 20e - Ménilmontant (sud du 19e)
  { arr: 20, path: "M520,270 L560,250 L600,200 L640,280 L600,380 L540,330 Z", labelX: 575, labelY: 300 }
];

export function CollectionMap({ onBack }: CollectionMapProps) {
  const [selectedArr, setSelectedArr] = useState<number | null>(null);
  const [stats, setStats] = useState(getCollectionStats(SYMBOLS));
  const [showSymbolDetail, setShowSymbolDetail] = useState<Symbol | null>(null);

  // Refresh stats when collecting
  const refreshStats = () => {
    setStats(getCollectionStats(SYMBOLS));
  };

  const handleCollect = (symbolId: string) => {
    collectSymbol(symbolId);
    refreshStats();
    setShowSymbolDetail(null);
  };

  const symbols = selectedArr ? getSymbolsByArrondissement(selectedArr) : [];

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: '#FAF8F2',
        overflow: 'hidden'
      }}
    >
      <MamlukGrid pattern="star8" opacity={0.02} scale={1.5} rotation={0} layers={2} />
      <BackButton onClick={onBack} />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(24px, 4vw, 48px)',
          paddingTop: 'clamp(80px, 10vh, 100px)',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: '400',
              color: '#1A1A1A',
              marginBottom: '8px',
              letterSpacing: '-0.02em'
            }}
          >
            Ma Carte de Paris
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '16px',
              fontStyle: 'italic',
              color: '#1A1A1A',
              opacity: 0.6
            }}
          >
            {stats.collected} / {stats.total} symboles collectés
          </p>
        </header>

        {/* Map Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: selectedArr ? '1fr 1fr' : '1fr',
            gap: '32px',
            alignItems: 'start'
          }}
        >
          {/* SVG Map */}
          <div
            style={{
              background: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(0, 61, 44, 0.1)',
              padding: '24px',
              position: 'relative'
            }}
          >
            <svg
              viewBox="0 0 800 600"
              style={{
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto',
                display: 'block'
              }}
            >
              {/* Paris Arrondissements Map */}
              {ARRONDISSEMENT_PATHS.map(({ arr, path, labelX, labelY }) => {
                const arrStats = stats.byArrondissement[arr];
                const isSelected = selectedArr === arr;
                const hasSymbols = arrStats.total > 0;
                const isComplete = arrStats.collected === arrStats.total && arrStats.total > 0;
                const hasProgress = arrStats.collected > 0 && !isComplete;

                return (
                  <g key={arr}>
                    <path
                      d={path}
                      fill={
                        isComplete ? 'rgba(0, 61, 44, 0.25)' :
                        hasProgress ? 'rgba(0, 61, 44, 0.12)' :
                        'transparent'
                      }
                      stroke={isSelected ? '#003D2C' : 'rgba(0, 61, 44, 0.4)'}
                      strokeWidth={isSelected ? 2 : 0.8}
                      style={{
                        cursor: hasSymbols ? 'pointer' : 'default',
                        transition: 'all 0.3s ease',
                        opacity: isSelected ? 1 : 0.7
                      }}
                      onClick={() => hasSymbols && setSelectedArr(isSelected ? null : arr)}
                      onMouseEnter={(e) => {
                        if (hasSymbols) {
                          e.currentTarget.style.opacity = '1';
                          e.currentTarget.style.strokeWidth = '1.5';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.opacity = '0.7';
                          e.currentTarget.style.strokeWidth = '0.8';
                        }
                      }}
                    />
                    <text
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-sans)',
                        fill: isComplete ? '#003D2C' : 'rgba(0, 61, 44, 0.5)',
                        fontWeight: isSelected ? '600' : '300',
                        pointerEvents: 'none'
                      }}
                    >
                      {arr}
                    </text>
                    {/* Collection dot indicator */}
                    {arrStats.collected > 0 && (
                      <circle
                        cx={labelX + 12}
                        cy={labelY - 8}
                        r={4}
                        fill="#003D2C"
                        style={{ pointerEvents: 'none' }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '24px',
                marginTop: '16px',
                fontSize: '11px',
                fontFamily: 'var(--font-sans)',
                color: '#1A1A1A',
                opacity: 0.6
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'rgba(0, 61, 44, 0.1)',
                    border: '1px solid rgba(0, 61, 44, 0.3)'
                  }}
                />
                À découvrir
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'rgba(0, 61, 44, 0.3)',
                    border: '1px solid rgba(0, 61, 44, 0.3)'
                  }}
                />
                En cours
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'rgba(0, 61, 44, 0.6)',
                    border: '1px solid rgba(0, 61, 44, 0.3)'
                  }}
                />
                Complété
              </span>
            </div>
          </div>

          {/* Symbol List Panel */}
          {selectedArr && (
            <div
              style={{
                background: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(0, 61, 44, 0.1)',
                padding: '24px'
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#1A1A1A',
                  marginBottom: '8px'
                }}
              >
                {selectedArr}
                <sup style={{ fontSize: '12px', marginLeft: '2px' }}>e</sup> Arrondissement
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  color: '#003D2C',
                  opacity: 0.6,
                  marginBottom: '24px',
                  letterSpacing: '0.05em'
                }}
              >
                {stats.byArrondissement[selectedArr].collected} / {stats.byArrondissement[selectedArr].total} symboles
              </p>

              {/* Symbol List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {symbols.map(symbol => {
                  const collected = isSymbolCollected(symbol.id);
                  return (
                    <div
                      key={symbol.id}
                      style={{
                        padding: '16px',
                        background: collected ? 'rgba(0, 61, 44, 0.05)' : 'transparent',
                        border: `1px solid ${collected ? 'rgba(0, 61, 44, 0.2)' : 'rgba(0, 61, 44, 0.1)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => setShowSymbolDetail(symbol)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: collected ? '#003D2C' : 'transparent',
                            border: '2px solid #003D2C',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FAF8F2',
                            fontSize: '12px'
                          }}
                        >
                          {collected ? '◆' : ''}
                        </span>
                        <div style={{ flex: 1 }}>
                          <h3
                            style={{
                              fontFamily: 'var(--font-serif)',
                              fontSize: '16px',
                              fontWeight: '600',
                              color: '#1A1A1A',
                              marginBottom: '4px'
                            }}
                          >
                            {symbol.name}
                          </h3>
                          <p
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '11px',
                              color: '#003D2C',
                              opacity: 0.5,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em'
                            }}
                          >
                            {symbol.type} · {symbol.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Symbol Detail Modal */}
        {showSymbolDetail && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '24px'
            }}
            onClick={() => setShowSymbolDetail(null)}
          >
            <div
              style={{
                background: '#FAF8F2',
                maxWidth: '500px',
                width: '100%',
                padding: '32px',
                border: '1px solid rgba(0, 61, 44, 0.2)'
              }}
              onClick={e => e.stopPropagation()}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '28px',
                  fontWeight: '600',
                  color: '#1A1A1A',
                  marginBottom: '8px'
                }}
              >
                {showSymbolDetail.name}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  color: '#003D2C',
                  opacity: 0.6,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '24px'
                }}
              >
                {showSymbolDetail.type} · {showSymbolDetail.arrondissement}e arr.
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '18px',
                  fontStyle: 'italic',
                  color: '#1A1A1A',
                  lineHeight: '1.6',
                  marginBottom: '24px',
                  padding: '16px',
                  background: 'rgba(0, 61, 44, 0.03)',
                  borderLeft: '3px solid rgba(0, 61, 44, 0.2)'
                }}
              >
                "{showSymbolDetail.hint}"
              </p>

              {showSymbolDetail.agent && (
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    color: '#003D2C',
                    marginBottom: '24px'
                  }}
                >
                  Gardien: <strong>{showSymbolDetail.agent}</strong>
                </p>
              )}

              <div style={{ display: 'flex', gap: '12px' }}>
                {!isSymbolCollected(showSymbolDetail.id) ? (
                  <button
                    onClick={() => handleCollect(showSymbolDetail.id)}
                    style={{
                      flex: 1,
                      background: '#003D2C',
                      color: '#FAF8F2',
                      border: 'none',
                      padding: '14px 24px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer'
                    }}
                  >
                    Je l'ai trouvé
                  </button>
                ) : (
                  <div
                    style={{
                      flex: 1,
                      background: 'rgba(0, 61, 44, 0.1)',
                      color: '#003D2C',
                      padding: '14px 24px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      textAlign: 'center'
                    }}
                  >
                    ◆ Dans ta collection
                  </div>
                )}
                <button
                  onClick={() => setShowSymbolDetail(null)}
                  style={{
                    background: 'transparent',
                    color: '#1A1A1A',
                    border: '1px solid rgba(0, 61, 44, 0.2)',
                    padding: '14px 24px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer
          style={{
            textAlign: 'center',
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(0, 61, 44, 0.1)'
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '14px',
              fontStyle: 'italic',
              color: '#1A1A1A',
              opacity: 0.5
            }}
          >
            Chaque symbole trouvé allume un neurone dans le cerveau de Paris.
          </p>
        </footer>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .collection-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
