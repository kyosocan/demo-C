import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';
import { Teacher, ConsultationMessage } from '../types';
import StatusBar from './StatusBar';

interface StudyCompanionPageProps {
  teacher: Teacher;
  onBack: () => void;
  onPayment?: () => void;
}

export default function StudyCompanionPage({
  teacher,
  onBack,
  onPayment,
}: StudyCompanionPageProps) {
  const [messages, setMessages] = useState<ConsultationMessage[]>([
    {
      id: '0',
      type: 'teacher',
      content: `您好！我是${teacher.name}，很高兴为您的孩子提供学习规划服务。\n\n请先告诉我一些孩子的基本信息：\n1. 孩子目前几年级？\n2. 哪些科目比较薄弱？\n3. 目前学习中遇到的主要问题是什么？\n\n了解这些信息后，我会为孩子制定个性化的学习规划。`,
      timestamp: new Date().toISOString(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [hasReceivedPlan, setHasReceivedPlan] = useState(false);
  const [hasStartedTrial, setHasStartedTrial] = useState(false);

  // 模拟老师回复的学习规划
  const generatePlan = (_userMessage: string) => {
    return `感谢您的详细说明！根据您提供的信息，我为孩子制定了以下学习规划：

📋 **学习诊断**
根据您描述的情况，孩子主要需要在基础知识巩固和学习习惯培养两方面加强。

📅 **每周学习计划**
• 周一至周五：每天完成基础练习30分钟
• 周六：知识点回顾与总结
• 周日：预习下周内容

⏰ **伴学提醒**
• 每天19:00 - 学习任务提醒
• 每周日20:00 - 本周学习总结
• 重点知识点会定期推送复习提醒

💡 **学习建议**
1. 建立错题本，及时整理易错点
2. 每天预留15分钟阅读时间
3. 遇到问题随时向我提问

如果您觉得这个规划适合孩子，可以点击下方按钮开始免费体验，我将成为孩子的学管师，持续跟进学习情况。`;
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    // 添加用户消息
    const newMessage: ConsultationMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setInputText('');

    // 模拟老师回复
    setTimeout(() => {
      if (!hasReceivedPlan) {
        // 第一次回复，给出学习规划
        const planMessage: ConsultationMessage = {
          id: (Date.now() + 1).toString(),
          type: 'teacher',
          content: generatePlan(inputText),
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, planMessage]);
        setHasReceivedPlan(true);
      } else {
        // 后续回复
        const reply: ConsultationMessage = {
          id: (Date.now() + 1).toString(),
          type: 'teacher',
          content: '好的，我会根据您的反馈调整学习计划。有任何问题随时和我沟通！',
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, reply]);
      }
    }, 1000);
  };

  const handleStartTrial = () => {
    setHasStartedTrial(true);
    onPayment?.();
    
    // 添加系统消息
    const systemMessage: ConsultationMessage = {
      id: Date.now().toString(),
      type: 'teacher',
      content: `🎉 太好了！您已成功开始免费体验！\n\n我现在是孩子的学管师，接下来我会：\n• 每天发送学习任务提醒\n• 定期检查学习进度\n• 解答学习过程中的疑问\n\n体验期间，您可以随时和我沟通孩子的学习情况。体验满意后，可以选择付费继续服务（¥${teacher.companionPrice}/月）。`,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, systemMessage]);
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
            src={teacher.avatar}
            alt={teacher.name}
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/image/avatar/我在魔都汇.png';
            }}
          />
          <span className="text-base font-semibold text-gray-900">
            {teacher.name} - 规划伴学
          </span>
        </div>
        <div className="w-8" />
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-40">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-900 shadow-sm'
                }`}
              >
                {message.type === 'teacher' && (
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={teacher.avatar}
                      alt={teacher.name}
                      className="w-5 h-5 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/image/avatar/我在魔都汇.png';
                      }}
                    />
                    <span className="text-xs font-medium text-gray-600">{teacher.name}</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                  {message.content}
                </p>
                <span className={`text-xs mt-2 block ${message.type === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                  {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部操作区 */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 sticky bottom-0">
        {/* 免费体验按钮 */}
        {hasReceivedPlan && !hasStartedTrial && (
          <button
            onClick={handleStartTrial}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium text-sm mb-3 active:opacity-90 transition-opacity touch-manipulation"
          >
            开始免费体验并添加对方为学管师
          </button>
        )}
        
        {/* 已开始体验的提示 */}
        {hasStartedTrial && (
          <div className="bg-green-50 text-green-700 text-xs py-2 px-3 rounded-lg mb-3 text-center">
            ✓ 已开始免费体验，{teacher.name}已成为您的学管师
          </div>
        )}

        {/* 输入框 */}
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
            placeholder="输入孩子的学习情况..."
            className="flex-1 bg-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:bg-gray-200 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="bg-blue-500 text-white p-2.5 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed active:bg-blue-600 transition-colors touch-manipulation"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
