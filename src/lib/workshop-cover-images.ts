/**
 * Curated real photography (Unsplash — free to use).
 * Run `npm run images:download` on your Mac to save copies under public/images/workshops/.
 */

const PHOTO_PARAMS = "auto=format&fit=crop&w=1200&h=900&q=85";

/** Thematic Unsplash photos — indigo, Erhai, tea, pottery, China villages */
export const CURATED_PHOTO_URLS: Record<string, string> = {
  "bai-ethnic-tie-dye": `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?${PHOTO_PARAMS}`,
  "erhai-cycling-pottery": `https://images.unsplash.com/photo-1470071459605-3b5ec3a8b698?${PHOTO_PARAMS}`,
  "tea-ceremony-mount-emei": `https://images.unsplash.com/photo-1556671047-1351529b6bf1?${PHOTO_PARAMS}`,
  "chengdu-tea-house-afternoon": `https://images.unsplash.com/photo-1544787219-cba4b4f3c313?${PHOTO_PARAMS}`,
  "nuodeng-salt-well-hike": `https://images.unsplash.com/photo-1508804185779-d106f582f903?${PHOTO_PARAMS}`,
  "shuimo-painting-pandas": `https://images.unsplash.com/photo-1563492065599-3520f775eeed?${PHOTO_PARAMS}`,
  "sichuan-hotpot-cooking": `https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?${PHOTO_PARAMS}`,
  "cafe-cats": `https://images.unsplash.com/photo-1514887279491-afe06896c428?${PHOTO_PARAMS}`,
  "dali-experience": `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?${PHOTO_PARAMS}`,
  "sichuan-experience": `https://images.unsplash.com/photo-1528360983277-f83d811b5e8?${PHOTO_PARAMS}`,
  "default-experience": `https://images.unsplash.com/photo-1508804185779-d106f582f903?${PHOTO_PARAMS}`,
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

export function curatedPhotoUrl(key: string): string {
  return CURATED_PHOTO_URLS[key] ?? CURATED_PHOTO_URLS["default-experience"];
}

export function resolveWorkshopCoverUrl(
  slug: string,
  options?: { region?: string; title?: string; imageUrl?: string | null }
): string {
  const imageUrl = options?.imageUrl?.trim();

  if (imageUrl?.startsWith("http://") || imageUrl?.startsWith("https://")) {
    return imageUrl;
  }

  if (
    process.env.USE_LOCAL_WORKSHOP_IMAGES === "true" &&
    imageUrl?.startsWith("/images/workshops/")
  ) {
    return imageUrl;
  }

  if (process.env.USE_LOCAL_WORKSHOP_IMAGES === "true") {
    const key = pickCoverKey(slug, options?.region, options?.title);
    return workshopCoverLocalPath(key);
  }

  const key = pickCoverKey(slug, options?.region, options?.title);
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
  const url = workshop.image_url?.trim() ?? "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (process.env.USE_LOCAL_WORKSHOP_IMAGES === "true" && url.startsWith("/images/")) {
    return url;
  }

  return resolveWorkshopCoverUrl(workshop.slug, {
    region: workshop.region,
    title: workshop.title,
    imageUrl: url,
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
