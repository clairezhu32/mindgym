"use client";

import { CATEGORIES, Category } from "@/types";
import { useSession } from "@/context/SessionContext";

interface Props {
  onNext: () => void;
}

export default function SituationSelector({ onNext }: Props) {
  const { state, dispatch } = useSession();

  function handleSelect(id: Category) {
    dispatch({ type: "SET_CATEGORY", payload: id });
    onNext();
  }

  return (
    <div className="animate-fade-up">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Visualize your success<br />before experiencing it</h1>
        <p className="text-[#8fb5b3] text-sm mt-3">What are you preparing for?</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`
              relative text-left p-6 rounded-2xl border transition-all duration-200
              hover:border-[#2b7a78]/60 hover:bg-[#2b7a78]/5 active:scale-98 group
              ${state.category === cat.id
                ? "border-[#2b7a78] bg-[#2b7a78]/10"
                : "border-white/10 bg-[#1a3330]"
              }
            `}
          >
            {cat.popular && (
              <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 bg-[#F59E0B]/20 text-[#F59E0B] rounded-full font-semibold">
                POPULAR
              </span>
            )}
            <div className="text-4xl mb-4">{cat.icon}</div>
            <h3 className="font-semibold text-lg mb-2 group-hover:text-[#2b7a78] transition-colors">
              {cat.label}
            </h3>
            <p className="text-[#8fb5b3] text-sm leading-relaxed">
              {cat.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
