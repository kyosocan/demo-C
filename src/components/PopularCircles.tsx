import { ChevronRight } from 'lucide-react';

interface Circle {
  id: string;
  name: string;
  icon: string;
}

const circles: Circle[] = [
  { id: '1', name: '小学作文圈', icon: '📝' },
  { id: '2', name: '小学口语圈', icon: '💬' },
  { id: '3', name: '小学口算圈', icon: '🔢' },
  { id: '4', name: '小学阅读圈', icon: '📚' },
  { id: '5', name: '小学英语圈', icon: '🇬🇧' },
];

export default function PopularCircles() {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-[#393548]">热门圈子</h2>
        <div className="flex items-center gap-1 text-xs text-[#848093]">
          <span>查看全部</span>
          <ChevronRight size={11} />
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {circles.map((circle) => (
          <div
            key={circle.id}
            className="flex-shrink-0 flex flex-col items-center gap-2"
          >
            <div className="w-[70px] h-[70px] rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-3xl shadow-sm">
              {circle.icon}
            </div>
            <span className="text-xs text-[#4D4D4D] whitespace-nowrap">{circle.name}</span>
          </div>
        ))}
        <div className="flex-shrink-0 w-[24px] h-[70px] rounded-r-lg bg-gradient-to-r from-gray-100 to-transparent flex items-center justify-center">
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}







