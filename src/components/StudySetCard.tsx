import { useState } from 'react';
import { StudySetContent } from '../types';
import { BookOpen } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';

interface StudySetCardProps {
  content: StudySetContent;
  onClick: () => void;
}

export default function StudySetCard({ content, onClick }: StudySetCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // 随机渐变色，让每个卡片都有不同的颜色
  const gradients = [
    'from-blue-500 via-purple-500 to-pink-500',
    'from-green-500 via-teal-500 to-blue-500',
    'from-orange-500 via-red-500 to-pink-500',
    'from-purple-500 via-pink-500 to-red-500',
    'from-indigo-500 via-purple-500 to-pink-500',
  ];
  
  // 使用 id 生成一个稳定的随机数
  const getRandomFromId = (id: string, max: number) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % max;
  };
  
  const gradient = gradients[getRandomFromId(content.id, gradients.length)];
  const coverHeight = 120 + getRandomFromId(content.id + 'height', 60); // 120-180px

  const showCover = content.cover && !imageError;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden border border-gray-100 active:scale-[0.98]"
    >
      {/* 卡片头部 - 封面图片或渐变背景，高度随机变化 */}
      {showCover ? (
        <div 
          className="relative overflow-hidden"
          style={{ height: `${coverHeight}px` }}
        >
          <img
            src={content.cover ? getImageUrl(content.cover) : ''}
            alt={content.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div 
          className={`bg-gradient-to-br ${gradient} relative overflow-hidden`}
          style={{ height: `${coverHeight}px` }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-14 h-14 text-white/90" strokeWidth={1.5} />
          </div>
        </div>
      )}

      {/* 卡片内容 */}
      <div className="p-4">
        {/* 标题 */}
        <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-3">
          {content.title}
        </h3>

        {/* 描述（如果有的话）*/}
        {content.description && (
          <p className="text-xs text-gray-600 line-clamp-2 mb-3">
            {content.description}
          </p>
        )}

        {/* 标签 */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {content.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${tag.color}15`,
                color: tag.color,
              }}
            >
              {tag.name}
            </span>
          ))}
          {content.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              +{content.tags.length - 3}
            </span>
          )}
        </div>

        {/* 作者信息 */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          {content.authorAvatar && (
            <img
              src={getImageUrl(content.authorAvatar)}
              alt={content.author}
              className="w-6 h-6 rounded-full"
            />
          )}
          <span className="text-sm text-gray-600">{content.author}</span>
        </div>
      </div>
    </div>
  );
}

