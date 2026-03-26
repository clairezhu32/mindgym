"use client";

const EMOJIS = ["😰", "😟", "😐", "🙂", "😊"];
const LABELS = ["Very anxious", "Nervous", "Neutral", "Calm", "Confident"];

interface EmojiScaleProps {
  value: number | null;
  onChange: (value: number) => void;
}

export default function EmojiScale({ value, onChange }: EmojiScaleProps) {
  return (
    <div className="flex gap-3 justify-center" role="group" aria-label="Mood scale">
      {EMOJIS.map((emoji, i) => {
        const score = i + 1;
        const selected = value === score;
        return (
          <button
            key={score}
            onClick={() => onChange(score)}
            aria-label={LABELS[i]}
            aria-pressed={selected}
            className={`
              flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-150
              ${selected
                ? "scale-125 ring-2 ring-[#2b7a78] bg-[#2b7a78]/10"
                : "hover:scale-110 hover:bg-[#1a3330]"
              }
            `}
          >
            <span className="text-3xl leading-none">{emoji}</span>
            <span className="text-[10px] text-[#8fb5b3] w-12 text-center leading-tight">
              {LABELS[i]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
