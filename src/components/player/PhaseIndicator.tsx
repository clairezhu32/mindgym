"use client";

import { SessionPhase } from "@/types";

const PHASES: Array<Exclude<SessionPhase, "complete">> = ["calm", "rehearse", "anchor"];
const LABELS = { calm: "CALM", rehearse: "REHEARSE", anchor: "ANCHOR" };

interface Props {
  currentPhase: SessionPhase;
}

export default function PhaseIndicator({ currentPhase }: Props) {
  const currentIndex = PHASES.indexOf(currentPhase as Exclude<SessionPhase, "complete">);

  return (
    <div className="flex items-center gap-2 justify-center" role="progressbar" aria-label="Session phase">
      {PHASES.map((phase, i) => {
        const isActive = phase === currentPhase;
        const isComplete = i < currentIndex;

        return (
          <div key={phase} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`
                  h-1 w-20 rounded-full transition-all duration-500
                  ${isComplete ? "bg-[#2b7a78]" : isActive ? "bg-[#2b7a78] animate-pulse" : "bg-white/10"}
                `}
              />
              <span
                className={`
                  text-[10px] font-bold tracking-widest transition-colors duration-300
                  ${isActive ? "text-[#2b7a78]" : isComplete ? "text-[#2b7a78]/60" : "text-[#8fb5b3]/40"}
                `}
              >
                {LABELS[phase]}
              </span>
            </div>
            {i < PHASES.length - 1 && (
              <div className="w-4 h-px bg-white/10 mb-4" />
            )}
          </div>
        );
      })}
    </div>
  );
}
