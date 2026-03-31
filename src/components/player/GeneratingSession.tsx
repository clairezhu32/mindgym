"use client";

import { useEffect } from "react";
import { useSession } from "@/context/SessionContext";
import { getSmartScript } from "@/lib/domain-scripts";

interface Props {
  onReady: () => void;
}

export default function GeneratingSession({ onReady }: Props) {
  const { state, dispatch } = useSession();
  const { answers } = state;

  useEffect(() => {
    const script = getSmartScript(
      answers?.eventName ?? "",
      answers?.eventDate ?? "",
      answers?.goal ?? ""
    );

    dispatch({ type: "SET_SCRIPT", payload: script });
    dispatch({ type: "START_SESSION" });
    onReady();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Brief flash while script is matched — will transition almost instantly
  return (
    <div className="flex flex-col items-center gap-6 animate-fade-up text-center">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full bg-[#2b7a78]/20 animate-ping" />
        <div className="absolute inset-2 rounded-full bg-[#2b7a78]/30 animate-pulse" />
        <div className="absolute inset-4 rounded-full bg-[#2b7a78]/50 flex items-center justify-center">
          <span className="text-2xl">🧠</span>
        </div>
      </div>

      <div>
        <p className="text-[#eef2f1] font-semibold mb-2">
          Personalizing your session…
        </p>
        <p className="text-[#8fb5b3] text-sm">
          Tailored for: {answers?.eventName ?? "your event"}
        </p>
      </div>
    </div>
  );
}
