import { CommunityContent } from '../types';

interface ContentCardProps {
  content: CommunityContent;
  onClick?: () => void;
}

export default function ContentCard({ content, onClick }: ContentCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-sm active:shadow-md transition-shadow cursor-pointer touch-manipulation"
    >
      {/* 封面图片 */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-200">
        {content.cover && (
          <img
            src={content.cover}
            alt={content.title}
            className="w-full h-full object-cover"
          />
        )}
        {/* 学科标签 */}
        <div className="absolute top-2 right-2">
          {(() => {
            // 找到第一个学科标签（subject开头的标签）
            const subjectTag = content.tags.find(tag => tag.id.startsWith('subject-'));
            if (subjectTag) {
              return (
                <span
                  className="px-2 py-0.5 rounded text-xs font-medium text-white bg-pink-500"
                  style={subjectTag.color ? { backgroundColor: subjectTag.color } : undefined}
                >
                  {subjectTag.name}
                </span>
              );
            }
            // 如果没有学科标签，显示第一个标签
            if (content.tags.length > 0) {
              const firstTag = content.tags[0];
              return (
                <span
                  className="px-2 py-0.5 rounded text-xs font-medium text-white bg-pink-500"
                  style={firstTag.color ? { backgroundColor: firstTag.color } : undefined}
                >
                  {firstTag.name}
                </span>
              );
            }
            return null;
          })()}
        </div>
      </div>

      {/* 内容信息 */}
      <div className="p-2.5">
        {/* 标题 */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm leading-tight min-h-[2.8rem]">
          {content.title}
        </h3>

        {/* 标签 */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {content.tags.slice(0, 2).map((tag) => (
            <span
              key={tag.id}
              className="px-2 py-0.5 rounded text-xs text-gray-600 bg-gray-100"
            >
              {tag.name}
            </span>
          ))}
          {content.tags.length > 2 && (
            <span className="px-2 py-0.5 rounded text-xs text-gray-400">
              +{content.tags.length - 2}
            </span>
          )}
        </div>

        {/* 统计信息和作者 */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
          {content.type === 'material' ? (
            <span className="text-xs text-gray-500">
              {content.downloadCount > 999 
                ? `${(content.downloadCount / 1000).toFixed(1)}k` 
                : content.downloadCount} 人已添加到学习计划
            </span>
          ) : null}
          <div className="flex items-center gap-1.5">
            {content.authorAvatar && (
              <img
                src={content.authorAvatar}
                alt={content.author}
                className="w-5 h-5 rounded-full object-cover"
              />
            )}
            <span className="text-xs text-gray-400 truncate max-w-[50px]">{content.author}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

