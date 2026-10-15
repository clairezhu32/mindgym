import { createClient } from "./client";

export interface SavedAffirmationRecord {
  id: string;
  user_id: string;
  affirmation_id: string;
  created_at: string;
}

export async function getSavedAffirmationIds(): Promise<{ ids: string[]; error: string | null }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ids: [], error: "Not authenticated" };

  const { data, error } = await supabase
    .from("saved_affirmations")
    .select("affirmation_id")
    .eq("user_id", user.id);

  return {
    ids: (data ?? []).map((r) => r.affirmation_id),
    error: error?.message ?? null,
  };
}

export async function saveAffirmation(affirmationId: string): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("saved_affirmations").upsert(
    { user_id: user.id, affirmation_id: affirmationId },
    { onConflict: "user_id,affirmation_id" }
  );

  return { error: error?.message ?? null };
}

export async function unsaveAffirmation(affirmationId: string): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("saved_affirmations")
    .delete()
    .eq("user_id", user.id)
    .eq("affirmation_id", affirmationId);

  return { error: error?.message ?? null };
}
