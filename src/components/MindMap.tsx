import { useState } from 'react';
import { FlashCard } from '../types';
import { ArrowLeft, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface MindMapProps {
  cards: FlashCard[];
  title: string;
  onBack: () => void;
}

export default function MindMap({ cards, title, onBack }: MindMapProps) {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleReset = () => {
    setScale(1);
  };

  // 根据卡片数量智能分组
  const groupCards = () => {
    const groups: FlashCard[][] = [];
    const groupSize = Math.ceil(cards.length / 4); // 分成4个主要分支
    
    for (let i = 0; i < cards.length; i += groupSize) {
      groups.push(cards.slice(i, i + groupSize));
    }
    
    return groups;
  };

  const cardGroups = groupCards();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* 头部 */}
      <div className="bg-white shadow-sm sticky top-0 z-10 px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
          <h2 className="text-lg font-bold text-gray-900">思维导图</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="缩小"
            >
              <ZoomOut className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleReset}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="重置"
            >
              <Maximize2 className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="放大"
            >
              <ZoomIn className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center">💡 可以用双指缩放或使用控制按钮</p>
      </div>

      {/* 思维导图内容 */}
      <div className="overflow-auto p-8">
        <div
          className="inline-block min-w-full"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            transition: 'transform 0.3s ease',
          }}
        >
          {/* 中心节点 */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* 中心主题 */}
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl px-8 py-6 shadow-2xl border-4 border-white mb-12">
                <h3 className="text-2xl font-bold text-white text-center whitespace-nowrap">
                  {title}
                </h3>
                <div className="text-sm text-white/90 text-center mt-2">
                  {cards.length} 个知识点
                </div>
              </div>

              {/* 主要分支 */}
              <div className="grid grid-cols-2 gap-x-24 gap-y-16">
                {cardGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="relative">
                    {/* 分支连接线 */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-purple-300 to-transparent" />
                    
                    {/* 分支主节点 */}
                    <div className={`rounded-2xl px-6 py-4 shadow-lg mb-6 bg-gradient-to-br ${
                      groupIndex === 0 ? 'from-blue-400 to-blue-500' :
                      groupIndex === 1 ? 'from-green-400 to-green-500' :
                      groupIndex === 2 ? 'from-orange-400 to-orange-500' :
                      'from-pink-400 to-pink-500'
                    }`}>
                      <div className="text-white font-semibold text-center">
                        分支 {groupIndex + 1}
                      </div>
                    </div>

                    {/* 子节点 */}
                    <div className="space-y-4 pl-8">
                      {group.map((card, cardIndex) => (
                        <div key={card.id} className="relative">
                          {/* 连接线 */}
                          <div className={`absolute -left-8 top-1/2 w-8 h-0.5 ${
                            groupIndex === 0 ? 'bg-blue-300' :
                            groupIndex === 1 ? 'bg-green-300' :
                            groupIndex === 2 ? 'bg-orange-300' :
                            'bg-pink-300'
                          }`} />
                          
                          {/* 卡片节点 */}
                          <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all cursor-pointer border-2 border-gray-100 hover:border-purple-300">
                            <div className="flex items-start gap-3">
                              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                                groupIndex === 0 ? 'bg-blue-500' :
                                groupIndex === 1 ? 'bg-green-500' :
                                groupIndex === 2 ? 'bg-orange-500' :
                                'bg-pink-500'
                              }`}>
                                {groupIndex * Math.ceil(cards.length / 4) + cardIndex + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-gray-900 mb-1">
                                  {card.term}
                                </div>
                                <div className="text-xs text-gray-600 line-clamp-2">
                                  {card.definition}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部提示 */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <p className="text-sm text-gray-700">
            🎯 思维导图帮助理清知识脉络，建立知识体系
          </p>
        </div>
      </div>
    </div>
  );
}

