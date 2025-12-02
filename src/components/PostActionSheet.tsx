
interface PostActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFromAlbum: () => void;
  onCamera: () => void;
  onWriteText: () => void;
}

export default function PostActionSheet({
  isOpen,
  onClose,
  onSelectFromAlbum,
  onCamera,
  onWriteText,
}: PostActionSheetProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 bg-black/40 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* 抽屉 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="bg-white rounded-t-3xl shadow-2xl max-w-[480px] mx-auto">
          {/* 选项列表 */}
          <div className="py-2">
            <button
              onClick={() => {
                onSelectFromAlbum();
                onClose();
              }}
              className="w-full px-6 py-4 text-left text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <span className="text-base">从相册选择</span>
            </button>
            
            <button
              onClick={() => {
                onCamera();
                onClose();
              }}
              className="w-full px-6 py-4 text-left text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <div>
                <span className="text-base">相机</span>
                <span className="text-xs text-gray-500 block mt-0.5">拍摄与直播</span>
              </div>
            </button>
            
            <button
              onClick={() => {
                onWriteText();
                onClose();
              }}
              className="w-full px-6 py-4 text-left text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <span className="text-base">写文字</span>
            </button>
          </div>
          
          {/* 取消按钮 */}
          <div className="border-t border-gray-200 pt-2 pb-safe">
            <button
              onClick={onClose}
              className="w-full px-6 py-4 text-center text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <span className="text-base font-medium">取消</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

