/** Curated cover photos — thematic, high quality (Unsplash) */
const COVER_PARAMS = "auto=format&fit=crop&w=1200&h=900&q=85";

export const WORKSHOP_COVER_IMAGES: Record<string, string> = {
  "bai-ethnic-tie-dye": `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?${COVER_PARAMS}`,
  "erhai-cycling-pottery": `https://images.unsplash.com/photo-1470071459605-3b5ec3a8b698?${COVER_PARAMS}`,
  "sichuan-hotpot-cooking": `https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?${COVER_PARAMS}`,
  "shuimo-painting-pandas": `https://images.unsplash.com/photo-1563492065599-3520f775eeed?${COVER_PARAMS}`,
  "tea-ceremony-mount-emei": `https://images.unsplash.com/photo-1571930171630-aa5e01b390c2?${COVER_PARAMS}`,
  "nuodeng-salt-well-hike": `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?${COVER_PARAMS}`,
};

export const KNOWN_COVER_SLUGS = new Set(Object.keys(WORKSHOP_COVER_IMAGES));

export function workshopCoverImage(slug: string): string {
  return (
    WORKSHOP_COVER_IMAGES[slug] ??
    `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?${COVER_PARAMS}`
  );
}

export function workshopCoverLocalPath(slug: string): string {
  return `/images/workshops/${slug}.jpg`;
}
