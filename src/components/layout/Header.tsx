"use client";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => setUser(session?.user ?? null)
    );
    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <header className="relative z-50 px-6 py-4 flex items-center justify-between bg-[#1d5c5a] border-b border-[#164d4b]">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl">🧠</span>
        <span className="font-bold text-xl tracking-tight text-white">
          <span className="text-white">Mind</span><span className="text-[#7ffffd]">Gym</span>
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm text-[#c8e8e7]">
        <Link href="/#how-it-works" className="hover:text-white transition-colors">
          How it works
        </Link>
        <Link href="/#pricing" className="hover:text-white transition-colors">
          Pricing
        </Link>
        {user ? (
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-full bg-white text-[#1d5c5a] font-semibold text-sm hover:bg-[#e4f2f0] transition-colors"
            >
              My roadmap
            </Link>
            <button
              onClick={signOut}
              className="text-[#c8e8e7] hover:text-white transition-colors text-sm"
            >
              Sign out
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 rounded-full bg-white text-[#1d5c5a] font-semibold text-sm hover:bg-[#e4f2f0] transition-colors"
          >
            Try free
          </Link>
        )}
      </nav>
    </header>
  );
}
