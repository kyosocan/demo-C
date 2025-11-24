import { useState } from 'react';
import { X } from 'lucide-react';
import { MaterialContent, Tag } from '../types';
import { commonTags } from '../data/mockData';

interface UploadModalProps {
  onClose: () => void;
  onSuccess: (content: MaterialContent) => void;
}

export default function UploadModal({ onClose, onSuccess }: UploadModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [fileCount, setFileCount] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('请输入标题');
      return;
    }

    const tags: Tag[] = commonTags.filter((tag) =>
      selectedTags.includes(tag.id)
    );

    const newContent: MaterialContent = {
      id: Date.now().toString(),
      type: 'material',
      title: title.trim(),
      cover: coverUrl || 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=500&fit=crop',
      tags,
      author: '当前用户',
      downloadCount: 0,
      fileCount: fileCount || 1,
      description: description.trim(),
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSuccess(newContent);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-lg max-w-2xl w-full h-[95vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold">上传资料</h2>
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
              标题 *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入资料标题"
              className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              封面图片URL
            </label>
            <input
              type="text"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="请输入图片URL（可选）"
              className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              文件数量
            </label>
            <input
              type="number"
              value={fileCount}
              onChange={(e) => setFileCount(parseInt(e.target.value) || 1)}
              min="1"
              className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              描述
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请输入资料描述（可选）"
              rows={4}
              className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                        ? 'bg-pink-500 text-white shadow-md'
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
              className="flex-1 px-4 py-3 bg-pink-500 text-white rounded-lg active:bg-pink-600 transition-colors touch-manipulation text-base font-medium"
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

