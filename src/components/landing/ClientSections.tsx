"use client";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/layout/Header"), { ssr: false });
const VideoSection = dynamic(() => import("@/components/landing/VideoSection"), { ssr: false });

export { Header, VideoSection };
