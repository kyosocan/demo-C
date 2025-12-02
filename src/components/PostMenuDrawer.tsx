import { Edit, Share2, Trash2 } from 'lucide-react';

interface PostMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onShare: () => void;
  onDelete: () => void;
}

export default function PostMenuDrawer({
  isOpen,
  onClose,
  onEdit,
  onShare,
  onDelete,
}: PostMenuDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 bg-black/40 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* 抽屉 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="bg-white rounded-t-3xl shadow-2xl max-w-[480px] mx-auto">
          {/* 选项列表 */}
          <div className="py-2">
            <button
              onClick={() => {
                onEdit();
                onClose();
              }}
              className="w-full px-6 py-4 text-left text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors flex items-center gap-3"
            >
              <Edit size={20} className="text-gray-600" />
              <span className="text-base">编辑</span>
            </button>
            
            <button
              onClick={() => {
                onShare();
                onClose();
              }}
              className="w-full px-6 py-4 text-left text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors flex items-center gap-3"
            >
              <Share2 size={20} className="text-gray-600" />
              <span className="text-base">分享</span>
            </button>
            
            <button
              onClick={() => {
                onDelete();
                onClose();
              }}
              className="w-full px-6 py-4 text-left text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors flex items-center gap-3"
            >
              <Trash2 size={20} className="text-red-600" />
              <span className="text-base">删除</span>
            </button>
          </div>
          
          {/* 取消按钮 */}
          <div className="border-t border-gray-200 pt-2 pb-safe">
            <button
              onClick={onClose}
              className="w-full px-6 py-4 text-center text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <span className="text-base font-medium">取消</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

