"use client";

import { useState } from "react";

function VideoCard({ id }: { id: string }) {
  const [started, setStarted] = useState(false);

  return (
    <div className="relative w-[260px] sm:w-[300px]">
      <div className="rounded-[2rem] overflow-hidden border-4 border-[#0b1f1e] shadow-2xl shadow-[#0b1f1e]/20 bg-black">
        <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
          {started ? (
            <>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&autoplay=1&controls=1`}
                title="Visualization and high-stakes performance"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute inset-0 z-10 pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-10 z-20" style={{ pointerEvents: "all" }} />
            </>
          ) : (
            <button
              onClick={() => setStarted(true)}
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#0b1f1e] group"
            >
              <img
                src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="relative z-10 w-16 h-16 rounded-full bg-[#2b7a78] flex items-center justify-center shadow-lg group-hover:bg-[#1d5c5a] group-hover:scale-110 transition-all duration-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="relative z-10 mt-3 text-white text-sm font-semibold">Watch now</p>
            </button>
          )}
        </div>
      </div>
      <div className="absolute -inset-6 bg-[#2b7a78]/10 rounded-3xl blur-2xl -z-10" />
    </div>
  );
}

function ClipCard({ id, start, end }: { id: string; start: number; end: number }) {
  const [started, setStarted] = useState(false);

  return (
    <div className="relative w-[260px] sm:w-[300px]">
      <div className="rounded-[2rem] overflow-hidden border-4 border-[#0b1f1e] shadow-2xl shadow-[#0b1f1e]/20 bg-black">
        <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
          {started ? (
            <>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&autoplay=1&controls=1&start=${start}&end=${end}`}
                title="Visualization clip"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute inset-0 z-10 pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-10 z-20" style={{ pointerEvents: "all" }} />
            </>
          ) : (
            <button
              onClick={() => setStarted(true)}
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#0b1f1e] group"
            >
              <img
                src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="relative z-10 w-16 h-16 rounded-full bg-[#2b7a78] flex items-center justify-center shadow-lg group-hover:bg-[#1d5c5a] group-hover:scale-110 transition-all duration-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="relative z-10 mt-3 text-white text-sm font-semibold">Watch now</p>
            </button>
          )}
        </div>
      </div>
      <div className="absolute -inset-6 bg-[#2b7a78]/10 rounded-3xl blur-2xl -z-10" />
    </div>
  );
}

function InstagramCard({ shortcode }: { shortcode: string }) {
  return (
    <div className="relative w-[260px] sm:w-[300px]">
      <div className="rounded-[2rem] overflow-hidden border-4 border-[#0b1f1e] shadow-2xl shadow-[#0b1f1e]/20 bg-black">
        <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
          <iframe
            src={`https://www.instagram.com/reel/${shortcode}/embed/`}
            title="Breaking the paper wall"
            allowFullScreen
            scrolling="no"
            className="absolute inset-0 w-full h-full border-0"
          />
          {/* Block Instagram external links */}
          <div className="absolute bottom-0 left-0 right-0 h-12 z-20 pointer-events-none" />
        </div>
      </div>
      <div className="absolute -inset-6 bg-[#2b7a78]/10 rounded-3xl blur-2xl -z-10" />
    </div>
  );
}

export default function VideoSection() {
  return (
    <section className="py-24 px-6 bg-[#e4f2f0]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#2b7a78] text-sm font-semibold tracking-widest uppercase mb-3">
            The science behind it
          </p>
          <h2 className="text-4xl font-bold text-[#0b1f1e] mb-4">
            Why experts swear by visualization
          </h2>
          <p className="text-[#29403e] max-w-xl mx-auto">
            Sports psychologists have used mental rehearsal with Olympic athletes for decades.
            Here's exactly how it rewires your brain for high-stakes performance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 flex-wrap">
          <ClipCard id="hIwW0CwHWss" start={252} end={394} />
          <VideoCard id="9KCJJAU693g" />
          <VideoCard id="SALKhwHf7bw" />
        </div>
      </div>
    </section>
  );
}
