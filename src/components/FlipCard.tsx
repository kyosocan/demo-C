import { useState } from 'react';
import { FlashCard } from '../types';
import { RotateCw } from 'lucide-react';

interface FlipCardProps {
  card: FlashCard;
}

export default function FlipCard({ card }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full h-full perspective-1000">
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className={`relative w-full h-full transition-all duration-500 transform-style-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* 正面 - 术语 */}
        <div
          className="absolute inset-0 backface-hidden bg-[#FFF5F5] rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 bg-[#FB2628] text-white text-xs rounded">问题</span>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-2">词语</div>
            <div className="text-3xl font-bold text-gray-900">
              {card.term}
            </div>
          </div>
          <div className="absolute bottom-6 text-xs text-gray-500">
            点击翻转查看答案
          </div>
        </div>

        {/* 背面 - 定义 */}
        <div
          className="absolute inset-0 backface-hidden bg-[#FFF5F5] rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 bg-[#FB2628] text-white text-xs rounded">答案</span>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-2">定义</div>
            <div className="text-xl text-gray-900 leading-relaxed">
              {card.definition}
            </div>
            {card.imageUrl && (
              <img
                src={card.imageUrl}
                alt="卡片图片"
                className="mt-6 max-w-full h-auto rounded-lg shadow-md"
              />
            )}
          </div>
          <div className="absolute bottom-6 text-xs text-gray-500">
            点击翻转查看问题
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}

