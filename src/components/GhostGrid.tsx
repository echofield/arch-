interface GhostGridProps {
  variant?: 'subtle' | 'medium' | 'visible';
  pattern?: 'sacred' | 'geometric' | 'radial' | 'mamluk';
  opacity?: number;
}

export function GhostGrid({ 
  variant = 'subtle', 
  pattern = 'sacred',
  opacity 
}: GhostGridProps) {
  const baseOpacity = opacity ?? (variant === 'subtle' ? 0.08 : variant === 'medium' ? 0.15 : 0.25);
  
  if (pattern === 'sacred') {
    // Golden ratio rectangles + concentric circles
    return (
      <svg 
        width="100%" 
        height="100%" 
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: baseOpacity
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="ghost-sacred" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
            {/* Golden ratio rectangles */}
            <rect x="50" y="50" width="300" height="185.4" stroke="var(--grey-medium)" strokeWidth="0.5" fill="none" />
            <rect x="100" y="100" width="200" height="123.6" stroke="var(--grey-medium)" strokeWidth="0.5" fill="none" />
            
            {/* Concentric circles */}
            <circle cx="200" cy="200" r="150" stroke="var(--grey-medium)" strokeWidth="0.5" fill="none" />
            <circle cx="200" cy="200" r="100" stroke="var(--grey-medium)" strokeWidth="0.5" fill="none" />
            <circle cx="200" cy="200" r="50" stroke="var(--grey-medium)" strokeWidth="0.5" fill="none" />
            
            {/* Diagonal intersections */}
            <line x1="50" y1="50" x2="350" y2="350" stroke="var(--grey-medium)" strokeWidth="0.5" />
            <line x1="350" y1="50" x2="50" y2="350" stroke="var(--grey-medium)" strokeWidth="0.5" />
            
            {/* Vertical divisions */}
            <line x1="200" y1="0" x2="200" y2="400" stroke="var(--grey-medium)" strokeWidth="0.5" />
            
            {/* Horizontal divisions */}
            <line x1="0" y1="200" x2="400" y2="200" stroke="var(--grey-medium)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ghost-sacred)" />
      </svg>
    );
  }

  if (pattern === 'geometric') {
    // Strict grid with nodes
    return (
      <svg 
        width="100%" 
        height="100%" 
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: baseOpacity
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="ghost-geometric" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Grid lines */}
            <line x1="0" y1="0" x2="0" y2="120" stroke="var(--grey-medium)" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="120" y2="0" stroke="var(--grey-medium)" strokeWidth="0.5" />
            <line x1="60" y1="0" x2="60" y2="120" stroke="var(--grey-medium)" strokeWidth="0.5" opacity="0.5" />
            <line x1="0" y1="60" x2="120" y2="60" stroke="var(--grey-medium)" strokeWidth="0.5" opacity="0.5" />
            
            {/* Corner nodes */}
            <circle cx="0" cy="0" r="2" fill="var(--grey-medium)" />
            <circle cx="120" cy="0" r="2" fill="var(--grey-medium)" />
            <circle cx="0" cy="120" r="2" fill="var(--grey-medium)" />
            <circle cx="120" cy="120" r="2" fill="var(--grey-medium)" />
            
            {/* Center node */}
            <circle cx="60" cy="60" r="1.5" fill="var(--gold)" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ghost-geometric)" />
      </svg>
    );
  }

  if (pattern === 'radial') {
    // Radial pathways from center
    return (
      <svg 
        width="100%" 
        height="100%" 
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: baseOpacity
        }}
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Concentric circles */}
        <circle cx="400" cy="400" r="300" stroke="var(--grey-medium)" strokeWidth="0.5" fill="none" />
        <circle cx="400" cy="400" r="240" stroke="var(--grey-medium)" strokeWidth="0.5" fill="none" />
        <circle cx="400" cy="400" r="180" stroke="var(--grey-medium)" strokeWidth="0.5" fill="none" />
        <circle cx="400" cy="400" r="120" stroke="var(--grey-medium)" strokeWidth="0.5" fill="none" />
        <circle cx="400" cy="400" r="60" stroke="var(--grey-medium)" strokeWidth="0.5" fill="none" />
        
        {/* Radial lines (8 directions) */}
        <line x1="400" y1="100" x2="400" y2="700" stroke="var(--grey-medium)" strokeWidth="0.5" />
        <line x1="100" y1="400" x2="700" y2="400" stroke="var(--grey-medium)" strokeWidth="0.5" />
        <line x1="187" y1="187" x2="613" y2="613" stroke="var(--grey-medium)" strokeWidth="0.5" />
        <line x1="613" y1="187" x2="187" y2="613" stroke="var(--grey-medium)" strokeWidth="0.5" />
        <line x1="400" y1="187" x2="400" y2="613" stroke="var(--grey-medium)" strokeWidth="0.5" opacity="0.5" />
        <line x1="187" y1="400" x2="613" y2="400" stroke="var(--grey-medium)" strokeWidth="0.5" opacity="0.5" />
        
        {/* Center point */}
        <circle cx="400" cy="400" r="4" fill="var(--green)" opacity="0.4" />
      </svg>
    );
  }

  // Mamluk - inspired by Islamic geometric patterns
  return (
    <svg 
      width="100%" 
      height="100%" 
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: baseOpacity
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="ghost-mamluk" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          {/* Octagonal star pattern base */}
          <polygon 
            points="100,30 130,60 130,90 100,120 70,90 70,60" 
            stroke="var(--grey-medium)" 
            strokeWidth="0.5" 
            fill="none" 
          />
          
          {/* Inner square rotated */}
          <rect 
            x="75" 
            y="75" 
            width="50" 
            height="50" 
            stroke="var(--grey-medium)" 
            strokeWidth="0.5" 
            fill="none"
            transform="rotate(45 100 100)"
          />
          
          {/* Connecting lines */}
          <line x1="100" y1="0" x2="100" y2="30" stroke="var(--grey-medium)" strokeWidth="0.5" opacity="0.5" />
          <line x1="100" y1="120" x2="100" y2="200" stroke="var(--grey-medium)" strokeWidth="0.5" opacity="0.5" />
          <line x1="0" y1="100" x2="70" y2="100" stroke="var(--grey-medium)" strokeWidth="0.5" opacity="0.5" />
          <line x1="130" y1="100" x2="200" y2="100" stroke="var(--grey-medium)" strokeWidth="0.5" opacity="0.5" />
          
          {/* Corner ornaments */}
          <circle cx="0" cy="0" r="1.5" fill="var(--grey-medium)" />
          <circle cx="200" cy="0" r="1.5" fill="var(--grey-medium)" />
          <circle cx="0" cy="200" r="1.5" fill="var(--grey-medium)" />
          <circle cx="200" cy="200" r="1.5" fill="var(--grey-medium)" />
          
          {/* Center accent */}
          <circle cx="100" cy="100" r="2" fill="var(--gold)" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ghost-mamluk)" />
    </svg>
  );
}