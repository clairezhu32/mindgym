"use client";

import { createClient } from "@/lib/supabase/client";
import { getUserSessions } from "@/lib/supabase/sessions";
import StatsBar from "@/components/dashboard/StatsBar";
import RoadmapTimeline from "@/components/dashboard/RoadmapTimeline";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { SessionRecord } from "@/types";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { sessions } = await getUserSessions();
        setSessions(sessions);
      }
      setLoading(false);
    }
    load();
  }, []);

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] ??
    user?.email?.split("@")[0] ?? "there";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1f1e] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#2b7a78]/30 border-t-[#2b7a78] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1f1e]">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🧠</span>
          <span className="font-bold text-lg tracking-tight">
            <span className="text-white">Mind</span><span className="text-[#2b7a78]">Gym</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/session"
            className="px-4 py-2 rounded-full bg-[#2b7a78] text-[#0b1f1e] font-semibold text-sm hover:bg-[#4a9a97] transition-colors"
          >
            + New session
          </Link>
          <SignOutButton />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#eef2f1]">
            Welcome back, {firstName}
          </h1>
          <p className="text-[#8fb5b3] text-sm mt-1">
            Your personal confidence roadmap
          </p>
        </div>

        {/* Stats */}
        {sessions.length > 0 && <StatsBar sessions={sessions} />}

        {/* Roadmap */}
        <RoadmapTimeline sessions={sessions} />
      </main>
    </div>
  );
}

function SignOutButton() {
  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }
  return (
    <button
      onClick={handleSignOut}
      className="text-[#8fb5b3] hover:text-[#eef2f1] transition-colors text-sm"
    >
      Sign out
    </button>
  );
}
