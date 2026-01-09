// Client-side PDF Export for Lettre de Séjour and Carte Poétique
// Uses jsPDF for generation - high-quality letterpress aesthetic

import { jsPDF } from 'jspdf';

interface Node {
  id: string;
  name: string;
  arrondissement: string;
  type: string;
  poeticLine: string;
  atmosphere: string;
  microHistoire: string;
  miniRituel: string;
  quete: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Color palette
const COLORS = {
  parchemin: '#FAF8F2',
  noir: '#262626',
  vertProfond: '#003D2C',
  grisclair: '#8A8A8A',
};

// Typography helpers
const setSerifFont = (doc: jsPDF, size: number) => {
  doc.setFont('times', 'normal');
  doc.setFontSize(size);
};

const setSansFont = (doc: jsPDF, size: number, weight: 'normal' | 'bold' = 'normal') => {
  doc.setFont('helvetica', weight);
  doc.setFontSize(size);
};

// Text wrapping helper
const splitText = (doc: jsPDF, text: string, maxWidth: number): string[] => {
  return doc.splitTextToSize(text, maxWidth);
};

// Export Lettre de Séjour as PDF
export const exportLettreDeSejour = (
  selectedNodes: Node[],
  hotelName: string = 'Le Grand Hôtel',
  guestName?: string
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 25;
  const contentWidth = pageWidth - (margin * 2);
  let currentY = margin;

  // Background color (parchemin)
  doc.setFillColor(COLORS.parchemin);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Header - Hotel identity
  doc.setTextColor(COLORS.vertProfond);
  setSansFont(doc, 9);
  doc.text('PETIT SOUVENIR — ÉDITION HÔTEL', margin, currentY);
  currentY += 6;

  doc.setTextColor(COLORS.noir);
  setSerifFont(doc, 24);
  doc.text(hotelName, margin, currentY);
  currentY += 10;

  doc.setTextColor(COLORS.grisclair);
  setSansFont(doc, 9);
  doc.text('Paris, France', margin, currentY);
  currentY += 20;

  // Title
  doc.setTextColor(COLORS.noir);
  setSerifFont(doc, 18);
  doc.text('Lettre de Séjour', margin, currentY);
  currentY += 8;

  // Date
  doc.setTextColor(COLORS.grisclair);
  setSansFont(doc, 9);
  const dateStr = new Date().toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  doc.text(dateStr, margin, currentY);
  currentY += 15;

  // Introduction
  if (guestName) {
    doc.setTextColor(COLORS.noir);
    setSerifFont(doc, 11);
    const intro = `Cher·e ${guestName},\n\nVoici les lieux que vous avez choisis pour composer votre séjour parisien. Chacun est une invitation à ralentir, observer, habiter.`;
    const introLines = splitText(doc, intro, contentWidth);
    introLines.forEach((line) => {
      doc.text(line, margin, currentY);
      currentY += 6;
    });
    currentY += 10;
  }

  // Decorative line
  doc.setDrawColor(COLORS.vertProfond);
  doc.setLineWidth(0.5);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 15;

  // Nodes list
  selectedNodes.forEach((node, index) => {
    // Check if we need a new page
    if (currentY > pageHeight - 60) {
      doc.addPage();
      doc.setFillColor(COLORS.parchemin);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      currentY = margin;
    }

    // Node number
    doc.setTextColor(COLORS.vertProfond);
    setSansFont(doc, 10, 'bold');
    doc.text(`${index + 1}.`, margin, currentY);

    // Node name
    doc.setTextColor(COLORS.noir);
    setSerifFont(doc, 14);
    doc.text(node.name, margin + 8, currentY);
    currentY += 6;

    // Arrondissement + Type
    doc.setTextColor(COLORS.grisclair);
    setSansFont(doc, 9);
    doc.text(`${node.arrondissement} — ${node.type}`, margin + 8, currentY);
    currentY += 8;

    // Poetic line (italic simulation with serif)
    doc.setTextColor(COLORS.noir);
    setSerifFont(doc, 10);
    const poeticLines = splitText(doc, `"${node.poeticLine}"`, contentWidth - 8);
    poeticLines.forEach((line) => {
      doc.text(line, margin + 8, currentY);
      currentY += 5;
    });
    currentY += 5;

    // Mini rituel
    doc.setTextColor(COLORS.noir);
    setSansFont(doc, 9);
    doc.text('Rituel recommandé:', margin + 8, currentY);
    currentY += 5;
    
    setSerifFont(doc, 9);
    const rituelLines = splitText(doc, node.miniRituel, contentWidth - 8);
    rituelLines.forEach((line) => {
      doc.text(line, margin + 8, currentY);
      currentY += 4.5;
    });
    currentY += 8;

    // Coordinates (if available)
    if (node.coordinates) {
      doc.setTextColor(COLORS.grisclair);
      setSansFont(doc, 8);
      doc.text(`${node.coordinates.lat.toFixed(4)}°N, ${node.coordinates.lng.toFixed(4)}°E`, margin + 8, currentY);
      currentY += 10;
    }

    // Separator line
    doc.setDrawColor(COLORS.parchemin);
    doc.setLineWidth(0.3);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 10;
  });

  // Footer
  if (currentY > pageHeight - 40) {
    doc.addPage();
    doc.setFillColor(COLORS.parchemin);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    currentY = margin;
  }

  currentY = pageHeight - 30;
  doc.setTextColor(COLORS.grisclair);
  setSansFont(doc, 8);
  doc.text('Cette lettre a été composée par ARCHE, le narrateur de Petit Souvenir.', margin, currentY);
  currentY += 5;
  doc.text('Conservez-la comme trace de votre séjour parisien.', margin, currentY);

  // Save PDF
  const fileName = `lettre-sejour-${dateStr.replace(/\s/g, '-')}.pdf`;
  doc.save(fileName);
};

// Export Carte Poétique as PDF
export const exportCartePoetique = (
  nodes: Node[],
  queteTitle: string,
  svgPathData?: string
) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 297;
  const pageHeight = 210;
  const margin = 20;

