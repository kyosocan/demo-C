import { useEffect, useMemo, useRef, useState } from 'react';
import { MaterialContent } from '../types';
import PostMenuDrawer from './PostMenuDrawer';
import { getImageUrl } from '../utils/imageUtils';

interface MaterialDetailProps {
  content: MaterialContent;
  onBack: () => void;
  onFileListClick?: (files: FileItem[], title: string) => void;
  onEdit?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
  currentUserId?: string; // 当前登录用户ID
  onAvatarClick?: (authorId: string, authorName: string, authorAvatar?: string) => void; // 头像点击事件
}

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'file';
  date: string;
  size?: string;
  title?: string; // 文件卡片标题
  cover?: string; // 文件卡片封面
}

interface CommentItem {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  time: string;
  likes: number;
  replies?: CommentItem[]; // 回复列表
}

// 模拟文件数据 - 每个文件有自己的标题和封面
const mockFiles: FileItem[] = [
  { 
    id: '1', 
    name: '2025学年浦东新区上海实验学校三年级期末数学试卷', 
    type: 'pdf', 
    date: '2025-09-11',
    size: '2.5MB',
    title: '三年级期末数学试卷包',
    cover: '/image/三年级思维训练.jpg'
  },
  { 
    id: '2', 
    name: '2024~2025年上海宝山区宝山实验小学期末卷', 
    type: 'pdf', 
    date: '2025-09-10',
    size: '1.8MB',
    title: '宝山实验小学期末卷',
    cover: '/image/小学阅读理解答题模板.png'
  },
  { 
    id: '3', 
    name: '2025年上海普陀区进华中学期末卷', 
    type: 'pdf', 
    date: '2025-09-09',
    size: '2.1MB',
    title: '进华中学期末卷',
    cover: '/image/小学 1-6 年级资料汇总.jpg'
  },
  { 
    id: '4', 
    name: '2025年上海浦东新区上海市建平进华小学期末卷', 
    type: 'pdf', 
    date: '2025-09-08',
    size: '1.9MB',
    title: '建平进华小学期末卷',
    cover: '/image/青春期叛逆.png'
  },
  { 
    id: '5', 
    name: '2024~2025学年上海虹口区上海外国语大学附属小学期末数学卷', 
    type: 'pdf', 
    date: '2025-09-07',
    size: '2.3MB',
    title: '上外附小期末数学卷',
    cover: '/image/三年级思维训练.jpg'
  },
];

const fontPingFang = { fontFamily: 'PingFang SC, sans-serif' } as const;

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M15 6L9 12L15 18" stroke="rgba(0,0,0,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MoreDotsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="6.5" cy="12" r="1.5" fill="rgba(0,0,0,0.9)" />
    <circle cx="12" cy="12" r="1.5" fill="rgba(0,0,0,0.9)" />
    <circle cx="17.5" cy="12" r="1.5" fill="rgba(0,0,0,0.9)" />
  </svg>
);

const PencilIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M14.5 6.5L17.5 9.5M4 20H7.5L18.5 9C19.1 8.4 19.1 7.6 18.5 7L17 5.5C16.4 4.9 15.6 4.9 15 5.5L4 16.5V20Z"
      stroke="rgba(0,0,0,0.4)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HeartOutlineIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M10 5.3C10 5.3 8.2 3 5.7 3C3.5 3 2.2 4.7 2.2 6.7C2.2 10.4 10 16.2 10 16.2C10 16.2 17.8 10.4 17.8 6.7C17.8 4.7 16.5 3 14.3 3C11.8 3 10 5.3 10 5.3Z"
      stroke="rgba(0,0,0,0.9)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CommentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M6.8 15.8L4 17V14.8C3 13.8 2.4 12.5 2.4 11V7.5C2.4 5.2 4.3 3.4 6.6 3.4H13.4C15.7 3.4 17.6 5.2 17.6 7.5V11C17.6 13.3 15.7 15.2 13.4 15.2H7.8C7.4 15.2 7.1 15.4 6.8 15.8Z"
      stroke="rgba(0,0,0,0.9)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M12 5L16 9L12 13"
      stroke="rgba(0,0,0,0.9)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 9H15"
      stroke="rgba(0,0,0,0.9)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const FolderIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M4.5 9.5C4.5 8.4 5.4 7.5 6.5 7.5H13.2L15 9.6C15.4 10 15.9 10.2 16.4 10.2H25.5C26.6 10.2 27.5 11.1 27.5 12.2V22.5C27.5 23.6 26.6 24.5 25.5 24.5H6.5C5.4 24.5 4.5 23.6 4.5 22.5V9.5Z"
      fill="#F2C94C"
    />
    <path
      d="M4.5 12.2C4.5 11.1 5.4 10.2 6.5 10.2H25.5C26.6 10.2 27.5 11.1 27.5 12.2V22.5C27.5 23.6 26.6 24.5 25.5 24.5H6.5C5.4 24.5 4.5 23.6 4.5 22.5V12.2Z"
      fill="#F6D365"
      opacity="0.9"
    />
  </svg>
);

