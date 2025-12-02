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
    icon: 'course',
    title: '学习周报生成',
    description: '全面了解宝贝本周的学习效果,领取下周查漏补缺智能定制学习方案',
    source: '来自学习机',
    date: '11月23日',
  },
  {
    id: '2',
    icon: 'notification',
    title: '学生开始写作业啦',
    description: '学生进入了作业空间写作业,快来看看吧',
    source: '来自学习机',
    date: '11月18日',
  },
  {
    id: '3',
    icon: 'notification',
    title: '学生完成了一项作业',
    description: '学生在作业空间完成了一项作业,快来看看吧',
    source: '来自学习机',
    date: '11月18日',
  },
  {
    id: '4',
    icon: 'notification',
    title: '学生开始写作业啦',
    description: '学生进入了作业空间写作业,快来看看吧',
    source: '来自学习机',
    date: '11月18日',
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

