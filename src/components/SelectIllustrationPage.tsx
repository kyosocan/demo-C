import React from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface SelectIllustrationPageProps {
  text: string;
  onBack: () => void;
  onNext: (card: number) => void;
}

// 卡片模板数据
const cardTemplates = [
  { id: 1, name: '基础', bgColor: 'bg-pink-50', icon: null, category: '基础' },
  { id: 2, name: '插图', bgColor: 'bg-white', icon: '🌱', category: '插图' },
  { id: 3, name: '提问', bgColor: 'bg-white', icon: '❓', category: '提问' },
  { id: 4, name: '美漫', bgColor: 'bg-white', icon: '🍟', category: '美漫' },
  { id: 5, name: '清新', bgColor: 'bg-white', icon: '🍠', category: '清新' },
  { id: 6, name: '自然', bgColor: 'bg-white', icon: '🍂', category: '自然' },
];

export default function SelectIllustrationPage({
  text,
  onBack,
  onNext,
}: SelectIllustrationPageProps) {
  const [selectedCard, setSelectedCard] = React.useState(1);

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-base font-semibold text-gray-900">选择配图</h1>
          <div className="w-9" /> {/* 占位 */}
        </div>
      </div>

      {/* 主内容区 */}
      <div className="px-4 pt-6 pb-24">
        {/* 预览卡片 */}
        <div className={`${cardTemplates.find(c => c.id === selectedCard)?.bgColor || 'bg-pink-50'} rounded-3xl p-8 min-h-[400px] flex flex-col justify-center items-center mb-6 shadow-sm border border-gray-100`}>
          <div className="text-6xl text-gray-300 font-serif leading-none mb-4">
            "
          </div>
          <div className="text-3xl font-bold text-gray-800 text-center mb-4">
            {text || '我怎么发小红书'}
          </div>
          <div className="text-pink-300 text-2xl">—</div>
        </div>

        {/* 卡片模板选择 */}
        <div>
          <div className="text-sm text-gray-600 mb-3 px-1">选一个喜欢的卡片</div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {cardTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedCard(template.id)}
                className={`flex-shrink-0 w-32 bg-white rounded-2xl p-4 border-2 transition-all ${
                  selectedCard === template.id
                    ? 'border-gray-800 shadow-md'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="aspect-square flex items-center justify-center mb-2">
                  {template.id === 1 ? (
                    <div className="text-center">
                      <RefreshCw size={24} className="text-gray-600 mx-auto mb-1" />
                      <div className="text-xs text-gray-600">换搭配</div>
                    </div>
                  ) : (
                    <div className="text-4xl">{template.icon}</div>
                  )}
                </div>
                <div className="text-xs text-gray-900 font-medium text-center mb-1 line-clamp-2">
                  {text || '我怎么发小红书'}
                </div>
                <div className="text-xs text-gray-500 text-center">{template.category}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe">
        <div className="max-w-[480px] mx-auto px-4 py-4">
          <button
            onClick={() => onNext(selectedCard)}
            className="w-full bg-red-500 text-white rounded-full py-3.5 text-base font-medium hover:bg-red-600 active:bg-red-700 transition-colors shadow-lg"
          >
            下一步
          </button>
        </div>
      </div>
    </div>
  );
}

