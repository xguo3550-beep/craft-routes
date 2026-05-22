import { slugify } from "@/lib/slug";
import { demoAllHostWorkshopsForPublic } from "@/lib/auth/demo-store";

export function buildUniqueWorkshopSlug(title: string, existingSlugs: string[]): string {
  const base = slugify(title) || "experience";
  let slug = base;
  let n = 2;
  const taken = new Set(existingSlugs);
  while (taken.has(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

export async function collectExistingSlugs(
  supabase: ReturnType<typeof import("@/lib/supabase/server").createServerClient>
): Promise<string[]> {
  const slugs = demoAllHostWorkshopsForPublic().map((w) => w.slug);
  if (supabase) {
    const { data } = await supabase.from("workshops").select("slug");
    if (data) {
      for (const row of data) {
        if (row.slug) slugs.push(row.slug as string);
      }
    }
  }
  return slugs;
}
