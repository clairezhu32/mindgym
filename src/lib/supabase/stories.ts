import { createClient } from "./client";
import {
  pickStoryTemplate,
  renderStory,
  type StoryTemplate,
} from "@/lib/daily-stories";
import type { SessionRecord } from "@/types";

export interface DailyStoryRecord {
  id: string;
  user_id: string;
  date: string; // YYYY-MM-DD
  story_text: string;
  category: string;
  audio_url: string | null;
  created_at: string;
}

export interface StoryPersonalization {
  name?: string;
  event?: string;
  goal?: string;
  date?: string;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Lazy generation: fetch today's story if it exists, otherwise pick the
 * template for today (dayOfYear % 14), interpolate personalization vars,
 * persist it, and return it.
 */
export async function getOrCreateTodayStory(
  personalization: StoryPersonalization
): Promise<{ story: DailyStoryRecord | null; template: StoryTemplate; error: string | null }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const template = pickStoryTemplate();

  if (!user) {
    // Guests: render without persisting
    return {
      story: null,
      template,
      error: null,
    };
  }

  const date = todayKey();

  // Try existing
  const { data: existing, error: fetchError } = await supabase
    .from("daily_stories")
    .select("*")
    .eq("user_id", user.id)
    .eq("date", date)
    .maybeSingle();

  if (fetchError) return { story: null, template, error: fetchError.message };
  if (existing) return { story: existing as DailyStoryRecord, template, error: null };

  // Generate
  const storyText = renderStory(template, {
    name: personalization.name,
    event: personalization.event,
    goal: personalization.goal,
    date: personalization.date,
  });

  const { data: created, error: insertError } = await supabase
    .from("daily_stories")
    .insert({
      user_id: user.id,
      date,
      story_text: storyText,
      category: template.category,
    })
    .select()
    .single();

  if (insertError) {
    // Race: another tab created it — refetch
    const { data: raced } = await supabase
      .from("daily_stories")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", date)
      .maybeSingle();
    if (raced) return { story: raced as DailyStoryRecord, template, error: null };
    return { story: null, template, error: insertError.message };
  }

  return { story: created as DailyStoryRecord, template, error: null };
}

/** Recent stories for the archive list (most recent first). */
export async function getRecentStories(
  limit = 14
): Promise<{ stories: DailyStoryRecord[]; error: string | null }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { stories: [], error: "Not authenticated" };

  const { data, error } = await supabase
    .from("daily_stories")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .limit(limit);

  return {
    stories: (data as DailyStoryRecord[]) ?? [],
    error: error?.message ?? null,
  };
}

/**
 * Derive personalization vars from the user's profile + most recent session.
 * Sessions store event_name/goal; name comes from auth metadata.
 */
export async function derivePersonalization(
  sessions: SessionRecord[]
): Promise<StoryPersonalization> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ??
    user?.email?.split("@")[0] ??
    "";

  const latest = sessions[0];
  return {
    name: firstName || undefined,
    event: latest?.event_name ?? undefined,
    goal: latest?.goal ?? undefined,
    date: latest?.event_date
      ? new Date(latest.event_date + "T12:00:00").toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })
      : undefined,
  };
}
