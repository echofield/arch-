import { useState, useRef, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { MamlukGrid } from './MamlukGrid';
import { BackButton } from './BackButton';

interface HistoireProps {
  onBack: () => void;
}

interface HistoricalMoment {
  date: string;
  word: string;
  sentence: string;
  audioUrl?: string; // Optional audio fragment
}

const MOMENTS: HistoricalMoment[] = [
  {
    date: '−52 av. J.-C.',
    word: 'FRANCHISSEMENT',
    sentence: 'Un gué devient un centre. La circulation précède la capitale.',
    audioUrl: '/audio/franchissement.mp3' // Placeholder
  },
  {
    date: '508',
    word: 'DÉSIGNATION',
    sentence: 'Le pouvoir choisit un lieu. Paris devient nom, pas encore forme.'
  },
  {
    date: '987',
    word: 'ANCRAGE',
    sentence: 'La royauté s\'installe. Le provisoire commence à durer.'
  },
  {
    date: '1163',
    word: 'ÉLÉVATION',
    sentence: 'On commence Notre-Dame. La ville regarde vers le haut.',
    audioUrl: '/audio/elevation.mp3' // Placeholder
  },
  {
    date: '1200',
    word: 'ENCLOSURE',
    sentence: 'Philippe Auguste ferme Paris. Se protéger, c\'est déjà exister.'
  },
  {
    date: '1305',
    word: 'INSTITUTION',
    sentence: 'La papauté arrive à Paris. Le spirituel devient politique.'
  },
  {
    date: '1572',
    word: 'RUPTURE',
    sentence: 'La ville se retourne contre elle-même. La foi fracture l\'espace.'
  },
  {
    date: '1648',
    word: 'DÉBORDEMENT',
    sentence: 'La rue parle. Le pouvoir apprend à écouter la foule.'
  },
  {
    date: '1789',
    word: 'PASSAGE',
    sentence: 'Un meuble devient tribune. Le privé devient public.',
    audioUrl: '/audio/passage.mp3' // Placeholder
  },
  {
    date: '1853',
    word: 'PERCEMENT',
    sentence: 'Haussmann tranche. La circulation remplace l\'enchevêtrement.',
    audioUrl: '/audio/percement.mp3' // Placeholder
  },
  {
    date: '1871',
    word: 'SOULÈVEMENT',
    sentence: 'La ville s\'auto-administre. Trop tôt, trop fort.'
  },
  {
    date: '1968',
    word: 'SATURATION',
    sentence: 'La parole déborde partout. Plus rien ne contient le sens.',
    audioUrl: '/audio/saturation.mp3' // Placeholder
  },
  {
    date: 'Aujourd\'hui',
    word: 'SUSPENSION',
    sentence: 'La ville hésite. Elle attend un nouveau geste.'
  }
];

/**
 * HISTOIRE — VERTICAL FADER
 * 
 * History as apparition, not navigation.
 * Scroll reveals, doesn't control.
 * 
 * One date, one word, one sentence.
 * At the center. Always replacing itself.
 * 
 * Unstable. Alive. Fragmentary. Inevitable.
 */
export function HistoireArchives({ onBack }: HistoireProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      
      // Map scroll to continuous progress (0 to MOMENTS.length - 1)
      const progress = (scrollTop / scrollHeight) * (MOMENTS.length - 1);
      setScrollProgress(Math.max(0, Math.min(progress, MOMENTS.length - 1)));
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initialize
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle audio playback
  const handleAudioToggle = () => {
    const moment = MOMENTS[currentIndex];
    
    if (!moment.audioUrl) return;

    if (isPlaying && playingIndex === currentIndex) {
      // Stop current audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      setPlayingIndex(null);
    } else {
      // Stop any existing audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Start new audio
      const audio = new Audio(moment.audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlaying(false);
        setPlayingIndex(null);
      };
      
      audio.onerror = () => {
        console.log('Audio file not found (placeholder)');
        setIsPlaying(false);
        setPlayingIndex(null);
      };
      
      audio.play().catch(() => {
        // Silently handle play errors (placeholder files)
        setIsPlaying(false);
        setPlayingIndex(null);
      });
      
      setIsPlaying(true);
      setPlayingIndex(currentIndex);
    }
  };

  // Get current and next moment based on scroll progress
  const currentIndex = Math.floor(scrollProgress);
  const nextIndex = Math.min(currentIndex + 1, MOMENTS.length - 1);
  const transition = scrollProgress - currentIndex; // 0 to 1

  const currentMoment = MOMENTS[currentIndex];
  const nextMoment = MOMENTS[nextIndex];

  // Stop audio if scrolling away from playing moment
  useEffect(() => {
    if (playingIndex !== null && playingIndex !== currentIndex) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      setPlayingIndex(null);
    }
  }, [currentIndex, playingIndex]);

  // Calculate opacities (never reach 100%)
  const currentOpacity = Math.max(0, (1 - transition) * 0.85);
  const nextOpacity = Math.max(0, transition * 0.85);

  // Calculate blur during transition
  const blurAmount = Math.sin(transition * Math.PI) * 2; // 0 -> 2 -> 0
  
  // Geometric animation during audio playback
  const geometricOpacity = isPlaying && playingIndex === currentIndex 
    ? 0.025 
    : 0.008;
  const geometricRotation = isPlaying && playingIndex === currentIndex 
    ? Date.now() / 100 % 360 
    : 0;

  return (
    <div 
      style={{ 
        background: '#FAF8F3',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        overflow: 'hidden'
      }}
    >
      {/* Ghost Grid */}
      <MamlukGrid pattern="cross" opacity={geometricOpacity} scale={1.8} rotation={geometricRotation} layers={1} />

      {/* Back button */}
      <BackButton onClick={onBack} />

      {/* Title (very subtle) */}
      <div
        style={{
          position: 'fixed',
          top: 'var(--space-xl)',
          right: 'var(--space-xl)',
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#003D2C',
          opacity: 0.2,
          zIndex: 1000
        }}
      >
        HISTOIRE
      </div>

      {/* Cross structure */}
      {/* Horizontal line (temporal plane) */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '0',
          right: '0',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(0, 61, 44, 0.12) 30%, rgba(0, 61, 44, 0.12) 70%, transparent)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Vertical line (present moment) */}
      <div
        style={{
          position: 'fixed',
          top: '0',
          bottom: '0',
          left: '50%',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(0, 61, 44, 0.12) 20%, rgba(0, 61, 44, 0.12) 80%, transparent)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Center intersection marker (very subtle) */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          border: '1px solid rgba(0, 61, 44, 0.15)',
          background: '#FAF8F3',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* Invisible scroll container */}
      <div
        ref={scrollContainerRef}
        style={{
          height: '100vh',
          overflow: 'auto',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Spacer to create scroll space */}
        <div style={{ height: `${MOMENTS.length * 100}vh` }} />
      </div>

      {/* Content layer (fixed at center) */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 10,
          pointerEvents: 'none',
          width: '90%',
          maxWidth: '800px'
        }}
      >
        {/* Current moment (fading out) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            opacity: currentOpacity,
            filter: `blur(${blurAmount * 0.5}px)`,
            transition: 'filter 0.2s ease-out'
          }}
        >
          {/* Date */}
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#003D2C',
              opacity: 0.6,
              marginBottom: 'var(--space-xl)'
            }}
          >
            {currentMoment.date}
          </div>

          {/* Word */}
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(48px, 8vw, 80px)',
              fontWeight: '500',
              letterSpacing: '0.02em',
              color: '#1A1A1A',
              marginBottom: 'var(--space-xl)',
              lineHeight: '1'
            }}
          >
            {currentMoment.word}
          </div>

          {/* Sentence */}
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(17px, 2.5vw, 22px)',
              lineHeight: '1.6',
              color: '#1A1A1A',
              opacity: 0.7,
              fontStyle: 'italic'
            }}
          >
            {currentMoment.sentence}
          </div>
        </div>

        {/* Next moment (fading in) */}
        {currentIndex !== nextIndex && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              opacity: nextOpacity,
              filter: `blur(${blurAmount * 0.5}px)`,
              transition: 'filter 0.2s ease-out'
            }}
          >
            {/* Date */}
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#003D2C',
                opacity: 0.6,
                marginBottom: 'var(--space-xl)'
              }}
            >
              {nextMoment.date}
            </div>

            {/* Word */}
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(48px, 8vw, 80px)',
                fontWeight: '500',
                letterSpacing: '0.02em',
                color: '#1A1A1A',
                marginBottom: 'var(--space-xl)',
                lineHeight: '1'
              }}
            >
              {nextMoment.word}
            </div>

            {/* Sentence */}
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(17px, 2.5vw, 22px)',
                lineHeight: '1.6',
                color: '#1A1A1A',
                opacity: 0.7,
                fontStyle: 'italic'
              }}
            >
              {nextMoment.sentence}
            </div>
          </div>
        )}
      </div>

      {/* Audio trigger (if available for current moment) */}
      {currentMoment.audioUrl && (
        <button
          onClick={handleAudioToggle}
          style={{
            position: 'fixed',
            bottom: 'calc(var(--space-xl) + 60px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: '0.5px solid rgba(0, 61, 44, 0.2)',
            background: isPlaying && playingIndex === currentIndex 
              ? 'rgba(0, 61, 44, 0.08)' 
              : 'rgba(250, 248, 243, 0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            pointerEvents: 'auto',
            transition: 'all 0.4s ease',
            opacity: currentOpacity > 0.5 ? 0.6 : 0,
            zIndex: 100
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = currentOpacity > 0.5 ? '1' : '0';
            e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = currentOpacity > 0.5 ? '0.6' : '0';
            e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
          }}
          aria-label="Écouter le fragment"
        >
          <Volume2 
            size={16} 
            style={{
              color: '#003D2C',
              opacity: 0.7,
              animation: isPlaying && playingIndex === currentIndex 
                ? 'pulse 2s ease-in-out infinite' 
                : 'none'
            }}
          />
        </button>
      )}

      {/* Bottom hint (very subtle) */}
      <div
        style={{
          position: 'fixed',
          bottom: 'var(--space-xl)',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-serif)',
          fontSize: '13px',
          fontStyle: 'italic',
          color: '#1A1A1A',
          opacity: 0.2,
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 100
        }}
      >
        La ville se souvenir par fragments.
      </div>

      {/* Hide scrollbar + animations */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}