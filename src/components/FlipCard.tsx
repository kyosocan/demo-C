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
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl border-2 border-blue-200 p-8 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-4 font-medium">术语</div>
            <div className="text-2xl font-bold text-gray-900 mb-6">
              {card.term}
            </div>
          </div>
          <div className="absolute bottom-6 flex items-center gap-2 text-sm text-gray-500">
            <RotateCw className="w-4 h-4" />
            <span>点击翻转</span>
          </div>
        </div>

        {/* 背面 - 定义 */}
        <div
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl border-2 border-purple-200 p-8 flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-4 font-medium">定义</div>
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
          <div className="absolute bottom-6 flex items-center gap-2 text-sm text-gray-500">
            <RotateCw className="w-4 h-4" />
            <span>点击翻转</span>
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

