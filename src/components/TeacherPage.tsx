import { Search, MapPin } from 'lucide-react';
import StatusBar from './StatusBar';
import { Teacher } from '../types';
import { getImageUrl } from '../utils/imageUtils';

interface TeacherPageProps {
  teachers: Teacher[];
  onTeacherClick: (teacher: Teacher) => void;
  onSearchClick?: () => void;
  onTabChange?: (tab: 'plaza' | 'material' | 'qa' | 'studyset' | 'teacher') => void;
  currentTab?: 'plaza' | 'material' | 'qa' | 'studyset' | 'teacher';
}

export default function TeacherPage({
  teachers,
  onTeacherClick,
  onSearchClick,
  onTabChange,
  currentTab = 'teacher',
}: TeacherPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* 状态栏 */}
      <StatusBar />

      {/* 主导航栏 - 广场、资料、答疑、学习集、名师咨询 */}
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
              名师咨询
            </button>
          </div>
          
          {/* 搜索图标 */}
          <button
            onClick={onSearchClick}
            className="flex-shrink-0 ml-2 touch-manipulation p-1"
          >
            <Search size={20} className="text-gray-900" />
          </button>
        </div>
      </div>

      {/* 搜索栏 */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 14L11.1 11.1" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="搜索行家/话题"
              className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-600" />
            <span className="text-sm text-gray-600">北京</span>
          </div>
          <button className="p-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2C10.5523 2 11 2.44772 11 3V4.5C11 5.05228 10.5523 5.5 10 5.5C9.44772 5.5 9 5.05228 9 4.5V3C9 2.44772 9.44772 2 10 2Z" fill="#666"/>
              <path d="M15.5 9C15.5 9.55228 15.0523 10 14.5 10H13C12.4477 10 12 9.55228 12 9C12 8.44772 12.4477 8 13 8H14.5C15.0523 8 15.5 8.44772 15.5 9Z" fill="#666"/>
              <path d="M8 9C8 9.55228 7.55228 10 7 10H5.5C4.94772 10 4.5 9.55228 4.5 9C4.5 8.44772 4.94772 8 5.5 8H7C7.55228 8 8 8.44772 8 9Z" fill="#666"/>
              <path d="M10 14.5C10 15.0523 10.4477 15.5 11 15.5H12.5C13.0523 15.5 13.5 15.0523 13.5 14.5C13.5 13.9477 13.0523 13.5 12.5 13.5H11C10.4477 13.5 10 13.9477 10 14.5Z" fill="#666"/>
              <path d="M6.5 14.5C6.5 15.0523 6.94772 15.5 7.5 15.5C8.05228 15.5 8.5 15.0523 8.5 14.5V13C8.5 12.4477 8.05228 12 7.5 12C6.94772 12 6.5 12.4477 6.5 13V14.5Z" fill="#666"/>
              <path d="M10 6.5C10 5.94772 10.4477 5.5 11 5.5C11.5523 5.5 12 5.94772 12 6.5V7C12 7.55228 11.5523 8 11 8C10.4477 8 10 7.55228 10 7V6.5Z" fill="#666"/>
              <path d="M10 10C10.5523 10 11 10.4477 11 11V12.5C11 13.0523 10.5523 13.5 10 13.5C9.44772 13.5 9 13.0523 9 12.5V11C9 10.4477 9.44772 10 10 10Z" fill="#666"/>
            </svg>
          </button>
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
