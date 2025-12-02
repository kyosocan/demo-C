import { X } from 'lucide-react';

interface WriteIdeaPageProps {
  onClose: () => void;
  onNext: (text: string) => void;
}

export default function WriteIdeaPage({ onClose, onNext }: WriteIdeaPageProps) {
  const handleNext = () => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (textarea) {
      onNext(textarea.value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={onClose}
            className="p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <button
            onClick={handleNext}
            className="px-5 py-1.5 bg-pink-500 text-white rounded-full text-sm font-medium hover:bg-pink-600 active:bg-pink-700 transition-colors"
          >
            下一步
          </button>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="px-4 pt-8">
        {/* 输入卡片 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[300px]">
          {/* 引号装饰 */}
          <div className="text-gray-300 text-6xl font-serif leading-none mb-4">
            "
          </div>
          
          {/* 标题 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">写想法</h2>
          
          {/* 输入框 */}
          <textarea
            placeholder="说点什么或提个问题..."
            className="w-full min-h-[200px] text-gray-900 placeholder-gray-400 text-base resize-none outline-none border-none bg-transparent"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}

