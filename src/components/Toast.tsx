import { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  duration?: number;
  onClose: () => void;
}

export default function Toast({
  message,
  isVisible,
  duration = 1000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none">
      <div className="bg-black/70 text-white px-6 py-3 rounded-lg text-sm max-w-[80%] text-center">
        {message}
      </div>
    </div>
  );
}









