/**
 * Floating Action Button - 严格按 Figma 设计稿还原
 * 位置: x=303, y=649 (相对于 375x812 的画布)
 * 尺寸: 56x56
 * 颜色: #FB2628 (品牌红色)
 */

interface FloatingActionButtonProps {
  onClick?: () => void;
}

export default function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute w-[56px] h-[56px] rounded-full flex items-center justify-center touch-manipulation active:scale-95 transition-transform"
      style={{
        left: '303px',
        top: '649px',
        backgroundColor: '#FB2628',
        boxShadow: '0px 4px 20px 0px rgba(251, 38, 40, 0.5)',
      }}
    >
      {/* 加号图标 */}
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 水平线 */}
        <line x1="0" y1="9" x2="18" y2="9" stroke="white" strokeWidth="3" strokeLinecap="round" />
        {/* 垂直线 */}
        <line x1="9" y1="0" x2="9" y2="18" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </button>
  );
}

