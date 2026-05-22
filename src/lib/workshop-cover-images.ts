/** Workshop covers — served from /public/images/workshops (reliable, no hotlink blocks). */

export const LOCAL_WORKSHOP_COVERS = [
  "bai-ethnic-tie-dye",
  "erhai-cycling-pottery",
  "tea-ceremony-mount-emei",
  "chengdu-tea-house-afternoon",
  "nuodeng-salt-well-hike",
  "sichuan-hotpot-cooking",
  "shuimo-painting-pandas",
  "cafe-cats",
  "dali-experience",
  "sichuan-experience",
  "default-experience",
] as const;

export type LocalCoverKey = (typeof LOCAL_WORKSHOP_COVERS)[number];

export const KNOWN_COVER_SLUGS = new Set<string>(LOCAL_WORKSHOP_COVERS);

const REMOTE_BLOCKED = /images\.(unsplash|pexels)\.com/i;

export function workshopCoverLocalPath(key: LocalCoverKey | string): string {
  return `/images/workshops/${key}.jpg`;
}

/** Pick the best bundled cover for a workshop slug / title / region. */
export function pickCoverKey(
  slug: string,
  region?: string,
  title?: string
): LocalCoverKey {
  if (KNOWN_COVER_SLUGS.has(slug)) {
    return slug as LocalCoverKey;
  }

  const hay = `${slug} ${title ?? ""}`.toLowerCase();

  if (/cat|cafe|coffee|gigi|kitten/.test(hay)) return "cafe-cats";
  if (/tie.?dye|indigo|textile|bai/.test(hay)) return "bai-ethnic-tie-dye";
  if (/pottery|clay|ceramic/.test(hay)) return "erhai-cycling-pottery";
  if (/cycl|bike|erhai|lake/.test(hay)) return "erhai-cycling-pottery";
  if (/tea.?house|chengdu|mahjong|teahouse/.test(hay)) return "tea-ceremony-mount-emei";
  if (/hotpot|hot.?pot|cook|sichuan food|chili/.test(hay)) return "sichuan-hotpot-cooking";
  if (/panda|ink|paint|shuimo|calligraphy/.test(hay)) return "shuimo-painting-pandas";
  if (/tea|ceremony|matcha/.test(hay)) return "tea-ceremony-mount-emei";
  if (/hike|trail|mountain|village|salt/.test(hay)) return "nuodeng-salt-well-hike";

  if (region === "dali") return "dali-experience";
  if (region === "sichuan") return "sichuan-experience";

  return "default-experience";
}

export function resolveWorkshopCoverUrl(
  slug: string,
  options?: { region?: string; title?: string; imageUrl?: string | null }
): string {
  const imageUrl = options?.imageUrl?.trim();
  if (imageUrl?.startsWith("/images/workshops/")) {
    return imageUrl;
  }

  const key = pickCoverKey(slug, options?.region, options?.title);
  return workshopCoverLocalPath(key);
}

/** @deprecated Use resolveWorkshopCoverUrl — kept for imports */
export function workshopCoverImage(
  slug: string,
  region?: string,
  title?: string
): string {
  return resolveWorkshopCoverUrl(slug, { region, title });
}

/** Replace broken remote URLs (Unsplash/Pexels 403) with bundled covers. */
export function normalizeWorkshopImageUrl(workshop: {
  slug: string;
  region?: string;
  title?: string;
  image_url?: string | null;
}): string {
  const url = workshop.image_url?.trim() ?? "";
  if (url.startsWith("/images/workshops/")) return url;
  if (url && !REMOTE_BLOCKED.test(url)) return url;
  return resolveWorkshopCoverUrl(workshop.slug, {
    region: workshop.region,
    title: workshop.title,
    imageUrl: url,
  });
}

/** Stripe / OG need absolute URLs for paths under /public */
export function absoluteWorkshopImageUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";
  return `${base}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}
