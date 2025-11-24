import { useState, useEffect } from 'react';
import { FlashCard } from '../types';
import { Check, X, Trophy, ChevronRight, RotateCcw } from 'lucide-react';

interface QuizGameProps {
  cards: FlashCard[];
  onBack: () => void;
}

interface QuizQuestion {
  card: FlashCard;
  options: string[];
  correctAnswer: string;
}

export default function QuizGame({ cards, onBack }: QuizGameProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);

  useEffect(() => {
    initQuiz();
  }, [cards]);

  const initQuiz = () => {
    // 生成测验题目
    const quizQuestions: QuizQuestion[] = cards.slice(0, 10).map((card) => {
      // 获取其他卡片作为错误选项
      const otherCards = cards.filter((c) => c.id !== card.id);
      const wrongAnswers = otherCards
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((c) => c.definition);

      // 组合选项并打乱
      const options = [card.definition, ...wrongAnswers].sort(
        () => Math.random() - 0.5
      );

      return {
        card,
        options,
        correctAnswer: card.definition,
      };
    });

    setQuestions(quizQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setIsAnswered(false);
    setCorrectCount(0);
    setIsGameComplete(false);
  };

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer('');
      setIsAnswered(false);
    } else {
      setIsGameComplete(true);
    }
  };

  if (questions.length === 0) {
    return <div className="p-4">加载中...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const getOptionStyle = (option: string) => {
    if (!isAnswered) {
      return 'bg-white border-gray-300 hover:border-purple-400 hover:bg-purple-50';
    }

    if (option === currentQuestion.correctAnswer) {
      return 'bg-green-100 border-green-400 text-green-900';
    }

    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
      return 'bg-red-100 border-red-400 text-red-900';
    }

    return 'bg-gray-100 border-gray-300 opacity-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 pb-6">
      {/* 头部 */}
      <div className="bg-white shadow-sm sticky top-0 z-10 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← 返回
          </button>
          <h2 className="text-lg font-bold text-gray-900">小测验</h2>
          <button
            onClick={initQuiz}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RotateCcw className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 进度条 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              第 {currentQuestionIndex + 1} / {questions.length} 题
            </span>
            <span className="font-semibold text-purple-600">
              {correctCount} 答对
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 问题区域 */}
      {!isGameComplete ? (
        <div className="px-4 py-6 space-y-6">
          {/* 问题卡片 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200">
            <div className="text-sm text-purple-600 font-medium mb-3">
              选择正确的定义
            </div>
            <div className="text-xl font-bold text-gray-900">
              {currentQuestion.card.term}
            </div>
          </div>

          {/* 选项 */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all disabled:cursor-not-allowed ${getOptionStyle(
                    option
                  )}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{option}</p>
                    </div>
                    {isAnswered && isCorrect && (
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 反馈和下一题按钮 */}
          {isAnswered && (
            <div className="space-y-3 animate-fade-in">
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-green-900">
                    太棒了！回答正确 🎉
                  </span>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-red-900">
                      答案错误，继续加油！
                    </span>
                  </div>
                  <div className="text-xs text-red-700 ml-8">
                    正确答案：{currentQuestion.correctAnswer}
                  </div>
                </div>
              )}

              <button
                onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {currentQuestionIndex < questions.length - 1 ? (
                  <>
                    <span>下一题</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                ) : (
                  <span>查看结果</span>
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* 结果页面 */
        <div className="px-4 py-8">
          <div className="bg-white rounded-3xl p-8 text-center shadow-xl">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">测验完成！</h3>
            <p className="text-gray-600 mb-6">来看看你的成绩吧</p>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {Math.round((correctCount / questions.length) * 100)}%
              </div>
              <div className="text-gray-600 text-sm mb-4">准确率</div>
              <div className="text-gray-900 font-semibold">
                {correctCount} / {questions.length} 题正确
              </div>
            </div>

            {/* 评价 */}
            <div className="mb-6">
              {correctCount === questions.length && (
                <p className="text-lg font-medium text-purple-600">
                  完美！你已经完全掌握了 🎉
                </p>
              )}
              {correctCount >= questions.length * 0.8 &&
                correctCount < questions.length && (
                  <p className="text-lg font-medium text-green-600">
                    非常好！继续保持 👍
                  </p>
                )}
              {correctCount >= questions.length * 0.6 &&
                correctCount < questions.length * 0.8 && (
                  <p className="text-lg font-medium text-blue-600">
                    不错！还有进步空间 💪
                  </p>
                )}
              {correctCount < questions.length * 0.6 && (
                <p className="text-lg font-medium text-orange-600">
                  加油！多练习会更好 📚
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={initQuiz}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                再测一次
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
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

