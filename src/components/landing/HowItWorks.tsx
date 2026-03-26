export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Pick your situation",
      description:
        "Interview, presentation, athletic event, or any high-stakes moment. MindGym knows the difference.",
      icon: "🎯",
    },
    {
      number: "02",
      title: "Personalize in 60 seconds",
      description:
        "Name your event, set the date, state your #1 goal. It gets woven into your session script.",
      icon: "✍️",
    },
    {
      number: "03",
      title: "Visualize your success",
      description:
        "A guided 5-minute session: calm your nerves, mentally rehearse the moment, anchor your confidence.",
      icon: "🧠",
    },
    {
      number: "04",
      title: "Track your journey",
      description:
        "Every session logs your confidence shift. Your roadmap shows upcoming events and how far you've come.",
      icon: "📈",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#e4f2f0]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#2b7a78] text-sm font-semibold tracking-widest uppercase mb-3">
            The method
          </p>
          <h2 className="text-4xl font-bold mb-4 text-[#0b1f1e]">From anxious to ready — in 5 minutes</h2>
          <p className="text-[#29403e] max-w-xl mx-auto">
            One session gets you ready for the moment. Repeated sessions build lasting confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative p-6 rounded-2xl bg-white border border-[#c5e2df] hover:border-[#2b7a78]/40 hover:shadow-sm transition-all duration-300"
            >
              <div className="text-4xl mb-5">{step.icon}</div>
              <div className="text-[#2b7a78] text-xs font-bold tracking-widest mb-2">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#0b1f1e]">{step.title}</h3>
              <p className="text-[#29403e] text-sm leading-relaxed">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-3 w-6 h-px bg-[#2b7a78]/25" />
              )}
              {i === 3 && (
                <div className="absolute inset-0 rounded-2xl ring-1 ring-[#2b7a78]/20 pointer-events-none" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-[#2b7a78]/20 flex items-start gap-4">
            <div className="text-2xl shrink-0">🔬</div>
            <div>
              <p className="font-semibold text-[#0b1f1e] mb-1">Backed by sports psychology</p>
              <p className="text-[#29403e] text-sm leading-relaxed">
                Mental rehearsal activates the same neural pathways as physical practice. Used by
                Olympic athletes, surgeons, and musicians for decades.
              </p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#2b7a78]/20 flex items-start gap-4">
            <div className="text-2xl shrink-0">📊</div>
            <div>
              <p className="font-semibold text-[#0b1f1e] mb-1">See your confidence grow</p>
              <p className="text-[#29403e] text-sm leading-relaxed">
                Track your mood before and after every session. Your personal roadmap shows exactly
                how much you've improved — and what's coming next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
