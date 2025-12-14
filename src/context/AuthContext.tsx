// src/context/AuthContext.tsx
import React from "react";
import API from "../utils/apis/ApiBase";

type JwtPayload = {
  sub?: string;
  email?: string;
  name?: string;
  exp?: number; // seconds since epoch
  [key: string]: unknown;
};

export type AuthUser = {
  id?: string;
  email?: string;
  name?: string;
};

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (input: { email: string; password: string }) => Promise<void>;
  signup: (input: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "token";

function decodeJwt(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  const payload = decodeJwt(token);
  if (!payload?.exp) return false; // if no exp, treat as non-expiring (or change to true if you prefer)
  const nowSeconds = Math.floor(Date.now() / 1000);
  return payload.exp <= nowSeconds;
}

function userFromToken(token: string): AuthUser | null {
  const payload = decodeJwt(token);
  if (!payload) return null;
  return {
    id: typeof payload.sub === "string" ? payload.sub : undefined,
    email: typeof payload.email === "string" ? payload.email : undefined,
    name: typeof payload.name === "string" ? payload.name : undefined,
  };
}

type AuthProviderProps = {
  children: React.ReactNode;
  apiBaseUrl?: string; // optional, defaults to REACT_APP_API_BASE_URL
};

export function AuthProvider({ children, apiBaseUrl }: AuthProviderProps) {
  // apiBaseUrl is kept for backward-compatibility but API (axios) baseURL is configured centrally
  const baseUrl = apiBaseUrl ?? process.env.REACT_APP_API_BASE_URL ?? "";

  const [token, setToken] = React.useState<string | null>(() => {
    const t = localStorage.getItem(STORAGE_KEY);
    if (!t) return null;
    if (isTokenExpired(t)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return t;
  });

  const [user, setUser] = React.useState<AuthUser | null>(() => {
    const t = localStorage.getItem(STORAGE_KEY);
    if (!t || isTokenExpired(t)) return null;
    return userFromToken(t);
  });

  // keep auth state in sync across tabs/windows
  React.useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== STORAGE_KEY) return;
      const next = e.newValue;
      if (!next || isTokenExpired(next)) {
        setToken(null);
        setUser(null);
        if (next) localStorage.removeItem(STORAGE_KEY);
        return;
      }
      setToken(next);
      setUser(userFromToken(next));
    }
    window.addEventListener("storage", onStorage);
    // also react to same-tab explicit logout events
    const onAuthLogout = () => {
      setToken(null);
      setUser(null);
    };
    window.addEventListener("auth:logout", onAuthLogout as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth:logout", onAuthLogout as EventListener);
    };
  }, []);

  const logout = React.useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  }, []);

  // optional: auto-logout when exp time hits
  React.useEffect(() => {
    if (!token) return;
    const payload = decodeJwt(token);
    if (!payload?.exp) return;

    const msUntilExpiry = payload.exp * 1000 - Date.now();
    if (msUntilExpiry <= 0) {
      logout();
      return;
    }

    const timer = window.setTimeout(() => logout(), msUntilExpiry);
    return () => window.clearTimeout(timer);
  }, [token, logout]);

  async function authRequest<TBody extends object, TRes>(
    path: string,
    body: TBody
  ): Promise<TRes> {
    try {
      const res = await API.post(path, body);
      return res.data as TRes;
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Request failed";
      throw new Error(message);
    }
  }

  const login: AuthContextValue["login"] = React.useCallback(
    async ({ email, password }) => {
      const data = await authRequest<{ email: string; password: string }, { token: string }>(
        "/auth/login",
        { email, password }
      );

      if (!data.token || isTokenExpired(data.token)) {
        throw new Error("Invalid token received");
      }

      localStorage.setItem(STORAGE_KEY, data.token);
      setToken(data.token);
      setUser(userFromToken(data.token));
    },
    []
  );

  const signup: AuthContextValue["signup"] = React.useCallback(
    async ({ name, email, password }) => {
      const data = await authRequest<
        { name: string; email: string; password: string },
        { token: string }
      >("/auth/signup", { name, email, password });

      if (!data.token || isTokenExpired(data.token)) {
        throw new Error("Invalid token received");
      }

      localStorage.setItem(STORAGE_KEY, data.token);
      setToken(data.token);
      setUser(userFromToken(data.token));
    },
    []
  );

  const value: AuthContextValue = React.useMemo(
    () => ({
      token,
      user,
      isAuthenticated: !!token,
      login,
      signup,
      logout,
    }),
    [token, user, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
