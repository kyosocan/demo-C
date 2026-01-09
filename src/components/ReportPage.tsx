import { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import StatusBar from './StatusBar';

interface ReportPageProps {
  onBack: () => void;
  onSubmit: (data: ReportData) => void;
}

interface ReportData {
  mainReason: string;
  subReason: string;
  content: string;
  images: string[];
}

// 举报主分类
const MAIN_REASONS = [
  {
    id: 'harm',
    title: '对他人造成困扰或危害',
    description: '含有违法违规，色情低俗、涉嫌诈骗、违规营销及其他可能导致他人困扰或危害的内容',
  },
  {
    id: 'infringement',
    title: '侵犯我/我的组织的权益',
    description: '含有中伤名誉、泄漏肖像及隐私、抄袭搬运、假冒商标或专利、冒充身份等对我造成侵权的内容',
  },
];

// 补充举报原因
const SUB_REASONS = [
  '色情低俗',
  '政治敏感',
  '涉嫌诈骗',
  '违法违规',
  '违反公德秩序',
  '危害人身安全',
  '未成年不当行为',
  '违规营销、煽动对立',
  '饭圈乱象',
  '虚假不实',
  'AI造假',
  '标题党',
  '引人不适',
  '诱导关注、点赞',
  '搬运抄袭他人作品',
  '不属于以上类型',
];

export default function ReportPage({ onBack, onSubmit }: ReportPageProps) {
  const [selectedMainReason, setSelectedMainReason] = useState<string | null>(null);
  const [selectedSubReason, setSelectedSubReason] = useState<string | null>(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  // 判断是否可以提交举报
  const canSubmit = selectedMainReason !== null && selectedSubReason !== null;

  // 判断是否显示补充举报原因
  const showSubReasons = selectedMainReason === 'harm';

  const handleSubmit = () => {
    if (!canSubmit) return;
    
    onSubmit({
      mainReason: selectedMainReason!,
      subReason: selectedSubReason!,
      content: reportContent,
      images: images,
    });
  };

  const handleAddImage = () => {
    // 模拟添加图片
    const mockImage = `https://picsum.photos/200/200?random=${Date.now()}`;
    if (images.length < 4) {
      setImages([...images, mockImage]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#F4F5FA] flex flex-col">
      {/* 状态栏 */}
      <div className="bg-white">
        <StatusBar />
      </div>

      {/* 顶部导航 */}
      <div className="bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button
          onClick={onBack}
          className="touch-manipulation p-1"
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-base font-medium text-gray-900">选择笔记举报原因</h1>
        <div className="w-8" /> {/* 占位 */}
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* 主分类选择 */}
        <div className="bg-white mx-4 mt-4 rounded-xl overflow-hidden">
          {MAIN_REASONS.map((reason, index) => (
            <div key={reason.id}>
              <button
                onClick={() => {
                  setSelectedMainReason(reason.id);
                  // 如果选择的不是"对他人造成困扰或危害"，清空子原因
                  if (reason.id !== 'harm') {
                    setSelectedSubReason(null);
                  }
                }}
                className="w-full text-left p-4 flex items-start justify-between"
              >
                <div className="flex-1 pr-4">
                  <h3 className="text-base font-medium text-gray-900">{reason.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{reason.description}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                  selectedMainReason === reason.id
                    ? 'border-[#FB2628] bg-[#FB2628]'
                    : 'border-gray-300'
                }`}>
                  {selectedMainReason === reason.id && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </button>
              {index < MAIN_REASONS.length - 1 && (
                <div className="h-px bg-gray-100 mx-4" />
              )}
            </div>
          ))}
        </div>

        {/* 补充举报原因 - 只在选择"对他人造成困扰或危害"时显示 */}
        {showSubReasons && (
          <div className="bg-white mx-4 mt-4 rounded-xl p-4">
            <h3 className="text-base font-medium text-gray-900 mb-4">
              补充举报原因 <span className="text-[#FB2628]">*</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {SUB_REASONS.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setSelectedSubReason(reason)}
                  className={`px-3 py-2 rounded-full text-sm border transition-colors ${
                    selectedSubReason === reason
                      ? 'border-[#FB2628] text-[#FB2628] bg-red-50'
                      : 'border-gray-200 text-gray-700 bg-white'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>

            {/* 补充更多举报信息 */}
            <button
              onClick={() => setShowMoreInfo(!showMoreInfo)}
              className="flex items-center gap-1 text-sm text-gray-500 mt-4"
            >
              <span>补充更多举报信息</span>
              {showMoreInfo ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            {/* 展开的举报内容填写区域 */}
            {showMoreInfo && (
              <div className="mt-4 bg-white rounded-xl border border-gray-100 p-4">
                <h4 className="text-base font-medium text-gray-900 mb-2">举报内容</h4>
                <p className="text-sm text-gray-500 mb-3">请详细填写，以提高举报通过率</p>
                <textarea
                  value={reportContent}
                  onChange={(e) => setReportContent(e.target.value)}
                  placeholder=""
                  maxLength={400}
                  className="w-full h-24 border-none bg-transparent resize-none text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                />
                <div className="text-right text-xs text-gray-400">
                  {reportContent.length}/400
                </div>

                {/* 图片上传 */}
                <div className="flex flex-wrap gap-3 mt-3">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-20 h-20">
                      <img
                        src={image}
                        alt={`上传图片 ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center"
                      >
                        <X size={12} className="text-white" />
                      </button>
                    </div>
                  ))}
                  {images.length < 4 && (
                    <button
                      onClick={handleAddImage}
                      className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center"
                    >
                      <Plus size={24} className="text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 底部提交按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 border-t border-gray-100">
        <div className="max-w-[480px] mx-auto">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full py-3 rounded-full text-base font-medium transition-colors ${
              canSubmit
                ? 'bg-[#FB2628] text-white active:bg-[#E02325]'
                : 'bg-red-100 text-white cursor-not-allowed'
            }`}
          >
            举报
          </button>
        </div>
      </div>
    </div>
  );
}









