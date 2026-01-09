import { ChevronDown } from 'lucide-react';
import StatusBar from './StatusBar';

interface PlazaHeaderProps {
  currentTab?: 'plaza' | 'material' | 'qa' | 'studyset' | 'teacher';
  currentSubTab?: 'follow' | 'all' | 'hot';
  onTabChange?: (tab: 'plaza' | 'material' | 'qa' | 'studyset' | 'teacher') => void;
  onSubTabChange?: (tab: 'follow' | 'all' | 'hot') => void;
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  onProfileClick?: () => void;
  showSubNav?: boolean;
  selectedGrade?: string;
  selectedSubject?: string;
}

export default function PlazaHeader({
  currentTab = 'plaza',
  currentSubTab: _currentSubTab = 'all',
  onTabChange: _onTabChange,
  onSubTabChange: _onSubTabChange,
  onSearchClick,
  onFilterClick,
  onProfileClick,
  showSubNav = true,
  selectedGrade: _selectedGrade = '全部',
  selectedSubject: _selectedSubject = '全部',
}: PlazaHeaderProps) {
  return (
    <header className="sticky top-0 z-40">
      {/* 状态栏 - 透明背景白色图标 */}
      <StatusBar variant="light" />

      {/* 设备名称栏 */}
      <div className="relative h-[44px] flex items-center justify-between px-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* 设备图标 */}
          <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
            <svg width="27" height="18" viewBox="0 0 27 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.75" y="0.75" width="25.5" height="16.5" rx="2.25" stroke="white" strokeWidth="1.5"/>
              <rect x="3" y="3" width="21" height="12" rx="1" fill="white" fillOpacity="0.3"/>
              <path d="M10.5 9L13.5 6.5V11.5L10.5 9Z" fill="white"/>
            </svg>
          </div>
          
          {/* 设备名称和下拉箭头 */}
          <div className="flex items-center gap-1 flex-1 min-w-0">
            <span className="text-base font-medium text-white truncate" style={{ fontFamily: 'PingFang SC, sans-serif' }}>
              甜豆甜豆的学习机
            </span>
            <ChevronDown size={16} className="text-white flex-shrink-0" strokeWidth={2} />
          </div>
        </div>
        
        {/* 右侧按钮 */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* 搜索图标 */}
          <button
            onClick={onSearchClick}
            className="touch-manipulation p-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10.5" cy="10.5" r="6.5" stroke="white" strokeWidth="2"/>
              <path d="M15.5 15.5L20 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          
          {/* 更多菜单图标 */}
          <button
            onClick={onProfileClick}
            className="touch-manipulation p-1 relative"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="2" rx="1" fill="white" />
              <rect x="3" y="11" width="12" height="2" rx="1" fill="white" />
              <rect x="3" y="16" width="8" height="2" rx="1" fill="white" />
            </svg>
            {/* 红点 */}
            <div className="absolute top-0 right-0 w-[6px] h-[6px] bg-[#FB2628] rounded-full" />
          </button>
        </div>
      </div>

      {/* 二级导航栏 - 推荐标签 */}
      {showSubNav && currentTab === 'plaza' && (
        <div className="relative h-[44px] px-4">
          {/* 推荐 Tab：按设计稿 pt=8 / pb=6 / gap=6 */}
          <button className="h-full flex flex-col items-start gap-[6px] pt-[8px] pb-[6px] touch-manipulation">
            <span
              className="text-[16px] font-medium leading-[24px] text-white text-left"
              style={{ fontFamily: 'PingFang SC, sans-serif' }}
            >
              推荐
            </span>
            <div className="w-[24px] h-[2px] bg-white rounded-full" />
          </button>

          {/* 右侧筛选（漏斗）ICON：按设计稿 right=16 / top=10 / size≈16.67 */}
          <button
            onClick={onFilterClick}
            className="absolute right-4 top-[10px] w-[20px] h-[20px] flex items-center justify-center touch-manipulation"
            aria-label="筛选"
          >
            <svg width="16.667" height="16.667" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.5 4.16667H17.5L11.6667 10.8333V15.8333L8.33333 13.3333V10.8333L2.5 4.16667Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </header>
  );
}
