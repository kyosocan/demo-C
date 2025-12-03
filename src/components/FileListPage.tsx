import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MoreVertical, FileText, Folder, Save, Calendar, Printer, X } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'file';
  date: string;
  size?: string;
}

interface FileListPageProps {
  files: FileItem[];
  title: string;
  onBack: () => void;
}

export default function FileListPage({ files, title, onBack }: FileListPageProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
    
    if (action === 'save') {
      // 转存到学习空间
      console.log('转存到学习空间:', fileId);
      // 这里可以添加转存逻辑
    } else if (action === 'homework') {
      // 添加到今日作业
      console.log('添加到今日作业:', fileId);
      // 这里可以添加添加到作业逻辑
    } else if (action === 'print') {
      // 打印
      console.log('打印:', fileId);
      // 这里可以添加打印逻辑
      window.print();
    }
  };

  const handleFileClick = (file: FileItem) => {
    // 点击文件项进行预览
    setPreviewFile(file);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              onClick={onBack}
              className="touch-manipulation p-1 -ml-1"
            >
              <ArrowLeft size={20} className="text-gray-900" />
            </button>
            <span className="text-sm font-medium text-gray-900 truncate">{title}</span>
          </div>
        </div>
      </div>

      {/* 文件列表 */}
      <div className="px-4 py-4">
        <div className="space-y-0">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 relative"
            >
              <div 
                className="flex items-center gap-3 flex-1 cursor-pointer touch-manipulation"
                onClick={() => handleFileClick(file)}
              >
                {file.type === 'folder' ? (
                  <Folder size={24} className="text-yellow-500" />
                ) : file.type === 'pdf' ? (
                  <div className="w-6 h-6 bg-[#FB2628] rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">P</span>
                  </div>
                ) : (
                  <FileText size={24} className="text-gray-400" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 line-clamp-1">{file.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">{file.date}</span>
                    {file.size && <span className="text-xs text-gray-400">{file.size}</span>}
                  </div>
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
                      onClick={() => handleMenuAction('save', file.id)}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 touch-manipulation"
                    >
                      <Save size={16} className="text-gray-400" />
                      <span>转存到学习空间</span>
                    </button>
                    <button
                      onClick={() => handleMenuAction('homework', file.id)}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 touch-manipulation"
                    >
                      <Calendar size={16} className="text-gray-400" />
                      <span>添加到今日作业</span>
                    </button>
                    <button
                      onClick={() => handleMenuAction('print', file.id)}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 touch-manipulation"
                    >
                      <Printer size={16} className="text-gray-400" />
                      <span>打印</span>
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
      </div>

      {/* 文件预览模态框 */}
      {previewFile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* 预览头部 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 truncate">{previewFile.name}</h3>
              <button
                onClick={() => setPreviewFile(null)}
                className="touch-manipulation p-1"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            
            {/* 预览内容 */}
            <div className="flex-1 overflow-auto p-4">
              {previewFile.type === 'pdf' ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 rounded-lg">
                  <FileText size={64} className="text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">{previewFile.name}</p>
                  <p className="text-sm text-gray-400">
                    PDF 预览功能（实际项目中可以集成 PDF.js 等库）
                  </p>
                  <div className="mt-4 px-4 py-2 bg-[#FB2628] text-white rounded-lg cursor-pointer touch-manipulation">
                    下载文件
                  </div>
                </div>
              ) : previewFile.type === 'folder' ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 rounded-lg">
                  <Folder size={64} className="text-yellow-500 mb-4" />
                  <p className="text-gray-600">{previewFile.name}</p>
                  <p className="text-sm text-gray-400 mt-2">文件夹预览</p>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 rounded-lg">
                  <FileText size={64} className="text-gray-400 mb-4" />
                  <p className="text-gray-600">{previewFile.name}</p>
                  <p className="text-sm text-gray-400 mt-2">文件预览</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

