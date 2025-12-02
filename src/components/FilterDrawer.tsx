import { useState, useEffect } from 'react';
import { tagCategories, gradeTags, subjectTags } from '../data/mockData';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTags: string[];
  selectedGrade?: string;
  selectedSubject?: string;
  onConfirm: (tags: string[], grade?: string, subject?: string) => void;
}

export default function FilterDrawer({ 
  isOpen, 
  onClose, 
  selectedTags, 
  selectedGrade: initialGrade = '全部',
  selectedSubject: initialSubject = '全部',
  onConfirm 
}: FilterDrawerProps) {
  const [tempSelectedTags, setTempSelectedTags] = useState<string[]>(selectedTags);
  const [tempSelectedGrade, setTempSelectedGrade] = useState<string>(initialGrade);
  const [tempSelectedSubject, setTempSelectedSubject] = useState<string>(initialSubject);

  useEffect(() => {
    if (isOpen) {
      setTempSelectedTags(selectedTags);
      setTempSelectedGrade(initialGrade);
      setTempSelectedSubject(initialSubject);
    }
  }, [isOpen, selectedTags, initialGrade, initialSubject]);

  const handleTagToggle = (tagId: string) => {
    setTempSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleReset = () => {
    setTempSelectedTags([]);
    setTempSelectedGrade('全部');
    setTempSelectedSubject('全部');
  };

  const handleConfirm = () => {
    onConfirm(tempSelectedTags, tempSelectedGrade, tempSelectedSubject);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* 抽屉 */}
      <div
        className={`fixed top-0 left-0 right-0 bg-white z-50 rounded-b-2xl shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ maxHeight: '85vh', overflowY: 'auto' }}
      >
        <div className="p-4 space-y-5">
          {/* 年级选择 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">年级</h3>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => setTempSelectedGrade('全部')}
                className={`px-3 py-3 rounded-lg text-sm font-medium transition-all touch-manipulation bg-gray-100 text-gray-700 active:bg-gray-200 ${
                  tempSelectedGrade === '全部'
                    ? 'border-2 border-blue-500'
                    : 'border border-transparent'
                }`}
              >
                全部
              </button>
              {gradeTags.map((tag) => {
                const isSelected = tempSelectedGrade === tag.name;
                return (
                  <button
                    key={tag.id}
                    onClick={() => setTempSelectedGrade(tag.name)}
                    className={`px-3 py-3 rounded-lg text-sm font-medium transition-all touch-manipulation bg-gray-100 text-gray-700 active:bg-gray-200 ${
                      isSelected
                        ? 'border-2 border-blue-500'
                        : 'border border-transparent'
                    }`}
                  >
                    {tag.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 学科选择 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">学科</h3>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => setTempSelectedSubject('全部')}
                className={`px-3 py-3 rounded-lg text-sm font-medium transition-all touch-manipulation bg-gray-100 text-gray-700 active:bg-gray-200 ${
                  tempSelectedSubject === '全部'
                    ? 'border-2 border-blue-500'
                    : 'border border-transparent'
                }`}
              >
                全部
              </button>
              {subjectTags.map((tag) => {
                const isSelected = tempSelectedSubject === tag.name;
                return (
                  <button
                    key={tag.id}
                    onClick={() => setTempSelectedSubject(tag.name)}
                    className={`px-3 py-3 rounded-lg text-sm font-medium transition-all touch-manipulation bg-gray-100 text-gray-700 active:bg-gray-200 ${
                      isSelected
                        ? 'border-2 border-blue-500'
                        : 'border border-transparent'
                    }`}
                  >
                    {tag.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 其他标签分类 */}
          {tagCategories.filter(cat => cat.id !== 'grade' && cat.id !== 'subject').map((category) => (
            <div key={category.id}>
              {/* 分类标题 */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
              </div>

              {/* 标签网格 */}
              <div className="grid grid-cols-3 gap-2.5">
                {category.tags.map((tag) => {
                  const isSelected = tempSelectedTags.includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      onClick={() => handleTagToggle(tag.id)}
                      className={`px-3 py-3 rounded-lg text-sm font-medium transition-all touch-manipulation bg-gray-100 text-gray-700 active:bg-gray-200 ${
                        isSelected
                          ? 'border-2 border-blue-500'
                          : 'border border-transparent'
                      }`}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* 底部按钮 */}
          <div className="sticky bottom-0 bg-white pt-4 pb-4 -mx-4 px-4 border-t border-gray-200 space-y-2">
            <button
              onClick={handleReset}
              className="w-full py-2.5 text-gray-500 text-sm touch-manipulation"
            >
              重置
            </button>
            <button
              onClick={handleConfirm}
              className="w-full py-3 bg-blue-500 text-white rounded-lg active:bg-blue-600 transition-colors touch-manipulation text-base font-medium shadow-sm"
            >
              确认
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

