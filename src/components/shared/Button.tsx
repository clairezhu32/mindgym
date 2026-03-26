"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2b7a78] focus:ring-offset-2 focus:ring-offset-[#0b1f1e] disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#2b7a78] text-[#0b1f1e] hover:bg-[#4a9a97] active:scale-95",
    ghost:
      "bg-transparent text-[#2b7a78] hover:bg-[#2b7a78]/10 active:scale-95",
    outline:
      "border border-[#2b7a78]/40 text-[#eef2f1] hover:border-[#2b7a78] hover:bg-[#2b7a78]/10 active:scale-95",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
