import { useState } from 'react';
import { StudySetContent } from '../types';
import {
  ArrowLeft,
  BookOpen,
  Users,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Star,
  Gamepad2,
  Brain,
  Zap,
  Smartphone,
  Check,
  X,
  Network,
  Presentation,
} from 'lucide-react';
import FlipCard from './FlipCard';
import MatchingGame from './MatchingGame';
import QuizGame from './QuizGame';
import MindMap from './MindMap';
import PPTViewer from './PPTViewer';

interface StudySetDetailProps {
  content: StudySetContent;
  onBack: () => void;
}

export default function StudySetDetail({
  content,
  onBack,
}: StudySetDetailProps) {
  const [gameMode, setGameMode] = useState<'flashcard' | 'matching' | 'quiz' | 'mindmap' | 'ppt' | null>(null);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [selectedSyncItems, setSelectedSyncItems] = useState<string[]>(['flashcard', 'matching', 'quiz', 'mindmap', 'ppt']);
  
  // 闪卡相关状态
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [shuffled, setShuffled] = useState(false);
  const [cards, setCards] = useState(content.cards);

  const handleSyncToDevice = async () => {
    setIsSyncing(true);
    // 模拟同步过程
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSyncing(false);
    setSyncSuccess(true);
    
    // 2秒后关闭成功提示并重置状态
    setTimeout(() => {
      setSyncSuccess(false);
      setShowSyncModal(false);
      // 重置选中项为默认全选
      setSelectedSyncItems(['flashcard', 'matching', 'quiz', 'mindmap', 'ppt']);
    }, 2000);
  };

  const toggleSyncItem = (item: string) => {
    if (selectedSyncItems.includes(item)) {
      setSelectedSyncItems(selectedSyncItems.filter(i => i !== item));
    } else {
      setSelectedSyncItems([...selectedSyncItems, item]);
    }
  };

  const handleCloseSyncModal = () => {
    if (!isSyncing) {
      setShowSyncModal(false);
      setSyncSuccess(false);
      // 重置选中项
      setSelectedSyncItems(['flashcard', 'matching', 'quiz', 'mindmap', 'ppt']);
    }
  };

  // 如果正在游戏模式，显示游戏界面
  if (gameMode === 'matching') {
    return <MatchingGame cards={content.cards} onBack={() => setGameMode(null)} />;
  }

  if (gameMode === 'quiz') {
    return <QuizGame cards={content.cards} onBack={() => setGameMode(null)} />;
  }

  if (gameMode === 'mindmap') {
    return <MindMap cards={content.cards} title={content.title} onBack={() => setGameMode(null)} />;
  }

  if (gameMode === 'ppt') {
    return <PPTViewer cards={content.cards} title={content.title} onBack={() => setGameMode(null)} />;
  }

  // 闪卡模式
  if (gameMode === 'flashcard') {
    const handlePrevious = () => {
      setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
    };

    const handleNext = () => {
      setCurrentCardIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
    };

    const handleShuffle = () => {
      const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
      setCards(shuffledCards);
      setShuffled(true);
      setCurrentCardIndex(0);
    };

    const handleReset = () => {
      setCards(content.cards);
      setShuffled(false);
      setCurrentCardIndex(0);
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="bg-white shadow-sm sticky top-0 z-10 px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setGameMode(null)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← 返回
            </button>
            <h2 className="text-lg font-bold text-gray-900">闪卡学习</h2>
            <button
              onClick={shuffled ? handleReset : handleShuffle}
              className={`p-2 rounded-full transition-colors ${
                shuffled ? 'bg-purple-100' : 'hover:bg-gray-100'
              }`}
            >
              {shuffled ? <Star className="w-5 h-5 text-purple-600" /> : <Shuffle className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
          
          <div className="text-sm font-medium text-gray-700 text-center">
            {currentCardIndex + 1} / {cards.length}
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="h-[400px] mb-6">
            <FlipCard card={cards[currentCardIndex]} />
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevious}
              className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex gap-1">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCardIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentCardIndex
                      ? 'bg-blue-600 w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            💡 提示：点击卡片可以翻转查看答案
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {content.title}
            </h1>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{content.cardCount} 张卡片</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{content.studyCount} 次学习</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 学习方式列表 */}
      <div className="px-4 py-6 space-y-4">
        {/* 家长提示 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">💡 家长提示：</span>选择适合孩子的学习方式，同步到学习机让孩子自主学习
          </p>
        </div>

        {/* 闪卡学习 */}
        <button
          onClick={() => setGameMode('flashcard')}
          className="w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left border border-gray-100"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 mb-1">闪卡学习</h4>
              <p className="text-sm text-gray-600 mb-2">
                翻转卡片学习，逐个掌握知识点
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>🔄 可翻转</span>
                <span>🔀 可打乱</span>
                <span>📖 {content.cardCount} 张卡片</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
          </div>
        </button>

        {/* 配对游戏 */}
        <button
          onClick={() => setGameMode('matching')}
          className="w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left border border-gray-100"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Gamepad2 className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 mb-1">配对游戏</h4>
              <p className="text-sm text-gray-600 mb-2">
                将术语与定义配对，考验记忆力
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>⏱️ 计时挑战</span>
                <span>🎯 准确率统计</span>
                <span>🎮 趣味互动</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
          </div>
        </button>

        {/* 小测验 */}
        <button
          onClick={() => setGameMode('quiz')}
          className="w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left border border-gray-100"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 mb-1">小测验</h4>
              <p className="text-sm text-gray-600 mb-2">
                选择正确答案，检验学习成果
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>📝 选择题</span>
                <span>📊 成绩分析</span>
                <span>🏆 即时反馈</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
          </div>
        </button>

        {/* 思维导图 */}
        <button
          onClick={() => setGameMode('mindmap')}
          className="w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left border border-gray-100"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Network className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 mb-1">思维导图</h4>
              <p className="text-sm text-gray-600 mb-2">
                可视化展示知识结构，理清知识脉络
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>🌳 树状图</span>
                <span>🔍 可缩放</span>
                <span>🎨 多彩分支</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
          </div>
        </button>

        {/* PPT 演示 */}
        <button
          onClick={() => setGameMode('ppt')}
          className="w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left border border-gray-100"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Presentation className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 mb-1">PPT 演示</h4>
              <p className="text-sm text-gray-600 mb-2">
                幻灯片形式展示，适合课堂讲解
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>📽️ 全屏模式</span>
                <span>⏯️ 自动播放</span>
                <span>🎯 演示效果</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
          </div>
        </button>

        {/* 卡片列表 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            全部卡片 ({content.cardCount})
          </h4>
          <div className="space-y-3">
            {content.cards.slice(0, 3).map((card, index) => (
              <div
                key={card.id}
                className="bg-gray-50 rounded-xl p-4"
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">术语</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {card.term}
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="text-xs text-gray-500 mb-0.5">定义</div>
                      <div className="text-xs text-gray-700 line-clamp-2">
                        {card.definition}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {content.cards.length > 3 && (
              <div className="text-center py-2 text-sm text-gray-500">
                还有 {content.cards.length - 3} 张卡片...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部信息 */}
      <div className="px-4 py-6 bg-white border-t border-gray-200 mb-20">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={
              content.authorAvatar ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${content.author}`
            }
            alt={content.author}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <div className="text-sm font-medium text-gray-900">
              {content.author}
            </div>
            <div className="text-xs text-gray-500">{content.createdAt}</div>
          </div>
        </div>

        {content.description && (
          <div className="text-sm text-gray-600 leading-relaxed mb-4">
            {content.description}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {content.tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${tag.color}15`,
                color: tag.color,
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* 固定底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg z-20">
        <div className="max-w-[480px] mx-auto">
          <button
            onClick={() => setShowSyncModal(true)}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Smartphone className="w-5 h-5" />
            <span>同步到学习机</span>
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            将学习集推送到孩子的学习机，让孩子随时学习
          </p>
        </div>
      </div>

      {/* 同步确认模态框 */}
      {showSyncModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 px-4"
          onClick={handleCloseSyncModal}
        >
          <div 
            className="bg-white rounded-t-3xl w-full max-w-[480px] max-h-[85vh] overflow-y-auto pb-8 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {!syncSuccess ? (
              <>
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                  <h3 className="text-xl font-bold text-gray-900">同步到学习机</h3>
                  <button
                    onClick={handleCloseSyncModal}
                    disabled={isSyncing}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="px-6 py-6 space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Smartphone className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm text-gray-600">
                      选择要同步的学习内容到孩子的学习机
                    </p>
                  </div>

                  {/* 学习集信息 */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">学习集：</span>
                      <span className="font-semibold text-gray-900">{content.title}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">卡片数量：</span>
                      <span className="font-semibold text-gray-900">{content.cardCount} 张</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">目标设备：</span>
                      <span className="font-semibold text-gray-900">孩子的学习机</span>
                    </div>
                  </div>

                  {/* 选择同步项目 */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">选择学习方式</h4>
                    <div className="space-y-3">
                      {/* 闪卡学习 */}
                      <label className="flex items-start gap-3 p-4 bg-white border-2 rounded-xl cursor-pointer transition-all hover:border-green-300"
                        style={{
                          borderColor: selectedSyncItems.includes('flashcard') ? '#10b981' : '#e5e7eb'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSyncItems.includes('flashcard')}
                          onChange={() => toggleSyncItem('flashcard')}
                          className="mt-1 w-5 h-5 text-green-600 rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-4 h-4 text-green-600" />
                            <span className="font-semibold text-gray-900">闪卡学习</span>
                          </div>
                          <p className="text-xs text-gray-600">翻转卡片学习，逐个掌握知识点</p>
                        </div>
                      </label>

                      {/* 配对游戏 */}
                      <label className="flex items-start gap-3 p-4 bg-white border-2 rounded-xl cursor-pointer transition-all hover:border-blue-300"
                        style={{
                          borderColor: selectedSyncItems.includes('matching') ? '#3b82f6' : '#e5e7eb'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSyncItems.includes('matching')}
                          onChange={() => toggleSyncItem('matching')}
                          className="mt-1 w-5 h-5 text-blue-600 rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Gamepad2 className="w-4 h-4 text-blue-600" />
                            <span className="font-semibold text-gray-900">配对游戏</span>
                          </div>
                          <p className="text-xs text-gray-600">将术语与定义配对，考验记忆力</p>
                        </div>
                      </label>

                      {/* 小测验 */}
                      <label className="flex items-start gap-3 p-4 bg-white border-2 rounded-xl cursor-pointer transition-all hover:border-purple-300"
                        style={{
                          borderColor: selectedSyncItems.includes('quiz') ? '#a855f7' : '#e5e7eb'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSyncItems.includes('quiz')}
                          onChange={() => toggleSyncItem('quiz')}
                          className="mt-1 w-5 h-5 text-purple-600 rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Brain className="w-4 h-4 text-purple-600" />
                            <span className="font-semibold text-gray-900">小测验</span>
                          </div>
                          <p className="text-xs text-gray-600">选择正确答案，检验学习成果</p>
                        </div>
                      </label>

                      {/* 思维导图 */}
                      <label className="flex items-start gap-3 p-4 bg-white border-2 rounded-xl cursor-pointer transition-all hover:border-indigo-300"
                        style={{
                          borderColor: selectedSyncItems.includes('mindmap') ? '#6366f1' : '#e5e7eb'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSyncItems.includes('mindmap')}
                          onChange={() => toggleSyncItem('mindmap')}
                          className="mt-1 w-5 h-5 text-indigo-600 rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Network className="w-4 h-4 text-indigo-600" />
                            <span className="font-semibold text-gray-900">思维导图</span>
                          </div>
                          <p className="text-xs text-gray-600">可视化知识结构，理清脉络</p>
                        </div>
                      </label>

                      {/* PPT 演示 */}
                      <label className="flex items-start gap-3 p-4 bg-white border-2 rounded-xl cursor-pointer transition-all hover:border-orange-300"
                        style={{
                          borderColor: selectedSyncItems.includes('ppt') ? '#f97316' : '#e5e7eb'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSyncItems.includes('ppt')}
                          onChange={() => toggleSyncItem('ppt')}
                          className="mt-1 w-5 h-5 text-orange-600 rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Presentation className="w-4 h-4 text-orange-600" />
                            <span className="font-semibold text-gray-900">PPT 演示</span>
                          </div>
                          <p className="text-xs text-gray-600">幻灯片展示，适合课堂讲解</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {selectedSyncItems.length === 0 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                      <p className="text-xs text-orange-900">
                        ⚠️ 请至少选择一种学习方式
                      </p>
                    </div>
                  )}

                  {/* 操作按钮 */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleCloseSyncModal}
                      disabled={isSyncing}
                      className="flex-1 py-3 bg-gray-200 text-gray-900 font-semibold rounded-xl hover:bg-gray-300 transition-all disabled:opacity-50"
                    >
                      取消
                    </button>
                    <button
                      onClick={handleSyncToDevice}
                      disabled={isSyncing || selectedSyncItems.length === 0}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSyncing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>同步中...</span>
                        </>
                      ) : (
                        <>
                          <span>确认同步</span>
                          {selectedSyncItems.length > 0 && (
                            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                              {selectedSyncItems.length}项
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="px-6 py-12 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  同步成功！
                </h3>
                <p className="text-gray-600 mb-4">
                  已将 {selectedSyncItems.length} 种学习方式推送到学习机
                </p>
                <p className="text-sm text-gray-500">
                  孩子可以开始学习了 🎉
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>

    </div>
  );
}

