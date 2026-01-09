import { useState, useEffect } from 'react';
import { GeometricBackground } from './GeometricBackground';
import { MamlukGrid } from './MamlukGrid';
import { getCodexEntries, CodexEntry } from '../utils/supabase/client';

interface CodexProps {
  onBack: () => void;
  selectedExperiences: string[];
}

export function Codex({ onBack }: CodexProps) {
  const [entries, setEntries] = useState<CodexEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const data = await getCodexEntries();
      setEntries(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-16" style={{ background: 'var(--paper)', position: 'relative' }}>
      {/* Ghost Grid Mamluk - Pattern tessellation hexagonale */}
      <MamlukGrid pattern="tessellation" opacity={0.04} scale={1} rotation={30} layers={2} />
      
      {/* Geometric Background - Codex composition */}
      <GeometricBackground composition="codex" opacity={0.04} />
      
      {/* Header with Large Top Margin */}
      <div style={{ padding: 'var(--space-xxl) var(--space-lg) var(--space-lg)', borderBottom: `var(--border-thin) solid var(--grey-light)` }}>
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

        <h1 style={{ marginBottom: 'var(--space-xs)' }}>Codex</h1>
        <p 
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '17px',
            fontStyle: 'italic',
            fontWeight: '300',
            opacity: 0.6
          }}
        >
          Archive des événements attestés
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ padding: 'var(--space-xl) var(--space-lg)', textAlign: 'center' }}>
          <p style={{ opacity: 0.4, fontSize: '15px' }}>Chargement...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && entries.length === 0 && (
        <div style={{ padding: 'var(--space-xxl) var(--space-lg)', maxWidth: '680px', margin: '0 auto' }}>
          <div 
            style={{
              padding: 'var(--space-xl)',
              border: `var(--border-thin) solid var(--grey-light)`,
              borderRadius: '2px',
              background: 'rgba(232, 229, 222, 0.04)',
              textAlign: 'center'
            }}
          >
            <p 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '17px',
                fontStyle: 'italic',
                fontWeight: '300',
                opacity: 0.5,
                lineHeight: '1.7'
              }}
            >
              Aucune inscription pour le moment.
            </p>
          </div>
        </div>
      )}

      {/* Timeline with Entries */}
      {!loading && entries.length > 0 && (
        <div style={{ padding: `var(--space-xl) var(--space-lg)`, maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical Timeline Line */}
          <div 
            style={{
              position: 'absolute',
              left: 'calc(var(--space-lg) + 24px)',
              top: 'var(--space-xl)',
              bottom: 'var(--space-xl)',
              width: 'var(--border-thin)',
              background: 'var(--grey-light)'
            }}
          />

          {entries.map((entry, index) => {
            return (
              <article
                key={entry.id}
                style={{
                  marginBottom: index < entries.length - 1 ? 'var(--space-xxl)' : '0',
                  paddingLeft: '56px',
                  position: 'relative'
                }}
              >
                {/* Timeline Dot */}
                <div 
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '6px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'var(--green)',
                    border: '2px solid var(--paper)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                />

                {/* Date Display */}
                <div 
                  style={{
                    display: 'flex',
                    gap: 'var(--space-sm)',
                    alignItems: 'baseline',
                    marginBottom: 'var(--space-xs)'
                  }}
                >
                  <p 
                    style={{
                      fontSize: '13px',
                      fontWeight: '300',
                      color: 'var(--ink)',
                      opacity: 0.5
                    }}
                  >
                    {entry.date_display}
                  </p>
                </div>

                {/* Lieu */}
                <div 
                  style={{
                    marginBottom: 'var(--space-sm)'
                  }}
                >
                  <span className="small-caps" style={{ color: 'var(--gold)', opacity: 1 }}>
                    {entry.lieu}
                  </span>
                </div>

                {/* Trace (phrase générée) */}
                <p 
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '17px',
                    fontWeight: '300',
                    lineHeight: '1.7',
                    fontStyle: 'italic',
                    opacity: 0.85
                  }}
                >
                  {entry.trace}
                </p>
              </article>
            );
          })}
        </div>
      )}

      {/* Footer Note */}
      {!loading && entries.length > 0 && (
        <div style={{ padding: `var(--space-xl) var(--space-lg) 0`, maxWidth: '680px', margin: '0 auto' }}>
          <div 
            style={{
              padding: 'var(--space-md) 0',
              borderTop: `var(--border-thin) solid var(--grey-light)`,
              textAlign: 'center'
            }}
          >
            <p className="small-caps" style={{ opacity: 0.4 }}>
              Archive automatique — lecture seule
            </p>
          </div>
        </div>
      )}
    </div>
  );
}