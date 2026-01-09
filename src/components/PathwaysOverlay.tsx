interface PathwaysOverlayProps {
  activeVoie?: 'flaneur' | 'caviste' | 'jardins' | 'ateliers' | 'all';
  opacity?: number;
  showLabels?: boolean;
}

export function PathwaysOverlay({ 
  activeVoie = 'all', 
  opacity = 0.5,
  showLabels = false 
}: PathwaysOverlayProps) {
  
  const quetes = {
    flaneur: {
      color: '#1A1A1A',
      name: 'Quête du Flâneur',
      description: 'Promenade & découverte'
    },
    caviste: {
      color: '#003D2C',
      name: 'Quête du Caviste',
      description: 'Gastronomie & vins'
    },
    jardins: {
      color: '#A38767',
      name: 'Quête des Jardins',
      description: 'Nature & silence'
    },
    ateliers: {
      color: '#8B4513',
      name: 'Quête des Ateliers',
      description: 'Art & création'
    }
  };

  const shouldShowQuete = (quete: string) => activeVoie === 'all' || activeVoie === quete;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1000 667" 
        style={{ 
          position: 'absolute', 
          inset: 0,
          pointerEvents: 'none'
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* QUÊTE DU FLÂNEUR - Winding, poetic wandering */}
        {shouldShowQuete('flaneur') && (
          <g opacity={opacity}>
            {/* Main pathway - organic meander from Luxembourg to Place Dauphine */}
            <path
              d="M 150 580 
                 Q 200 540, 250 520 
                 T 350 480 
                 Q 400 460, 450 470 
                 T 550 480 
                 Q 620 470, 680 450 
                 T 800 420"
              stroke="#D1CEC8"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 8"
              opacity="0.8"
            />
            
            {/* Points - étapes (steps) */}
            <circle cx="150" cy="580" r="4" fill="#1A1A1A" opacity="0.6" />
            <circle cx="350" cy="480" r="4" fill="#1A1A1A" opacity="0.6" />
            <circle cx="550" cy="480" r="4" fill="#1A1A1A" opacity="0.6" />
            <circle cx="800" cy="420" r="4" fill="#1A1A1A" opacity="0.6" />
            
            {/* Mini-circles - pauses symboliques */}
            <circle cx="250" cy="520" r="8" fill="none" stroke="#A38767" strokeWidth="0.5" opacity="0.4" />
            <circle cx="450" cy="470" r="8" fill="none" stroke="#A38767" strokeWidth="0.5" opacity="0.4" />
            <circle cx="680" cy="450" r="8" fill="none" stroke="#A38767" strokeWidth="0.5" opacity="0.4" />
            
            {/* Secondary meander - detour poétique */}
            <path
              d="M 450 470 Q 460 510, 490 520"
              stroke="#D1CEC8"
              strokeWidth="1"
              fill="none"
              strokeDasharray="2 6"
              opacity="0.5"
            />
          </g>
        )}

        {/* QUÊTE DU CAVISTE - Purposeful gastronomic route */}
        {shouldShowQuete('caviste') && (
          <g opacity={opacity}>
            {/* Main pathway - deliberate route through markets and caves */}
            <path
              d="M 200 180 
                 L 320 200 
                 Q 380 210, 440 205 
                 L 560 195 
                 Q 640 190, 720 185 
                 L 850 180"
              stroke="#D1CEC8"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="5 8"
              opacity="0.8"
            />
            
            {/* Points - étapes (gastronomic stops) */}
            <circle cx="200" cy="180" r="5" fill="#003D2C" opacity="0.7" />
            <circle cx="320" cy="200" r="5" fill="#003D2C" opacity="0.7" />
            <circle cx="560" cy="195" r="5" fill="#003D2C" opacity="0.7" />
            <circle cx="850" cy="180" r="5" fill="#003D2C" opacity="0.7" />
            
            {/* Mini-circles - pauses symboliques (wine tasting) */}
            <circle cx="440" cy="205" r="10" fill="none" stroke="#A38767" strokeWidth="0.5" opacity="0.5" />
            <circle cx="720" cy="185" r="10" fill="none" stroke="#A38767" strokeWidth="0.5" opacity="0.5" />
            
            {/* Accent circles - terroir */}
            <circle cx="320" cy="200" r="15" fill="none" stroke="#003D2C" strokeWidth="0.3" opacity="0.3" />
            <circle cx="560" cy="195" r="15" fill="none" stroke="#003D2C" strokeWidth="0.3" opacity="0.3" />
          </g>
        )}

        {/* QUÊTE DES JARDINS - Organic, circular paths */}
        {shouldShowQuete('jardins') && (
          <g opacity={opacity}>
            {/* Main pathway - flowing through hidden gardens */}
            <path
              d="M 520 350 
                 Q 420 330, 360 360 
                 Q 300 390, 330 450 
                 Q 360 510, 440 520 
                 Q 520 530, 580 510 
                 Q 640 490, 670 440 
                 Q 700 390, 680 340"
              stroke="#D1CEC8"
              strokeWidth="2"
              fill="none"
              strokeDasharray="3 7"
              opacity="0.8"
            />
            
            {/* Points - étapes (garden entries) */}
            <circle cx="360" cy="360" r="4.5" fill="#A38767" opacity="0.7" />
            <circle cx="330" cy="450" r="4.5" fill="#A38767" opacity="0.7" />
            <circle cx="520" cy="530" r="4.5" fill="#A38767" opacity="0.7" />
            <circle cx="670" cy="440" r="4.5" fill="#A38767" opacity="0.7" />
            
            {/* Mini-circles - pauses symboliques (contemplation spots) */}
            <circle cx="440" cy="520" r="9" fill="none" stroke="#A38767" strokeWidth="0.5" opacity="0.5" />
            <circle cx="580" cy="510" r="9" fill="none" stroke="#A38767" strokeWidth="0.5" opacity="0.5" />
            
            {/* Garden loops - small enclosed spaces */}
            <circle cx="360" cy="360" r="25" fill="none" stroke="#D1CEC8" strokeWidth="1" strokeDasharray="2 5" opacity="0.4" />
            <circle cx="670" cy="440" r="28" fill="none" stroke="#D1CEC8" strokeWidth="1" strokeDasharray="2 5" opacity="0.4" />
            
            {/* Organic accent - leaves */}
            <path 
              d="M 520 530 Q 515 525, 510 530 Q 515 535, 520 530" 
              fill="#A38767" 
              opacity="0.3" 
            />
            <path 
              d="M 330 450 Q 325 445, 320 450 Q 325 455, 330 450" 
              fill="#A38767" 
              opacity="0.3" 
            />
          </g>
        )}

        {/* QUÊTE DES ATELIERS - Geometric, architectural path */}
        {shouldShowQuete('ateliers') && (
          <g opacity={opacity}>
            {/* Main pathway - structured route through art spaces */}
            <path
              d="M 180 120 
                 L 300 140 
                 L 300 260 
                 L 480 260 
                 L 480 380 
                 L 660 380 
                 L 660 520 
                 L 820 540"
              stroke="#D1CEC8"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 7"
              opacity="0.8"
            />
            
            {/* Points - étapes (atelier locations) - using squares */}
            <rect x="177" y="117" width="6" height="6" fill="#8B4513" opacity="0.7" />
            <rect x="297" y="137" width="6" height="6" fill="#8B4513" opacity="0.7" />
            <rect x="477" y="257" width="6" height="6" fill="#8B4513" opacity="0.7" />
            <rect x="657" y="377" width="6" height="6" fill="#8B4513" opacity="0.7" />
            <rect x="817" y="537" width="6" height="6" fill="#8B4513" opacity="0.7" />
            
            {/* Mini-circles - pauses symboliques */}
            <circle cx="300" cy="200" r="8" fill="none" stroke="#A38767" strokeWidth="0.5" opacity="0.4" />
            <circle cx="480" cy="320" r="8" fill="none" stroke="#A38767" strokeWidth="0.5" opacity="0.4" />
            <circle cx="660" cy="450" r="8" fill="none" stroke="#A38767" strokeWidth="0.5" opacity="0.4" />
            
            {/* Architectural frames - studio windows */}
            <rect x="295" y="135" width="10" height="10" fill="none" stroke="#8B4513" strokeWidth="0.4" opacity="0.3" />
            <rect x="475" y="255" width="10" height="10" fill="none" stroke="#8B4513" strokeWidth="0.4" opacity="0.3" />
            
            {/* Right angle branches */}
            <path d="M 300 260 L 370 260" stroke="#D1CEC8" strokeWidth="1" fill="none" strokeDasharray="3 5" opacity="0.5" />
            <path d="M 660 380 L 660 440" stroke="#D1CEC8" strokeWidth="1" fill="none" strokeDasharray="3 5" opacity="0.5" />
          </g>
        )}

        {/* Labels - only for "all" view */}
        {showLabels && (
          <g>
            {shouldShowQuete('flaneur') && (
              <text x="150" y="565" fontSize="10" fontFamily="var(--font-sans)" fill="#1A1A1A" opacity="0.6" letterSpacing="0.08em">
                QUÊTE DU FLÂNEUR
              </text>
            )}
            {shouldShowQuete('caviste') && (
              <text x="200" y="165" fontSize="10" fontFamily="var(--font-sans)" fill="#003D2C" opacity="0.6" letterSpacing="0.08em">
                QUÊTE DU CAVISTE
              </text>
            )}
            {shouldShowQuete('jardins') && (
              <text x="480" y="545" fontSize="10" fontFamily="var(--font-sans)" fill="#A38767" opacity="0.6" letterSpacing="0.08em">
                QUÊTE DES JARDINS
              </text>
            )}
            {shouldShowQuete('ateliers') && (
              <text x="670" y="555" fontSize="10" fontFamily="var(--font-sans)" fill="#8B4513" opacity="0.6" letterSpacing="0.08em">
                QUÊTE DES ATELIERS
              </text>
            )}
          </g>
        )}
      </svg>

      {/* Legend (if labels enabled) */}
      {showLabels && (
        <div 
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            background: 'rgba(250, 248, 242, 0.95)',
            border: '0.5px solid #E8E5DE',
            borderRadius: '2px',
            padding: '16px',
            boxShadow: '0 2px 8px rgba(26, 26, 26, 0.06)'
          }}
        >
          <p 
            style={{ 
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '12px',
              opacity: 0.5,
              fontWeight: '500'
            }}
          >
            Légende cartographique
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Dotted line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="24" height="2">
                <line x1="0" y1="1" x2="24" y2="1" stroke="#D1CEC8" strokeWidth="2" strokeDasharray="3 5" />
              </svg>
              <span style={{ fontSize: '11px', opacity: 0.7 }}>Tracé poétique</span>
            </div>
            
            {/* Point */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="24" height="8">
                <circle cx="4" cy="4" r="3" fill="#1A1A1A" opacity="0.6" />
              </svg>
              <span style={{ fontSize: '11px', opacity: 0.7 }}>Étape</span>
            </div>
            
            {/* Circle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="24" height="12">
                <circle cx="8" cy="6" r="5" fill="none" stroke="#A38767" strokeWidth="0.5" opacity="0.5" />
              </svg>
              <span style={{ fontSize: '11px', opacity: 0.7 }}>Pause symbolique</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
