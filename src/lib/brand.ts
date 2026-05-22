/** Public brand — single source of truth */
export const SITE_NAME = "Elsewhere China";

export const SITE_DESCRIPTION =
  "Quiet luxury cultural travel in Yunnan & Sichuan — intimate afternoons with vetted hosts for design-minded travellers aged 28–45.";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@elsewherechina.com";

/** Brand positioning — not budget marketplace */
export const POSITIONING = {
  audience:
    "Designers, architects, creative directors, founders, and culturally curious professionals — not mass tourism.",
  groupSize: "4–8 guests per session",
  priceFrame: "Meaningful luxury — priced for atmosphere, host time, and exclusivity.",
} as const;

export function siteTitle(page?: string): string {
  return page ? `${page} · ${SITE_NAME}` : SITE_NAME;
}

export function intimateGroupLabel(max: number): string {
  return max <= 6 ? `Intimate · max ${max}` : `Small group · max ${max}`;
}
