"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AFFIRMATIONS,
  getAffirmationById,
  type Affirmation,
} from "@/lib/affirmations";
import { BLOCKERS, type JobBlocker } from "@/types";
import {
  getSavedAffirmationIds,
  saveAffirmation,
  unsaveAffirmation,
} from "@/lib/supabase/affirmations";

type Tab = "browse" | "saved";
type Filter = JobBlocker | "all";

export default function AffirmationsPage() {
  const [tab, setTab] = useState<Tab>("browse");
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState(0);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getSavedAffirmationIds().then(({ ids }) => {
      setSavedIds(new Set(ids));
      setLoaded(true);
    });
  }, []);

  const pool: Affirmation[] = useMemo(() => {
    if (tab === "saved") {
      return [...savedIds]
        .map(getAffirmationById)
        .filter((a): a is Affirmation => !!a);
    }
    return filter === "all"
      ? AFFIRMATIONS
      : AFFIRMATIONS.filter((a) => a.blocker === filter);
  }, [tab, filter, savedIds]);

  // Keep index in bounds when the pool changes
  const safeIndex = pool.length === 0 ? 0 : Math.min(index, pool.length - 1);
  const current = pool[safeIndex];

  const setFilterAndReset = (f: Filter) => {
    setFilter(f);
    setIndex(0);
  };

  const toggleSave = async (id: string) => {
    const isSaved = savedIds.has(id);
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (isSaved) next.delete(id);
      else next.add(id);
      return next;
    });
    const { error } = isSaved
      ? await unsaveAffirmation(id)
      : await saveAffirmation(id);
    if (error) {
      // revert on failure
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (isSaved) next.add(id);
        else next.delete(id);
        return next;
      });
    }
  };

  const blockerLabel = (id: JobBlocker) =>
    BLOCKERS.find((b) => b.id === id)?.label ?? id;

  return (
    <div className="min-h-screen bg-[#0b1f1e]">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl">🧠</span>
          <span className="font-bold text-lg tracking-tight">
            <span className="text-white">Mind</span>
            <span className="text-[#2b7a78]">Gym</span>
          </span>
        </Link>
        <Link
          href="/dashboard"
          className="text-[#8fb5b3] hover:text-[#eef2f1] transition-colors text-sm"
        >
          ← Dashboard
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-[#eef2f1] mb-1">
          Daily affirmations
        </h1>
        <p className="text-[#8fb5b3] text-sm mb-8">
          Short, evidence-backed statements to rewire self-talk before high-stakes moments.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["browse", "saved"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setIndex(0);
              }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                tab === t
                  ? "bg-[#2b7a78] text-[#0b1f1e]"
                  : "bg-white/5 text-[#8fb5b3] hover:text-[#eef2f1]"
              }`}
            >
              {t === "browse" ? "Browse" : `Saved (${savedIds.size})`}
            </button>
          ))}
        </div>

        {/* Category filter */}
        {tab === "browse" && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setFilterAndReset("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === "all"
                  ? "bg-[#2b7a78]/20 text-[#7fd1ce] border border-[#2b7a78]/50"
                  : "bg-white/5 text-[#8fb5b3] border border-transparent hover:text-[#eef2f1]"
              }`}
            >
              All
            </button>
            {BLOCKERS.map((b) => (
              <button
                key={b.id}
                onClick={() => setFilterAndReset(b.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filter === b.id
                    ? "bg-[#2b7a78]/20 text-[#7fd1ce] border border-[#2b7a78]/50"
                    : "bg-white/5 text-[#8fb5b3] border border-transparent hover:text-[#eef2f1]"
                }`}
              >
                {b.icon} {b.label}
              </button>
            ))}
          </div>
        )}

        {/* Card */}
        {!loaded ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-[#2b7a78]/30 border-t-[#2b7a78] rounded-full animate-spin" />
          </div>
        ) : !current ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">💭</div>
            <p className="text-[#8fb5b3]">
              {tab === "saved"
                ? "No saved affirmations yet. Tap the bookmark on any card to save it here."
                : "Nothing here."}
            </p>
          </div>
        ) : (
          <div>
            <div className="relative rounded-3xl bg-[#1a3330] border border-[#2b7a78]/20 p-10 min-h-[280px] flex flex-col justify-center">
              <button
                onClick={() => toggleSave(current.id)}
                aria-label={savedIds.has(current.id) ? "Unsave" : "Save"}
                className="absolute top-5 right-5 text-2xl transition-transform active:scale-90"
              >
                {savedIds.has(current.id) ? "🔖" : "📑"}
              </button>
              <p className="text-xs text-[#2b7a78] font-semibold tracking-widest uppercase mb-4">
                {blockerLabel(current.blocker)}
              </p>
              <p className="text-2xl md:text-3xl font-semibold text-[#eef2f1] leading-snug">
                “{current.text}”
              </p>
              <p className="text-[#8fb5b3] text-xs mt-6">
                {safeIndex + 1} of {pool.length}
              </p>
            </div>

            {/* Prev / Next */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() =>
                  setIndex((i) => (i - 1 + pool.length) % pool.length)
                }
                disabled={pool.length <= 1}
                className="px-6 py-3 rounded-full bg-white/5 text-[#eef2f1] font-semibold text-sm hover:bg-white/10 transition-colors disabled:opacity-30"
              >
                ← Prev
              </button>
              <button
                onClick={() => toggleSave(current.id)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-colors ${
                  savedIds.has(current.id)
                    ? "bg-[#2b7a78]/20 text-[#7fd1ce] border border-[#2b7a78]/50"
                    : "bg-[#2b7a78] text-[#0b1f1e] hover:bg-[#4a9a97]"
                }`}
              >
                {savedIds.has(current.id) ? "✓ Saved" : "Save this one"}
              </button>
              <button
                onClick={() => setIndex((i) => (i + 1) % pool.length)}
                disabled={pool.length <= 1}
                className="px-6 py-3 rounded-full bg-white/5 text-[#eef2f1] font-semibold text-sm hover:bg-white/10 transition-colors disabled:opacity-30"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
