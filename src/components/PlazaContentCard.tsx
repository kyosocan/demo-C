import { useState, useRef, useCallback } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';

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
  onLongPress?: (position: { x: number; y: number }) => void;
}

// 心形点赞图标
const HeartIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M5.5 2.5C5.5 2.5 4.5 1 3 1C1.5 1 0.5 2 0.5 3.5C0.5 6 5.5 9.5 5.5 9.5C5.5 9.5 10.5 6 10.5 3.5C10.5 2 9.5 1 8 1C6.5 1 5.5 2.5 5.5 2.5Z" 
      stroke="rgba(0,0,0,0.9)" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default function PlazaContentCard({
  title,
  subtitle: _subtitle,
  author,
  authorAvatar,
  date: _date,
  likes,
  cover,
  learningCount: _learningCount,
  onClick,
  variant = 'default',
  onLongPress,
}: PlazaContentCardProps) {
  const [coverError, setCoverError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  // 长按处理
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isLongPress.current = false;
    const touch = e.touches[0];
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      const popupX = touch.clientX;
      const popupY = rect.top;
      onLongPress?.({ x: popupX, y: popupY });
    }, 1000);
  }, [onLongPress]);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleTouchMove = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleClick = useCallback(() => {
    if (isLongPress.current) {
      isLongPress.current = false;
      return;
    }
    onClick?.();
  }, [onClick]);

  // 获取用户头像首字母作为占位符
  const getAvatarPlaceholder = () => {
    if (author && author.length > 0) {
      return author.charAt(0).toUpperCase();
    }
    return '?';
  };

  // 格式化点赞数
  const formatLikes = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}k`;
    }
    return count.toString();
  };

  const cardStyle = {
    boxShadow: '0px 2px 20px 0px rgba(0,0,0,0.04)',
  };

  if (variant === 'special') {
    return (
      <div
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        className="bg-white rounded-[8px] overflow-hidden cursor-pointer touch-manipulation active:opacity-90 transition-opacity"
        style={cardStyle}
      >
        {/* 封面图片 - 167x167 等比 */}
        <div className="relative w-full aspect-square overflow-hidden">
          {cover && !coverError ? (
            <img
              src={getImageUrl(cover)}
              alt={title}
              className="w-full h-full object-cover"
              onError={() => setCoverError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100">
              <ImageIcon size={40} className="text-gray-400" />
            </div>
          )}
        </div>
        
        {/* 内容信息 */}
        <div className="px-3 pt-2 pb-4 flex flex-col gap-[10px]">
          <h3 
            className="text-[14px] font-medium text-[rgba(0,0,0,0.9)] line-clamp-2"
            style={{ fontFamily: 'PingFang SC, sans-serif', lineHeight: 'normal' }}
          >
            {title}
          </h3>
          
          {/* 作者和点赞 */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 flex-1 min-w-0">
              {authorAvatar && !avatarError ? (
                <img
                  src={getImageUrl(authorAvatar)}
                  alt={author}
                  className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] text-white font-medium">
                    {getAvatarPlaceholder()}
                  </span>
                </div>
              )}
              <span 
                className="text-[12px] font-normal text-[rgba(0,0,0,0.9)] truncate"
                style={{ fontFamily: 'PingFang SC, sans-serif', lineHeight: '18px' }}
              >
                {author}
              </span>
            </div>
            
            {/* 点赞 */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <HeartIcon />
              <span 
                className="text-[12px] font-normal text-[rgba(0,0,0,0.9)]"
                style={{ fontFamily: 'PingFang SC, sans-serif', lineHeight: '18px' }}
              >
                {likes > 0 ? formatLikes(likes) : '赞'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      className="bg-white rounded-[8px] overflow-hidden cursor-pointer touch-manipulation active:opacity-90 transition-opacity"
      style={cardStyle}
    >
      {/* 封面图片 - 167x167 等比 */}
      <div className="relative w-full aspect-square overflow-hidden">
        {cover && !coverError ? (
          <img
            src={getImageUrl(cover)}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setCoverError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <ImageIcon size={40} className="text-gray-400" />
          </div>
        )}
      </div>
      
      {/* 内容信息 */}
      <div className="px-3 pt-2 pb-4 flex flex-col gap-[10px]">
        <h3 
          className="text-[14px] font-medium text-[rgba(0,0,0,0.9)] line-clamp-2"
          style={{ fontFamily: 'PingFang SC, sans-serif', lineHeight: 'normal' }}
        >
          {title}
        </h3>
        
        {/* 作者和点赞 */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 flex-1 min-w-0">
            {authorAvatar && !avatarError ? (
              <img
                src={getImageUrl(authorAvatar)}
                alt={author}
                className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] text-white font-medium">
                  {getAvatarPlaceholder()}
                </span>
              </div>
            )}
            <span 
              className="text-[12px] font-normal text-[rgba(0,0,0,0.9)] truncate"
              style={{ fontFamily: 'PingFang SC, sans-serif', lineHeight: '18px' }}
            >
              {author}
            </span>
          </div>
          
          {/* 点赞 */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <HeartIcon />
            <span 
              className="text-[12px] font-normal text-[rgba(0,0,0,0.9)]"
              style={{ fontFamily: 'PingFang SC, sans-serif', lineHeight: '18px' }}
            >
              {likes > 0 ? formatLikes(likes) : '赞'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
