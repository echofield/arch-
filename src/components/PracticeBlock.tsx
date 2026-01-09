import { useState } from 'react';

interface PracticeBlockProps {
  onBack: () => void;
}

export function PracticeBlock({ onBack }: PracticeBlockProps) {
  const [practiceText, setPracticeText] = useState('');
  const [generatedActions, setGeneratedActions] = useState<string[]>([]);

  const handleGenerate = () => {
    const actions = [
      "Commencer par une promenade matinale dans le Marais",
      "S'arrêter à la boulangerie Poilâne pour un pain aux céréales",
      "Visiter la galerie Perrotin, rue de Turenne",
      "Déjeuner au Café Charlot, Place des Vosges",
      "Terminer par une visite à la Maison de Victor Hugo"
    ];
    setGeneratedActions(actions);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--parchment)' }}>
      {/* Header */}
      <div style={{ padding: 'var(--space-lg)', borderBottom: '0.5px solid var(--architectural-grey)' }}>
        <button
          onClick={onBack}
          className="transition-opacity"
          style={{
            color: 'var(--ink)',
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: '400',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background: 'transparent',
            transition: 'opacity var(--transition)',
            opacity: 0.5,
            marginBottom: 'var(--space-md)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.5';
          }}
        >
          ‹ Retour
        </button>

        <h1 
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '38px',
            fontWeight: '400',
            lineHeight: '1.2',
            letterSpacing: '0.03em',
            color: 'var(--ink)',
            marginBottom: 'var(--space-xs)'
          }}
        >
          Bloc de Pratique
        </h1>

        <p 
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '15px',
            fontStyle: 'italic',
            fontWeight: '300',
            lineHeight: '1.6',
            color: 'var(--ink)',
            opacity: 0.6
          }}
        >
          Ce que je veux laisser derrière moi...
        </p>
      </div>

      {/* Content - Journal Page */}
      <div style={{ padding: `var(--space-xl) var(--space-lg)`, maxWidth: '520px', margin: '0 auto' }}>
        {/* Lined Textarea */}
        <div style={{ 
          border: '0.5px solid var(--architectural-grey)',
          borderRadius: '1px',
          padding: 'var(--space-md)',
          marginBottom: 'var(--space-md)',
          position: 'relative'
        }}>
          <textarea
            value={practiceText}
            onChange={(e) => setPracticeText(e.target.value)}
            placeholder="Décrivez votre journée parisienne idéale..."
            rows={16}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              padding: '0',
              fontFamily: 'var(--font-serif)',
              fontSize: '16px',
              fontWeight: '300',
              lineHeight: '32px',
              color: 'var(--ink)',
              resize: 'none',
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, var(--architectural-grey) 31px, var(--architectural-grey) 32px)',
              backgroundSize: '100% 32px',
              backgroundPosition: '0 0'
            }}
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!practiceText.trim()}
          className="w-full transition-all"
          style={{
            background: practiceText.trim() ? 'var(--deep-green)' : 'var(--architectural-grey)',
            color: 'var(--parchment)',
            padding: '16px 32px',
            borderRadius: '1px',
            fontFamily: 'var(--font-serif)',
            fontSize: '14px',
            fontWeight: '400',
            letterSpacing: '0.06em',
            transition: 'all var(--transition)',
            opacity: practiceText.trim() ? '1' : '0.5',
            cursor: practiceText.trim() ? 'pointer' : 'not-allowed',
            boxShadow: practiceText.trim() ? 'inset 0 1px 2px rgba(0,0,0,0.1)' : 'none',
            marginBottom: 'var(--space-xl)'
          }}
          onMouseEnter={(e) => {
            if (practiceText.trim()) {
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (practiceText.trim()) {
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          Générer le Parcours
        </button>

        {/* Generated Actions */}
        {generatedActions.length > 0 && (
          <div 
            style={{
              background: 'rgba(216,210,197,0.12)',
              border: '0.5px dotted var(--architectural-grey)',
              borderRadius: '1px',
              padding: 'var(--space-md)'
            }}
          >
            <p 
              style={{
                fontSize: '10px',
                fontFamily: 'var(--font-sans)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--stone-gold)',
                marginBottom: 'var(--space-sm)',
                fontWeight: '400'
              }}
            >
              Votre Parcours
            </p>
            <ol style={{ paddingLeft: '24px', margin: 0 }}>
              {generatedActions.map((action, index) => (
                <li 
                  key={index}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '15px',
                    fontWeight: '300',
                    lineHeight: '1.8',
                    color: 'var(--ink)',
                    marginBottom: index < generatedActions.length - 1 ? '12px' : '0'
                  }}
                >
                  {action}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
