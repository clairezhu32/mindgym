"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useElevenLabsTTS } from "@/lib/useElevenLabsTTS";
import { renderStory, type StoryTemplate } from "@/lib/daily-stories";
import {
  derivePersonalization,
  getOrCreateTodayStory,
  getRecentStories,
  type DailyStoryRecord,
} from "@/lib/supabase/stories";
import { getUserSessions } from "@/lib/supabase/sessions";
import { CATEGORIES } from "@/types";

function categoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

function formatDate(iso: string): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function StoryPage() {
  const [template, setTemplate] = useState<StoryTemplate | null>(null);
  const [storyText, setStoryText] = useState<string>("");
  const [archive, setArchive] = useState<DailyStoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const tts = useElevenLabsTTS();
  const paragraphsRef = useRef<string[]>([]);
  const paraIndexRef = useRef(0);

  useEffect(() => {
    async function load() {
      const { sessions } = await getUserSessions();
      const personalization = await derivePersonalization(sessions);
      const { story, template: t, error } = await getOrCreateTodayStory(personalization);
      setTemplate(t);
      if (story) {
        setStoryText(story.story_text);
      } else {
        // Guest or DB error: render template client-side without persisting
        setStoryText(renderStory(t, personalization));
        if (error) console.warn("Daily story DB:", error);
      }
      const { stories } = await getRecentStories(14);
      setArchive(stories.filter((s) => s.date !== new Date().toISOString().slice(0, 10)));
      setLoading(false);
    }
    load();
    return () => tts.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paragraphs = storyText.split(/\n\n+/).filter((p) => p.trim());

  const playParagraph = (idx: number) => {
    paraIndexRef.current = idx;
    if (idx >= paragraphsRef.current.length) {
      setPlaying(false);
      return;
    }
    tts.playLine(paragraphsRef.current[idx], () => playParagraph(idx + 1));
  };

  const handlePlay = async () => {
    if (playing) {
      tts.stop();
      setPlaying(false);
      return;
    }
    paragraphsRef.current = paragraphs;
    setPlaying(true);
    await tts.preloadLines([paragraphs[0]]);
    playParagraph(0);
  };

  // Rough reading-time estimate
  const minutes = Math.max(1, Math.round(storyText.split(/\s+/).length / 150));

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
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-[#2b7a78]/30 border-t-[#2b7a78] rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Daily story header */}
            <p className="text-xs text-[#2b7a78] font-semibold tracking-widest uppercase mb-2">
              📖 Today&rsquo;s visualization story
            </p>
            <h1 className="text-2xl font-bold text-[#eef2f1] mb-1">
              {template?.title}
            </h1>
            <p className="text-[#8fb5b3] text-sm mb-6">
              {formatDate(new Date().toISOString().slice(0, 10))} ·{" "}
              {template && categoryLabel(template.category)} · ~{minutes} min read
            </p>

            {/* Player */}
            <div className="rounded-2xl bg-[#1a3330] border border-[#2b7a78]/20 p-6 mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePlay}
                  disabled={tts.isLoading}
                  className="w-14 h-14 shrink-0 rounded-full bg-[#2b7a78] text-[#0b1f1e] flex items-center justify-center text-xl font-bold hover:bg-[#4a9a97] transition-colors disabled:opacity-50"
                  aria-label={playing ? "Stop" : "Play story"}
                >
                  {tts.isLoading ? (
                    <span className="w-5 h-5 border-2 border-[#0b1f1e]/30 border-t-[#0b1f1e] rounded-full animate-spin" />
                  ) : playing ? (
                    "⏹"
                  ) : (
                    "▶"
                  )}
                </button>
                <div>
                  <p className="text-[#eef2f1] font-semibold text-sm">
                    {playing ? "Playing…" : tts.isLoading ? "Loading audio…" : "Listen to today's story"}
                  </p>
                  <p className="text-[#8fb5b3] text-xs mt-0.5">
                    {tts.ttsMode === "webspeech"
                      ? "Using your device\u2019s voice"
                      : "AI narration · headphones recommended 🎧"}
                  </p>
                </div>
              </div>
              {tts.loadError && (
                <p className="text-red-400/80 text-xs mt-3">{tts.loadError}</p>
              )}
            </div>

            {/* Story text */}
            <article className="rounded-2xl bg-[#1a3330]/60 border border-white/5 p-8 mb-10">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-[#d7e3e1] leading-relaxed mb-5 last:mb-0">
                  {p}
                </p>
              ))}
            </article>

            {/* Archive */}
            {archive.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-[#eef2f1] mb-4">
                  Previous stories
                </h2>
                <div className="space-y-3">
                  {archive.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === s.id ? null : s.id)
                        }
                        className="w-full text-left p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                      >
                        <div>
                          <p className="text-[#eef2f1] font-semibold text-sm">
                            {formatDate(s.date)}
                          </p>
                          <p className="text-[#8fb5b3] text-xs mt-0.5">
                            {categoryLabel(s.category)}
                          </p>
                        </div>
                        <span className="text-[#8fb5b3]">
                          {expandedId === s.id ? "▴" : "▾"}
                        </span>
                      </button>
                      {expandedId === s.id && (
                        <div className="px-5 pb-5">
                          {s.story_text.split(/\n\n+/).map((p, i) => (
                            <p key={i} className="text-[#b9c9c7] text-sm leading-relaxed mb-4 last:mb-0">
                              {p}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
