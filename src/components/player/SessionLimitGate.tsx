"use client";

import { useEffect, useState } from "react";
import { checkSessionEligibility, SessionEligibility } from "@/lib/plans";
import Link from "next/link";

interface Props {
  onAllowed: () => void;
}

export default function SessionLimitGate({ onAllowed }: Props) {
  const [eligibility, setEligibility] = useState<SessionEligibility | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSessionEligibility().then((result) => {
      setEligibility(result);
      setLoading(false);
      if (result.canStart) {
        onAllowed();
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#2b7a78]/30 border-t-[#2b7a78] rounded-full animate-spin" />
      </div>
    );
  }

  // If allowed, render nothing (parent will advance the step)
  if (!eligibility || eligibility.canStart) return null;

  // Show upgrade prompt
  return (
    <div className="animate-fade-up text-center max-w-md mx-auto w-full">
      <div className="mb-6">
        <div className="w-16 h-16 rounded-full bg-[#2b7a78]/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🔒</span>
        </div>
        <h2 className="text-2xl font-bold text-[#eef2f1] mb-2">
          Monthly limit reached
        </h2>
        <p className="text-[#8fb5b3]">
          You&apos;ve used {eligibility.sessionsUsed} of {eligibility.sessionLimit} free sessions this month.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-[#1a3330] border border-[#2b7a78]/30 mb-6">
        <p className="font-semibold text-[#eef2f1] mb-2">Upgrade to Pro</p>
        <p className="text-[#8fb5b3] text-sm mb-4">
          Unlimited sessions, all categories, streak tracking, and more.
        </p>
        <div className="flex gap-3">
          <Link
            href="/#pricing"
            className="flex-1 py-3 rounded-full bg-[#2b7a78] text-white font-bold text-sm text-center hover:bg-[#4a9a97] transition-colors"
          >
            $12/mo — Start trial
          </Link>
          <Link
            href="/#pricing"
            className="flex-1 py-3 rounded-full border border-[#2b7a78]/40 text-[#eef2f1] font-semibold text-sm text-center hover:border-[#2b7a78] hover:bg-[#2b7a78]/10 transition-colors"
          >
            $79/yr — Save 45%
          </Link>
        </div>
      </div>

      <Link
        href="/dashboard"
        className="text-sm text-[#8fb5b3] hover:text-[#eef2f1] transition-colors"
      >
        ← Back to dashboard
      </Link>
    </div>
  );
}
