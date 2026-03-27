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

  const streak = calcStreak(sessions);
  const avgPost =
    completed.length > 0
      ? completed.reduce((sum, s) => sum + (s.post_mood ?? 0), 0) / completed.length
      : null;

  return (
    <div className="mb-8 space-y-4">
      {/* Top row: 3 stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          value={sessions.length.toString()}
          label="Sessions"
          icon="🧠"
          color="from-[#2b7a78]/20 to-[#1a3330]"
          border="border-[#2b7a78]/30"
        />
        <StatCard
          value={avgDelta !== null ? `+${avgDelta.toFixed(1)}` : "—"}
          label="Avg boost"
          icon="⚡"
          color="from-[#4ade80]/10 to-[#1a3330]"
          border="border-[#4ade80]/20"
          highlight="text-[#4ade80]"
        />
        <StatCard
          value={streak > 0 ? `${streak}` : "—"}
          label={streak === 1 ? "day streak" : "day streak"}
          icon={streak > 0 ? "🔥" : "💤"}
          color="from-[#f59e0b]/10 to-[#1a3330]"
          border="border-[#f59e0b]/20"
          highlight="text-[#f59e0b]"
        />
      </div>

      {/* Confidence level bar */}
      {avgPost !== null && (
        <div className="bg-[#1a3330] border border-white/5 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#8fb5b3] font-semibold uppercase tracking-wider">
              Average confidence level
            </span>
            <span className="text-sm font-bold text-[#eef2f1]">{avgPost.toFixed(1)} / 5</span>
          </div>
          <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#2b7a78] to-[#4ade80] transition-all duration-1000"
              style={{ width: `${(avgPost / 5) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] text-[#8fb5b3]/60">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      )}

      {/* Session history sparkline */}
      {completed.length >= 2 && <MoodSparkline sessions={completed} />}
    </div>
  );
}

function StatCard({
  value, label, icon, color, border, highlight,
}: {
  value: string; label: string; icon: string;
  color: string; border: string; highlight?: string;
}) {
  return (
    <div className={`bg-gradient-to-b ${color} border ${border} rounded-2xl p-3.5 text-center`}>
      <div className="text-xl mb-0.5">{icon}</div>
      <div className={`text-xl font-bold ${highlight ?? "text-[#eef2f1]"}`}>{value}</div>
      <div className="text-[10px] text-[#8fb5b3] leading-tight mt-0.5">{label}</div>
    </div>
  );
}

function MoodSparkline({ sessions }: { sessions: SessionRecord[] }) {
  const ordered = [...sessions].sort(
    (a, b) => new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime()
  );
  const max = 5;
  const w = 100 / (ordered.length - 1 || 1);

  const points = ordered.map((s, i) => ({
    x: i * w,
    pre: ((s.pre_mood ?? 0) / max) * 100,
    post: ((s.post_mood ?? 0) / max) * 100,
  }));

  const polyPre = points.map((p) => `${p.x},${100 - p.pre}`).join(" ");
  const polyPost = points.map((p) => `${p.x},${100 - p.post}`).join(" ");

  return (
    <div className="bg-[#1a3330] border border-white/5 rounded-2xl p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-[#8fb5b3] font-semibold uppercase tracking-wider">
          Confidence over time
        </span>
        <div className="flex items-center gap-3 text-[10px] text-[#8fb5b3]">
          <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-[#8fb5b3]/40 inline-block" /> Before</span>
          <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-[#4ade80] inline-block" /> After</span>
        </div>
      </div>
      <svg viewBox={`0 0 100 60`} className="w-full h-16" preserveAspectRatio="none">
        {/* Grid lines */}
        {[25, 50, 75].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="white" strokeOpacity="0.04" strokeWidth="0.5" />
        ))}
        {/* Pre-mood line */}
        <polyline points={polyPre} fill="none" stroke="#8fb5b3" strokeOpacity="0.4" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Post-mood line */}
        <polyline points={polyPost} fill="none" stroke="#4ade80" strokeWidth="2" strokeLinejoin="round" />
        {/* Dots */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={100 - p.post} r="2.5" fill="#4ade80" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function calcStreak(sessions: SessionRecord[]): number {
  if (sessions.length === 0) return 0;
  const days = new Set(sessions.map((s) => new Date(s.completed_at).toDateString()));
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
