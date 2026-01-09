/**
 * HomePage - 严格按 Figma 设计稿 1:1 还原
 * 设计稿: https://www.figma.com/design/QokpqoxRQjwjJOQgQLZC9o/Untitled?node-id=69-4192
 * 
 * 尺寸规格:
 * - 总宽度: 375px
 * - 总高度: 812px (iPhone X 标准)
 * - 背景色: #f4f5fa
 * 
 * 布局结构:
 * - 状态栏: 0-44px (44px)
 * - 顶部背景渐变: 0-274px
 * - 设备切换栏: 44-88px (44px)
 * - Tab 栏: 88-132px (44px)
 * - 内容区域: 136px 开始
 * - 浮动按钮: x=303, y=649
 * - 底部导航: 729px 开始
 */

import StatusBar from './StatusBar';
import HomeHeader from './HomeHeader';
import HomeContentCard from './HomeContentCard';
import HomeBottomNav from './HomeBottomNav';
import FloatingActionButton from './FloatingActionButton';
import LearningSpacePage from '../LearningSpacePage';
import CreateStudySetModal from '../CreateStudySetModal';
import { useState } from 'react';

// ... FIGMA_ASSETS definition ...

// 模拟学习集推荐数据
const mockStudySets = [
  {
    id: 'ss-1',
    title: '三年级语文上册必背词汇',
    author: '清华徐爸爸',
    authorAvatar: 'https://www.figma.com/api/mcp/asset/cd52d2e5-5b2d-4f1a-aedf-b75273759b42',
    likes: '890',
    coverImage: 'https://www.figma.com/api/mcp/asset/5fb29164-2b51-4951-a54e-5fd8196740c4',
    isStudySet: true,
    cardCount: 24,
  },
  {
    id: 'ss-2',
    title: '魔都小升初英语核心词',
    author: '猫老师妈妈圈',
    authorAvatar: 'https://www.figma.com/api/mcp/asset/01b58077-dc5a-4ec9-9068-0bf2ce357e4e',
    likes: '1.2k',
    coverImage: 'https://www.figma.com/api/mcp/asset/af6863c2-59bb-4342-92b4-f82138afb2bf',
    isStudySet: true,
    cardCount: 50,
  }
];

// 模拟内容数据 - 按照 Figma 设计稿中的内容
const mockContents = [
  {
    id: '1',
    title: '不废妈！魔都1-5年级小数学习重点来啦！',
    author: '猫老师妈妈圈',
    authorAvatar: FIGMA_ASSETS.avatar1,
    likes: '赞',
    coverImage: FIGMA_ASSETS.cover1,
  },
  {
    id: '2',
    title: '上海徐汇区逸夫小学，期末7天冲刺计划',
    author: '我在魔都川...',
    authorAvatar: FIGMA_ASSETS.avatar3,
    likes: '150',
    coverImage: FIGMA_ASSETS.cover2,
  },
  {
    id: '3',
    title: 'AI口算练习太方便了',
    author: '我在魔都...',
    authorAvatar: FIGMA_ASSETS.avatar3,
    likes: '1500',
    coverImage: FIGMA_ASSETS.cover3,
  },
  {
    id: '4',
    title: '上海新课改，减轻学生负担，培养综合素质的全面',
    author: '清华徐爸爸',
    authorAvatar: FIGMA_ASSETS.avatar2,
    likes: '1500',
    coverImage: FIGMA_ASSETS.cover4,
  },
  {
    id: '5',
    title: 'AI口算练习太方便了',
    author: '我在魔都川汇区',
    authorAvatar: FIGMA_ASSETS.avatar3,
    likes: '1500',
    coverImage: FIGMA_ASSETS.cover3,
  },
  {
    id: '6',
    title: '上海新课改，减轻学生负担，培养综合素质的全面',
    author: '清华徐爸爸',
    authorAvatar: FIGMA_ASSETS.avatar2,
    likes: '1500',
    coverImage: FIGMA_ASSETS.cover4,
  },
  {
    id: '7',
    title: '上海徐汇区逸夫小学，期末7天冲刺计划',
    author: '我在魔都川汇区',
    authorAvatar: FIGMA_ASSETS.avatar3,
    likes: '150',
    coverImage: FIGMA_ASSETS.cover2,
  },
  {
    id: '8',
    title: 'AI口算练习太方便了',
    author: '我在魔都川汇区',
    authorAvatar: FIGMA_ASSETS.avatar3,
    likes: '1500',
    coverImage: FIGMA_ASSETS.cover3,
  },
];

