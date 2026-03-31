"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSession } from "@/context/SessionContext";
import { getScript } from "@/lib/session-scripts";
import { useElevenLabsTTS } from "@/lib/useElevenLabsTTS";
import { Category, PersonalizationAnswers, SessionPhase, PHASE_DURATIONS, GeneratedScript } from "@/types";
import PhaseIndicator from "./PhaseIndicator";
import BreathingAnimation from "./BreathingAnimation";

interface Props {
  onComplete: () => void;
  devMode?: boolean;
}

const PHASE_ORDER: Array<Exclude<SessionPhase, "complete">> = ["calm", "rehearse", "anchor"];

const PAUSE_BETWEEN_LINES: Record<string, number> = {
  calm: 2400,
  rehearse: 1800,
  anchor: 2000,
};

const DEV_PAUSE_BETWEEN_LINES: Record<string, number> = {
  calm: 100,
  rehearse: 100,
  anchor: 100,
};

const PAUSE_BETWEEN_PHASES = 2000;
const DEV_PHASE_DURATIONS: Record<string, number> = { calm: 5, rehearse: 5, anchor: 5 };

export default function SessionPlayer({ onComplete, devMode = false }: Props) {
  const { state, dispatch } = useSession();
  const { category, answers, phase, isPlaying, generatedScript } = state;
  const { preloadLines, playLine, stop, isLoading, ttsMode } = useElevenLabsTTS();
  const log = devMode ? (...args: unknown[]) => console.log("[MindGym Dev]", ...args) : () => {};

  const [elapsed, setElapsed] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPreloaded, setIsPreloaded] = useState(false);

  const timerRef       = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseRef       = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lineIndexRef   = useRef(0);
  const isPlayingRef   = useRef(isPlaying);
  const phaseRef       = useRef(phase);
  // Ref to hold latest speakNextLine — breaks circular dep with advancePhase
  const speakNextRef   = useRef<() => void>(() => {});

  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  const fallbackScript = getScript(
    (category ?? "general") as Category,
    answers ?? ({ eventName: "", eventDate: "", goal: "" } as PersonalizationAnswers)
  );
  const script: GeneratedScript = generatedScript ?? fallbackScript;
  const scriptRef = useRef(script);
  useEffect(() => { scriptRef.current = script; }, [script]);

  const allLines = [...script.calm, ...script.rehearse, ...script.anchor];
  const currentPhaseIndex = PHASE_ORDER.indexOf(phase as Exclude<SessionPhase, "complete">);
  const currentDuration   = devMode
    ? (DEV_PHASE_DURATIONS[phase] ?? 5)
    : (PHASE_DURATIONS[phase as Exclude<SessionPhase, "complete">] ?? 90);

  // ── Helpers ────────────────────────────────────────────────────────────────
  function clearPause() {
    if (pauseRef.current) { clearTimeout(pauseRef.current); pauseRef.current = null; }
  }

  function resetPhaseState() {
    lineIndexRef.current = 0;
    setDisplayedLines([]);
    setElapsed(0);
    setIsSpeaking(false);
    clearPause();
  }

  // ── Advance to next phase (no dep on speakNextLine) ────────────────────────
  const advancePhase = useCallback((fromPhaseIndex: number) => {
    const nextIndex = fromPhaseIndex + 1;
    log(`Phase complete: ${PHASE_ORDER[fromPhaseIndex]} → ${PHASE_ORDER[nextIndex] ?? "complete"}`);
    if (nextIndex >= PHASE_ORDER.length) {
      stop();
      dispatch({ type: "SET_PHASE", payload: "complete" });
      dispatch({ type: "SET_PLAYING", payload: false });
      log("Session complete — calling onComplete");
      onComplete();
    } else {
      resetPhaseState();
      dispatch({ type: "SET_PHASE", payload: PHASE_ORDER[nextIndex] });
      // Wait for phaseRef to update (next tick) then start speaking
      pauseRef.current = setTimeout(() => {
        if (isPlayingRef.current) speakNextRef.current();
      }, devMode ? 300 : PAUSE_BETWEEN_PHASES);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, onComplete, stop]);

  // ── Core speech loop ───────────────────────────────────────────────────────
  const speakNextLine = useCallback(() => {
    if (!isPlayingRef.current) return;
    if (phaseRef.current === "complete") return;

    const lines: string[] = scriptRef.current[phaseRef.current as keyof typeof scriptRef.current] ?? [];
    const idx = lineIndexRef.current;

    if (idx >= lines.length) {
      // All lines spoken in this phase — move on
      const currentIdx = PHASE_ORDER.indexOf(phaseRef.current as Exclude<SessionPhase, "complete">);
      pauseRef.current = setTimeout(() => {
        if (isPlayingRef.current) advancePhase(currentIdx);
      }, 1000);
      return;
    }

    const line = lines[idx];
    log(`Speaking line ${idx + 1}/${lines.length} [${phaseRef.current}]: "${line.slice(0, 60)}..."`);
    setDisplayedLines((prev) => [...prev, line].slice(-3));
    setIsSpeaking(true);

    playLine(line, () => {
      setIsSpeaking(false);
      lineIndexRef.current = idx + 1;
      const gap = devMode
        ? (DEV_PAUSE_BETWEEN_LINES[phaseRef.current] ?? 100)
        : (PAUSE_BETWEEN_LINES[phaseRef.current] ?? 1800);
      pauseRef.current = setTimeout(() => {
        if (isPlayingRef.current) speakNextRef.current();
      }, gap);
    });
  }, [playLine, advancePhase]);

  // Keep ref in sync with latest callback
  useEffect(() => { speakNextRef.current = speakNextLine; }, [speakNextLine]);

  // ── Pre-load all audio on mount ────────────────────────────────────────────
  useEffect(() => {
    log(`Session starting — category: ${category}, phase: ${phase}, devMode: ${devMode}`);
    preloadLines(allLines).then(() => { log("Audio preloaded"); setIsPreloaded(true); });
    return () => {
      stop();
      if (timerRef.current) clearInterval(timerRef.current);
      clearPause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Timer for progress bar ─────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setElapsed((prev) => Math.min(prev + 1, currentDuration));
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, currentDuration]);

  // ── Start / pause on play toggle ───────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) {
      stop();
      clearPause();
      setIsSpeaking(false);
      return;
    }
    speakNextLine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  function togglePlay() {
    if (!isPreloaded) return;
    dispatch({ type: "SET_PLAYING", payload: !isPlaying });
  }

  const progressPct = Math.min((elapsed / currentDuration) * 100, 100);
  const remaining   = Math.max(currentDuration - elapsed, 0);
  const formatTime  = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  // ── Loading screen ─────────────────────────────────────────────────────────
  if (isLoading || !isPreloaded) {
    return (
      <div className="flex flex-col items-center gap-6 animate-fade-up text-center">
        <div className="w-16 h-16 rounded-full border-2 border-[#2b7a78] border-t-transparent animate-spin" />
        <div>
          <p className="text-[#eef2f1] font-semibold mb-1">Preparing your session…</p>
          <p className="text-[#8fb5b3] text-sm">Loading your guided audio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto animate-fade-up">
      <PhaseIndicator currentPhase={phase} />

      <BreathingAnimation phase={phase} isPlaying={isPlaying} />

      {/* Narration */}
      <div
        className="min-h-[120px] w-full text-center px-4"
        aria-live="polite"
        aria-label="Session narration"
      >
        {displayedLines.map((line, i) => (
          <p
            key={`${phase}-${i}-${line.slice(0, 12)}`}
            className="font-[var(--font-lora)] italic text-lg text-[#eef2f1] leading-relaxed mb-2 animate-fade-up"
            style={{ opacity: i === displayedLines.length - 1 ? 1 : 0.35 }}
          >
            {line}
          </p>
        ))}
        {!isPlaying && displayedLines.length === 0 && (
          <p className="text-[#8fb5b3] text-sm">Press play — your guide will speak to you.</p>
        )}
        {isSpeaking && (
          <div className="flex items-center justify-center gap-1 mt-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-3 bg-[#2b7a78]/60 rounded-full"
                style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full">
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2b7a78] rounded-full transition-all duration-1000"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-[#8fb5b3]">
          <span>{formatTime(elapsed)}</span>
          <span>-{formatTime(remaining)}</span>
        </div>
      </div>

      {/* Play / pause */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause session" : "Play session"}
        className="w-16 h-16 rounded-full bg-[#2b7a78] text-[#0b1f1e] flex items-center justify-center text-2xl hover:bg-[#4a9a97] transition-all duration-200 active:scale-95 shadow-lg shadow-[#2b7a78]/30"
      >
        {isPlaying ? "⏸" : "▶"}
      </button>

      <p className="text-[#8fb5b3] text-xs text-center">
        {isPlaying ? "Close your eyes and follow the voice." : "Take a deep breath before you begin."}
      </p>

      {ttsMode !== "unknown" && (
        <p className="text-[#8fb5b3]/40 text-[10px] text-center">
          {ttsMode === "elevenlabs"
            ? "🎙 ElevenLabs voice"
            : ttsMode === "webspeech"
            ? "🔊 System voice · add OpenAI or ElevenLabs key for human voice"
            : null}
        </p>
      )}
    </div>
  );
}
