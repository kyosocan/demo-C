import { useState } from 'react';
import { MaterialContent } from '../types';
import { ChevronDown, Search } from 'lucide-react';
import FloatingActionButton from './FloatingActionButton';
import MaterialCard from './MaterialCard';
import StatusBar from './StatusBar';

interface MaterialPageProps {
  contents: MaterialContent[];
  onMaterialClick: (material: MaterialContent) => void;
  onSearchClick: () => void;
  onCreateMaterialClick: () => void;
  onQuestionClick: () => void;
  onTabChange?: (tab: 'plaza' | 'material' | 'qa' | 'studyset' | 'teacher') => void;
}

export default function MaterialPage({
  contents,
  onMaterialClick,
  onSearchClick,
  onCreateMaterialClick,
  onQuestionClick,
  onTabChange,
}: MaterialPageProps) {
  const [gradeFilter, _setGradeFilter] = useState('三年级');
  const [subjectFilter, _setSubjectFilter] = useState('数学');
  const [categoryFilter, setCategoryFilter] = useState('全部');

  // 筛选内容
  const filteredContents = contents.filter((content) => {
    if (categoryFilter === '全部') return true;
    // 根据标签筛选
    const hasMatchingTag = content.tags.some(tag => {
      if (categoryFilter === '专项练习题') return tag.name === '专项练习题';
      if (categoryFilter === '真题试卷') return tag.name === '真题试卷';
      if (categoryFilter === '思维导图') return tag.name === '思维导图';
      if (categoryFilter === '错题集') return tag.name === '错题集';
      return false;
    });
    return hasMatchingTag;
  });

  return (
    <div className="min-h-screen bg-[#F4F5FA] overflow-hidden relative">
      {/* 状态栏 */}
      <StatusBar />

      {/* 主导航栏 - 广场、资料、答疑、学习集 */}
      <div className="bg-white border-b border-gray-100">
        <div className="h-11 flex items-center justify-between px-4">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => onTabChange?.('plaza')}
              className={`text-lg font-semibold transition-colors whitespace-nowrap ${
                false ? 'text-[#FB2628]' : 'text-[#000000E6]'
              }`}
            >
              广场
            </button>
            <button
              onClick={() => onTabChange?.('material')}
              className={`text-lg font-semibold transition-colors whitespace-nowrap ${
                true ? 'text-[#FB2628]' : 'text-[#000000E6]'
              }`}
            >
              资料
            </button>
            <button
              onClick={() => onTabChange?.('qa')}
              className={`text-lg font-semibold transition-colors whitespace-nowrap ${
                false ? 'text-[#FB2628]' : 'text-[#000000E6]'
              }`}
            >
              答疑
            </button>
            <button
              onClick={() => onTabChange?.('studyset')}
              className={`text-lg font-semibold transition-colors whitespace-nowrap ${
                false ? 'text-[#FB2628]' : 'text-[#000000E6]'
              }`}
            >
              学习集
            </button>
            <button
              onClick={() => onTabChange?.('teacher')}
              className={`text-lg font-semibold transition-colors whitespace-nowrap ${
                false ? 'text-[#FB2628]' : 'text-[#000000E6]'
              }`}
            >
              规划伴学
            </button>
          </div>
          
          {/* 搜索图标 */}
          <button
            onClick={onSearchClick}
            className="p-2 rounded-full active:opacity-70 transition-opacity touch-manipulation"
          >
            <Search size={20} className="text-gray-900" />
          </button>
        </div>
      </div>

      {/* 筛选器和分类标签 */}
      <div className="bg-white">
        {/* 筛选器行 - 显示"我的资料" */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#000000A6] active:opacity-70 transition-opacity touch-manipulation">
              {gradeFilter}
              <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#000000A6] active:opacity-70 transition-opacity touch-manipulation">
              {subjectFilter}
              <ChevronDown size={14} />
            </button>
          </div>
          <span className="text-sm text-[#00000099]">我的资料</span>
        </div>

        {/* 内容分类标签行 */}
        <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto scrollbar-hide border-b border-gray-100">
          <button
            onClick={() => setCategoryFilter('全部')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors touch-manipulation ${
              categoryFilter === '全部'
                ? 'bg-[#DB0000] text-white'
                : 'bg-white text-[#000000E6]'
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setCategoryFilter('专项练习题')}
            className={`px-2 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors touch-manipulation ${
              categoryFilter === '专项练习题'
                ? 'bg-[#DB0000] text-white'
                : 'bg-white/20 text-[#000000E6]'
            }`}
          >
            专项练习题
          </button>
          <button
            onClick={() => setCategoryFilter('真题试卷')}
            className={`px-2 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors touch-manipulation ${
              categoryFilter === '真题试卷'
                ? 'bg-[#DB0000] text-white'
                : 'bg-white/20 text-[#000000E6]'
            }`}
          >
            真题试卷
          </button>
          <button
            onClick={() => setCategoryFilter('思维导图')}
            className={`px-2 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors touch-manipulation ${
              categoryFilter === '思维导图'
                ? 'bg-[#DB0000] text-white'
                : 'bg-white/20 text-[#000000E6]'
            }`}
          >
            思维导图
          </button>
          <button className="flex items-center gap-1 px-2 py-1.5 rounded-full text-sm font-medium whitespace-nowrap bg-white/20 text-[#000000E6] active:opacity-70 transition-opacity touch-manipulation">
            错是
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* 内容区域 - 可滚动 */}
      <div className="px-4 py-4 pb-24">
        <div className="grid grid-cols-2 gap-3">
          {filteredContents.map((content) => (
            <MaterialCard
              key={content.id}
              content={content}
              onClick={() => onMaterialClick(content)}
            />
          ))}
        </div>
      </div>

      {/* 浮动操作按钮 */}
      <FloatingActionButton
        onQuestionClick={onQuestionClick}
        onCreateMaterialClick={onCreateMaterialClick}
        showCreateMaterial={true}
      />
    </div>
  );
}
