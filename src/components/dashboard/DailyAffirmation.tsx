"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AFFIRMATIONS,
  getDailyAffirmation,
  type Affirmation,
} from "@/lib/affirmations";
import { BLOCKERS, type Category, type SessionRecord } from "@/types";

/** Map the user's most-used session category to related blockers for weighting. */
const CATEGORY_BLOCKERS: Record<Category, string[]> = {
  interview: ["fear_freeze", "imposter", "rejection", "not_qualified"],
  presentation: ["confidence", "fear_freeze"],
  athletic: ["confidence"],
  general: ["direction", "confidence"],
};

function pickWeighted(sessions: SessionRecord[]): Affirmation {
  const seedKey = "dashboard";
  if (sessions.length === 0) {
    return getDailyAffirmation(AFFIRMATIONS, seedKey);
  }
  // Most frequent category
  const counts = new Map<Category, number>();
  for (const s of sessions) {
    counts.set(s.category, (counts.get(s.category) ?? 0) + 1);
  }
  const topCategory = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
  const related = CATEGORY_BLOCKERS[topCategory] ?? [];
  // 2x weight on related blockers
  const pool = AFFIRMATIONS.filter((a) => related.includes(a.blocker));
  const weighted = [...AFFIRMATIONS, ...pool];
  return getDailyAffirmation(weighted, seedKey);
}

export default function DailyAffirmation({ sessions }: { sessions: SessionRecord[] }) {
  const [affirmation, setAffirmation] = useState<Affirmation | null>(null);

  useEffect(() => {
    setAffirmation(pickWeighted(sessions));
  }, [sessions]);

  if (!affirmation) return null;

  const blockerLabel =
    BLOCKERS.find((b) => b.id === affirmation.blocker)?.label ?? "";

  return (
    <Link
      href="/affirmations"
      className="block rounded-2xl bg-[#1a3330] border border-[#2b7a78]/20 p-6 mb-6 hover:border-[#2b7a78]/40 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-[#2b7a78] font-semibold tracking-widest uppercase">
          ✨ Today&rsquo;s affirmation
        </p>
        <span className="text-[#8fb5b3] text-xs">View all →</span>
      </div>
      <p className="text-lg font-semibold text-[#eef2f1] leading-relaxed">
        “{affirmation.text}”
      </p>
      <p className="text-[#8fb5b3] text-xs mt-3">{blockerLabel}</p>
    </Link>
  );
}
