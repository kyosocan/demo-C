import { useState } from 'react';
import { X, Search, Clock, TrendingUp, Flame } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
}

// 热门搜索
const hotSearches = [
  { id: 1, text: '三年级数学期末试卷', hot: true },
  { id: 2, text: '小学语文阅读理解技巧', hot: true },
  { id: 3, text: '英语单词记忆方法' },
  { id: 4, text: '奥数思维训练' },
  { id: 5, text: '作文素材积累' },
  { id: 6, text: '古诗词背诵' },
];

// 搜索历史
const searchHistory = [
  '上海小升初政策',
  '四年级计算题',
  '阅读理解答题模板',
];

// 猜你想搜
const suggestions = [
  { id: 1, text: '2025年上海各区期末试卷汇总', count: '1.2w人在搜' },
  { id: 2, text: '小学1-6年级必背古诗词', count: '8562人在搜' },
  { id: 3, text: '青春期孩子沟通技巧', count: '5231人在搜' },
];

export default function SearchModal({ isOpen, onClose, value, onChange }: SearchModalProps) {
  const [searchValue, setSearchValue] = useState(value);

  const handleSubmit = () => {
    onChange(searchValue);
    onClose();
  };

  const handleTagClick = (text: string) => {
    setSearchValue(text);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* 搜索栏 */}
      <div className="sticky top-0 bg-white border-b border-gray-100">
        <div className="flex items-center px-4 py-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="搜索资料、问题、学习集..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              autoFocus
              className="w-full pl-10 pr-3 py-2.5 text-base bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FB2628]/20"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="ml-3 px-4 py-2 text-[#FB2628] font-medium touch-manipulation"
          >
            搜索
          </button>
          <button
            onClick={onClose}
            className="ml-1 text-gray-400 active:text-gray-600 touch-manipulation p-1"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* 搜索历史 */}
        {searchHistory.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-700">搜索历史</span>
              </div>
              <button className="text-xs text-gray-400">清空</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleTagClick(item)}
                  className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 active:bg-gray-200 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 热门搜索 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-[#FB2628]" />
            <span className="text-sm font-medium text-gray-700">热门搜索</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {hotSearches.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTagClick(item.text)}
                className={`px-3 py-1.5 rounded-full text-sm active:opacity-80 transition-colors flex items-center gap-1 ${
                  item.hot 
                    ? 'bg-[#FB2628]/10 text-[#FB2628]' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {item.hot && <Flame size={12} />}
                {item.text}
              </button>
            ))}
          </div>
        </div>

        {/* 猜你想搜 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Search size={16} className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700">猜你想搜</span>
          </div>
          <div className="space-y-2">
            {suggestions.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleTagClick(item.text)}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl active:bg-gray-100 transition-colors"
              >
                <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                  index === 0 ? 'bg-[#FB2628] text-white' :
                  index === 1 ? 'bg-orange-500 text-white' :
                  'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </span>
                <div className="flex-1 text-left">
                  <div className="text-sm text-gray-800">{item.text}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{item.count}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 搜索提示 */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-400">
            试试搜索「期末试卷」「学习方法」「育儿经验」
          </p>
        </div>
      </div>
    </div>
  );
}

