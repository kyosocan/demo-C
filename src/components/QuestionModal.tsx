import { useState, useRef } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { QuestionContent, Tag } from '../types';
import { commonTags } from '../data/mockData';

interface QuestionModalProps {
  onClose: () => void;
  onSuccess: (content: QuestionContent) => void;
}

export default function QuestionModal({ onClose, onSuccess }: QuestionModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      // 创建预览
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCover = () => {
    setCoverFile(null);
    setCoverPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('请输入问题标题');
      return;
    }
    if (!description.trim()) {
      alert('请输入问题描述');
      return;
    }

    const tags: Tag[] = commonTags.filter((tag) =>
      selectedTags.includes(tag.id)
    );

    const newContent: QuestionContent = {
      id: Date.now().toString(),
      type: 'question',
      title: title.trim(),
      cover: coverPreview || undefined,
      tags,
      author: '当前用户',
      commentCount: 0,
      description: description.trim(),
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSuccess(newContent);
    // 重置表单
    setTitle('');
    setDescription('');
    setCoverFile(null);
    setCoverPreview('');
    setSelectedTags([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-lg max-w-2xl w-full h-[95vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold">提问</h2>
          <button
            onClick={onClose}
            className="text-gray-400 active:text-gray-600 touch-manipulation p-1"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 space-y-4 flex-1">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              问题标题 *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入问题标题"
              className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              问题描述 *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请详细描述您的问题..."
              rows={6}
              className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              封面图片（可选）
            </label>
            {coverPreview ? (
              <div className="relative">
                <img
                  src={coverPreview}
                  alt="封面预览"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveCover}
                  className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center touch-manipulation"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer touch-manipulation active:bg-gray-50"
              >
                <ImageIcon size={32} className="text-gray-400" />
                <span className="text-sm text-gray-500">点击上传封面图片</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              标签
            </label>
            <div className="flex flex-wrap gap-2">
              {commonTags.map((tag) => {
                const isSelected = selectedTags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleTagToggle(tag.id)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all touch-manipulation ${
                      isSelected
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 active:bg-gray-200'
                    }`}
                    style={
                      isSelected && tag.color
                        ? { backgroundColor: tag.color }
                        : undefined
                    }
                  >
                    {tag.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 pt-4 pb-2">
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg active:bg-blue-600 transition-colors touch-manipulation text-base font-medium"
            >
              发布
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg active:bg-gray-300 transition-colors touch-manipulation text-base font-medium"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

