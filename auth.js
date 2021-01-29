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

  useEffect(() => firebaseClient.auth().onIdTokenChanged(async (user) => {
    console.log('token changed!');
    if (!user) {
      setUser(null);
      nookies.set(undefined, 'token', '', {});
      return;
    }

    const token = await user.getIdToken();
    setUser(user);
    nookies.set(undefined, 'token', token, {});
  }), []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseClient.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
