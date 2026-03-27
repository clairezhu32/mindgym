"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PricingSuccessPage() {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  return (
    <div className="min-h-screen bg-[#0b1f1e] flex items-center justify-center px-6">
      <div className={`text-center transition-all duration-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="w-20 h-20 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🎉</span>
        </div>
        <h1 className="text-2xl font-bold text-[#eef2f1] mb-2">You're all set!</h1>
        <p className="text-[#8fb5b3] mb-2">Your Pro trial has started.</p>
        <p className="text-[#8fb5b3]/60 text-sm mb-8">
          You have 7 days free — no charge until the trial ends.
        </p>
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <Link
            href="/session"
            className="block w-full py-3 rounded-full bg-[#2b7a78] text-white font-bold hover:bg-[#4a9a97] transition-colors"
          >
            Start your first session →
          </Link>
          <Link
            href="/dashboard"
            className="block w-full py-3 rounded-full border border-white/10 text-[#8fb5b3] text-sm hover:text-[#eef2f1] hover:border-white/20 transition-colors"
          >
            Go to my roadmap
          </Link>
        </div>
      </div>
    </div>
  );
}
