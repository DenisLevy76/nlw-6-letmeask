import { createContext, useEffect, useState } from 'react';
import { auth, firebase } from '../services/firebase';

import React from 'react';

interface User {
  displayName: string;
  uid: string;
  photoURL: string;
}

interface AuthContextProps {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe: firebase.Unsubscribe = auth.onAuthStateChanged(
      (user) => {
        if (user) {
          const { displayName, photoURL, uid } = user;

          if (!displayName || !photoURL) {
            throw new Error('Missing information from Google Account.');
          }

          setUser({
            displayName,
            photoURL,
            uid,
          });
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName) {
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        displayName,
        photoURL: photoURL || '',
        uid,
      });
    }
  }

  async function logout() {
    await auth.signOut();
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
