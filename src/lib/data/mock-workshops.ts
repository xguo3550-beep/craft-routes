import type { Workshop, WorkshopSession, WorkshopWithSessions } from "@/types";
import {
  demoAllHostWorkshopsForPublic,
  demoAllSessions,
  demoSessionsForWorkshop,
} from "@/lib/auth/demo-store";
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
    title: "Bai Indigo: An Afternoon in Xizhou",
    description:
      "Natural indigo, hand binding, and Bai textile stories in a courtyard studio — made for design, fashion, and craft people.",
    long_description:
      "Yang Mei is a third-generation Bai artisan in Xizhou, minutes from Erhai Lake. This is not a demo for tour groups — it is a slow afternoon in her family courtyard: folding cloth, binding thread, dipping in plant indigo vats, and unwrapping something you dyed yourself. She speaks about Bai patterns the way a designer speaks about material — with patience, humour, and tea between each step. You leave with a scarf or tote, and a clearer sense of why British craft culture and Yunnan indigo rhyme with each other.",
    region: "dali",
    location: "Xizhou Ancient Town, Dali",
    duration_hours: 4,
    max_participants: 10,
    price_cents: 6800,
    currency: "usd",
    image_url: workshopCoverPath("bai-ethnic-tie-dye"),
    gallery_urls: [],
    highlights: [
      "Plant indigo & hand binding",
      "Courtyard studio, not a tour stop",
      "For textile & design curious travellers",
      "Tea between each dye dip",
    ],
    includes: [
      "All materials",
      "Apron & gloves",
      "Scarf or tote to dye",
      "Pickup from Dali Old Town",
    ],
    host_name: "Yang Mei",
    host_bio:
      "Third-generation Bai tie-dye artisan. Yang works with natural indigo and teaches the way she learned — at home, with tea, without a script.",
    language: "English",
    featured: true,
    created_at: now.toISOString(),
  },
  {
    id: "2",
    slug: "erhai-cycling-pottery",
    title: "Hand-Building Clay by Erhai Lake",
    description:
      "Ceramics in a lakeside studio after a gentle ride through Bai villages — mountain lake creative life, not checklist China.",
    long_description:
      "Li Wei trained in Jingdezhen and chose Dali for the light on Erhai. You may ride slowly along the western shore (e-bikes provided), then settle into her studio for hand-building bowls or quiet decorative pieces. The day is unhurried: water, clay, conversation. Shipping worldwide is arranged if you want your piece fired and sent home. Ideal for ceramic artists, photographers, and anyone chasing a softer version of China.",
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
      "Ceramic artist based on Erhai. Li studied in Jingdezhen and has lived in Dali for twelve years — clay, lake light, and village pace.",
    language: "English",
    featured: true,
    created_at: now.toISOString(),
  },
  {
    id: "3",
    slug: "chengdu-tea-house-afternoon",
    title: "Chengdu Tea House & Home Kitchen",
    description:
      "Old tea houses, mahjong murmur, and family-style cooking — community life, not a spice challenge.",
    long_description:
      "Chef Zhang Lin grew up between Chengdu tea houses and her grandmother's kitchen. You begin in a neighbourhood teahouse — bamboo chairs, endless pours, the soft clatter of tiles — then walk to her apartment to cook a seasonal lunch together: market vegetables, fermented flavours, recipes written for your kitchen at home. This is the Sichuan that Condé Nast travellers actually write about: relaxed, communal, slightly raw. Not pandas, not hotpot theatre.",
    region: "sichuan",
    location: "Wuhou District, Chengdu",
    duration_hours: 4,
    max_participants: 8,
    price_cents: 7500,
    currency: "usd",
    image_url: workshopCoverPath("tea-ceremony-mount-emei"),
    gallery_urls: [],
    highlights: [
      "Classic Chengdu teahouse visit",
      "Family kitchen, small group",
      "Seasonal market ingredients",
      "Recipe cards in English",
    ],
    includes: [
      "Teahouse tea & snacks",
      "Cooking session & lunch",
      "Recipes (EN)",
      "Neighbourhood walk",
    ],
    host_name: "Chef Zhang Lin",
    host_bio:
      "Chengdu-born cook and teahouse regular. Zhang writes about Sichuan home food the way a host writes a letter — personal, seasonal, never performative.",
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
    title: "Tea Horse Road: Mountain Tea & Forest Air",
    description:
      "Fire-roasted leaves, gongfu tea, and stories from the old trade routes — tea lifestyle for curious British tea people.",
    long_description:
      "Chen Yu is from the tea slopes below Mount Emei. You walk through forest that still remembers the Tea Horse Road, then sit for a slow ceremony: fire-roasted green, aged pu'er, and a Bai-style three-course tea if the season allows. Chen talks about leaves the way a sommelier talks about memory — origin, roast, water, pause. This is not a tasting flight; it is an afternoon of tea as daily life, which lands especially well with travellers who already have a tea imagination.",
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
    host_bio:
      "Tea maker and Mount Emei native. Chen roasts in small batches and hosts travellers who want tea as culture, not performance.",
    language: "English",
    featured: true,
    created_at: now.toISOString(),
  },
  {
    id: "6",
    slug: "nuodeng-salt-well-hike",
    title: "Nuodeng: Salt, Heritage & Slow Walking",
    description:
      "A 1300-year-old village on the Tea Horse Road — living salt wells, Bai lunch, documentary calm.",
    long_description:
      "Zhao Bin was born in Nuodeng and guides only small groups. You walk cobbled lanes above working salt wells, hear how caravans once crossed these ridges, and eat a Bai family lunch with seasonal mushrooms and fermented sides. The village is not a theme park — it is slightly raw, poetic, imperfect in the way Kinfolk readers tend to love. Alternative China at human scale.",
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
    host_bio:
      "Historian and guide born in Nuodeng. Zhao tells village stories like essays, not scripts.",
    language: "English",
    featured: true,
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

function allMockWorkshops(): Workshop[] {
  return [...MOCK_WORKSHOPS, ...demoAllHostWorkshopsForPublic()];
}

export function getMockWorkshops(region?: string, city?: string): Workshop[] {
  let list = allMockWorkshops();

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
  const workshop = allMockWorkshops().find((w) => w.slug === slug);
  if (!workshop) return null;
  const seeded = MOCK_SESSIONS[workshop.id] ?? [];
  const hosted = demoSessionsForWorkshop(workshop.id);
  const sessions = [...seeded, ...hosted].sort((a, b) =>
    a.starts_at.localeCompare(b.starts_at)
  );
  return { ...workshop, sessions };
}

export function getMockSession(
  sessionId: string
): (WorkshopSession & { workshop: Workshop }) | null {
  for (const workshop of allMockWorkshops()) {
    const sessions = [
      ...(MOCK_SESSIONS[workshop.id] ?? []),
      ...demoSessionsForWorkshop(workshop.id),
    ];
    const session = sessions.find((s) => s.id === sessionId);
    if (session) return { ...session, workshop };
  }
  const demoSess = demoAllSessions().find((s) => s.id === sessionId);
  if (demoSess) {
    const workshop = allMockWorkshops().find((w) => w.id === demoSess.workshop_id);
    if (workshop) return { ...demoSess, workshop };
  }
  return null;
}
