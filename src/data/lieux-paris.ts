// Comprehensive Paris Lieux Database
// Geographic Truth + Literary Ghosts + Synesthetic Layers

export interface Lieu {
  id: string;
  name: string;
  arrondissement: string;
  type: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  tonalites: string[];
  poeticLine: string;
  atmosphere: string;
  microHistoire: string;
  miniRituel: string;
  quete: string;
  queteTraits: string[];
  
  // New: Synesthetic layers
  synesthetic: {
    scent?: string;
    sound?: string;
    tactile?: string;
  };
  
  // New: Literary ghost
  fantomeLitteraire?: {
    author: string;
    quote: string;
    reference: string;
  };
  
  // New: Temporal recommendations
  temporal: {
    bestTime?: string; // e.g., "17h30-18h15" or "Matin avant 10h"
    bestSeason?: string; // e.g., "Avril (cerisiers)" or "Octobre"
    lightQuality?: string; // e.g., "Lumière dorée", "Lumière zénithale"
  };
  
  googleMapsUrl?: string;
}

export const LIEUX_DATABASE: Lieu[] = [
  // ========================================
  // QUÊTE DES PASSAGES
  // ========================================
  {
    id: 'passage-panoramas',
    name: 'Passage des Panoramas',
    arrondissement: '2e',
    type: 'Passage Gastronomique',
    coordinates: { lat: 48.8719, lng: 2.3416 },
    tonalites: ['Vivant', 'Historique', 'Nostalgique', 'Gourmand'],
    poeticLine: 'Une artère de verre et de fer où le temps se plie.',
    atmosphere: 'La lumière filtre à travers la verrière comme une pluie de poussière dorée. Le bruit des pas résonne sur les dalles anciennes, tandis que l\'odeur du café se mêle à celle du papier et des épices.',
    microHistoire: 'Premier passage éclairé au gaz en 1817, le Passage des Panoramas tire son nom des grandes peintures circulaires qui attiraient les foules. Aujourd\'hui, il abrite graveurs, philatélistes et restaurants familiaux qui perpétuent une tradition parisienne presque disparue.',
    miniRituel: 'Cherchez la devanture de l\'ancien graveur Stern et passez le doigt sur les boiseries.',
    quete: 'passages',
    queteTraits: ['Mystère', 'Transition', 'Lumière filtrée'],
    synesthetic: {
      scent: 'Café torréfié, papier ancien, encre de gravure',
      sound: 'Pas sur dalles de marbre, murmures de conversations, cliquetis de vaisselle',
      tactile: 'Boiseries cirées, verre froid de la verrière, laiton des poignées'
    },
    fantomeLitteraire: {
      author: 'Walter Benjamin',
      quote: 'Ces passages, une invention du luxe industriel, sont des couloirs au plafond de verre et au revêtement de marbre qui traversent des pâtés de maisons entiers.',
      reference: 'Paris, capitale du XIXe siècle (1939)'
    },
    temporal: {
      bestTime: 'Matin 9h-11h ou fin d\'après-midi 17h-18h30',
      bestSeason: 'Toute l\'année (abri contre la pluie)',
      lightQuality: 'Lumière zénithale filtrée, poussière dorée'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Passage+des+Panoramas+Paris'
  },
  {
    id: 'galerie-vivienne',
    name: 'Galerie Vivienne',
    arrondissement: '2e',
    type: 'Passage Élégant',
    coordinates: { lat: 48.8687, lng: 2.3394 },
    tonalites: ['Raffiné', 'Silencieux', 'Architectural', 'Luxe discret'],
    poeticLine: 'Mosaïques et rotonde, un salon de pierre sous le ciel.',
    atmosphere: 'Les mosaïques au sol dessinent des motifs géométriques qui guident le regard vers la rotonde centrale. Sous la verrière, le silence règne, à peine troublé par le frottement d\'une page qu\'on tourne dans la librairie.',
    microHistoire: 'Inaugurée en 1826, la Galerie Vivienne incarne l\'élégance du Second Empire. Ses mosaïques, ses pilastres et sa rotonde en font l\'un des passages les plus photographiés de Paris, refuge des bibliophiles et des amateurs de thé.',
    miniRituel: 'Asseyez-vous sous la rotonde et observez comment la lumière change sur les mosaïques.',
    quete: 'passages',
    queteTraits: ['Architecture', 'Élégance', 'Contemplation'],
    synesthetic: {
      scent: 'Thé Kusmi, cuir des reliures anciennes, cire d\'abeille',
      sound: 'Silence architectural, pages tournées, talons sur mosaïques',
      tactile: 'Mosaïques froides et lisses, fer forgé, marbre poli'
    },
    fantomeLitteraire: {
      author: 'Louis Aragon',
      quote: 'La lumière moderne de l\'insolite, voilà ce que ces galeries ont su retenir.',
      reference: 'Le Paysan de Paris (1926)'
    },
    temporal: {
      bestTime: 'Matin 10h-12h (lumière douce)',
      bestSeason: 'Hiver (refuge élégant)',
      lightQuality: 'Lumière indirecte, reflets sur mosaïques'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Galerie+Vivienne+Paris'
  },
  {
    id: 'passage-des-princes',
    name: 'Passage des Princes',
    arrondissement: '2e',
    type: 'Passage Oublié',
    coordinates: { lat: 48.8713, lng: 2.3385 },
    tonalites: ['Secret', 'Mélancolique', 'Désert', 'Figé'],
    poeticLine: 'Un passage spectral où même les boutiques semblent endormies.',
    atmosphere: 'Le temps s\'est arrêté ici. Les vitrines vides reflètent une gloire passée. Quelques boutiques de jouets anciens résistent, comme des gardiens d\'un autre siècle.',
    microHistoire: 'Construit en 1860, le Passage des Princes fut autrefois un lieu de luxe et de spectacle. Aujourd\'hui presque abandonné, il offre un contraste saisissant avec ses voisins plus fréquentés. Une mélancolie architecturale.',
    miniRituel: 'Comptez les boutiques fermées. Imaginez ce qu\'elles vendaient autrefois.',
    quete: 'passages',
    queteTraits: ['Mélancolie', 'Mémoire', 'Abandon'],
    synesthetic: {
      scent: 'Poussière, bois vernis, parfum fantôme',
      sound: 'Écho de vos propres pas, silence oppressant',
      tactile: 'Vitres froides, métal rouillé, solitude palpable'
    },
    temporal: {
      bestTime: '15h-16h (lumière rasante)',
      bestSeason: 'Automne (mélancolie accordée)',
      lightQuality: 'Lumière grise, ombres longues'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Passage+des+Princes+Paris'
  },
  {
    id: 'passage-jouffroy',
    name: 'Passage Jouffroy',
    arrondissement: '9e',
    type: 'Passage Théâtral',
    coordinates: { lat: 48.8718, lng: 2.3427 },
    tonalites: ['Théâtral', 'Collectionneur', 'Belle Époque', 'Eccléctique'],
    poeticLine: 'Cannes anciennes, poupées de cire, et l\'odeur du bois ciré.',
    atmosphere: 'Un cabinet de curiosités linéaire. Chaque vitrine révèle un univers : soldats de plomb, gravures japonaises, cannes à pommeau d\'argent. Le musée Grévin veille à l\'entrée comme un sphinx de cire.',
    microHistoire: 'Ouvert en 1847, le Passage Jouffroy fut le premier passage chauffé de Paris. Il relie le Boulevard Montmartre au Passage Verdeau, formant une trilogie avec les Panoramas. Paradis des chineurs et collectionneurs.',
    miniRituel: 'Entrez chez Segas, le vendeur de cannes. Ne rien acheter, juste admirer.',
    quete: 'passages',
    queteTraits: ['Collection', 'Belle Époque', 'Théâtralité'],
    synesthetic: {
      scent: 'Bois ciré, papier jauni, parfum de musée',
      sound: 'Tintement de clochettes, parquet qui craque',
      tactile: 'Ivoire lisse, velours épais, bois précieux'
    },
    temporal: {
      bestTime: '14h-17h (flânerie contemplative)',
      bestSeason: 'Toute l\'année (chauffé)',
      lightQuality: 'Lumière artificielle mêlée au jour'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Passage+Jouffroy+Paris'
  },

  // ========================================
  // QUÊTE DU FLÂNEUR
  // ========================================
  {
    id: 'rue-mouffetard',
    name: 'Rue Mouffetard',
    arrondissement: '5e',
    type: 'Rue Médiévale',
    coordinates: { lat: 48.8422, lng: 2.3493 },
    tonalites: ['Vivant', 'Populaire', 'Médiéval', 'Marché'],
    poeticLine: 'La plus vieille rue de Paris, où chaque pavé garde un secret.',
    atmosphere: 'Le marché descend la pente comme une rivière de couleurs et de cris. Fromagers, poissonniers, maraîchers perpétuent un rituel ancestral. L\'odeur des huîtres fraîches se mêle à celle du pain chaud.',
    microHistoire: 'Tracée à l\'époque romaine, la rue Mouffetard suivait la route vers Rome. Au Moyen Âge, elle traversait le bourg Saint-Médard. Aujourd\'hui, elle reste l\'un des marchés les plus authentiques de Paris.',
    miniRituel: 'Achetez une douzaine d\'huîtres chez un écailler, mangez-les debout sur le trottoir.',
    quete: 'flaneur',
    queteTraits: ['Médiéval', 'Populaire', 'Vivant'],
    synesthetic: {
      scent: 'Huîtres de mer, fromage affiné, fruits mûrs, pain de mie',
      sound: 'Appels des marchands, rires, déballage de caisses',
      tactile: 'Pavés irréguliers, cagettes en bois, poignées de porte anciennes'
    },
    fantomeLitteraire: {
      author: 'Ernest Hemingway',
      quote: 'C\'était une rue magnifique au printemps et en automne.',
      reference: 'Paris est une fête (1964)'
    },
    temporal: {
      bestTime: 'Dimanche matin 9h-12h (marché)',
      bestSeason: 'Printemps et automne',
      lightQuality: 'Lumière matinale sur pavés humides'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Rue+Mouffetard+Paris'
  },
  {
    id: 'place-des-vosges',
    name: 'Place des Vosges',
    arrondissement: '4e',
    type: 'Place Royale',
    coordinates: { lat: 48.8555, lng: 2.3658 },
    tonalites: ['Symétrique', 'Aristocratique', 'Calme', 'Jardins'],
    poeticLine: 'Un carré parfait de brique et de pierre, suspendu hors du temps.',
    atmosphere: 'Les arcades forment une galerie couverte où résonnent les pas. Au centre, le jardin offre un sanctuaire de verdure. Les façades identiques créent une harmonie presque hypnotique.',
    microHistoire: 'Achevée en 1612 sous Henri IV, la Place Royale (devenue Place des Vosges en 1800) est la plus ancienne place de Paris. Victor Hugo y vécut au numéro 6, aujourd\'hui musée.',
    miniRituel: 'Asseyez-vous sur un banc face à la fontaine. Comptez les fenêtres d\'une façade.',
    quete: 'flaneur',
    queteTraits: ['Symétrie', 'Histoire', 'Contemplation'],
    synesthetic: {
      scent: 'Tilleuls en fleur (juin), pierre chaude, herbe coupée',
      sound: 'Fontaine centrale, enfants qui jouent, violoncelle occasionnel',
      tactile: 'Pierre de taille froide, grille en fer forgé, bancs en bois'
    },
    fantomeLitteraire: {
      author: 'Victor Hugo',
      quote: 'J\'habite une maison de granit et de rêve.',
      reference: 'Lettres (maison au 6 Place des Vosges)'
    },
    temporal: {
      bestTime: '7h-9h (vide) ou 18h-19h (lumière dorée)',
      bestSeason: 'Mai-juin (tilleuls en fleur)',
      lightQuality: 'Lumière symétrique, ombres géométriques'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Place+des+Vosges+Paris'
  },
  {
    id: 'cour-damoye',
    name: 'Cour Damoye',
    arrondissement: '11e',
    type: 'Passage Artisan',
    coordinates: { lat: 48.8532, lng: 2.3722 },
    tonalites: ['Secret', 'Artisan', 'Paisible', 'Village'],
    poeticLine: 'Un village caché derrière une porte cochère anonyme.',
    atmosphere: 'On passe la porte et Paris disparaît. Des ateliers, des plantes grimpantes, des pavés irréguliers. Le temps ralentit. Une chatte dort sur un rebord de fenêtre.',
    microHistoire: 'Ancien passage d\'artisans et d\'ouvriers du faubourg Saint-Antoine, la Cour Damoye a gardé son caractère villageois. Menuisiers et ébénistes y travaillaient autrefois le bois précieux.',
    miniRituel: 'Traversez la cour lentement. Notez les détails : une plante, un volet, un chat.',
    quete: 'flaneur',
    queteTraits: ['Secret', 'Artisan', 'Village'],
    synesthetic: {
      scent: 'Bois fraîchement raboté, terre humide, café d\'atelier',
      sound: 'Rabot sur bois, oiseaux, silence presque rural',
      tactile: 'Pavés moussu, murs de pierre bruts, fer rouillé'
    },
    temporal: {
      bestTime: '16h-17h (lumière oblique)',
      bestSeason: 'Printemps (végétation)',
      lightQuality: 'Lumière filtrée, ombres intimes'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Cour+Damoye+Paris'
  },
  {
    id: 'rue-cremieux',
    name: 'Rue Crémieux',
    arrondissement: '12e',
    type: 'Rue Colorée',
    coordinates: { lat: 48.8467, lng: 2.3806 },
    tonalites: ['Coloré', 'Photogénique', 'Calme', 'Résidentiel'],
    poeticLine: 'Une rue arc-en-ciel ignorée des Parisiens, découverte par Instagram.',
    atmosphere: 'Chaque maison porte une couleur pastel différente : bleu ciel, rose poudré, vert menthe. Les pavés en bois créent un silence étrange. Trop jolie pour être vraie.',
    microHistoire: 'Construite en 1865 pour loger des ouvriers du chemin de fer, la rue Crémieux est devenue une curiosité Instagram malgré elle. Les habitants oscillent entre fierté et agacement.',
    miniRituel: 'Cherchez la maison la moins photographiée. C\'est elle qui a le plus de caractère.',
    quete: 'flaneur',
    queteTraits: ['Couleur', 'Contraste', 'Photogénie'],
    synesthetic: {
      scent: 'Peinture fraîche, géraniums, silence',
      sound: 'Clics de caméras (hélas), oiseaux, vent',
      tactile: 'Pavés en bois, volets peints, fer forgé'
    },
    temporal: {
      bestTime: '8h-9h (avant les photographes)',
      bestSeason: 'Printemps (fleurs aux fenêtres)',
      lightQuality: 'Lumière douce sur couleurs pastel'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Rue+Crémieux+Paris'
  },

  // ========================================
  // QUÊTE DES JARDINS
  // ========================================
  {
    id: 'jardin-luxembourg',
    name: 'Jardin du Luxembourg',
    arrondissement: '6e',
    type: 'Jardin Public',
    coordinates: { lat: 48.8462, lng: 2.3372 },
    tonalites: ['Calme', 'Romantique', 'Verdoyant', 'Méditatif'],
    poeticLine: 'Un théâtre de verdure où chaque banc est une scène.',
    atmosphere: 'Les chaises vertes forment des archipels autour du bassin. Les enfants poussent leurs voiliers avec de longues baguettes tandis que les joueurs d\'échecs se concentrent sous les marronniers. Le temps semble ralentir ici.',
    microHistoire: 'Créé en 1612 à la demande de Marie de Médicis, le jardin évoque les jardins florentins de son enfance. Aujourd\'hui, il reste un lieu de promenade privilégié des Parisiens, entre le Sénat et les étudiants de la Sorbonne.',
    miniRituel: 'Louez une chaise verte, installez-vous face au bassin, et ne faites rien pendant quinze minutes.',
    quete: 'jardins',
    queteTraits: ['Romantique', 'Botanique', 'Repos'],
    synesthetic: {
      scent: 'Marronnier en fleur (mai), terre humide, roses anciennes',
      sound: 'Voiliers sur l\'eau, rires d\'enfants, crissement des chaises',
      tactile: 'Métal froid des chaises vertes, gravier sous les pieds, écorce rugueuse'
    },
    fantomeLitteraire: {
      author: 'Rainer Maria Rilke',
      quote: 'Le jardin Luxembourg est mon jardin spirituel.',
      reference: 'Lettres parisiennes (1902)'
    },
    temporal: {
      bestTime: '17h-19h (lumière dorée)',
      bestSeason: 'Mai (floraison) ou octobre (feuilles)',
      lightQuality: 'Lumière dorée filtrée par marronniers'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Jardin+du+Luxembourg+Paris'
  },
  {
    id: 'palais-royal-jardins',
    name: 'Jardins du Palais-Royal',
    arrondissement: '1er',
    type: 'Jardin Clos',
    coordinates: { lat: 48.8631, lng: 2.3364 },
    tonalites: ['Symétrique', 'Secret', 'Élégant', 'Calme'],
    poeticLine: 'Un carré de silence au cœur du tumulte, gardé par des colonnes.',
    atmosphere: 'On franchit les arcades et le bruit de la ville s\'éteint. Les tilleuls forment une voûte verte. Les fontaines murmurent. Les colonnes de Buren créent un contrepoint contemporain étrangement harmonieux.',
    microHistoire: 'Construit pour Richelieu en 1633, le Palais-Royal devint un lieu de plaisirs et de complots. Aujourd\'hui, les galeries abritent des boutiques rares : parfumeurs, médailles, jouets anciens. Un secret en plein jour.',
    miniRituel: 'Asseyez-vous près de la fontaine centrale. Écoutez l\'eau couvrir le bruit de la ville.',
    quete: 'jardins',
    queteTraits: ['Symétrie', 'Secret', 'Élégance'],
    synesthetic: {
      scent: 'Tilleul (juin), pierre chaude, parfum de niche',
      sound: 'Fontaines, pas sous arcades, silence épais',
      tactile: 'Colonnes striées, gravier fin, bancs en pierre'
    },
    fantomeLitteraire: {
      author: 'Colette',
      quote: 'Le Palais-Royal est mon jardin, ma cour de récréation.',
      reference: 'Vie à Paris (elle vécut au 9 rue de Beaujolais)'
    },
    temporal: {
      bestTime: '7h30-8h30 (vide) ou 18h30-19h30',
      bestSeason: 'Juin (tilleuls en fleur)',
      lightQuality: 'Lumière filtrée, ombres géométriques'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Jardins+du+Palais-Royal+Paris'
  },
  {
    id: 'square-vert-galant',
    name: 'Square du Vert-Galant',
    arrondissement: '1er',
    type: 'Pointe de l\'Île',
    coordinates: { lat: 48.8570, lng: 2.3414 },
    tonalites: ['Romantique', 'Fluvial', 'Isolé', 'Contemplatif'],
    poeticLine: 'La proue de l\'île, un navire de pierre ancré dans la Seine.',
    atmosphere: 'On descend les marches et Paris bascule. La Seine coule de chaque côté. Les saules pleurent. Les bateaux-mouches passent. Une impression d\'être sur un bateau immobile.',
    microHistoire: 'Cette pointe de l\'île de la Cité doit son nom à Henri IV, le "Vert-Galant". Aménagée en square au XIXe siècle, elle offre l\'un des points de vue les plus intimes sur la Seine et les ponts de Paris.',
    miniRituel: 'Installez-vous à la pointe. Observez les deux bras de la Seine se rejoindre.',
    quete: 'jardins',
    queteTraits: ['Romantique', 'Fluvial', 'Contemplation'],
    synesthetic: {
      scent: 'Eau de Seine, saule mouillé, pierre humide',
      sound: 'Clapotis de l\'eau, moteurs de bateaux, oiseaux',
      tactile: 'Pierre froide, écorce de saule, vent fluvial'
    },
    temporal: {
      bestTime: '19h-20h30 (coucher de soleil)',
      bestSeason: 'Été (couchers de soleil tardifs)',
      lightQuality: 'Lumière rasante sur l\'eau, reflets dorés'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Square+du+Vert-Galant+Paris'
  },
  {
    id: 'jardin-anne-frank',
    name: 'Jardin Anne-Frank',
    arrondissement: '3e',
    type: 'Jardin Secret',
    coordinates: { lat: 48.8595, lng: 2.3622 },
    tonalites: ['Caché', 'Mémoriel', 'Paisible', 'Intime'],
    poeticLine: 'Un marronnier pousse ici, descendant de celui qu\'Anne Frank voyait depuis sa cachette.',
    atmosphere: 'On entre par une porte anonyme. Le jardin se révèle : pelouses, bancs, et au centre, le marronnier. Une plaque rappelle le lien avec Amsterdam. Silence recueilli.',
    microHistoire: 'Inauguré en 2007, ce jardin rend hommage à Anne Frank. Le marronnier planté ici descend de l\'arbre qu\'elle observait depuis l\'annexe secrète à Amsterdam. Un mémorial végétal, une mémoire vivante.',
    miniRituel: 'Asseyez-vous face au marronnier. Pensez à ce que signifie voir un arbre quand on est enfermé.',
    quete: 'jardins',
    queteTraits: ['Mémoire', 'Secret', 'Contemplation'],
    synesthetic: {
      scent: 'Marronnier, herbe fraîche, silence vert',
      sound: 'Bruissement de feuilles, oiseaux, pas discrets',
      tactile: 'Écorce du marronnier, bancs en bois, gravier fin'
    },
    temporal: {
      bestTime: '14h-16h (lumière douce)',
      bestSeason: 'Printemps (marronnier en fleur)',
      lightQuality: 'Lumière filtrée par le feuillage'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Jardin+Anne-Frank+Paris'
  },

  // ========================================
  // QUÊTE DU CAVISTE
  // ========================================
  {
    id: 'la-derniere-goutte',
    name: 'La Dernière Goutte',
    arrondissement: '6e',
    type: 'Cave à Vin',
    coordinates: { lat: 48.8536, lng: 2.3354 },
    tonalites: ['Convivial', 'Érudit', 'Naturel', 'Intime'],
    poeticLine: 'Une cave où chaque bouteille raconte l\'histoire d\'un vigneron.',
    atmosphere: 'Les bouteilles s\'empilent jusqu\'au plafond. Le caviste parle de ses vignerons comme de vieux amis. Ici, on ne vend pas du vin, on transmet des histoires de terroir, de vendanges, de patience.',
    microHistoire: 'Fondée par un Américain amoureux des vins naturels français, La Dernière Goutte est devenue une référence pour les amateurs de vins vivants. Chaque bouteille est choisie après dégustation chez le vigneron.',
    miniRituel: 'Demandez une recommandation sans dire votre budget. Laissez-vous guider par la passion.',
    quete: 'caviste',
    queteTraits: ['Vin vivant', 'Érudition', 'Transmission'],
    synesthetic: {
      scent: 'Vin rouge ouvert, bois de cave, papier jauni',
      sound: 'Débouchage de bouteilles, conversations passionnées, cliquetis de verres',
      tactile: 'Verre lisse, étiquettes texturées, liège naturel'
    },
    temporal: {
      bestTime: '18h-19h30 (dégustation)',
      bestSeason: 'Automne (nouveaux millésimes)',
      lightQuality: 'Lumière tamisée de cave'
    },
    googleMapsUrl: 'https://maps.google.com/?q=La+Dernière+Goutte+Paris'
  },
  {
    id: 'le-verre-vole',
    name: 'Le Verre Volé',
    arrondissement: '10e',
    type: 'Bar à Vin / Épicerie',
    coordinates: { lat: 48.8721, lng: 2.3656 },
    tonalites: ['Populaire', 'Authentique', 'Vivant', 'Naturel'],
    poeticLine: 'Un comptoir en zinc où le vin nature coule comme une religion laïque.',
    atmosphere: 'Le Verre Volé est une institution. On y boit debout au comptoir ou assis coude à coude. Les bouteilles tournent vite. Les assiettes de charcuterie passent de main en main. Une communion autour du vin vivant.',
    microHistoire: 'Ouvert en 2000, Le Verre Volé a popularisé le vin nature à Paris bien avant que ce soit une mode. Cave, épicerie et bar, c\'est un lieu hybride où les vignerons viennent parfois servir eux-mêmes leur vin.',
    miniRituel: 'Commandez un verre au hasard. Demandez l\'histoire du vigneron. Écoutez.',
    quete: 'caviste',
    queteTraits: ['Naturel', 'Populaire', 'Convivialité'],
    synesthetic: {
      scent: 'Vin en fermentation, saucisson sec, pain frais',
      sound: 'Conversations croisées, rires, débouchages',
      tactile: 'Zinc froid, verre épais, papier kraft'
    },
    temporal: {
      bestTime: '19h-21h (ambiance)',
      bestSeason: 'Toute l\'année',
      lightQuality: 'Lumière chaude de bar'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Le+Verre+Volé+Paris'
  },
  {
    id: 'lavinia',
    name: 'Lavinia',
    arrondissement: '1er',
    type: 'Cave Monumentale',
    coordinates: { lat: 48.8656, lng: 2.3267 },
    tonalites: ['Luxueux', 'Encyclopédique', 'Impressionnant', 'International'],
    poeticLine: 'Une cathédrale du vin où 6000 références s\'alignent comme des livres rares.',
    atmosphere: 'Lavinia n\'est pas une cave, c\'est une bibliothèque vinicole. Des rayons entiers par région, par pays, par cépage. On peut se perdre des heures entre Bordeaux et Barolo, Bourgogne et Rioja.',
    microHistoire: 'Fondée en 1999, Lavinia est la plus grande cave d\'Europe. Son concept : rassembler les meilleurs vins du monde dans un espace monumental. Bar à vin à l\'étage pour déguster sur place.',
    miniRituel: 'Montez au bar à vin. Commandez un verre d\'un cépage que vous ne connaissez pas.',
    quete: 'caviste',
    queteTraits: ['Luxe', 'Érudition', 'Voyageur'],
    synesthetic: {
      scent: 'Bois de cave climatisée, cuir, papier d\'étiquettes',
      sound: 'Silence de bibliothèque, murmures, cliquetis de bouteilles',
      tactile: 'Bouteilles fraîches, étiquettes précieuses, verre cristal'
    },
    temporal: {
      bestTime: '17h-19h (dégustation au bar)',
      bestSeason: 'Toute l\'année (climatisé)',
      lightQuality: 'Lumière indirecte, mise en scène'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Lavinia+Paris'
  },
  {
    id: 'rouge-vif',
    name: 'Rouge Vif',
    arrondissement: '3e',
    type: 'Cave Néo-Bistrot',
    coordinates: { lat: 48.8628, lng: 2.3612 },
    tonalites: ['Moderne', 'Curieux', 'Éclectique', 'Accessible'],
    poeticLine: 'Une cave pour les explorateurs, où chaque bouteille est une découverte.',
    atmosphere: 'Rouge Vif défend les petits vignerons et les outsiders. Pas de grands noms, mais des passionnés. Le caviste connaît chaque producteur personnellement. On vient ici pour sortir des sentiers battus.',
    microHistoire: 'Ouvert dans le Marais par deux amis œnophiles, Rouge Vif représente la nouvelle génération de caves parisiennes : jeune, curieuse, militante pour le bio et le nature sans dogmatisme.',
    miniRituel: 'Fixez-vous un budget de 15€. Demandez la meilleure surprise possible.',
    quete: 'caviste',
    queteTraits: ['Découverte', 'Jeunesse', 'Engagement'],
    synesthetic: {
      scent: 'Vin rouge aéré, bois brut, papier recyclé',
      sound: 'Musique indie en fond, conversations passionnées',
      tactile: 'Bouteilles artisanales, étiquettes faites main'
    },
    temporal: {
      bestTime: '18h-20h (conseils personnalisés)',
      bestSeason: 'Toute l\'année',
      lightQuality: 'Lumière contemporaine, spots'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Rouge+Vif+Paris'
  },

  // ========================================
  // QUÊTE DES HAUTEURS
  // ========================================
  {
    id: 'parc-belleville',
    name: 'Parc de Belleville',
    arrondissement: '20e',
    type: 'Parc Panoramique',
    coordinates: { lat: 48.8722, lng: 2.3847 },
    tonalites: ['Panoramique', 'Populaire', 'Verdoyant', 'Respirant'],
    poeticLine: 'Le panorama secret des Parisiens, loin des touristes de Montmartre.',
    atmosphere: 'On grimpe les escaliers entre les vignes. Soudain, Paris s\'étale : Tour Eiffel, Panthéon, Sacré-Cœur. Les enfants jouent, les amoureux s\'embrassent, les vieux jouent aux boules. Une vraie vie de quartier avec vue.',
    microHistoire: 'Aménagé en 1988 sur d\'anciennes carrières, le Parc de Belleville culmine à 108 mètres. Il offre l\'un des plus beaux panoramas de Paris, moins connu que Montmartre mais tout aussi spectaculaire.',
    miniRituel: 'Montez au sommet au coucher du soleil. Comptez combien de monuments vous reconnaissez.',
    quete: 'hauteurs',
    queteTraits: ['Panorama', 'Populaire', 'Vie de quartier'],
    synesthetic: {
      scent: 'Vigne en été, herbe fraîche, air pur',
      sound: 'Enfants qui jouent, cliquetis de boules, vent en hauteur',
      tactile: 'Rampe métallique, pierre chaude, vent sur le visage'
    },
    temporal: {
      bestTime: '18h30-20h (coucher de soleil)',
      bestSeason: 'Été (soirées longues)',
      lightQuality: 'Lumière dorée sur Paris, ombres longues'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Parc+de+Belleville+Paris'
  },
  {
    id: 'sacre-coeur-parvis',
    name: 'Parvis du Sacré-Cœur',
    arrondissement: '18e',
    type: 'Esplanade Panoramique',
    coordinates: { lat: 48.8867, lng: 2.3431 },
    tonalites: ['Touristique', 'Majestueux', 'Panoramique', 'Spirituel'],
    poeticLine: 'Le balcon blanc de Paris, où la ville s\'étale comme une maquette.',
    atmosphere: 'Les marches sont envahies de touristes, de guitaristes, de vendeurs de bracelets. Mais la vue reste sidérante : Paris tout entier, jusqu\'à la Défense. Le soir, les lumières s\'allument progressivement.',
    microHistoire: 'Construit entre 1875 et 1914, le Sacré-Cœur domine Montmartre du haut de la butte. Son parvis offre une vue à 360° sur Paris. Lieu de pèlerinage et point de vue touristique, il reste un symbole.',
    miniRituel: 'Ignorez la basilique. Asseyez-vous sur les marches, trouvez la Tour Eiffel, et observez Paris respirer.',
    quete: 'hauteurs',
    queteTraits: ['Panorama', 'Icône', 'Spiritualité'],
    synesthetic: {
      scent: 'Encens (si messe), crêpes au Nutella, pierre calcaire',
      sound: 'Guitares, conversations multilingues, cloches',
      tactile: 'Pierre blanche et froide, marches usées, vent en hauteur'
    },
    temporal: {
      bestTime: '7h-8h (vide) ou 21h-22h (nuit)',
      bestSeason: 'Été (nuits claires)',
      lightQuality: 'Lumière rasante le soir, Paris illuminé'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Parvis+du+Sacré-Cœur+Paris'
  },
  {
    id: 'butte-bergeyre',
    name: 'Butte Bergeyre',
    arrondissement: '19e',
    type: 'Quartier Perché',
    coordinates: { lat: 48.8784, lng: 2.3847 },
    tonalites: ['Secret', 'Villageois', 'Verdoyant', 'Calme'],
    poeticLine: 'Un village perché inconnu des touristes, où poussent même des vignes.',
    atmosphere: 'On grimpe les escaliers et Paris disparaît. Maisons basses, jardins secrets, ruelles pavées, vignes sur les pentes. Une impression de campagne à 10 minutes de Stalingrad. Les habitants se saluent.',
    microHistoire: 'Construite dans les années 1920 sur une ancienne carrière, la Butte Bergeyre reste un secret bien gardé. Ses 60 maisons forment un village perché avec vue sur Montmartre et la Tour Eiffel.',
    miniRituel: 'Grimpez jusqu\'au belvédère. Asseyez-vous. Écoutez le silence.',
    quete: 'hauteurs',
    queteTraits: ['Secret', 'Village', 'Contemplation'],
    synesthetic: {
      scent: 'Vigne, fleurs de jardin, silence vert',
      sound: 'Oiseaux, feuilles, silence presque rural',
      tactile: 'Pavés irréguliers, pierre de murets, vent doux'
    },
    temporal: {
      bestTime: '17h-18h30 (lumière dorée)',
      bestSeason: 'Printemps et été (verdure)',
      lightQuality: 'Lumière rasante sur les pentes'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Butte+Bergeyre+Paris'
  },
  {
    id: 'tour-montparnasse-terrasse',
    name: 'Terrasse Tour Montparnasse',
    arrondissement: '15e',
    type: 'Point de Vue Urbain',
    coordinates: { lat: 48.8421, lng: 2.3219 },
    tonalites: ['Moderne', 'Vertigineux', 'Panoramique', 'Urbain'],
    poeticLine: 'Le seul endroit d\'où on ne voit pas la Tour Montparnasse.',
    atmosphere: 'L\'ascenseur monte en 38 secondes. La terrasse s\'ouvre : Paris à 360°, à 210 mètres. Le vent fouette. La ville devient maquette. Le soir, les monuments s\'illuminent comme des phares.',
    microHistoire: 'Inaugurée en 1973, la Tour Montparnasse fut longtemps détestée. Aujourd\'hui, sa terrasse offre la meilleure vue panoramique de Paris (avec l\'avantage de ne pas se voir elle-même). Coucher de soleil garanti.',
    miniRituel: 'Montez 30 minutes avant le coucher du soleil. Observez Paris changer de couleur.',
    quete: 'hauteurs',
    queteTraits: ['Moderne', 'Panorama', 'Vertige'],
    synesthetic: {
      scent: 'Air pur en altitude, métal et verre',
      sound: 'Vent fort, murmures de touristes',
      tactile: 'Vitre froide, rampe métallique, vent puissant'
    },
    temporal: {
      bestTime: '19h-20h30 (coucher de soleil)',
      bestSeason: 'Hiver (ciel clair)',
      lightQuality: 'Lumière changeante, Paris qui s\'illumine'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Tour+Montparnasse+Paris'
  },

  // ========================================
  // QUÊTE DES RELIQUES
  // ========================================
  {
    id: 'saint-julien-le-pauvre',
    name: 'Église Saint-Julien-le-Pauvre',
    arrondissement: '5e',
    type: 'Église Médiévale',
    coordinates: { lat: 48.8519, lng: 2.3467 },
    tonalites: ['Médiéval', 'Spirituel', 'Ancien', 'Paisible'],
    poeticLine: 'La plus vieille église de Paris, où l\'on prie en grec depuis 1889.',
    atmosphere: 'Construite au XIIe siècle, l\'église est aujourd\'hui melkite. Iconostase dorée, chants byzantins, encens épais. À l\'extérieur, un robinier planté en 1601 — le plus vieil arbre de Paris.',
    microHistoire: 'Fondée vers 1170, Saint-Julien-le-Pauvre accueillit des assemblées universitaires au Moyen Âge. Désaffectée à la Révolution, elle devint église melkite en 1889. Un morceau de Byzance au Quartier Latin.',
    miniRituel: 'Entrez pendant un office. Écoutez les chants en grec. Sortez, touchez l\'arbre.',
    quete: 'reliques',
    queteTraits: ['Médiéval', 'Spirituel', 'Mémoire'],
    synesthetic: {
      scent: 'Encens byzantin, pierre froide, cire de cierges',
      sound: 'Chants liturgiques en grec, silence épais',
      tactile: 'Pierre médiévale rugueuse, écorce du robinier ancien'
    },
    temporal: {
      bestTime: 'Dimanche matin (office)',
      bestSeason: 'Toute l\'année',
      lightQuality: 'Lumière filtrée par vitraux médiévaux'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Église+Saint-Julien-le-Pauvre+Paris'
  },
  {
    id: 'arenes-de-lutece',
    name: 'Arènes de Lutèce',
    arrondissement: '5e',
    type: 'Ruines Romaines',
    coordinates: { lat: 48.8456, lng: 2.3526 },
    tonalites: ['Romain', 'Secret', 'Historique', 'Paisible'],
    poeticLine: 'Un amphithéâtre romain caché derrière des immeubles haussmanniens.',
    atmosphere: 'On franchit une porte banale et Rome apparaît : gradins de pierre, arène ovale, vestiges de couloirs souterrains. Des joueurs de pétanque occupent l\'arène. Collision temporelle.',
    microHistoire: 'Construit au Ier siècle, l\'amphithéâtre de Lutèce pouvait accueillir 15 000 spectateurs. Enterré pendant des siècles, redécouvert en 1869. Victor Hugo se battit pour sa préservation.',
    miniRituel: 'Asseyez-vous sur un gradin. Imaginez les gladiateurs. Observez les boulistes.',
    quete: 'reliques',
    queteTraits: ['Romain', 'Mémoire', 'Contraste'],
    synesthetic: {
      scent: 'Pierre ancienne, herbe, terre',
      sound: 'Cliquetis de boules, oiseaux, silence romain',
      tactile: 'Pierre froide et usée, graviers, herbe rase'
    },
    fantomeLitteraire: {
      author: 'Victor Hugo',
      quote: 'Il ne faut pas qu\'on touche à ces vieilles pierres.',
      reference: 'Combat pour sauver les Arènes (1883)'
    },
    temporal: {
      bestTime: '16h-17h30 (lumière rasante)',
      bestSeason: 'Printemps et automne',
      lightQuality: 'Lumière oblique sur pierre antique'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Arènes+de+Lutèce+Paris'
  },
  {
    id: 'tour-jean-sans-peur',
    name: 'Tour Jean-sans-Peur',
    arrondissement: '2e',
    type: 'Tour Médiévale',
    coordinates: { lat: 48.8644, lng: 2.3481 },
    tonalites: ['Médiéval', 'Fortifié', 'Sombre', 'Historique'],
    poeticLine: 'Une tour de 1409, dernier vestige d\'un Paris de pierre et de sang.',
    atmosphere: 'Serrée entre des immeubles, la tour s\'élève comme un doigt de pierre pointé vers le ciel. Escalier en colimaçon, voûtes sculptées, meurtrières. On monte dans le Moyen Âge parisien, brut et intact.',
    microHistoire: 'Construite en 1409-1411 par Jean sans Peur, duc de Bourgogne, après l\'assassinat du duc d\'Orléans. Cette tour fortifiée devait le protéger. Seul vestige de l\'hôtel de Bourgogne, elle témoigne d\'un Paris médiéval disparu.',
    miniRituel: 'Montez l\'escalier en colimaçon. Comptez les marches. Observez les sculptures de la voûte.',
    quete: 'reliques',
    queteTraits: ['Médiéval', 'Fortification', 'Mémoire'],
    synesthetic: {
      scent: 'Pierre froide, humidité médiévale',
      sound: 'Pas dans l\'escalier, écho de voûtes',
      tactile: 'Pierre rugueuse, fer rouillé, froid minéral'
    },
    temporal: {
      bestTime: '14h-16h (visite calme)',
      bestSeason: 'Automne-hiver (atmosphère)',
      lightQuality: 'Pénombre médiévale, rais de lumière'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Tour+Jean-sans-Peur+Paris'
  },
  {
    id: 'crypte-archeologique',
    name: 'Crypte Archéologique',
    arrondissement: '4e',
    type: 'Site Archéologique',
    coordinates: { lat: 48.8534, lng: 2.3488 },
    tonalites: ['Souterrain', 'Romain', 'Médiéval', 'Stratifié'],
    poeticLine: 'Sous le parvis de Notre-Dame, deux mille ans de Paris superposés.',
    atmosphere: 'On descend sous terre et les siècles s\'empilent : vestiges gallo-romains, fondations médiévales, égouts du XIXe. Passerelles vitrées permettent de marcher au-dessus de l\'histoire stratifiée.',
    microHistoire: 'Découverte lors de travaux en 1965, la crypte révèle les fondations de Lutèce : quais romains, thermes, maisons médiévales. Un palimpseste urbain sous le parvis de Notre-Dame.',
    miniRituel: 'Suivez le parcours chronologique. Repérez la strate romaine, puis médiévale, puis moderne.',
    quete: 'reliques',
    queteTraits: ['Souterrain', 'Stratification', 'Archéologie'],
    synesthetic: {
      scent: 'Pierre humide, terre ancienne, musée',
      sound: 'Silence souterrain, pas sur passerelles',
      tactile: 'Rampe métallique, verre des vitrines, froid souterrain'
    },
    temporal: {
      bestTime: 'Matin 10h-12h (calme)',
      bestSeason: 'Toute l\'année (souterrain)',
      lightQuality: 'Éclairage muséal, pénombre archéologique'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Crypte+Archéologique+Paris'
  }
];

// Temporal helper functions
export const getTimeOfDay = (): 'matin' | 'apres-midi' | 'golden-hour' | 'soir' | 'nuit' => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 10) return 'matin';
  if (hour >= 10 && hour < 17) return 'apres-midi';
  if (hour >= 17 && hour < 19) return 'golden-hour';
  if (hour >= 19 && hour < 22) return 'soir';
  return 'nuit';
};

export const getSeason = (): 'printemps' | 'ete' | 'automne' | 'hiver' => {
  const month = new Date().getMonth() + 1; // 1-12
  if (month >= 3 && month <= 5) return 'printemps';
  if (month >= 6 && month <= 8) return 'ete';
  if (month >= 9 && month <= 11) return 'automne';
  return 'hiver';
};

export const getTemporalRecommendation = (lieu: Lieu): string | null => {
  const timeOfDay = getTimeOfDay();
  const season = getSeason();
  
  // Check if this is optimal time
  const bestTime = lieu.temporal.bestTime?.toLowerCase() || '';
  const bestSeason = lieu.temporal.bestSeason?.toLowerCase() || '';
  
  let recommendation = '';
  
  // Time recommendation
  if (timeOfDay === 'golden-hour' && bestTime.includes('lumière dorée')) {
    recommendation = '✨ Moment optimal : lumière dorée actuellement';
  } else if (timeOfDay === 'matin' && bestTime.includes('matin')) {
    recommendation = '☀️ Moment optimal : visite matinale recommandée';
  } else if (lieu.temporal.bestTime) {
    recommendation = `⏰ Meilleur moment : ${lieu.temporal.bestTime}`;
  }
  
  // Season recommendation
  if (season === 'printemps' && bestSeason.includes('printemps')) {
    recommendation += recommendation ? ' | ' : '';
    recommendation += '🌸 Saison idéale actuellement';
  } else if (season === 'automne' && bestSeason.includes('automne')) {
    recommendation += recommendation ? ' | ' : '';
    recommendation += '🍂 Saison idéale actuellement';
  }
  
  return recommendation || null;
};