  // Background
  doc.setFillColor(COLORS.parchemin);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Title area
  doc.setTextColor(COLORS.vertProfond);
  setSansFont(doc, 8);
  doc.text('PETIT SOUVENIR — CARTE POÉTIQUE', margin, margin);

  doc.setTextColor(COLORS.noir);
  setSerifFont(doc, 20);
  doc.text(queteTitle, margin, margin + 10);

  // Map area (placeholder for now - will be enhanced with actual map)
  const mapX = margin;
  const mapY = margin + 20;
  const mapWidth = pageWidth - (margin * 2);
  const mapHeight = pageHeight - margin - 50;

  // Border
  doc.setDrawColor(COLORS.vertProfond);
  doc.setLineWidth(0.5);
  doc.rect(mapX, mapY, mapWidth, mapHeight, 'S');

  // Draw sacred geometry pattern overlay
  doc.setDrawColor(COLORS.vertProfond);
  doc.setGState(new doc.GState({ opacity: 0.1 }));
  
  // Mamluk-inspired geometric pattern
  const centerX = mapX + mapWidth / 2;
  const centerY = mapY + mapHeight / 2;
  const radius = Math.min(mapWidth, mapHeight) / 4;

  // Concentric circles
  for (let i = 1; i <= 3; i++) {
    doc.circle(centerX, centerY, radius * i / 3, 'S');
  }

  // Star pattern
  const points = 8;
  for (let i = 0; i < points; i++) {
    const angle = (i * 2 * Math.PI) / points;
    const x2 = centerX + radius * Math.cos(angle);
    const y2 = centerY + radius * Math.sin(angle);
    doc.line(centerX, centerY, x2, y2);
  }

  // Reset opacity
  doc.setGState(new doc.GState({ opacity: 1 }));

