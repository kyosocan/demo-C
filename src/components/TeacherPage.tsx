import { MapPin } from 'lucide-react';
import StatusBar from './StatusBar';
import { Teacher } from '../types';
import { getImageUrl } from '../utils/imageUtils';

interface TeacherPageProps {
  teachers: Teacher[];
  onTeacherClick: (teacher: Teacher) => void;
  onTabChange?: (tab: 'plaza' | 'material' | 'qa' | 'studyset' | 'teacher') => void;
  currentTab?: 'plaza' | 'material' | 'qa' | 'studyset' | 'teacher';
}

export default function TeacherPage({
  teachers,
  onTeacherClick,
  onTabChange,
  currentTab = 'teacher',
}: TeacherPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* 状态栏 */}
      <StatusBar />

      {/* 主导航栏 - 广场、规划伴学 */}
      <div className="bg-white border-b border-gray-100">
        <div className="h-11 flex items-center justify-between px-4">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => onTabChange?.('plaza')}
              className={`text-lg font-semibold transition-colors whitespace-nowrap ${
                currentTab === 'plaza' ? 'text-[#FB2628]' : 'text-[#000000E6]'
              }`}
            >
              广场
            </button>
            <button
              onClick={() => onTabChange?.('teacher')}
              className={`text-lg font-semibold transition-colors whitespace-nowrap ${
                currentTab === 'teacher' ? 'text-[#FB2628]' : 'text-[#000000E6]'
              }`}
            >
              规划伴学
            </button>
          </div>
        </div>
      </div>

      {/* 名师列表 */}
      <div className="pb-24">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            onClick={() => onTeacherClick(teacher)}
            className="px-4 py-4 border-b border-gray-100 bg-white active:bg-gray-50 transition-colors touch-manipulation"
          >
            <div className="flex gap-3">
              {/* 头像 */}
              <div className="flex-shrink-0">
                <img
                  src={getImageUrl(teacher.avatar)}
                  alt={teacher.name}
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getImageUrl('/image/avatar/我在魔都汇.png');
                  }}
                />
              </div>

              {/* 内容区域 */}
              <div className="flex-1 min-w-0">
                {/* 名字和更多按钮 */}
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                      {teacher.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">
                      {teacher.title}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="flex-shrink-0 p-1"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8C8.5 7.72386 8.27614 7.5 8 7.5C7.72386 7.5 7.5 7.72386 7.5 8C7.5 8.27614 7.72386 8.5 8 8.5Z" fill="#999" stroke="#999" strokeWidth="1.5"/>
                      <path d="M8 4.5C8.27614 4.5 8.5 4.27614 8.5 4C8.5 3.72386 8.27614 3.5 8 3.5C7.72386 3.5 7.5 3.72386 7.5 4C7.5 4.27614 7.72386 4.5 8 4.5Z" fill="#999" stroke="#999" strokeWidth="1.5"/>
                      <path d="M8 12.5C8.27614 12.5 8.5 12.2761 8.5 12C8.5 11.7239 8.27614 11.5 8 11.5C7.72386 11.5 7.5 11.7239 7.5 12C7.5 12.2761 7.72386 12.5 8 12.5Z" fill="#999" stroke="#999" strokeWidth="1.5"/>
                    </svg>
                  </button>
                </div>

                {/* 服务标签 */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {teacher.services.map((service, index) => (
                    <span
                      key={index}
                      className="text-xs text-orange-500 bg-orange-50 px-2 py-0.5 rounded"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                {/* 关键词标签 */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {teacher.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* 统计信息和价格 */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{teacher.location}</span>
                    </div>
                    <span>帮助了{teacher.helpedCount}人</span>
                    <span className="text-orange-500 font-medium">
                      评分{teacher.rating}
                    </span>
                  </div>
                  <div className="text-orange-500 font-semibold">
                    ¥{teacher.consultationPrice}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
