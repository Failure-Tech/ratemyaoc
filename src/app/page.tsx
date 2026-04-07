"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "rgb(28, 48, 89)" }}
    >
      <div className="fixed top-0 left-0 w-full h-1 bg-[#8B1A1A]" />

      <div className="w-full max-w-2xl flex flex-col items-center text-center gap-10">

        {/* Logo / banner image */}
        <div className="w-full overflow-hidden rounded-xl border border-white/8 shadow-2xl shadow-black/40">
          <Image
            src="/aoc_assets/search_bg.jpg"
            alt="AOC campus"
            width={800}
            height={340}
            className="w-full object-cover h-44 sm:h-56 opacity-70"
          />
        </div>

        {/* Wordmark */}
        <div className="flex flex-col items-center gap-3">
          <h1
            className="text-4xl sm:text-5xl font-black text-white leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit 
          </h1>
          <div className="flex items-center gap-3 my-1">
            <div className="h-px w-12 bg-[#8B1A1A]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A]" />
            <div className="h-px w-12 bg-[#8B1A1A]" />
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={() => router.push("/login")}
            className="px-8 py-3 rounded text-sm font-bold text-white transition-all duration-150 hover:brightness-110 active:scale-95 hover:cursor-pointer"
            style={{ backgroundColor: "#8B1A1A" }}
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/about")}
            className="hover:cursor-pointer px-8 py-3 rounded text-sm font-bold text-white/60 border border-white/15 hover:border-white/35 hover:text-white transition-all duration-150 active:scale-95"
          >
            Learn More
          </button>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 text-xs text-white/35">
          {["Professor Ratings", "Course Search", "AOC Students Only", "Schedule Helper"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-white/8 bg-white/3"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;