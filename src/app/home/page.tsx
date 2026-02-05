"use client";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

const Home = () => {
    const auth = getAuth();
    const [name, setName] = useState<string | null>("");
    const getUser = () => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            const displayName = user.displayName;
            setName(displayName);
            console.log(displayName);
            return (
                <>
                    <p>UID: {uid}</p>
                    <p>display name: {displayName}</p>
                </>
            )
        }
    })}
    return (
        <>
            <button onClick={() => getUser()}>click me</button>
            <p>{name}</p>
        </>
    )
}

export default Home;