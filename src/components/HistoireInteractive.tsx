import { useState } from 'react';
import { ChevronLeft, Calendar, MapPin } from 'lucide-react';

interface HistoireProps {
  onBack: () => void;
}

type Year = '1789' | '1830' | '1848' | '1871' | '1900' | '1944' | '1968' | '2025';
type Arrondissement = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20';

interface Story {
  year: Year;
  arrondissement: Arrondissement;
  title: string;
  subtitle: string;
  content: string;
  landmarks: string[];
}

export function Histoire({ onBack }: HistoireProps) {
  const [selectedYear, setSelectedYear] = useState<Year | null>(null);
  const [selectedArrondissement, setSelectedArrondissement] = useState<Arrondissement | null>(null);

  const years: { id: Year; label: string; era: string }[] = [
    { id: '1789', label: '1789', era: 'Révolution' },
    { id: '1830', label: '1830', era: 'Monarchie de Juillet' },
    { id: '1848', label: '1848', era: 'Révolution de Février' },
    { id: '1871', label: '1871', era: 'Commune de Paris' },
    { id: '1900', label: '1900', era: 'Belle Époque' },
    { id: '1944', label: '1944', era: 'Libération' },
    { id: '1968', label: '1968', era: 'Mai 68' },
    { id: '2025', label: '2025', era: 'Présent' },
  ];

  const arrondissements: { id: Arrondissement; name: string; x: number; y: number }[] = [
    { id: '1', name: '1er - Louvre', x: 48, y: 48 },
    { id: '2', name: '2e - Bourse', x: 52, y: 46 },
    { id: '3', name: '3e - Temple', x: 56, y: 46 },
    { id: '4', name: '4e - Hôtel-de-Ville', x: 54, y: 50 },
    { id: '5', name: '5e - Panthéon', x: 50, y: 56 },
    { id: '6', name: '6e - Luxembourg', x: 46, y: 54 },
    { id: '7', name: '7e - Palais-Bourbon', x: 40, y: 50 },
    { id: '8', name: '8e - Élysée', x: 42, y: 42 },
    { id: '9', name: '9e - Opéra', x: 48, y: 40 },
    { id: '10', name: '10e - Enclos-St-Laurent', x: 56, y: 40 },
    { id: '11', name: '11e - Popincourt', x: 62, y: 48 },
    { id: '12', name: '12e - Reuilly', x: 66, y: 52 },
    { id: '13', name: '13e - Gobelins', x: 56, y: 60 },
    { id: '14', name: '14e - Observatoire', x: 46, y: 62 },
    { id: '15', name: '15e - Vaugirard', x: 36, y: 56 },
    { id: '16', name: '16e - Passy', x: 30, y: 46 },
    { id: '17', name: '17e - Batignolles', x: 40, y: 36 },
    { id: '18', name: '18e - Butte-Montmartre', x: 50, y: 32 },
    { id: '19', name: '19e - Buttes-Chaumont', x: 62, y: 36 },
    { id: '20', name: '20e - Ménilmontant', x: 66, y: 42 },
  ];

  // Sample stories database
  const stories: Story[] = [
    {
      year: '1789',
      arrondissement: '4',
      title: 'La Prise de la Bastille',
      subtitle: '14 juillet 1789 — Île de la Cité & Marais',
      content: `Le 14 juillet 1789, la foule en colère converge vers la forteresse de la Bastille, symbole de l'absolutisme royal. La prison, située dans l'actuel 4e arrondissement, ne contient que sept prisonniers, mais sa chute résonne comme l'acte de naissance de la Révolution française.

Le marquis de Launay, gouverneur de la Bastille, ordonne de tirer sur la foule. Quatre-vingt-trois assaillants tombent. À 17h30, la forteresse capitule. Launay est décapité, sa tête promenée au bout d'une pique.

Dès 1790, la Bastille est démolie. Ses pierres sont dispersées — certaines servent à construire le Pont de la Concorde. Aujourd'hui, la Place de la Bastille marque l'emplacement de la forteresse disparue. La Colonne de Juillet (1840) commémore non pas 1789, mais la révolution de 1830.

Lieux de mémoire : Rue Saint-Antoine (cortège révolutionnaire), Place de la Bastille (tracé de la forteresse marqué au sol), Archives Nationales (documents révolutionnaires).`,
      landmarks: ['Place de la Bastille', 'Rue Saint-Antoine', 'Archives Nationales']
    },
    {
      year: '1871',
      arrondissement: '18',
      title: 'La Commune de Paris à Montmartre',
      subtitle: '18 mars - 28 mai 1871 — Butte Montmartre',
      content: `Le 18 mars 1871, Thiers ordonne la saisie des canons de la Garde Nationale à Montmartre. Les soldats fraternisent avec le peuple. Les généraux Lecomte et Clément Thomas sont fusillés rue des Rosiers (aujourd'hui rue du Chevalier-de-la-Barre).

C'est le début de la Commune de Paris, première tentative de gouvernement ouvrier. Pendant 72 jours, Paris devient une expérience révolutionnaire : suffrage universel, séparation de l'Église et de l'État, éducation gratuite et laïque.

La Semaine sanglante (21-28 mai) écrase la Commune. Les Communards se retranchent à Montmartre, défendant chaque rue. Le dernier carré est massacré au mur des Fédérés (Père-Lachaise, 20e).

Montmartre garde les traces : le Sacré-Cœur, construit en 1875 en "expiation" des péchés de la Commune, domine la Butte. Place du Tertre, les artistes ignorent souvent qu'ils peignent sur un ancien champ de bataille.`,
      landmarks: ['Sacré-Cœur', 'Rue du Chevalier-de-la-Barre', 'Place du Tertre']
    },
    {
      year: '1968',
      arrondissement: '5',
      title: 'Mai 68 au Quartier Latin',
      subtitle: 'Mai 1968 — Sorbonne & Boulevard Saint-Michel',
      content: `Le 3 mai 1968, la police évacue la Sorbonne. C'est l'étincelle. Les étudiants du Quartier Latin (5e arrondissement) se révoltent contre l'autoritarisme universitaire et, par extension, contre l'ordre gaullien.

Dans la nuit du 10 au 11 mai, la "Nuit des Barricades" transforme le Boulevard Saint-Michel en champ de bataille. Les pavés deviennent des projectiles. "Sous les pavés, la plage" — le slogan résume l'esprit libertaire de Mai.

Le 13 mai, un million de manifestants défilent à Paris. Les ouvriers rejoignent les étudiants. La France s'arrête. De Gaulle disparaît mystérieusement (il est en Allemagne, s'assurant du soutien de l'armée).

La Sorbonne occupée devient un laboratoire utopique : assemblées générales permanentes, débats philosophiques, amour libre. Les murs se couvrent d'affiches : "L'imagination au pouvoir", "Il est interdit d'interdire".

Juin 1968 : De Gaulle dissout l'Assemblée. Les gaullistes remportent les élections. Mai est terminé, mais l'onde de choc traverse le siècle.`,
      landmarks: ['La Sorbonne', 'Boulevard Saint-Michel', 'Place de la Contrescarpe']
    },
    {
      year: '1900',
      arrondissement: '9',
      title: 'L\'Opéra et la Belle Époque',
      subtitle: '1900 — Grands Boulevards & Pigalle',
      content: `L'Exposition Universelle de 1900 consacre Paris comme capitale mondiale de l'art et de la modernité. Le 9e arrondissement, avec l'Opéra Garnier inauguré en 1875, devient l'épicentre de la Belle Époque.

Les Grands Boulevards brillent de mille feux. Les cafés-concerts (Le Chat Noir, Le Moulin Rouge) inventent le spectacle moderne. Toulouse-Lautrec peint les danseuses, Proust observe le Tout-Paris.

Boulevard Haussmann, les grands magasins (Galeries Lafayette, 1912) créent le temple de la consommation bourgeoise. Proust y situera l'univers de Swann.

Mais sous les ors, la misère. Pigalle (frontière 9e/18e) est le ventre de Paris : maisons closes, apaches, misère ouvrière. Zola documente ce Paris-là dans L'Assommoir.

1900 : Le métro ouvre. Guimard dessine les entrées Art Nouveau. Paris entre dans le XXe siècle, éclairée par l'électricité, traversée par le souterrain.`,
      landmarks: ['Opéra Garnier', 'Galeries Lafayette', 'Boulevard Haussmann']
    },
    {
      year: '2025',
      arrondissement: '11',
      title: 'Le Faubourg Saint-Antoine Aujourd\'hui',
      subtitle: '2025 — Artisanat contemporain & Mémoire ouvrière',
      content: `En 2025, le 11e arrondissement reste le cœur de l'artisanat parisien. Le Faubourg Saint-Antoine, historiquement exempté des corporations royales, a toujours été terre de liberté pour les artisans.

Les passages secrets (Passage du Chantier, Passage de la Main d'Or) abritent encore des ateliers d'ébénistes, bien que gentrification et hausse des loyers menacent ce patrimoine vivant.

Le Viaduc des Arts (12e arrondissement voisin) symbolise la reconversion réussie : anciennes voies ferrées transformées en galeries d'artisans d'art. Souffleurs de verre, luthiers, maroquiniers perpétuent les savoir-faire.

Place de la Bastille, le souvenir révolutionnaire coexiste avec l'Opéra Bastille (1989). Le 11e est un palimpseste : révoltes ouvrières (1830, 1848, 1871), immigration successive (Auvergnats, Maghrébins, Chinois), et aujourd'hui, boboïsation progressive.

Le Marché d'Aligre résiste : c'est le "ventre" populaire décrit par Zola, préservé au cœur du Paris hipster.`,
      landmarks: ['Passage de la Main d\'Or', 'Marché d\'Aligre', 'Place de la Bastille']
    }
  ];

  const currentStory = stories.find(s => s.year === selectedYear && s.arrondissement === selectedArrondissement);

  return (
    <div 
      className="min-h-screen relative"
      style={{ 
        background: '#FAF7F2',
        overflow: 'hidden'
      }}
    >
      {/* Ghost Grid */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          opacity: 0.03,
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <pattern id="parisGrid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" stroke="#1A1A1A" strokeWidth="0.3" fill="none" />
              <path d="M 20 50 L 80 50 M 50 20 L 50 80" stroke="#1A1A1A" strokeWidth="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#parisGrid)" />
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

      <div 
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: 'var(--space-xxl) var(--space-xl)',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Header */}
        <header 
          style={{
            textAlign: 'center',
            marginBottom: 'var(--space-xxl)',
            paddingBottom: 'var(--space-xl)'
          }}
        >
          <h1 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '56px',
              fontWeight: '600',
              letterSpacing: '-0.02em',
              color: '#1A1A1A',
              marginBottom: 'var(--space-md)',
              lineHeight: '1.1'
            }}
          >
            Histoire de Paris
          </h1>
          
          <p 
            className="small-caps"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: '#1A1A1A',
              opacity: 0.5
            }}
          >
            Sélectionnez une année et un arrondissement pour découvrir son récit
          </p>
        </header>

        {/* Two-column layout */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-xxl)',
            marginBottom: 'var(--space-xxl)'
          }}
        >
          {/* LEFT: Timeline */}
          <div>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                marginBottom: 'var(--space-lg)'
              }}
            >
              <Calendar size={20} strokeWidth={1.5} color="#6C8A82" />
              <h2 
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#1A1A1A'
                }}
              >
                Année
              </h2>
            </div>

            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-sm)'
              }}
            >
              {years.map((year) => (
                <button
                  key={year.id}
                  onClick={() => setSelectedYear(year.id)}
                  style={{
                    background: selectedYear === year.id ? '#6C8A82' : '#FFFFFF',
                    color: selectedYear === year.id ? '#FFFFFF' : '#1A1A1A',
                    border: `1.5px solid ${selectedYear === year.id ? '#6C8A82' : '#E7DCC8'}`,
                    borderRadius: '4px',
                    padding: 'var(--space-md) var(--space-lg)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all var(--transition)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedYear !== year.id) {
                      e.currentTarget.style.borderColor = '#6C8A82';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedYear !== year.id) {
                      e.currentTarget.style.borderColor = '#E7DCC8';
                    }
                  }}
                >
                  <div>
                    <div 
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}
                    >
                      {year.label}
                    </div>
                    <div 
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '12px',
                        opacity: selectedYear === year.id ? 0.9 : 0.5
                      }}
                    >
                      {year.era}
                    </div>
                  </div>
                  {selectedYear === year.id && (
                    <div 
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#FFFFFF'
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Paris Map */}
          <div>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                marginBottom: 'var(--space-lg)'
              }}
            >
              <MapPin size={20} strokeWidth={1.5} color="#8AA79A" />
              <h2 
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#1A1A1A'
                }}
              >
                Arrondissement
              </h2>
            </div>

            {/* SVG Map of Paris */}
            <div 
              style={{
                background: '#FFFFFF',
                border: '1px solid #E7DCC8',
                borderRadius: '4px',
                padding: 'var(--space-lg)',
                position: 'relative'
              }}
            >
              <svg width="100%" height="500" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
                {/* Seine River */}
                <path 
                  d="M 10 50 Q 30 48, 50 52 T 90 48" 
                  stroke="#C8D7E8" 
                  strokeWidth="4" 
                  fill="none" 
                  opacity="0.3" 
                />

                {/* Arrondissements */}
                {arrondissements.map((arr) => {
                  const isSelected = selectedArrondissement === arr.id;
                  const hasStory = stories.some(s => s.arrondissement === arr.id && s.year === selectedYear);
                  
                  return (
                    <g key={arr.id}>
                      <circle
                        cx={arr.x}
                        cy={arr.y}
                        r="4"
                        fill={isSelected ? '#8AA79A' : (hasStory ? '#C3A88B' : '#E7DCC8')}
                        stroke={isSelected ? '#FFFFFF' : 'none'}
                        strokeWidth="1"
                        style={{ 
                          cursor: hasStory ? 'pointer' : 'default',
                          transition: 'all 0.2s'
                        }}
                        onClick={() => hasStory && setSelectedArrondissement(arr.id)}
                        onMouseEnter={(e) => {
                          if (hasStory && !isSelected) {
                            e.currentTarget.setAttribute('r', '5');
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.setAttribute('r', '4');
                          }
                        }}
                      />
                      <text
                        x={arr.x}
                        y={arr.y - 8}
                        textAnchor="middle"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: hasStory ? '4px' : '3px',
                          fill: isSelected ? '#8AA79A' : '#6D706C',
                          fontWeight: hasStory ? '600' : '400',
                          pointerEvents: 'none'
                        }}
                      >
                        {arr.id}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div 
                style={{
                  marginTop: 'var(--space-lg)',
                  display: 'flex',
                  gap: 'var(--space-lg)',
                  justifyContent: 'center',
                  fontSize: '11px',
                  color: '#6D706C'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#C3A88B' }} />
                  <span>Histoire disponible</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#8AA79A' }} />
                  <span>Sélectionné</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#E7DCC8' }} />
                  <span>Aucune histoire</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Display */}
        {currentStory && (
          <div 
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #8AA79A',
              borderRadius: '4px',
              padding: 'var(--space-xxl)',
              position: 'relative'
            }}
          >
            {/* Watermark */}
            <div 
              style={{
                position: 'absolute',
                top: '32px',
                right: '32px',
                fontSize: '80px',
                fontFamily: 'var(--font-serif)',
                color: '#8AA79A',
                opacity: 0.05,
                fontWeight: '600',
                pointerEvents: 'none'
              }}
            >
              {currentStory.year}
            </div>

            <div 
              className="small-caps"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                letterSpacing: '0.2em',
                color: '#8AA79A',
                marginBottom: 'var(--space-sm)'
              }}
            >
              {currentStory.subtitle}
            </div>

            <h2 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '38px',
                fontWeight: '600',
                color: '#1A1A1A',
                marginBottom: 'var(--space-xl)',
                lineHeight: '1.2'
              }}
            >
              {currentStory.title}
            </h2>

            <div 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '16px',
                lineHeight: '1.9',
                color: '#1A1A1A',
                whiteSpace: 'pre-line',
                marginBottom: 'var(--space-xl)'
              }}
            >
              {currentStory.content}
            </div>

            {/* Landmarks */}
            <div>
              <h3 
                className="small-caps"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  color: '#8AA79A',
                  marginBottom: 'var(--space-md)'
                }}
              >
                Lieux de mémoire
              </h3>
              <div 
                style={{
                  display: 'flex',
                  gap: 'var(--space-sm)',
                  flexWrap: 'wrap'
                }}
              >
                {currentStory.landmarks.map((landmark, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#8AA79A15',
                      border: '1px solid #8AA79A40',
                      borderRadius: '20px',
                      padding: '6px 12px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      color: '#6C8A82'
                    }}
                  >
                    {landmark}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!currentStory && (selectedYear || selectedArrondissement) && (
          <div 
            style={{
              textAlign: 'center',
              padding: 'var(--space-xxl)',
              color: '#1A1A1A',
              opacity: 0.4
            }}
          >
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '16px' }}>
              {selectedYear && selectedArrondissement 
                ? "Aucune histoire n'est encore disponible pour cette combinaison."
                : "Sélectionnez une année et un arrondissement pour découvrir son histoire."}
            </p>
          </div>
        )}
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}