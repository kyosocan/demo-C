import { useState } from 'react';
import { ThumbsUp, User, Image as ImageIcon } from 'lucide-react';

interface PlazaContentCardProps {
  title: string;
  subtitle?: string;
  author: string;
  authorAvatar?: string;
  date?: string;
  likes: number;
  cover?: string;
  learningCount?: number;
  onClick?: () => void;
  variant?: 'default' | 'special';
}

export default function PlazaContentCard({
  title,
  subtitle,
  author,
  authorAvatar,
  date,
  likes,
  cover,
  learningCount,
  onClick,
  variant = 'default',
}: PlazaContentCardProps) {
  const [coverError, setCoverError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // 获取用户头像首字母作为占位符
  const getAvatarPlaceholder = () => {
    if (author && author.length > 0) {
      return author.charAt(0).toUpperCase();
    }
    return '?';
  };

  if (variant === 'special') {
    // 特殊样式卡片（带渐变背景）
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer touch-manipulation active:opacity-90 transition-opacity relative"
      >
        {/* 封面图片 */}
        <div className="relative w-full h-[167px] overflow-hidden bg-gradient-to-br from-yellow-100 to-orange-100">
          {cover && !coverError ? (
            <img
              src={encodeURI(cover)}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('图片加载失败:', cover);
                setCoverError(true);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100">
              <ImageIcon size={40} className="text-gray-400" />
            </div>
          )}
        </div>
        
        {/* 内容信息 */}
        <div className="p-3 flex flex-col gap-1.5">
          {/* 标题 */}
          <h3 className="text-sm font-medium text-[#393548] line-clamp-2 leading-6">
            {title}
          </h3>
          
          {/* 副标题 */}
          {subtitle && (
            <p className="text-xs text-[#00000099] line-clamp-1">{subtitle}</p>
          )}
          
          {/* 作者和点赞 */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              {authorAvatar && !avatarError ? (
                <img
                  src={encodeURI(authorAvatar)}
                  alt={author}
                  className="w-3.75 h-3.75 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    console.error('头像加载失败:', authorAvatar);
                    setAvatarError(true);
                  }}
                />
              ) : (
                <div className="w-3.75 h-3.75 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px] text-white font-medium">
                    {getAvatarPlaceholder()}
                  </span>
                </div>
              )}
              <span className="text-xs text-[#000000E6] truncate">{author}</span>
              {date && (
                <span className="text-xs text-[#00000066] ml-1">{date}</span>
              )}
            </div>
            
            <div className="flex items-center gap-1 flex-shrink-0">
              <ThumbsUp size={16} className="text-[#000000E6]" />
              <span className="text-xs text-[#000000E6]">{likes}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer touch-manipulation active:opacity-90 transition-opacity"
    >
      {/* 封面图片 */}
      <div className="relative w-full h-[167px] overflow-hidden bg-gray-200">
        {cover && !coverError ? (
            <img
              src={encodeURI(cover)}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('图片加载失败:', cover);
                setCoverError(true);
              }}
            />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <ImageIcon size={40} className="text-gray-400" />
          </div>
        )}
      </div>
      
      {/* 内容信息 */}
      <div className="p-3 flex flex-col gap-1.5">
        {/* 标题 */}
        <h3 className="text-sm font-medium text-[#000000E6] line-clamp-2 leading-6">
          {title}
        </h3>
        
          {/* 副标题 */}
          {subtitle && (
            <p className="text-xs text-[#00000099] line-clamp-1">{subtitle}</p>
          )}
          
          {/* 作者和点赞 */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              {authorAvatar && !avatarError ? (
                <img
                  src={encodeURI(authorAvatar)}
                  alt={author}
                  className="w-3.75 h-3.75 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    console.error('头像加载失败:', authorAvatar);
                    setAvatarError(true);
                  }}
                />
              ) : (
                <div className="w-3.75 h-3.75 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px] text-white font-medium">
                    {getAvatarPlaceholder()}
                  </span>
                </div>
              )}
              <span className="text-xs text-[#000000E6] truncate">{author}</span>
              {date && (
                <span className="text-xs text-[#00000066] ml-1">{date}</span>
              )}
            </div>
            
            <div className="flex items-center gap-1 flex-shrink-0">
              <ThumbsUp size={16} className="text-[#000000E6]" />
              <span className="text-xs text-[#000000E6]">{likes}</span>
            </div>
          </div>
      </div>
    </div>
  );
}

