import { 
    type User,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged as _onAuthStateChanged
} from "firebase/auth";

import { auth } from "@/utils/firebase/firebaseConfig";

const onAuthStateChanged = (callback: (authUser: User | null) => void) => {
    return _onAuthStateChanged(auth, callback);
}

const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);

        if (!result || !result.user) {
            throw new Error("Google sign in with popup failed");
        }

        return result.user.uid;
    }
    catch (error) {
        console.error("SPeciifc error singing in withi google", error);
    }
}

const signOutWithGoogle = async () => {
    try {
        await auth.signOut();
        console.log("SIgned out with google successfully");
    }
    catch (error) {
        console.log("Error signing out with google", error);
    }
}

export {onAuthStateChanged, signInWithGoogle, signOutWithGoogle};