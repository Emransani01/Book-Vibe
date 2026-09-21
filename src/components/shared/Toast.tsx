"use client";

import React, { useEffect, useState } from "react";

type ToastType = "success" | "remove";

interface ToastData {
  message: string;
  type: ToastType;
}

const Toast = () => {
  const [toast, setToast] = useState<ToastData | null>(null);

  useEffect(() => {
    const handleToast = (event: Event) => {
      const customEvent = event as CustomEvent<ToastData>;

      if (!customEvent.detail) {
        return;
      }

      setToast(customEvent.detail);

      setTimeout(() => {
        setToast(null);
      }, 3000);
    };

    window.addEventListener("showToast", handleToast);

    return () => {
      window.removeEventListener("showToast", handleToast);
    };
  }, []);

  if (!toast) {
    return null;
  }

  const isSuccess = toast.type === "success";

  return (
    <div className="fixed right-4 top-24 z-[9999] w-[calc(100%-2rem)] max-w-sm animate-[toastSlideIn_0.35s_ease-out]">
      <div className="flex items-center gap-3 rounded-2xl border border-[#eadfd2] bg-white px-4 py-4 shadow-[0_15px_40px_rgba(217,154,91,0.20)]">
        {/* Icon */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
            isSuccess
              ? "bg-[#f1dfca] text-[#8b5e3c]"
              : "bg-[#f8e7d2] text-[#8b5e3c]"
          }`}
        >
          {isSuccess ? "✓" : "↩"}
        </div>

        {/* Message */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-[#29231e]">
            {isSuccess ? "Success" : "Updated"}
          </p>

          <p className="mt-0.5 text-xs leading-5 text-[#756b63]">
            {toast.message}
          </p>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={() => setToast(null)}
          aria-label="Close notification"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm text-[#756b63] transition hover:bg-[#f8efe3] hover:text-[#6f472d]"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
