import { useState, useEffect } from 'react';
import { CardActivation } from './CardActivation';
import { CardLogin } from './CardLogin';

interface CardGateProps {
  cardCode: string;
  onAuthenticated: (cardData: { id: string; code: string; activated_at: string }) => void;
  onBack?: () => void;
}

type CardState = 'loading' | 'not_found' | 'needs_activation' | 'needs_login';

export function CardGate({ cardCode, onAuthenticated, onBack }: CardGateProps) {
  const [cardState, setCardState] = useState<CardState>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkCardStatus();
  }, [cardCode]);

  const checkCardStatus = async () => {
    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID || 'your-project'}.supabase.co/functions/v1/make-server-9060b10a/check-card`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || ''}`
          },
          body: JSON.stringify({ code: cardCode })
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Erreur lors de la vérification de la carte');
      }

      const { card } = data;

      if (!card.exists) {
        setCardState('not_found');
        setError('Code de carte invalide');
        return;
      }

      if (!card.is_activated) {
        setCardState('needs_activation');
      } else {
        setCardState('needs_login');
      }

    } catch (err: any) {
      console.error('[CardGate] Error checking card status:', err);
      setError(err.message || 'Erreur lors de la vérification de la carte');
      setCardState('not_found');
    }
  };

  // Loading state
  if (cardState === 'loading') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center" 
        style={{ background: '#FAF8F2' }}
      >
        <div style={{ textAlign: 'center' }}>
          <div 
            style={{
              width: '60px',
              height: '60px',
              border: '3px solid #E7E1D8',
              borderTop: '3px solid #003D2C',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto var(--space-lg)'
            }}
          />
          <p 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '16px',
              fontStyle: 'italic',
              color: '#1A1A1A',
              opacity: 0.6
            }}
          >
            Vérification de la carte...
          </p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Card not found
  if (cardState === 'not_found') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--paper)', padding: '0 var(--space-lg)' }}>
        <div style={{ maxWidth: '480px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: 'var(--space-md)', color: '#DC2626' }}>
            Carte introuvable
          </h2>
          <p style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '17px', 
            fontStyle: 'italic', 
            lineHeight: '1.7',
            marginBottom: 'var(--space-lg)',
            opacity: 0.8
          }}>
            Le code <strong>{cardCode}</strong> ne correspond à aucune carte ARCHÉ.
          </p>
          {error && (
            <p style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '15px', 
              color: '#DC2626',
              marginBottom: 'var(--space-lg)'
            }}>
              {error}
            </p>
          )}
          {onBack && (
            <button
              onClick={onBack}
              className="transition-all"
              style={{
                background: 'var(--green)',
                color: 'var(--paper)',
                padding: '16px 32px',
                borderRadius: '2px',
                fontFamily: 'var(--font-serif)',
                fontSize: '15px'
              }}
            >
              Retour
            </button>
          )}
        </div>
      </div>
    );
  }

  // Card needs activation
  if (cardState === 'needs_activation') {
    return (
      <CardActivation 
        cardCode={cardCode} 
        onActivated={onAuthenticated}
        onBack={onBack}
      />
    );
  }

  // Card needs login
  if (cardState === 'needs_login') {
    return (
      <CardLogin 
        cardCode={cardCode} 
        onLoggedIn={onAuthenticated}
        onBack={onBack}
      />
    );
  }

  return null;
}