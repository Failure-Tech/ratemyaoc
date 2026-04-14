"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const Navbar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { label: "Home",      path: "/" },
        { label: "About",     path: "/about" },
        { label: "Rate",      path: "/rate" },
        { label: "Search",    path: "/search" },
        { label: "Catalog",   path: "" },
        { label: "Scheduler", path: "" },
        { label: "Login",     path: "/login" },
    ];

    const navigate = (path: string) => {
        router.push(path);
        setMenuOpen(false);
    };

    return (
        <nav
        // border-b border-white/8
            className="fixed top-0 left-0 w-full z-50"
            // style={{ backgroundColor: "rgb(28, 48, 89)" }}
            
        >
            {/* Maroon top accent */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#8B1A1A]" />

            <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">

                {/* Wordmark */}
                <span
                    onClick={() => navigate("/")}
                    className="text-white font-black text-base tracking-tight cursor-pointer select-none"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    RMA<span className="text-[#8B1A1A]">.</span>
                </span>

                {/* Desktop links */}
                <ul className="hidden sm:flex items-center gap-1">
                    {links.map((link) => {
                        const active = pathname === link.path;
                        return (
                            <li
                                key={link.label}
                                onClick={() => navigate(link.path)}
                                className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide cursor-pointer transition-all duration-150 ${
                                    active
                                        ? "text-white bg-white/10"
                                        : "text-white/50 hover:text-white hover:bg-white/6"
                                }`}
                            >
                                {link.label}
                            </li>
                        );
                    })}
                </ul>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="sm:hidden flex flex-col gap-[5px] justify-center items-center w-8 h-8 cursor-pointer"
                    aria-label="Toggle menu"
                >
                    <span className={`block w-5 h-[2px] bg-white/60 rounded transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                    <span className={`block w-5 h-[2px] bg-white/60 rounded transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block w-5 h-[2px] bg-white/60 rounded transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="sm:hidden border-t border-white/8 px-4 py-3 flex flex-col gap-1">
                    {links.map((link) => {
                        const active = pathname === link.path;
                        return (
                            <div
                                key={link.label}
                                onClick={() => navigate(link.path)}
                                className={`px-3 py-2.5 rounded text-sm font-semibold cursor-pointer transition-all duration-150 ${
                                    active
                                        ? "text-white bg-white/10"
                                        : "text-white/50 hover:text-white hover:bg-white/6"
                                }`}
                            >
                                {link.label}
                            </div>
                        );
                    })}
                </div>
            )}
        </nav>
    );
};

export default Navbar;