/**
 * Home Header - 严格按 Figma 设计稿还原
 * 包含设备切换栏和 Tab 栏
 */

interface HomeHeaderProps {
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  activeTab?: 'recommended' | 'studyset';
  onTabChange?: (tab: 'recommended' | 'studyset') => void;
}

// 学习机图标
const DeviceSwitchIcon = () => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4.5" y="4.5" width="18" height="13.5" rx="1.5" stroke="white" strokeWidth="1.5" />
    <path d="M9 22.5H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13.5 18V22.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 展开箭头图标
const ExpandIcon = () => (
  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 1L4 4L7 1"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 搜索图标
const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10.5" cy="10.5" r="7" stroke="white" strokeWidth="2" />
    <path d="M15.5 15.5L21 21" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 更多选项图标（三个点）
// 更多菜单图标（三条横线：上长中短下更短）
const MoreOptionsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="2" rx="1" fill="white" />
    <rect x="3" y="11" width="12" height="2" rx="1" fill="white" />
    <rect x="3" y="16" width="8" height="2" rx="1" fill="white" />
  </svg>
);

// 筛选图标
// 设计稿为漏斗筛选 icon
const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.5 4.16667H17.5L11.6667 10.8333V15.8333L8.33333 13.3333V10.8333L2.5 4.16667Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HomeHeader({ onSearchClick, onFilterClick, activeTab = 'recommended', onTabChange }: HomeHeaderProps) {
  return (
    <div className="relative w-[375px]">
      {/* 设备切换栏 - 44px 高度 */}
      <div className="relative h-[44px] w-[375px]">
        {/* 设备切换图标和名称 */}
        <div className="absolute left-[16px] top-[4px] flex items-center gap-0">
          {/* 设备图标容器 */}
          <div className="w-[36px] h-[36px] flex items-center justify-center">
            <DeviceSwitchIcon />
          </div>
          
          {/* 设备名称 */}
          <p
            className="text-[16px] font-medium leading-[24px] text-white ml-[4px]"
            style={{ fontFamily: 'PingFang SC, sans-serif' }}
          >
            甜豆甜豆的学习机
          </p>
          
          {/* 展开箭头 */}
          <div className="w-[16px] h-[16px] flex items-center justify-center ml-[4px]">
            <ExpandIcon />
          </div>
        </div>

        {/* 右侧图标 */}
        <div className="absolute right-[16px] top-[10px] flex items-center gap-[8px]">
          {/* 搜索图标 */}
          <button
            onClick={onSearchClick}
            className="w-[24px] h-[24px] flex items-center justify-center touch-manipulation"
          >
            <SearchIcon />
          </button>
          
          {/* 更多选项图标 */}
          <button className="w-[24px] h-[24px] flex items-center justify-center touch-manipulation relative">
            <MoreOptionsIcon />
            {/* 红点 */}
            <div className="absolute top-0 right-0 w-[6px] h-[6px] bg-[#FB2628] rounded-full" />
          </button>
        </div>
      </div>

      {/* Tab 栏 - 44px 高度 */}
      <div className="relative h-[44px] w-[375px] flex items-center px-[16px]">
        <div className="flex items-center gap-[24px]">
          {/* 推荐 */}
          <button 
            onClick={() => onTabChange?.('recommended')}
            className="relative flex flex-col items-center pt-[8px] pb-[6px] transition-all"
          >
            <p
              className={`text-[16px] leading-[24px] text-left transition-all ${
                activeTab === 'recommended' ? 'font-semibold text-white' : 'font-normal text-white/70'
              }`}
              style={{ fontFamily: 'PingFang SC, sans-serif' }}
            >
              推荐
            </p>
            {activeTab === 'recommended' && (
              <div className="absolute bottom-0 w-[24px] h-[2px] bg-white rounded-full" />
            )}
          </button>

          {/* 学习集 */}
          <button 
            onClick={() => onTabChange?.('studyset')}
            className="relative flex flex-col items-center pt-[8px] pb-[6px] transition-all"
          >
            <p
              className={`text-[16px] leading-[24px] text-left transition-all ${
                activeTab === 'studyset' ? 'font-semibold text-white' : 'font-normal text-white/70'
              }`}
              style={{ fontFamily: 'PingFang SC, sans-serif' }}
            >
              学习集
            </p>
            {activeTab === 'studyset' && (
              <div className="absolute bottom-0 w-[24px] h-[2px] bg-white rounded-full" />
            )}
          </button>
        </div>

        {/* 筛选图标 - 右侧 */}
        <button
          onClick={onFilterClick}
          className="absolute right-[16px] w-[20px] h-[20px] flex items-center justify-center touch-manipulation"
        >
          <FilterIcon />
        </button>
      </div>
    </div>
  );
}

