"use client";

import { removeSession } from "@/actions/authAction";
import { signOutWithGoogle } from "@/utils/firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";

const Logout: React.FC = () => {
    const router = useRouter();
    const handleGoogleSignOut = async () => {
        try {
            await signOutWithGoogle();
            await removeSession(); 
            alert("Successfully Logged Out!");
            router.push("/");
        }
        catch (error) {
            console.log("Error: ", error);
            alert("Likely not logged in to log out");
        }        
    }

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-4"
            style={{ backgroundColor: "rgb(28, 48, 89)" }}
        >
            <div className="fixed top-0 left-0 w-full h-1 bg-[#8B1A1A]" />

            <div className="w-full max-w-sm flex flex-col items-center gap-7 text-center">

                <div className="flex flex-col items-center gap-3">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#8B1A1A] font-semibold">
                        AOC Student Portal
                    </p>
                    <h1
                        className="text-3xl font-black text-white"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        Sign Out
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="h-px w-10 bg-[#8B1A1A]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A]" />
                        <div className="h-px w-10 bg-[#8B1A1A]" />
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed">
                        You will be returned to the home page.
                    </p>
                </div>

                <div className="bg-white/[0.04] border border-white/8 rounded-xl p-6 w-full flex flex-col gap-4">
                    <p className="text-white/50 text-sm">
                        Are you sure you want to sign out of your account?
                    </p>
                    <button
                        onClick={() => handleGoogleSignOut()}
                        className="w-full py-2.5 rounded text-sm font-bold text-white transition-all duration-150 hover:brightness-110 active:scale-95 cursor-pointer"
                        style={{ backgroundColor: "#8B1A1A" }}
                    >
                        Sign Out
                    </button>
                    <button
                        onClick={() => router.back()}
                        className="w-full py-2.5 rounded text-sm font-semibold text-white/50 border border-white/10 hover:border-white/30 hover:text-white transition-all duration-150 active:scale-95 cursor-pointer"
                    >
                        Go Back
                    </button>
                </div>
            </div>

            <p
                className="fixed bottom-6 text-white/20 text-xs tracking-widest uppercase"
                style={{ fontFamily: "monospace" }}
            >
                AOC Student Portal
            </p>
        </div>
    )
}

export default Logout;