/**
 * Home Bottom Navigation - 严格按 Figma 设计稿还原
 * 位置: 从 y=729px 开始
 * 宽度: 375px
 * 每个 Tab 项: 75px 宽
 */

interface HomeBottomNavProps {
  currentTab?: 'learn' | 'love' | 'community' | 'mall' | 'device';
  onTabChange?: (tab: 'learn' | 'love' | 'community' | 'mall' | 'device') => void;
}

// 学习图标
const LearnIcon = ({ active }: { active: boolean }) => (
  <div className="w-[32px] h-[32px] flex items-center justify-center">
    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  </div>
);

// 表达爱图标
const LoveIcon = ({ active }: { active: boolean }) => (
  <div className="w-[32px] h-[32px] flex items-center justify-center">
    <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.5 4.5C10.5 4.5 8.5 1 5 1C2.5 1 1 3 1 5C1 9 10.5 17 10.5 17C10.5 17 20 9 20 5C20 3 18.5 1 16 1C12.5 1 10.5 4.5 10.5 4.5Z"
        stroke={active ? '#FB2628' : 'rgba(0,0,0,0.6)'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? '#FB2628' : 'none'}
      />
      {/* 星星点缀 */}
      <circle cx="6" cy="3" r="0.5" fill={active ? 'white' : 'rgba(0,0,0,0.3)'} />
    </svg>
  </div>
);

// 社区图标 - 圆形带对话框
const CommunityIcon = ({ active }: { active: boolean }) => (
  <div className="w-[32px] h-[32px] flex items-center justify-center overflow-hidden">
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="10.5"
        cy="10.5"
        r="9"
        stroke={active ? '#FB2628' : 'rgba(0,0,0,0.6)'}
        strokeWidth="1.5"
        fill={active ? '#FB2628' : 'none'}
      />
      <path
        d="M7 8.5H14M7 12.5H11"
        stroke={active ? 'white' : 'rgba(0,0,0,0.6)'}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

// 商城图标
const MallIcon = ({ active }: { active: boolean }) => (
  <div className="w-[32px] h-[32px] flex items-center justify-center">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 5H15L14 16H4L3 5Z"
        stroke={active ? '#FB2628' : 'rgba(0,0,0,0.6)'}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M6 5V4C6 2.89543 6.89543 2 8 2H10C11.1046 2 12 2.89543 12 4V5"
        stroke={active ? '#FB2628' : 'rgba(0,0,0,0.6)'}
        strokeWidth="1.5"
      />
    </svg>
  </div>
);

// 设备图标
const DeviceIcon = ({ active }: { active: boolean }) => (
  <div className="w-[32px] h-[32px] flex items-center justify-center">
    <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0.75"
        y="0.75"
        width="15.5"
        height="11.5"
        rx="1.25"
        stroke={active ? '#FB2628' : 'rgba(0,0,0,0.6)'}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M7 9L9 6.5L7 4"
        stroke={active ? '#FB2628' : 'rgba(0,0,0,0.6)'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export default function HomeBottomNav({ currentTab = 'community', onTabChange }: HomeBottomNavProps) {
  const navItems = [
    { id: 'learn' as const, label: '学习', Icon: LearnIcon },
    { id: 'love' as const, label: '表达爱', Icon: LoveIcon },
    { id: 'community' as const, label: '社区', Icon: CommunityIcon },
    { id: 'mall' as const, label: '商城', Icon: MallIcon },
    { id: 'device' as const, label: '设备', Icon: DeviceIcon },
  ];

  return (
    <div className="absolute left-0 bottom-0 w-[375px]">
      {/* 毛玻璃背景 */}
      <div
        className="w-full"
        style={{
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          backgroundColor: 'rgba(255, 248, 248, 0.66)',
        }}
      >
        {/* 导航项容器 */}
        <div className="flex items-center w-[375px]">
          {navItems.map((item) => {
            const { Icon } = item;
            const isActive = currentTab === item.id;
            const isCommunity = item.id === 'community';

            return (
              <button
                key={item.id}
                onClick={() => onTabChange?.(item.id)}
                className="w-[75px] h-[62px] flex items-center justify-center px-[31px] py-[6px] touch-manipulation relative"
              >
                <div className="w-[32px] h-[50px] flex flex-col items-center justify-between">
                  {/* 图标 */}
                  <div className="relative">
                    <Icon active={isActive} />
                    {/* 资料上新红点提醒 */}
                    {isCommunity && !isActive && (
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FB2628] rounded-full border border-white z-10" />
                    )}
                  </div>
                  
                  {/* 文字 */}
                  <p
                    className="text-[10px] font-normal leading-[normal] text-center"
                    style={{
                      fontFamily: 'PingFang SC, sans-serif',
                      color: isActive ? '#FB2628' : 'rgba(0,0,0,0.6)',
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* 底部指示条 */}
        <div className="flex justify-center pb-[8px]">
          <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
        </div>
      </div>
    </div>
  );
}

