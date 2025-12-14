// src/context/ToastContext.tsx
import React from "react";

type ToastVariant = "success" | "error" | "info";

export type ToastInput = {
  title?: string;
  message: string;
  variant?: ToastVariant;
  durationMs?: number;
};

type ToastItem = Required<Pick<ToastInput, "message">> &
  ToastInput & {
    id: string;
    createdAt: number;
  };

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  dismiss: (id: string) => void;
  clear: () => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

function getVariantClasses(variant: ToastVariant) {
  switch (variant) {
    case "success":
      return {
        ring: "ring-1 ring-emerald-200",
        title: "text-emerald-900",
        msg: "text-emerald-900/80",
        dot: "bg-emerald-600",
      };
    case "error":
      return {
        ring: "ring-1 ring-red-200",
        title: "text-red-900",
        msg: "text-red-900/80",
        dot: "bg-red-600",
      };
    case "info":
    default:
      return {
        ring: "ring-1 ring-gray-200",
        title: "text-gray-900",
        msg: "text-gray-700",
        dot: "bg-gray-700",
      };
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clear = React.useCallback(() => {
    setToasts([]);
  }, []);

  const toast = React.useCallback(
    (input: ToastInput) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}_${Math.random().toString(16).slice(2)}`;

      const item: ToastItem = {
        id,
        createdAt: Date.now(),
        title: input.title,
        message: input.message,
        variant: input.variant ?? "info",
        durationMs: input.durationMs ?? 3500,
      };

      setToasts((prev) => [item, ...prev]);

      window.setTimeout(() => {
        dismiss(id);
      }, item.durationMs);
    },
    [dismiss]
  );

  const value = React.useMemo<ToastContextValue>(
    () => ({ toast, dismiss, clear }),
    [toast, dismiss, clear]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="fixed right-4 top-4 z-50 w-[calc(100vw-2rem)] max-w-sm space-y-3">
        {toasts.map((t) => {
          const v = getVariantClasses(t.variant ?? "info");

          return (
            <div
              key={t.id}
              className={[
                "bg-white shadow-lg rounded-lg",
                "px-4 py-3",
                "border border-gray-100",
                v.ring,
              ].join(" ")}
              role="status"
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                <div className={["mt-1 h-2.5 w-2.5 rounded-full", v.dot].join(" ")} />

                <div className="min-w-0 flex-1">
                  {t.title ? (
                    <div className={["text-sm font-semibold", v.title].join(" ")}>
                      {t.title}
                    </div>
                  ) : null}
                  <div className={["text-sm break-words", v.msg].join(" ")}>
                    {t.message}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => dismiss(t.id)}
                  className="ml-2 rounded-md px-2 py-1 text-sm text-gray-500 hover:text-gray-900"
                  aria-label="Dismiss toast"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
