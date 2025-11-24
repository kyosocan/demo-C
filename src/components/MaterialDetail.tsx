import { useState, useRef, useEffect } from 'react';
import { MaterialContent } from '../types';
import { ArrowLeft, Home, Share2, Download, MoreVertical, Search, ThumbsUp, ThumbsDown, FileText, Folder, BookOpen, Star } from 'lucide-react';

interface MaterialDetailProps {
  content: MaterialContent;
  onBack: () => void;
}

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'file';
  date: string;
}

// 模拟文件数据
const mockFiles: FileItem[] = [
  { id: '1', name: '五年级上册', type: 'folder', date: '2025-09-24' },
  { id: '2', name: '四年级下册', type: 'folder', date: '2025-09-20' },
  { id: '3', name: '三年级上册', type: 'folder', date: '2025-09-15' },
  { id: '4', name: '数学练习题集.pdf', type: 'pdf', date: '2025-09-22' },
  { id: '5', name: '期中考试试卷.pdf', type: 'pdf', date: '2025-09-18' },
  { id: '6', name: '知识点总结.pdf', type: 'pdf', date: '2025-09-10' },
];

export default function MaterialDetail({ content, onBack }: MaterialDetailProps) {
  const [activeTab, setActiveTab] = useState<'files' | 'discussion'>('files');
  const [likeCount, setLikeCount] = useState(0);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // 获取学科标签
  const subjectTag = content.tags.find(tag => tag.id.startsWith('subject-'));
  const gradeTag = content.tags.find(tag => tag.id.startsWith('grade-'));

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId) {
        const menuElement = menuRefs.current[openMenuId];
        if (menuElement && !menuElement.contains(event.target as Node)) {
          setOpenMenuId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  const handleMenuClick = (fileId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenMenuId(openMenuId === fileId ? null : fileId);
  };

  const handleMenuAction = (action: string, fileId: string) => {
    console.log(`执行操作: ${action}，文件ID: ${fileId}`);
    setOpenMenuId(null);
    // 这里可以添加具体的操作逻辑
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 bg-white z-50 border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="touch-manipulation"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <button className="touch-manipulation">
              <Home size={20} className="text-gray-700" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="touch-manipulation">
              <Share2 size={20} className="text-gray-700" />
            </button>
            <button className="touch-manipulation">
              <Download size={20} className="text-gray-700" />
            </button>
            <button className="touch-manipulation">
              <MoreVertical size={20} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* 标题区域 */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900 mb-3">
            {content.title}
          </h1>
          
          {/* 标签 */}
          <div className="flex items-center gap-2 mb-3">
            {gradeTag && (
              <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-600">
                {gradeTag.name}
              </span>
            )}
            {subjectTag && (
              <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-600">
                {subjectTag.name}
              </span>
            )}
          </div>

          {/* 描述 */}
          {content.description && (
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {content.description}
            </p>
          )}

          {/* 用户信息 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {content.authorAvatar && (
                <img
                  src={content.authorAvatar}
                  alt={content.author}
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <span className="text-sm text-gray-700">{content.author}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLikeCount(prev => prev + 1)}
                  className="touch-manipulation"
                >
                  <ThumbsUp size={16} className="text-gray-400" />
                </button>
                <span className="text-xs text-gray-500">{likeCount}</span>
              </div>
              <button
                className="touch-manipulation"
              >
                <ThumbsDown size={16} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* 搜索栏 */}
        <div className="mb-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="搜索当前资料包~"
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {/* Tab 切换 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center border-b border-gray-200">
            <button
              onClick={() => setActiveTab('files')}
              className={`px-4 py-2 text-sm font-medium relative touch-manipulation ${
                activeTab === 'files'
                  ? 'text-blue-500'
                  : 'text-gray-600'
              }`}
            >
              文件
              {activeTab === 'files' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('discussion')}
              className={`px-4 py-2 text-sm font-medium relative touch-manipulation ${
                activeTab === 'discussion'
                  ? 'text-blue-500'
                  : 'text-gray-600'
              }`}
            >
              讨论区
              {activeTab === 'discussion' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></span>
              )}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-sm text-gray-600 touch-manipulation">
              <FileText size={16} />
              <span>多选</span>
            </button>
          </div>
        </div>

        {/* 内容区域 */}
        {activeTab === 'files' ? (
          <div className="space-y-0">
            {mockFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 relative"
              >
                <div className="flex items-center gap-3 flex-1">
                  {file.type === 'folder' ? (
                    <Folder size={24} className="text-yellow-500" />
                  ) : file.type === 'pdf' ? (
                    <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                      <span className="text-red-600 font-bold text-xs">P</span>
                    </div>
                  ) : (
                    <FileText size={24} className="text-gray-400" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{file.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{file.date}</div>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={(e) => handleMenuClick(file.id, e)}
                    className="touch-manipulation"
                  >
                    <MoreVertical size={18} className="text-gray-400" />
                  </button>
                  {openMenuId === file.id && (
                    <div
                      ref={(el) => (menuRefs.current[file.id] = el)}
                      className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[160px]"
                    >
                      <button
                        onClick={() => handleMenuAction('download', file.id)}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 touch-manipulation"
                      >
                        <Download size={16} className="text-gray-400" />
                        <span>下载</span>
                      </button>
                      <button
                        onClick={() => handleMenuAction('addToPlan', file.id)}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 touch-manipulation"
                      >
                        <BookOpen size={16} className="text-gray-400" />
                        <span>添加到学习计划</span>
                      </button>
                      <button
                        onClick={() => handleMenuAction('favorite', file.id)}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 touch-manipulation"
                      >
                        <Star size={16} className="text-gray-400" />
                        <span>收藏到我的空间</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="text-center py-4 text-sm text-gray-400">
              没有更多了
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 text-sm">
            暂无讨论内容
          </div>
        )}
      </div>
    </div>
  );
}

