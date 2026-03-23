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
        <>
            <header>
                <button 
                    onClick={() => {
                        handleGoogleSignIn()
                    }}
                    className="hover:cursor-pointer mr-10 text-2xl"
                >
                    <FaGoogle className="mr-0 text-center align-center justify-center"/>
                    Sign In With Google
                </button>
            </header>
            <header>
                <input
                    type="email" 
                    placeholder="Enter your email to login" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=""
                    >
                </input>
                <input
                    type="password"
                    placeholder="Enter your password to login"
                    value={password}
                    onChange={((e) => setPassword(e.target.value))}
                >
                
                </input>
                <button 
                    onClick={() => {
                        handleEmailAndPasswordSignIn(email, password)
                    }}
                    className="hover:cursor-pointer"
                >Sign in with email & password</button>
            </header>
        </>
    )
}

export default Header;