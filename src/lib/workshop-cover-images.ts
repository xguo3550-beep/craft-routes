/**
 * Curated real photography (Unsplash).
 * Run `npm run images:download` on your Mac, then USE_LOCAL_WORKSHOP_IMAGES=true
 */

const PHOTO_PARAMS = "auto=format&fit=crop&w=1200&h=900&q=80";

/** IDs that load reliably in-browser (same CDN family as other working cards) */
const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?${PHOTO_PARAMS}`;

export const CURATED_PHOTO_URLS: Record<string, string> = {
  "bai-ethnic-tie-dye": U("1615485924169-f27c8fe9c187"),
  "erhai-cycling-pottery": U("1565194669956-38fb0b7a9c1e"),
  "tea-ceremony-mount-emei": U("1506905925346-21bda4d32df4"),
  "chengdu-tea-house-afternoon": U("1582878826629-29b7ad1cdc43"),
  "nuodeng-salt-well-hike": U("1464822759023-fed622ff2c3b"),
  "shuimo-painting-pandas": U("1563492065599-3520f775eeed"),
  "sichuan-hotpot-cooking": U("1582878826629-29b7ad1cdc43"),
  "cafe-cats": U("1514887279491-afe06896c428"),
  "dali-experience": U("1506905925346-21bda4d32df4"),
  "sichuan-experience": U("1563492065599-3520f775eeed"),
  "default-experience": U("1464822759023-fed622ff2c3b"),
};

/** Distinct alternates when primary fails (never duplicate the primary URL) */
export const FALLBACK_PHOTO_URLS: Record<string, string> = {
  "bai-ethnic-tie-dye": U("1582719478250-c89cae4dc85b"),
  "erhai-cycling-pottery": U("1578746926376-cabb46493b4b"),
  "tea-ceremony-mount-emei": U("1464822759023-fed622ff2c3b"),
  "chengdu-tea-house-afternoon": U("1563492065599-3520f775eeed"),
  "nuodeng-salt-well-hike": U("1506905925346-21bda4d32df4"),
};

export const LOCAL_WORKSHOP_COVERS = Object.keys(CURATED_PHOTO_URLS);

export const KNOWN_COVER_SLUGS = new Set(LOCAL_WORKSHOP_COVERS);

export function workshopCoverLocalPath(key: string): string {
  return `/images/workshops/${key}.jpg`;
}

export function pickCoverKey(
  slug: string,
  region?: string,
  title?: string
): string {
  if (KNOWN_COVER_SLUGS.has(slug)) return slug;

  const hay = `${slug} ${title ?? ""}`.toLowerCase();

  if (/cat|cafe|coffee|gigi|kitten/.test(hay)) return "cafe-cats";
  if (/tie.?dye|indigo|textile|bai/.test(hay)) return "bai-ethnic-tie-dye";
  if (/pottery|clay|ceramic/.test(hay)) return "erhai-cycling-pottery";
  if (/cycl|bike|erhai|lake/.test(hay)) return "erhai-cycling-pottery";
  if (/tea.?house|chengdu|mahjong|teahouse/.test(hay)) return "chengdu-tea-house-afternoon";
  if (/hotpot|hot.?pot|cook|sichuan food|chili/.test(hay)) return "sichuan-hotpot-cooking";
  if (/panda|ink|paint|shuimo|calligraphy/.test(hay)) return "shuimo-painting-pandas";
  if (/tea|ceremony|matcha|pu.?er/.test(hay)) return "tea-ceremony-mount-emei";
  if (/hike|trail|mountain|village|salt/.test(hay)) return "nuodeng-salt-well-hike";

  if (region === "dali") return "dali-experience";
  if (region === "sichuan") return "sichuan-experience";

  return "default-experience";
}

export function curatedPhotoUrl(key: string, useFallback = false): string {
  const map = useFallback ? FALLBACK_PHOTO_URLS : CURATED_PHOTO_URLS;
  return map[key] ?? CURATED_PHOTO_URLS[key] ?? CURATED_PHOTO_URLS["default-experience"];
}

/** Ordered alternates for client-side onError recovery */
export function coverAlternateUrls(key: string, region?: string): string[] {
  const urls = [
    curatedPhotoUrl(key, false),
    curatedPhotoUrl(key, true),
    region === "sichuan"
      ? curatedPhotoUrl("sichuan-experience")
      : curatedPhotoUrl("dali-experience"),
    curatedPhotoUrl("default-experience"),
  ];
  return urls.filter((url, i, arr) => arr.indexOf(url) === i);
}

export function resolveWorkshopCoverUrl(
  slug: string,
  options?: { region?: string; title?: string; imageUrl?: string | null }
): string {
  const key = pickCoverKey(slug, options?.region, options?.title);
  const imageUrl = options?.imageUrl?.trim();

  if (process.env.USE_LOCAL_WORKSHOP_IMAGES === "true") {
    return workshopCoverLocalPath(key);
  }

  // Ignore stale Unsplash URLs in DB/mock — always use the curated map by slug
  if (
    imageUrl?.startsWith("http://") ||
    imageUrl?.startsWith("https://")
  ) {
    if (!imageUrl.includes("images.unsplash.com")) {
      return imageUrl;
    }
  }

  if (imageUrl?.startsWith("/images/")) {
    return imageUrl;
  }

  return curatedPhotoUrl(key);
}

export function workshopCoverImage(
  slug: string,
  region?: string,
  title?: string
): string {
  return resolveWorkshopCoverUrl(slug, { region, title });
}

export function normalizeWorkshopImageUrl(workshop: {
  slug: string;
  region?: string;
  title?: string;
  image_url?: string | null;
}): string {
  return resolveWorkshopCoverUrl(workshop.slug, {
    region: workshop.region,
    title: workshop.title,
    imageUrl: workshop.image_url,
  });
}

export function absoluteWorkshopImageUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";
  return `${base}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}
