export type CitySlug =
  | "dali"
  | "xizhou"
  | "nuodeng"
  | "chengdu"
  | "emeishan"
  | "kunming"
  | "lijiang";

export interface CityInfo {
  slug: CitySlug;
  name: string;
  subtitle: string;
  region: "dali" | "sichuan";
  icon: string;
  experienceCount: string;
  tags: string[];
  href: string;
  available: boolean;
}

export const WORKSHOP_CITY: Record<string, CitySlug> = {
  "bai-ethnic-tie-dye": "xizhou",
  "erhai-cycling-pottery": "dali",
  "nuodeng-salt-well-hike": "nuodeng",
  "sichuan-hotpot-cooking": "chengdu",
  "shuimo-painting-pandas": "chengdu",
  "tea-ceremony-mount-emei": "emeishan",
};

export const CITIES: CityInfo[] = [
  {
    slug: "dali",
    name: "Dali",
    subtitle: "Dali, Yunnan",
    region: "dali",
    icon: "🏔️",
    experienceCount: "2 experiences",
    tags: ["Cycling", "Lake", "Pottery"],
    href: "/workshops?city=dali",
    available: true,
  },
  {
    slug: "xizhou",
    name: "Xizhou",
    subtitle: "Xizhou, Dali",
    region: "dali",
    icon: "🧵",
    experienceCount: "1 experience",
    tags: ["Tie-dye", "Bai culture"],
    href: "/workshops?city=xizhou",
    available: true,
  },
  {
    slug: "nuodeng",
    name: "Nuodeng",
    subtitle: "Nuodeng, Yunnan",
    region: "dali",
    icon: "🧂",
    experienceCount: "1 experience",
    tags: ["Hiking", "History"],
    href: "/workshops?city=nuodeng",
    available: true,
  },
  {
    slug: "chengdu",
    name: "Chengdu",
    subtitle: "Chengdu, Sichuan",
    region: "sichuan",
    icon: "🐼",
    experienceCount: "2 experiences",
    tags: ["Hotpot", "Ink art", "Pandas"],
    href: "/workshops?city=chengdu",
    available: true,
  },
  {
    slug: "emeishan",
    name: "Emeishan",
    subtitle: "Emeishan, Sichuan",
    region: "sichuan",
    icon: "🍵",
    experienceCount: "1 experience",
    tags: ["Tea", "Forest walks"],
    href: "/workshops?city=emeishan",
    available: true,
  },
  {
    slug: "kunming",
    name: "Kunming",
    subtitle: "Kunming, Yunnan",
    region: "dali",
    icon: "🌸",
    experienceCount: "Coming 2025",
    tags: ["Markets", "Flowers"],
    href: "/cities",
    available: false,
  },
  {
    slug: "lijiang",
    name: "Lijiang",
    subtitle: "Lijiang, Yunnan",
    region: "dali",
    icon: "🏯",
    experienceCount: "Coming 2025",
    tags: ["Old town", "Naxi culture"],
    href: "/cities",
    available: false,
  },
];

export function getWorkshopCity(slug: string, region: string): CitySlug {
  return WORKSHOP_CITY[slug] ?? (region === "dali" ? "dali" : "chengdu");
}

export function cityLabel(slug: CitySlug): string {
  const city = CITIES.find((c) => c.slug === slug);
  return city ? city.name.toUpperCase() : slug.toUpperCase();
}

export function cityDisplayLabel(slug: CitySlug): string {
  const city = CITIES.find((c) => c.slug === slug);
  return city?.subtitle ?? slug;
}

export function isCitySlug(value: string): value is CitySlug {
  return CITIES.some((c) => c.slug === value);
}
