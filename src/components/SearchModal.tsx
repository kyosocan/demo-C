import { useState } from 'react';
import { X, Search } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchModal({ isOpen, onClose, value, onChange }: SearchModalProps) {
  const [searchValue, setSearchValue] = useState(value);

  const handleSubmit = () => {
    onChange(searchValue);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="flex items-center px-4 py-3 border-b">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜索资料、问题..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            autoFocus
            className="w-full pl-10 pr-3 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="ml-2 px-4 py-2 text-pink-500 font-medium touch-manipulation"
        >
          搜索
        </button>
        <button
          onClick={onClose}
          className="ml-2 text-gray-400 active:text-gray-600 touch-manipulation p-1"
        >
          <X size={24} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500">输入关键词搜索相关内容</p>
      </div>
    </div>
  );
}

