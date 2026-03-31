"use client";

import { useState, useEffect } from "react";
import { SessionProvider, useSession } from "@/context/SessionContext";
import SituationSelector from "@/components/onboarding/SituationSelector";
import PreSessionForm from "@/components/onboarding/PreSessionForm";
import MoodCheckIn from "@/components/onboarding/MoodCheckIn";
import SessionPlayer from "@/components/player/SessionPlayer";
import GeneratingSession from "@/components/player/GeneratingSession";
import SessionLimitGate from "@/components/player/SessionLimitGate";
import SessionComplete from "@/components/player/SessionComplete";
import Link from "next/link";

type Step =
  | "gate"
  | "category"
  | "form"
  | "pre-mood"
  | "generating"
  | "player"
  | "post-mood"
  | "complete";

function SessionFlow({ devMode }: { devMode: boolean }) {
  const [step, setStep] = useState<Step>("gate");
  const { dispatch } = useSession();

  function reset() {
    dispatch({ type: "RESET" });
    setStep("gate");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1f1e]">
      {devMode && (
        <div className="bg-yellow-400 text-black text-xs font-bold text-center py-1 px-3">
          ⚡ DEV MODE — 5s phases · open browser console for logs
        </div>
      )}
      {/* Minimal header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🧠</span>
          <span className="font-bold text-lg tracking-tight">
            <span className="text-white">Mind</span><span className="text-[#2b7a78]">Gym</span>
          </span>
        </Link>
        <StepProgress step={step} />
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        {step === "gate" && (
          <SessionLimitGate onAllowed={() => setStep("category")} />
        )}
        {step === "category" && (
          <SituationSelector onNext={() => setStep("form")} />
        )}
        {step === "form" && (
          <PreSessionForm
            onNext={() => setStep("pre-mood")}
            onBack={() => setStep("category")}
          />
        )}
        {step === "pre-mood" && (
          <MoodCheckIn type="pre" onNext={() => setStep("generating")} />
        )}
        {step === "generating" && (
          <GeneratingSession onReady={() => setStep("player")} />
        )}
        {step === "player" && (
          <SessionPlayer devMode={devMode} onComplete={() => setStep("post-mood")} />
        )}
        {step === "post-mood" && (
          <MoodCheckIn type="post" onNext={() => setStep("complete")} />
        )}
        {step === "complete" && (
          <SessionComplete onStartNew={reset} />
        )}
      </main>
    </div>
  );
}

function StepProgress({ step }: { step: Step }) {
  const visibleSteps: Step[] = ["category", "form", "pre-mood", "generating", "player", "post-mood", "complete"];
  const current = step === "gate" ? -1 : visibleSteps.indexOf(step);
  return (
    <div className="flex items-center gap-1.5">
      {visibleSteps.map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i <= current ? "w-5 bg-[#2b7a78]" : "w-3 bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}

export default function SessionPage() {
  const [devMode, setDevMode] = useState(false);
  useEffect(() => {
    setDevMode(new URLSearchParams(window.location.search).get("dev") === "true");
  }, []);

  return (
    <SessionProvider>
      <SessionFlow devMode={devMode} />
    </SessionProvider>
  );
}
