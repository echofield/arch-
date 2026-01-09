interface ManuscriptGeometryProps {
  opacity?: number;
}

export function ManuscriptGeometry({ opacity = 0.04 }: ManuscriptGeometryProps) {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 760 1000" 
      style={{ 
        position: 'absolute',
        inset: 0,
        opacity,
        pointerEvents: 'none'
      }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Golden ratio constant φ ≈ 1.618 */}
        {/* Mamluk card proportion 2.5:3.5 = 5:7 */}
      </defs>

      <g stroke="var(--ink)" fill="none" strokeWidth="0.5">
        {/* 16th-century manuscript margins - traditional proportions */}
        {/* Inner margin: 1 unit, Top: 1.5 units, Outer: 2 units, Bottom: 2.5 units */}
        <rect x="80" y="100" width="600" height="800" opacity="0.3" />
        
        {/* Column guides - traditional two-column manuscript */}
        <line x1="380" y1="100" x2="380" y2="900" opacity="0.2" />
        
        {/* Egyptian diagonal grid - 45° anchors */}
        <line x1="80" y1="100" x2="380" y2="500" opacity="0.15" />
        <line x1="380" y1="100" x2="680" y2="500" opacity="0.15" />
        <line x1="680" y1="100" x2="380" y2="500" opacity="0.15" />
        
        {/* Diagonal mirror */}
        <line x1="80" y1="900" x2="380" y2="500" opacity="0.15" />
        <line x1="680" y1="900" x2="380" y2="500" opacity="0.15" />
        
        {/* Golden ratio circles - centered on compositional anchors */}
        {/* φ radius relationships: r, r*φ, r*φ² */}
        <circle cx="380" cy="300" r="100" opacity="0.2" />
        <circle cx="380" cy="300" r="161.8" opacity="0.15" />
        <circle cx="380" cy="300" r="261.8" opacity="0.1" />
        
        <circle cx="380" cy="700" r="80" opacity="0.2" />
        <circle cx="380" cy="700" r="129.4" opacity="0.15" />
        
        {/* Radial anchors - 8-point symmetry from center */}
        <g opacity="0.12">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 380;
            const y1 = 500;
            const x2 = 380 + Math.cos(rad) * 150;
            const y2 = 500 + Math.sin(rad) * 150;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
        
        {/* Mamluk proportion grid - 5:7 ratio */}
        {/* Create subdivisions based on 5:7 */}
        <g opacity="0.15">
          {/* Horizontal divisions (7 parts) */}
          {[1, 2, 3, 4, 5, 6].map(i => (
            <line 
              key={`h${i}`} 
              x1="80" 
              y1={100 + (800/7) * i} 
              x2="680" 
              y2={100 + (800/7) * i} 
              opacity="0.5"
            />
          ))}
          
          {/* Vertical divisions (5 parts) */}
          {[1, 2, 3, 4].map(i => (
            <line 
              key={`v${i}`} 
              x1={80 + (600/5) * i} 
              y1="100" 
              x2={80 + (600/5) * i} 
              y2="900" 
              opacity="0.5"
            />
          ))}
        </g>
        
        {/* Medieval ruling lines - text baseline guides */}
        <g opacity="0.08">
          {Array.from({ length: 24 }, (_, i) => (
            <line 
              key={i} 
              x1="100" 
              y1={140 + i * 32} 
              x2="660" 
              y2={140 + i * 32} 
              strokeWidth="0.25"
            />
          ))}
        </g>
        
        {/* Corner ornaments - subtle architectural frames */}
        <g opacity="0.2">
          {/* Top left */}
          <path d="M 80 100 L 100 100 M 80 100 L 80 120" strokeWidth="0.75" />
          {/* Top right */}
          <path d="M 660 100 L 680 100 M 680 100 L 680 120" strokeWidth="0.75" />
          {/* Bottom left */}
          <path d="M 80 880 L 80 900 M 80 900 L 100 900" strokeWidth="0.75" />
          {/* Bottom right */}
          <path d="M 680 880 L 680 900 M 660 900 L 680 900" strokeWidth="0.75" />
        </g>
        
        {/* Golden section marker - vertical golden division */}
        <line 
          x1="80" 
          y1={100 + 800/1.618} 
          x2="680" 
          y2={100 + 800/1.618} 
          opacity="0.1" 
          strokeWidth="0.75"
        />
      </g>
    </svg>
  );
}
