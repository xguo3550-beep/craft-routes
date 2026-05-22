export interface DetailItem {
  icon: string;
  text: string;
}

export interface WorkshopDetailExtra {
  category: string;
  minGuests: number;
  reviewCount: number;
  hostSubtitle: string;
  hostLanguages: string[];
  whatYouDo: DetailItem[];
  goodToKnow: DetailItem[];
  whatToBring: DetailItem[];
}

const BY_SLUG: Record<string, WorkshopDetailExtra> = {
  "bai-ethnic-tie-dye": {
    category: "Crafts & textiles",
    minGuests: 1,
    reviewCount: 89,
    hostSubtitle: "Bai artisan · Xizhou · Third-generation tie-dye",
    hostLanguages: ["English", "Mandarin"],
    whatYouDo: [
      { icon: "🧵", text: "Learn folding, binding and indigo dipping in a courtyard studio" },
      { icon: "🎨", text: "Create your own scarf or tote using natural plant dyes" },
      { icon: "📸", text: "Visit a working indigo vat and photograph the process" },
      { icon: "🎁", text: "Take home the piece you dyed, ready to wear" },
    ],
    goodToKnow: [
      { icon: "🌍", text: "Hosted in English and Mandarin" },
      { icon: "📍", text: "Xizhou Ancient Town, 40 min from Dali Old Town" },
      { icon: "👕", text: "Aprons provided — wear clothes you don't mind staining" },
      { icon: "✓", text: "Free cancellation up to 48 hours before" },
    ],
    whatToBring: [
      { icon: "👟", text: "Comfortable shoes for the courtyard and village walk" },
      { icon: "☀️", text: "Sun hat — the studio is open-air" },
    ],
  },
  "erhai-cycling-pottery": {
    category: "Outdoors & crafts",
    minGuests: 2,
    reviewCount: 64,
    hostSubtitle: "Ceramic artist · Erhai lakeside · 12 years in Dali",
    hostLanguages: ["English", "Mandarin"],
    whatYouDo: [
      { icon: "🚲", text: "Guided e-bike ride along Erhai's western shore with photo stops" },
      { icon: "🏘️", text: "Pass through Bai villages rarely visited on tourist routes" },
      { icon: "🏺", text: "Hand-build pottery in a lakeside studio — bowls or decorative pieces" },
      { icon: "📦", text: "Optional international shipping for fired ceramics (3 weeks)" },
    ],
    goodToKnow: [
      { icon: "🌍", text: "Hosted in English" },
      { icon: "📍", text: "Meet at Caohai Wetland; pickup from Dali Old Town available" },
      { icon: "🍱", text: "Lunch included during the pottery session" },
      { icon: "✓", text: "Free cancellation up to 48 hours before" },
    ],
    whatToBring: [
      { icon: "👟", text: "Trainers suitable for cycling" },
      { icon: "🧴", text: "Sunscreen and a light jacket for morning rides" },
    ],
  },
  "sichuan-hotpot-cooking": {
    category: "Cooking",
    minGuests: 2,
    reviewCount: 156,
    hostSubtitle: "Home cook · Chengdu · 20 years Sichuan cuisine",
    hostLanguages: ["English", "Mandarin"],
    whatYouDo: [
      { icon: "🍲", text: "Prepare spicy mala and mild mushroom broths from scratch" },
      { icon: "🌶️", text: "Blend signature dipping sauces to your heat preference" },
      { icon: "🥢", text: "Sit down to a full hotpot feast with local beer or tea" },
      { icon: "📖", text: "Take home printed recipes in English and Chinese" },
    ],
    goodToKnow: [
      { icon: "🥕", text: "Vegetarian broth available — note when booking" },
      { icon: "📍", text: "Chef Zhang's home kitchen, Jinjiang District" },
      { icon: "🌍", text: "Hosted in English and Mandarin" },
      { icon: "✓", text: "Free cancellation up to 48 hours before" },
    ],
    whatToBring: [
      { icon: "🍽️", text: "Come hungry — you'll eat everything you cook" },
    ],
  },
  "shuimo-painting-pandas": {
    category: "Art & culture",
    minGuests: 2,
    reviewCount: 112,
    hostSubtitle: "Fine arts instructor · Chengdu · Sichuan Academy alum",
    hostLanguages: ["English", "Mandarin"],
    whatYouDo: [
      { icon: "🖌️", text: "Learn ink wash techniques for bamboo and panda subjects" },
      { icon: "🎋", text: "Practice brush control with guidance from a published artist" },
      { icon: "🐼", text: "Afternoon visit to the Panda Research Base with an expert guide" },
      { icon: "🎁", text: "Take your painting home in a protective tube" },
    ],
    goodToKnow: [
      { icon: "📍", text: "Morning studio in Wuhou; transport to panda base included" },
      { icon: "🌍", text: "Hosted in English" },
      { icon: "👟", text: "Comfortable walking shoes for the panda base" },
      { icon: "✓", text: "Free cancellation up to 48 hours before" },
    ],
    whatToBring: [],
  },
  "tea-ceremony-mount-emei": {
    category: "Tea ceremony",
    minGuests: 2,
    reviewCount: 156,
    hostSubtitle: "Tea master · Emeishan · China Tea Academy certified",
    hostLanguages: ["English", "Mandarin", "Cantonese"],
    whatYouDo: [
      { icon: "🍵", text: "Learn the gongfu cha ritual for oolong and pu-erh" },
      { icon: "🍃", text: "Smell, taste and compare three rare local teas" },
      { icon: "🧘", text: "Discuss tea philosophy — mindfulness and seasonal living" },
      { icon: "🎁", text: "Take home a packet of your favourite tea" },
    ],
    goodToKnow: [
      { icon: "🌍", text: "Hosted in English and Mandarin" },
      { icon: "📍", text: "Plantation at the foot of Mount Emei; round-trip transport included" },
      { icon: "🧘", text: "Floor cushions — comfortable clothing recommended" },
      { icon: "✓", text: "Free cancellation up to 48 hours before" },
    ],
    whatToBring: [
      { icon: "🧦", text: "Comfortable socks — shoes removed in the tearoom" },
    ],
  },
  "nuodeng-salt-well-hike": {
    category: "Hiking & history",
    minGuests: 2,
    reviewCount: 47,
    hostSubtitle: "Historian & guide · Nuodeng · Born in the village",
    hostLanguages: ["English", "Bai"],
    whatYouDo: [
      { icon: "🥾", text: "Trek terraced paths through a 1300-year-old salt village" },
      { icon: "🧂", text: "See living salt wells still used by local families" },
      { icon: "🍜", text: "Share a traditional Bai lunch with the village elder" },
      { icon: "📷", text: "Stop at viewpoints over the valley and Nujiang gorge" },
    ],
    goodToKnow: [
      { icon: "📍", text: "Transport from Dali included; 2.5 hr drive each way" },
      { icon: "🥾", text: "Moderate hike — reasonable fitness required" },
      { icon: "🌍", text: "Hosted in English" },
      { icon: "✓", text: "Free cancellation up to 48 hours before" },
    ],
    whatToBring: [
      { icon: "🥾", text: "Hiking shoes with grip" },
      { icon: "💧", text: "Water bottle and sun protection" },
    ],
  },
};

