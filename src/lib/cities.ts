export type CitySlug =
  | "dali"
  | "xizhou"
  | "nuodeng"
  | "chengdu"
  | "emeishan"
  | "kunming"
  | "lijiang"
  | "jingdezhen"
  | "shanghai"
  | "beijing";

export interface CityInfo {
  slug: CitySlug;
  name: string;
  region: "dali" | "sichuan" | "other";
  icon: string;
  experienceCount: string;
  tags: string[];
  href: string;
  available: boolean;
}

/** Which city each workshop is hosted in */
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
    region: "dali",
    icon: "🏯",
    experienceCount: "Coming 2025",
    tags: ["Old town", "Naxi culture"],
    href: "/cities",
    available: false,
  },
  {
    slug: "jingdezhen",
    name: "Jingdezhen",
    region: "other",
    icon: "🏺",
    experienceCount: "Coming 2025",
    tags: ["Porcelain", "Kilns"],
    href: "/cities",
    available: false,
  },
  {
    slug: "shanghai",
    name: "Shanghai",
    region: "other",
    icon: "🏙️",
    experienceCount: "Coming 2025",
    tags: ["Cooking", "Markets"],
    href: "/cities",
    available: false,
  },
  {
    slug: "beijing",
    name: "Beijing",
    region: "other",
    icon: "🏯",
    experienceCount: "Coming 2025",
    tags: ["Hutongs", "Calligraphy"],
    href: "/cities",
    available: false,
  },
];

export function getWorkshopCity(slug: string, region: string): CitySlug {
  return (
    WORKSHOP_CITY[slug] ??
    (region === "dali" ? "dali" : "chengdu")
  );
}

export function cityLabel(slug: CitySlug): string {
  const city = CITIES.find((c) => c.slug === slug);
  if (city) return city.name.toUpperCase();
  return slug.toUpperCase();
}

export function cityDisplayLabel(slug: CitySlug): string {
  const labels: Record<CitySlug, string> = {
    dali: "Dali, Yunnan",
    xizhou: "Xizhou, Dali",
    nuodeng: "Nuodeng, Yunnan",
    chengdu: "Chengdu, Sichuan",
    emeishan: "Emeishan, Sichuan",
    kunming: "Kunming, Yunnan",
    lijiang: "Lijiang, Yunnan",
    jingdezhen: "Jingdezhen, Jiangxi",
    shanghai: "Shanghai",
    beijing: "Beijing",
  };
  return labels[slug] ?? slug;
}

export function isCitySlug(value: string): value is CitySlug {
  return CITIES.some((c) => c.slug === value);
}
