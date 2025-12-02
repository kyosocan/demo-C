import { useState } from 'react';
import { QuestionContent } from '../types';
import { ArrowLeft, Share2, Heart, Star, MessageCircle, Edit, MoreVertical } from 'lucide-react';
import PostMenuDrawer from './PostMenuDrawer';
import { getImageUrl } from '../utils/imageUtils';

interface QuestionDetailProps {
  content: QuestionContent;
  onBack: () => void;
  onEdit?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
  currentUserId?: string; // 当前登录用户ID
}

interface CommentItem {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  time: string;
  likes: number;
  replies?: CommentItem[];
}

// 模拟评论数据
const mockComments: CommentItem[] = [
  {
    id: '1',
    author: '教育专家',
    authorAvatar: '/image/avatar/猫老师妈妈.png',
    content: '青春期是孩子成长的重要阶段，建议多倾听孩子的想法，给予理解和支持。',
    time: '2小时前',
    likes: 12,
    replies: [
      {
        id: '1-1',
        author: '家长小李',
        content: '谢谢专家的建议！',
        time: '1小时前',
        likes: 3,
      },
    ],
  },
  {
    id: '2',
    author: '心理老师',
    content: '可以尝试和孩子一起做一些共同感兴趣的事情，增进感情。',
    time: '5小时前',
    likes: 8,
  },
];

export default function QuestionDetail({ 
  content, 
  onBack,
  onEdit,
  onShare,
  onDelete,
  currentUserId = '我在魔都汇', // 默认当前用户
}: QuestionDetailProps) {
  const [likeCount, setLikeCount] = useState(89);
  const [favoriteCount, setFavoriteCount] = useState(45);
  const [commentCount] = useState(12);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showMenuDrawer, setShowMenuDrawer] = useState(false);

  // 判断是否是自己的帖子
  const isMyPost = content.author === currentUserId;

  // 获取年级标签
  const gradeTag = content.tags.find(tag => tag.id.startsWith('grade-'));

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              onClick={onBack}
              className="touch-manipulation p-1 -ml-1"
            >
              <ArrowLeft size={20} className="text-gray-900" />
            </button>
            {content.authorAvatar && (
              <img
                src={getImageUrl(content.authorAvatar)}
                alt={content.author}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
            )}
            <span className="text-sm font-medium text-gray-900 truncate">{content.author}</span>
          </div>
          {isMyPost ? (
            <button 
              onClick={() => setShowMenuDrawer(true)}
              className="touch-manipulation p-1"
            >
              <MoreVertical size={18} className="text-gray-900" />
            </button>
          ) : (
            <button className="touch-manipulation p-1">
              <Share2 size={18} className="text-gray-900" />
            </button>
          )}
        </div>
      </div>

      {/* 封面区域 */}
      {content.cover && (
        <div className="relative w-full h-[400px] overflow-hidden bg-gray-100">
          <img
            src={getImageUrl(content.cover)}
            alt={content.title}
            className="w-full h-full object-cover"
            onError={() => {}}
          />
        </div>
      )}

      {/* 内容信息区域 */}
      <div className="px-4 pt-4 pb-3 bg-white">
        {/* 标题 */}
        <h1 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
          {content.title}
        </h1>
        
        {/* 问题描述 */}
        <div className="mb-3">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {content.description}
          </p>
        </div>

        {/* 时间和位置信息 */}
        <div className="text-xs text-gray-400 mb-4">
          {content.createdAt || '昨天 21:26'} {gradeTag && gradeTag.name}
        </div>
      </div>

      {/* 评论区域 - 常驻显示 */}
      <div className="px-4 pb-24 bg-white border-t border-gray-100">
        {/* 评论数量 */}
        <div className="text-sm text-gray-600 mb-4 pt-4">
          共{commentCount}条评论
        </div>

        {/* 评论列表 */}
        {mockComments.map((comment, index) => (
          <div
            key={comment.id}
            className={`py-4 ${index < mockComments.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <div className="flex items-start gap-3">
              {comment.authorAvatar ? (
                <img
                  src={getImageUrl(comment.authorAvatar)}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">
                    {comment.author.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                  <span className="text-xs text-gray-400">{comment.time}</span>
                  {index === 0 && (
                    <span className="text-xs text-[#FB2628] bg-[#FB2628]/10 px-2 py-0.5 rounded">首评</span>
                  )}
                </div>
                <p className="text-sm text-gray-700 mb-2 leading-relaxed">{comment.content}</p>
                <div className="flex items-center gap-4 mb-2">
                  <button className="flex items-center gap-1 text-gray-500 touch-manipulation">
                    <Heart size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-400">{comment.likes}</span>
                  </button>
                  <button className="text-xs text-gray-400 touch-manipulation">
                    回复
                  </button>
                </div>
                
                {/* 回复列表 */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-0 mt-2 space-y-2 pl-3 border-l-2 border-gray-100">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">{reply.author}</span>
                            <span className="text-xs text-gray-400">{reply.time}</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{reply.content}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <button className="flex items-center gap-1 text-gray-500 touch-manipulation">
                              <Heart size={12} className="text-gray-400" />
                              <span className="text-xs text-gray-400">{reply.likes}</span>
                            </button>
                            <button className="text-xs text-gray-400 touch-manipulation">
                              回复
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="text-center py-4 text-sm text-gray-400">
          没有更多了
        </div>
      </div>
      
      {/* 底部操作栏 - 按照截图样式 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-40">
        <div className="max-w-[480px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* 左侧评论输入框 */}
            <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2 flex items-center gap-2">
              <Edit size={16} className="text-gray-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="说点什么..."
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
            
            {/* 右侧操作按钮 */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setIsLiked(!isLiked);
                  setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
                }}
                className="flex items-center gap-1 touch-manipulation"
              >
                <Heart size={20} className={isLiked ? 'text-[#FB2628] fill-[#FB2628]' : 'text-gray-600'} />
                <span className="text-sm text-gray-600">{likeCount}</span>
              </button>
              <button
                onClick={() => {
                  setIsFavorited(!isFavorited);
                  setFavoriteCount(prev => isFavorited ? prev - 1 : prev + 1);
                }}
                className="flex items-center gap-1 touch-manipulation"
              >
                <Star size={20} className={isFavorited ? 'text-[#FB2628] fill-[#FB2628]' : 'text-gray-600'} />
                <span className="text-sm text-gray-600">{favoriteCount}</span>
              </button>
              <button className="flex items-center gap-1 touch-manipulation">
                <MessageCircle size={20} className="text-gray-600" />
                <span className="text-sm text-gray-600">{commentCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 帖子菜单抽屉 */}
      {isMyPost && (
        <PostMenuDrawer
          isOpen={showMenuDrawer}
          onClose={() => setShowMenuDrawer(false)}
          onEdit={() => {
            if (onEdit) onEdit();
          }}
          onShare={() => {
            if (onShare) onShare();
          }}
          onDelete={() => {
            if (onDelete) onDelete();
          }}
        />
      )}
    </div>
  );
}

