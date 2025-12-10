import { ArrowLeft, Send, Lock } from 'lucide-react';
import { useState } from 'react';
import { Teacher, ConsultationMessage } from '../types';
import StatusBar from './StatusBar';
import { getImageUrl } from '../utils/imageUtils';

interface ConsultationPageProps {
  teacher: Teacher;
  onBack: () => void;
  onPayment?: () => void;
}

export default function ConsultationPage({
  teacher,
  onBack,
  onPayment,
}: ConsultationPageProps) {
  const [messages, setMessages] = useState<ConsultationMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [hasPaid, setHasPaid] = useState(false); // 是否已付费

  const handleSend = () => {
    if (!inputText.trim()) return;

    if (!hasPaid) {
      // 如果未付费,先提示支付
      handlePayment();
      return;
    }

    // 添加用户消息
    const newMessage: ConsultationMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setInputText('');

    // 模拟老师回复(实际应该通过API获取)
    setTimeout(() => {
      const reply: ConsultationMessage = {
        id: (Date.now() + 1).toString(),
        type: 'teacher',
        content: '感谢您的提问,我会尽快为您解答。',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  const handlePayment = () => {
    // 模拟支付流程
    if (window.confirm(`确认支付 ¥${teacher.consultationPrice} 进行咨询?`)) {
      setHasPaid(true);
      onPayment?.();
      // 这里可以调用实际的支付API
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 状态栏 */}
      <StatusBar />

      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
        <button
          onClick={onBack}
          className="touch-manipulation p-1"
        >
          <ArrowLeft size={20} className="text-gray-900" />
        </button>
        <div className="flex items-center gap-2">
          <img
            src={getImageUrl(teacher.avatar)}
            alt={teacher.name}
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getImageUrl('/image/avatar/我在魔都汇.png');
            }}
          />
          <span className="text-base font-semibold text-gray-900">
            {teacher.name}
          </span>
        </div>
        <div className="w-8" />
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {!hasPaid && messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center border border-gray-200">
              <Lock size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                付费答疑
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                支付 ¥{teacher.consultationPrice} 后，您可以向老师提问任何学习相关的问题，老师会为您详细解答
              </p>
              <button
                onClick={handlePayment}
                className="w-full bg-red-500 text-white py-2.5 px-6 rounded-lg font-medium text-sm active:bg-red-600 transition-colors touch-manipulation"
              >
                立即支付开始答疑
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-900'
                  }`}
                >
                  {message.type === 'teacher' && (
                    <div className="flex items-center gap-2 mb-1">
                      <img
                        src={getImageUrl(teacher.avatar)}
                        alt={teacher.name}
                        className="w-5 h-5 rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getImageUrl('/image/avatar/我在魔都汇.png');
                        }}
                      />
                      <span className="text-xs font-medium">{teacher.name}</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 输入栏 */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 sticky bottom-0">
        {!hasPaid ? (
          <button
            onClick={handlePayment}
            className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-medium text-sm active:bg-red-600 transition-colors touch-manipulation"
          >
            支付 ¥{teacher.consultationPrice} 开始答疑
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
              placeholder="输入孩子学习相关的问题..."
              className="flex-1 bg-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:bg-gray-200 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="bg-red-500 text-white p-2.5 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed active:bg-red-600 transition-colors touch-manipulation"
            >
              <Send size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

