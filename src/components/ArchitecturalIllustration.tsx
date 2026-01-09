interface ArchitecturalIllustrationProps {
  variant?: 'haussmann' | 'passage' | 'hotel' | 'montmartre';
  size?: 'small' | 'medium' | 'large';
  opacity?: number;
}

export function ArchitecturalIllustration({ 
  variant = 'haussmann', 
  size = 'medium',
  opacity = 0.12 
}: ArchitecturalIllustrationProps) {
  const dimensions = {
    small: { width: 180, height: 100 },
    medium: { width: 280, height: 140 },
    large: { width: 360, height: 180 }
  };

  const dim = dimensions[size];

  if (variant === 'haussmann') {
    return (
      <svg width={dim.width} height={dim.height} viewBox="0 0 280 140" fill="none" style={{ opacity }}>
        {/* Main building structure */}
        <rect x="40" y="30" width="200" height="100" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        
        {/* Floor divisions */}
        <line x1="40" y1="60" x2="240" y2="60" stroke="var(--ink)" strokeWidth="0.5"/>
        <line x1="40" y1="95" x2="240" y2="95" stroke="var(--ink)" strokeWidth="0.5"/>
        
        {/* Windows - Floor 1 */}
        <rect x="60" y="38" width="30" height="18" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <line x1="75" y1="38" x2="75" y2="56" stroke="var(--ink)" strokeWidth="0.5"/>
        <rect x="110" y="38" width="30" height="18" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <line x1="125" y1="38" x2="125" y2="56" stroke="var(--ink)" strokeWidth="0.5"/>
        <rect x="160" y="38" width="30" height="18" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <line x1="175" y1="38" x2="175" y2="56" stroke="var(--ink)" strokeWidth="0.5"/>
        <rect x="210" y="38" width="22" height="18" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <line x1="221" y1="38" x2="221" y2="56" stroke="var(--ink)" strokeWidth="0.5"/>
        
        {/* Windows - Floor 2 */}
        <rect x="60" y="68" width="30" height="22" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <line x1="75" y1="68" x2="75" y2="90" stroke="var(--ink)" strokeWidth="0.5"/>
        <rect x="110" y="68" width="30" height="22" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <line x1="125" y1="68" x2="125" y2="90" stroke="var(--ink)" strokeWidth="0.5"/>
        <rect x="160" y="68" width="30" height="22" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <line x1="175" y1="68" x2="175" y2="90" stroke="var(--ink)" strokeWidth="0.5"/>
        <rect x="210" y="68" width="22" height="22" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <line x1="221" y1="68" x2="221" y2="90" stroke="var(--ink)" strokeWidth="0.5"/>
        
        {/* Balcony line */}
        <line x1="40" y1="93" x2="240" y2="93" stroke="var(--ink)" strokeWidth="1"/>
        
        {/* Ground floor door */}
        <rect x="125" y="103" width="30" height="27" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <line x1="140" y1="103" x2="140" y2="130" stroke="var(--ink)" strokeWidth="0.5"/>
        
        {/* Decorative corner details */}
        <path d="M 40 30 L 40 25 L 45 25" stroke="var(--ink)" strokeWidth="0.75" fill="none"/>
        <path d="M 240 30 L 240 25 L 235 25" stroke="var(--ink)" strokeWidth="0.75" fill="none"/>
      </svg>
    );
  }

  if (variant === 'passage') {
    return (
      <svg width={dim.width} height={dim.height} viewBox="0 0 280 140" fill="none" style={{ opacity }}>
        {/* Passage structure */}
        <rect x="60" y="20" width="160" height="110" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        
        {/* Glass roof structure */}
        <path d="M 60 20 L 140 10 L 220 20" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <line x1="80" y1="20" x2="80" y2="15" stroke="var(--ink)" strokeWidth="0.5"/>
        <line x1="100" y1="20" x2="100" y2="12" stroke="var(--ink)" strokeWidth="0.5"/>
        <line x1="120" y1="20" x2="120" y2="11" stroke="var(--ink)" strokeWidth="0.5"/>
        <line x1="140" y1="20" x2="140" y2="10" stroke="var(--ink)" strokeWidth="0.5"/>
        <line x1="160" y1="20" x2="160" y2="11" stroke="var(--ink)" strokeWidth="0.5"/>
        <line x1="180" y1="20" x2="180" y2="12" stroke="var(--ink)" strokeWidth="0.5"/>
        <line x1="200" y1="20" x2="200" y2="15" stroke="var(--ink)" strokeWidth="0.5"/>
        
        {/* Storefronts */}
        <rect x="70" y="70" width="35" height="50" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <rect x="115" y="70" width="35" height="50" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <rect x="160" y="70" width="35" height="50" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <rect x="205" y="70" width="10" height="50" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        
        {/* Floor tiles pattern */}
        <path d="M 60 120 L 220 120" stroke="var(--ink)" strokeWidth="0.5" strokeDasharray="2 2"/>
      </svg>
    );
  }

  if (variant === 'montmartre') {
    return (
      <svg width={dim.width} height={dim.height} viewBox="0 0 280 140" fill="none" style={{ opacity }}>
        {/* Sloped roofs and irregular buildings */}
        <path d="M 50 80 L 50 120 L 100 120 L 100 70 L 75 50 Z" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <path d="M 100 80 L 100 120 L 160 120 L 160 60 L 130 40 Z" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <path d="M 160 90 L 160 120 L 210 120 L 210 75 L 185 55 Z" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        
        {/* Windows */}
        <rect x="60" y="90" width="15" height="20" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <rect x="110" y="75" width="18" height="24" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        <rect x="170" y="95" width="15" height="18" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        
        {/* Chimney */}
        <rect x="140" y="30" width="8" height="15" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
        
        {/* Steps */}
        <path d="M 30 110 L 40 110 L 40 115 L 50 115 L 50 120" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
      </svg>
    );
  }

  // Hotel variant
  return (
    <svg width={dim.width} height={dim.height} viewBox="0 0 280 140" fill="none" style={{ opacity }}>
      {/* Elegant hotel facade */}
      <rect x="50" y="30" width="180" height="100" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
      
      {/* Decorative top */}
      <path d="M 50 30 L 140 20 L 230 30" stroke="var(--ink)" strokeWidth="0.75" fill="none"/>
      
      {/* Floors */}
      <line x1="50" y1="60" x2="230" y2="60" stroke="var(--ink)" strokeWidth="0.5"/>
      <line x1="50" y1="90" x2="230" y2="90" stroke="var(--ink)" strokeWidth="0.5"/>
      
      {/* Symmetrical windows */}
      <rect x="70" y="40" width="20" height="15" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
      <rect x="110" y="40" width="20" height="15" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
      <rect x="150" y="40" width="20" height="15" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
      <rect x="190" y="40" width="20" height="15" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
      
      {/* Grand entrance */}
      <rect x="125" y="100" width="30" height="30" stroke="var(--ink)" strokeWidth="0.75" fill="none"/>
      <path d="M 125 115 L 140 115 L 140 130" stroke="var(--ink)" strokeWidth="0.5"/>
      
      {/* Awning */}
      <path d="M 115 100 L 140 95 L 165 100" stroke="var(--ink)" strokeWidth="0.5" fill="none"/>
    </svg>
  );
}
