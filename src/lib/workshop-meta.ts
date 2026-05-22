const SLUG_EMOJI: Record<string, string> = {
  "bai-ethnic-tie-dye": "🧵",
  "erhai-cycling-pottery": "🚲",
  "sichuan-hotpot-cooking": "🍲",
  "shuimo-painting-pandas": "🐼",
  "tea-ceremony-mount-emei": "🍵",
  "nuodeng-salt-well-hike": "⛰️",
};

const SLUG_BADGE: Record<string, { label: string; className: string }> = {
  "bai-ethnic-tie-dye": {
    label: "Most popular",
    className: "bg-brand-100 text-brand-700",
  },
  "erhai-cycling-pottery": {
    label: "New",
    className: "bg-emerald-50 text-emerald-700",
  },
  "sichuan-hotpot-cooking": {
    label: "Top rated",
    className: "bg-amber-50 text-amber-800",
  },
};

import { workshopCoverImage, workshopCoverLocalPath } from "@/lib/workshop-cover-images";

export function workshopCoverPath(slug: string): string {
  if (process.env.USE_LOCAL_WORKSHOP_IMAGES === "true") {
    return workshopCoverLocalPath(slug);
  }
  return workshopCoverImage(slug);
}

export function workshopEmoji(slug: string): string {
  return SLUG_EMOJI[slug] ?? "✨";
}

export function workshopBadge(slug: string, featured: boolean) {
  if (SLUG_BADGE[slug]) return SLUG_BADGE[slug];
  if (featured) {
    return { label: "Featured", className: "bg-brand-100 text-brand-700" };
  }
  return null;
}

export function workshopRating(id: string): string {
  const n = parseInt(id, 10) || 1;
  return (4.88 + (n % 9) * 0.01).toFixed(2);
}

export function regionPastelBg(region: string): string {
  return region === "dali" ? "bg-pastel-peach" : "bg-pastel-sage";
}
