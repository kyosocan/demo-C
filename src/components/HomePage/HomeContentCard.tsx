import { useState } from 'react';

/**
 * Home Content Card - 严格按 Figma 设计稿还原
 * 宽度: 168px
 * 图片: 168x168 正方形
 * 内容区: px-[12px] pt-[8px] pb-[16px]
 * 圆角: 8px
 * 阴影: 0px 2px 20px 0px rgba(0,0,0,0.04)
 */

interface HomeContentCardProps {
  id: string;
  title: string;
  author: string;
  authorAvatar?: string;
  likes: number | string;
  coverImage: string;
  onClick?: () => void;
}

// 心形图标 - 未收藏状态
const HeartIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-90"
  >
    <path
      d="M5.5 2.75C5.5 2.75 4.5 1.25 3 1.25C1.75 1.25 0.75 2.25 0.75 3.5C0.75 6 5.5 9.25 5.5 9.25C5.5 9.25 10.25 6 10.25 3.5C10.25 2.25 9.25 1.25 8 1.25C6.5 1.25 5.5 2.75 5.5 2.75Z"
      stroke="rgba(0,0,0,1)"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HomeContentCard({
  title,
  author,
  authorAvatar,
  likes,
  coverImage,
  onClick,
}: HomeContentCardProps) {
  const [imageError, setImageError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // 获取头像占位符
  const getAvatarPlaceholder = () => {
    return author.charAt(0);
  };

  return (
    <div
      onClick={onClick}
      className="w-[168px] bg-white rounded-[8px] overflow-hidden cursor-pointer touch-manipulation active:opacity-90 transition-opacity flex flex-col"
      style={{ boxShadow: '0px 2px 20px 0px rgba(0,0,0,0.04)' }}
    >
      {/* 封面图片 - 168x168 正方形 */}
      <div className="w-[168px] h-[168px] overflow-hidden shrink-0">
        {!imageError ? (
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(0,0,0,0.3)"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* 内容区域 */}
      <div className="flex flex-col gap-[10px] px-[12px] pt-[8px] pb-[16px] w-full">
        {/* 标题 - 最多两行 */}
        <p
          className="text-[14px] font-medium leading-[normal] text-[rgba(0,0,0,0.9)] w-full whitespace-pre-wrap overflow-hidden"
          style={{
            fontFamily: 'PingFang SC, sans-serif',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </p>

        {/* 作者和点赞 */}
        <div className="flex items-center justify-between gap-[8px] w-full">
          {/* 作者信息 */}
          <div className="flex items-center gap-[4px] flex-1 min-w-0">
            {/* 头像 - 20x20 */}
            <div className="w-[20px] h-[20px] rounded-full overflow-hidden shrink-0">
              {authorAvatar && !avatarError ? (
                <img
                  src={authorAvatar}
                  alt={author}
                  className="w-full h-full object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                  <span className="text-[10px] text-white font-medium">
                    {getAvatarPlaceholder()}
                  </span>
                </div>
              )}
            </div>
            
            {/* 作者名 */}
            <p
              className="text-[12px] font-normal leading-[18px] text-[rgba(0,0,0,0.9)] truncate flex-1 min-w-0"
              style={{ fontFamily: 'PingFang SC, sans-serif' }}
            >
              {author}
            </p>
          </div>

          {/* 点赞 */}
          <div className="flex items-center gap-[4px] shrink-0">
            <HeartIcon />
            <p
              className="text-[12px] font-normal leading-[18px] text-[rgba(0,0,0,0.9)]"
              style={{ fontFamily: 'PingFang SC, sans-serif' }}
            >
              {likes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

