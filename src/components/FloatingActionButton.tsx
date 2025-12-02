import { useState, useEffect, useRef } from 'react';
import { Plus, X, FileText, MessageCircle, BookOpen } from 'lucide-react';

interface FloatingActionButtonProps {
  onQuestionClick: () => void;
  onCreateMaterialClick: () => void;
  onCreateStudySetClick?: () => void;
  showCreateMaterial?: boolean;
  showCreateStudySet?: boolean;
}

export default function FloatingActionButton({
  onQuestionClick,
  onCreateMaterialClick,
  onCreateStudySetClick,
  showCreateMaterial = false,
  showCreateStudySet = false,
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // 尝试从滚动容器获取滚动位置，如果没有则使用window
      const scrollContainer = document.getElementById('plaza-scroll-container');
      const currentScrollY = scrollContainer 
        ? scrollContainer.scrollTop 
        : (window.scrollY || document.documentElement.scrollTop);
      
      // 向下滚动时隐藏，向上滚动时显示
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    // 监听滚动事件 - 同时监听容器和window
    const scrollContainer = document.getElementById('plaza-scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <>
      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div 
        className={`fixed bottom-24 right-4 z-40 transition-transform duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        {/* 操作菜单 */}
        {isOpen && (
          <div className="mb-3 space-y-3">
            {showCreateMaterial && (
              <div className="flex items-center justify-end gap-2 animate-fade-in">
                <span className="text-xs text-gray-700 bg-white px-2.5 py-1 rounded shadow-md whitespace-nowrap">
                  创建资料包
                </span>
                <button
                  onClick={() => handleAction(onCreateMaterialClick)}
                  className="w-12 h-12 rounded-full bg-pink-500 text-white shadow-lg flex items-center justify-center active:bg-pink-600 transition-all touch-manipulation"
                >
                  <FileText size={20} />
                </button>
              </div>
            )}
            {showCreateStudySet && onCreateStudySetClick && (
              <div className="flex items-center justify-end gap-2 animate-fade-in">
                <span className="text-xs text-gray-700 bg-white px-2.5 py-1 rounded shadow-md whitespace-nowrap">
                  创建学习集
                </span>
                <button
                  onClick={() => handleAction(onCreateStudySetClick)}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg flex items-center justify-center active:opacity-80 transition-all touch-manipulation"
                >
                  <BookOpen size={20} />
                </button>
              </div>
            )}
            <div className="flex items-center justify-end gap-2 animate-fade-in">
              <span className="text-xs text-gray-700 bg-white px-2.5 py-1 rounded shadow-md whitespace-nowrap">
                提问
              </span>
              <button
                onClick={() => handleAction(onQuestionClick)}
                className="w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center active:bg-blue-600 transition-all touch-manipulation"
              >
                <MessageCircle size={20} />
              </button>
            </div>
          </div>
        )}

        {/* 主按钮 */}
        <button
          onClick={toggleMenu}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 touch-manipulation ${
            isOpen
              ? 'bg-gray-500 rotate-45'
              : 'bg-[#FB2628] active:bg-[#E02022] hover:bg-[#E02022]'
          }`}
        >
          {isOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Plus size={24} className="text-white" />
          )}
        </button>
      </div>
    </>
  );
}

