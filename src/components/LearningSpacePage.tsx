import { useState, useRef } from 'react';
import { ArrowLeft, Search, Folder, FileText, Cloud, Plus, CheckSquare, X, Upload } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'image';
  date: string;
  size?: string;
  status?: 'reviewing'; // 审核中
}

interface LearningSpacePageProps {
  onBack: () => void;
  onSelectFiles?: (files: FileItem[]) => void;
  mode?: 'select' | 'view'; // select 模式用于选择文件，view 模式用于查看
}

export default function LearningSpacePage({ 
  onBack, 
  onSelectFiles,
  mode = 'view' 
}: LearningSpacePageProps) {
  const [currentTab, setCurrentTab] = useState<'home' | 'cloud'>('cloud');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [files, setFiles] = useState<FileItem[]>([
    { id: '1', name: 'image.jpg', type: 'image', date: '2024-01-15', size: '2.3MB' },
    { id: '2', name: 'HUAWEIWATCHFI T2用户...-cn).pdf', type: 'pdf', date: '2024-01-14', size: '1.5MB' },
    { id: '3', name: 'butterfly.pdf', type: 'pdf', date: '2024-01-13', size: '3.2MB' },
    { id: '4', name: 'OPENAI-SORA+ %E6%8...BF.pdf', type: 'pdf', date: '2024-01-12', size: '2.8MB', status: 'reviewing' },
    { id: '5', name: '功能', type: 'folder', date: '2024-01-11' },
    { id: '6', name: '抗战烽火中的教育 奇迹:...研究.pdf', type: 'pdf', date: '2024-01-10', size: '4.1MB' },
    { id: '7', name: '专题06 三角函数 的概念...析版).pdf', type: 'pdf', date: '2024-01-09', size: '2.7MB' },
    { id: '8', name: '1762515416490_ origin.jpg', type: 'image', date: '2024-01-08', size: '1.8MB' },
  ]);
  
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = (file: FileItem) => {
    if (mode === 'select') {
      // 选择模式下，文件夹也可以被选择
      const newSelected = new Set(selectedFiles);
      if (newSelected.has(file.id)) {
        newSelected.delete(file.id);
      } else {
        newSelected.add(file.id);
      }
      setSelectedFiles(newSelected);
    } else {
      // view 模式下点击文件可以预览或打开
      if (file.type === 'folder') {
        // 可以进入文件夹
        console.log('进入文件夹:', file.name);
      } else {
        // 预览文件
        console.log('预览文件:', file.name);
      }
    }
  };

  const handleConfirm = () => {
    if (onSelectFiles && selectedFiles.size > 0) {
      const selected = files.filter(f => selectedFiles.has(f.id));
      onSelectFiles(selected);
    } else {
      onBack();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (uploadedFiles && uploadedFiles.length > 0) {
      const newFiles: FileItem[] = Array.from(uploadedFiles).map((file, index) => {
        const fileId = `uploaded-${Date.now()}-${index}`;
        const fileType = file.type.startsWith('image/') ? 'image' : 
                        file.type === 'application/pdf' ? 'pdf' : 'pdf';
        const fileSize = (file.size / 1024 / 1024).toFixed(2) + 'MB';
        
        return {
          id: fileId,
          name: file.name,
          type: fileType,
          date: new Date().toISOString().split('T')[0],
          size: fileSize,
        };
      });
      
      setFiles([...newFiles, ...files]);
      setShowActionSheet(false);
      
      // 如果是选择模式，自动选中新上传的文件
      if (mode === 'select') {
        const newSelected = new Set(selectedFiles);
        newFiles.forEach(f => newSelected.add(f.id));
        setSelectedFiles(newSelected);
      }
    }
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: FileItem = {
        id: `folder-${Date.now()}`,
        name: newFolderName.trim(),
        type: 'folder',
        date: new Date().toISOString().split('T')[0],
      };
      setFiles([newFolder, ...files]);
      setNewFolderName('');
      setShowNewFolderModal(false);
      setShowActionSheet(false);
    }
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') {
      return <Folder size={32} className="text-yellow-500" />;
    } else if (file.type === 'pdf') {
      return (
        <div className="w-12 h-12 bg-[#FB2628] rounded flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">P</span>
        </div>
      );
    } else if (file.type === 'image') {
      return (
        <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center flex-shrink-0">
          <FileText size={24} className="text-white" />
        </div>
      );
    }
    return <FileText size={32} className="text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部状态栏和导航栏 */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        {/* 状态栏占位 */}
        <div className="h-6 flex items-center justify-between px-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <span>16:38</span>
            <div className="w-4 h-4 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-1 h-3 bg-gray-800 rounded-sm" />
              ))}
            </div>
            <span className="text-xs">5G</span>
            <div className="w-6 h-3 border border-gray-800 rounded-sm relative">
              <div className="absolute left-0.5 top-0.5 w-4 h-2 bg-gray-800 rounded-sm" />
            </div>
          </div>
        </div>

        {/* 导航栏 */}
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">学习空间</h1>
          <button className="p-2 -mr-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
            <Search size={20} />
          </button>
        </div>

        {/* 标签页 */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setCurrentTab('home')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              currentTab === 'home'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-500'
            }`}
          >
            首页
          </button>
          <button
            onClick={() => setCurrentTab('cloud')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              currentTab === 'cloud'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-500'
            }`}
          >
            云空间
          </button>
        </div>
      </div>

      {/* 文件网格 */}
      <div className="px-4 py-4 pb-24">
        <div className="grid grid-cols-3 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              onClick={() => handleFileClick(file)}
              className={`relative flex flex-col items-center p-3 rounded-lg transition-colors cursor-pointer ${
                mode === 'select' && selectedFiles.has(file.id)
                  ? 'bg-red-50 ring-2 ring-red-500 ring-offset-1'
                  : 'hover:bg-gray-50'
              }`}
            >
              {/* 复选框 */}
              {mode === 'select' && (
                <div className="absolute top-2 right-2 z-10">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    selectedFiles.has(file.id)
                      ? 'bg-red-500 border-red-500'
                      : 'bg-white border-gray-300'
                  }`}>
                    {selectedFiles.has(file.id) && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
              )}

              {/* 文件图标 */}
              <div className="mb-2">
                {getFileIcon(file)}
              </div>

              {/* 审核中标签 */}
              {file.status === 'reviewing' && (
                <div className="absolute top-1 left-1 bg-gray-100 px-1.5 py-0.5 rounded text-xs text-gray-600">
                  审核中
                </div>
              )}

              {/* 文件名 */}
              <div className="text-xs text-gray-900 text-center line-clamp-2 w-full">
                {file.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
        <div className="max-w-[480px] mx-auto">
          {/* 存储空间信息 */}
          <div className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-600">
            <Cloud size={16} className="text-gray-400" />
            <span>已用 34.6MB/5GB</span>
          </div>

          {/* 浮动操作按钮 */}
          {mode === 'select' ? (
            <div className="px-4 pb-4 space-y-2">
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowActionSheet(true)}
                  className="w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 active:bg-red-700 transition-colors"
                >
                  <Plus size={24} />
                </button>
              </div>
              <button
                onClick={handleConfirm}
                disabled={selectedFiles.size === 0}
                className="w-full bg-red-500 text-white rounded-full py-3.5 text-base font-medium hover:bg-red-600 active:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                确认选择 ({selectedFiles.size})
              </button>
            </div>
          ) : (
            <div className="flex justify-end px-4 pb-4">
              <button 
                onClick={() => setShowActionSheet(true)}
                className="w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 active:bg-red-700 transition-colors"
              >
                <Plus size={24} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileUpload}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      />

      {/* 操作选择弹窗 */}
      {showActionSheet && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowActionSheet(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-w-[480px] mx-auto animate-slide-up">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">选择操作</h3>
                <button
                  onClick={() => setShowActionSheet(false)}
                  className="p-2 -mr-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                >
                  <Upload size={24} className="text-blue-600" />
                  <span className="text-base font-medium">上传文件</span>
                </button>
                
                <button
                  onClick={() => {
                    setShowNewFolderModal(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                >
                  <Folder size={24} className="text-yellow-600" />
                  <span className="text-base font-medium">新建文件夹</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 新建文件夹弹窗 */}
      {showNewFolderModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => {
              setShowNewFolderModal(false);
              setNewFolderName('');
            }}
          />
          <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white rounded-t-3xl shadow-2xl max-w-[480px] mx-auto animate-slide-up">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">新建文件夹</h3>
                <button
                  onClick={() => {
                    setShowNewFolderModal(false);
                    setNewFolderName('');
                  }}
                  className="p-2 -mr-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="请输入文件夹名称"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateFolder();
                    }
                  }}
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowNewFolderModal(false);
                    setNewFolderName('');
                  }}
                  className="flex-1 bg-gray-100 text-gray-900 rounded-xl py-3 text-base font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleCreateFolder}
                  disabled={!newFolderName.trim()}
                  className="flex-1 bg-blue-500 text-white rounded-xl py-3 text-base font-medium hover:bg-blue-600 active:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  确认
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

