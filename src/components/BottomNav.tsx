import { Users } from 'lucide-react';

interface BottomNavProps {
  currentTab?: 'learn' | 'community' | 'mall' | 'device';
}

export default function BottomNav({ currentTab = 'community' }: BottomNavProps) {
  // 只保留社区（广场）TAB
  const navItems = [
    { id: 'community', label: '社区', icon: Users },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/66 backdrop-blur-[16.67px] border-t border-gray-200 safe-area-bottom z-50">
      <div className="max-w-[480px] mx-auto">
        <div className="flex items-center justify-center h-[83px]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            
            return (
              <button
                key={item.id}
                className="flex flex-col items-center justify-center gap-1 h-full touch-manipulation"
              >
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <Icon
                    size={20}
                    className={isActive ? 'text-[#FB2628]' : 'text-[#00000099]'}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                <span
                  className={`text-[10px] ${
                    isActive ? 'text-[#FB2628]' : 'text-[#00000099]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        {/* 底部指示条 */}
        <div className="h-0.5 bg-black mx-auto" style={{ width: '134px' }}></div>
      </div>
    </div>
  );
}

