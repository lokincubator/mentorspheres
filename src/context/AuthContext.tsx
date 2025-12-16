// src/context/AuthContext.tsx
import React from "react";
import { auth } from "../firebase";
import {
  onIdTokenChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  Unsubscribe,
} from "firebase/auth";

export type AuthUser = {
  id?: string;
  email?: string | null;
  name?: string | null;
};

type AuthContextValue = {
  token: string | null; // Firebase ID token
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (input: { email: string; password: string }) => Promise<void>;
  signup: (input: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let unsub: Unsubscribe | undefined;
    setLoading(true);
    unsub = onIdTokenChanged(auth, async (fbUser) => {
      if (!fbUser) {
        setUser(null);
        setToken(null);
        setLoading(false);
        return;
      }
      const idToken = await fbUser.getIdToken();
      setToken(idToken);
      setUser({ id: fbUser.uid, email: fbUser.email, name: fbUser.displayName });
      setLoading(false);
    });
    return () => {
      if (unsub) unsub();
    };
  }, []);

  const login = React.useCallback<AuthContextValue["login"]>(async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password);
    // onIdTokenChanged listener will populate state
  }, []);

  const signup = React.useCallback<AuthContextValue["signup"]>(
    async ({ name, email, password }) => {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      // listener updates state
    },
    []
  );

  const logout = React.useCallback<AuthContextValue["logout"]>(async () => {
    await signOut(auth);
  }, []);

  const value: AuthContextValue = React.useMemo(
    () => ({
      token,
      user,
      isAuthenticated: !!user,
      loading,
      login,
      signup,
      logout,
    }),
    [token, user, loading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
