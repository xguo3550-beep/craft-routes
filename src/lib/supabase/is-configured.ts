const PLACEHOLDER_PATTERNS = [
  /your-project/i,
  /your-anon/i,
  /your-service/i,
  /example\.com/i,
  /placeholder/i,
  /^pk_test_\.\.\./,
  /^sk_test_\.\.\./,
];

function isReal(value: string | undefined): boolean {
  if (!value || value.trim().length < 8) return false;
  return !PLACEHOLDER_PATTERNS.some((p) => p.test(value));
}

/** True only when Supabase env vars look like a real project (not .env.example placeholders). */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!isReal(url) || !isReal(anon)) return false;
  // Signup/admin needs service role; login needs anon + service for profile reads
  return isReal(service);
}
