interface BottomNavProps {
  currentTab?: 'learn' | 'community' | 'mall' | 'device' | 'love';
  onTabChange?: (tab: 'learn' | 'community' | 'mall' | 'device' | 'love') => void;
}

// 学习图标
const LearnIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M2 3C2 1.89543 2.89543 1 4 1H16C17.1046 1 18 1.89543 18 3V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V3Z" 
      stroke={active ? '#FB2628' : 'rgba(0,0,0,0.6)'} 
      strokeWidth="1.5"
      fill="none"
    />
    <path 
      d="M6 5H14M6 9H14M6 13H10" 
      stroke={active ? '#FB2628' : 'rgba(0,0,0,0.6)'} 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
);

// 表达爱图标
const LoveIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M10 4.5C10 4.5 8 1 4.5 1C2 1 1 3 1 5C1 9 10 16 10 16C10 16 19 9 19 5C19 3 18 1 15.5 1C12 1 10 4.5 10 4.5Z" 
      stroke={active ? '#FB2628' : 'rgba(0,0,0,0.6)'} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill={active ? '#FB2628' : 'none'}
    />
  </svg>
);

// 社区图标 - 圆形带对话框
const CommunityIcon = ({ active }: { active: boolean }) => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle 
      cx="10.5" 
      cy="10.5" 
      r="9" 
      stroke={active ? '#FB2628' : 'rgba(0,0,0,0.6)'} 
      strokeWidth="1.5"
      fill={active ? '#FB2628' : 'none'}
    />
    {/* 内部图形：按设计稿更接近“纸飞机/箭头”形态（社区激活态为白色） */}
    <path
      d="M8.2 7.6L14.2 10.5L8.2 13.4V7.6Z"
      fill={active ? 'white' : 'rgba(0,0,0,0.6)'}
    />
  </svg>
);

// 商城图标
const MallIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M3 6H17L16 17H4L3 6Z" 
      stroke={active ? '#FB2628' : 'rgba(0,0,0,0.6)'} 
      strokeWidth="1.5" 
      strokeLinejoin="round"
      fill="none"
    />
    <path 
      d="M7 6V4C7 2.89543 7.89543 2 9 2H11C12.1046 2 13 2.89543 13 4V6" 
      stroke={active ? '#FB2628' : 'rgba(0,0,0,0.6)'} 
      strokeWidth="1.5"
    />
  </svg>
);

// 设备图标
const DeviceIcon = ({ active }: { active: boolean }) => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect 
      x="1" 
      y="1" 
      width="16" 
      height="18" 
      rx="2" 
      stroke={active ? '#FB2628' : 'rgba(0,0,0,0.6)'} 
      strokeWidth="1.5"
      fill="none"
    />
    <circle 
      cx="9" 
      cy="16" 
      r="1.5" 
      fill={active ? '#FB2628' : 'rgba(0,0,0,0.6)'}
    />
    <path 
      d="M5 3H13" 
      stroke={active ? '#FB2628' : 'rgba(0,0,0,0.6)'} 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
);

export default function BottomNav({ currentTab = 'community', onTabChange }: BottomNavProps) {
  const navItems = [
    { id: 'learn' as const, label: '学习', Icon: LearnIcon },
    { id: 'love' as const, label: '表达爱', Icon: LoveIcon },
    { id: 'community' as const, label: '社区', Icon: CommunityIcon },
    { id: 'mall' as const, label: '商城', Icon: MallIcon },
    { id: 'device' as const, label: '设备', Icon: DeviceIcon },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-[480px] mx-auto">
        {/* 毛玻璃背景 */}
        <div 
          className="backdrop-blur-[25px] bg-[rgba(255,248,248,0.66)]"
          style={{ 
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)'
          }}
        >
          {/* 导航项 */}
          <div className="flex items-center justify-around h-[62px] px-0">
            {navItems.map((item) => {
              const { Icon } = item;
              const isActive = currentTab === item.id;
              const isCommunity = item.id === 'community';
              
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange?.(item.id)}
                  className="flex flex-col items-center justify-center gap-1 h-full touch-manipulation min-w-[75px]"
                >
                  <div className="w-8 h-8 flex items-center justify-center relative">
                    <Icon active={isActive} />
                    {/* 资料上新红点提醒 */}
                    {isCommunity && !isActive && (
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FB2628] rounded-full border border-white z-10" />
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-normal leading-[normal] ${
                      isActive ? 'text-[#FB2628]' : 'text-[rgba(0,0,0,0.6)]'
                    }`}
                    style={{ fontFamily: 'PingFang SC, sans-serif' }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* 底部安全区指示条 */}
          <div className="pb-2 flex justify-center">
            <div className="h-[5px] bg-black rounded-[100px]" style={{ width: '134px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
