import { ArrowLeft, Trash2, Play, Bell as BellIcon } from 'lucide-react';
import StatusBar from './StatusBar';

interface MessageItem {
  id: string;
  icon: 'course' | 'notification';
  title: string;
  description: string;
  source: string;
  date: string;
}

interface MessageCenterProps {
  onBack: () => void;
}

const mockMessages: MessageItem[] = [
  {
    id: '1',
    icon: 'notification',
    title: '你的帖子获得了精选推荐',
    description: '恭喜！你发布的《魔都1-5年级数学资料汇总》被选为本周精选内容，快去看看吧~',
    source: '来自社区',
    date: '12月3日',
  },
  {
    id: '2',
    icon: 'notification',
    title: '猫老师妈妈 赞了你的帖子',
    description: '猫老师妈妈 赞了你的《魔都1-5年级数学资料汇总》，来看看TA的主页吧',
    source: '来自社区',
    date: '12月2日',
  },
  {
    id: '3',
    icon: 'notification',
    title: '清华徐爸爸 收藏了你的资料',
    description: '清华徐爸爸 收藏了你分享的《三年级思维训练题集》，你的分享很有价值哦！',
    source: '来自社区',
    date: '12月1日',
  },
  {
    id: '4',
    icon: 'notification',
    title: '有人评论了你的帖子',
    description: '教育达人小李 评论了你的《魔都1-5年级数学资料汇总》："太实用了，感谢分享！"',
    source: '来自社区',
    date: '11月30日',
  },
  {
    id: '5',
    icon: 'notification',
    title: '新增粉丝',
    description: '学习助手、魔都家长 等3位用户关注了你，快去打个招呼吧~',
    source: '来自社区',
    date: '11月28日',
  },
];

export default function MessageCenter({ onBack }: MessageCenterProps) {
  const getIcon = (iconType: 'course' | 'notification') => {
    if (iconType === 'course') {
      return (
        <div className="w-12 h-12 rounded-full bg-[#FB2628] flex flex-col items-center justify-center flex-shrink-0 relative">
          <Play size={16} className="text-white mb-0.5" />
          <span className="text-white text-[10px] leading-tight">课程</span>
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-full bg-[#FB2628] flex items-center justify-center flex-shrink-0">
        <BellIcon size={20} className="text-white" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 状态栏 */}
      <StatusBar />
      
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
            <span className="text-base font-medium text-gray-900">消息中心</span>
          </div>
          <button className="touch-manipulation p-1">
            <Trash2 size={20} className="text-gray-900" />
          </button>
        </div>
      </div>

      {/* 消息列表 */}
      <div className="px-4 py-4">
        <div className="space-y-0">
          {mockMessages.map((message, index) => (
            <div
              key={message.id}
              className={`py-4 ${index < mockMessages.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="flex items-start gap-3">
                {/* 图标 */}
                <div className="relative">
                  {getIcon(message.icon)}
                  {message.icon === 'course' && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-white text-[10px] whitespace-nowrap">
                      课程
                    </span>
                  )}
                </div>
                
                {/* 消息内容 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-medium text-gray-900 flex-1">
                      {message.title}
                    </h3>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {message.date}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-1">
                    {message.description}
                  </p>
                  <span className="text-xs text-gray-400">
                    {message.source}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

