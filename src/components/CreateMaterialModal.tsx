import { useState, useRef } from 'react';
import { ArrowLeft, Home, X, Image as ImageIcon } from 'lucide-react';
import { MaterialContent, Tag } from '../types';
import { gradeTags, subjectTags, typeTags } from '../data/mockData';

interface CreateMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (content: MaterialContent) => void;
}

export default function CreateMaterialModal({ isOpen, onClose, onSuccess }: CreateMaterialModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string>('');
  const [selectedKnowledgePoint, setSelectedKnowledgePoint] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 知识点选项
  const knowledgePoints = [
    { id: 'kp-1', name: '讲义' },
    { id: 'kp-2', name: '课件' },
    { id: 'kp-3', name: '知识归纳' },
    { id: 'kp-4', name: '课堂笔记' },
    { id: 'kp-5', name: '背诵材料' },
  ];

  // 学段选项（小学、初中、高中、大学）
  const academicStages = [
    ...gradeTags.slice(0, 3),
    { id: 'grade-10', name: '大学', color: '#9B59B6' },
  ];

  // 年级选项（一年级到六年级）
  const gradeLevels = gradeTags.slice(3, 9);

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
    if (!name.trim()) {
      alert('请输入资料包名称');
      return;
    }

    const tags: Tag[] = [];
    if (selectedGrade) {
      const tag = gradeTags.find(t => t.id === selectedGrade);
      if (tag) tags.push(tag);
    }
    if (selectedSubject) {
      const tag = subjectTags.find(t => t.id === selectedSubject);
      if (tag) tags.push(tag);
    }
    if (selectedGradeLevel) {
      const tag = gradeTags.find(t => t.id === selectedGradeLevel);
      if (tag) tags.push(tag);
    }
    if (selectedKnowledgePoint) {
      const kp = knowledgePoints.find(k => k.id === selectedKnowledgePoint);
      if (kp) {
        tags.push({ id: kp.id, name: kp.name });
      }
    }

    const newContent: MaterialContent = {
      id: Date.now().toString(),
      type: 'material',
      title: name.trim(),
      cover: coverPreview || 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=500&fit=crop',
      tags,
      author: '当前用户',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current',
      downloadCount: 0,
      fileCount: 0,
      description: description.trim(),
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSuccess(newContent);
    // 重置表单
    setName('');
    setDescription('');
    setCoverFile(null);
    setCoverPreview('');
    setSelectedGrade('');
    setSelectedSubject('');
    setSelectedGradeLevel('');
    setSelectedKnowledgePoint('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* 顶部导航 */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="touch-manipulation">
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <button className="touch-manipulation">
              <Home size={20} className="text-gray-700" />
            </button>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">创建资料包</h2>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* 资料包名称 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            资料包名称
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 描述信息 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            描述信息
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="简要介绍下分享的内容"
            rows={4}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 封面图片 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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

        {/* 资料包标签 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            资料包标签
          </label>

          {/* 请选择学段 */}
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-2">请选择学段</div>
            <div className="flex flex-wrap gap-2">
              {academicStages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setSelectedGrade(stage.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all touch-manipulation ${
                    selectedGrade === stage.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {stage.name}
                </button>
              ))}
            </div>
          </div>

          {/* 科目 */}
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-2">科目</div>
            <div className="flex flex-wrap gap-2">
              {subjectTags.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all touch-manipulation ${
                    selectedSubject === subject.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {subject.name}
                </button>
              ))}
            </div>
          </div>

          {/* 年级 */}
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-2">年级</div>
            <div className="flex flex-wrap gap-2">
              {gradeLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedGradeLevel(level.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all touch-manipulation ${
                    selectedGradeLevel === level.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>

          {/* 知识点 */}
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-2">知识点</div>
            <div className="flex flex-wrap gap-2">
              {knowledgePoints.map((kp) => (
                <button
                  key={kp.id}
                  onClick={() => setSelectedKnowledgePoint(kp.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all touch-manipulation ${
                    selectedKnowledgePoint === kp.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {kp.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 立即创建按钮 */}
        <div className="sticky bottom-0 bg-white pt-4 pb-4 -mx-4 px-4 border-t border-gray-200">
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-500 text-white rounded-lg active:bg-blue-600 transition-colors touch-manipulation text-base font-medium"
          >
            立即创建
          </button>
        </div>
      </div>
    </div>
  );
}