export default function MaterialDetail({ 
  content, 
  onBack, 
  onFileListClick,
  onEdit,
  onShare,
  onDelete,
  currentUserId = '我在魔都汇', // 默认当前用户
  onAvatarClick,
}: MaterialDetailProps) {
  const [likeCount, setLikeCount] = useState(150);
  const [commentCount, setCommentCount] = useState(150);
  const [shareCount, setShareCount] = useState(150);
  const [isFollowing, setIsFollowing] = useState(false);
  const [coverError, setCoverError] = useState(false);
  const [showMenuDrawer, setShowMenuDrawer] = useState(false);
  const [showTransferGuide, setShowTransferGuide] = useState(false);
  const [guideRect, setGuideRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [guideTooltipTop, setGuideTooltipTop] = useState<number | null>(null);
  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const fileCardRef = useRef<HTMLButtonElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // 判断是否是自己的帖子
  const isMyPost = content.author === currentUserId;

  const description = useMemo(() => {
    // 设计稿为 14px/18px、黑色 60% 的正文；尽量复用数据里的 description，否则给一个合理 fallback
    if (content.description && content.description.trim().length > 0) return content.description;
    return '一年快开学轻松拿捏一年级，提前快规划好几个方向，梳理孩子学习方向👶开学不迷茫';
  }, [content.description]);

  const canShowTransferGuide = Boolean((content.fileCount && content.fileCount > 0) && onFileListClick);
  const step1GuideKey = useMemo(() => `guide_transfer_step1_seen_${content.id}`, [content.id]);

  const openFileList = () => {
    try {
      localStorage.setItem(step1GuideKey, 'seen');
    } catch {
      // ignore
    }
    onFileListClick?.(mockFiles, content.title);
  };

  const markGuideSeenAndClose = () => {
    try {
      localStorage.setItem(step1GuideKey, 'seen');
    } catch {
      // ignore
    }
    setShowTransferGuide(false);
  };

  // 新手引导：仅首次进入且存在“资料卡片”时显示
  useEffect(() => {
    if (!canShowTransferGuide) return;
    let seen = false;
    try {
      seen = localStorage.getItem(step1GuideKey) === 'seen';
    } catch {
      seen = false;
    }
    if (seen) return;

    // 等待布局完成后计算高亮位置
    const t = window.setTimeout(() => {
      const containerEl = pageContainerRef.current;
      const targetEl = fileCardRef.current;
      if (!containerEl || !targetEl) return;

      const c = containerEl.getBoundingClientRect();
      const r = targetEl.getBoundingClientRect();

      const padding = 6; // 高亮外扩
      const top = Math.max(0, r.top - c.top - padding);
      const left = Math.max(0, r.left - c.left - padding);
      const width = Math.min(c.width, r.width + padding * 2);
      const height = r.height + padding * 2;

      setGuideRect({ top, left, width, height });
      // 先给一个默认位置，后续会根据气泡高度二次计算，确保不遮挡高亮区域
      setGuideTooltipTop(12);
      setShowTransferGuide(true);
    }, 60);

    return () => window.clearTimeout(t);
  }, [canShowTransferGuide, content.id, step1GuideKey]);

  // 二次定位气泡：测量气泡高度，确保不遮挡附件卡片高亮区域
  useEffect(() => {
    if (!showTransferGuide || !guideRect) return;
    const containerEl = pageContainerRef.current;
    const tipEl = tooltipRef.current;
    if (!containerEl || !tipEl) return;

    const containerHeight = containerEl.getBoundingClientRect().height;
    const tipHeight = tipEl.getBoundingClientRect().height;

    const margin = 12;
    // 优先放在高亮上方
    let top = guideRect.top - tipHeight - margin;
    // 如果上方放不下，则放在高亮下方
    if (top < margin) {
      top = guideRect.top + guideRect.height + margin;
    }
    // 如果下方也放不下，则回退到顶部安全区（尽量不遮挡）
    if (top + tipHeight + margin > containerHeight) {
      top = margin;
    }

    // 若仍发生重叠（例如用户把附件卡片滚到很靠上），则强制放到高亮下方并留空
    const overlaps = !(top + tipHeight + margin <= guideRect.top || top >= guideRect.top + guideRect.height + margin);
    if (overlaps) {
      const below = guideRect.top + guideRect.height + margin;
      top = below + tipHeight + margin <= containerHeight ? below : margin;
    }

    setGuideTooltipTop(top);
  }, [showTransferGuide, guideRect]);

  return (
    <div className="min-h-screen bg-white flex justify-center">
      {/* 详情页严格按 375 宽设计稿实现 */}
      <div ref={pageContainerRef} className="w-full max-w-[375px] bg-white min-h-screen relative">
        {/* 顶栏（Status bar + Navbar） */}
        <div className="sticky top-0 z-50 bg-white">
          {/* Status bar 占位（44px） */}
          <div className="h-[44px] flex items-center justify-between px-5" style={fontPingFang}>
            <div className="text-[15px] font-semibold tracking-[-0.3px] text-black">9:41</div>
            <div className="flex items-center gap-1 text-black opacity-90">
              <div className="w-[17px] h-[10px] border-2 border-black rounded-sm" />
              <div className="w-[15px] h-[10px] border-2 border-black rounded-sm opacity-70" />
              <div className="relative w-[22px] h-[11px] border border-black/40 rounded-[2.667px]">
                <div className="absolute left-[1px] top-[1px] bottom-[1px] right-[3px] bg-black rounded-[1.333px]" />
              </div>
              <div className="w-[1.3px] h-[4px] bg-black/70 rounded-r ml-[1px]" />
            </div>
          </div>

          {/* Navbar（44px） */}
          <div className="h-[44px] relative overflow-hidden">
            <button
              onClick={onBack}
              className="absolute left-[16px] top-[10px] w-[24px] h-[24px] flex items-center justify-center touch-manipulation"
              aria-label="返回"
            >
              <BackIcon />
            </button>

            {/* 头像 + 圈子名（按设计稿：x=48, gap=4, avatar=28） */}
            <div className="absolute left-[48px] top-1/2 -translate-y-1/2 flex items-center gap-[4px]">
              <button
                onClick={() => {
                  if (onAvatarClick && !isMyPost) {
                    onAvatarClick(content.author, content.author, content.authorAvatar);
                  }
                }}
                className={isMyPost ? '' : 'touch-manipulation'}
                aria-label="查看头像"
              >
                <img
                  src={getImageUrl(content.authorAvatar || '')}
                  alt={content.author}
                  className="w-[28px] h-[28px] rounded-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </button>
              <div
                className="text-[16px] font-medium text-[rgba(0,0,0,0.9)]"
                style={fontPingFang}
              >
                {content.author}
              </div>
            </div>

            {/* 关注按钮 */}
            {!isMyPost && (
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                className="absolute left-[263px] top-[8px] h-[28px] w-[60px] bg-[#FB2628] rounded-[14px] px-[12px] flex items-center justify-center touch-manipulation"
              >
                <span className="text-[12px] font-medium leading-[18px] text-white" style={fontPingFang}>
                  {isFollowing ? '已关注' : '关注'}
                </span>
                </button>
            )}

            {/* 更多 */}
            <button
              onClick={() => {
                if (isMyPost) setShowMenuDrawer(true);
              }}
              className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[24px] h-[24px] flex items-center justify-center touch-manipulation"
              aria-label="更多"
            >
              <MoreDotsIcon />
            </button>
        </div>
      </div>

        {/* 主内容 */}
        <div className="pb-[120px]">
          {/* Post image（500px） */}
          <div className="w-full h-[500px] bg-[#F7F8FC] overflow-hidden">
        {content.cover && !coverError ? (
          <img
            src={getImageUrl(content.cover)}
            alt={content.title}
            className="w-full h-full object-cover"
                onError={() => setCoverError(true)}
          />
        ) : (
              <div className="w-full h-full bg-[#F7F8FC]" />
            )}
          </div>

          {/* Divider dots（4 个 6x2） */}
          <div className="flex justify-center mt-[8px]">
            <div className="flex items-center gap-[1px]">
              <div className="w-[6px] h-[2px] rounded-[1px] bg-[#FB2628]" />
              <div className="w-[6px] h-[2px] rounded-[1px] bg-black/10" />
              <div className="w-[6px] h-[2px] rounded-[1px] bg-black/10" />
              <div className="w-[6px] h-[2px] rounded-[1px] bg-black/10" />
            </div>
      </div>

          {/* 标题 + 正文 */}
          <div className="px-[16px] pt-[16px]">
            <div
              className="text-[16px] font-semibold leading-[24px] text-[rgba(0,0,0,0.9)]"
              style={fontPingFang}
            >
          {content.title}
            </div>

            <div
              className="mt-[8px] text-[14px] font-normal leading-[18px] text-[rgba(0,0,0,0.6)] whitespace-pre-wrap"
              style={fontPingFang}
            >
              {description}
        </div>

            {/* File info（可点） */}
        {content.fileCount && content.fileCount > 0 && (
              <button
                ref={fileCardRef}
                onClick={openFileList}
                className="mt-[16px] w-full bg-[#F7F8FC] rounded-[8px] px-[12px] py-[8px] flex items-center gap-[12px] touch-manipulation"
              >
                <div className="w-[32px] h-[32px] flex items-center justify-center">
                  <FolderIcon />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div
                    className="text-[14px] font-medium leading-[22px] text-[rgba(0,0,0,0.9)] truncate"
                    style={fontPingFang}
                  >
                    {content.title}
                  </div>
                  <div
                    className="text-[12px] font-normal leading-[18px] text-black/40"
                    style={fontPingFang}
                  >
                    包含{content.fileCount}个文件
                  </div>
                </div>
              </button>
            )}

            {/* 时间 */}
            <div
              className="mt-[16px] text-[12px] font-normal leading-[18px] text-[rgba(0,0,0,0.6)]"
              style={fontPingFang}
            >
              编辑于{content.createdAt || '3天前'}
            </div>
          </div>
        </div>

        {/* 底部栏（62px + Home indicator 34px） */}
        <div className="fixed left-0 right-0 bottom-0 z-40 flex justify-center">
          <div className="w-full max-w-[375px]">
            <div className="bg-white border-t border-black/5 h-[62px] flex items-center px-[16px]">
              {/* 评论输入 */}
              <button
                className="bg-black/3 h-[44px] w-[173px] rounded-[12px] px-[16px] py-[10px] flex items-center gap-[4px] overflow-hidden touch-manipulation"
                aria-label="说点什么吧"
              >
                <PencilIcon />
                <span className="text-[14px] leading-[22px] text-black/40" style={fontPingFang}>
                  说点什么吧
                </span>
              </button>

              {/* 互动组 */}
              <div className="ml-auto flex items-center gap-[12px]">
                <button
                  onClick={() => setLikeCount((v) => v + 1)}
                  className="flex items-center gap-[2px] touch-manipulation"
                  aria-label="点赞"
                >
                  <div className="opacity-90">
                    <HeartOutlineIcon />
                  </div>
                  <span className="text-[12px] leading-[18px] text-[rgba(0,0,0,0.9)] w-[28px]" style={fontPingFang}>
                    {likeCount}
                  </span>
                  </button>

                <button
                  onClick={() => setCommentCount((v) => v + 1)}
                  className="flex items-center gap-[2px] touch-manipulation"
                  aria-label="评论"
                >
                  <div className="opacity-90">
                    <CommentIcon />
                          </div>
                  <span className="text-[12px] leading-[18px] text-[rgba(0,0,0,0.9)] w-[28px]" style={fontPingFang}>
                    {commentCount}
                  </span>
                            </button>

                <button
                  onClick={() => {
                    setShareCount((v) => v + 1);
                    onShare?.();
                  }}
                  className="flex items-center gap-[2px] touch-manipulation"
                  aria-label="分享"
                >
                  <div className="opacity-90">
                    <ShareIcon />
                  </div>
                  <span className="text-[12px] leading-[18px] text-[rgba(0,0,0,0.9)] w-[28px]" style={fontPingFang}>
                    {shareCount}
                  </span>
                </button>
              </div>
            </div>

            {/* Home indicator（34px） */}
            <div className="h-[34px] bg-white flex justify-center items-end pb-[8px]">
              <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
            </div>
        </div>
      </div>
      
        {/* 新手引导：资料转存 */}
        {showTransferGuide && guideRect && (
          <div className="fixed inset-0 z-[60] flex justify-center">
            <div className="w-full max-w-[375px] relative">
              {/* 蒙版（挖洞效果用 boxShadow 实现） */}
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

              {/* 点击任意非高亮区域关闭（不遮挡高亮区域的点击） */}
              <button
                className="absolute inset-0 bg-transparent"
                onClick={markGuideSeenAndClose}
                aria-label="关闭引导"
              />

              {/* 透明热区：点击高亮区域直接进入附件列表 */}
              <button
                className="absolute rounded-[12px] bg-transparent"
                style={{
                  top: guideRect.top,
                  left: guideRect.left,
                  width: guideRect.width,
                  height: guideRect.height,
                }}
                onClick={() => {
                  markGuideSeenAndClose();
                  openFileList();
                }}
                aria-label="查看附件"
              />

              {/* 提示气泡 */}
              <div
                className="absolute left-[16px] right-[16px]"
                style={{ top: guideTooltipTop ?? 16 }}
              >
                <div
                  ref={tooltipRef}
                  className="bg-white rounded-[14px] px-[14px] py-[12px]"
                  style={{ boxShadow: '0px 10px 30px rgba(0,0,0,0.18)' }}
                >
                  <div className="text-[14px] font-semibold text-[rgba(0,0,0,0.9)]" style={fontPingFang}>
                    点附件卡片查看文件
                  </div>
                  <div className="mt-[4px] text-[12px] leading-[18px] text-[rgba(0,0,0,0.6)]" style={fontPingFang}>
                    进入后可一键转存到学习空间
                  </div>
                  <div className="mt-[10px] flex items-center justify-end gap-[10px]">
                    <button
                      onClick={markGuideSeenAndClose}
                      className="px-[10px] py-[6px] rounded-full bg-black/5 text-[12px] text-[rgba(0,0,0,0.6)] touch-manipulation"
                      style={fontPingFang}
                    >
                      我知道了
              </button>
            </div>
          </div>
        </div>
      </div>
          </div>
        )}

      {/* 帖子菜单抽屉 */}
      {isMyPost && (
        <PostMenuDrawer
          isOpen={showMenuDrawer}
          onClose={() => setShowMenuDrawer(false)}
          onEdit={() => {
            if (onEdit) onEdit();
          }}
          onShare={() => {
            if (onShare) onShare();
          }}
          onDelete={() => {
            if (onDelete) onDelete();
          }}
        />
      )}
    </div>
    </div>
  );
}

