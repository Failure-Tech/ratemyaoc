// "use client";

// import { useUserSession } from "@/app/hooks/useUserSession";
// import { signInWithGoogle, signOutWithGoogle, signInWithEmail } from "@/utils/firebase/auth";
// import { createSession, removeSession } from "@/actions/authAction";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { FaGoogle } from "react-icons/fa";

// const Header = ({session}: { session: string | null }) => {
//     const userSessionId = useUserSession(session);
//     const router = useRouter();

//     const [email, setEmail] = useState<string>("");
//     const [password, setPassword] = useState<string>("");

//     const handleGoogleSignIn = async () => {
//         const userUid = await signInWithGoogle();
//         if (userUid) {
//             await createSession(userUid);
//             router.push("/search");
//         }

//     }

//     const handleGoogleSignOut = async () => {
//         await signOutWithGoogle();
//         await removeSession();
//     }

//     const handleEmailAndPasswordSignIn = async (email: string, password: string) => {
//         const userUid = await signInWithEmail(email, password);

//         if (userUid) {
//             await createSession(userUid);
//             router.push("/search");
//         }
//     }

//     return (
//         <>
//             <header>
//                 <button 
//                     onClick={() => {
//                         handleGoogleSignIn()
//                     }}
//                     className="hover:cursor-pointer mr-10 text-2xl"
//                 >
//                     <FaGoogle className="mr-0 text-center align-center justify-center"/>
//                     Sign In With Google
//                 </button>
//             </header>
//             <header>
//                 <input
//                     type="email" 
//                     placeholder="Enter your email to login" 
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className=""
//                     >
//                 </input>
//                 <input
//                     type="password"
//                     placeholder="Enter your password to login"
//                     value={password}
//                     onChange={((e) => setPassword(e.target.value))}
//                 >
                
//                 </input>
//                 <button 
//                     onClick={() => {
//                         handleEmailAndPasswordSignIn(email, password)
//                     }}
//                     className="hover:cursor-pointer"
//                 >Sign in with email & password</button>
//             </header>
//         </>
//     )
// }

// export default Header;

"use client";

import { useUserSession } from "@/app/hooks/useUserSession";
import { signInWithGoogle, signOutWithGoogle, signInWithEmail } from "@/utils/firebase/auth";
import { createSession, removeSession } from "@/actions/authAction";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const Header = ({session}: { session: string | null }) => {
    const userSessionId = useUserSession(session);
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleGoogleSignIn = async () => {
        const userUid = await signInWithGoogle();
        if (userUid) {
            await createSession(userUid);
            router.push("/search");
        }

    }

    const handleGoogleSignOut = async () => {
        await signOutWithGoogle();
        await removeSession();
    }

    const handleEmailAndPasswordSignIn = async (email: string, password: string) => {
        const userUid = await signInWithEmail(email, password);

        if (userUid) {
            await createSession(userUid);
            router.push("/search");
        }
    }

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-4"
            style={{ backgroundColor: "rgb(28, 48, 89)" }}
        >
            <div className="fixed top-0 left-0 w-full h-1 bg-[#8B1A1A]" />

            <div className="w-full max-w-sm flex flex-col gap-8">

                {/* Heading */}
                <div className="text-center flex flex-col items-center gap-3">
                    <h1
                        className="text-3xl font-black text-white"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        Welcome Back
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="h-px w-10 bg-[#8B1A1A]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A]" />
                        <div className="h-px w-10 bg-[#8B1A1A]" />
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed max-w-xs">
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius.
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white/[0.04] border border-white/8 rounded-xl p-6 flex flex-col gap-5">

                    {/* Google sign in */}
                    <header>
                        <button
                            onClick={() => { handleGoogleSignIn() }}
                            className="hover:cursor-pointer w-full flex items-center justify-center gap-3 py-2.5 rounded border border-white/15 text-sm font-semibold text-white/80 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-150 active:scale-95"
                        >
                            <FaGoogle className="text-base" />
                            Sign in with Google
                        </button>
                    </header>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-white/8" />
                        <span className="text-white/25 text-xs tracking-widest uppercase">or</span>
                        <div className="flex-1 h-px bg-white/8" />
                    </div>

                    {/* Email + password */}
                    <header className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-all duration-150"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-all duration-150"
                        />
                        <button
                            onClick={() => { handleEmailAndPasswordSignIn(email, password) }}
                            className="hover:cursor-pointer w-full py-2.5 rounded text-sm font-bold text-white transition-all duration-150 hover:brightness-110 active:scale-95 mt-1"
                            style={{ backgroundColor: "#8B1A1A" }}
                        >
                            Sign in with Email
                        </button>
                    </header>
                </div>

            </div>
        </div>
    )
}

export default Header;