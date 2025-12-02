export default function DailyCheckIn() {
  return (
    <div className="mx-4 mb-4 mt-2">
      <div className="bg-white rounded-lg shadow-sm border border-white p-3 relative overflow-hidden backdrop-blur-sm">
        <div className="flex items-start gap-3 relative z-10">
          {/* 左侧图标 - 双引号 */}
          <div className="flex-shrink-0 w-6 h-9 flex flex-col items-center justify-center relative">
            <div className="absolute top-0 left-0 w-3 h-4.5 bg-[#FB2628] rounded-sm"></div>
            <div className="absolute bottom-0 left-0 w-3 h-4.5 bg-[#FB2628] rounded-sm"></div>
          </div>
          
          {/* 内容区域 */}
          <div className="flex-1 flex flex-col gap-1">
            <div className="text-sm font-medium text-[#000000E6] leading-6">#小学每日打卡</div>
            <div className="flex items-center gap-1 px-0.5 py-0.5 rounded-full bg-[#FB2628]/5 w-fit">
              <div className="w-3.75 h-3.75 rounded-full bg-[#FB2628] flex-shrink-0"></div>
              <span className="text-xs text-[#00000099] leading-[18px]">语文《青山不老预习笔记》</span>
            </div>
          </div>
          
          {/* 右侧更多按钮 */}
          <div className="flex-shrink-0 flex flex-col gap-1 items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

