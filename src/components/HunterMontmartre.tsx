import { useState, useEffect, useCallback } from 'react';
import { MamlukGrid } from './MamlukGrid';
import { BackButton } from './BackButton';
import { collectSymbol, isSymbolCollected } from '../utils/collection-service';

interface HunterMontmartreProps {
  onBack: () => void;
}

interface HunterSymbol {
  id: string;
  name: string;
  riddle: string;
  riddleAnswer: string;
  hint: string;
  proofQuestion: string;
  proofAnswers: string[]; // Multiple accepted answers
  location: string;
  coordinates: { lat: number; lng: number };
}

// Les 4 symboles de Montmartre dans l'ordre de la chasse
const MONTMARTRE_HUNT: HunterSymbol[] = [
  {
    id: 'sym-18-01',
    name: 'Le Passe-Muraille',
    riddle: 'Je traverse les murs mais je suis figé pour l\'éternité. Marcel m\'a créé, Marais m\'a sculpté. Qui suis-je?',
    riddleAnswer: 'passe-muraille',
    hint: 'Place Marcel Aymé, au bout de la rue Norvins. Un homme émerge du mur, coincé entre deux mondes.',
    proofQuestion: 'De quelle main le Passe-Muraille sort-il du mur? (gauche/droite)',
    proofAnswers: ['droite', 'droit', 'right'],
    location: 'Place Marcel Aymé',
    coordinates: { lat: 48.8867, lng: 2.3372 }
  },
  {
    id: 'sym-18-02',
    name: 'Le Cadran du Coq',
    riddle: 'QUAND SONNERA JE CHANTERAY — mais une lettre s\'est rebellée, elle regarde dans l\'autre sens.',
    riddleAnswer: 'cadran',
    hint: 'Rue de l\'Abreuvoir, sur une façade discrète. Un cadran solaire où le N refuse de suivre les autres.',
    proofQuestion: 'Quelle lettre est inversée sur le cadran? (une seule lettre)',
    proofAnswers: ['n', 'N'],
    location: 'Rue de l\'Abreuvoir',
    coordinates: { lat: 48.8875, lng: 2.3389 }
  },
  {
    id: 'sym-18-03',
    name: 'Le Rocher de la Sorcière',
    riddle: 'Dans un jardin interdit aux passants, une pierre brute refuse d\'être polie par la civilisation.',
    riddleAnswer: 'rocher',
    hint: 'Avenue Junot, derrière une grille. Le jardin sauvage de Montmartre cache une roche ancienne.',
    proofQuestion: 'Quelle est la couleur dominante de la grille qui protège le jardin? (un mot)',
    proofAnswers: ['vert', 'verte', 'green', 'noir', 'noire', 'black'],
    location: 'Avenue Junot',
    coordinates: { lat: 48.8889, lng: 2.3345 }
  },
  {
    id: 'sym-18-04',
    name: 'La Vigne Sacrée',
    riddle: 'Du vin pousse encore sur la Butte. Chaque automne, les vendanges rappellent que Paris fut campagne.',
    riddleAnswer: 'vigne',
    hint: 'Rue des Saules, angle rue Saint-Vincent. Le Clos Montmartre — la dernière vigne de Paris.',
    proofQuestion: 'Quel est le nom du cabaret célèbre juste à côté de la vigne? (deux mots)',
    proofAnswers: ['lapin agile', 'le lapin agile', 'au lapin agile'],
    location: 'Rue des Saules',
    coordinates: { lat: 48.8871, lng: 2.3403 }
  }
];

type HuntPhase = 'intro' | 'riddle' | 'hunting' | 'gps_check' | 'proof' | 'success' | 'complete';

const RIDDLE_TIME = 30; // seconds
const COOLDOWN_TIME = 60; // seconds after wrong answer
const GPS_RADIUS_METERS = 100; // Must be within 100m of symbol

