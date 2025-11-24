import { QuestionContent } from '../types';

interface QuestionCardProps {
  content: QuestionContent;
}

export default function QuestionCard({ content }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm active:shadow-md transition-shadow cursor-pointer touch-manipulation">
      <div className="p-4">
        {/* 标题 */}
        <h3 className="font-semibold text-gray-900 mb-2.5 text-base leading-snug">
          {content.title}
        </h3>

        {/* 描述 */}
        {content.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
            {content.description}
          </p>
        )}

        {/* 封面图片（如果有） */}
        {content.cover && (
          <div className="w-full rounded-lg overflow-hidden mb-3 bg-gray-200">
            <img
              src={content.cover}
              alt={content.title}
              className="w-full h-40 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* 标签 */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {content.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="px-2.5 py-1 rounded text-xs text-gray-600 bg-gray-100"
            >
              {tag.name}
            </span>
          ))}
          {content.tags.length > 3 && (
            <span className="px-2.5 py-1 rounded text-xs text-gray-400">
              +{content.tags.length - 3}
            </span>
          )}
        </div>

        {/* 作者信息 */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          {content.authorAvatar && (
            <img
              src={content.authorAvatar}
              alt={content.author}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <span className="text-xs text-gray-400">{content.author}</span>
        </div>
      </div>
    </div>
  );
}

