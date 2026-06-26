"use client";

import { useState, useEffect } from "react";
import { SessionProvider, useSession } from "@/context/SessionContext";
import OfferCheck from "@/components/onboarding/OfferCheck";
import DreamJobForm from "@/components/onboarding/DreamJobForm";
import BlockerSelector from "@/components/onboarding/BlockerSelector";
import GeneratingSession from "@/components/player/GeneratingSession";
import SessionPlayer from "@/components/player/SessionPlayer";
import ResourcesPage from "@/components/player/ResourcesPage";
import SessionLimitGate from "@/components/player/SessionLimitGate";
import Link from "next/link";
import { JobBlocker } from "@/types";

type Step =
  | "gate"
  | "offer-check"
  | "dream-job"
  | "blockers"
  | "generating"
  | "player"
  | "resources";

const VISIBLE_STEPS: Step[] = ["offer-check", "dream-job", "blockers", "generating", "player", "resources"];

function OfferAccepted({ dreamJob, onRestart }: { dreamJob: string; onRestart: () => void }) {
  return (
    <div className="animate-fade-up text-center max-w-lg mx-auto w-full">
      <div className="text-5xl mb-6">🎉</div>
      <h1 className="text-3xl font-bold mb-3">Congratulations!</h1>
      <p className="text-[#8fb5b3] mb-2 text-sm leading-relaxed">
        You have an offer. That is not a small thing — that is the result of real work.
      </p>
      {dreamJob && (
        <p className="text-[#eef2f1] font-semibold mb-6">
          Your next chapter:{" "}
          <span className="text-[#2b7a78]">{dreamJob}</span>
        </p>
      )}
      <div className="p-5 rounded-2xl bg-[#1a3330] border border-[#2b7a78]/20 mb-8 text-left space-y-3">
        <p className="text-xs text-[#2b7a78] font-semibold tracking-widest uppercase">What to do now</p>
        <p className="text-sm text-[#8fb5b3] leading-relaxed">
          1. Negotiate. Even one counter-offer attempt averages <strong className="text-[#eef2f1]">$5,000–$20,000</strong> in additional compensation.
        </p>
        <p className="text-sm text-[#8fb5b3] leading-relaxed">
          2. Start a mindset session to prepare for Day 1 — showing up with confidence matters more than knowing everything.
        </p>
        <p className="text-sm text-[#8fb5b3] leading-relaxed">
          3. Celebrate. Actually. This counts.
        </p>
      </div>
      <button
        onClick={onRestart}
        className="w-full py-3 rounded-full bg-[#2b7a78] text-[#0b1f1e] font-bold hover:bg-[#4a9a97] transition-colors"
      >
        Run a Day 1 confidence session →
      </button>
    </div>
  );
}

function SessionFlow({ devMode }: { devMode: boolean }) {
  const [step, setStep] = useState<Step>("gate");
  const [dreamJob, setDreamJob] = useState("");
  const [blockers, setBlockers] = useState<JobBlocker[]>([]);
  const [customBlocker, setCustomBlocker] = useState("");
  const [hasOffer, setHasOffer] = useState(false);
  const { dispatch } = useSession();

  function reset() {
    dispatch({ type: "RESET" });
    setDreamJob("");
    setBlockers([]);
    setCustomBlocker("");
    setHasOffer(false);
    setStep("gate");
  }

  function handleOfferYes() {
    setHasOffer(true);
    setStep("dream-job");
  }

  function handleOfferNo() {
    setHasOffer(false);
    setStep("dream-job");
  }

  function handleDreamJob(job: string) {
    setDreamJob(job);
    if (hasOffer) {
      // Offer accepted — show celebration screen (reuse blockers step slot)
      setStep("blockers");
    } else {
      setStep("blockers");
    }
  }

  function handleBlockers(selected: JobBlocker[], custom: string) {
    setBlockers(selected);
    setCustomBlocker(custom);
    dispatch({
      type: "SET_JOB_SEARCH_ANSWERS",
      payload: { hasOffer, dreamJob, blockers: selected, customBlocker: custom },
    });
    setStep("generating");
  }

  const currentIdx = VISIBLE_STEPS.indexOf(step);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1f1e]">
      {devMode && (
        <div className="bg-yellow-400 text-black text-xs font-bold text-center py-1 px-3">
          ⚡ DEV MODE — 5s phases · open browser console for logs
        </div>
      )}

      <header className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🧠</span>
          <span className="font-bold text-lg tracking-tight">
            <span className="text-white">Mind</span><span className="text-[#2b7a78]">Gym</span>
          </span>
        </Link>

        {/* Step dots */}
        <div className="flex items-center gap-1.5">
          {VISIBLE_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i <= currentIdx ? "w-5 bg-[#2b7a78]" : "w-3 bg-white/10"
              }`}
            />
          ))}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        {step === "gate" && (
          <SessionLimitGate onAllowed={() => setStep("offer-check")} />
        )}

        {step === "offer-check" && (
          <OfferCheck onNo={handleOfferNo} onYes={handleOfferYes} />
        )}

        {step === "dream-job" && (
          <DreamJobForm
            onNext={handleDreamJob}
            onBack={() => setStep("offer-check")}
          />
        )}

        {step === "blockers" && !hasOffer && (
          <BlockerSelector
            dreamJob={dreamJob}
            onNext={handleBlockers}
            onBack={() => setStep("dream-job")}
          />
        )}

        {step === "blockers" && hasOffer && (
          <OfferAccepted
            dreamJob={dreamJob}
            onRestart={() => {
              setHasOffer(false);
              setStep("blockers");
            }}
          />
        )}

        {step === "generating" && (
          <GeneratingSession onReady={() => setStep("player")} />
        )}

        {step === "player" && (
          <SessionPlayer
            devMode={devMode}
            onComplete={() => setStep("resources")}
          />
        )}

        {step === "resources" && (
          <ResourcesPage
            blockers={blockers}
            dreamJob={dreamJob}
            onStartNew={reset}
          />
        )}
      </main>
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
