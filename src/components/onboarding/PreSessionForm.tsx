"use client";

import { useState } from "react";
import { useSession } from "@/context/SessionContext";
import Button from "@/components/shared/Button";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function PreSessionForm({ onNext, onBack }: Props) {
  const { dispatch } = useSession();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [goal, setGoal] = useState("");

  const isValid = eventName.trim().length > 0 && goal.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    dispatch({
      type: "SET_ANSWERS",
      payload: { eventName, eventDate, goal },
    });
    onNext();
  }

  return (
    <div className="animate-fade-up max-w-lg mx-auto w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Tell us about your moment</h1>
        <p className="text-[#8fb5b3]">
          Your answers will be woven into the session to make it feel personal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#eef2f1] mb-2">
            What is the event? <span className="text-[#F87171]">*</span>
          </label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="e.g. Final round interview at Stripe, TEDx talk, State championship..."
            className="w-full px-4 py-3 rounded-xl bg-[#1a3330] border border-white/10 text-[#eef2f1] placeholder-[#8fb5b3]/50 focus:outline-none focus:border-[#2b7a78] transition-colors text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#eef2f1] mb-2">
            When is it?{" "}
            <span className="text-[#8fb5b3] font-normal text-xs">(optional)</span>
          </label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#1a3330] border border-white/10 text-[#eef2f1] focus:outline-none focus:border-[#2b7a78] transition-colors text-sm [color-scheme:dark]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#eef2f1] mb-2">
            What's your #1 goal for this performance?{" "}
            <span className="text-[#F87171]">*</span>
          </label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. Come across as confident and prepared, land the job offer..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-[#1a3330] border border-white/10 text-[#eef2f1] placeholder-[#8fb5b3]/50 focus:outline-none focus:border-[#2b7a78] transition-colors text-sm resize-none"
            required
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onBack} className="flex-1">
            ← Back
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid}
            className="flex-2 flex-1"
          >
            Continue →
          </Button>
        </div>
      </form>
    </div>
  );
}
