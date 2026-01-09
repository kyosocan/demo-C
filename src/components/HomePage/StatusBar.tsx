/**
 * StatusBar - 状态栏组件（HomePage 专用）
 * 显示时间、信号、Wi-Fi、电池等信息
 */

interface StatusBarProps {
  variant?: 'light' | 'dark';
}

export default function StatusBar({ variant = 'light' }: StatusBarProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-black';
  const iconColor = variant === 'light' ? 'text-white' : 'text-black';

  return (
    <div className="absolute top-0 left-0 w-[375px] h-[44px] flex items-center justify-between px-5 relative z-10">
      {/* 左侧时间 */}
      <div className="flex items-center">
        <div className={`text-[15px] font-semibold ${textColor}`} style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
          9:41
        </div>
      </div>

      {/* 右侧状态图标 */}
      <div className="flex items-center gap-1">
        {/* 信号图标 */}
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className={iconColor}>
          <path d="M2 12L5 9M5 9L8 12M5 9V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 8L11 5M11 5L14 8M11 5V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        {/* Wi-Fi图标 */}
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={iconColor}>
          <path d="M7.5 2C10.5 2 13 3.5 13 5.5M7.5 6C8.5 6 9.5 6.5 9.5 7.5M7.5 10C7.8 10 8 10.2 8 10.5C8 10.8 7.8 11 7.5 11C7.2 11 7 10.8 7 10.5C7 10.2 7.2 10 7.5 10Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        {/* 电池图标 */}
        <div className="flex items-center">
          <div className={`relative w-[22px] h-[11px] border ${variant === 'light' ? 'border-white/80' : 'border-black/80'} rounded-[2.5px]`}>
            <div className={`absolute left-[1px] top-[1px] bottom-[1px] right-[3px] ${variant === 'light' ? 'bg-white' : 'bg-black'} rounded-[1px]`} />
          </div>
          <div className={`w-[1.3px] h-[4px] ${variant === 'light' ? 'bg-white/80' : 'bg-black/80'} ml-[0.5px] rounded-r-[1px]`} />
        </div>
      </div>
    </div>
  );
}

