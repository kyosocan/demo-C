import { Bell } from 'lucide-react';

interface MessageBubbleProps {
  messageCount: number;
  onClose: () => void;
  onClick: () => void;
}

export default function MessageBubble({ messageCount, onClose, onClick }: MessageBubbleProps) {
  // 限制消息数量最多显示99
  const displayCount = Math.min(messageCount, 99);

  return (
    <div className="flex justify-center animate-slide-down">
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full shadow-lg border border-gray-200 active:bg-gray-50 transition-colors touch-manipulation relative z-50"
        style={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div className="relative">
          <Bell size={18} className="text-[#FB2628]" />
          {displayCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FB2628] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
              {displayCount > 99 ? '99+' : displayCount}
            </span>
          )}
        </div>
        <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
          你收到了 {displayCount} 条消息
        </span>
      </button>
    </div>
  );
}

