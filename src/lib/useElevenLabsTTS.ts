"use client";

import { useRef, useCallback, useState } from "react";

type TTSMode = "elevenlabs" | "webspeech" | "unknown";

interface TTSHook {
  preloadLines: (lines: string[]) => Promise<void>;
  playLine: (text: string, onEnd: () => void) => void;
  stop: () => void;
  isLoading: boolean;
  loadError: string | null;
  ttsMode: TTSMode;
}

// Web Speech fallback — picks the best available system voice
// macOS Premium/Enhanced voices are significantly more natural than the defaults
function getBestVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined") return null;
  const voices = window.speechSynthesis.getVoices();
  const preferred = [
    // macOS premium/enhanced neural voices (most natural)
    "Zoe (Premium)",
    "Zoe (Enhanced)",
    "Ava (Premium)",
    "Ava (Enhanced)",
    "Allison (Enhanced)",
    "Allison (Premium)",
    "Samantha (Enhanced)",
    // Chrome/Edge neural voices
    "Microsoft Aria Online (Natural)",
    "Microsoft Jenny Online (Natural)",
    "Google UK English Female",
    // Decent fallbacks
    "Samantha",
    "Karen",
    "Moira",
  ];
  for (const name of preferred) {
    const match = voices.find((v) => v.name === name);
    if (match) return match;
  }
  // Last resort: any English voice
  return voices.find((v) => v.lang.startsWith("en-US")) ??
         voices.find((v) => v.lang.startsWith("en")) ??
         voices[0] ?? null;
}

function speakWithWebSpeech(text: string, onEnd: () => void) {
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.82;
  utterance.pitch = 0.9;
  utterance.volume = 1;
  const voice = getBestVoice();
  if (voice) utterance.voice = voice;
  utterance.onend = onEnd;
  utterance.onerror = onEnd;
  synth.speak(utterance);
}

export function useElevenLabsTTS(): TTSHook {
  const audioCacheRef = useRef<Map<string, string>>(new Map());
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [ttsMode, setTtsMode] = useState<TTSMode>("unknown");

  const fetchAudio = useCallback(async (text: string): Promise<string | null> => {
    const cached = audioCacheRef.current.get(text);
    if (cached) return cached;

    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    // 503 = API key not configured → caller should switch to Web Speech
    if (res.status === 503) return null;

    if (!res.ok) {
      throw new Error(`ElevenLabs error ${res.status}`);
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    audioCacheRef.current.set(text, url);
    return url;
  }, []);

  const preloadLines = useCallback(
    async (lines: string[]) => {
      setIsLoading(true);
      setLoadError(null);
      try {
        // Try the first line to determine which mode to use
        const probe = await fetchAudio(lines[0]);

        if (probe === null) {
          // ElevenLabs not configured — use Web Speech API
          setTtsMode("webspeech");
          // Warm up voices list (async in some browsers)
          if (typeof window !== "undefined") window.speechSynthesis.getVoices();
          return;
        }

        // ElevenLabs is working — preload all remaining lines in parallel
        setTtsMode("elevenlabs");
        await Promise.all(lines.slice(1).map((line) => fetchAudio(line)));
      } catch (err) {
        // ElevenLabs failed for a real reason — fall back gracefully
        console.warn("ElevenLabs TTS failed, falling back to Web Speech:", err);
        setTtsMode("webspeech");
        if (typeof window !== "undefined") window.speechSynthesis.getVoices();
      } finally {
        setIsLoading(false);
      }
    },
    [fetchAudio]
  );

  const playLine = useCallback(
    (text: string, onEnd: () => void) => {
      // Web Speech fallback path
      if (ttsMode === "webspeech") {
        speakWithWebSpeech(text, onEnd);
        return;
      }

      // Stop any currently playing ElevenLabs audio
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.onended = null;
        currentAudioRef.current = null;
      }

      const url = audioCacheRef.current.get(text);
      if (!url) {
        // Not cached — fetch on demand, fall back to Web Speech on failure
        fetchAudio(text)
          .then((freshUrl) => {
            if (!freshUrl) { speakWithWebSpeech(text, onEnd); return; }
            const audio = new Audio(freshUrl);
            currentAudioRef.current = audio;
            audio.onended = onEnd;
            audio.play().catch(() => speakWithWebSpeech(text, onEnd));
          })
          .catch(() => speakWithWebSpeech(text, onEnd));
        return;
      }

      const audio = new Audio(url);
      currentAudioRef.current = audio;
      audio.onended = onEnd;
      audio.play().catch(() => speakWithWebSpeech(text, onEnd));
    },
    [fetchAudio, ttsMode]
  );

  const stop = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.onended = null;
      currentAudioRef.current = null;
    }
    if (typeof window !== "undefined") window.speechSynthesis.cancel();
  }, []);

  return { preloadLines, playLine, stop, isLoading, loadError, ttsMode };
}
