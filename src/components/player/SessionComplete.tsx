"use client";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { saveSession } from "@/lib/supabase/sessions";
import { useSession } from "@/context/SessionContext";
import Button from "@/components/shared/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

interface Props {
  onStartNew: () => void;
}

const EMOJIS = ["😰", "😟", "😐", "🙂", "😊"];

export default function SessionComplete({ onStartNew }: Props) {
  const { state } = useSession();
  const { preMood, postMood, category, answers } = state;
  const [user, setUser] = useState<User | null>(null);
  const [saved, setSaved] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const delta = (postMood ?? 0) - (preMood ?? 0);

  const categoryLabel: Record<string, string> = {
    interview: "Job Interview",
    presentation: "Presentation & Performance",
    athletic: "Athletic Event",
    general: "High-Stakes Moment",
  };

  // Check auth state and auto-save if logged in
  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      setUser(data.user);
      if (data.user && !saved) {
        await saveSession({
          category: category ?? "general",
          event_name: answers?.eventName ?? null,
          event_date: answers?.eventDate || null,
          goal: answers?.goal ?? null,
          pre_mood: preMood,
          post_mood: postMood,
        });
        setSaved(true);
      }
    });
  }, []);

  function goToDashboard() {
    router.push("/dashboard");
  }

  async function signInWithGoogle() {
    setOauthLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) {
        setError(error.message);
        setOauthLoading(false);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign-in failed.");
      setOauthLoading(false);
    }
  }

  return (
    <div className="animate-fade-up text-center max-w-lg mx-auto w-full">
      {/* Success animation */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute w-32 h-32 rounded-full bg-[#4ADE80]/10 animate-ping" />
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4ADE80] to-[#2b7a78] flex items-center justify-center text-3xl shadow-lg shadow-[#4ADE80]/20">
          ✓
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-3">Session complete</h1>
      <p className="text-[#8fb5b3] mb-8">
        {categoryLabel[category ?? "general"]} · 5 min session
      </p>

      {/* Mood delta */}
      {preMood && postMood && (
        <div className="p-6 rounded-2xl bg-[#1a3330] border border-[#2b7a78]/20 mb-8">
          <p className="text-sm text-[#8fb5b3] mb-4">Your confidence shift</p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="text-3xl mb-1">{EMOJIS[preMood - 1]}</div>
              <div className="text-xs text-[#8fb5b3]">Before</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-px w-8 bg-[#2b7a78]/30" />
              <span className={`text-sm font-bold ${
                delta > 0 ? "text-[#4ADE80]" : delta < 0 ? "text-[#F87171]" : "text-[#8fb5b3]"
              }`}>
                {delta > 0 ? `+${delta}` : delta === 0 ? "→" : delta}
              </span>
              <div className="h-px w-8 bg-[#2b7a78]/30" />
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">{EMOJIS[postMood - 1]}</div>
              <div className="text-xs text-[#8fb5b3]">After</div>
            </div>
          </div>
        </div>
      )}

      {/* CTA — different for logged-in vs guest */}
      <div className="space-y-3">
        {user ? (
          <>
            {saved && (
              <p className="text-xs text-[#4ADE80] mb-2">✓ Saved to your roadmap</p>
            )}
            <button
              onClick={goToDashboard}
              className="w-full py-3 rounded-full bg-[#2b7a78] text-[#0b1f1e] font-bold hover:bg-[#4a9a97] transition-colors"
            >
              View my roadmap →
            </button>
            <Button variant="outline" onClick={onStartNew} className="w-full">
              Start another session
            </Button>
          </>
        ) : (
          <>
            <div className="p-5 rounded-2xl bg-[#2b7a78]/10 border border-[#2b7a78]/30 mb-2">
              <p className="font-semibold mb-1">Track your confidence over time</p>
              <p className="text-[#8fb5b3] text-sm mb-4">
                Save this session and build your personal roadmap — free.
              </p>
              <div className="space-y-2">
                <button
                  onClick={signInWithGoogle}
                  disabled={oauthLoading}
                  className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-white text-[#1a1a1a] font-semibold text-sm hover:bg-gray-100 transition-all active:scale-95 disabled:opacity-60"
                >
                  {oauthLoading ? (
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  ) : <GoogleIcon />}
                  Continue with Google
                </button>
                <a
                  href="/login?mode=signup"
                  className="w-full flex items-center justify-center px-5 py-3 rounded-xl border border-[#2b7a78]/40 text-[#eef2f1] font-semibold text-sm hover:border-[#2b7a78] hover:bg-[#2b7a78]/10 transition-all"
                >
                  Create account with email
                </a>
              </div>
              {error && (
                <p className="mt-3 text-[#F87171] text-xs text-center">{error}</p>
              )}
              <p className="text-xs text-[#8fb5b3] mt-3">
                Or{" "}
                <button onClick={onStartNew} className="underline hover:text-[#eef2f1] transition-colors">
                  continue without an account
                </button>
              </p>
            </div>
            <Button variant="outline" onClick={onStartNew} className="w-full">
              Start another session
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

