import { useState, useCallback } from "react";
import type { ToastMessage } from "../components/common/Toast";
// import { ToastMessage } from "../components/common/Toast";

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastMessage = {
      ...toast,
      id,
      duration: toast.duration || 5000,
    };

    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = useCallback(
    (title: string, message?: string, options?: Partial<ToastMessage>) => {
      return addToast({ type: "success", title, message, ...options });
    },
    [addToast]
  );

  const error = useCallback(
    (title: string, message?: string, options?: Partial<ToastMessage>) => {
      return addToast({ type: "error", title, message, ...options });
    },
    [addToast]
  );

  const warning = useCallback(
    (title: string, message?: string, options?: Partial<ToastMessage>) => {
      return addToast({ type: "warning", title, message, ...options });
    },
    [addToast]
  );

  const info = useCallback(
    (title: string, message?: string, options?: Partial<ToastMessage>) => {
      return addToast({ type: "info", title, message, ...options });
    },
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info,
  };
};
