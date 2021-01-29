import React, {
  useState, useEffect, useContext, createContext,
} from 'react';
import nookies from 'nookies';
import { firebaseClient } from './firebaseClient';

const AuthContext = createContext({
  user: null,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => firebaseClient.auth().onIdTokenChanged(async (user1) => {
    console.log('token changed!');
    if (!user1) {
      setUser(null);
      nookies.set(undefined, 'token', '', {});
      return;
    }

    const token = await user1.getIdToken();
    setUser(user1);
    nookies.set(undefined, 'token', token, {});
  }), []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user2 = firebaseClient.auth().currentUser;
      if (user2) await user2.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
