import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-73px)] flex flex-col items-center justify-center text-center px-6 pt-10 overflow-hidden bg-[#ffffff]">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#2b7a78]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#2b7a78]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl animate-fade-up">
        <p className="text-[#2b7a78] text-sm font-semibold tracking-widest uppercase mb-4">
          Mental Performance Training
        </p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-[#0b1f1e]">
          Visualize your success
          <br />
          <span className="text-[#2b7a78]">before experiencing it</span>
        </h1>
        <p className="text-xl text-[#29403e] max-w-xl mx-auto mb-4 leading-relaxed">
          5-minute guided mental exercises that prime your mind for job interviews,
          presentations, and high-stakes moments — then track your confidence
          journey over time.
        </p>
        <p className="text-sm text-[#6b8f8d] mb-10">
          Used by athletes for decades. Now for professionals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-8 py-4 rounded-full bg-[#2b7a78] text-white font-bold text-lg hover:bg-[#1d5c5a] transition-all duration-200 active:scale-95"
          >
            Start free →
          </Link>
          <a
            href="#how-it-works"
            className="px-8 py-4 rounded-full border border-gray-200 text-[#29403e] hover:border-[#2b7a78]/60 hover:bg-[#2b7a78]/5 transition-all duration-200"
          >
            See how it works
          </a>
        </div>
        <p className="mt-6 text-[#6b8f8d] text-sm">
          No credit card · First session free · 5 minutes
        </p>
      </div>

      {/* Roadmap preview card */}
      <div className="relative mt-16 w-full max-w-lg animate-fade-up">
        <div className="bg-[#1a3330]/80 border border-white/8 rounded-2xl p-5 backdrop-blur-sm shadow-2xl shadow-black/40">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#2b7a78] mb-4">
            Your confidence roadmap
          </p>

          {/* Upcoming event */}
          <div className="flex items-center justify-between bg-[#2b7a78]/10 border border-[#2b7a78]/20 rounded-xl px-4 py-3 mb-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">💼</span>
              <div className="text-left">
                <p className="text-sm font-semibold text-[#eef2f1]">Final round at Stripe</p>
                <p className="text-xs text-[#FBBF24] font-medium">In 2 days · Apr 3</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#2b7a78] bg-[#2b7a78]/10 px-3 py-1 rounded-full">
              Prepare →
            </span>
          </div>

          {/* Timeline */}
          <div className="relative pl-5 space-y-3">
            <div className="absolute left-[9px] top-2 bottom-2 w-px bg-white/10" />

            {[
              { icon: "🎤", label: "Team all-hands presentation", date: "Mar 26", pre: 2, post: 5 },
              { icon: "💼", label: "Screening call · Stripe", date: "Mar 20", pre: 3, post: 4 },
              { icon: "⭐", label: "Board pitch", date: "Mar 12", pre: 1, post: 4 },
            ].map((item) => (
              <div key={item.date} className="flex items-center gap-3">
                <div className="shrink-0 w-4 h-4 rounded-full border-2 border-[#2b7a78]/50 bg-[#0b1f1e] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2b7a78]" />
                </div>
                <div className="flex-1 flex items-center justify-between bg-[#0b1f1e]/60 rounded-xl px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.icon}</span>
                    <div>
                      <p className="text-xs font-medium text-[#eef2f1]">{item.label}</p>
                      <p className="text-xs text-[#8fb5b3]">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end text-xs">
                      <span>{["", "😰", "😟", "😐", "🙂", "😊"][item.pre]}</span>
                      <span className="text-[#8fb5b3]">→</span>
                      <span>{["", "😰", "😟", "😐", "🙂", "😊"][item.post]}</span>
                    </div>
                    <p className="text-xs font-bold text-[#4ADE80]">+{item.post - item.pre}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5">
            {[
              { label: "Sessions", value: "9" },
              { label: "Avg boost", value: "+2.7", highlight: true },
              { label: "Streak", value: "4 🔥" },
            ].map(({ label, value, highlight }) => (
              <div key={label} className="text-center">
                <p className={`text-sm font-bold ${highlight ? "text-[#2b7a78]" : "text-[#eef2f1]"}`}>
                  {value}
                </p>
                <p className="text-xs text-[#8fb5b3]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Blur fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent rounded-b-2xl pointer-events-none" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-[#2b7a78]/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#2b7a78]/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}
