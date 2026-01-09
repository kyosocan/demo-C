import { Frown, AlertTriangle } from 'lucide-react';

interface CardActionPopupProps {
  isOpen: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onDislike: () => void;
  onReport: () => void;
}

export default function CardActionPopup({
  isOpen,
  position,
  onClose,
  onDislike,
  onReport,
}: CardActionPopupProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 z-50"
        onClick={onClose}
      />
      
      {/* 弹出菜单 */}
      <div
        className="fixed z-50 bg-white rounded-xl shadow-lg overflow-hidden"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -100%)',
          minWidth: '120px',
        }}
      >
        <button
          onClick={onDislike}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <Frown size={18} className="text-gray-600" />
          <span className="text-sm text-gray-700">不喜欢</span>
        </button>
        <div className="h-px bg-gray-100" />
        <button
          onClick={onReport}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <AlertTriangle size={18} className="text-gray-600" />
          <span className="text-sm text-gray-700">举报</span>
        </button>
      </div>
    </>
  );
}









