import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export function isSupabaseConfigured() {
  return (
    SUPABASE_URL.startsWith("http") &&
    SUPABASE_ANON_KEY.length > 0 &&
    SUPABASE_ANON_KEY !== "your_supabase_anon_key_here"
  );
}

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
