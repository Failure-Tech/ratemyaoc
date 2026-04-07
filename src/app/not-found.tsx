"use client";

import { ROOT_ROUTE } from "@/constants/constants";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound: React.FC = () => {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "rgb(28, 48, 89)" }}
    >
      {/* Top accent bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#8B1A1A]" />

      {/* Card */}
      <div className="w-full max-w-lg text-center">

        {/* 404 ghost + real layered number */}
        <div className="relative mb-2 select-none">
          <span
            className="block text-[10rem] font-black leading-none tracking-tighter"
            style={{
              color: "rgba(255,255,255,0.06)",
              fontFamily: "'Georgia', serif",
            }}
          >
            404
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center text-6xl font-black tracking-tight text-white"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            404
          </span>
        </div>

        {/* Maroon divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-[#8B1A1A]" />
          <div className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
          <div className="h-px w-16 bg-[#8B1A1A]" />
        </div>

        {/* Heading */}
        <h1
          className="text-2xl font-bold text-white mb-3"
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.01em" }}
        >
          Page Not Found
        </h1>

        {/* Subtext */}
        <p className="text-white/60 text-sm leading-relaxed mb-8 font-light">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          <br />
          Head back home to find what you need.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push(ROOT_ROUTE)}
            className="px-6 py-2.5 rounded text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-95 hover:cursor-pointer"
            style={{ backgroundColor: "#8B1A1A" }}
          >
            Go to Home
          </button>
          <button
            onClick={() => router.back()}
            className="px-6 py-2.5 hover:cursor-pointer rounded text-sm font-semibold text-white/70 border border-white/20 hover:border-white/40 hover:text-white transition-all duration-150 active:scale-95"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Footer label */}
      <div
        className="fixed bottom-6 text-white/25 text-xs tracking-widest uppercase"
        style={{ fontFamily: "monospace" }}
      >
        AOC Student Portal
      </div>
    </div>
  );
};

export default NotFound;