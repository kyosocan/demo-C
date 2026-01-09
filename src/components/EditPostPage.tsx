import React, { useEffect } from 'react';
import { ArrowLeft, FolderPlus, FilePlus, X, Folder, Loader2, CheckCircle2, AlertCircle, Cloud } from 'lucide-react';

type UploadStatus = 'uploading' | 'success' | 'failed';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'file';
  date: string;
  size?: string;
  title?: string;
  cover?: string;
  uploadStatus?: UploadStatus;
  uploadProgress?: number;
}

interface FolderData {
  name: string;
  files: FileItem[];
}

interface EditPostPageProps {
  text?: string;
  initialTitle?: string;
  initialBody?: string;
  initialFolders?: FolderData[];
  onBack: () => void;
  onPublish: (data?: { title: string; body: string; folders: FolderData[] }) => void;
  onSaveDraft: () => void;
  onOpenLearningSpace?: () => void;
}

export default function EditPostPage({
  text = '',
  initialTitle = '',
  initialBody = '',
  initialFolders = [],
  onBack,
  onPublish,
  onSaveDraft,
  onOpenLearningSpace,
}: EditPostPageProps) {
  const [title, setTitle] = React.useState(initialTitle);
  const [body, setBody] = React.useState(initialBody);
  const [showFolderEditor, setShowFolderEditor] = React.useState(false);
  const [addedFolders, setAddedFolders] = React.useState<FolderData[]>(initialFolders);

  // 更新文件状态的辅助函数
  const updateFileStatus = (fileId: string, updates: Partial<FileItem>) => {
    // 更新 addedFolders 中的文件
    setAddedFolders(prevFolders => 
      prevFolders.map(folder => ({
        ...folder,
        files: folder.files.map(file => 
          file.id === fileId ? { ...file, ...updates } : file
        )
      }))
    );
  };

  // 模拟文件上传
  const uploadFile = async (fileId: string) => {
    // 设置上传中状态
    updateFileStatus(fileId, { uploadStatus: 'uploading', uploadProgress: 0 });

    let currentProgress = 0;

    // 模拟上传进度
    const progressInterval = setInterval(() => {
      currentProgress = Math.min(currentProgress + Math.random() * 30, 90);
      updateFileStatus(fileId, { uploadProgress: currentProgress });
    }, 200);

    try {
      // 模拟上传延迟（1-3秒）
      const uploadTime = 1000 + Math.random() * 2000;
      await new Promise(resolve => setTimeout(resolve, uploadTime));

      // 模拟10%的失败率
      const shouldFail = Math.random() < 0.1;

      clearInterval(progressInterval);

      if (shouldFail) {
        // 上传失败
        updateFileStatus(fileId, { uploadStatus: 'failed', uploadProgress: 0 });
      } else {
        // 上传成功
        updateFileStatus(fileId, { uploadStatus: 'success', uploadProgress: 100 });
      }
    } catch (error) {
      clearInterval(progressInterval);
      updateFileStatus(fileId, { uploadStatus: 'failed', uploadProgress: 0 });
    }
  };

  // 重试上传
  const retryUpload = (fileId: string) => {
    uploadFile(fileId);
  };

  // 当初始数据变化时，更新表单（用于编辑不同帖子时）
  useEffect(() => {
    setTitle(initialTitle);
    setBody(initialBody);
    setAddedFolders(initialFolders);
  }, [initialTitle, initialBody, initialFolders]);

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-9" /> {/* 占位 */}
        </div>
      </div>

      {/* 主内容区 */}
      <div className="px-4 pt-4 pb-32">
        {/* 配图预览 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-pink-50 rounded-2xl p-6 flex items-center justify-center min-h-[180px] border border-gray-100">
            <div className="text-center">
              <div className="text-4xl text-gray-300 font-serif mb-2">"</div>
              <div className="text-xl font-bold text-gray-800">{text || '我怎么发小红书'}</div>
            </div>
          </div>
          <button className="bg-gray-100 rounded-2xl flex items-center justify-center min-h-[180px] border-2 border-dashed border-gray-300 hover:bg-gray-200 transition-colors">
            <div className="text-center">
              <div className="text-4xl text-gray-400 mb-2">+</div>
              <div className="text-sm text-gray-500">添加更多</div>
            </div>
          </button>
        </div>

        {/* 标题输入 */}
        <input
          type="text"
          placeholder="添加标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-base mb-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {/* 正文输入 */}
        <textarea
          placeholder="添加正文"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-base min-h-[120px] resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {/* 添加文件夹选项 */}
        <div className="mt-4">
          <button
            onClick={() => setShowFolderEditor(true)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FolderPlus size={20} className="text-gray-600" />
              <span className="text-gray-900">添加文件夹</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* 已添加的文件列表 */}
        {addedFolders.length > 0 && addedFolders.some(f => f.files.length > 0) && (
          <div className="mt-4 space-y-3">
            <div className="text-sm font-medium text-gray-700 mb-2">已关联的文件</div>
            {addedFolders.map((folder, index) => (
              folder.files.length > 0 && (
                <div key={index} className="space-y-2">
                  {folder.files.map((file, fileIndex) => (
                    <div 
                      key={file.id || fileIndex} 
                      className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                        file.uploadStatus === 'uploading' 
                          ? 'bg-blue-50 border border-blue-200' 
                          : file.uploadStatus === 'success'
                          ? 'bg-green-50 border border-green-200'
                          : file.uploadStatus === 'failed'
                          ? 'bg-red-50 border border-red-200'
                          : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FilePlus size={14} className={`flex-shrink-0 ${
                          file.uploadStatus === 'uploading' 
                            ? 'text-blue-500' 
                            : file.uploadStatus === 'success'
                            ? 'text-green-500'
                            : file.uploadStatus === 'failed'
                            ? 'text-red-500'
                            : 'text-gray-400'
                        }`} />
                        <span className={`truncate flex-1 text-sm ${
                          file.uploadStatus === 'uploading' 
                            ? 'text-blue-700' 
                            : file.uploadStatus === 'success'
                            ? 'text-green-700'
                            : file.uploadStatus === 'failed'
                            ? 'text-red-700'
                            : 'text-gray-700'
                        }`}>
                          {file.title || file.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {file.uploadStatus === 'uploading' && (
                          <div className="flex items-center gap-1.5 text-blue-500">
                            <Loader2 size={14} className="animate-spin" />
                            <span className="text-xs font-medium">
                              {file.uploadProgress ? Math.round(file.uploadProgress) : 0}%
                            </span>
                          </div>
                        )}
                        {file.uploadStatus === 'success' && (
                          <CheckCircle2 size={16} className="text-green-500" />
                        )}
                        {file.uploadStatus === 'failed' && (
                          <div className="flex items-center gap-1.5">
                            <AlertCircle size={16} className="text-red-500" />
                            <button
                              onClick={() => retryUpload(file.id)}
                              className="text-xs text-red-600 hover:text-red-700 hover:underline font-medium"
                            >
                              重试
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => {
                            const newFolders = addedFolders.map((f, i) => 
                              i === index 
                                ? { ...f, files: f.files.filter((_, fi) => fi !== fileIndex) }
                                : f
                            ).filter(f => f.files.length > 0);
                            setAddedFolders(newFolders);
                          }}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
        <div className="max-w-[480px] mx-auto">
          {/* 发布按钮 */}
          <div className="flex gap-3 px-4 py-3">
            <button
              onClick={onSaveDraft}
              className="flex-1 bg-gray-100 text-gray-900 rounded-full py-3.5 text-base font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors"
            >
              存草稿
            </button>
            <button
              onClick={() => {
                onPublish({
                  title,
                  body,
                  folders: addedFolders,
                });
              }}
              className="flex-1 bg-red-500 text-white rounded-full py-3.5 text-base font-medium hover:bg-red-600 active:bg-red-700 transition-colors shadow-lg"
            >
              发布笔记
            </button>
          </div>
        </div>
      </div>

      {/* 文件夹编辑框 */}
      {showFolderEditor && (
        <>
          {/* 遮罩层 */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowFolderEditor(false)}
          />
          
          {/* 编辑框 */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-w-[480px] mx-auto animate-slide-up">
            <div className="p-6">
              {/* 标题栏 */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">关联学习空间文件</h3>
                <button
                  onClick={() => setShowFolderEditor(false)}
                  className="p-2 -mr-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* 关联学习空间文件选项 */}
              <div className="mb-4">
                <button
                  onClick={() => {
                    setShowFolderEditor(false);
                    if (onOpenLearningSpace) {
                      onOpenLearningSpace();
                    }
                  }}
                  className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                >
                  <Cloud size={24} className="text-blue-600" />
                  <span className="text-base font-medium">关联学习空间文件</span>
                </button>
              </div>


              {/* 取消按钮 */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowFolderEditor(false);
                  }}
                  className="flex-1 bg-gray-100 text-gray-900 rounded-xl py-3 text-base font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

