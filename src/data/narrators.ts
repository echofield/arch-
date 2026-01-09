export type NarratorType = 'artiste' | 'flaneur' | 'caviste' | 'hoteliere' | 'gardien';

export interface Narrator {
  type: NarratorType;
  name: string;
  title: string;
  voice: string;
}

export const narrators: Record<NarratorType, Narrator> = {
  artiste: {
    type: 'artiste',
    name: 'Sophie Martin',
    title: 'L\'Artiste',
    voice: 'Chaque coin de Montmartre raconte une histoire de lumière et d\'ombre.'
  },
  flaneur: {
    type: 'flaneur',
    name: 'Jean Moreau',
    title: 'Le Flâneur',
    voice: 'Paris se découvre en marchant, sans hâte, sans but précis.'
  },
  caviste: {
    type: 'caviste',
    name: 'Nicolas Vin',
    title: 'Le Caviste',
    voice: 'Le vin est une conversation entre la terre et le temps.'
  },
  hoteliere: {
    type: 'hoteliere',
    name: 'Marie Dubois',
    title: 'L\'Hôtelière',
    voice: 'Un bon hôtel est une maison qui vous attend depuis toujours.'
  },
  gardien: {
    type: 'gardien',
    name: 'Pierre Laurent',
    title: 'Le Gardien des Passages',
    voice: 'Les passages couverts sont les veines secrètes de Paris.'
  }
};

export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  distance: string;
  price: string;
  type: string;
  description: string;
  quote: string;
  miniQuest: string;
  narrator: NarratorType;
  location: string;
  arrondissement: string;
}

export const experiences: Experience[] = [
  {
    id: 'atelier-montmartre',
    title: 'Atelier de Peinture Montmartre',
    subtitle: 'Création dans la lumière du Sacré-Cœur',
    distance: '1.2 km',
    price: 'Gratuit',
    type: 'Intérieur',
    description: "Créez votre chef-d'oeuvre dans un atelier d'artiste authentique avec vue sur Sacré-Cœur. La lumière de l'après-midi transforme chaque coup de pinceau.",
    quote: "L'art est la contemplation. C'est le plaisir de l'esprit qui pénètre la nature et qui y devine l'effort qu'elle a fait pour créer.",
    miniQuest: 'Trouve l\'atelier où Toulouse-Lautrec peignait ses affiches nocturnes.',
    narrator: 'artiste',
    location: 'Montmartre',
    arrondissement: '18ème'
  },
  {
    id: 'cave-rive-gauche',
    title: 'Dégustation Rive Gauche',
    subtitle: 'Cinq vins, cinq terroirs, une histoire',
    distance: '800 m',
    price: '€€€',
    type: 'Cave historique',
    description: 'Découvrez cinq vins d\'exception accompagnés de fromages artisanaux dans une cave du XVIIe siècle. Chaque bouteille raconte un voyage.',
    quote: 'Le vin est la partie intellectuelle d\'un repas. Les viandes et légumes n\'en sont que la partie matérielle.',
    miniQuest: 'Identifie le vin préféré de Hemingway parmi la sélection du caviste.',
    narrator: 'caviste',
    location: 'Saint-Germain-des-Prés',
    arrondissement: '6ème'
  },
  {
    id: 'jardins-marais',
    title: 'Promenade Jardins Secrets',
    subtitle: 'Trois havres de paix inconnus',
    distance: '2.5 km',
    price: 'Gratuit',
    type: 'Extérieur',
    description: 'Explorez trois jardins cachés du Marais, loin des sentiers touristiques. Le silence au cœur de Paris est un luxe rare.',
    quote: 'Dans les jardins secrets, Paris respire et se souvient.',
    miniQuest: 'Compte les fontaines cachées dans les trois jardins du parcours.',
    narrator: 'flaneur',
    location: 'Le Marais',
    arrondissement: '3ème'
  },
  {
    id: 'passage-panoramas',
    title: 'Passage des Panoramas',
    subtitle: 'Premier passage éclairé au gaz de Paris',
    distance: '1.8 km',
    price: '€',
    type: 'Passage couvert',
    description: 'Traversez le temps dans ce passage de 1800. Les boutiques anciennes et les mosaïques racontent deux siècles d\'histoire parisienne.',
    quote: 'Les passages couverts sont les rêves architecturaux du XIXe siècle.',
    miniQuest: 'Trouve la plus ancienne boutique encore en activité depuis 1867.',
    narrator: 'gardien',
    location: 'Grands Boulevards',
    arrondissement: '2ème'
  }
];