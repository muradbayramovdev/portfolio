"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Toast = { id: number; title: string; tone?: "success" | "error" };

const ToastContext = createContext<{ push: (title: string, tone?: Toast["tone"]) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);

  const push = useCallback((title: string, tone: Toast["tone"] = "success") => {
    const toast = { id: Date.now(), title, tone };
    setItems((current) => [...current, toast]);
    setTimeout(() => {
      setItems((current) => current.filter((item) => item.id !== toast.id));
    }, 2800);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed inset-x-4 bottom-4 z-50 flex flex-col gap-3 sm:left-auto sm:right-4 sm:w-80">
        {items.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border px-4 py-3 text-sm font-medium shadow-lg backdrop-blur ${
              item.tone === "error"
                ? "border-red-500/20 bg-red-500/10 text-red-950"
                : "border-emerald-500/20 bg-emerald-500/10 text-stone-950"
            }`}
          >
            {item.title}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
