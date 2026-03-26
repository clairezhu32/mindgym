"use client";

import { useEffect, useRef, useCallback } from "react";

interface SpeechOptions {
  rate?: number;   // 0.1–10, default 1. Use 0.82 for calm meditation pace
  pitch?: number;  // 0–2, default 1. Slightly lower = warmer
  volume?: number; // 0–1
}

export function useSpeech(options: SpeechOptions = {}) {
  const { rate = 0.82, pitch = 0.9, volume = 1 } = options;
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const preferredVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Initialize synthesis and pick the best available voice
  useEffect(() => {
    if (typeof window === "undefined") return;
    synthRef.current = window.speechSynthesis;

    function pickVoice() {
      const voices = synthRef.current?.getVoices() ?? [];
      // Prefer calm, natural-sounding English voices
      const preferred = [
        "Samantha",        // macOS — warm female
        "Karen",           // macOS Australian
        "Moira",           // macOS Irish
        "Google UK English Female",
        "Microsoft Aria Online (Natural)",
        "Microsoft Jenny Online (Natural)",
      ];
      for (const name of preferred) {
        const match = voices.find((v) => v.name === name);
        if (match) {
          preferredVoiceRef.current = match;
          return;
        }
      }
      // Fallback: first English female, then first English, then first available
      preferredVoiceRef.current =
        voices.find((v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("female")) ??
        voices.find((v) => v.lang.startsWith("en")) ??
        voices[0] ??
        null;
    }

    // Voices may load asynchronously
    pickVoice();
    synthRef.current.addEventListener("voiceschanged", pickVoice);
    return () => {
      synthRef.current?.removeEventListener("voiceschanged", pickVoice);
    };
  }, []);

  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!synthRef.current) return;
      synthRef.current.cancel(); // stop anything currently playing

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      if (preferredVoiceRef.current) {
        utterance.voice = preferredVoiceRef.current;
      }
      if (onEnd) utterance.onend = onEnd;
      synthRef.current.speak(utterance);
    },
    [rate, pitch, volume]
  );

  const stop = useCallback(() => {
    synthRef.current?.cancel();
  }, []);

  const pause = useCallback(() => {
    synthRef.current?.pause();
  }, []);

  const resume = useCallback(() => {
    synthRef.current?.resume();
  }, []);

  return { speak, stop, pause, resume };
}
