/** Public brand — single source of truth */
export const SITE_NAME = "Elsewhere China";

export const SITE_DESCRIPTION =
  "A softer, slower China for creative travellers — curated afternoons with hosts in Yunnan & Sichuan.";

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@elsewherechina.com";

export function siteTitle(page?: string): string {
  return page ? `${page} · ${SITE_NAME}` : SITE_NAME;
}
