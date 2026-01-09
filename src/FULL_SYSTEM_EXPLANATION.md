# PETIT SOUVENIR — CityNodes Paris
## Complete System Flow & Architecture Explanation

---

## 🎨 **Design Philosophy**

**"Un livre qui a des coordonnées GPS"** — A book that has GPS coordinates.

- **Zero gamification** — No points, badges, or rewards
- **Maximum conceptual depth** — Every element has meaning
- **Editorial luxury aesthetic** — Resembles refined print, not a mobile app
- **Sacred geometry as a lens** — Mamluk geometric patterns create invisible architectural layers (the "Ghost Grid")

### Color Palette
- **Cream parchment background**: `#FAF8F2` (primary canvas)
- **Deep green accents**: `#003D2C` (letterpress-style ink)
- **Typography**: Cormorant Garamond (serif, editorial) + sans-serif for UI elements

---

## 📱 **Complete User Flow**

### **1. LANDING PAGE** (`Landing.tsx`)
**What it is**: The elegant entry point to the entire experience.

**Features**:
- Centered title: "PETIT SOUVENIR — CityNodes Paris"
- Tagline explaining the concept
- Primary CTA: "Commencer" (Begin)
- Navigation links to other major sections

**User can go to**:
- Start the onboarding flow (→ Intention)
- View Histoire portal (time travel section)
- View Quêtes (quest gallery)

---

### **2. ONBOARDING FLOW** (The Matching System)

#### **Step 2a: INTENTION** (`Intention.tsx`)
**What it is**: User declares their travel intention/philosophy.

**Features**:
- Simple text input or selection
- Sets the tone for personalization
- Philosophical question about how they want to experience Paris

**Flow**: After completion → Quiz

---

#### **Step 2b: QUIZ** (`Quiz.tsx`)
**What it is**: A sophisticated personality/preference quiz (NOT a trivia quiz).

**Features**:
- Multiple questions about travel style, preferences, aesthetic sensibilities
- Questions designed to understand the user's Paris archetype
- No right/wrong answers — purely exploratory
- Answers are stored as an array of numbers (indices)

**Flow**: After completion → Loading → Results

---

#### **Step 2c: LOADING** (`Loading.tsx`)
**What it is**: Sacred geometry animation while "calculating" results.

**Features**:
- Animated geometric patterns
- Poetic loading text
- Creates anticipation and ritual
- Lasts ~2 seconds

**Flow**: Automatically → Results

---

#### **Step 2d: RESULTS** (`Results.tsx`)
**What it is**: Reveals the user's Paris archetype and matches them to experiences.

**Features**:
- Display calculated travel profile
- Match to narrator voice (ARCHÉ system)
- Suggest personalized quests/experiences
- Option to view full Codex
- Options to select specific experiences to add to personal collection

**Flow**: 
- View Codex → Codex
- Back to Quiz
- Select experiences (stores in state)

---

### **3. CODEX** (`Codex.tsx`)
**What it is**: The master encyclopedia of all Parisian experiences, places, and archetypes.

**Features**:
- Complete catalog of all available experiences
- Organized by theme/category
- Beautiful editorial layout
- Shows which experiences the user has selected
- Acts as the central reference library

**Flow**: Back to Landing

---

## 🗺️ **The Quest System** (9 Distinct Quests)

### **4a. PATHWAYS MAP** (`PathwaysMap.tsx`)
**What it is**: Visual map overview of all 9 quests.

**Features**:
- Shows all quest routes overlaid on Paris map
- Interactive — click to explore
- Color-coded by theme
- Visual representation of the full quest network

**Flow**: Click on quest → (could link to Quetes detail view)

---

### **4b. QUÊTES GALLERY** (`Quetes.tsx`)
**What it is**: Gallery view of all 9 quests with rich editorial cards.

**The 9 Quests** (from `/data/quests.ts`):
1. **La Quête des Passages** — Hidden covered galleries with glass roofs
2. **La Quête des Jardins Secrets** — Secret gardens and hidden green spaces
3. **La Quête des Ateliers** — Artists' workshops and creative spaces
4. **La Quête des Cafés Littéraires** — Literary cafés with history
5. **La Quête des Façades** — Architectural façades (Haussmann, Art Nouveau)
6. **La Quête des Ponts** — Bridges of Paris with stories
7. **La Quête des Escaliers** — Monumental staircases
8. **La Quête des Fontaines** — Historic fountains
9. **La Quête du Marais Mystique** — Mystical Marais neighborhood

**Features**:
- Beautiful card design for each quest
- Shows: title, subtitle, estimated time, distance
- Preview of quest nodes (locations)
- Click to see full detail

**Flow**: Click on quest card → QueteDetail

---

### **4c. QUEST DETAIL** (`QueteDetail.tsx`)
**What it is**: Deep dive into a specific quest with full itinerary.

**Features**:
- Complete list of all nodes/locations in order
- Address and coordinates for each stop
- Narrator commentary (ARCHÉ voice)
- **Google Maps integration** — Direct link to walking directions for the entire route
- Estimated time and distance
- Beautiful typography and spacing
- Option to view on map

**Flow**: 
- Back to Quêtes gallery
- View on PathwaysMap

---

## ⏳ **Chronoscapes de Paris** (Historical Time Travel)

### **5a. HISTOIRE PORTAL** (`HistoirePortal.tsx`)
**What it is**: Sacred geometric portal entrance to the time travel section.

