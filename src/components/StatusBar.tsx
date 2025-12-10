import { Signal, Wifi, Battery } from 'lucide-react';

/**
 * 统一的状态栏组件
 * 包含时间、信号、Wi-Fi、电池图标
 */
export default function StatusBar() {
  return (
    <div className="h-11 flex items-center justify-between px-4 bg-white relative z-10">
      <div className="text-[15px] font-semibold">9:41</div>
      <div className="flex items-center gap-1.5">
        {/* 信号图标 */}
        <Signal size={16} className="text-black" />
        {/* Wi-Fi图标 */}
        <Wifi size={16} className="text-black" />
        {/* 电池图标 */}
        <Battery size={20} className="text-black" />
      </div>
    </div>
  );
}

