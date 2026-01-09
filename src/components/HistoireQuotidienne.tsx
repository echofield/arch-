import { useEffect } from 'react';
import { GeometricBackground } from './GeometricBackground';
import { getAnecdoteDuJour } from '../data/histoire-quotidienne';
import { trackHistoryRead } from '../utils/supabase/client';

interface HistoireQuotidienneProps {
  onBack: () => void;
}

export function HistoireQuotidienne({ onBack }: HistoireQuotidienneProps) {
  const anecdote = getAnecdoteDuJour();
  
  // Tracker discrètement la lecture de cette anecdote
  useEffect(() => {
    if (anecdote) {
      trackHistoryRead(anecdote.dateKey);
    }
  }, [anecdote]);
  
  // Fallback si pas d'anecdote pour aujourd'hui
  if (!anecdote) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--paper)' }}>
        <div style={{ textAlign: 'center', maxWidth: '460px', padding: 'var(--space-lg)' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', opacity: 0.6 }}>
            Aujourd'hui, Paris se repose. Aucune anecdote n'a été collectée pour ce jour.
          </p>
          <button
            onClick={onBack}
            className="small-caps"
            style={{
              marginTop: 'var(--space-lg)',
              background: 'transparent',
              opacity: 0.5
            }}
          >
            ‹ Retour
          </button>
        </div>
      </div>
    );
  }

  const today = new Date();
  const jourActuel = today.getDate();
  const moisActuel = today.toLocaleDateString('fr-FR', { month: 'long' });

  return (
    <div 
      className="min-h-screen" 
      style={{ 
        background: 'var(--paper)', 
        position: 'relative',
        padding: '0 var(--space-lg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Geometric Background - very subtle */}
      <GeometricBackground composition="codex" opacity={0.02} />
      
      {/* Back button - très discret */}
      <button
        onClick={onBack}
        className="transition-opacity small-caps"
        style={{
          position: 'fixed',
          top: 'var(--space-lg)',
          left: 'var(--space-lg)',
          background: 'transparent',
          opacity: 0.3,
          transition: 'opacity var(--transition)',
          zIndex: 100
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.3'}
      >
        ‹ Retour
      </button>

      {/* Main Content Container */}
      <div 
        style={{
          maxWidth: '580px',
          width: '100%',
          paddingTop: 'calc(var(--space-xxl) * 2)',
          paddingBottom: 'var(--space-xxl)'
        }}
      >
        {/* Header - Date du jour */}
        <div 
          style={{
            marginBottom: 'var(--space-xl)',
            textAlign: 'center',
            borderBottom: `var(--border-thin) solid var(--grey-light)`,
            paddingBottom: 'var(--space-lg)'
          }}
        >
          <p 
            className="small-caps"
            style={{
              fontSize: '11px',
              letterSpacing: '0.12em',
              opacity: 0.4,
              marginBottom: 'var(--space-xs)'
            }}
          >
            Histoire — Journal de Paris
          </p>
          
          <h1 
            style={{
              fontSize: '32px',
              marginBottom: 'var(--space-xs)',
              fontWeight: '300'
            }}
          >
            {jourActuel} {moisActuel}
          </h1>
          
          <p 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '15px',
              fontStyle: 'italic',
              opacity: 0.5,
              fontWeight: '300'
            }}
          >
            Paris, {anecdote.annee}
          </p>
        </div>

        {/* Anecdote Principale */}
        <article 
          style={{
            marginBottom: 'var(--space-xxl)'
          }}
        >
          {anecdote.titre && (
            <h2 
              style={{
                fontSize: '21px',
                marginBottom: 'var(--space-md)',
                fontWeight: '400'
              }}
            >
              {anecdote.titre}
            </h2>
          )}
          
          <div 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '17px',
              lineHeight: '1.8',
              fontWeight: '300',
              opacity: 0.85,
              whiteSpace: 'pre-line'
            }}
          >
            {anecdote.texte}
          </div>
        </article>

        {/* Lieu - très discret en bas */}
        <div 
          style={{
            borderTop: `var(--border-thin) solid var(--grey-light)`,
            paddingTop: 'var(--space-md)',
            textAlign: 'center'
          }}
        >
          <p 
            className="small-caps"
            style={{
              fontSize: '11px',
              opacity: 0.5,
              letterSpacing: '0.08em'
            }}
          >
            {anecdote.lieu}
            {anecdote.arrondissement && ` — ${anecdote.arrondissement}`}
          </p>
        </div>

        {/* Note philosophique */}
        <div 
          style={{
            marginTop: 'var(--space-xl)',
            textAlign: 'center',
            opacity: 0.3
          }}
        >
          <p 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '13px',
              fontStyle: 'italic',
              fontWeight: '300'
            }}
          >
            Chaque jour, Paris se souvient.
          </p>
        </div>
      </div>
    </div>
  );
}