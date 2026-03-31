import { createClient } from "./supabase/client";

const WHITELISTED_EMAILS = [
  "clairehzhu@gmail.com",
  "wndrisso@gmail.com",
];

const FREE_SESSION_LIMIT = 3;

export interface SessionEligibility {
  canStart: boolean;
  sessionsUsed: number;
  sessionLimit: number;
  plan: "free" | "pro";
  isWhitelisted: boolean;
}

export async function checkSessionEligibility(): Promise<SessionEligibility> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Guests can always try (no tracking)
  if (!user) {
    return {
      canStart: true,
      sessionsUsed: 0,
      sessionLimit: FREE_SESSION_LIMIT,
      plan: "free",
      isWhitelisted: false,
    };
  }

  const email = user.email ?? "";
  const isWhitelisted = WHITELISTED_EMAILS.includes(email.toLowerCase());

  // Check plan from profiles table
  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  const plan = (profile?.plan === "pro" || isWhitelisted) ? "pro" : "free";

  if (plan === "pro") {
    return {
      canStart: true,
      sessionsUsed: 0,
      sessionLimit: Infinity,
      plan: "pro",
      isWhitelisted,
    };
  }

  // Count sessions this calendar month
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { count } = await supabase
    .from("sessions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("completed_at", monthStart);

  const sessionsUsed = count ?? 0;

  return {
    canStart: sessionsUsed < FREE_SESSION_LIMIT,
    sessionsUsed,
    sessionLimit: FREE_SESSION_LIMIT,
    plan: "free",
    isWhitelisted: false,
  };
}
