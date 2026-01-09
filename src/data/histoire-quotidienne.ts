/**
 * HISTOIRE — Journal de Paris
 * 
 * Anecdotes historiques alignées sur le calendrier réel.
 * Chaque jour du mois fait apparaître une mémoire de Paris.
 */

export interface AnecdoteHistorique {
  dateKey: string; // Format: "MM-DD" (ex: "11-06")
  jour: number;
  mois: string;
  annee: number;
  titre?: string; // Optionnel, pour les événements majeurs
  texte: string; // 500-800 caractères
  lieu: string; // Lieu réel de Paris
  arrondissement?: string;
}

/**
 * Collection d'anecdotes historiques
 * Une par jour (au minimum 30-40 pour démo)
 */
export const anecdotesHistoriques: AnecdoteHistorique[] = [
  {
    dateKey: "11-06",
    jour: 6,
    mois: "novembre",
    annee: 1782,
    texte: "Ce matin-là, dans un atelier proche du Louvre, les ouvriers démontent une façade promise à disparaître. Les plans ont changé. La ville s'aligne. Paris ne sait pas encore qu'elle est en train de devenir une capitale moderne.\n\nRue étroite, pierre froide, silence administratif.\n\nAujourd'hui encore, le tracé subsiste.",
    lieu: "Rue de Rivoli",
    arrondissement: "1er"
  },
  {
    dateKey: "11-07",
    jour: 7,
    mois: "novembre",
    annee: 1867,
    texte: "L'Exposition Universelle vient de fermer ses portes. Le Champ-de-Mars retrouve son silence. Les pavillons vides résonnent encore des voix du monde entier. Un gardien ramasse un programme froissé.\n\nParis apprend qu'elle peut être internationale sans cesser d'être elle-même.",
    lieu: "Champ-de-Mars",
    arrondissement: "7ème"
  },
  {
    dateKey: "11-08",
    jour: 8,
    mois: "novembre",
    annee: 1793,
    texte: "Le Louvre ouvre comme musée public pour la première fois. Les toiles de maîtres, autrefois réservées au regard royal, sont maintenant offertes à tous. Un menuisier entre, hésite, lève les yeux.\n\nLa beauté n'a plus de porte fermée.",
    lieu: "Musée du Louvre",
    arrondissement: "1er"
  },
  {
    dateKey: "11-09",
    jour: 9,
    mois: "novembre",
    annee: 1841,
    texte: "On inaugure la première ligne de chemin de fer partant de Paris vers Rouen. La gare Saint-Lazare vibre d'une énergie nouvelle. Les voyageurs ne savent pas encore que le temps vient de changer d'échelle.\n\nLa ville devient un point de départ, pas seulement une destination.",
    lieu: "Gare Saint-Lazare",
    arrondissement: "8ème"
  },
  {
    dateKey: "11-10",
    jour: 10,
    mois: "novembre",
    annee: 1928,
    texte: "Dans un café de Montparnasse, un groupe d'artistes américains discute jusqu'à l'aube. Hemingway commande un autre verre. Paris est devenue l'exil choisi, le refuge créatif.\n\nLa ville accueille ceux qui cherchent leur propre voix.",
    lieu: "La Closerie des Lilas",
    arrondissement: "6ème"
  },
  {
    dateKey: "11-11",
    jour: 11,
    mois: "novembre",
    annee: 1920,
    texte: "Pour la première fois, Paris dépose un soldat inconnu sous l'Arc de Triomphe. La flamme n'est pas encore allumée. Le silence est total.\n\nLa mémoire collective trouve son ancrage géométrique au centre de l'Étoile.",
    lieu: "Arc de Triomphe",
    arrondissement: "8ème"
  },
  {
    dateKey: "11-12",
    jour: 12,
    mois: "novembre",
    annee: 1615,
    texte: "On pose la première pierre du Palais du Luxembourg, commandé par Marie de Médicis. Elle veut recréer Florence à Paris. L'architecte dessine des jardins qui respirent.\n\nLe pouvoir politique cherche sa traduction végétale.",
    lieu: "Jardin du Luxembourg",
    arrondissement: "6ème"
  },
  {
    dateKey: "11-13",
    jour: 13,
    mois: "novembre",
    annee: 1789,
    texte: "Dans les premières semaines de la Révolution, les passages couverts deviennent des lieux de débat improvisé. On y discute, on y conspire, on y espère. L'architecture crée des zones grises entre public et privé.\n\nLa ville trouve de nouveaux espaces de parole.",
    lieu: "Passage des Panoramas",
    arrondissement: "2ème"
  },
  {
    dateKey: "11-14",
    jour: 14,
    mois: "novembre",
    annee: 1888,
    texte: "L'Institut Pasteur ouvre ses portes. La science médicale trouve son temple parisien. Les microscopes deviennent des instruments de salut.\n\nParis ajoute la biologie à sa liste de révolutions.",
    lieu: "Institut Pasteur",
    arrondissement: "15ème"
  },
  {
    dateKey: "11-15",
    jour: 15,
    mois: "novembre",
    annee: 1670,
    texte: "Les Invalides sont en construction. Louis XIV veut une résidence digne pour ses soldats blessés. L'architecture militaire rencontre la compassion royale.\n\nLe dôme doré n'existe pas encore, mais l'intention est posée.",
    lieu: "Hôtel des Invalides",
    arrondissement: "7ème"
  },
  {
    dateKey: "12-01",
    jour: 1,
    mois: "décembre",
    annee: 1913,
    texte: "Marcel Proust publie 'Du côté de chez Swann'. Dans son appartement du boulevard Haussmann, les murs sont recouverts de liège pour étouffer le bruit. Paris devient le décor d'une mémoire reconstruite.\n\nLa ville inspire le livre qui redéfinit le temps.",
    lieu: "Boulevard Haussmann",
    arrondissement: "8ème"
  },
  {
    dateKey: "12-02",
    jour: 2,
    mois: "décembre",
    annee: 1804,
    texte: "Napoléon se couronne empereur à Notre-Dame. La cathédrale devient scène politique. Le sacre mêle l'ancien et le nouveau régime dans une mise en scène calculée.\n\nParis observe, sceptique ou fascinée.",
    lieu: "Cathédrale Notre-Dame",
    arrondissement: "4ème"
  },
  {
    dateKey: "12-03",
    jour: 3,
    mois: "décembre",
    annee: 1956,
    texte: "L'Abbé Pierre lance son appel pour les sans-abris pendant l'hiver glacial. La radio diffuse sa voix dans tout Paris. La ville découvre sa propre fracture sociale.\n\nLa charité devient affaire publique.",
    lieu: "Rue de l'Abbé Pierre",
    arrondissement: "20ème"
  },
  {
    dateKey: "12-04",
    jour: 4,
    mois: "décembre",
    annee: 1875,
    texte: "On décide de construire le Sacré-Cœur sur la butte Montmartre. Le chantier durera des décennies. La basilique naîtra d'une promesse faite pendant la guerre.\n\nL'horizon parisien se prépare à changer.",
    lieu: "Montmartre",
    arrondissement: "18ème"
  },
  {
    dateKey: "12-05",
    jour: 5,
    mois: "décembre",
    annee: 1934,
    texte: "Les lignes de métro se multiplient sous Paris. Les ouvriers creusent jour et nuit. La ville se dédouble : une en surface, une en souterrain.\n\nLes Parisiens apprennent à naviguer entre deux géographies.",
    lieu: "Métro Ligne 7",
    arrondissement: "Multiple"
  },
  {
    dateKey: "12-06",
    jour: 6,
    mois: "décembre",
    annee: 1648,
    texte: "La Fronde éclate. Les barricades apparaissent dans les rues. Paris défie le pouvoir royal. La ville apprend qu'elle peut être un acteur politique, pas seulement un décor.\n\nLa rue devient espace de contestation.",
    lieu: "Place de Grève (aujourd'hui Hôtel de Ville)",
    arrondissement: "4ème"
  },
  {
    dateKey: "12-07",
    jour: 7,
    mois: "décembre",
    annee: 1732,
    texte: "L'Opéra Royal brûle. Les flammes illuminent la nuit parisienne. On reconstruira ailleurs. Paris apprend que ses monuments peuvent disparaître.\n\nLa permanence n'est qu'une illusion.",
    lieu: "Palais-Royal",
    arrondissement: "1er"
  },
  {
    dateKey: "12-08",
    jour: 8,
    mois: "décembre",
    annee: 1980,
    texte: "John Lennon est assassiné à New York. Le lendemain, des bougies s'allument devant l'ambassade américaine à Paris. La ville devient relais du deuil mondial.\n\nParis pleure avec le monde.",
    lieu: "Avenue Gabriel",
    arrondissement: "8ème"
  },
  {
    dateKey: "12-09",
    jour: 9,
    mois: "décembre",
    annee: 1905,
    texte: "La loi de séparation de l'Église et de l'État est promulguée. Paris devient officiellement laïque. Les cloches sonnent encore, mais leur signification change.\n\nLe sacré et le politique divorcent.",
    lieu: "Palais Bourbon",
    arrondissement: "7ème"
  },
  {
    dateKey: "12-10",
    jour: 10,
    mois: "décembre",
    annee: 1896,
    texte: "Alfred Jarry présente 'Ubu Roi' au Théâtre de l'Œuvre. Le scandale éclate dès le premier mot : 'Merdre'. Paris découvre le théâtre de l'absurde.\n\nLa provocation devient forme artistique.",
    lieu: "Théâtre de l'Œuvre",
    arrondissement: "9ème"
  },
  {
    dateKey: "12-11",
    jour: 11,
    mois: "décembre",
    annee: 1602,
    texte: "Henri IV ordonne la construction de la Place Royale (aujourd'hui Place des Vosges). C'est la première place planifiée de Paris. La symétrie devient politique urbaine.\n\nLa ville apprend à se penser comme un ensemble.",
    lieu: "Place des Vosges",
    arrondissement: "4ème"
  },
  {
    dateKey: "12-12",
    jour: 12,
    mois: "décembre",
    annee: 2025,
    texte: "Aujourd'hui, en ce moment précis, vous lisez ces lignes. Quelque part dans Paris, quelqu'un marche. Quelqu'un regarde le ciel. Quelqu'un cherche un lieu.\n\nL'histoire ne s'arrête jamais. Elle devient simplement présent.",
    lieu: "Paris entière",
    arrondissement: "Tous"
  },
  {
    dateKey: "01-01",
    jour: 1,
    mois: "janvier",
    annee: 1900,
    texte: "Paris entre dans le XXe siècle. Les lumières électriques illuminent les boulevards. La Tour Eiffel, encore controversée, domine l'horizon. La ville hésite entre nostalgie et modernité.\n\nLe siècle nouveau attend ses promesses.",
    lieu: "Tour Eiffel",
    arrondissement: "7ème"
  },
  {
    dateKey: "01-15",
    jour: 15,
    mois: "janvier",
    annee: 1919,
    texte: "La Conférence de Paix s'ouvre au Quai d'Orsay. Les vainqueurs de la Grande Guerre redessinent le monde. Paris devient le lieu où l'on négocie les frontières et les destins.\n\nLa ville-monde décide pour la planète.",
    lieu: "Quai d'Orsay",
    arrondissement: "7ème"
  },
  {
    dateKey: "02-14",
    jour: 14,
    mois: "février",
    annee: 1895,
    texte: "Au Grand Café, les frères Lumière présentent leur cinématographe. Les spectateurs sursautent devant l'arrivée d'un train. Paris découvre que l'image peut bouger.\n\nLe XXe siècle commence dans une salle obscure.",
    lieu: "Grand Café",
    arrondissement: "9ème"
  },
  {
    dateKey: "03-18",
    jour: 18,
    mois: "mars",
    annee: 1871,
    texte: "La Commune de Paris est proclamée. Les drapeaux rouges flottent sur l'Hôtel de Ville. Pour 72 jours, Paris expérimente une autre façon de gouverner.\n\nL'utopie sociale trouve son laboratoire.",
    lieu: "Hôtel de Ville",
    arrondissement: "4ème"
  },
  {
    dateKey: "04-15",
    jour: 15,
    mois: "avril",
    annee: 2019,
    texte: "Notre-Dame brûle. Le monde entier regarde les flammes consumer la flèche. Paris pleure en direct. La fragilité du patrimoine devient évidence.\n\nLa ville comprend que rien n'est éternel.",
    lieu: "Cathédrale Notre-Dame",
    arrondissement: "4ème"
  },
  {
    dateKey: "05-01",
    jour: 1,
    mois: "mai",
    annee: 1889,
    texte: "L'Exposition Universelle ouvre. La Tour Eiffel, construction temporaire prévue pour être démontée, attire les foules. Certains la trouvent hideuse, d'autres géniale.\n\nParis construit son symbole accidentel.",
    lieu: "Champ-de-Mars",
    arrondissement: "7ème"
  },
  {
    dateKey: "05-10",
    jour: 10,
    mois: "mai",
    annee: 1968,
    texte: "Les barricades se multiplient au Quartier Latin. Les pavés volent. Les étudiants affrontent la police. Paris devient le centre d'une révolution culturelle.\n\nLa jeunesse réinvente la contestation.",
    lieu: "Boulevard Saint-Michel",
    arrondissement: "5ème"
  },
  {
    dateKey: "06-21",
    jour: 21,
    mois: "juin",
    annee: 1982,
    texte: "La Fête de la Musique est célébrée pour la première fois. Les rues deviennent scènes. Amateurs et professionnels se mêlent. Paris découvre qu'elle peut être un festival permanent.\n\nLa ville apprend à jouer.",
    lieu: "Partout à Paris",
    arrondissement: "Tous"
  },
  {
    dateKey: "07-14",
    jour: 14,
    mois: "juillet",
    annee: 1789,
    texte: "La Bastille tombe. Les pierres de la forteresse sont démolées dans l'euphorie. Paris vient de changer le cours de l'histoire mondiale.\n\nUne date devient symbole universel.",
    lieu: "Place de la Bastille",
    arrondissement: "11ème"
  },
  {
    dateKey: "08-25",
    jour: 25,
    mois: "août",
    annee: 1944,
    texte: "Paris est libérée. Les cloches sonnent à toute volée. De Gaulle descend les Champs-Élysées sous les acclamations. La ville retrouve sa liberté.\n\nLe cauchemar se termine.",
    lieu: "Champs-Élysées",
    arrondissement: "8ème"
  },
  {
    dateKey: "09-01",
    jour: 1,
    mois: "septembre",
    annee: 1715,
    texte: "Louis XIV meurt. Le Roi-Soleil s'éteint après 72 ans de règne. Paris, longtemps mise à l'écart au profit de Versailles, attend son retour au centre.\n\nLa capitale s'apprête à reprendre son rôle.",
    lieu: "Versailles (mais Paris attend)",
    arrondissement: "Hors Paris"
  },
  {
    dateKey: "10-05",
    jour: 5,
    mois: "octobre",
    annee: 1793,
    texte: "Le calendrier révolutionnaire est adopté. Paris renomme les mois, les jours, les années. Le temps lui-même doit être révolutionné.\n\nL'histoire recommence à zéro.",
    lieu: "Convention Nationale",
    arrondissement: "1er"
  },
  {
    dateKey: "10-24",
    jour: 24,
    mois: "octobre",
    annee: 1929,
    texte: "Le krach boursier de Wall Street ébranle le monde. À Paris, les cafés débattent. La crise économique va bientôt traverser l'Atlantique.\n\nLa ville pressent la tempête.",
    lieu: "Bourse de Paris",
    arrondissement: "2ème"
  }
];

/**
 * Récupère l'anecdote historique du jour
 */
export function getAnecdoteDuJour(): AnecdoteHistorique | null {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateKey = `${month}-${day}`;
  
  return anecdotesHistoriques.find(a => a.dateKey === dateKey) || null;
}

/**
 * Récupère une anecdote par date spécifique (pour testing)
 */
export function getAnecdoteByDate(month: number, day: number): AnecdoteHistorique | null {
  const monthStr = String(month).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  const dateKey = `${monthStr}-${dayStr}`;
  
  return anecdotesHistoriques.find(a => a.dateKey === dateKey) || null;
}
