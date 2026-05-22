import type { Workshop, WorkshopSession, WorkshopWithSessions } from "@/types";
import { getWorkshopCity, isCitySlug, type CitySlug } from "@/lib/cities";
import { workshopCoverPath } from "@/lib/workshop-meta";

const now = new Date();

function futureDate(daysFromNow: number, hour: number): string {
  const d = new Date(now);
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

export const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: "1",
    slug: "bai-ethnic-tie-dye",
    title: "Bai Ethnic Tie-Dye Workshop",
    description:
      "Learn centuries-old indigo tie-dye techniques from Bai artisans in a courtyard studio near Erhai Lake.",
    long_description:
      "Spend a half-day with master artisan Yang Mei in her family courtyard workshop. You will learn the full process: folding, binding, dipping in natural indigo vats, and unwrapping your creation. Every participant leaves with a hand-dyed scarf or tote bag.",
    region: "dali",
    location: "Xizhou Ancient Town, Dali",
    duration_hours: 4,
    max_participants: 10,
    price_cents: 6800,
    currency: "usd",
    image_url: workshopCoverPath("bai-ethnic-tie-dye"),
    gallery_urls: [],
    highlights: [
      "Natural indigo dyes",
      "Take home your creation",
      "English-speaking guide",
      "Tea & local snacks",
    ],
    includes: [
      "All materials",
      "Apron & gloves",
      "Scarf or tote to dye",
      "Pickup from Dali Old Town",
    ],
    host_name: "Yang Mei",
    host_bio:
      "Third-generation Bai tie-dye artisan from Xizhou. Featured in National Geographic Traveler.",
    language: "English",
    featured: true,
    created_at: now.toISOString(),
  },
  {
    id: "2",
    slug: "erhai-cycling-pottery",
    title: "Erhai Lakeside Cycling & Pottery",
    description:
      "Morning bike ride along Erhai Lake followed by hand-building pottery in a lakeside studio.",
    long_description:
      "Start with a guided e-bike ride along the western shore of Erhai Lake, stopping at Bai villages and photo points. Return to our lakeside studio for a relaxed pottery session.",
    region: "dali",
    location: "Caohai Wetland, Dali",
    duration_hours: 6,
    max_participants: 8,
    price_cents: 9500,
    currency: "usd",
    image_url: workshopCoverPath("erhai-cycling-pottery"),
    gallery_urls: [],
    highlights: [
      "E-bike included",
      "Lakeside scenery",
      "Ship pottery worldwide",
      "Small group (max 8)",
    ],
    includes: [
      "E-bike rental",
      "Pottery materials & firing",
      "Lunch",
      "International shipping",
    ],
    host_name: "Li Wei",
    host_bio:
      "Ceramic artist and cycling guide. Studied at Jingdezhen and lived in Dali for 12 years.",
    language: "English",
    featured: true,
    created_at: now.toISOString(),
  },
  {
    id: "3",
    slug: "sichuan-hotpot-cooking",
    title: "Authentic Sichuan Hotpot Cooking Class",
    description:
      "Master the art of Sichuan hotpot — from broth to dipping sauces — in a Chengdu home kitchen.",
    long_description:
      "Join Chef Zhang in her Chengdu apartment for an immersive cooking experience. Learn to prepare two broths (spicy mala and mild mushroom), make signature dipping sauces, and understand Sichuan flavor layering.",
    region: "sichuan",
    location: "Jinjiang District, Chengdu",
    duration_hours: 3,
    max_participants: 12,
    price_cents: 7500,
    currency: "usd",
    image_url: workshopCoverPath("sichuan-hotpot-cooking"),
    gallery_urls: [],
    highlights: [
      "Home kitchen experience",
      "Recipe cards to take home",
      "Vegetarian options",
    ],
    includes: [
      "All ingredients",
      "Recipes (EN/CN)",
      "Full hotpot meal",
      "Local beer or tea",
    ],
    host_name: "Chef Zhang Lin",
    host_bio:
      "Former restaurant chef with 20 years of Sichuan cuisine expertise.",
    language: "English",
    featured: true,
    created_at: now.toISOString(),
  },
  {
    id: "4",
    slug: "shuimo-painting-pandas",
    title: "Chinese Ink Painting & Panda Sanctuary Visit",
    description:
      "Morning ink painting lesson followed by an afternoon at the Chengdu Panda Research Base.",
    long_description:
      "Begin with a 2-hour shuimo (ink wash) painting workshop focusing on bamboo and pandas. After lunch, visit the panda base with an expert guide.",
    region: "sichuan",
    location: "Wuhou District, Chengdu",
    duration_hours: 8,
    max_participants: 10,
    price_cents: 12800,
    currency: "usd",
    image_url: workshopCoverPath("shuimo-painting-pandas"),
    gallery_urls: [],
    highlights: [
      "Ink painting masterclass",
      "Panda base entry included",
      "Art supplies included",
    ],
    includes: [
      "Painting materials",
      "Panda base ticket",
      "Transport to base",
      "Lunch",
    ],
    host_name: "Professor Wang",
    host_bio:
      "Retired Sichuan Fine Arts Academy instructor specializing in ink wash landscapes.",
    language: "English",
    featured: false,
    created_at: now.toISOString(),
  },
  {
    id: "5",
    slug: "tea-ceremony-mount-emei",
    title: "Mount Emei Tea Ceremony & Forest Walk",
    description:
      "Experience a traditional Sichuan tea ceremony amid ancient forests at the foot of Mount Emei.",
    long_description:
      "Travel to a tea plantation at the base of Mount Emei for a guided forest walk and full gongfu tea ceremony with tastings of three rare local teas.",
    region: "sichuan",
    location: "Emeishan City, Sichuan",
    duration_hours: 5,
    max_participants: 8,
    price_cents: 8900,
    currency: "usd",
    image_url: workshopCoverPath("tea-ceremony-mount-emei"),
    gallery_urls: [],
    highlights: [
      "Mount Emei setting",
      "Gongfu ceremony",
      "Rare tea tastings",
    ],
    includes: [
      "Tea tastings",
      "Ceremony instruction",
      "Forest guide",
      "Round-trip transport",
    ],
    host_name: "Chen Yu",
    host_bio: "Certified tea sommelier and Mount Emei native.",
    language: "English",
    featured: false,
    created_at: now.toISOString(),
  },
  {
    id: "6",
    slug: "nuodeng-salt-well-hike",
    title: "Nuodeng Ancient Salt Village Hike",
    description:
      "Trek through a 1300-year-old salt-trading village in the mountains between Dali and Lijiang.",
    long_description:
      "Discover Nuodeng, one of Yunnan's best-preserved ancient villages, with thousand-year-old salt wells still in use and a traditional Bai lunch.",
    region: "dali",
    location: "Nuodeng Village, Yunlong County",
    duration_hours: 7,
    max_participants: 10,
    price_cents: 11000,
    currency: "usd",
    image_url: workshopCoverPath("nuodeng-salt-well-hike"),
    gallery_urls: [],
    highlights: [
      "Off-the-beaten-path",
      "Living salt wells",
      "Bai village lunch",
    ],
    includes: ["Guide fees", "Traditional lunch", "Transport from Dali"],
    host_name: "Zhao Bin",
    host_bio: "Local historian and hiking guide born in Nuodeng.",
    language: "English",
    featured: false,
    created_at: now.toISOString(),
  },
];

