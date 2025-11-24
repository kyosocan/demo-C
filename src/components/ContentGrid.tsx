import { CommunityContent } from '../types';
import ContentCard from './ContentCard';
import QuestionCard from './QuestionCard';
import StudySetCard from './StudySetCard';

interface ContentGridProps {
  contents: CommunityContent[];
  currentType?: 'material' | 'question' | 'studyset';
  onContentClick?: (content: CommunityContent) => void;
}

export default function ContentGrid({ contents, currentType, onContentClick }: ContentGridProps) {
  if (contents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-sm">暂无内容，快来分享第一个吧！</p>
      </div>
    );
  }

  // 根据类型显示不同布局
  if (currentType === 'question') {
    // 问答：单列布局（知乎风格）
    return (
      <div className="space-y-3">
        {contents.map((content) => {
          if (content.type === 'question') {
            return <QuestionCard key={content.id} content={content} />;
          }
          return null;
        })}
      </div>
    );
  } else if (currentType === 'studyset') {
    // 学习集：双列网格布局，向上对齐
    return (
      <div className="grid grid-cols-2 gap-3 items-start">
        {contents.map((content) => {
          if (content.type === 'studyset') {
            return (
              <StudySetCard
                key={content.id}
                content={content}
                onClick={() => onContentClick?.(content)}
              />
            );
          }
          return null;
        })}
      </div>
    );
  } else {
    // 资料：双列布局（小红书风格）
    return (
      <div className="grid grid-cols-2 gap-2">
        {contents.map((content) => {
          if (content.type === 'material') {
            return (
              <ContentCard
                key={content.id}
                content={content}
                onClick={() => onContentClick?.(content)}
              />
            );
          }
          return null;
        })}
      </div>
    );
  }
}
