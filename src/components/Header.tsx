import { Search } from 'lucide-react';

interface HeaderProps {
  currentType?: 'material' | 'question' | 'studyset';
  onTypeChange: (type?: 'material' | 'question' | 'studyset') => void;
  onSearchClick: () => void;
  searchValue?: string;
}

export default function Header({ currentType, onTypeChange, onSearchClick, searchValue }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 safe-area-top">
      {/* 搜索栏 - 知乎风格 */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div
          onClick={onSearchClick}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full cursor-pointer touch-manipulation"
        >
          <Search size={18} className="text-gray-400" />
          <span className="text-sm text-gray-400 flex-1">
            {searchValue || (currentType === 'studyset' ? '搜索学习集，同步给孩子...' : '搜索资料、问题...')}
          </span>
        </div>
      </div>

      {/* Tab 切换 - 知乎风格 */}
      <div className="flex items-center border-b border-gray-100 px-4">
        <button
          onClick={() => onTypeChange('material')}
          className={`px-4 py-3 text-base font-medium transition-colors touch-manipulation relative ${
            currentType === 'material'
              ? 'text-pink-500'
              : 'text-gray-600'
          }`}
        >
          资料
          {currentType === 'material' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500"></span>
          )}
        </button>
        <button
          onClick={() => onTypeChange('question')}
          className={`px-4 py-3 text-base font-medium transition-colors touch-manipulation relative ${
            currentType === 'question'
              ? 'text-blue-500'
              : 'text-gray-600'
          }`}
        >
          问答
          {currentType === 'question' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></span>
          )}
        </button>
        <button
          onClick={() => onTypeChange('studyset')}
          className={`px-4 py-3 text-base font-medium transition-colors touch-manipulation relative ${
            currentType === 'studyset'
              ? 'text-purple-500'
              : 'text-gray-600'
          }`}
        >
          学习集
          {currentType === 'studyset' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></span>
          )}
        </button>
      </div>
    </header>
  );
}
