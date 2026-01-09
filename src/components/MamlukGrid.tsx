import { useMemo } from 'react';

type Pattern = 'star8' | 'star12' | 'star16' | 'interlace' | 'tessellation';

interface MamlukGridProps {
  pattern?: Pattern;
  opacity?: number;
  scale?: number;
  rotation?: number;
  color?: string;
  layers?: number;
}

/**
 * GHOST GRID GÉOMÉTRIQUE MAMLUK
 * 
 * Système de grilles architecturales invisibles inspiré de la géométrie islamique mamluk.
 * Crée une structure spatiale sous-jacente qui guide l'œil sans être visible consciemment.
 * 
 * Philosophie : "La géométrie sacrée devient une lens sur le vrai Paris"
 * 
 * Patterns disponibles :
 * - star8 : Étoile à 8 branches (géométrie ottomane)
 * - star12 : Étoile à 12 branches (complexité mamluk)
 * - star16 : Étoile à 16 branches (densité maximale)
 * - interlace : Entrelacs géométriques
 * - tessellation : Tessellation hexagonale
 */
export function MamlukGrid({
  pattern = 'star8',
  opacity = 0.03,
  scale = 1,
  rotation = 0,
  color = '#003D2C',
  layers = 1
}: MamlukGridProps) {
  
  // Génération du pattern SVG selon le type
  const svgPattern = useMemo(() => {
    switch (pattern) {
      case 'star8':
        return generateStar8();
      case 'star12':
        return generateStar12();
      case 'star16':
        return generateStar16();
      case 'interlace':
        return generateInterlace();
      case 'tessellation':
        return generateTessellation();
      default:
        return generateStar8();
    }
  }, [pattern]);

  // Génère plusieurs layers avec rotation/échelle différentes
  const gridLayers = useMemo(() => {
    const layersArray = [];
    for (let i = 0; i < layers; i++) {
      const layerRotation = rotation + (i * 15); // Décalage de 15° entre chaque layer
      const layerScale = scale * (1 - i * 0.1); // Échelle décroissante
      const layerOpacity = opacity * (1 - i * 0.2); // Opacité décroissante
      
      layersArray.push({
        rotation: layerRotation,
        scale: layerScale,
        opacity: layerOpacity
      });
    }
    return layersArray;
  }, [layers, rotation, scale, opacity]);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      {gridLayers.map((layer, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200%',
            height: '200%',
            transform: `translate(-50%, -50%) rotate(${layer.rotation}deg) scale(${layer.scale})`,
            opacity: layer.opacity,
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgPattern)}")`,
            backgroundSize: '400px 400px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center'
          }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PATTERNS GÉOMÉTRIQUES MAMLUK
// ═══════════════════════════════════════════════════════════════════════════

function generateStar8(): string {
  return `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="star8" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
          <!-- Étoile centrale à 8 branches -->
          <g transform="translate(200, 200)">
            ${Array.from({ length: 8 }, (_, i) => {
              const angle = (i * 45) * Math.PI / 180;
              const x1 = Math.cos(angle) * 60;
              const y1 = Math.sin(angle) * 60;
              const x2 = Math.cos(angle) * 120;
              const y2 = Math.sin(angle) * 120;
              return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#003D2C" stroke-width="0.5" />`;
            }).join('')}
            
            <!-- Cercle central -->
            <circle cx="0" cy="0" r="60" fill="none" stroke="#003D2C" stroke-width="0.5" />
            <circle cx="0" cy="0" r="120" fill="none" stroke="#003D2C" stroke-width="0.3" />
            
            <!-- Polygone octogonal -->
            ${Array.from({ length: 8 }, (_, i) => {
              const angle1 = (i * 45) * Math.PI / 180;
              const angle2 = ((i + 1) * 45) * Math.PI / 180;
              const x1 = Math.cos(angle1) * 80;
              const y1 = Math.sin(angle1) * 80;
              const x2 = Math.cos(angle2) * 80;
              const y2 = Math.sin(angle2) * 80;
              return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#003D2C" stroke-width="0.5" />`;
            }).join('')}
          </g>
          
          <!-- Étoiles secondaires aux coins -->
          ${[
            { x: 0, y: 0 },
            { x: 400, y: 0 },
            { x: 0, y: 400 },
            { x: 400, y: 400 }
          ].map(pos => `
            <g transform="translate(${pos.x}, ${pos.y})">
              <circle cx="0" cy="0" r="30" fill="none" stroke="#003D2C" stroke-width="0.3" opacity="0.5" />
              ${Array.from({ length: 8 }, (_, i) => {
                const angle = (i * 45) * Math.PI / 180;
                const x = Math.cos(angle) * 30;
                const y = Math.sin(angle) * 30;
                return `<line x1="0" y1="0" x2="${x}" y2="${y}" stroke="#003D2C" stroke-width="0.3" opacity="0.5" />`;
              }).join('')}
            </g>
          `).join('')}
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#star8)" />
    </svg>
  `;
}

function generateStar12(): string {
  return `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="star12" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
          <g transform="translate(200, 200)">
            <!-- Étoile à 12 branches -->
            ${Array.from({ length: 12 }, (_, i) => {
              const angle = (i * 30) * Math.PI / 180;
              const x1 = Math.cos(angle) * 50;
              const y1 = Math.sin(angle) * 50;
              const x2 = Math.cos(angle) * 110;
              const y2 = Math.sin(angle) * 110;
              return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#003D2C" stroke-width="0.4" />`;
            }).join('')}
            
            <!-- Cercles concentriques -->
            <circle cx="0" cy="0" r="50" fill="none" stroke="#003D2C" stroke-width="0.5" />
            <circle cx="0" cy="0" r="80" fill="none" stroke="#003D2C" stroke-width="0.3" />
            <circle cx="0" cy="0" r="110" fill="none" stroke="#003D2C" stroke-width="0.3" />
            
            <!-- Dodécagone -->
            ${Array.from({ length: 12 }, (_, i) => {
              const angle1 = (i * 30) * Math.PI / 180;
              const angle2 = ((i + 1) * 30) * Math.PI / 180;
              const x1 = Math.cos(angle1) * 90;
              const y1 = Math.sin(angle1) * 90;
              const x2 = Math.cos(angle2) * 90;
              const y2 = Math.sin(angle2) * 90;
              return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#003D2C" stroke-width="0.4" />`;
            }).join('')}
          </g>
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#star12)" />
    </svg>
  `;
}

function generateStar16(): string {
  return `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="star16" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
          <g transform="translate(200, 200)">
            <!-- Étoile à 16 branches (densité maximale) -->
            ${Array.from({ length: 16 }, (_, i) => {
              const angle = (i * 22.5) * Math.PI / 180;
              const x1 = Math.cos(angle) * 40;
              const y1 = Math.sin(angle) * 40;
              const x2 = Math.cos(angle) * 100;
              const y2 = Math.sin(angle) * 100;
              return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#003D2C" stroke-width="0.3" />`;
            }).join('')}
            
            <!-- Cercles -->
            <circle cx="0" cy="0" r="40" fill="none" stroke="#003D2C" stroke-width="0.5" />
            <circle cx="0" cy="0" r="70" fill="none" stroke="#003D2C" stroke-width="0.3" />
            <circle cx="0" cy="0" r="100" fill="none" stroke="#003D2C" stroke-width="0.3" />
            
            <!-- Polygone 16 côtés -->
            ${Array.from({ length: 16 }, (_, i) => {
              const angle1 = (i * 22.5) * Math.PI / 180;
              const angle2 = ((i + 1) * 22.5) * Math.PI / 180;
              const x1 = Math.cos(angle1) * 85;
              const y1 = Math.sin(angle1) * 85;
              const x2 = Math.cos(angle2) * 85;
              const y2 = Math.sin(angle2) * 85;
              return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#003D2C" stroke-width="0.3" />`;
            }).join('')}
          </g>
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#star16)" />
    </svg>
  `;
}

function generateInterlace(): string {
  return `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="interlace" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
          <!-- Grille d'entrelacs -->
          ${Array.from({ length: 5 }, (_, i) => {
            const y = i * 100;
            return `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="#003D2C" stroke-width="0.3" />`;
          }).join('')}
          
          ${Array.from({ length: 5 }, (_, i) => {
            const x = i * 100;
            return `<line x1="${x}" y1="0" x2="${x}" y2="400" stroke="#003D2C" stroke-width="0.3" />`;
          }).join('')}
          
          <!-- Diagonales -->
          ${Array.from({ length: 4 }, (_, i) => {
            const offset = i * 100;
            return `
              <line x1="${offset}" y1="0" x2="${offset + 100}" y2="100" stroke="#003D2C" stroke-width="0.2" opacity="0.5" />
              <line x1="0" y1="${offset}" x2="100" y2="${offset + 100}" stroke="#003D2C" stroke-width="0.2" opacity="0.5" />
            `;
          }).join('')}
          
          <!-- Cercles aux intersections -->
          ${Array.from({ length: 5 }, (_, i) => 
            Array.from({ length: 5 }, (_, j) => {
              const x = i * 100;
              const y = j * 100;
              return `<circle cx="${x}" cy="${y}" r="8" fill="none" stroke="#003D2C" stroke-width="0.3" />`;
            }).join('')
          ).join('')}
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#interlace)" />
    </svg>
  `;
}

function generateTessellation(): string {
  return `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="tessellation" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
          <!-- Tessellation hexagonale -->
          ${Array.from({ length: 4 }, (_, row) =>
            Array.from({ length: 4 }, (_, col) => {
              const size = 50;
              const cx = col * size * 1.73 + (row % 2) * size * 0.866;
              const cy = row * size * 1.5;
              
              // Hexagone
              const points = Array.from({ length: 6 }, (_, i) => {
                const angle = (i * 60 - 30) * Math.PI / 180;
                const x = cx + Math.cos(angle) * size;
                const y = cy + Math.sin(angle) * size;
                return `${x},${y}`;
              }).join(' ');
              
              return `
                <polygon points="${points}" fill="none" stroke="#003D2C" stroke-width="0.3" />
                <circle cx="${cx}" cy="${cy}" r="${size * 0.3}" fill="none" stroke="#003D2C" stroke-width="0.2" opacity="0.5" />
              `;
            }).join('')
          ).join('')}
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#tessellation)" />
    </svg>
  `;
}
