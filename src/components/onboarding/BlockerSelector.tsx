"use client";

import { useState } from "react";
import { BLOCKERS, JobBlocker } from "@/types";
import Button from "@/components/shared/Button";

interface Props {
  dreamJob: string;
  onNext: (blockers: JobBlocker[], customBlocker: string) => void;
  onBack: () => void;
}

export default function BlockerSelector({ dreamJob, onNext, onBack }: Props) {
  const [selected, setSelected] = useState<JobBlocker[]>([]);
  const [custom, setCustom] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  function toggle(id: JobBlocker) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  }

  const isValid = selected.length > 0 || custom.trim().length > 0;

  function handleSubmit() {
    if (!isValid) return;
    const all: JobBlocker[] = [...selected];
    if (custom.trim()) all.push("custom");
    onNext(all, custom.trim());
  }

  return (
    <div className="animate-fade-up max-w-lg mx-auto w-full">
      <div className="text-center mb-8">
        <p className="text-[#2b7a78] text-sm font-semibold tracking-widest uppercase mb-4">
          Step 3 of 3
        </p>
        <h1 className="text-3xl font-bold mb-3">What&apos;s in the way?</h1>
        <p className="text-[#8fb5b3] text-sm leading-relaxed">
          What&apos;s preventing you from becoming a{" "}
          <span className="text-[#eef2f1]">{dreamJob}</span>?
          <br />Select everything that resonates.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {BLOCKERS.map((b) => {
          const active = selected.includes(b.id);
          return (
            <button
              key={b.id}
              onClick={() => toggle(b.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-150 active:scale-95 ${
                active
                  ? "border-[#2b7a78] bg-[#2b7a78]/15 text-[#eef2f1]"
                  : "border-white/10 bg-[#1a3330] text-[#8fb5b3] hover:border-[#2b7a78]/40"
              }`}
            >
              <span className="text-xl block mb-1">{b.icon}</span>
              <span className="text-sm font-medium leading-snug">{b.label}</span>
            </button>
          );
        })}
      </div>

      {/* Custom blocker */}
      {!showCustom ? (
        <button
          onClick={() => setShowCustom(true)}
          className="text-sm text-[#8fb5b3] hover:text-[#eef2f1] transition-colors underline underline-offset-2 block mx-auto mb-6"
        >
          + Something else?
        </button>
      ) : (
        <div className="mb-6">
          <textarea
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Describe what's holding you back in your own words..."
            rows={2}
            className="w-full px-4 py-3 rounded-xl bg-[#1a3330] border border-white/10 text-[#eef2f1] placeholder-[#8fb5b3]/50 focus:outline-none focus:border-[#2b7a78] transition-colors text-sm resize-none"
            autoFocus
          />
        </div>
      )}

      <div className="flex gap-3">
        <Button type="button" variant="ghost" onClick={onBack} className="flex-1">
          ← Back
        </Button>
        <Button
          type="button"
          variant="primary"
          disabled={!isValid}
          onClick={handleSubmit}
          className="flex-1"
        >
          Start session →
        </Button>
      </div>

      {!isValid && (
        <p className="text-center text-xs text-[#8fb5b3]/60 mt-3">
          Select at least one blocker to continue
        </p>
      )}
    </div>
  );
}