interface HomePageProps {
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  onFabClick?: () => void;
  onCardClick?: (id: string) => void;
  onBannerClick?: () => void;
}

export default function HomePage({
  onSearchClick,
  onFilterClick,
  onFabClick,
  onCardClick,
  onBannerClick,
}: HomePageProps) {
  const [showLearnPage, setShowLearnPage] = useState(false);
  const [currentMainTab, setCurrentMainTab] = useState<'learn' | 'love' | 'community' | 'mall' | 'device'>('community');
  const [activeSubTab, setActiveSubTab] = useState<'recommended' | 'studyset'>('recommended');
  const [isStudySetModalOpen, setIsStudySetModalOpen] = useState(false);

  // 根据当前二级 Tab 选择显示的数据
  const displayContents = activeSubTab === 'recommended' ? mockContents : mockStudySets;

  // 将内容分为左右两列（瀑布流布局）
  const leftColumnCards = displayContents.filter((_, index) => index % 2 === 0);
  const rightColumnCards = displayContents.filter((_, index) => index % 2 === 1);

  if (showLearnPage) {
    return (
      <div className="w-[375px] h-[812px] bg-white overflow-hidden relative">
        <LearningSpacePage onBack={() => setShowLearnPage(false)} />
        {/* 在学习页也显示底部导航，以便切回 */}
        <div className="absolute bottom-0 left-0 right-0 z-[100]">
          <HomeBottomNav 
            currentTab="learn" 
            onTabChange={(tab) => {
              if (tab !== 'learn') {
                setShowLearnPage(false);
                setCurrentMainTab(tab);
              }
            }} 
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-[375px] h-[812px] overflow-hidden"
      style={{ backgroundColor: '#f4f5fa' }}
    >
      {/* 顶部背景渐变区域 - 274px 高度 */}
      <div className="absolute top-0 left-0 w-[375px] h-[274px] overflow-hidden">
        {/* 背景图片 */}
        <div
          className="absolute top-[-200px] left-0 w-[375px] h-[375px]"
          style={{
            backgroundImage: `url(${FIGMA_ASSETS.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* 毛玻璃效果层 */}
        <div
          className="absolute top-[-1px] left-0 w-[375px] h-[375px]"
          style={{
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            backgroundColor: 'rgba(47, 71, 255, 0.06)',
          }}
        />
        
        {/* 流星装饰效果 */}
        <div className="absolute top-[15px] right-[20px] opacity-50 mix-blend-soft-light">
          <svg width="172" height="86" viewBox="0 0 172 86" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 圆点 */}
            <circle cx="97" cy="32" r="1.6" fill="white" fillOpacity="0.8" />
            <circle cx="120" cy="45" r="1" fill="white" fillOpacity="0.6" />
            <circle cx="57" cy="31" r="1.6" fill="white" fillOpacity="0.5" />
            <circle cx="75" cy="50" r="1" fill="white" fillOpacity="0.7" />
            <circle cx="140" cy="38" r="0.8" fill="white" fillOpacity="0.6" />
            {/* 流星线 */}
            <line x1="85" y1="20" x2="110" y2="35" stroke="white" strokeOpacity="0.4" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="115" y1="40" x2="150" y2="60" stroke="white" strokeOpacity="0.35" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="75" y1="45" x2="105" y2="65" stroke="white" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
        
        {/* 底部渐变过渡到内容区 */}
        <div
          className="absolute bottom-0 left-0 w-[375px] h-[212px]"
          style={{
            background: 'linear-gradient(180deg, rgba(244, 245, 250, 0) 0%, #f4f5fa 100%)',
          }}
        />
      </div>

      {/* 状态栏 */}
      <StatusBar />

      {/* 顶部 Header（设备栏 + Tab 栏） */}
      <div className="absolute top-[44px] left-0">
        <HomeHeader 
          onSearchClick={onSearchClick} 
          onFilterClick={onFilterClick} 
          activeTab={activeSubTab}
          onTabChange={setActiveSubTab}
        />
      </div>

      {/* 内容区域 - 从 y=136px 开始，可滚动 */}
      <div
        className="absolute top-[136px] left-[16px] w-[343px] overflow-y-auto overflow-x-hidden"
        style={{ height: 'calc(812px - 136px - 83px)' }} // 83px 是底部导航高度
      >
        {/* Banner 活动位（置顶展示，可点击） */}
        <button
          onClick={onBannerClick}
          className="w-full mb-[12px] touch-manipulation active:scale-[0.99] transition-transform"
          style={{ textAlign: 'left' }}
        >
          <div
            className="w-full rounded-[12px] overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, rgba(255,107,107,1) 0%, rgba(251,38,40,1) 100%)',
              boxShadow: '0px 6px 16px rgba(251, 38, 40, 0.18)',
            }}
          >
            <div className="px-[14px] py-[12px] flex items-center justify-between">
              <div className="min-w-0">
                <div
                  className="text-white text-[14px] font-semibold leading-[20px]"
                  style={{ fontFamily: 'PingFang SC, sans-serif' }}
                >
                  7天打卡挑战 · 赢好礼
                </div>
                <div
                  className="text-white/85 text-[10px] leading-[14px] mt-[2px] truncate"
                  style={{ fontFamily: 'PingFang SC, sans-serif' }}
                >
                  全部完成后可免费兑换精选图书
                </div>
              </div>

              <div className="flex items-center gap-[8px] flex-shrink-0">
                <div className="bg-white/18 rounded-[10px] w-[36px] h-[36px] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 3V5M12 19V21M21 12H19M5 12H3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M18.36 5.64L16.95 7.05M7.05 16.95L5.64 18.36M18.36 18.36L16.95 16.95M7.05 7.05L5.64 5.64" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="white"/>
                  </svg>
                </div>
                <div
                  className="bg-white text-[#FB2628] text-[12px] font-semibold leading-[18px] px-[10px] py-[6px] rounded-full"
                  style={{ fontFamily: 'PingFang SC, sans-serif' }}
                >
                  立即参与
                </div>
              </div>
            </div>
          </div>
        </button>

        {/* 两列瀑布流布局 */}
        <div className="flex gap-[7px]">
          {/* 左列 */}
          <div className="flex flex-col gap-[8px]">
            {leftColumnCards.map((card) => (
              <HomeContentCard
                key={card.id}
                id={card.id}
                title={card.title}
                author={card.author}
                authorAvatar={card.authorAvatar}
                likes={card.likes}
                coverImage={card.coverImage}
                onClick={() => onCardClick?.(card.id)}
              />
            ))}
          </div>
          
          {/* 右列 */}
          <div className="flex flex-col gap-[8px]">
            {rightColumnCards.map((card) => (
              <HomeContentCard
                key={card.id}
                id={card.id}
                title={card.title}
                author={card.author}
                authorAvatar={card.authorAvatar}
                likes={card.likes}
                coverImage={card.coverImage}
                onClick={() => onCardClick?.(card.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 浮动添加按钮 */}
      <FloatingActionButton 
        onClick={() => {
          if (activeSubTab === 'studyset') {
            setIsStudySetModalOpen(true);
          } else if (onFabClick) {
            onFabClick();
          }
        }} 
      />

      {/* 学习集创建弹窗 */}
      <CreateStudySetModal
        isOpen={isStudySetModalOpen}
        onClose={() => setIsStudySetModalOpen(false)}
        onSuccess={(newSet) => {
          console.log('新学习集生成成功:', newSet);
          // 实际应用中会更新列表
          setIsStudySetModalOpen(false);
        }}
      />

      {/* 底部导航栏 */}
      <HomeBottomNav 
        currentTab={currentMainTab} 
        onTabChange={(tab) => {
          setCurrentMainTab(tab);
          if (tab === 'learn') {
            setShowLearnPage(true);
          }
        }}
      />
    </div>
  );
}

// 导出子组件以便单独使用
export { StatusBar, HomeHeader, HomeContentCard, HomeBottomNav, FloatingActionButton };

