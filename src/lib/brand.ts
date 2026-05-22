/** Public brand — single source of truth */
export const SITE_NAME = "Elsewhere China";

export const SITE_DESCRIPTION =
  "Hosted cultural gatherings in Yunnan & Sichuan — small groups, local hosts, unhurried afternoons.";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@elsewherechina.com";

export const AUDIENCE_LINE =
  "Curated for culturally curious travellers who value intimacy, craftsmanship, and thoughtful hospitality.";

export const POSITIONING = {
  audience: AUDIENCE_LINE,
  groupSize: "Small groups, up to six",
  pacing: "Thoughtful pacing, hosts chosen for depth rather than scale",
} as const;

/** Customer-facing booking language — less transactional than typical marketplaces */
export const BOOKING_COPY = {
  panelTitle: "Reserve your place",
  upcomingLabel: "Upcoming gatherings",
  groupLabel: "Your group",
  noDates: "No upcoming gatherings yet.",
  joinCta: "Reserve your place",
  checkoutFooter: "Free cancellation 48 hours before",
} as const;

export function siteTitle(page?: string): string {
  return page ? `${page} · ${SITE_NAME}` : SITE_NAME;
}

export function intimateGroupLabel(max: number): string {
  return max <= 6 ? `Up to ${max}` : `Up to ${max}`;
}

export function groupSizePhrase(count: number): string {
  return count === 1 ? "1 person" : `${count} people`;
}
