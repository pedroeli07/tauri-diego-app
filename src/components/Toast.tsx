// src/components/Toast.tsx

import React from "react";
import { toast as baseToast, Toaster } from "react-hot-toast";
import { AlertCircle, CheckCheck, Info, XCircle } from "lucide-react";

// Toast Provider Component
export const ToastProvider: React.FC = () => <Toaster />;

// Custom Toast Object with different types
export const toast = {
  success: (message: string) =>
    baseToast.custom((t) => (
      <div className="flex items-center gap-2 bg-green-600 text-white p-3 rounded-lg shadow-lg">
        <CheckCheck size={20} />
        <span>{message}</span>
      </div>
    )),
  error: (message: string) =>
    baseToast.custom((t) => (
      <div className="flex items-center gap-2 bg-red-600 text-white p-3 rounded-lg shadow-lg">
        <XCircle size={20} />
        <span>{message}</span>
      </div>
    )),
  warning: (message: string) =>
    baseToast.custom((t) => (
      <div className="flex items-center gap-2 bg-[#bb1313] text-white p-3 rounded-lg shadow-lg">
        <AlertCircle size={20} />
        <span>{message}</span>
      </div>
    )),
  info: (message: string) =>
    baseToast.custom((t) => (
      <div className="flex items-center gap-2 bg-blue-500 text-white p-3 rounded-lg shadow-lg">
        <Info size={20} />
        <span>{message}</span>
      </div>
    )),
};
