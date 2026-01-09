// LocalStorage persistence for Carnet, Quest progress, and Échos

const STORAGE_KEYS = {
  CODEX_ENTRIES: 'citynodes_codex_entries',
  LETTER_NODES: 'citynodes_letter_nodes',
  QUEST_PROGRESS: 'citynodes_quest_progress',
  VISITED_NODES: 'citynodes_visited_nodes',
  USER_PROFILE: 'citynodes_user_profile'
};

// Codex Entries
export const saveCodexEntries = (entries: any[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CODEX_ENTRIES, JSON.stringify(entries));
  } catch (error) {
    console.error('Failed to save codex entries:', error);
  }
};

export const loadCodexEntries = (): any[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CODEX_ENTRIES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load codex entries:', error);
    return [];
  }
};

// Letter Nodes (selected for Lettre de Séjour)
export const saveLetterNodes = (nodeIds: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LETTER_NODES, JSON.stringify(nodeIds));
  } catch (error) {
    console.error('Failed to save letter nodes:', error);
  }
};

export const loadLetterNodes = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LETTER_NODES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load letter nodes:', error);
    return [];
  }
};

// Quest Progress
export const saveQuestProgress = (progress: Record<string, number>) => {
  try {
    localStorage.setItem(STORAGE_KEYS.QUEST_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save quest progress:', error);
  }
};

export const loadQuestProgress = (): Record<string, number> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.QUEST_PROGRESS);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load quest progress:', error);
    return {};
  }
};

// Visited Nodes (for pattern recognition)
export const saveVisitedNode = (nodeId: string, timestamp: number) => {
  try {
    const visited = loadVisitedNodes();
    visited[nodeId] = visited[nodeId] || [];
    visited[nodeId].push(timestamp);
    localStorage.setItem(STORAGE_KEYS.VISITED_NODES, JSON.stringify(visited));
  } catch (error) {
    console.error('Failed to save visited node:', error);
  }
};

export const loadVisitedNodes = (): Record<string, number[]> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.VISITED_NODES);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load visited nodes:', error);
    return {};
  }
};

// User Profile (for ARCHE pattern recognition)
export interface UserProfile {
  preferredQuetes: string[];
  favoriteTimeOfDay: string;
  visitCount: number;
  firstVisit: number;
  lastVisit: number;
}

export const saveUserProfile = (profile: UserProfile) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error('Failed to save user profile:', error);
  }
};

export const loadUserProfile = (): UserProfile => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (stored) {
      return JSON.parse(stored);
    }
    // Default profile
    return {
      preferredQuetes: [],
      favoriteTimeOfDay: '',
      visitCount: 0,
      firstVisit: Date.now(),
      lastVisit: Date.now()
    };
  } catch (error) {
    console.error('Failed to load user profile:', error);
    return {
      preferredQuetes: [],
      favoriteTimeOfDay: '',
      visitCount: 0,
      firstVisit: Date.now(),
      lastVisit: Date.now()
    };
  }
};

// Update visit count
export const incrementVisitCount = () => {
  const profile = loadUserProfile();
  profile.visitCount += 1;
  profile.lastVisit = Date.now();
  saveUserProfile(profile);
};

// Clear all data (for testing or reset)
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

// Export welcome message based on visit count
export const getWelcomeMessage = (): string => {
  const profile = loadUserProfile();
  
  if (profile.visitCount === 0) {
    return 'Bienvenue à Paris. Votre quête commence.';
  } else if (profile.visitCount === 1) {
    return 'Votre quête continue. ARCHE se souvient.';
  } else {
    const daysSinceFirst = Math.floor((Date.now() - profile.firstVisit) / (1000 * 60 * 60 * 24));
    return `Jour ${daysSinceFirst + 1} de votre exploration parisienne.`;
  }
};
