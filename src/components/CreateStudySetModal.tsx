import { useState } from 'react';
import { X, Camera, Upload, Loader2, Sparkles, Zap, Gamepad2, Brain, Network, Presentation } from 'lucide-react';
import { StudySetContent, Tag } from '../types';
import { subjectTags, gradeTags, difficultyTags } from '../data/mockData';

interface CreateStudySetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (content: StudySetContent) => void;
}

export default function CreateStudySetModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateStudySetModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(['flashcard', 'matching', 'quiz', 'mindmap', 'ppt']);

  if (!isOpen) return null;

  const allTags = [...gradeTags.slice(0, 3), ...subjectTags, ...difficultyTags];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // 如果是图片，显示预览
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl('');
      }
    }
  };

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e);
  };

  const handleTagToggle = (tag: Tag) => {
    if (selectedTags.find((t) => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const generateStudySet = async () => {
    setIsGenerating(true);

    // 模拟 AI 生成学习集内容
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 生成示例卡片（实际应该调用后端 API）
    const generatedCards = [
      { id: `card-${Date.now()}-1`, term: '光合作用', definition: '植物利用光能将二氧化碳和水转化为有机物，并释放氧气的过程。' },
      { id: `card-${Date.now()}-2`, term: '细胞', definition: '生物体结构和功能的基本单位，由细胞膜、细胞质和细胞核组成。' },
      { id: `card-${Date.now()}-3`, term: '基因', definition: '遗传的基本单位，控制生物性状的遗传信息片段。' },
      { id: `card-${Date.now()}-4`, term: '生态系统', definition: '由生物群落与其生存的无机环境相互作用形成的统一整体。' },
      { id: `card-${Date.now()}-5`, term: '进化', definition: '生物种群在世代繁衍中基因频率发生变化的过程。' },
      { id: `card-${Date.now()}-6`, term: 'DNA', definition: '脱氧核糖核酸，携带遗传信息的生物大分子。' },
      { id: `card-${Date.now()}-7`, term: '新陈代谢', definition: '生物体内发生的所有化学反应的总称。' },
      { id: `card-${Date.now()}-8`, term: '酶', definition: '生物催化剂，能够加速生物体内的化学反应。' },
    ];

    const newStudySet: StudySetContent = {
      id: `studyset-${Date.now()}`,
      type: 'studyset',
      title: title || '智能生成的学习集',
      description: description || '通过 AI 智能分析生成的学习卡片',
      tags: selectedTags.length > 0 ? selectedTags : [subjectTags[5]],
      author: '我',
      authorAvatar: '/image/avatar/我.jpg',
      cardCount: generatedCards.length,
      studyCount: 0,
      cards: generatedCards,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setIsGenerating(false);
    onSuccess(newStudySet);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setSelectedTags([]);
    setUploadedFile(null);
    setPreviewUrl('');
    setIsGenerating(false);
    setSelectedItems(['flashcard', 'matching', 'quiz', 'mindmap', 'ppt']);
    onClose();
  };

  const canGenerate = (title.trim() || uploadedFile) && selectedItems.length > 0 && !isGenerating;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 px-4">
        <div className="bg-white rounded-t-3xl w-full max-w-[480px] max-h-[90vh] overflow-y-auto pb-8 animate-slide-up">
          {/* 头部 */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              创建学习集
            </h2>
            <button
              onClick={handleClose}
              disabled={isGenerating}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-6 space-y-6">
            {/* 选择创建方式 */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="text-base font-bold text-gray-900 mb-1">选择创建方式</h3>
              <p className="text-sm text-gray-500 mb-4">选择最适合你的方式来创建学习集</p>
              
              <div className="grid grid-cols-3 gap-3">
                {/* 拍照识别 */}
                <label className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleCameraCapture}
                    disabled={isGenerating}
                    className="hidden"
                  />
                  <div className="bg-[#FFF5F5] rounded-lg p-4 text-center cursor-pointer hover:bg-[#FFE5E5] transition-all disabled:opacity-50 border border-gray-200">
                    <Camera className="w-8 h-8 text-[#FB2628] mx-auto mb-2" />
                    <span className="text-xs text-gray-700 block">拍照识别</span>
                  </div>
                </label>

                {/* 上传文件 */}
                <label className="relative">
                  <input
                    type="file"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    disabled={isGenerating}
                    className="hidden"
                  />
                  <div className="bg-[#FFF5F5] rounded-lg p-4 text-center cursor-pointer hover:bg-[#FFE5E5] transition-all disabled:opacity-50 border border-gray-200">
                    <Upload className="w-8 h-8 text-[#FB2628] mx-auto mb-2" />
                    <span className="text-xs text-gray-700 block">上传文件</span>
                  </div>
                </label>

                {/* 手动输入 */}
                <button
                  onClick={() => {
                    // 手动输入逻辑
                  }}
                  disabled={isGenerating}
                  className="bg-[#FFF5F5] rounded-lg p-4 text-center cursor-pointer hover:bg-[#FFE5E5] transition-all disabled:opacity-50 border border-gray-200"
                >
                  <Upload className="w-8 h-8 text-[#FB2628] mx-auto mb-2" />
                  <span className="text-xs text-gray-700 block">手动输入</span>
                </button>
              </div>
            </div>

            {/* 预览 */}
            {uploadedFile && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="预览"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setUploadedFile(null);
                      setPreviewUrl('');
                    }}
                    disabled={isGenerating}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            )}

            {/* 标题 */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-gray-900">标题</label>
                <span className="text-xs text-gray-400">{title.length}/14</span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isGenerating}
                placeholder="例如:数学笔记"
                maxLength={14}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB2628] focus:border-transparent disabled:bg-gray-100 disabled:opacity-50"
              />
            </div>

            {/* 详情 */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-gray-900">详情</label>
                <span className="text-xs text-gray-400">{description.length}/100</span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isGenerating}
                placeholder="在此粘贴你的笔记文本,我们将自动分析...."
                rows={4}
                maxLength={100}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB2628] focus:border-transparent resize-none disabled:bg-gray-100 disabled:opacity-50"
              />
            </div>

            {/* 标签选择 */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <label className="block text-sm font-bold text-gray-900 mb-3">选择标签</label>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 8).map((tag) => {
                  const isSelected = selectedTags.find((t) => t.id === tag.id);
                  return (
                    <button
                      key={tag.id}
                      onClick={() => handleTagToggle(tag)}
                      disabled={isGenerating}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all disabled:opacity-50 ${
                        isSelected
                          ? 'bg-[#FB2628] text-white'
                          : 'bg-[#FFF5F5] text-[#FB2628]'
                      }`}
                    >
                      #{tag.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 选择生成项目 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                生成学习方式
              </label>
              <div className="space-y-2">
                {/* 闪卡学习 */}
                <label className="flex items-start gap-3 p-3 bg-white border-2 rounded-xl cursor-pointer transition-all hover:border-green-300"
                  style={{
                    borderColor: selectedItems.includes('flashcard') ? '#10b981' : '#e5e7eb'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes('flashcard')}
                    onChange={() => toggleItem('flashcard')}
                    disabled={isGenerating}
                    className="mt-0.5 w-4 h-4 text-green-600 rounded disabled:opacity-50"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Zap className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-gray-900">闪卡学习</span>
                    </div>
                    <p className="text-xs text-gray-600">翻转卡片逐个学习</p>
                  </div>
                </label>

                {/* 配对游戏 */}
                <label className="flex items-start gap-3 p-3 bg-white border-2 rounded-xl cursor-pointer transition-all hover:border-blue-300"
                  style={{
                    borderColor: selectedItems.includes('matching') ? '#3b82f6' : '#e5e7eb'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes('matching')}
                    onChange={() => toggleItem('matching')}
                    disabled={isGenerating}
                    className="mt-0.5 w-4 h-4 text-blue-600 rounded disabled:opacity-50"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Gamepad2 className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-900">配对游戏</span>
                    </div>
                    <p className="text-xs text-gray-600">寓教于乐的配对挑战</p>
                  </div>
                </label>

                {/* 小测验 */}
                <label className="flex items-start gap-3 p-3 bg-white border-2 rounded-xl cursor-pointer transition-all hover:border-purple-300"
                  style={{
                    borderColor: selectedItems.includes('quiz') ? '#a855f7' : '#e5e7eb'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes('quiz')}
                    onChange={() => toggleItem('quiz')}
                    disabled={isGenerating}
                    className="mt-0.5 w-4 h-4 text-purple-600 rounded disabled:opacity-50"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Brain className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-semibold text-gray-900">小测验</span>
                    </div>
                    <p className="text-xs text-gray-600">选择题检验学习效果</p>
                  </div>
                </label>

                {/* 思维导图 */}
                <label className="flex items-start gap-3 p-3 bg-white border-2 rounded-xl cursor-pointer transition-all hover:border-indigo-300"
                  style={{
                    borderColor: selectedItems.includes('mindmap') ? '#6366f1' : '#e5e7eb'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes('mindmap')}
                    onChange={() => toggleItem('mindmap')}
                    disabled={isGenerating}
                    className="mt-0.5 w-4 h-4 text-indigo-600 rounded disabled:opacity-50"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Network className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-semibold text-gray-900">思维导图</span>
                    </div>
                    <p className="text-xs text-gray-600">可视化知识结构</p>
                  </div>
                </label>

                {/* PPT 演示 */}
                <label className="flex items-start gap-3 p-3 bg-white border-2 rounded-xl cursor-pointer transition-all hover:border-orange-300"
                  style={{
                    borderColor: selectedItems.includes('ppt') ? '#f97316' : '#e5e7eb'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes('ppt')}
                    onChange={() => toggleItem('ppt')}
                    disabled={isGenerating}
                    className="mt-0.5 w-4 h-4 text-orange-600 rounded disabled:opacity-50"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Presentation className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-semibold text-gray-900">PPT 演示</span>
                    </div>
                    <p className="text-xs text-gray-600">幻灯片形式展示</p>
                  </div>
                </label>
              </div>
              {selectedItems.length === 0 && (
                <p className="text-xs text-orange-600 mt-2">
                  ⚠️ 请至少选择一种学习方式
                </p>
              )}
            </div>

            {/* 生成按钮 */}
            <button
              onClick={generateStudySet}
              disabled={!canGenerate}
              className="w-full py-4 bg-[#FB2628] text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>AI 正在生成中...</span>
                </>
              ) : (
                <span>智能生成学习集</span>
              )}
            </button>

            {/* 提示文本 */}
            <p className="text-xs text-gray-500 text-center">
              AI 会分析上传的内容，自动生成术语和定义配对，方便孩子学习记忆
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

