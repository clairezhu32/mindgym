"use client";

import { useState } from "react";
import Button from "@/components/shared/Button";

interface Props {
  onNext: (dreamJob: string) => void;
  onBack: () => void;
}

export default function DreamJobForm({ onNext, onBack }: Props) {
  const [dreamJob, setDreamJob] = useState("");
  const isValid = dreamJob.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    onNext(dreamJob.trim());
  }

  return (
    <div className="animate-fade-up max-w-lg mx-auto w-full">
      <div className="text-center mb-10">
        <p className="text-[#2b7a78] text-sm font-semibold tracking-widest uppercase mb-4">
          Step 2 of 3
        </p>
        <h1 className="text-3xl font-bold mb-3">What&apos;s your dream job?</h1>
        <p className="text-[#8fb5b3] text-sm leading-relaxed">
          Be specific. The clearer the target, the stronger the session.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <textarea
            value={dreamJob}
            onChange={(e) => setDreamJob(e.target.value)}
            placeholder="e.g. Senior Product Designer at a mission-driven startup, Engineering Manager at Google, Therapist running my own practice..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-[#1a3330] border border-white/10 text-[#eef2f1] placeholder-[#8fb5b3]/50 focus:outline-none focus:border-[#2b7a78] transition-colors text-sm resize-none"
            autoFocus
          />
          <p className="text-xs text-[#8fb5b3]/60 mt-2">
            Include the role, company type, or impact you want to have.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onBack} className="flex-1">
            ← Back
          </Button>
          <Button type="submit" variant="primary" disabled={!isValid} className="flex-1">
            Continue →
          </Button>
        </div>
      </form>
    </div>
  );
}
