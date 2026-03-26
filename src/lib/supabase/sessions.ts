import { createClient } from "./client";
import type { SessionRecord } from "@/types";

export interface SaveSessionInput {
  category: string;
  event_name: string | null;
  event_date: string | null;
  goal: string | null;
  pre_mood: number | null;
  post_mood: number | null;
}

export async function saveSession(input: SaveSessionInput): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("sessions").insert({
    user_id: user.id,
    ...input,
  });

  return { error: error?.message ?? null };
}

export async function getUserSessions(): Promise<{ sessions: SessionRecord[]; error: string | null }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { sessions: [], error: "Not authenticated" };

  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false });

  return {
    sessions: (data as SessionRecord[]) ?? [],
    error: error?.message ?? null,
  };
}
