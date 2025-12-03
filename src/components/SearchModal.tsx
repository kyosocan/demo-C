import { useState } from 'react';
import { X, Search, Clock, ChevronLeft, Heart, ChevronUp, RotateCcw } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
}

// 搜索历史
const searchHistory = [
  '上海小升初政策',
  '四年级计算题',
  '阅读理解答题模板',
];

// 排序依据选项
const sortOptions = ['综合', '最新', '最多点赞', '最多评论', '最多收藏'];

// 模拟搜索结果数据
const mockSearchResults = [
  {
    id: '1',
    type: 'text' as const,
    bgColor: 'bg-pink-50',
    title: '小学数学怎么学？',
    quote: true,
    description: '新学期，怎么打牢咱娃数学基础？新学期开始了，小...',
    author: '蒜苗1916',
    authorAvatar: '/image/avatar/我在魔都汇.png',
    date: '10-26',
    likes: 679,
  },
  {
    id: '2',
    type: 'colorful' as const,
    bgColors: ['bg-lime-200', 'bg-green-400'],
    title: '一年级',
    subtitle: '《数学思维题》',
    tagline: '练完，全班第一 🏅',
    footer: '电子版 可打印',
    description: '数学老师推荐的一年级数学思维题训练合集 🔥一年...',
    author: '余老师爱分享',
    authorAvatar: '/image/avatar/猫老师妈妈.png',
    date: '6天前',
    likes: 3337,
  },
  {
    id: '3',
    type: 'text' as const,
    bgColor: 'bg-white',
    title: '姐妹们\n避雷xhs上\n卖资料的',
    highlight: '避雷',
    description: '避雷！姐妹们不要在 xhs 上买课件了！！！是的 大冤...',
    author: '学习达人',
    authorAvatar: '/image/avatar/清华徐爸爸.png',
    date: '3天前',
    likes: 1205,
  },
  {
    id: '4',
    type: 'gradient' as const,
    bgColor: 'bg-gradient-to-b from-pink-50 to-white',
    lines: [
      { text: '其实，一年级', color: 'text-gray-800' },
      { text: '数学思维', color: 'text-gray-800' },
      { text: '无非就这40道题', color: 'text-yellow-500', highlight: true },
    ],
    description: '汇总 🌈 小学数学一年级数学思维训练拓展题 🌈 这份...',
    author: '教育专家',
    authorAvatar: '/image/avatar/我在魔都汇.png',
    date: '昨天',
    likes: 2891,
  },
  {
    id: '5',
    type: 'text' as const,
    bgColor: 'bg-blue-50',
    title: '三年级数学\n思维训练题\n精选100道',
    description: '三年级是数学思维培养的关键期，这100道精选题...',
    author: '数学老师',
    authorAvatar: '/image/avatar/猫老师妈妈.png',
    date: '2天前',
    likes: 1856,
  },
  {
    id: '6',
    type: 'colorful' as const,
    bgColors: ['bg-orange-100', 'bg-yellow-200'],
    title: '语文',
    subtitle: '阅读理解答题模板',
    tagline: '提分必备 📚',
    footer: '打印版 + 电子版',
    description: '小学语文阅读理解万能答题模板，背会这些套路...',
    author: '语文王老师',
    authorAvatar: '/image/avatar/清华徐爸爸.png',
    date: '5天前',
    likes: 4521,
  },
];

