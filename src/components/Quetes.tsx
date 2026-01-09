import { MamlukGrid } from './MamlukGrid';
import { useState } from 'react';

const QUETES = [
  {
    id: 'lutece',
    title: 'LUTÈCE — ORIGINE',
    registre: 'Fondation · Geste · Mesure',
    extrait: 'Avant les palais, avant les façades, Paris fut une solution. Un endroit où l\'eau accepte d\'être franchie.',
    duree: '≈ 1h30–2h',
    image: 'https://i.imgur.com/1uLhXia.jpeg'
  },
  {
    id: '1789',
    title: '1789 — DÉCISION',
    registre: 'Seuil · Révolution · Passage',
    extrait: 'Paris ne devient révolutionnaire que lorsqu\'il devient poreux. Un lieu où l\'on parle trop, où l\'on écoute trop.',
    duree: '≈ 2h–2h30',
    image: 'https://i.imgur.com/iyCcmoS.jpeg'
  },
  {
    id: 'table',
    title: 'VIN & TABLE — VIE PARISIENNE',
    registre: 'Nourriture · Corps · Ville vivante',
    extrait: 'Une ville se raconte par ce qu\'elle avale. Paris est une gorge : elle boit, elle stocke, elle taxe, elle revend.',
    duree: '≈ 2h30–3h',
    image: 'https://i.imgur.com/VtWPT2M.jpeg'
  }
];

interface QuetesProps {
  onBack: () => void;
  onViewDetail?: (questId: string) => void;
}

