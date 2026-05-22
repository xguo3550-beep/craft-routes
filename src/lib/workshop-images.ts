/** Local cover art — avoids Unsplash hotlink blocks in production */
export function workshopCoverPath(slug: string): string {
  return `/images/workshops/${slug}.svg`;
}
