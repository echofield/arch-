import * as React from 'react';

interface GeometricBackgroundProps {
  composition: 'homepage' | 'results' | 'codex' | 'pathways' | 'cards' | 'histoire';
  opacity?: number;
}

export function GeometricBackground({ composition, opacity = 0.04 }: GeometricBackgroundProps) {
  const color = 'var(--ink)';
  
  const renderHomepage = () => (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 1200 1600" 
      style={{ 
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        opacity
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      <g transform="translate(600, 500)">
        <circle cx="0" cy="0" r="120" fill="none" stroke={color} strokeWidth="0.5" />
        <circle cx="0" cy="0" r="194" fill="none" stroke={color} strokeWidth="0.5" />
        <circle cx="0" cy="0" r="314" fill="none" stroke={color} strokeWidth="0.5" />
        <circle cx="0" cy="0" r="508" fill="none" stroke={color} strokeWidth="0.5" />
        
        <rect x="-89" y="-89" width="178" height="178" fill="none" stroke={color} strokeWidth="0.5" />
        <rect x="-144" y="-144" width="288" height="288" fill="none" stroke={color} strokeWidth="0.5" />
        <rect x="-233" y="-233" width="466" height="466" fill="none" stroke={color} strokeWidth="0.5" />
        
        <line x1="-600" y1="0" x2="600" y2="0" stroke={color} strokeWidth="0.5" />
        <line x1="0" y1="-500" x2="0" y2="500" stroke={color} strokeWidth="0.5" />
        
        <line x1="-400" y1="-400" x2="400" y2="400" stroke={color} strokeWidth="0.3" opacity="0.5" />
        <line x1="-400" y1="400" x2="400" y2="-400" stroke={color} strokeWidth="0.3" opacity="0.5" />
        
        <line x1="-85" y1="-85" x2="339" y2="339" stroke={color} strokeWidth="0.25" opacity="0.4" />
        <line x1="0" y1="-120" x2="0" y2="508" stroke={color} strokeWidth="0.25" opacity="0.4" />
        <line x1="85" y1="-85" x2="-339" y2="339" stroke={color} strokeWidth="0.25" opacity="0.4" />
        <line x1="120" y1="0" x2="-508" y2="0" stroke={color} strokeWidth="0.25" opacity="0.4" />
        <line x1="85" y1="85" x2="-339" y2="-339" stroke={color} strokeWidth="0.25" opacity="0.4" />
        <line x1="0" y1="120" x2="0" y2="-508" stroke={color} strokeWidth="0.25" opacity="0.4" />
        <line x1="-85" y1="85" x2="339" y2="-339" stroke={color} strokeWidth="0.25" opacity="0.4" />
        <line x1="-120" y1="0" x2="508" y2="0" stroke={color} strokeWidth="0.25" opacity="0.4" />
        
        <circle cx="0" cy="0" r="2" fill={color} opacity="0.6" />
      </g>
    </svg>
  );
  
  const renderResults = () => (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 1200 1600" 
      style={{ 
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        opacity
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      <g>
        <line x1="370" y1="0" x2="370" y2="1600" stroke={color} strokeWidth="0.5" />
        <line x1="600" y1="0" x2="600" y2="1600" stroke={color} strokeWidth="0.5" />
        <line x1="830" y1="0" x2="830" y2="1600" stroke={color} strokeWidth="0.5" />
        
        <line x1="0" y1="400" x2="1200" y2="400" stroke={color} strokeWidth="0.5" />
        <line x1="0" y1="800" x2="1200" y2="800" stroke={color} strokeWidth="0.5" />
        <line x1="0" y1="1200" x2="1200" y2="1200" stroke={color} strokeWidth="0.5" />
        
        <circle cx="300" cy="400" r="120" fill="none" stroke={color} strokeWidth="0.4" opacity="0.6" />
        <circle cx="900" cy="800" r="120" fill="none" stroke={color} strokeWidth="0.4" opacity="0.6" />
        
        <line x1="0" y1="0" x2="300" y2="300" stroke={color} strokeWidth="0.3" opacity="0.4" />
        <line x1="1200" y1="0" x2="900" y2="300" stroke={color} strokeWidth="0.3" opacity="0.4" />
      </g>
    </svg>
  );
  
  const renderCodex = () => (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 1200 1600" 
      style={{ 
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        opacity
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      <g>
        <rect x="150" y="100" width="900" height="1400" fill="none" stroke={color} strokeWidth="0.5" />
        <rect x="200" y="150" width="800" height="1300" fill="none" stroke={color} strokeWidth="0.3" />
        
        <line x1="600" y1="150" x2="600" y2="1450" stroke={color} strokeWidth="0.4" />
        
        <line x1="200" y1="250" x2="1000" y2="250" stroke={color} strokeWidth="0.25" opacity="0.5" />
        <line x1="200" y1="350" x2="1000" y2="350" stroke={color} strokeWidth="0.25" opacity="0.5" />
        <line x1="200" y1="450" x2="1000" y2="450" stroke={color} strokeWidth="0.25" opacity="0.5" />
        <line x1="200" y1="550" x2="1000" y2="550" stroke={color} strokeWidth="0.25" opacity="0.5" />
        <line x1="200" y1="650" x2="1000" y2="650" stroke={color} strokeWidth="0.25" opacity="0.5" />
        <line x1="200" y1="750" x2="1000" y2="750" stroke={color} strokeWidth="0.25" opacity="0.5" />
        <line x1="200" y1="850" x2="1000" y2="850" stroke={color} strokeWidth="0.25" opacity="0.5" />
        <line x1="200" y1="950" x2="1000" y2="950" stroke={color} strokeWidth="0.25" opacity="0.5" />
        <line x1="200" y1="1050" x2="1000" y2="1050" stroke={color} strokeWidth="0.25" opacity="0.5" />
        <line x1="200" y1="1150" x2="1000" y2="1150" stroke={color} strokeWidth="0.25" opacity="0.5" />
        <line x1="200" y1="1250" x2="1000" y2="1250" stroke={color} strokeWidth="0.25" opacity="0.5" />
        <line x1="200" y1="1350" x2="1000" y2="1350" stroke={color} strokeWidth="0.25" opacity="0.5" />
        
        <rect x="148" y="98" width="8" height="8" fill="none" stroke={color} strokeWidth="0.4" />
        <rect x="1044" y="98" width="8" height="8" fill="none" stroke={color} strokeWidth="0.4" />
        <rect x="148" y="1494" width="8" height="8" fill="none" stroke={color} strokeWidth="0.4" />
        <rect x="1044" y="1494" width="8" height="8" fill="none" stroke={color} strokeWidth="0.4" />
      </g>
    </svg>
  );
  
  const renderPathways = () => (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 1200 1600" 
      style={{ 
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        opacity
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      <g transform="translate(600, 800)">
        <polygon points="150,0 106.1,106.1 0,150 -106.1,106.1 -150,0 -106.1,-106.1 0,-150 106.1,-106.1" fill="none" stroke={color} strokeWidth="0.4" opacity="0.7" />
        <polygon points="250,0 176.8,176.8 0,250 -176.8,176.8 -250,0 -176.8,-176.8 0,-250 176.8,-176.8" fill="none" stroke={color} strokeWidth="0.4" opacity="0.55" />
        <polygon points="350,0 247.5,247.5 0,350 -247.5,247.5 -350,0 -247.5,-247.5 0,-350 247.5,-247.5" fill="none" stroke={color} strokeWidth="0.4" opacity="0.4" />
        <polygon points="450,0 318.2,318.2 0,450 -318.2,318.2 -450,0 -318.2,-318.2 0,-450 318.2,-318.2" fill="none" stroke={color} strokeWidth="0.4" opacity="0.25" />
        
        <line x1="0" y1="0" x2="450" y2="0" stroke={color} strokeWidth="0.3" opacity="0.5" />
        <line x1="0" y1="0" x2="318.2" y2="318.2" stroke={color} strokeWidth="0.3" opacity="0.5" />
        <line x1="0" y1="0" x2="0" y2="450" stroke={color} strokeWidth="0.3" opacity="0.5" />
        <line x1="0" y1="0" x2="-318.2" y2="318.2" stroke={color} strokeWidth="0.3" opacity="0.5" />
        <line x1="0" y1="0" x2="-450" y2="0" stroke={color} strokeWidth="0.3" opacity="0.5" />
        <line x1="0" y1="0" x2="-318.2" y2="-318.2" stroke={color} strokeWidth="0.3" opacity="0.5" />
        <line x1="0" y1="0" x2="0" y2="-450" stroke={color} strokeWidth="0.3" opacity="0.5" />
        <line x1="0" y1="0" x2="318.2" y2="-318.2" stroke={color} strokeWidth="0.3" opacity="0.5" />
        
        <rect x="-30" y="-30" width="60" height="60" fill="none" stroke={color} strokeWidth="0.5" />
      </g>
    </svg>
  );
  
  const renderCards = () => (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 1200 1600" 
      style={{ 
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        opacity
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      <g>
        <rect x="200" y="200" width="250" height="350" fill="none" stroke={color} strokeWidth="0.4" opacity="0.6" />
        <line x1="200" y1="200" x2="215" y2="200" stroke={color} strokeWidth="0.5" />
        <line x1="200" y1="200" x2="200" y2="215" stroke={color} strokeWidth="0.5" />
        <line x1="450" y1="200" x2="435" y2="200" stroke={color} strokeWidth="0.5" />
        <line x1="450" y1="200" x2="450" y2="215" stroke={color} strokeWidth="0.5" />
        
        <rect x="650" y="200" width="250" height="350" fill="none" stroke={color} strokeWidth="0.4" opacity="0.6" />
        <line x1="650" y1="200" x2="665" y2="200" stroke={color} strokeWidth="0.5" />
        <line x1="650" y1="200" x2="650" y2="215" stroke={color} strokeWidth="0.5" />
        <line x1="900" y1="200" x2="885" y2="200" stroke={color} strokeWidth="0.5" />
        <line x1="900" y1="200" x2="900" y2="215" stroke={color} strokeWidth="0.5" />
        
        <rect x="200" y="700" width="250" height="350" fill="none" stroke={color} strokeWidth="0.4" opacity="0.6" />
        <line x1="200" y1="700" x2="215" y2="700" stroke={color} strokeWidth="0.5" />
        <line x1="200" y1="700" x2="200" y2="715" stroke={color} strokeWidth="0.5" />
        <line x1="450" y1="700" x2="435" y2="700" stroke={color} strokeWidth="0.5" />
        <line x1="450" y1="700" x2="450" y2="715" stroke={color} strokeWidth="0.5" />
        
        <rect x="650" y="700" width="250" height="350" fill="none" stroke={color} strokeWidth="0.4" opacity="0.6" />
        <line x1="650" y1="700" x2="665" y2="700" stroke={color} strokeWidth="0.5" />
        <line x1="650" y1="700" x2="650" y2="715" stroke={color} strokeWidth="0.5" />
        <line x1="900" y1="700" x2="885" y2="700" stroke={color} strokeWidth="0.5" />
        <line x1="900" y1="700" x2="900" y2="715" stroke={color} strokeWidth="0.5" />
        
        <rect x="200" y="1200" width="250" height="350" fill="none" stroke={color} strokeWidth="0.4" opacity="0.6" />
        <line x1="200" y1="1200" x2="215" y2="1200" stroke={color} strokeWidth="0.5" />
        <line x1="200" y1="1200" x2="200" y2="1215" stroke={color} strokeWidth="0.5" />
        <line x1="450" y1="1200" x2="435" y2="1200" stroke={color} strokeWidth="0.5" />
        <line x1="450" y1="1200" x2="450" y2="1215" stroke={color} strokeWidth="0.5" />
        
        <rect x="650" y="1200" width="250" height="350" fill="none" stroke={color} strokeWidth="0.4" opacity="0.6" />
        <line x1="650" y1="1200" x2="665" y2="1200" stroke={color} strokeWidth="0.5" />
        <line x1="650" y1="1200" x2="650" y2="1215" stroke={color} strokeWidth="0.5" />
        <line x1="900" y1="1200" x2="885" y2="1200" stroke={color} strokeWidth="0.5" />
        <line x1="900" y1="1200" x2="900" y2="1215" stroke={color} strokeWidth="0.5" />
        
        <line x1="600" y1="0" x2="600" y2="1600" stroke={color} strokeWidth="0.3" opacity="0.5" />
      </g>
    </svg>
  );
  
  const renderHistoire = () => (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 1200 1600" 
      style={{ 
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        opacity
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      <g>
        {/* Concentric circles - very large, bleeding outside */}
        <circle cx="600" cy="800" r="250" fill="none" stroke={color} strokeWidth="0.4" opacity="0.8" />
        <circle cx="600" cy="800" r="450" fill="none" stroke={color} strokeWidth="0.4" opacity="0.6" />
        <circle cx="600" cy="800" r="700" fill="none" stroke={color} strokeWidth="0.4" opacity="0.4" />
        <circle cx="600" cy="800" r="1000" fill="none" stroke={color} strokeWidth="0.4" opacity="0.2" />
        
        {/* Vertical manuscript rulings */}
        <line x1="200" y1="0" x2="200" y2="1600" stroke={color} strokeWidth="0.3" opacity="0.5" />
        <line x1="400" y1="0" x2="400" y2="1600" stroke={color} strokeWidth="0.3" opacity="0.5" />
        <line x1="600" y1="0" x2="600" y2="1600" stroke={color} strokeWidth="0.4" opacity="0.6" />
        <line x1="800" y1="0" x2="800" y2="1600" stroke={color} strokeWidth="0.3" opacity="0.5" />
        <line x1="1000" y1="0" x2="1000" y2="1600" stroke={color} strokeWidth="0.3" opacity="0.5" />
        
        {/* 8-direction radial lines from center */}
        <line x1="600" y1="800" x2="1200" y2="800" stroke={color} strokeWidth="0.25" opacity="0.4" />
        <line x1="600" y1="800" x2="1024" y2="1224" stroke={color} strokeWidth="0.25" opacity="0.4" />
        <line x1="600" y1="800" x2="600" y2="1600" stroke={color} strokeWidth="0.25" opacity="0.4" />
        <line x1="600" y1="800" x2="176" y2="1224" stroke={color} strokeWidth="0.25" opacity="0.4" />
        <line x1="600" y1="800" x2="0" y2="800" stroke={color} strokeWidth="0.25" opacity="0.4" />
        <line x1="600" y1="800" x2="176" y2="376" stroke={color} strokeWidth="0.25" opacity="0.4" />
        <line x1="600" y1="800" x2="600" y2="0" stroke={color} strokeWidth="0.25" opacity="0.4" />
        <line x1="600" y1="800" x2="1024" y2="376" stroke={color} strokeWidth="0.25" opacity="0.4" />
        
        {/* Corner registration marks */}
        <g opacity="0.7">
          {/* Top-left */}
          <line x1="40" y1="40" x2="60" y2="40" stroke={color} strokeWidth="0.6" />
          <line x1="40" y1="40" x2="40" y2="60" stroke={color} strokeWidth="0.6" />
          <line x1="55" y1="40" x2="55" y2="55" stroke={color} strokeWidth="0.4" />
          <line x1="40" y1="55" x2="55" y2="55" stroke={color} strokeWidth="0.4" />
          
          {/* Top-right */}
          <line x1="1140" y1="40" x2="1160" y2="40" stroke={color} strokeWidth="0.6" />
          <line x1="1160" y1="40" x2="1160" y2="60" stroke={color} strokeWidth="0.6" />
          <line x1="1145" y1="40" x2="1145" y2="55" stroke={color} strokeWidth="0.4" />
          <line x1="1145" y1="55" x2="1160" y2="55" stroke={color} strokeWidth="0.4" />
          
          {/* Bottom-left */}
          <line x1="40" y1="1540" x2="60" y2="1540" stroke={color} strokeWidth="0.6" />
          <line x1="40" y1="1540" x2="40" y2="1560" stroke={color} strokeWidth="0.6" />
          <line x1="40" y1="1545" x2="55" y2="1545" stroke={color} strokeWidth="0.4" />
          <line x1="55" y1="1545" x2="55" y2="1560" stroke={color} strokeWidth="0.4" />
          
          {/* Bottom-right */}
          <line x1="1140" y1="1540" x2="1160" y2="1540" stroke={color} strokeWidth="0.6" />
          <line x1="1160" y1="1540" x2="1160" y2="1560" stroke={color} strokeWidth="0.6" />
          <line x1="1145" y1="1545" x2="1160" y2="1545" stroke={color} strokeWidth="0.4" />
          <line x1="1145" y1="1545" x2="1145" y2="1560" stroke={color} strokeWidth="0.4" />
        </g>
      </g>
    </svg>
  );
  
  return (
    <div 
      style={{ 
        position: 'absolute', 
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {composition === 'homepage' && renderHomepage()}
      {composition === 'results' && renderResults()}
      {composition === 'codex' && renderCodex()}
      {composition === 'pathways' && renderPathways()}
      {composition === 'cards' && renderCards()}
      {composition === 'histoire' && renderHistoire()}
    </div>
  );
}