// Centralized auth helpers used by API layer and others

const STORAGE_KEY = "token";

export function getToken(): string | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function getTokenType(): string {
  return "Bearer";
}

export function logout(): void {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // ignore
  }

  // Notify current tab listeners (AuthContext) about logout
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new Event("auth:logout"));
    } catch {
      // ignore
    }
  }
}

export default {
  getToken,
  getTokenType,
  logout,
};
