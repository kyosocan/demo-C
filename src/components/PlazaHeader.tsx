import { useState } from 'react';
import { ChevronDown, User, Search } from 'lucide-react';
import StatusBar from './StatusBar';

interface PlazaHeaderProps {
  currentTab?: 'plaza' | 'material' | 'qa' | 'studyset';
  currentSubTab?: 'follow' | 'all' | 'hot';
  onTabChange?: (tab: 'plaza' | 'material' | 'qa' | 'studyset') => void;
  onSubTabChange?: (tab: 'follow' | 'all' | 'hot') => void;
  onSearchClick?: () => void;
  onFilterClick?: () => void; // 新增：筛选按钮点击事件
  onProfileClick?: () => void; // 头像点击事件
  showSubNav?: boolean; // 是否显示二级导航
  selectedGrade?: string; // 已选年级
  selectedSubject?: string; // 已选学科
}

export default function PlazaHeader({
  currentTab = 'plaza',
  currentSubTab: _currentSubTab = 'all',
  onTabChange: _onTabChange,
  onSubTabChange: _onSubTabChange,
  onSearchClick,
  onFilterClick,
  onProfileClick,
  showSubNav = true, // 默认显示二级导航
  selectedGrade: _selectedGrade = '全部',
  selectedSubject: _selectedSubject = '全部',
}: PlazaHeaderProps) {
  const [selectedCategory, setSelectedCategory] = useState('推荐');

  return (
    <header className="bg-white sticky top-0 z-40">
      {/* 状态栏 */}
      <StatusBar />

      {/* 主导航栏 - 社区广场 */}
      <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-100">
        <button
          onClick={onProfileClick}
          className="touch-manipulation p-1"
        >
          <User size={20} className="text-gray-900" />
        </button>
        <span className="text-lg font-semibold text-gray-900">
          社区广场
        </span>
        <button
          onClick={onSearchClick}
          className="touch-manipulation p-1"
        >
          <Search size={20} className="text-gray-900" />
        </button>
      </div>

      {/* 筛选器和分类标签 - 只在广场页面显示 */}
      {showSubNav && currentTab === 'plaza' && (
        <>
          {/* 内容分类标签行 - 添加筛选按钮 */}
          <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              onClick={() => setSelectedCategory('推荐')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors touch-manipulation ${
                selectedCategory === '推荐'
                  ? 'bg-[#FB2628] text-white'
                  : 'bg-white text-[#000000E6]'
              }`}
            >
              推荐
            </button>
            <button
              onClick={() => setSelectedCategory('专项练习题')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors touch-manipulation ${
                selectedCategory === '专项练习题'
                  ? 'bg-[#FB2628] text-white'
                  : 'bg-white text-[#000000E6]'
              }`}
            >
              专项练习题
            </button>
            <button
              onClick={() => setSelectedCategory('真题试卷')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors touch-manipulation ${
                selectedCategory === '真题试卷'
                  ? 'bg-[#FB2628] text-white'
                  : 'bg-white text-[#000000E6]'
              }`}
            >
              真题试卷
            </button>
            <button
              onClick={() => setSelectedCategory('思维导图')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors touch-manipulation ${
                selectedCategory === '思维导图'
                  ? 'bg-[#FB2628] text-white'
                  : 'bg-white text-[#000000E6]'
              }`}
            >
              思维导图
            </button>
            </div>
            <button 
              onClick={onFilterClick}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#000000E6] active:opacity-70 transition-opacity touch-manipulation flex-shrink-0"
            >
              <ChevronDown size={16} />
            </button>
          </div>
        </>
      )}
    </header>
  );
}

