import { ArchitecturalIllustration } from './ArchitecturalIllustration';
import { GeometricBackground } from './GeometricBackground';
import { MamlukGrid } from './MamlukGrid';

interface LandingProps {
  onStart: () => void;
  onViewCards: () => void;
  onViewPathways?: () => void;
  onViewHistoireQuotidienne?: () => void;
}

export function Landing({ onStart, onViewCards, onViewPathways, onViewHistoireQuotidienne }: LandingProps) {
  return (
    <div className="min-h-screen px-12" style={{ background: 'var(--paper)', position: 'relative', paddingTop: '120px' }}>
      {/* Ghost Grid Mamluk - Pattern étoile 8 branches */}
      <MamlukGrid pattern="star8" opacity={0.025} scale={1.2} rotation={0} layers={2} />
      
      {/* Geometric Background - Homepage composition */}
      <GeometricBackground composition="homepage" opacity={0.04} />
      
      {/* Haussmann Facade */}
      <div 
        style={{
          position: 'absolute',
          top: '64px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        <ArchitecturalIllustration size="large" opacity={0.12} />
      </div>

      <div className="max-w-[480px] mx-auto relative z-10" style={{ height: '600px' }}>
        {/* Fine Border Frame */}
        <div 
          style={{
            position: 'absolute',
            inset: '-40px',
            border: 'var(--border-thin) solid var(--grey-light)',
            borderRadius: '2px',
            pointerEvents: 'none',
            opacity: 0.5
          }}
        />

        {/* Fixed-height vertical stack */}
        <div style={{ textAlign: 'center' }}>
          {/* Title */}
          <h1 
            style={{
              marginBottom: 'var(--space-sm)'
            }}
          >
            Le Grand Hôtel
          </h1>

          {/* Subtitle */}
          <p 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '19px',
              fontStyle: 'italic',
              fontWeight: '300',
              color: 'var(--ink)',
              lineHeight: '1.5',
              opacity: 0.6,
              marginBottom: 'var(--space-xl)'
            }}
          >
            Votre Paris commence ici.
          </p>

          {/* Decorative Divider */}
          <div 
            style={{
              width: '60px',
              height: 'var(--border-thin)',
              background: 'var(--gold)',
              margin: '0 auto var(--space-lg)',
              opacity: 0.4
            }}
          />

          {/* Primary CTA */}
          <button
            onClick={onStart}
            className="w-full transition-all"
            style={{
              background: 'var(--green)',
              color: 'var(--paper)',
              padding: '20px 40px',
              borderRadius: '2px',
              fontFamily: 'var(--font-serif)',
              fontSize: '16px',
              fontWeight: '400',
              letterSpacing: '0.02em',
              transition: 'all var(--transition)',
              marginBottom: 'var(--space-md)',
              boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.1), var(--shadow-sm)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'inset 0 -1px 0 rgba(0,0,0,0.1), var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'inset 0 -1px 0 rgba(0,0,0,0.1), var(--shadow-sm)';
            }}
          >
            Découvrir Mon Paris
          </button>

          {/* Edition Label - Third text layer below CTA */}
          <p 
            className="small-caps"
            style={{
              marginBottom: 'var(--space-xl)'
            }}
          >
            Petit Souvenir – Édition Hôtel
          </p>

          {/* Secondary Actions */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={onViewCards}
              className="flex-1 transition-all"
              style={{
                background: 'transparent',
                color: 'var(--ink)',
                padding: '16px 24px',
                borderRadius: '2px',
                border: `var(--border-thin) solid var(--grey-light)`,
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'all var(--transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--ink)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--grey-light)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Cartes
            </button>
            <button
              onClick={onViewPathways}
              className="flex-1 transition-all"
              style={{
                background: 'transparent',
                color: 'var(--ink)',
                padding: '16px 24px',
                borderRadius: '2px',
                border: `var(--border-thin) solid var(--grey-light)`,
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'all var(--transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--ink)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--grey-light)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Quêtes
            </button>
            <button
              onClick={onViewHistoireQuotidienne}
              className="flex-1 transition-all"
              style={{
                background: 'transparent',
                color: 'var(--ink)',
                padding: '16px 24px',
                borderRadius: '2px',
                border: `var(--border-thin) solid var(--grey-light)`,
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'all var(--transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--ink)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--grey-light)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Histoire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}