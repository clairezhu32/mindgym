"use client";

import type { SessionRecord } from "@/types";

interface Props {
  sessions: SessionRecord[];
}

export default function StatsBar({ sessions }: Props) {
  const completed = sessions.filter((s) => s.post_mood !== null);
  const avgDelta =
    completed.length > 0
      ? completed.reduce((sum, s) => sum + ((s.post_mood ?? 0) - (s.pre_mood ?? 0)), 0) /
        completed.length
      : null;

  // Streak: consecutive days with at least one session, working backwards from today
  const streak = calcStreak(sessions);

  const stats = [
    { label: "Sessions", value: sessions.length },
    {
      label: "Avg confidence boost",
      value: avgDelta !== null ? `+${avgDelta.toFixed(1)}` : "—",
      highlight: true,
    },
    { label: "Day streak", value: streak > 0 ? `${streak} 🔥` : "—" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map(({ label, value, highlight }) => (
        <div
          key={label}
          className="bg-[#1a3330] border border-white/5 rounded-2xl p-4 text-center"
        >
          <div
            className={`text-2xl font-bold mb-1 ${
              highlight ? "text-[#2b7a78]" : "text-[#eef2f1]"
            }`}
          >
            {value}
          </div>
          <div className="text-xs text-[#8fb5b3]">{label}</div>
        </div>
      ))}
    </div>
  );
}

function calcStreak(sessions: SessionRecord[]): number {
  if (sessions.length === 0) return 0;
  const days = new Set(
    sessions.map((s) => new Date(s.completed_at).toDateString())
  );
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (days.has(d.toDateString())) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}
