import Link from "next/link";

export default function PricingSection() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Get started with mental rehearsal",
      features: [
        "3 sessions per month",
        "2 scenario categories",
        "Mood check-in tracking",
        "Session history",
      ],
      cta: "Start free",
      href: "/login",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "per month",
      description: "Unlimited access for serious performers",
      features: [
        "Unlimited sessions",
        "All 4 scenario categories",
        "Streak counter & progress",
        "Priority new content",
        "7-day free trial included",
      ],
      cta: "Start 7-day trial",
      href: "/login",
      highlighted: true,
    },
    {
      name: "Annual",
      price: "$79",
      period: "per year",
      description: "Best value — 2 months free",
      features: [
        "Everything in Pro",
        "45% savings vs monthly",
        "Early access to new features",
        "7-day free trial included",
      ],
      cta: "Get annual access",
      href: "/login",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-[#ffffff]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#2b7a78] text-sm font-semibold tracking-widest uppercase mb-3">
            Pricing
          </p>
          <h2 className="text-4xl font-bold mb-4 text-[#0b1f1e]">
            Start free. Upgrade when you're ready.
          </h2>
          <p className="text-[#29403e]">
            No credit card required for the free tier.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`
                relative p-8 rounded-2xl border transition-all duration-300
                ${tier.highlighted
                  ? "bg-[#2b7a78]/8 border-[#2b7a78]/40 scale-105 shadow-md shadow-[#2b7a78]/10"
                  : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
                }
              `}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#2b7a78] text-white text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1 text-[#0b1f1e]">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-[#0b1f1e]">{tier.price}</span>
                  <span className="text-[#6b8f8d] text-sm">/{tier.period}</span>
                </div>
                <p className="text-[#29403e] text-sm">{tier.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <span className="text-[#2b7a78]">✓</span>
                    <span className="text-[#29403e]">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className={`
                  block w-full text-center py-3 rounded-full font-semibold transition-all duration-200
                  ${tier.highlighted
                    ? "bg-[#2b7a78] text-white hover:bg-[#1d5c5a]"
                    : "border border-[#2b7a78]/40 text-[#2b7a78] hover:border-[#2b7a78] hover:bg-[#2b7a78]/5"
                  }
                `}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
