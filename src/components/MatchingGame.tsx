import { useState, useEffect } from 'react';
import { FlashCard } from '../types';
import { Check, Trophy, Timer, RotateCcw } from 'lucide-react';

interface MatchingGameProps {
  cards: FlashCard[];
  onBack: () => void;
}

interface GameCard {
  id: string;
  content: string;
  type: 'term' | 'definition';
  originalId: string;
  isMatched: boolean;
}

export default function MatchingGame({ cards, onBack }: MatchingGameProps) {
  const [gameCards, setGameCards] = useState<GameCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<GameCard[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // 初始化游戏
  useEffect(() => {
    initGame();
  }, [cards]);

  // 计时器
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isTimerRunning && !isGameComplete) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isGameComplete]);

  const initGame = () => {
    // 只取前6个卡片
    const gameDeck = cards.slice(0, 6);
    
    const newGameCards: GameCard[] = [];
    gameDeck.forEach((card) => {
      newGameCards.push({
        id: `${card.id}-term`,
        content: card.term,
        type: 'term',
        originalId: card.id,
        isMatched: false,
      });
      newGameCards.push({
        id: `${card.id}-def`,
        content: card.definition,
        type: 'definition',
        originalId: card.id,
        isMatched: false,
      });
    });

    // 打乱顺序
    const shuffled = newGameCards.sort(() => Math.random() - 0.5);
    setGameCards(shuffled);
    setSelectedCards([]);
    setMatchedCount(0);
    setAttempts(0);
    setTimeElapsed(0);
    setIsGameComplete(false);
    setIsTimerRunning(true);
  };

  const handleCardClick = (card: GameCard) => {
    if (card.isMatched || selectedCards.find((c) => c.id === card.id)) {
      return;
    }

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setAttempts((prev) => prev + 1);
      
      // 检查是否匹配
      if (
        newSelected[0].originalId === newSelected[1].originalId &&
        newSelected[0].type !== newSelected[1].type
      ) {
        // 匹配成功
        setTimeout(() => {
          setGameCards((prev) =>
            prev.map((c) =>
              c.id === newSelected[0].id || c.id === newSelected[1].id
                ? { ...c, isMatched: true }
                : c
            )
          );
          setSelectedCards([]);
          setMatchedCount((prev) => {
            const newCount = prev + 1;
            if (newCount === cards.slice(0, 6).length) {
              setIsGameComplete(true);
              setIsTimerRunning(false);
            }
            return newCount;
          });
        }, 500);
      } else {
        // 匹配失败
        setTimeout(() => {
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCardStyle = (card: GameCard) => {
    const isSelected = selectedCards.find((c) => c.id === card.id);
    
    if (card.isMatched) {
      return 'bg-green-100 border-green-400 text-green-800 opacity-75';
    }
    if (isSelected) {
      return card.type === 'term'
        ? 'bg-blue-100 border-blue-400 text-blue-900 scale-95'
        : 'bg-purple-100 border-purple-400 text-purple-900 scale-95';
    }
    return card.type === 'term'
      ? 'bg-white border-blue-200 hover:border-blue-400 hover:shadow-md'
      : 'bg-white border-purple-200 hover:border-purple-400 hover:shadow-md';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 pb-6">
      {/* 头部 */}
      <div className="bg-white shadow-sm sticky top-0 z-10 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← 返回
          </button>
          <h2 className="text-lg font-bold text-gray-900">配对游戏</h2>
          <button
            onClick={initGame}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RotateCcw className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 游戏统计 */}
        <div className="flex items-center justify-around bg-gray-50 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">
              {formatTime(timeElapsed)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-900">
              {matchedCount}/{cards.slice(0, 6).length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">尝试:</span>
            <span className="text-sm font-medium text-gray-900">{attempts}</span>
          </div>
        </div>
      </div>

      {/* 游戏区域 */}
      <div className="px-4 py-6">
        {/* 说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-900">
            💡 点击卡片，将<span className="font-semibold text-blue-600">术语</span>与对应的
            <span className="font-semibold text-purple-600">定义</span>配对
          </p>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-2 gap-3">
          {gameCards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={card.isMatched}
              className={`p-4 rounded-xl border-2 transition-all min-h-[120px] flex items-center justify-center text-center text-sm font-medium disabled:cursor-not-allowed ${getCardStyle(
                card
              )}`}
            >
              <span className="line-clamp-4">{card.content}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 完成弹窗 */}
      {isGameComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center animate-bounce-in">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">太棒了！</h3>
            <p className="text-gray-600 mb-6">你完成了配对游戏</p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">用时:</span>
                <span className="font-semibold text-gray-900">
                  {formatTime(timeElapsed)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">尝试次数:</span>
                <span className="font-semibold text-gray-900">{attempts}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">准确率:</span>
                <span className="font-semibold text-green-600">
                  {((matchedCount / attempts) * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={initGame}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                再玩一次
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-3 bg-gray-200 text-gray-900 font-semibold rounded-xl hover:bg-gray-300 transition-all"
              >
                返回
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