export function Quetes({ onBack, onViewDetail }: QuetesProps) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  return (
    <div 
      className="min-h-screen relative"
      style={{ 
        background: '#FCF9F4',
        overflow: 'hidden'
      }}
    >
      {/* Ghost Grid Mamluk - Pattern interlace subtil */}
      <MamlukGrid pattern="interlace" opacity={0.018} scale={1.2} rotation={15} layers={2} />
      
      {/* Faint blueprint geometry background */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          opacity: 0.04,
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          {/* Radiating arcs */}
          <g stroke="#A5B5AF" fill="none" strokeWidth="0.5">
            {[250, 450, 650, 850].map((r, i) => (
              <circle key={i} cx="50%" cy="50%" r={r} opacity={0.5} />
            ))}
          </g>
          
          {/* Diamond markers */}
          <g stroke="#A5B5AF" fill="none" strokeWidth="0.5" opacity="0.6">
            {[
              { cx: 180, cy: 180 },
              { cx: 580, cy: 250 },
              { cx: 980, cy: 350 },
              { cx: 380, cy: 550 },
              { cx: 780, cy: 120 },
              { cx: 280, cy: 420 }
            ].map((pos, i) => (
              <path 
                key={i}
                d={`M ${pos.cx} ${pos.cy - 25} L ${pos.cx + 25} ${pos.cy} L ${pos.cx} ${pos.cy + 25} L ${pos.cx - 25} ${pos.cy} Z`}
              />
            ))}
          </g>
          
          {/* Vertical grid lines */}
          <g stroke="#E7E1D8" strokeWidth="0.5" opacity="0.5">
            <line x1="20%" y1="0" x2="20%" y2="100%" />
            <line x1="40%" y1="0" x2="40%" y2="100%" />
            <line x1="60%" y1="0" x2="60%" y2="100%" />
            <line x1="80%" y1="0" x2="80%" y2="100%" />
          </g>
        </svg>
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="transition-opacity small-caps"
        style={{
          position: 'fixed',
          top: 'var(--space-lg)',
          left: 'var(--space-lg)',
          background: 'transparent',
          opacity: 0.5,
          transition: 'opacity var(--transition)',
          zIndex: 100,
          fontSize: '11px',
          letterSpacing: '0.08em',
          color: '#013220'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
      >
        ‹ Retour
      </button>

      {/* Main content */}
      <div 
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'var(--space-xxl) var(--space-xl)',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* PAGE HEADER */}
        <header 
          style={{
            textAlign: 'center',
            marginBottom: 'var(--space-xxl)',
            paddingBottom: 'var(--space-lg)'
          }}
        >
          <h1 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '72px',
              fontWeight: '600',
              letterSpacing: '-0.02em',
              color: '#1A1A1A',
              marginBottom: 'var(--space-md)',
              lineHeight: '1.1'
            }}
          >
            Trois manières de traverser Paris
          </h1>
          
          <p 
            className="small-caps"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: '#1A1A1A',
              opacity: 0.5,
              marginBottom: 'var(--space-lg)'
            }}
          >
            Choisissez une porte
          </p>
          
          <div 
            style={{
              width: '180px',
              height: '1px',
              background: '#A5B5AF',
              margin: '0 auto',
              opacity: 0.5
            }}
          />
        </header>

        {/* QUEST CARDS GRID - Desktop — 3 CARTES MONUMENTALES */}
        <div 
          className="quetes-grid-desktop"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-xl)',
            marginBottom: 'var(--space-xxl)',
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          {QUETES.map((quest, index) => (
            <div key={quest.id}>
              <button
                onClick={() => {
                  if (onViewDetail) onViewDetail(quest.id);
                }}
                style={{
                  width: '100%',
                  background: '#FFFFFF',
                  border: '1px solid #E7E1D8',
                  padding: '0',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all var(--transition)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#003D2C';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 61, 44, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E7E1D8';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Image hero */}
                <div 
                  style={{
                    aspectRatio: '3 / 4',
                    width: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#E7E1D8'
                  }}
                >
                  <img 
                    src={quest.image}
                    alt={quest.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform var(--transition)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                  
                  {/* Overlay gradient subtil */}
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 60%)',
                      pointerEvents: 'none'
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: 'var(--space-xl)' }}>
                  {/* Quest name */}
                  <h3 
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#1A1A1A',
                      marginBottom: 'var(--space-xs)',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {quest.title}
                  </h3>

                  {/* Trait line */}
                  <p 
                    className="small-caps"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '9px',
                      letterSpacing: '0.12em',
                      color: '#003D2C',
                      marginBottom: 'var(--space-sm)',
                      opacity: 0.6
                    }}
                  >
                    {quest.registre}
                  </p>

                  {/* Description */}
                  <p 
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: '#1A1A1A',
                      fontWeight: '300',
                      marginBottom: 'var(--space-md)'
                    }}
                  >
                    {quest.extrait}
                  </p>

                  {/* Durée */}
                  <p 
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      letterSpacing: '0.05em',
                      color: '#A38767',
                      opacity: 0.8
                    }}
                  >
                    {quest.duree}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* QUEST CARDS - Mobile Accordion */}
        <div className="quetes-accordion-mobile">
          {QUETES.map((quest, index) => (
            <div 
              key={quest.id}
              style={{
                borderBottom: '1px solid #E7E1D8',
                marginBottom: 'var(--space-md)'
              }}
            >
              <button
                onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'transparent',
                  padding: 'var(--space-md) 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: '600', color: '#1A1A1A', marginBottom: '4px' }}>
                    {quest.title}
                  </h3>
                  <p className="small-caps" style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.1em', color: '#013220', opacity: 0.6 }}>
                    {quest.registre}
                  </p>
                </div>
                <span style={{ fontSize: '24px', transition: 'transform var(--transition)', transform: activeAccordion === index ? 'rotate(90deg)' : 'rotate(0)', color: '#013220' }}>
                  ›
                </span>
              </button>
              
              {activeAccordion === index && (
                <div style={{ padding: '0 0 var(--space-lg)' }}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: '1.6', color: '#1A1A1A', marginBottom: 'var(--space-md)' }}>
                    {quest.extrait}
                  </p>
                  <button
                    onClick={() => {
                      if (onViewDetail) onViewDetail(quest.id);
                    }}
                    style={{
                      background: '#013220',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      letterSpacing: '0.08em',
                      cursor: 'pointer'
                    }}
                  >
                    Découvrir cette quête
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <footer 
          style={{
            textAlign: 'center',
            paddingTop: 'var(--space-xxl)',
            borderTop: '1px solid #E7E1D8',
            marginTop: 'var(--space-xxl)',
            position: 'relative'
          }}
        >
          <p 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '16px',
              fontStyle: 'italic',
              color: '#1A1A1A',
              opacity: 0.6,
              marginBottom: 'var(--space-md)'
            }}
          >
            Choisir une Quête, c'est choisir une manière de voir.
          </p>
          
          <div 
            style={{
              position: 'absolute',
              bottom: 'var(--space-md)',
              right: 0,
              fontFamily: 'var(--font-serif)',
              fontSize: '20px',
              color: '#1A1A1A',
              opacity: 0.2
            }}
          >
            PS
          </div>
        </footer>
      </div>



      {/* Styles */}
      <style>{`
        .quetes-grid-desktop {
          display: grid;
        }
        
        .quetes-accordion-mobile {
          display: none;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @media (max-width: 1024px) {
          .quetes-grid-desktop {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 768px) {
          .quetes-grid-desktop {
            display: none !important;
          }
          
          .quetes-accordion-mobile {
            display: block !important;
          }
          
          h1 {
            font-size: 48px !important;
          }
        }
      `}</style>
    </div>
  );
}