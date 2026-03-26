"use client";

import { SessionPhase } from "@/types";

interface Props {
  phase: SessionPhase;
  isPlaying: boolean;
}

const PHASE_COLORS: Record<string, { from: string; to: string }> = {
  calm: { from: "#2b7a78", to: "#0077C5" },
  rehearse: { from: "#4a9a97", to: "#2b7a78" },
  anchor: { from: "#F59E0B", to: "#2b7a78" },
  complete: { from: "#4ADE80", to: "#2b7a78" },
};

export default function BreathingAnimation({ phase, isPlaying }: Props) {
  const colors = PHASE_COLORS[phase] ?? PHASE_COLORS.calm;

  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      {/* Outer pulse ring */}
      {isPlaying && (
        <div
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${colors.from}40, transparent)`,
            animation: "pulse-ring 3s ease-out infinite",
          }}
        />
      )}

      {/* Main orb */}
      <div
        className="w-32 h-32 rounded-full shadow-2xl"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${colors.from}, ${colors.to})`,
          boxShadow: `0 0 60px ${colors.from}40`,
          animation: isPlaying ? "breathe 8s ease-in-out infinite" : "none",
        }}
      />

      {/* Phase label overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-white/70 text-xs font-bold tracking-widest uppercase"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
        >
          {phase === "complete" ? "✓" : phase}
        </span>
      </div>
    </div>
  );
}
