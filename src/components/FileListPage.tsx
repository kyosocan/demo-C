import { useEffect, useMemo, useRef, useState } from 'react';

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
  // 设计稿：每行右侧为“转存到学习空间”云朵按钮
  const saveBtnRef = useRef<HTMLButtonElement | null>(null);

  // 第二层引导：进入文件列表后，引导“转存到学习空间”
  const [showTransferGuide, setShowTransferGuide] = useState(false);
  const [guideRect, setGuideRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number } | null>(null);

  const guideFileId = useMemo(() => files[0]?.id ?? null, [files]);

  const closeGuideAndMarkSeen = () => {
    try {
      localStorage.setItem('guide_transfer_step2_seen', 'seen');
    } catch {
      // ignore
    }
    setShowTransferGuide(false);
  };

  const recomputeGuideTarget = () => {
    const targetEl = saveBtnRef.current;
    if (!targetEl) return;
    const r = targetEl.getBoundingClientRect();
    const pad = 6;
    const top = Math.max(8, r.top - pad);
    const left = Math.max(8, r.left - pad);
    const width = r.width + pad * 2;
    const height = r.height + pad * 2;
    setGuideRect({ top, left, width, height });

    // tooltip 默认放在高亮下方（避免遮挡目标）
    const tooltipTop = Math.min(window.innerHeight - 120, top + height + 10);
    const tooltipLeft = Math.min(Math.max(16, left), window.innerWidth - 260);
    setTooltipPos({ top: tooltipTop, left: tooltipLeft });
  };

  // 初始化第二层引导（仅首次）
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem('guide_transfer_step2_seen') === 'seen';
    } catch {
      seen = false;
    }
    if (seen) return;
    if (!files || files.length === 0) return;

    // 首次进入文件列表页就展示第二层引导
    const t = window.setTimeout(() => {
      setShowTransferGuide(true);
      setGuideStep('openMenu');
    }, 60);
    return () => window.clearTimeout(t);
  }, [files]);

  // 根据步骤更新高亮位置
  useEffect(() => {
    if (!showTransferGuide) return;
    const t = window.setTimeout(() => recomputeGuideTarget(), 0);
    const onResize = () => recomputeGuideTarget();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, true);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize, true);
    };
  }, [showTransferGuide]);

  const handleTransferClick = (fileId: string) => {
    // 转存到学习空间（占位：业务接入点）
    console.log('转存到学习空间:', fileId);
    if (showTransferGuide) closeGuideAndMarkSeen();
  };

  const BackIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15 6L9 12L15 18" stroke="rgba(0,0,0,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const PdfIcon = () => (
    <div className="w-[36px] h-[36px] bg-[#E94B4B] rounded-[4px] flex items-center justify-center flex-shrink-0">
      <span className="text-white text-[12px] font-bold leading-none">PDF</span>
    </div>
  );

  const CloudSaveIcon = ({ active = false }: { active?: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M6.8 14.5H14.2C15.6 14.5 16.8 13.3 16.8 11.9C16.8 10.7 16 9.7 14.9 9.4C14.6 7.3 12.8 5.7 10.6 5.7C8.7 5.7 7.1 6.8 6.4 8.5C5 8.7 3.9 9.9 3.9 11.4C3.9 13.1 5.2 14.5 6.8 14.5Z"
        stroke="rgba(0,0,0,1)"
        strokeOpacity={active ? 0.9 : 0.4}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10.4 12.9V9.2"
        stroke="rgba(0,0,0,1)"
        strokeOpacity={active ? 0.9 : 0.4}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.9 10.6L10.4 9.1L11.9 10.6"
        stroke="rgba(0,0,0,1)"
        strokeOpacity={active ? 0.9 : 0.4}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="w-[375px] min-h-screen bg-[#F4F5FA] relative overflow-hidden">
      {/* Status bar 占位（44px） */}
      <div className="h-[44px]" />

      {/* 顶部 tab（44px） */}
      <div className="h-[44px] relative">
        <button
          onClick={onBack}
          className="absolute left-[24px] top-[10px] w-[24px] h-[24px] flex items-center justify-center touch-manipulation"
          aria-label="返回"
        >
          <BackIcon />
        </button>
        <div
          className="absolute left-1/2 top-[14px] -translate-x-1/2 text-[16px] leading-[16px] font-medium text-[rgba(0,0,0,0.85)]"
          style={{ fontFamily: 'PingFang SC, sans-serif' }}
        >
          {title}
        </div>
      </div>

      {/* 文件列表容器（x=16, y=104, w=343, gap=16） */}
      <div className="absolute left-[16px] top-[104px] w-[343px]">
        <div className="flex flex-col gap-[16px]">
          {files.map((file) => (
            <div key={file.id} className="w-full">
              <div className="flex items-center gap-[24px]">
                {/* 文件信息 */}
                <div className="flex flex-1 min-w-0 items-center gap-[12px]">
                  <div className="w-[36px] h-[36px]">
                    <PdfIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-[14px] leading-[24px] font-medium text-[rgba(0,0,0,0.9)] truncate"
                      style={{ fontFamily: 'PingFang SC, sans-serif' }}
                    >
                      {file.name}
                    </div>
                    <div
                      className="text-[12px] leading-[18px] font-normal text-black/40 truncate"
                      style={{ fontFamily: 'PingFang SC, sans-serif' }}
                    >
                      {file.date}
                      {file.size ? ` ｜ ${file.size}` : ''}
                    </div>
                  </div>
                </div>

                {/* 右侧转存按钮（云朵） */}
                <button
                  onClick={() => handleTransferClick(file.id)}
                  className="w-[20px] h-[20px] flex items-center justify-center touch-manipulation"
                  aria-label="转存到学习空间"
                  ref={file.id === guideFileId ? saveBtnRef : undefined}
                >
                  <CloudSaveIcon />
                </button>
              </div>

              {/* 分割线 */}
              <div className="h-px bg-black/10 mt-[16px]" />
            </div>
          ))}
        </div>
      </div>

      {/* 第二层新手引导：文件列表页转存 */}
      {showTransferGuide && guideRect && tooltipPos && (
        <div className="fixed inset-0 z-[60]">
          {/* 背景遮罩（点击关闭），不阻挡高亮区域交互 */}
          <button className="absolute inset-0 bg-black/55" onClick={closeGuideAndMarkSeen} aria-label="关闭引导" />

          {/* 高亮框 */}
          <div
            className="absolute rounded-[12px]"
            style={{
              top: guideRect.top,
              left: guideRect.left,
              width: guideRect.width,
              height: guideRect.height,
              boxShadow: '0 0 0 9999px rgba(0,0,0,0.55)',
              border: '2px solid rgba(255,255,255,0.9)',
              background: 'rgba(255,255,255,0.06)',
              pointerEvents: 'none',
            }}
          />

          {/* 透明热区：点击云朵按钮即可转存（同时关闭引导） */}
          <button
            className="absolute rounded-[12px] bg-transparent"
            style={{
              top: guideRect.top,
              left: guideRect.left,
              width: guideRect.width,
              height: guideRect.height,
            }}
            onClick={() => {
              if (guideFileId) handleTransferClick(guideFileId);
            }}
            aria-label="转存到学习空间"
          />

          {/* 提示气泡 */}
          <div
            className="absolute w-[260px]"
            style={{
              top: tooltipPos.top,
              left: tooltipPos.left,
            }}
          >
            <div className="bg-white rounded-[14px] px-[12px] py-[10px]" style={{ boxShadow: '0px 10px 30px rgba(0,0,0,0.18)' }}>
              <div className="text-[13px] font-semibold text-[rgba(0,0,0,0.9)]" style={{ fontFamily: 'PingFang SC, sans-serif' }}>
                点云朵一键转存
              </div>
              <div className="mt-[4px] text-[12px] leading-[18px] text-[rgba(0,0,0,0.6)]" style={{ fontFamily: 'PingFang SC, sans-serif' }}>
                转存后会保存到学习空间的「社区」文件夹中
              </div>
              <div className="mt-[8px] flex justify-end">
                <button
                  onClick={closeGuideAndMarkSeen}
                  className="px-[10px] py-[6px] rounded-full bg-black/5 text-[12px] text-[rgba(0,0,0,0.6)] touch-manipulation"
                  style={{ fontFamily: 'PingFang SC, sans-serif' }}
                >
                  我知道了
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

