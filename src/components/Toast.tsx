// src/components/Toast.tsx
import React from 'react';
import { Toaster, toast as baseToast, ToastBar } from 'react-hot-toast';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

const Toast: React.FC = () => {
  return <Toaster />;
};

const toast = {
  success: (message: string) => baseToast.success(message),
  error: (message: string) => baseToast.error(message),
  warning: (message: string) => baseToast(message, { icon: '⚠️' }),
  info: (message: string) => baseToast(message, { icon: 'ℹ️' }),
};

export { Toast, toast };
