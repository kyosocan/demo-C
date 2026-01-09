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
  const [step, setStep] = useState<'upload' | 'scanning' | 'extracting' | 'generating' | 'planning' | 'success'>('upload');
  const [progress, setProgress] = useState(0);

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

  const startProcessing = async () => {
    // 第一步：智能扫描
    setStep('scanning');
    setProgress(0);
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 50));
    }

    // 第二步：核心知识点提取
    setStep('extracting');
    setProgress(0);
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 60));
    }

    // 第三步：互动练习生成
    setStep('generating');
    setProgress(0);
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 80));
    }

    // 第四步：计划定制
    setStep('planning');
    setProgress(0);
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 40));
    }

    setStep('success');
  };

  const generateStudySet = async () => {
    setIsGenerating(true);
    await startProcessing();
    
    // 生成示例卡片
    const generatedCards = [
      { id: `card-${Date.now()}-1`, term: '光合作用', definition: '植物利用光能将二氧化碳和水转化为有机物，并释放氧气的过程。' },
      { id: `card-${Date.now()}-2`, term: '细胞', definition: '生物体结构和功能的基本单位，由细胞膜、细胞质和细胞核组成。' },
      { id: `card-${Date.now()}-3`, term: '基因', definition: '遗传的基本单位，控制生物性状的遗传信息片段。' },
      { id: `card-${Date.now()}-4`, term: '生态系统', definition: '由生物群落与其生存的无机环境相互作用形成的统一整体。' },
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
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setSelectedTags([]);
    setUploadedFile(null);
    setPreviewUrl('');
    setIsGenerating(false);
    setSelectedItems(['flashcard', 'matching', 'quiz', 'mindmap', 'ppt']);
    setStep('upload');
    setProgress(0);
    onClose();
  };

  const canGenerate = (title.trim() || uploadedFile) && selectedItems.length > 0 && !isGenerating;

  const renderProcessingStep = (currentStep: typeof step, label: string, icon: React.ReactNode) => {
    const isActive = step === currentStep;
    const isCompleted = ['scanning', 'extracting', 'generating', 'planning', 'success'].indexOf(step) > 
                        ['scanning', 'extracting', 'generating', 'planning', 'success'].indexOf(currentStep);

    return (
      <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
        isActive ? 'bg-purple-50 border-purple-200 shadow-sm' : 
        isCompleted ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100 opacity-60'
      }`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isActive ? 'bg-purple-600 text-white animate-pulse' : 
          isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
        }`}>
          {isCompleted ? <Sparkles className="w-5 h-5" /> : icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-sm font-bold ${isActive ? 'text-purple-900' : isCompleted ? 'text-green-900' : 'text-gray-500'}`}>
              {label}
            </span>
            {isActive && <span className="text-xs text-purple-600 font-medium">{progress}%</span>}
            {isCompleted && <span className="text-xs text-green-600 font-medium">完成</span>}
          </div>
          {isActive && (
            <div className="w-full h-1.5 bg-purple-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-600 transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 px-4">
        <div className="bg-white rounded-t-3xl w-full max-w-[480px] max-h-[90vh] overflow-y-auto pb-8 animate-slide-up">
          {/* 头部 */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              {step === 'upload' ? '创建学习集' : 'AI 智能处理中'}
            </h2>
            <button
              onClick={handleClose}
              disabled={isGenerating && step !== 'success'}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-6 space-y-6">
            {step === 'upload' ? (
              <>
                {/* 选择创建方式 */}
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h3 className="text-base font-bold text-gray-900 mb-1">资料处理流程</h3>
                  <p className="text-xs text-gray-500 mb-4">上传 PDF 或照片，AI 将自动扫描提取知识点并生成练习</p>
                  
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
                      <div className="bg-[#FFF5F5] rounded-lg p-4 text-center cursor-pointer hover:bg-[#FFE5E5] transition-all disabled:opacity-50 border border-gray-100">
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
                      <div className="bg-[#FFF5F5] rounded-lg p-4 text-center cursor-pointer hover:bg-[#FFE5E5] transition-all disabled:opacity-50 border border-gray-100">
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
                      className="bg-[#FFF5F5] rounded-lg p-4 text-center cursor-pointer hover:bg-[#FFE5E5] transition-all disabled:opacity-50 border border-gray-100"
                    >
                      <Edit className="w-8 h-8 text-[#FB2628] mx-auto mb-2" />
                      <span className="text-xs text-gray-700 block">手动输入</span>
                    </button>
                  </div>
                </div>

                {/* 预览 */}
                {uploadedFile && (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center gap-3">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="预览"
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-200">
                          <FileText className="w-8 h-8 text-gray-400" />
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
                    <label className="block text-sm font-bold text-gray-900">学习集名称</label>
                    <span className="text-xs text-gray-400">{title.length}/14</span>
                  </div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isGenerating}
                    placeholder="例如: 三年级语文核心知识点"
                    maxLength={14}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:bg-gray-100 disabled:opacity-50"
                  />
                </div>

                {/* 标签选择 */}
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <label className="block text-sm font-bold text-gray-900 mb-3">选择分类</label>
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
                              ? 'bg-purple-600 text-white'
                              : 'bg-purple-50 text-purple-600 border border-purple-100'
                          }`}
                        >
                          #{tag.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 生成按钮 */}
                <button
                  onClick={generateStudySet}
                  disabled={!canGenerate}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-200 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                >
                  <span>开始智能生成</span>
                  <Zap className="w-5 h-5" />
                </button>
              </>
            ) : step === 'success' ? (
              <div className="py-12 text-center space-y-6 animate-fade-in">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-12 h-12 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">生成成功！</h3>
                  <p className="text-gray-500">已为您生成核心知识点及互动练习</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 text-left border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    已生成的学习单元
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-100">
                      <Zap className="w-4 h-4 text-yellow-500" /> 闪卡记忆 (4组)
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-100">
                      <Gamepad2 className="w-4 h-4 text-blue-500" /> 配对挑战 (已适配)
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-100">
                      <Presentation className="w-4 h-4 text-orange-500" /> 知识导图 (已生成)
                    </li>
                  </ul>
                </div>
                <button
                  onClick={handleClose}
                  className="w-full py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all"
                >
                  进入学习集
                </button>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                <div className="bg-purple-50 rounded-2xl p-6 mb-6 text-center border border-purple-100">
                  <Loader2 className="w-10 h-10 text-purple-600 animate-spin mx-auto mb-4" />
                  <p className="text-purple-900 font-bold">正在深度分析资料中...</p>
                  <p className="text-purple-600 text-xs mt-1">AI 正在将静态内容转化为结构化知识</p>
                </div>
                
                <div className="space-y-3">
                  {renderProcessingStep('scanning', '智能扫描资料', <Camera className="w-5 h-5" />)}
                  {renderProcessingStep('extracting', '核心知识点提取', <Brain className="w-5 h-5" />)}
                  {renderProcessingStep('generating', '互动练习生成', <Gamepad2 className="w-5 h-5" />)}
                  {renderProcessingStep('planning', '个性化计划定制', <Presentation className="w-5 h-5" />)}
                </div>

                <div className="pt-6">
                  <p className="text-xs text-gray-400 text-center italic">
                    "AI 正在根据资料特性匹配最适合的题型：生字匹配拼写，多音字匹配选择..."
                  </p>
                </div>
              </div>
            )}
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

