"use client";

import { useSession } from "@/context/SessionContext";
import EmojiScale from "@/components/shared/EmojiScale";

interface Props {
  type: "pre" | "post";
  onNext: () => void;
}

export default function MoodCheckIn({ type, onNext }: Props) {
  const { state, dispatch } = useSession();
  const value = type === "pre" ? state.preMood : state.postMood;

  function handleChange(score: number) {
    dispatch({
      type: type === "pre" ? "SET_PRE_MOOD" : "SET_POST_MOOD",
      payload: score,
    });
    setTimeout(onNext, 400);
  }

  return (
    <div className="animate-fade-up text-center max-w-lg mx-auto w-full">
      <div className="mb-10">
        <p className="text-[#2b7a78] text-sm font-semibold tracking-widest uppercase mb-4">
          {type === "pre" ? "Before your session" : "After your session"}
        </p>
        <h1 className="text-3xl font-bold mb-3">
          {type === "pre"
            ? "How are you feeling right now?"
            : "How are you feeling now?"}
        </h1>
        <p className="text-[#8fb5b3] text-sm">
          {type === "pre"
            ? "Be honest — there's no wrong answer."
            : "Notice any shift from where you started."}
        </p>
      </div>

      <EmojiScale value={value} onChange={handleChange} />

      {type === "post" && state.preMood && value && (
        <div className="mt-8 p-4 rounded-xl bg-[#1a3330] border border-[#2b7a78]/20">
          <p className="text-sm text-[#8fb5b3]">
            You moved{" "}
            <span className="text-[#eef2f1] font-semibold">
              {value > state.preMood
                ? `+${value - state.preMood} levels`
                : value < state.preMood
                ? `${value - state.preMood} levels`
                : "no change"}
            </span>{" "}
            from your baseline
          </p>
        </div>
      )}
    </div>
  );
}