// Calculate distance between two coordinates in meters (Haversine formula)
function getDistanceMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000; // Earth's radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function HunterMontmartre({ onBack }: HunterMontmartreProps) {
  // Find first uncollected symbol or start from beginning
  const getInitialSymbol = () => {
    for (let i = 0; i < MONTMARTRE_HUNT.length; i++) {
      if (!isSymbolCollected(MONTMARTRE_HUNT[i].id)) {
        return i;
      }
    }
    return MONTMARTRE_HUNT.length; // All complete
  };

  const [currentSymbolIndex, setCurrentSymbolIndex] = useState(getInitialSymbol);
  const [phase, setPhase] = useState<HuntPhase>(getInitialSymbol() >= MONTMARTRE_HUNT.length ? 'complete' : 'intro');
  const [riddleAnswer, setRiddleAnswer] = useState('');
  const [proofAnswer, setProofAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(RIDDLE_TIME);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [gpsStatus, setGpsStatus] = useState<'checking' | 'success' | 'too_far' | 'error' | null>(null);
  const [gpsDistance, setGpsDistance] = useState<number | null>(null);

  const currentSymbol = MONTMARTRE_HUNT[currentSymbolIndex];
  const collectedCount = MONTMARTRE_HUNT.filter(s => isSymbolCollected(s.id)).length;

  // Timer for riddle phase
  useEffect(() => {
    if (phase !== 'riddle' || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setError('Temps écoulé! Réessaie.');
          setCooldown(COOLDOWN_TIME);
          setPhase('intro');
          return RIDDLE_TIME;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown(c => c - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const startRiddle = () => {
    setPhase('riddle');
    setTimeLeft(RIDDLE_TIME);
    setRiddleAnswer('');
    setError(null);
  };

  const checkRiddleAnswer = () => {
    const normalized = riddleAnswer.toLowerCase().trim();
    if (normalized.includes(currentSymbol.riddleAnswer)) {
      setPhase('hunting');
      setError(null);
    } else {
      setError('Ce n\'est pas la bonne réponse...');
      setCooldown(COOLDOWN_TIME);
      setPhase('intro');
    }
  };

  const tryGpsVerification = () => {
    setPhase('gps_check');
    setGpsStatus('checking');
    setGpsDistance(null);
    setError(null);

    if (!navigator.geolocation) {
      // GPS not supported, fall back to question
      setGpsStatus('error');
      setTimeout(() => {
        setPhase('proof');
        setProofAnswer('');
      }, 1500);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const distance = getDistanceMeters(
          position.coords.latitude,
          position.coords.longitude,
          currentSymbol.coordinates.lat,
          currentSymbol.coordinates.lng
        );
        setGpsDistance(Math.round(distance));

        if (distance <= GPS_RADIUS_METERS) {
          // Success! User is at the location
          setGpsStatus('success');
          setTimeout(() => {
            collectSymbol(currentSymbol.id);
            setPhase('success');
          }, 1500);
        } else {
          // Too far, fall back to question
          setGpsStatus('too_far');
          setTimeout(() => {
            setPhase('proof');
            setProofAnswer('');
          }, 2000);
        }
      },
      (err) => {
        // GPS error, fall back to question
        console.log('GPS error:', err.message);
        setGpsStatus('error');
        setTimeout(() => {
          setPhase('proof');
          setProofAnswer('');
        }, 1500);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const startProof = () => {
    setPhase('proof');
    setProofAnswer('');
    setError(null);
  };

  const checkProofAnswer = () => {
    const normalized = proofAnswer.toLowerCase().trim();
    const isCorrect = currentSymbol.proofAnswers.some(a =>
      normalized.includes(a.toLowerCase())
    );

    if (isCorrect) {
      // Collect the symbol!
      collectSymbol(currentSymbol.id);
      setPhase('success');
      setError(null);
    } else {
      setError('Hmm, ce n\'est pas ce que je vois... Es-tu vraiment sur place?');
    }
  };

  const nextSymbol = () => {
    const nextIndex = currentSymbolIndex + 1;
    if (nextIndex >= MONTMARTRE_HUNT.length) {
      setPhase('complete');
    } else {
      setCurrentSymbolIndex(nextIndex);
      setPhase('intro');
    }
  };

  // Mini-map of Montmartre (18e)
  const MontmartreMap = () => (
    <svg viewBox="0 0 300 250" style={{ width: '100%', maxWidth: '300px' }}>
      {/* 18e arrondissement shape simplified */}
      <path
        d="M50,200 L80,180 L100,120 L150,80 L200,60 L250,80 L270,120 L260,180 L220,210 L150,220 L80,210 Z"
        fill="rgba(0, 61, 44, 0.1)"
        stroke="#003D2C"
        strokeWidth="2"
      />

      {/* Symbol markers */}
      {MONTMARTRE_HUNT.map((symbol, index) => {
        const collected = isSymbolCollected(symbol.id);
        const isCurrent = index === currentSymbolIndex;
        // Approximate positions within the shape
        const positions = [
          { x: 140, y: 130 }, // Passe-Muraille
          { x: 180, y: 110 }, // Cadran
          { x: 120, y: 100 }, // Rocher
          { x: 200, y: 140 }, // Vigne
        ];
        const pos = positions[index];

        return (
          <g key={symbol.id}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={isCurrent ? 12 : 8}
              fill={collected ? '#003D2C' : isCurrent ? 'rgba(0, 61, 44, 0.3)' : 'transparent'}
              stroke="#003D2C"
              strokeWidth={isCurrent ? 2 : 1}
              style={{ transition: 'all 0.3s ease' }}
            />
            {collected && (
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fill="#FAF8F2"
                fontSize="10"
                fontWeight="bold"
              >
                ✓
              </text>
            )}
            <text
              x={pos.x}
              y={pos.y + 25}
              textAnchor="middle"
              fill="#003D2C"
              fontSize="8"
              opacity={0.7}
            >
              {index + 1}
            </text>
          </g>
        );
      })}

      {/* Title */}
      <text x="150" y="30" textAnchor="middle" fill="#003D2C" fontSize="14" fontWeight="600">
        Montmartre
      </text>
    </svg>
  );

  return (
    <div
      className="min-h-screen relative"
      style={{ background: '#FAF8F2', overflow: 'hidden' }}
    >
      <MamlukGrid pattern="star8" opacity={0.02} scale={1.5} rotation={0} layers={2} />
      <BackButton onClick={onBack} />

      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: 'clamp(24px, 4vw, 48px)',
          paddingTop: 'clamp(80px, 10vh, 100px)',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#003D2C',
              opacity: 0.6,
              marginBottom: '8px'
            }}
          >
            Trésor Caché
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '400',
              color: '#1A1A1A',
              marginBottom: '8px'
            }}
          >
            Hunter: Montmartre
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
            {collectedCount} / {MONTMARTRE_HUNT.length} symboles trouvés
          </p>
        </header>

        {/* Progress bar */}
        <div
          style={{
            width: '100%',
            height: '4px',
            background: 'rgba(0, 61, 44, 0.1)',
            marginBottom: '32px'
          }}
        >
          <div
            style={{
              width: `${(collectedCount / MONTMARTRE_HUNT.length) * 100}%`,
              height: '100%',
              background: '#003D2C',
              transition: 'width 0.5s ease'
            }}
          />
        </div>

        {/* Toggle Map */}
        <button
          onClick={() => setShowMap(!showMap)}
          style={{
            display: 'block',
            margin: '0 auto 24px',
            background: 'transparent',
            border: '1px dashed rgba(0, 61, 44, 0.3)',
            padding: '8px 16px',
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: '#003D2C',
            cursor: 'pointer'
          }}
        >
          {showMap ? '◇ Cacher la carte' : '◇ Voir la carte'}
        </button>

        {showMap && (
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <MontmartreMap />
          </div>
        )}

        {/* Main Content based on phase */}
        <div
          style={{
            background: 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(0, 61, 44, 0.15)',
            padding: 'clamp(24px, 4vw, 40px)'
          }}
        >
          {/* INTRO PHASE */}
          {phase === 'intro' && currentSymbol && (
            <>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#003D2C',
                  opacity: 0.5,
                  marginBottom: '8px'
                }}
              >
                Symbole {currentSymbolIndex + 1} / {MONTMARTRE_HUNT.length}
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '28px',
                  fontWeight: '600',
                  color: '#1A1A1A',
                  marginBottom: '16px'
                }}
              >
                {currentSymbol.name}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '16px',
                  fontStyle: 'italic',
                  color: '#1A1A1A',
                  opacity: 0.7,
                  marginBottom: '24px',
                  lineHeight: '1.6'
                }}
              >
                Pour révéler l'indice, tu dois d'abord résoudre l'énigme.
              </p>

              {cooldown > 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '20px',
                    background: 'rgba(0, 61, 44, 0.05)'
                  }}
                >
                  <p style={{ fontFamily: 'var(--font-serif)', color: '#1A1A1A', marginBottom: '8px' }}>
                    Patience...
                  </p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '24px', color: '#003D2C' }}>
                    {cooldown}s
                  </p>
                </div>
              ) : (
                <button
                  onClick={startRiddle}
                  style={{
                    width: '100%',
                    background: '#003D2C',
                    color: '#FAF8F2',
                    border: 'none',
                    padding: '16px 24px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  Commencer l'énigme
                </button>
              )}

              {error && (
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  color: '#8B0000',
                  marginTop: '16px',
                  fontStyle: 'italic',
                  textAlign: 'center'
                }}>
                  {error}
                </p>
              )}
            </>
          )}

          {/* RIDDLE PHASE */}
          {phase === 'riddle' && currentSymbol && (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px'
                }}
              >
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#003D2C', opacity: 0.6 }}>
                  ÉNIGME
                </p>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '20px',
                    fontWeight: '600',
                    color: timeLeft <= 10 ? '#8B0000' : '#003D2C'
                  }}
                >
                  {timeLeft}s
                </div>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '20px',
                  fontStyle: 'italic',
                  color: '#1A1A1A',
                  lineHeight: '1.6',
                  marginBottom: '24px',
                  padding: '16px',
                  background: 'rgba(0, 61, 44, 0.03)',
                  borderLeft: '3px solid rgba(0, 61, 44, 0.2)'
                }}
              >
                "{currentSymbol.riddle}"
              </p>

              <input
                type="text"
                value={riddleAnswer}
                onChange={(e) => setRiddleAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkRiddleAnswer()}
                placeholder="Ta réponse..."
                autoFocus
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '1px solid rgba(0, 61, 44, 0.2)',
                  background: 'transparent',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '18px',
                  color: '#1A1A1A',
                  marginBottom: '16px',
                  outline: 'none'
                }}
              />

              <button
                onClick={checkRiddleAnswer}
                style={{
                  width: '100%',
                  background: '#003D2C',
                  color: '#FAF8F2',
                  border: 'none',
                  padding: '16px 24px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                Valider
              </button>
            </>
          )}

          {/* HUNTING PHASE */}
          {phase === 'hunting' && currentSymbol && (
            <>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#003D2C',
                  marginBottom: '16px'
                }}
              >
                Indice révélé
              </p>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#1A1A1A',
                  marginBottom: '16px'
                }}
              >
                {currentSymbol.name}
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '18px',
                  fontStyle: 'italic',
                  color: '#1A1A1A',
                  lineHeight: '1.6',
                  marginBottom: '24px',
                  padding: '16px',
                  background: 'rgba(0, 61, 44, 0.05)',
                  borderLeft: '3px solid #003D2C'
                }}
              >
                {currentSymbol.hint}
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  color: '#003D2C',
                  marginBottom: '24px'
                }}
              >
                📍 {currentSymbol.location}
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '14px',
                  color: '#1A1A1A',
                  opacity: 0.7,
                  marginBottom: '16px',
                  textAlign: 'center'
                }}
              >
                Trouve ce symbole, puis reviens ici pour prouver ta découverte.
              </p>

              <button
                onClick={tryGpsVerification}
                style={{
                  width: '100%',
                  background: '#003D2C',
                  color: '#FAF8F2',
                  border: 'none',
                  padding: '16px 24px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                Je l'ai trouvé
              </button>
            </>
          )}

          {/* GPS CHECK PHASE */}
          {phase === 'gps_check' && currentSymbol && (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              {gpsStatus === 'checking' && (
                <>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      border: '3px solid rgba(0, 61, 44, 0.2)',
                      borderTopColor: '#003D2C',
                      borderRadius: '50%',
                      margin: '0 auto 24px',
                      animation: 'spin 1s linear infinite'
                    }}
                  />
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '18px',
                      color: '#1A1A1A',
                      marginBottom: '8px'
                    }}
                  >
                    Vérification GPS...
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      color: '#003D2C',
                      opacity: 0.6
                    }}
                  >
                    Es-tu vraiment à {currentSymbol.location}?
                  </p>
                </>
              )}

              {gpsStatus === 'success' && (
                <>
                  <p style={{ fontSize: '48px', marginBottom: '16px' }}>📍</p>
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '20px',
                      color: '#003D2C',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}
                  >
                    Position confirmée!
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      color: '#1A1A1A',
                      opacity: 0.6
                    }}
                  >
                    Tu es bien sur place. Symbole validé.
                  </p>
                </>
              )}

              {gpsStatus === 'too_far' && (
                <>
                  <p style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</p>
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '18px',
                      color: '#1A1A1A',
                      marginBottom: '8px'
                    }}
                  >
                    Tu sembles être à {gpsDistance}m
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      color: '#003D2C',
                      opacity: 0.6
                    }}
                  >
                    Pas de souci — réponds à une question pour valider.
                  </p>
                </>
              )}

              {gpsStatus === 'error' && (
                <>
                  <p style={{ fontSize: '48px', marginBottom: '16px' }}>📡</p>
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '18px',
                      color: '#1A1A1A',
                      marginBottom: '8px'
                    }}
                  >
                    GPS indisponible
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      color: '#003D2C',
                      opacity: 0.6
                    }}
                  >
                    On passe à la question de vérification.
                  </p>
                </>
              )}
            </div>
          )}

          {/* PROOF PHASE */}
          {phase === 'proof' && currentSymbol && (
            <>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#003D2C',
                  marginBottom: '16px'
                }}
              >
                Preuve de présence
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '18px',
                  color: '#1A1A1A',
                  lineHeight: '1.6',
                  marginBottom: '24px'
                }}
              >
                {currentSymbol.proofQuestion}
              </p>

              <input
                type="text"
                value={proofAnswer}
                onChange={(e) => setProofAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkProofAnswer()}
                placeholder="Ta réponse..."
                autoFocus
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '1px solid rgba(0, 61, 44, 0.2)',
                  background: 'transparent',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '18px',
                  color: '#1A1A1A',
                  marginBottom: '16px',
                  outline: 'none'
                }}
              />

              {error && (
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  color: '#8B0000',
                  marginBottom: '16px',
                  fontStyle: 'italic'
                }}>
                  {error}
                </p>
              )}

              <button
                onClick={checkProofAnswer}
                style={{
                  width: '100%',
                  background: '#003D2C',
                  color: '#FAF8F2',
                  border: 'none',
                  padding: '16px 24px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                Valider ma présence
              </button>

              <button
                onClick={() => setPhase('hunting')}
                style={{
                  width: '100%',
                  background: 'transparent',
                  color: '#003D2C',
                  border: '1px solid rgba(0, 61, 44, 0.2)',
                  padding: '12px 24px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  marginTop: '12px'
                }}
              >
                Revoir l'indice
              </button>
            </>
          )}

          {/* SUCCESS PHASE */}
          {phase === 'success' && currentSymbol && (
            <>
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '48px',
                    marginBottom: '16px'
                  }}
                >
                  ◆
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '28px',
                    fontWeight: '600',
                    color: '#1A1A1A',
                    marginBottom: '8px'
                  }}
                >
                  {currentSymbol.name}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '16px',
                    fontStyle: 'italic',
                    color: '#003D2C',
                    marginBottom: '32px'
                  }}
                >
                  Ajouté à ta collection
                </p>

                <button
                  onClick={nextSymbol}
                  style={{
                    background: '#003D2C',
                    color: '#FAF8F2',
                    border: 'none',
                    padding: '16px 32px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  {currentSymbolIndex + 1 >= MONTMARTRE_HUNT.length
                    ? 'Terminer la chasse'
                    : 'Symbole suivant'}
                </button>
              </div>
            </>
          )}

          {/* COMPLETE PHASE */}
          {phase === 'complete' && (
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '64px',
                  marginBottom: '16px'
                }}
              >
                ◇
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '32px',
                  fontWeight: '600',
                  color: '#1A1A1A',
                  marginBottom: '8px'
                }}
              >
                Gardien de Montmartre
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '16px',
                  fontStyle: 'italic',
                  color: '#1A1A1A',
                  opacity: 0.7,
                  marginBottom: '32px',
                  lineHeight: '1.6'
                }}
              >
                Tu as découvert tous les secrets de la Butte.<br />
                Montmartre te reconnaît comme l'un des siens.
              </p>

              <div
                style={{
                  padding: '24px',
                  background: 'rgba(0, 61, 44, 0.05)',
                  border: '1px solid rgba(0, 61, 44, 0.2)',
                  marginBottom: '24px'
                }}
              >
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#003D2C', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  SYMBOLES COLLECTÉS
                </p>
                {MONTMARTRE_HUNT.map(symbol => (
                  <p key={symbol.id} style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', color: '#1A1A1A', marginBottom: '4px' }}>
                    ◆ {symbol.name}
                  </p>
                ))}
              </div>

              <button
                onClick={onBack}
                style={{
                  background: '#003D2C',
                  color: '#FAF8F2',
                  border: 'none',
                  padding: '16px 32px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                Retour à l'accueil
              </button>
            </div>
          )}
        </div>

        {/* Footer hint */}
        {phase !== 'complete' && (
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '12px',
              fontStyle: 'italic',
              color: '#1A1A1A',
              opacity: 0.4,
              textAlign: 'center',
              marginTop: '24px'
            }}
          >
            Les réponses de preuve ne sont trouvables que sur place.
          </p>
        )}

        {/* Spinner animation */}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
