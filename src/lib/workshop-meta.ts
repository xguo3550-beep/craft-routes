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

const SLUG_COVER_GRADIENT: Record<string, string> = {
  "bai-ethnic-tie-dye": "from-[#1E3A5F] to-[#4A6FA5]",
  "erhai-cycling-pottery": "from-[#E8F4F8] via-[#B8D4E3] to-[#7BA3BC]",
  "sichuan-hotpot-cooking": "from-[#C0562F] to-[#8B3A22]",
  "shuimo-painting-pandas": "from-[#F0EDE8] to-[#C4B8A8]",
  "tea-ceremony-mount-emei": "from-[#E8F5E9] to-[#81A684]",
  "nuodeng-salt-well-hike": "from-[#5C4A3A] to-[#A68B6B]",
};

export function workshopCoverGradient(slug: string): string {
  return SLUG_COVER_GRADIENT[slug] ?? "from-brand-100 to-brand-200";
}

export function workshopCoverPath(slug: string): string {
  return `/images/workshops/${slug}.svg`;
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