**Features**:
- Dramatic, ritualistic entry experience
- Sacred geometry animations
- Philosophical introduction text
- "Enter" button to pass through the portal

**Flow**: Enter → Chronoscapes gallery

---

### **5b. CHRONOSCAPES** (`Chronoscapes.tsx`)
**What it is**: Gallery of historical epochs of Paris — time travel through eras.

**Current Epochs** (can be expanded):
- **1789 — La Révolution** (Camille Desmoulins at Palais Royal)
- Belle Époque
- Medieval Paris
- Haussmann transformation
- etc.

**Features**:
- Vertical scrolling gallery
- Beautiful historical cards for each epoch
- Rich imagery and typography
- Each card is a window into a specific moment in Parisian history
- Neoclassical allegory illustration style (Marianne/Paris figure, sacred geometry, museum quality)

**Flow**: Back to Histoire Portal

---

## 📖 **Carnet Parisien** (Personal Journal)

### **6. CARNET PARISIEN** (`CarnetParisien.tsx`)
**What it is**: The user's intimate, personal Paris journal — "un livre qui a des coordonnées GPS" fully realized.

**NEW SIMPLIFIED DESIGN** (just updated):

**Features**:
- **One pure, authoritative button**: "AJOUTER UN SOUVENIR" (Add a Memory)
- Minimalist book-like interface
- When adding a souvenir:
  - Optional field: Location/place name
  - Large text area: Write your memory/reflection (italic serif, like handwriting)
  - "Conserver" button (Preserve/Save)
- All souvenirs displayed in chronological timeline:
  - Vertical dotted line connecting entries
  - Each entry shows: date, time, location (if provided), memory text
  - Beautiful paper-like cards with subtle grid texture
  - Fade-up animation when entries appear
- Clean, editorial layout
- No complexity — just pure writing and memory keeping

**Philosophy**: 
This is where GPS coordinates meet poetic reflection. It's not a database — it's a diary where Paris memories are preserved like pressed flowers in a book.

**Flow**: Back to Landing

---

## 🎭 **Additional Experimental Modules**

### **7. PORTE DU MYSTÈRE** (`PorteDuMystere.tsx`)
**What it is**: Experimental/"secret door" feature (exact function TBD, but likely another conceptual layer or mystery element).

### **8. PARISIAN GLYPHS** (`ParisianGlyphs.tsx`)
**What it is**: Visual language/symbol system for Paris (likely decorative or symbolic elements used throughout the app).

---

## 🏗️ **Technical Architecture**

### **State Management** (in `App.tsx`)
- `currentScreen` — Controls which view is active
- `quizAnswers` — Array of quiz responses
- `selectedExperiences` — User's chosen experiences from Results
- `selectedQuestId` — Which quest detail to show

### **Navigation Flow**
All screens can return to Landing (the "origin point").

```
Landing
├─→ Intention → Quiz → Loading → Results → Codex
├─→ Histoire Portal → Chronoscapes
├─→ Quêtes Gallery → Quest Detail
├─→ PathwaysMap
├─→ Carnet Parisien
├─→ Porte du Mystère
└─→ Parisian Glyphs
```

### **Data Structure**
- `/data/quests.ts` — All 9 quests with nodes, coordinates, Google Maps URLs
- `/data/narrators.ts` — ARCHÉ narrator voices/personalities
- `/data/travel-profiles.ts` — User archetypes from quiz matching
- `/data/lieux-paris.ts` — Database of Parisian locations

---

## 🎯 **Core Differentiators**

1. **No gamification** — No points, levels, achievements. Pure exploration and reflection.

2. **Conceptual depth** — Every element has symbolic meaning (sacred geometry isn't decoration — it's a lens).

3. **Editorial quality** — Looks like a luxury coffee table book, not an app.

4. **Narrator system (ARCHÉ)** — Personalized voice/guide based on user's archetype.

5. **Ghost Grid** — Invisible Mamluk geometric patterns create structural harmony.

6. **GPS + Poetry** — Precise coordinates meet philosophical reflection (the Carnet embodies this perfectly).

7. **Time travel** — Chronoscapes let you experience historical Paris moments, not just read about them.

8. **Real walking quests** — 9 complete, walkable itineraries with Google Maps integration.

---

## 🚀 **Current Status**

### **Fully Built & Working**:
✅ Complete onboarding flow (Intention → Quiz → Results → Codex)  
✅ All 9 quests with full data and Google Maps integration  
✅ Quêtes gallery and detail views  
✅ PathwaysMap  
✅ Chronoscapes system with Histoire Portal  
✅ **NEW**: Simplified, authoritative Carnet Parisien  
✅ Beautiful typography and color system  
✅ Sacred geometry backgrounds  
✅ Navigation system  

### **Removed/Cleaned Up**:
❌ Cards section (deleted)  
❌ All "Lettres" modules (deleted)  
❌ Hotel System (deleted)  
❌ Luminous Weave (deleted)  

### **Ready For**:
- Content expansion (more quests, more Chronoscapes epochs)
- Real user testing
- Integration with actual Paris locations
- Backend persistence (Supabase) if needed for saved souvenirs
- Music/ambient sound system (was planned but not critical)

---

## 💡 **The Essence**

This is not a Paris travel app. It's a **conceptual art project disguised as a guidebook**. It treats Paris as a text to be read slowly, a sacred geometry to decode, and a personal mythology to co-create. The user isn't a tourist — they're a modern-day flâneur, a collector of invisible patterns, a writer of their own Parisian myth.

Every pixel serves this philosophy.
