"use client";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import Link from "next/link";
import { useState, useEffect } from "react";

export const dynamic = "force-dynamic";

type Mode = "signin" | "signup";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error")) setError("Sign-in failed. Please try again.");
  }, []);

  async function signInWithGoogle() {
    if (!isSupabaseConfigured()) {
      setError("Supabase is not configured. Add your credentials to .env.local.");
      return;
    }
    setGoogleLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) {
        setError(error.message);
        setGoogleLoading(false);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to sign in.");
      setGoogleLoading(false);
    }
  }

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      setError("Supabase is not configured. Add your credentials to .env.local.");
      return;
    }
    setEmailLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const supabase = createClient();
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        });
        if (error) throw error;
        setSuccess("Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = "/dashboard";
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setEmailLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b1f1e] flex flex-col items-center justify-center px-6">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2b7a78]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm animate-fade-up">
        <Link href="/" className="flex items-center justify-center gap-2 mb-10">
          <span className="text-2xl">🧠</span>
          <span className="font-bold text-xl tracking-tight text-[#eef2f1]">
            Mind<span className="text-[#2b7a78]">Gym</span>
          </span>
        </Link>

        <div className="bg-[#1a3330] border border-white/5 rounded-2xl p-8">
          {/* Mode toggle */}
          <div className="flex rounded-xl bg-[#0b1f1e] p-1 mb-8">
            <button
              onClick={() => { setMode("signin"); setError(null); setSuccess(null); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === "signin" ? "bg-[#2b7a78] text-white" : "text-[#8fb5b3] hover:text-[#eef2f1]"
              }`}
            >
              Sign in
            </button>
            <button
              onClick={() => { setMode("signup"); setError(null); setSuccess(null); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === "signup" ? "bg-[#2b7a78] text-white" : "text-[#8fb5b3] hover:text-[#eef2f1]"
              }`}
            >
              Create account
            </button>
          </div>

          {/* Google */}
          <button
            onClick={signInWithGoogle}
            disabled={googleLoading || emailLoading}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-white text-[#1a1a1a] font-semibold text-sm hover:bg-gray-100 transition-all duration-200 active:scale-95 disabled:opacity-60 mb-4"
          >
            {googleLoading ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[#8fb5b3] text-xs">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Email / password form */}
          <form onSubmit={handleEmailAuth} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0b1f1e] border border-white/10 text-[#eef2f1] placeholder-[#8fb5b3] text-sm focus:outline-none focus:border-[#2b7a78] transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl bg-[#0b1f1e] border border-white/10 text-[#eef2f1] placeholder-[#8fb5b3] text-sm focus:outline-none focus:border-[#2b7a78] transition-colors"
            />
            <button
              type="submit"
              disabled={emailLoading || googleLoading}
              className="w-full py-3 rounded-xl bg-[#2b7a78] text-white font-semibold text-sm hover:bg-[#1d5c5a] transition-all duration-200 active:scale-95 disabled:opacity-60"
            >
              {emailLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
              ) : mode === "signup" ? "Create account" : "Sign in"}
            </button>
          </form>

          {error && (
            <p className="mt-4 text-[#F87171] text-xs text-center">{error}</p>
          )}
          {success && (
            <p className="mt-4 text-[#4ADE80] text-xs text-center">{success}</p>
          )}

          <p className="mt-6 text-[#8fb5b3] text-xs text-center leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        <div className="text-center mt-6 space-y-3">
          <Link
            href="/session"
            className="block w-full py-3 rounded-xl border border-white/10 text-[#8fb5b3] text-sm font-semibold hover:border-white/20 hover:text-[#eef2f1] transition-all"
          >
            Try a session without account →
          </Link>
          <p className="text-[#8fb5b3]/60 text-xs">
            Your progress won't be saved
          </p>
          <Link href="/" className="block text-[#8fb5b3] text-sm hover:text-[#eef2f1] transition-colors underline underline-offset-2">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}
