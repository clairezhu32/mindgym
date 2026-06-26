"use client";

interface Props {
  onNo: () => void;
  onYes: () => void;
}

export default function OfferCheck({ onNo, onYes }: Props) {
  return (
    <div className="animate-fade-up text-center max-w-lg mx-auto w-full">
      <div className="mb-10">
        <p className="text-[#2b7a78] text-sm font-semibold tracking-widest uppercase mb-4">
          Step 1 of 3
        </p>
        <h1 className="text-3xl font-bold mb-4 leading-tight">
          Do you have a job offer<br />right now?
        </h1>
        <p className="text-[#8fb5b3] text-sm">
          Be honest — this shapes your session.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onYes}
          className="p-6 rounded-2xl border border-white/10 bg-[#1a3330] hover:border-[#2b7a78]/60 hover:bg-[#2b7a78]/10 transition-all duration-200 active:scale-95 text-left"
        >
          <div className="text-3xl mb-3">🎉</div>
          <div className="font-semibold text-[#eef2f1] mb-1">Yes, I do</div>
          <div className="text-xs text-[#8fb5b3]">I have an offer in hand</div>
        </button>

        <button
          onClick={onNo}
          className="p-6 rounded-2xl border border-white/10 bg-[#1a3330] hover:border-[#2b7a78]/60 hover:bg-[#2b7a78]/10 transition-all duration-200 active:scale-95 text-left"
        >
          <div className="text-3xl mb-3">🎯</div>
          <div className="font-semibold text-[#eef2f1] mb-1">Not yet</div>
          <div className="text-xs text-[#8fb5b3]">Still working toward it</div>
        </button>
      </div>
    </div>
  );
}
