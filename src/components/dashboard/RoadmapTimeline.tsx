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
  presentation: "Presentation",
  athletic: "Athletic Event",
  general: "High-Stakes Moment",
};

const CATEGORY_COLOR: Record<Category, { bg: string; border: string; dot: string; glow: string }> = {
  interview:    { bg: "from-blue-500/10",   border: "border-blue-500/20",   dot: "bg-blue-400",   glow: "shadow-blue-400/40" },
  presentation: { bg: "from-purple-500/10", border: "border-purple-500/20", dot: "bg-purple-400", glow: "shadow-purple-400/40" },
  athletic:     { bg: "from-orange-500/10", border: "border-orange-500/20", dot: "bg-orange-400", glow: "shadow-orange-400/40" },
  general:      { bg: "from-[#2b7a78]/10",  border: "border-[#2b7a78]/20",  dot: "bg-[#2b7a78]",  glow: "shadow-[#2b7a78]/40" },
};

export default function RoadmapTimeline({ sessions }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
            🎯 Upcoming events
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
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[#2b7a78] mb-5">
            📈 Your journey
          </h2>
          <div className="relative">
            {/* Gradient vertical line */}
            <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#2b7a78] via-[#2b7a78]/30 to-transparent" />
            <div className="space-y-5">
              {past.map((s, i) => (
                <PastCard key={s.id} session={s} index={past.length - i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {sessions.length === 0 && <EmptyState />}
    </div>
  );
}

function UpcomingCard({ session, today }: { session: SessionRecord; today: Date }) {
  const eventDate = new Date(session.event_date!);
  const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const colors = CATEGORY_COLOR[session.category];

  const urgencyColor =
    daysUntil <= 1 ? "text-[#F87171]" :
    daysUntil <= 3 ? "text-[#FBBF24]" :
    "text-[#4ADE80]";

  const ringColor =
    daysUntil <= 1 ? "stroke-[#F87171]" :
    daysUntil <= 3 ? "stroke-[#FBBF24]" :
    "stroke-[#4ADE80]";

  const progress = Math.max(0, Math.min(100, ((30 - daysUntil) / 30) * 100));
  const circumference = 2 * Math.PI * 16;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`bg-gradient-to-r ${colors.bg} to-[#1a3330] border ${colors.border} rounded-2xl p-5`}>
      <div className="flex items-center gap-4">
        {/* Countdown ring */}
        <div className="relative shrink-0 w-14 h-14">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="16" fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="2.5" />
            <circle
              cx="18" cy="18" r="16" fill="none"
              className={ringColor}
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-sm font-bold leading-none ${urgencyColor}`}>{daysUntil}</span>
            <span className="text-[8px] text-[#8fb5b3] leading-none mt-0.5">days</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{CATEGORY_ICON[session.category]}</span>
            <p className="font-bold text-[#eef2f1] truncate">
              {session.event_name ?? CATEGORY_LABEL[session.category]}
            </p>
          </div>
          {session.goal && (
            <p className="text-xs text-[#8fb5b3] italic truncate">"{session.goal}"</p>
          )}
          <p className={`text-xs font-semibold mt-1.5 ${urgencyColor}`}>
            {daysUntil === 0 ? "Today 🔥" :
             daysUntil === 1 ? "Tomorrow!" :
             `${formatDate(session.event_date!)}`}
          </p>
        </div>

        <Link
          href="/session"
          className={`shrink-0 px-3 py-2 rounded-xl ${colors.dot} text-[#0b1f1e] font-bold text-xs hover:opacity-90 transition-all`}
        >
          Prep →
        </Link>
      </div>
    </div>
  );
}

function PastCard({ session, index }: { session: SessionRecord; index: number }) {
  const pre = session.pre_mood ?? 0;
  const post = session.post_mood ?? 0;
  const delta = session.pre_mood !== null && session.post_mood !== null ? post - pre : null;
  const colors = CATEGORY_COLOR[session.category];

  return (
    <div className="flex gap-4 pl-1">
      {/* Glowing timeline dot */}
      <div className="mt-3 shrink-0 flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full ${colors.dot} shadow-lg ${colors.glow} flex items-center justify-center text-[10px] font-bold text-white`}>
          {index}
        </div>
      </div>

      <div className={`flex-1 bg-gradient-to-br ${colors.bg} to-[#1a3330] border ${colors.border} rounded-2xl p-4`}>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base">{CATEGORY_ICON[session.category]}</span>
              <span className="font-bold text-sm text-[#eef2f1]">
                {session.event_name ?? CATEGORY_LABEL[session.category]}
              </span>
            </div>
            <p className="text-[10px] text-[#8fb5b3] mt-0.5">{formatDate(session.completed_at)}</p>
          </div>

          {delta !== null && (
            <div className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold ${
              delta > 0 ? "bg-[#4ade80]/15 text-[#4ade80]" :
              delta < 0 ? "bg-[#F87171]/15 text-[#F87171]" :
              "bg-white/5 text-[#8fb5b3]"
            }`}>
              {delta > 0 ? `+${delta}` : delta === 0 ? "→" : delta}
            </div>
          )}
        </div>

        {/* Mood bars */}
        {session.pre_mood !== null && session.post_mood !== null && (
          <div className="space-y-1.5">
            <MoodBar label="Before" value={pre} color="bg-[#8fb5b3]/50" />
            <MoodBar label="After" value={post} color={`${colors.dot}`} />
          </div>
        )}

        {session.goal && (
          <p className="mt-2.5 text-[11px] text-[#8fb5b3] italic border-t border-white/5 pt-2">
            "{session.goal}"
          </p>
        )}
      </div>
    </div>
  );
}

function MoodBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-[#8fb5b3] w-8 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-[10px] text-[#8fb5b3] w-3 shrink-0">{value}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="relative inline-block mb-6">
        <div className="w-20 h-20 rounded-full bg-[#2b7a78]/10 border border-[#2b7a78]/20 flex items-center justify-center mx-auto">
          <span className="text-4xl">🧠</span>
        </div>
        <div className="absolute -inset-2 rounded-full border border-[#2b7a78]/10 animate-ping" />
      </div>
      <p className="text-[#eef2f1] font-bold text-lg mb-2">Your roadmap starts here</p>
      <p className="text-[#8fb5b3] text-sm mb-8 max-w-xs mx-auto">
        Complete your first session to begin tracking your confidence journey.
      </p>
      <Link
        href="/session"
        className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#2b7a78] to-[#4a9a97] text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-[#2b7a78]/30"
      >
        Start first session →
      </Link>
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
