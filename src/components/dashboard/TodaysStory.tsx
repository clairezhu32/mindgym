"use client";

import Link from "next/link";
import { useMemo } from "react";
import { pickStoryTemplate } from "@/lib/daily-stories";
import { CATEGORIES } from "@/types";

export default function TodaysStory() {
  const { title, categoryLabel } = useMemo(() => {
    const t = pickStoryTemplate();
    return {
      title: t.title,
      categoryLabel: CATEGORIES.find((c) => c.id === t.category)?.label ?? t.category,
    };
  }, []);

  if (!title) return null;

  return (
    <Link
      href="/story"
      className="block rounded-2xl bg-gradient-to-br from-[#1a3330] to-[#123836] border border-[#2b7a78]/25 p-6 mb-6 hover:border-[#2b7a78]/50 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-[#2b7a78] font-semibold tracking-widest uppercase">
          📖 Today&rsquo;s story
        </p>
        <span className="text-[#8fb5b3] text-xs">Read & listen →</span>
      </div>
      <p className="text-lg font-semibold text-[#eef2f1]">{title}</p>
      <p className="text-[#8fb5b3] text-xs mt-2">
        {categoryLabel} · A 2-minute first-person visualization of your success, already happened.
      </p>
    </Link>
  );
}
