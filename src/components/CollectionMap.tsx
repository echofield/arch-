import { useState, useEffect } from 'react';
import { MamlukGrid } from './MamlukGrid';
import { BackButton } from './BackButton';
import { SYMBOLS, getSymbolsByArrondissement, type Symbol } from '../data/symbols';
import { getCollectionStats, collectSymbol, isSymbolCollected } from '../utils/collection-service';

interface CollectionMapProps {
  onBack: () => void;
}

// Coordonnées approximatives des arrondissements pour le placement
const ARRONDISSEMENT_POSITIONS: Record<number, { x: number; y: number }> = {
  1: { x: 48, y: 45 },
  2: { x: 52, y: 38 },
  3: { x: 58, y: 42 },
  4: { x: 55, y: 50 },
  5: { x: 52, y: 58 },
  6: { x: 44, y: 55 },
  7: { x: 35, y: 52 },
  8: { x: 38, y: 35 },
  9: { x: 48, y: 32 },
  10: { x: 58, y: 30 },
  11: { x: 65, y: 45 },
  12: { x: 72, y: 58 },
  13: { x: 58, y: 70 },
  14: { x: 45, y: 72 },
  15: { x: 30, y: 65 },
  16: { x: 20, y: 45 },
  17: { x: 32, y: 25 },
  18: { x: 48, y: 18 },
  19: { x: 65, y: 20 },
  20: { x: 75, y: 35 }
};

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

  const getArrColor = (arr: number): string => {
    const arrStats = stats.byArrondissement[arr];
    if (arrStats.collected === 0) return 'rgba(0, 61, 44, 0.1)';
    if (arrStats.collected === arrStats.total) return 'rgba(0, 61, 44, 0.6)';
    return 'rgba(0, 61, 44, 0.3)';
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
              viewBox="0 0 100 100"
              style={{
                width: '100%',
                maxWidth: '500px',
                margin: '0 auto',
                display: 'block'
              }}
            >
              {/* Seine River - stylized */}
              <path
                d="M 5 55 Q 25 45, 45 50 Q 60 55, 75 48 Q 90 42, 100 45"
                fill="none"
                stroke="rgba(0, 61, 44, 0.15)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Arrondissements */}
              {Object.entries(ARRONDISSEMENT_POSITIONS).map(([arr, pos]) => {
                const arrNum = parseInt(arr);
                const arrStats = stats.byArrondissement[arrNum];
                const isSelected = selectedArr === arrNum;
                const hasSymbols = arrStats.total > 0;
                const isComplete = arrStats.collected === arrStats.total && arrStats.total > 0;

                return (
                  <g key={arr}>
                    {/* Arrondissement circle */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? 7 : 5.5}
                      fill={getArrColor(arrNum)}
                      stroke={isSelected ? '#003D2C' : 'rgba(0, 61, 44, 0.3)'}
                      strokeWidth={isSelected ? 2 : 1}
                      style={{
                        cursor: hasSymbols ? 'pointer' : 'default',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => hasSymbols && setSelectedArr(isSelected ? null : arrNum)}
                    />

                    {/* Arrondissement number */}
                    <text
                      x={pos.x}
                      y={pos.y + 0.8}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        fontSize: '3px',
                        fontFamily: 'var(--font-sans)',
                        fill: isComplete ? '#FAF8F2' : '#003D2C',
                        fontWeight: isSelected ? '600' : '400',
                        pointerEvents: 'none'
                      }}
                    >
                      {arr}
                    </text>

                    {/* Collection indicator */}
                    {arrStats.collected > 0 && (
                      <circle
                        cx={pos.x + 4}
                        cy={pos.y - 4}
                        r={2}
                        fill="#003D2C"
                      />
                    )}
                  </g>
                );
              })}

              {/* Title */}
              <text
                x="50"
                y="92"
                textAnchor="middle"
                style={{
                  fontSize: '4px',
                  fontFamily: 'var(--font-serif)',
                  fill: '#1A1A1A',
                  opacity: 0.4,
                  fontStyle: 'italic'
                }}
              >
                Clique sur un arrondissement
              </text>
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
