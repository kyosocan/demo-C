import { useState } from 'react';
import { StudySetContent } from '../types';
import { ChevronDown, MoreVertical, Users, ThumbsUp, Search } from 'lucide-react';
import PlazaHeader from './PlazaHeader';
import FloatingActionButton from './FloatingActionButton';
import { getImageUrl } from '../utils/imageUtils';

interface StudySetPageProps {
  contents: StudySetContent[];
  onStudySetClick: (studySet: StudySetContent) => void;
  onSearchClick: () => void;
  onCreateStudySetClick: () => void;
  onQuestionClick: () => void;
  onTabChange?: (tab: 'plaza' | 'material' | 'qa' | 'studyset' | 'teacher') => void;
}

export default function StudySetPage({
  contents,
  onStudySetClick,
  onSearchClick,
  onCreateStudySetClick,
  onQuestionClick,
  onTabChange,
}: StudySetPageProps) {
  const [subjectFilter, _setSubjectFilter] = useState('学科');
  const [typeFilter, _setTypeFilter] = useState('类型');

  // 获取卡片背景色
  const getCardBgColor = (index: number) => {
    const colors = [
      'bg-gradient-to-br from-green-50 to-emerald-50',
      'bg-gradient-to-br from-blue-50 to-cyan-50',
      'bg-gradient-to-br from-orange-50 to-amber-50',
      'bg-gradient-to-br from-yellow-50 to-lime-50',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-white">
      <PlazaHeader
        currentTab="studyset"
        currentSubTab="all"
        onSearchClick={onSearchClick}
        onTabChange={onTabChange}
        showSubNav={false}
      />

      {/* 筛选栏 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-sm text-gray-700">
            {subjectFilter}
            <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-1 text-sm text-gray-700">
            {typeFilter}
            <ChevronDown size={14} />
          </button>
        </div>
        <button className="text-sm text-gray-600 flex items-center gap-1">
          我的资料
          <Search size={11} />
        </button>
      </div>

      {/* 内容区域 */}
      <div className="px-4 py-4 pb-24">
        <div className="grid grid-cols-2 gap-3">
          {contents.map((content, index) => (
            <div
              key={content.id}
              onClick={() => onStudySetClick(content)}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer touch-manipulation active:opacity-90 transition-opacity"
            >
              {/* 顶部操作栏 */}
              <div className="flex items-center justify-between p-2">
                <button className="p-1">
                  <MoreVertical size={14} className="text-gray-400" />
                </button>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Users size={12} />
                  <span>{content.studyCount || 5420}人正在学</span>
                </div>
              </div>

              {/* 卡片主体 */}
              <div className={`px-3 pb-3 ${getCardBgColor(index)}`}>
                <div className="h-32 flex flex-col justify-center">
                  <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2">
                    {content.title}
                  </h3>
                  {content.description && (
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {content.description}
                    </p>
                  )}
                </div>
              </div>

              {/* 底部信息 */}
              <div className="p-3 bg-white">
                <div className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                  {content.title}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {content.cardCount}张卡片
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {content.authorAvatar && (
                      <img
                        src={getImageUrl(content.authorAvatar)}
                        alt={content.author}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    )}
                    <span className="text-xs text-gray-600">{content.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500">150</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FloatingActionButton
        onQuestionClick={onQuestionClick}
        onCreateMaterialClick={() => {}}
        onCreateStudySetClick={onCreateStudySetClick}
        showCreateStudySet={true}
      />
    </div>
  );
}

