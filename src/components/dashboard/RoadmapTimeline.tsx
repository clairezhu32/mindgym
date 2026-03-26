"use client";

import type { SessionRecord, Category } from "@/types";
import Link from "next/link";

interface Props {
  sessions: SessionRecord[];
}

const CATEGORY_ICON: Record<Category, string> = {
  interview: "💼",
  presentation: "🎤",
  athletic: "🏆",
  general: "⭐",
};

const CATEGORY_LABEL: Record<Category, string> = {
  interview: "Job Interview",
  presentation: "Presentation & Performance",
  athletic: "Athletic Event",
  general: "High-Stakes Moment",
};

const MOOD_EMOJI = ["", "😰", "😟", "😐", "🙂", "😊"];

export default function RoadmapTimeline({ sessions }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Split sessions into upcoming (event_date in future) and past
  const upcoming = sessions
    .filter((s) => s.event_date && new Date(s.event_date) >= today)
    .sort((a, b) => new Date(a.event_date!).getTime() - new Date(b.event_date!).getTime());

  const past = sessions
    .filter((s) => !s.event_date || new Date(s.event_date) < today)
    .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime());

  return (
    <div className="space-y-10">
      {/* Upcoming events */}
      {upcoming.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[#2b7a78] mb-4">
            Upcoming events
          </h2>
          <div className="space-y-3">
            {upcoming.map((s) => (
              <UpcomingCard key={s.id} session={s} today={today} />
            ))}
          </div>
        </section>
      )}

      {/* Past sessions timeline */}
      {past.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[#2b7a78] mb-4">
            Your journey
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10" />
            <div className="space-y-6">
              {past.map((s) => (
                <PastCard key={s.id} session={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {sessions.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🧠</p>
          <p className="text-[#eef2f1] font-semibold mb-2">Your roadmap starts here</p>
          <p className="text-[#8fb5b3] text-sm mb-6">
            Complete your first session to begin tracking your confidence journey.
          </p>
          <Link
            href="/session"
            className="inline-block px-6 py-3 rounded-full bg-[#2b7a78] text-[#0b1f1e] font-bold text-sm hover:bg-[#4a9a97] transition-colors"
          >
            Start first session →
          </Link>
        </div>
      )}
    </div>
  );
}

function UpcomingCard({ session, today }: { session: SessionRecord; today: Date }) {
  const eventDate = new Date(session.event_date!);
  const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const urgency = daysUntil <= 1 ? "text-[#F87171]" : daysUntil <= 3 ? "text-[#FBBF24]" : "text-[#4ADE80]";

  return (
    <div className="bg-[#1a3330] border border-[#2b7a78]/20 rounded-2xl p-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <span className="text-2xl">{CATEGORY_ICON[session.category]}</span>
        <div>
          <p className="font-semibold text-[#eef2f1]">
            {session.event_name ?? CATEGORY_LABEL[session.category]}
          </p>
          {session.goal && (
            <p className="text-xs text-[#8fb5b3] mt-0.5">"{session.goal}"</p>
          )}
          <p className={`text-xs font-semibold mt-1 ${urgency}`}>
            {daysUntil === 0
              ? "Today 🔥"
              : daysUntil === 1
              ? "Tomorrow"
              : `In ${daysUntil} days · ${formatDate(session.event_date!)}`}
          </p>
        </div>
      </div>
      <Link
        href="/session"
        className="shrink-0 px-4 py-2 rounded-full bg-[#2b7a78] text-[#0b1f1e] font-semibold text-xs hover:bg-[#4a9a97] transition-colors"
      >
        Prepare →
      </Link>
    </div>
  );
}

function PastCard({ session }: { session: SessionRecord }) {
  const delta =
    session.pre_mood !== null && session.post_mood !== null
      ? session.post_mood - session.pre_mood
      : null;

  return (
    <div className="flex gap-5 pl-1">
      {/* Timeline dot */}
      <div className="mt-1.5 shrink-0 w-5 h-5 rounded-full border-2 border-[#2b7a78]/60 bg-[#0b1f1e] flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-[#2b7a78]" />
      </div>

      <div className="flex-1 bg-[#1a3330] border border-white/5 rounded-2xl p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">{CATEGORY_ICON[session.category]}</span>
              <span className="font-semibold text-sm text-[#eef2f1]">
                {session.event_name ?? CATEGORY_LABEL[session.category]}
              </span>
            </div>
            <p className="text-xs text-[#8fb5b3]">
              {formatDate(session.completed_at)}
            </p>
          </div>

          {delta !== null && (
            <div className="text-right shrink-0">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-lg">{MOOD_EMOJI[session.pre_mood ?? 0]}</span>
                <span className="text-xs text-[#8fb5b3]">→</span>
                <span className="text-lg">{MOOD_EMOJI[session.post_mood ?? 0]}</span>
              </div>
              <span
                className={`text-xs font-bold ${
                  delta > 0 ? "text-[#4ADE80]" : delta < 0 ? "text-[#F87171]" : "text-[#8fb5b3]"
                }`}
              >
                {delta > 0 ? `+${delta}` : delta === 0 ? "→" : delta} confidence
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