const MOCK_SESSIONS: Record<string, WorkshopSession[]> = {
  "1": [7, 14, 21, 28].map((d, i) => ({
    id: `s1-${i}`,
    workshop_id: "1",
    starts_at: futureDate(d, 9),
    ends_at: futureDate(d, 13),
    spots_available: 10 - (i % 3),
    created_at: now.toISOString(),
  })),
  "2": [10, 17, 24].map((d, i) => ({
    id: `s2-${i}`,
    workshop_id: "2",
    starts_at: futureDate(d, 8),
    ends_at: futureDate(d, 14),
    spots_available: 8 - i,
    created_at: now.toISOString(),
  })),
  "3": [5, 12, 19, 26].map((d, i) => ({
    id: `s3-${i}`,
    workshop_id: "3",
    starts_at: futureDate(d, 17),
    ends_at: futureDate(d, 20),
    spots_available: 12 - (i % 4),
    created_at: now.toISOString(),
  })),
  "4": [8, 15, 22].map((d, i) => ({
    id: `s4-${i}`,
    workshop_id: "4",
    starts_at: futureDate(d, 9),
    ends_at: futureDate(d, 17),
    spots_available: 6 - i,
    created_at: now.toISOString(),
  })),
  "5": [11, 18, 25].map((d, i) => ({
    id: `s5-${i}`,
    workshop_id: "5",
    starts_at: futureDate(d, 10),
    ends_at: futureDate(d, 15),
    spots_available: 8 - i,
    created_at: now.toISOString(),
  })),
  "6": [9, 16, 23, 30].map((d, i) => ({
    id: `s6-${i}`,
    workshop_id: "6",
    starts_at: futureDate(d, 8),
    ends_at: futureDate(d, 15),
    spots_available: 10 - (i % 2),
    created_at: now.toISOString(),
  })),
};

export function getMockWorkshops(region?: string, city?: string): Workshop[] {
  let list = MOCK_WORKSHOPS;

  if (city && isCitySlug(city)) {
    list = list.filter(
      (w) => getWorkshopCity(w.slug, w.region) === (city as CitySlug)
    );
  } else if (region && region !== "all") {
    list = list.filter((w) => w.region === region);
  }

  return list;
}

export function getMockWorkshopBySlug(
  slug: string
): WorkshopWithSessions | null {
  const workshop = MOCK_WORKSHOPS.find((w) => w.slug === slug);
  if (!workshop) return null;
  return {
    ...workshop,
    sessions: MOCK_SESSIONS[workshop.id] ?? [],
  };
}

export function getMockSession(
  sessionId: string
): (WorkshopSession & { workshop: Workshop }) | null {
  for (const workshop of MOCK_WORKSHOPS) {
    const sessions = MOCK_SESSIONS[workshop.id] ?? [];
    const session = sessions.find((s) => s.id === sessionId);
    if (session) return { ...session, workshop };
  }
  return null;
}