// 搜索结果卡片组件
function SearchResultCard({ result }: { result: typeof mockSearchResults[0] }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      {/* 卡片封面 */}
      <div className={`relative aspect-[4/5] ${result.type === 'colorful' ? '' : result.bgColor} overflow-hidden`}>
        {result.type === 'text' && (
          <div className="p-4 h-full flex flex-col justify-center">
            {result.quote && (
              <div className="text-4xl text-gray-300 font-serif mb-2">"</div>
            )}
            <div className="text-xl font-bold text-gray-800 whitespace-pre-line leading-tight">
              {result.title?.split(result.highlight || '').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="bg-yellow-300 px-0.5 rounded">{result.highlight}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {result.type === 'colorful' && (
          <div className="h-full flex">
            <div className={`flex-1 ${result.bgColors?.[0]} p-3 flex flex-col justify-center`}>
              {/* 空白区域 */}
            </div>
            <div className={`flex-1 ${result.bgColors?.[1]} p-3 flex flex-col justify-center items-center text-center`}>
              <div className="text-xl font-bold text-gray-800 mb-1">{result.title}</div>
              <div className="border-b-2 border-dashed border-gray-600 w-16 mb-2"></div>
              <div className="text-base font-bold text-gray-800 mb-2">{result.subtitle}</div>
              <div className="text-sm font-medium text-gray-700 mb-2">{result.tagline}</div>
              <div className="text-xs text-gray-600 mt-auto">{result.footer}</div>
            </div>
          </div>
        )}
        
        {result.type === 'gradient' && (
          <div className={`p-4 h-full flex flex-col justify-center ${result.bgColor}`}>
            {result.lines?.map((line, i) => (
              <div 
                key={i} 
                className={`text-lg font-bold ${line.color} ${line.highlight ? 'underline decoration-wavy decoration-yellow-400' : ''}`}
              >
                {line.text}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* 卡片内容 */}
      <div className="p-3">
        <p className="text-sm text-gray-800 line-clamp-2 mb-2">{result.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={getImageUrl(result.authorAvatar)} 
              alt={result.author}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="text-xs text-gray-500">{result.author}</span>
            <span className="text-xs text-gray-400">{result.date}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Heart size={14} />
            <span className="text-xs">{result.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchModal({ isOpen, onClose, value, onChange }: SearchModalProps) {
  const [searchValue, setSearchValue] = useState(value);
  const [showResults, setShowResults] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeSort, setActiveSort] = useState('综合');

  const handleSubmit = () => {
    if (searchValue.trim()) {
      setShowResults(true);
      onChange(searchValue);
    }
  };

  const handleTagClick = (text: string) => {
    setSearchValue(text);
    setShowResults(true);
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
      setShowFilterPanel(false);
    } else {
      onClose();
    }
  };

  const handleClear = () => {
    setSearchValue('');
    setShowResults(false);
  };

  const handleResetFilter = () => {
    setActiveSort('综合');
  };

  const handleToggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  if (!isOpen) return null;

  // 搜索结果页
  if (showResults) {
    return (
      <div className="fixed inset-0 bg-[#1a1a1a] z-50 flex flex-col">
        {/* 顶部搜索栏 */}
        <div className="bg-[#1a1a1a] pt-2 pb-3 px-4">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="text-white p-1">
              <ChevronLeft size={24} />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full pl-9 pr-8 py-2 text-sm bg-[#333] text-white rounded-full focus:outline-none placeholder-gray-500"
              />
              {searchValue && (
                <button 
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button onClick={handleSubmit} className="text-white text-sm font-medium">
              搜索
            </button>
          </div>
        </div>

        {/* 筛选按钮 */}
        <div className="bg-[#1a1a1a] px-4 py-2">
          <button
            onClick={handleToggleFilterPanel}
            className={`text-sm whitespace-nowrap pb-2 border-b-2 transition-colors ${
              showFilterPanel 
                ? 'text-white border-[#FB2628] font-medium' 
                : 'text-white border-[#FB2628] font-medium'
            }`}
          >
            全部
            <span className="ml-1 text-gray-500">≡</span>
          </button>
        </div>

        {/* 筛选面板 */}
        {showFilterPanel && (
          <div className="bg-[#1a1a1a] px-4 pb-4 border-b border-gray-700">
            {/* 排序依据 */}
            <div className="mb-4">
              <div className="text-xs text-gray-400 mb-3">排序依据</div>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setActiveSort(option)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      activeSort === option 
                        ? 'bg-transparent border border-[#FB2628] text-[#FB2628]' 
                        : 'bg-[#333] text-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* 底部操作栏 */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
              <button 
                onClick={handleResetFilter}
                className="flex items-center gap-1 text-gray-400 text-sm"
              >
                <RotateCcw size={14} />
                重置
              </button>
              <button 
                onClick={() => setShowFilterPanel(false)}
                className="flex items-center gap-1 text-gray-400 text-sm"
              >
                <ChevronUp size={14} />
                收起
              </button>
            </div>
          </div>
        )}

        {/* 搜索结果列表 */}
        <div className="flex-1 bg-[#1a1a1a] overflow-y-auto px-2 pb-4">
          <div className="grid grid-cols-2 gap-2">
            {mockSearchResults.map((result) => (
              <SearchResultCard key={result.id} result={result} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 搜索首页
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* 搜索栏 */}
      <div className="sticky top-0 bg-white border-b border-gray-100">
        <div className="flex items-center px-4 py-3">
          <button onClick={onClose} className="text-gray-600 p-1 mr-2">
            <ChevronLeft size={22} />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="搜索资料、问题、学习集..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              autoFocus
              className="w-full pl-10 pr-8 py-2.5 text-base bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FB2628]/20"
            />
            {searchValue && (
              <button 
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="ml-3 px-4 py-2 text-[#FB2628] font-medium touch-manipulation"
          >
            搜索
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
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
      </div>
    </div>
  );
}

