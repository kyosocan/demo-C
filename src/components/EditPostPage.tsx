import React, { useEffect } from 'react';
import { ArrowLeft, FolderPlus, FilePlus, X, Heart, MessageCircle, Download, Smartphone, MessageCircle as WeChatIcon, Folder } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'file';
  date: string;
  size?: string;
  title?: string;
  cover?: string;
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
}

export default function EditPostPage({
  text = '',
  initialTitle = '',
  initialBody = '',
  initialFolders = [],
  onBack,
  onPublish,
  onSaveDraft,
}: EditPostPageProps) {
  const [title, setTitle] = React.useState(initialTitle);
  const [body, setBody] = React.useState(initialBody);
  const [showFolderEditor, setShowFolderEditor] = React.useState(false);
  const [folderName, setFolderName] = React.useState('');
  const [files, setFiles] = React.useState<FileItem[]>([]);
  const [addedFolders, setAddedFolders] = React.useState<FolderData[]>(initialFolders);

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

        {/* 已添加的文件夹列表 */}
        {addedFolders.length > 0 && (
          <div className="mt-4 space-y-3">
            <div className="text-sm font-medium text-gray-700 mb-2">已添加的文件夹</div>
            {addedFolders.map((folder, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Folder size={20} className="text-yellow-500" />
                  <span className="text-base font-medium text-gray-900">{folder.name}</span>
                  <button
                    onClick={() => {
                      setAddedFolders(addedFolders.filter((_, i) => i !== index));
                    }}
                    className="ml-auto p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                {folder.files.length > 0 && (
                  <div className="ml-8 space-y-1">
                    {folder.files.map((file, fileIndex) => (
                      <div key={file.id || fileIndex} className="text-sm text-gray-600 flex items-center gap-2">
                        <FilePlus size={14} className="text-gray-400" />
                        <span className="truncate">{file.title || file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
        <div className="max-w-[480px] mx-auto">
          {/* 互动按钮 */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Heart size={22} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <MessageCircle size={22} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Download size={22} />
              </button>
            </div>
          </div>
          
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
                <h3 className="text-lg font-semibold text-gray-900">添加文件夹</h3>
                <button
                  onClick={() => setShowFolderEditor(false)}
                  className="p-2 -mr-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* 文件夹名称输入 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  文件夹名称
                </label>
                <input
                  type="text"
                  placeholder="请输入文件夹名称"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  autoFocus
                />
              </div>

              {/* 导入文件选项 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  导入文件
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      // 可以添加手机文件选择逻辑
                      const newFile: FileItem = {
                        id: Date.now().toString(),
                        name: `手机文件${files.length + 1}.pdf`,
                        type: 'pdf',
                        date: new Date().toISOString().split('T')[0],
                        size: '2.5MB',
                        title: `手机文件${files.length + 1}.pdf`,
                      };
                      setFiles([...files, newFile]);
                    }}
                    className="flex flex-col items-center justify-center gap-2 px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                  >
                    <Smartphone size={24} className="text-blue-600" />
                    <span className="text-sm font-medium">导入手机文件</span>
                  </button>
                  <button
                    onClick={() => {
                      // 可以添加微信文件选择逻辑
                      const newFile: FileItem = {
                        id: Date.now().toString(),
                        name: `微信文件${files.length + 1}.pdf`,
                        type: 'pdf',
                        date: new Date().toISOString().split('T')[0],
                        size: '2.5MB',
                        title: `微信文件${files.length + 1}.pdf`,
                      };
                      setFiles([...files, newFile]);
                    }}
                    className="flex flex-col items-center justify-center gap-2 px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                  >
                    <WeChatIcon size={24} className="text-green-600" />
                    <span className="text-sm font-medium">导入微信文件</span>
                  </button>
                </div>
              </div>

              {/* 文件列表 */}
              {files.length > 0 && (
                <div className="mb-4 max-h-40 overflow-y-auto">
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm text-gray-700 flex-1 truncate">{file.title || file.name}</span>
                        <button
                          onClick={() => {
                            setFiles(files.filter((_, i) => i !== index));
                          }}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 确认按钮 */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowFolderEditor(false);
                    setFolderName('');
                    setFiles([]);
                  }}
                  className="flex-1 bg-gray-100 text-gray-900 rounded-xl py-3 text-base font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    if (folderName.trim()) {
                      // 保存文件夹信息到列表
                      setAddedFolders([...addedFolders, { name: folderName, files: [...files] }]);
                      setShowFolderEditor(false);
                      setFolderName('');
                      setFiles([]);
                    }
                  }}
                  className="flex-1 bg-blue-500 text-white rounded-xl py-3 text-base font-medium hover:bg-blue-600 active:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!folderName.trim()}
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

