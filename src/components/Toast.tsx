import React from 'react';

interface ToastProps {
  message: string;
  show: boolean;
  type?: 'success' | 'info' | 'warning';
}

export const Toast: React.FC<ToastProps> = ({ message, show, type = 'success' }) => {
  if (!show) return null;

  const bgColors = {
    success: 'bg-emerald-600 text-white',
    info: 'bg-stone-800 text-white',
    warning: 'bg-amber-600 text-white',
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-bounce duration-200">
      <div className={`px-5 py-2.5 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 ${bgColors[type]}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
