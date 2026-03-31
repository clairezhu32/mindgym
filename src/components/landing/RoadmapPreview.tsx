import Link from "next/link";

const MOCK_SESSIONS = [
  { icon: "💼", label: "Final round · Stripe", date: "Apr 3", daysAway: 2, upcoming: true },
  { icon: "🎤", label: "All-hands presentation", date: "Mar 26", pre: 2, post: 5 },
  { icon: "💼", label: "Screening call · Stripe", date: "Mar 20", pre: 3, post: 4 },
  { icon: "⭐", label: "Board pitch", date: "Mar 12", pre: 1, post: 4 },
];

const MOOD = ["", "😰", "😟", "😐", "🙂", "😊"];

export default function RoadmapPreview() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#2b7a78] text-sm font-semibold tracking-widest uppercase mb-3">
            Your personal roadmap
          </p>
          <h2 className="text-4xl font-bold mb-4 text-[#0b1f1e]">
            Calm helps you relax.
            <br />
            <span className="text-[#2b7a78]">MindGym helps you win.</span>
          </h2>
          <p className="text-[#29403e] max-w-xl mx-auto">
            Every session is saved to your roadmap. See your upcoming events,
            replay sessions that worked, and watch your confidence compound over time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: feature list */}
          <div className="space-y-6">
            {[
              {
                icon: "📅",
                title: "Upcoming events at a glance",
                body: "All your high-stakes moments on one timeline. Color-coded by urgency so you always know what to prepare for next.",
              },
              {
                icon: "📈",
                title: "Confidence delta per session",
                body: "See exactly how much each session moved your confidence — before and after, every time.",
              },
              {
                icon: "🔥",
                title: "Streak that holds you accountable",
                body: "Consistent mental training compounds. Your streak makes sure you show up, even when you think you don't need to.",
              },
              {
                icon: "🔁",
                title: "Replay sessions that worked",
                body: "Had a great result before a big interview? Repeat the same session. Build the ritual.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2b7a78]/10 flex items-center justify-center text-xl shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="font-semibold text-[#0b1f1e] mb-1">{title}</p>
                  <p className="text-[#29403e] text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}

            <Link
              href="/login"
              className="inline-block mt-2 px-6 py-3 rounded-full bg-[#2b7a78] text-[#0b1f1e] font-bold text-sm hover:bg-[#4a9a97] transition-colors"
            >
              Build my roadmap →
            </Link>
          </div>

          {/* Right: mock dashboard */}
          <div className="relative">
            <div className="bg-[#0b1f1e] border border-white/8 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              {/* Mock header */}
              <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🧠</span>
                  <span className="font-bold text-sm">
                    <span className="text-white">Mind</span><span className="text-[#2b7a78]">Gym</span>
                  </span>
                </div>
                <span className="text-xs text-[#8fb5b3]">Alex's roadmap</span>
              </div>

              <div className="p-5 space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Sessions", value: "9" },
                    { label: "Avg boost", value: "+2.7", accent: true },
                    { label: "Streak", value: "4 🔥" },
                  ].map(({ label, value, accent }) => (
                    <div key={label} className="bg-[#1a3330] rounded-xl p-3 text-center">
                      <p className={`text-base font-bold ${accent ? "text-[#2b7a78]" : "text-[#eef2f1]"}`}>
                        {value}
                      </p>
                      <p className="text-xs text-[#8fb5b3]">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Upcoming */}
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#2b7a78] mb-2">
                    Upcoming
                  </p>
                  <div className="flex items-center justify-between bg-[#2b7a78]/10 border border-[#2b7a78]/20 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">💼</span>
                      <div>
                        <p className="text-sm font-semibold text-[#eef2f1]">Final round · Stripe</p>
                        <p className="text-xs text-[#FBBF24] font-medium">In 2 days · Apr 3</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#2b7a78]">Prepare →</span>
                  </div>
                </div>

                {/* Journey */}
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#2b7a78] mb-2">
                    Your journey
                  </p>
                  <div className="relative pl-4 space-y-2">
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />
                    {MOCK_SESSIONS.filter((s) => !s.upcoming).map((s) => (
                      <div key={s.date} className="flex items-center gap-3">
                        <div className="shrink-0 w-3 h-3 rounded-full border border-[#2b7a78]/50 bg-[#0b1f1e]" />
                        <div className="flex-1 flex items-center justify-between bg-[#1a3330] rounded-xl px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{s.icon}</span>
                            <div>
                              <p className="text-xs font-medium text-[#eef2f1]">{s.label}</p>
                              <p className="text-xs text-[#8fb5b3]">{s.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-xs">
                              <span>{MOOD[s.pre!]}</span>
                              <span className="text-[#8fb5b3]">→</span>
                              <span>{MOOD[s.post!]}</span>
                            </div>
                            <p className="text-xs font-bold text-[#4ADE80]">+{s.post! - s.pre!}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Glow behind card */}
            <div className="absolute -inset-4 bg-[#2b7a78]/5 rounded-3xl blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