  // Plot nodes as points
  if (nodes.length > 0 && nodes[0].coordinates) {
    // Calculate bounding box
    const lats = nodes.map(n => n.coordinates!.lat);
    const lngs = nodes.map(n => n.coordinates!.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    // Add padding
    const latPadding = (maxLat - minLat) * 0.1;
    const lngPadding = (maxLng - minLng) * 0.1;

    // Plot each node
    nodes.forEach((node, index) => {
      if (!node.coordinates) return;

      // Map coordinates to PDF space
      const x = mapX + ((node.coordinates.lng - minLng + lngPadding) / (maxLng - minLng + 2 * lngPadding)) * mapWidth;
      const y = mapY + mapHeight - ((node.coordinates.lat - minLat + latPadding) / (maxLat - minLat + 2 * latPadding)) * mapHeight;

      // Draw point
      doc.setFillColor(COLORS.vertProfond);
      doc.circle(x, y, 1.5, 'F');

      // Draw label
      doc.setTextColor(COLORS.noir);
      setSansFont(doc, 7);
      doc.text(`${index + 1}`, x + 3, y + 1);
    });
  }

  // Legend
  let legendY = pageHeight - 20;
  doc.setTextColor(COLORS.noir);
  setSansFont(doc, 8, 'bold');
  doc.text('Lieux:', margin, legendY);
  legendY += 5;

  nodes.forEach((node, index) => {
    if (legendY > pageHeight - 10) return; // Avoid overflow

    doc.setTextColor(COLORS.noir);
    setSansFont(doc, 7);
    doc.text(`${index + 1}. ${node.name} (${node.arrondissement})`, margin, legendY);
    legendY += 4;
  });

  // Save
  const fileName = `carte-poetique-${queteTitle.toLowerCase().replace(/\s/g, '-')}.pdf`;
  doc.save(fileName);
};

// Export full Codex as PDF
export const exportCodex = (entries: any[]) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 25;
  const contentWidth = pageWidth - (margin * 2);
  let currentY = margin;

  // Background
  doc.setFillColor(COLORS.parchemin);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Header
  doc.setTextColor(COLORS.vertProfond);
  setSansFont(doc, 9);
  doc.text('PETIT SOUVENIR — CARNET PARISIEN', margin, currentY);
  currentY += 10;

  doc.setTextColor(COLORS.noir);
  setSerifFont(doc, 22);
  doc.text('Codex Personnel', margin, currentY);
  currentY += 8;

  doc.setTextColor(COLORS.grisclair);
  setSansFont(doc, 9);
  doc.text(`${entries.length} entrées`, margin, currentY);
  currentY += 20;

  // Entries
  entries.forEach((entry, index) => {
    // Check page break
    if (currentY > pageHeight - 80) {
      doc.addPage();
      doc.setFillColor(COLORS.parchemin);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      currentY = margin;
    }

    // Date + Jour
    doc.setTextColor(COLORS.vertProfond);
    setSansFont(doc, 9, 'bold');
    doc.text(`Jour ${entry.jour} — ${entry.date}`, margin, currentY);
    currentY += 8;

    // Node name
    doc.setTextColor(COLORS.noir);
    setSerifFont(doc, 14);
    doc.text(entry.node.name, margin, currentY);
    currentY += 6;

    doc.setTextColor(COLORS.grisclair);
    setSansFont(doc, 8);
    doc.text(entry.node.arrondissement, margin, currentY);
    currentY += 10;

    // Intention
    if (entry.intention) {
      doc.setTextColor(COLORS.noir);
      setSansFont(doc, 9, 'bold');
      doc.text('Intention:', margin, currentY);
      currentY += 5;

      setSerifFont(doc, 9);
      const intentionLines = splitText(doc, entry.intention, contentWidth);
      intentionLines.forEach((line) => {
        doc.text(line, margin, currentY);
        currentY += 4.5;
      });
      currentY += 5;
    }

    // Reflection
    if (entry.reflection) {
      doc.setTextColor(COLORS.noir);
      setSansFont(doc, 9, 'bold');
      doc.text('Réflexion:', margin, currentY);
      currentY += 5;

      setSerifFont(doc, 9);
      const reflectionLines = splitText(doc, entry.reflection, contentWidth);
      reflectionLines.forEach((line) => {
        doc.text(line, margin, currentY);
        currentY += 4.5;
      });
      currentY += 5;
    }

    // Separator
    currentY += 5;
    doc.setDrawColor(COLORS.grisclair);
    doc.setLineWidth(0.3);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 15;
  });

  // Save
  const fileName = `codex-parisien-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