function genericExtra(title: string, region: string): WorkshopDetailExtra {
  const isDali = region === "dali";
  return {
    category: "Experience",
    minGuests: 1,
    reviewCount: 12,
    hostSubtitle: "Vetted local host",
    hostLanguages: ["English"],
    whatYouDo: [
      { icon: "✨", text: `An afternoon with someone who lives here — not a tour script` },
      { icon: "📍", text: isDali ? "Slow pace, real places they know from daily life" : "Sichuan through food, craft, and conversation" },
    ],
    goodToKnow: [
      { icon: "🌍", text: "Hosted in English" },
      { icon: "✓", text: "Free cancellation up to 48 hours before" },
    ],
    whatToBring: [{ icon: "📱", text: "Comfortable shoes and your phone for directions" }],
  };
}

const DEFAULT_EXTRA: WorkshopDetailExtra = {
  category: "Experience",
  minGuests: 1,
  reviewCount: 40,
  hostSubtitle: "Local host",
  hostLanguages: ["English"],
  whatYouDo: [],
  goodToKnow: [],
  whatToBring: [],
};

export function getWorkshopDetailExtra(slug: string, title?: string, region?: string): WorkshopDetailExtra {
  const extra = BY_SLUG[slug] ?? (title && region ? genericExtra(title, region) : DEFAULT_EXTRA);
  return {
    ...extra,
    whatYouDo:
      extra.whatYouDo.length > 0
        ? extra.whatYouDo
        : [{ icon: "✨", text: "Spend time with a vetted local host — intimate, not a tour group" }],
    goodToKnow:
      extra.goodToKnow.length > 0
        ? extra.goodToKnow
        : [{ icon: "✓", text: "Free cancellation up to 48 hours before" }],
  };
}
