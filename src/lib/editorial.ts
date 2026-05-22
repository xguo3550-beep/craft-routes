/** Editorial framing for UK creative / slow-travel audience */

export interface ExperienceEditorial {
  /** Short line under title on cards — magazine tone */
  tagline: string;
  /** One-word mood for filters / badges */
  mood: string;
  /** Display order on homepage (lower = first) */
  order: number;
}

/** Curated “Stories from Southwest China” — max 5 on homepage */
export const CURATED_SLUGS = [
  "bai-ethnic-tie-dye",
  "tea-ceremony-mount-emei",
  "erhai-cycling-pottery",
  "chengdu-tea-house-afternoon",
  "nuodeng-salt-well-hike",
] as const;

export const EXPERIENCE_EDITORIAL: Record<string, ExperienceEditorial> = {
  "bai-ethnic-tie-dye": {
    tagline: "$195 · private courtyard indigo · max 6 — for design & fashion people",
    mood: "Textiles",
    order: 1,
  },
  "tea-ceremony-mount-emei": {
    tagline: "$180 · fire-roasted tea, lunch, transport & sunset gongfu · max 6",
    mood: "Tea",
    order: 2,
  },
  "erhai-cycling-pottery": {
    tagline: "$240 · lakeside clay & slow Erhai light · intimate studio",
    mood: "Ceramics",
    order: 3,
  },
  "chengdu-tea-house-afternoon": {
    tagline: "$165 · teahouse ritual & family kitchen · max 6 guests",
    mood: "Tea life",
    order: 4,
  },
  "nuodeng-salt-well-hike": {
    tagline: "$220 · heritage village, Bai lunch & historian host · small group",
    mood: "Heritage",
    order: 5,
  },
  "sichuan-hotpot-cooking": {
    tagline: "Legacy listing — see Chengdu tea house experience",
    mood: "Food",
    order: 99,
  },
  "shuimo-painting-pandas": {
    tagline: "Ink, bamboo & quiet studio time in Chengdu",
    mood: "Art",
    order: 99,
  },
};

export function experienceEditorial(slug: string): ExperienceEditorial | null {
  return EXPERIENCE_EDITORIAL[slug] ?? null;
}

export function isCuratedExperience(slug: string): boolean {
  return (CURATED_SLUGS as readonly string[]).includes(slug);
}
