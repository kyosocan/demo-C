import { useState } from 'react';
import { QuestionContent } from '../types';
import { ChevronDown, Search } from 'lucide-react';
import PlazaHeader from './PlazaHeader';
import FloatingActionButton from './FloatingActionButton';
import QuestionCard from './QuestionCard';

interface QAPageProps {
  contents: QuestionContent[];
  onQuestionClick?: (question: QuestionContent) => void;
  onSearchClick: () => void;
  onQuestionSubmit: () => void;
  onTabChange?: (tab: 'plaza' | 'material' | 'qa' | 'studyset' | 'teacher') => void;
}

export default function QAPage({
  contents,
  onQuestionClick: _onQuestionClick,
  onSearchClick,
  onQuestionSubmit,
  onTabChange,
}: QAPageProps) {
  const [subjectFilter, _setSubjectFilter] = useState('学科');
  const [typeFilter, _setTypeFilter] = useState('类型');

  return (
    <div className="min-h-screen bg-white">
      <PlazaHeader
        currentTab="qa"
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
        <div className="space-y-4">
          {contents.map((content) => (
            <QuestionCard
              key={content.id}
              content={content}
            />
          ))}
        </div>
      </div>

      <FloatingActionButton
        onQuestionClick={onQuestionSubmit}
        onCreateMaterialClick={() => {}}
      />
    </div>
  );
}

