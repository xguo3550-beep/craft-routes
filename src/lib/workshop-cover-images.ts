/** Real stock photos (Pexels) — hotlink works in browser & on Vercel */
export const WORKSHOP_COVER_IMAGES: Record<string, string> = {
  "bai-ethnic-tie-dye":
    "https://images.pexels.com/photos/3991881/pexels-photo-3991881.jpeg?auto=compress&cs=tinysrgb&w=1200&h=960&fit=crop",
  "erhai-cycling-pottery":
    "https://images.pexels.com/photos/128460/pexels-photo-128460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=960&fit=crop",
  "sichuan-hotpot-cooking":
    "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=1200&h=960&fit=crop",
  "shuimo-painting-pandas":
    "https://images.pexels.com/photos/3310694/pexels-photo-3310694.jpeg?auto=compress&cs=tinysrgb&w=1200&h=960&fit=crop",
  "tea-ceremony-mount-emei":
    "https://images.pexels.com/photos/6527375/pexels-photo-6527375.jpeg?auto=compress&cs=tinysrgb&w=1200&h=960&fit=crop",
  "nuodeng-salt-well-hike":
    "https://images.pexels.com/photos/4170746/pexels-photo-4170746.jpeg?auto=compress&cs=tinysrgb&w=1200&h=960&fit=crop",
};

export function workshopCoverImage(slug: string): string {
  return (
    WORKSHOP_COVER_IMAGES[slug] ??
    "https://images.pexels.com/photos/128460/pexels-photo-128460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=960&fit=crop"
  );
}

/** Local path after running scripts/download-workshop-images.sh */
export function workshopCoverLocalPath(slug: string): string {
  return `/images/workshops/${slug}.jpg`;
}
