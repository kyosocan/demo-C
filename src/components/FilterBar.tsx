import { FilterOptions } from '../types';
import { tagCategories } from '../data/mockData';
import { ChevronDown } from 'lucide-react';

interface FilterBarProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
  onFilterClick: () => void;
}

export default function FilterBar({ filters, onFilterClick }: FilterBarProps) {
  // 获取已选标签的名称
  const getSelectedTagNames = () => {
    if (!filters.tags || filters.tags.length === 0) {
      return [];
    }
    const allTags = tagCategories.flatMap((cat) => cat.tags);
    return filters.tags
      .map((tagId) => allTags.find((tag) => tag.id === tagId)?.name)
      .filter(Boolean) as string[];
  };

  const selectedNames = getSelectedTagNames();

  return (
    <div className="mb-3">
      {/* 筛选按钮行 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-2 px-2">
        <button
          onClick={onFilterClick}
          className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 active:bg-gray-50 touch-manipulation whitespace-nowrap"
        >
          <span>筛选</span>
          <ChevronDown size={16} />
        </button>

        {/* 显示已选标签 */}
        {selectedNames.length > 0 && (
          <div className="flex items-center gap-2 flex-1 overflow-x-auto">
            {selectedNames.slice(0, 3).map((name, index) => (
              <span
                key={index}
                className="px-2.5 py-1 rounded-full text-xs text-gray-600 bg-gray-100 whitespace-nowrap"
              >
                {name}
              </span>
            ))}
            {selectedNames.length > 3 && (
              <span className="text-xs text-gray-400">
                +{selectedNames.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
