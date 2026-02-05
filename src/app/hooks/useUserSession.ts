import { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { type User } from 'firebase/auth';
import { auth } from '@/utils/firebase/firebaseConfig';

export function useUserSession(InitSession: string | null) {
  const [userUid, setUserUid] = useState<string | null>(InitSession);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser: User | null) => {
      if (authUser) {
        setUserUid(authUser.uid);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return userUid;
}