import { FileText, Upload, Folder, MessageCircle, Image } from 'lucide-react';

interface AddFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (action: string) => void;
}

export default function AddFileModal({ isOpen, onClose, onSelect }: AddFileModalProps) {
  if (!isOpen) return null;

  const actions = [
    {
      id: 'transfer',
      name: '从资料库转移',
      icon: <FileText size={24} className="text-blue-500" />,
      bgColor: 'bg-blue-50',
    },
    {
      id: 'upload',
      name: '上传文件',
      icon: <Upload size={24} className="text-blue-500" />,
      bgColor: 'bg-blue-50',
    },
    {
      id: 'folder',
      name: '新建文件夹',
      icon: <Folder size={24} className="text-orange-500" />,
      bgColor: 'bg-orange-50',
    },
    {
      id: 'wechat',
      name: '微信上传',
      icon: <MessageCircle size={24} className="text-green-500" />,
      bgColor: 'bg-green-50',
    },
    {
      id: 'photo',
      name: '上传照片',
      icon: <Image size={24} className="text-blue-500" />,
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* 操作列表 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 shadow-lg">
        <div className="p-4 space-y-2">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => {
                onSelect(action.id);
                onClose();
              }}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation"
            >
              <span className="text-base text-gray-900">{action.name}</span>
              <div className={`w-10 h-10 rounded-full ${action.bgColor} flex items-center justify-center`}>
                {action.icon}
              </div>
            </button>
          ))}
        </div>
        <div className="p-4 pt-0">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg active:bg-gray-200 transition-colors touch-manipulation text-base font-medium"
          >
            取消
          </button>
        </div>
      </div>
    </>
  );
}

