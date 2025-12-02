import { QuestionContent } from '../types';
import { MoreVertical, Heart, MessageCircle, Share2, Smile, Lightbulb, AlertCircle } from 'lucide-react';

interface QuestionCardProps {
  content: QuestionContent;
  onClick?: () => void;
}

// 模拟答案/评论数据
const mockAnswers: Array<{
  author: string;
  authorAvatar?: string;
  content: string;
  time: string;
}> = [
  {
    author: '学习培养',
    authorAvatar: '/image/avatar/学习培养.jpg',
    content: '关于自主学习,千万别直接催!我们是每天留10分钟让孩子自己安排,做完让他自己说"今天我先搞定了薄弱项",慢慢就有主动意识了~',
    time: '1小时',
  },
];

export default function QuestionCard({ content, onClick: _onClick }: QuestionCardProps) {
  const hashtag = content.tags.find(tag => tag.name.startsWith('#'));
  const hasAnswer = Math.random() > 0.5; // 随机显示答案

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm active:shadow-md transition-shadow cursor-pointer touch-manipulation">
      <div className="p-4">
        {/* 用户信息和更多按钮 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {content.authorAvatar && (
              <img
                src={content.authorAvatar}
                alt={content.author}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <div>
              <div className="text-sm font-medium text-gray-900">{content.author}</div>
              <div className="text-xs text-gray-500">1小时</div>
            </div>
          </div>
          <button className="p-1">
            <MoreVertical size={18} className="text-gray-400" />
          </button>
        </div>

        {/* 问题内容 */}
        <div className="mb-3">
          <p className="text-sm text-gray-900 leading-relaxed mb-2">
            {content.title}
          </p>
          
          {/* 图片（如果有） */}
          {content.cover && (
            <div className="flex gap-2 mb-2">
              <img
                src={content.cover}
                alt="问题图片"
                className="w-20 h-20 rounded object-cover"
              />
            </div>
          )}

          {/* 标签 */}
          {hashtag && (
            <div className="mb-2">
              <span className="text-xs text-blue-600">{hashtag.name}</span>
            </div>
          )}
        </div>

        {/* 反应 */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Smile size={16} className="text-gray-400" />
            <span className="text-xs text-gray-600">4</span>
          </div>
          <div className="flex items-center gap-1">
            <Lightbulb size={16} className="text-gray-400" />
            <span className="text-xs text-gray-600">1</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertCircle size={16} className="text-gray-400" />
            <span className="text-xs text-gray-600">2</span>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center gap-4 pb-3 border-b border-gray-100">
          <button className="flex items-center gap-1 text-xs text-gray-600">
            <Heart size={14} />
            <span>点赞</span>
          </button>
          <button className="flex items-center gap-1 text-xs text-gray-600">
            <MessageCircle size={14} />
            <span>评论</span>
          </button>
          <button className="flex items-center gap-1 text-xs text-gray-600">
            <Share2 size={14} />
            <span>分享</span>
          </button>
        </div>

        {/* 答案/评论 */}
        {hasAnswer && mockAnswers.length > 0 && (
          <div className="mt-3 pl-3 border-l-2 border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              {mockAnswers[0].authorAvatar && (
                <img
                  src={mockAnswers[0].authorAvatar}
                  alt={mockAnswers[0].author}
                  className="w-6 h-6 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <span className="text-xs font-medium text-gray-900">{mockAnswers[0].author}</span>
              <span className="text-xs text-gray-500">{mockAnswers[0].time}</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              {mockAnswers[0].content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

