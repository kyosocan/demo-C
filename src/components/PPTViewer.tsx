import { useState } from 'react';
import { FlashCard } from '../types';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, Play, Pause } from 'lucide-react';

interface PPTViewerProps {
  cards: FlashCard[];
  title: string;
  onBack: () => void;
}

export default function PPTViewer({ cards, title, onBack }: PPTViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : cards.length));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < cards.length ? prev + 1 : 0));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  // 自动播放
  useState(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 5000); // 每5秒切换
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  });

  // 生成幻灯片内容
  const slides = [
    // 封面
    {
      type: 'cover',
      content: title,
      subtitle: `共 ${cards.length} 个知识点`,
    },
    // 卡片内容
    ...cards.map((card) => ({
      type: 'content',
      term: card.term,
      definition: card.definition,
    })),
  ];

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* 顶部控制栏 */}
      <div className="absolute top-0 left-0 right-0 bg-black/50 backdrop-blur-sm z-10 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-white hover:text-gray-300 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">返回</span>
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-white text-sm">
              {currentSlide + 1} / {slides.length}
            </span>
            <button
              onClick={toggleAutoPlay}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title={isPlaying ? '暂停' : '自动播放'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="全屏"
            >
              <Maximize2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* 幻灯片内容 */}
      <div className="h-screen flex items-center justify-center p-20">
        <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden relative">
          {currentSlideData.type === 'cover' ? (
            // 封面页
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white p-12">
              <div className="text-center space-y-6">
                <h1 className="text-5xl font-bold mb-4 animate-fade-in">
                  {currentSlideData.content}
                </h1>
                <p className="text-2xl text-white/90 animate-fade-in">
                  {currentSlideData.subtitle}
                </p>
                <div className="mt-12 text-lg text-white/80 animate-fade-in">
                  按空格键或点击箭头开始学习 →
                </div>
              </div>
            </div>
          ) : (
            // 内容页
            <div className="w-full h-full flex flex-col p-12 bg-gradient-to-br from-slate-50 to-gray-100">
              {/* 页面装饰 */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-200 to-green-200 rounded-full opacity-20 -ml-24 -mb-24" />
              
              {/* 内容区 */}
              <div className="flex-1 flex flex-col justify-center relative z-10 max-w-4xl mx-auto w-full">
                {/* 术语 */}
                <div className="mb-12">
                  <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                    术语
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-8">
                    {currentSlideData.term}
                  </h2>
                </div>

                {/* 定义 */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-purple-600">
                  <div className="text-sm text-gray-500 mb-3 font-medium">定义</div>
                  <p className="text-xl text-gray-800 leading-relaxed whitespace-pre-line">
                    {currentSlideData.definition}
                  </p>
                </div>
              </div>

              {/* 页码 */}
              <div className="text-center text-gray-400 text-sm relative z-10">
                第 {currentSlide} 页 / 共 {cards.length} 页
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 导航按钮 */}
      <button
        onClick={handlePrevious}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-20"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-20"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* 进度指示器 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/40 w-2 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

