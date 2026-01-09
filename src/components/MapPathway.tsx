interface MapPathwayProps {
  variant?: 'simple' | 'complex' | 'circular';
  opacity?: number;
}

export function MapPathway({ variant = 'simple', opacity = 0.08 }: MapPathwayProps) {
  if (variant === 'simple') {
    return (
      <svg width="200" height="120" viewBox="0 0 200 120" fill="none" style={{ opacity }}>
        {/* Simple winding path */}
        <path 
          d="M 20 100 Q 50 80, 80 90 T 140 70 T 180 50" 
          stroke="var(--ink)" 
          strokeWidth="0.5" 
          fill="none"
          strokeDasharray="2 3"
        />
        {/* Landmark dots */}
        <circle cx="20" cy="100" r="2" fill="var(--green)" opacity="0.6" />
        <circle cx="80" cy="90" r="2" fill="var(--gold)" opacity="0.6" />
        <circle cx="180" cy="50" r="2" fill="var(--green)" opacity="0.6" />
      </svg>
    );
  }

  if (variant === 'complex') {
    return (
      <svg width="240" height="160" viewBox="0 0 240 160" fill="none" style={{ opacity }}>
        {/* Multiple intersecting paths */}
        <path 
          d="M 30 140 Q 60 120, 90 130 Q 120 140, 150 120 Q 180 100, 210 110" 
          stroke="var(--ink)" 
          strokeWidth="0.5" 
          fill="none"
          strokeDasharray="2 3"
        />
        <path 
          d="M 40 80 Q 80 60, 120 70 Q 160 80, 200 60" 
          stroke="var(--ink)" 
          strokeWidth="0.5" 
          fill="none"
          strokeDasharray="2 3"
        />
        {/* Street intersections */}
        <line x1="90" y1="130" x2="120" y2="70" stroke="var(--ink)" strokeWidth="0.5" opacity="0.4" />
        <line x1="150" y1="120" x2="160" y2="80" stroke="var(--ink)" strokeWidth="0.5" opacity="0.4" />
        {/* Landmarks */}
        <circle cx="30" cy="140" r="2.5" fill="var(--green)" opacity="0.6" />
        <circle cx="120" cy="70" r="2.5" fill="var(--gold)" opacity="0.6" />
        <circle cx="210" cy="110" r="2.5" fill="var(--green)" opacity="0.6" />
      </svg>
    );
  }

  // Circular
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" style={{ opacity }}>
      {/* Circular path around center */}
      <circle 
        cx="90" 
        cy="90" 
        r="60" 
        stroke="var(--ink)" 
        strokeWidth="0.5" 
        fill="none"
        strokeDasharray="2 3"
      />
      {/* Radial paths */}
      <line x1="90" y1="90" x2="90" y2="30" stroke="var(--ink)" strokeWidth="0.5" opacity="0.3" />
      <line x1="90" y1="90" x2="150" y2="90" stroke="var(--ink)" strokeWidth="0.5" opacity="0.3" />
      <line x1="90" y1="90" x2="90" y2="150" stroke="var(--ink)" strokeWidth="0.5" opacity="0.3" />
      <line x1="90" y1="90" x2="30" y2="90" stroke="var(--ink)" strokeWidth="0.5" opacity="0.3" />
      {/* Center landmark */}
      <circle cx="90" cy="90" r="3" fill="var(--green)" opacity="0.7" />
      {/* Outer landmarks */}
      <circle cx="90" cy="30" r="2" fill="var(--gold)" opacity="0.6" />
      <circle cx="150" cy="90" r="2" fill="var(--gold)" opacity="0.6" />
      <circle cx="90" cy="150" r="2" fill="var(--gold)" opacity="0.6" />
      <circle cx="30" cy="90" r="2" fill="var(--gold)" opacity="0.6" />
    </svg>
  );
}
