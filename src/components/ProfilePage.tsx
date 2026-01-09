import { useState, useRef } from 'react';
import { ArrowLeft, Bell, Edit, FileText, Heart, Star, MoreVertical, Share2, Trash2, Play } from 'lucide-react';
import StatusBar from './StatusBar';
import PlazaContentCard from './PlazaContentCard';
import { getImageUrl } from '../utils/imageUtils';

interface UserInfo {
  id: string;
  username: string;
  avatar?: string;
  followers?: number;
  following?: number;
  likes?: number;
  bio?: string;
}

interface PostItem {
  id: string;
  title: string;
  author: string;
  authorAvatar?: string;
  likes: number;
  cover?: string;
  learningCount?: number;
}

interface ProfilePageProps {
  onBack: () => void;
  onMessageClick?: () => void;
  onEditPost?: (postId: string) => void;
  onPostClick?: (postId: string) => void;
  onDraftClick?: (draft: DraftItem) => void;
  isOwnProfile?: boolean; // 是否是自己的主页
  userInfo?: UserInfo; // 他人主页的用户信息
  onFollow?: (userId: string) => void; // 关注回调
  userPosts?: PostItem[]; // 他人主页的笔记列表
}

// 草稿类型
interface DraftItem {
  id: string;
  type: 'text' | 'image' | 'video';
  title?: string;
  content?: string;
  cover?: string;
  createdAt: string;
}

// 模拟我发过的帖子
const myPosts = [
  {
    id: '1',
    title: '魔都1-5年级数学资料汇总',
    author: '我在魔都汇',
    authorAvatar: '/image/avatar/我在魔都汇.png',
    likes: 156,
    cover: '/image/魔都 1-5 年级.png',
    learningCount: 2345,
  },
  {
    id: '5',
    title: '三年级思维训练题集',
    author: '我在魔都汇',
    authorAvatar: '/image/avatar/我在魔都汇.png',
    likes: 89,
    cover: '/image/三年级思维训练.jpg',
    learningCount: 1200,
  },
];

// 模拟我收藏的帖子
const myFavorites = [
  {
    id: 'fav-1',
    title: '小学阅读理解答题模板',
    author: '教育专家',
    authorAvatar: '/image/avatar/猫老师妈妈.png',
    likes: 234,
    cover: '/image/小学阅读理解答题模板.png',
    learningCount: 3456,
  },
  {
    id: 'fav-2',
    title: '小学1-6年级资料汇总',
    author: '学习助手',
    likes: 567,
    cover: '/image/小学 1-6 年级资料汇总.jpg',
    learningCount: 4567,
  },
];

// 模拟我赞过的帖子
const myLiked = [
  {
    id: 'liked-1',
    title: '初中文学常识汇总',
    author: '语文老师',
    authorAvatar: '/image/avatar/清华徐爸爸.png',
    likes: 345,
    cover: '/image/初中文学常识汇总.jpg',
    learningCount: 2345,
  },
];

// 模拟草稿数据
const myDrafts: DraftItem[] = [
  {
    id: 'draft-1',
    type: 'video',
    title: '上地换线啦，又有的爬了！',
    cover: '/image/封面 1.jpg',
    createdAt: '昨天 14:55',
  },
  {
    id: 'draft-2',
    type: 'text',
    content: '我怎么发小红书',
    createdAt: '1天前',
  },
  {
    id: 'draft-3',
    type: 'image',
    title: '三年级数学思维训练分享',
    cover: '/image/三年级思维训练.jpg',
    createdAt: '2天前',
  },
];

export default function ProfilePage({ 
  onBack, 
  onMessageClick, 
  onEditPost, 
  onPostClick, 
  onDraftClick,
  isOwnProfile = true,
  userInfo,
  onFollow,
  userPosts
}: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'favorites' | 'liked' | 'drafts' | 'studysets'>('posts');
  const [drafts, setDrafts] = useState<DraftItem[]>(isOwnProfile ? myDrafts : []);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  
  // 模拟学习集数据
  const myStudySets = [
    {
      id: 'ss-1',
      title: '三年级语文必背古诗词',
      cardCount: 12,
      studyCount: 450,
      cover: '/image/封面 2.jpg',
    },
    {
      id: 'ss-2',
      title: '小学数学公式大全',
      cardCount: 25,
      studyCount: 1200,
      cover: '/image/封面 3.jpg',
    }
  ];
  
  // 根据是否是自己的主页决定使用哪个数据源
  const displayAvatar = isOwnProfile 
    ? getImageUrl('/image/avatar/我在魔都汇.png')
    : (userInfo?.avatar ? getImageUrl(userInfo.avatar) : getImageUrl('/image/avatar/我在魔都汇.png'));
  const displayUsername = isOwnProfile 
    ? '131****0299'
    : (userInfo?.username || '用户');
  const displayBio = isOwnProfile
    ? '写下个性签名,让学习的逆流中有更多懂你的人!'
    : (userInfo?.bio || '');
  const displayFollowers = isOwnProfile ? 0 : (userInfo?.followers || 0);
  const displayFollowing = isOwnProfile ? 0 : (userInfo?.following || 0);
  const displayLikes = isOwnProfile ? 0 : (userInfo?.likes || 0);
  
  // 根据是否是自己的主页决定显示哪些笔记
  const displayPosts = isOwnProfile ? myPosts : (userPosts || []);
  
  const [avatarUrl, setAvatarUrl] = useState(displayAvatar);
  const [username, setUsername] = useState(displayUsername);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div className="min-h-screen bg-white">
      {/* 顶部背景区域 - 使用现代渐变 */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
        {/* 装饰性圆形 */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -mr-36 -mt-36"></div>
        <div className="absolute top-24 left-0 w-56 h-56 bg-white/10 rounded-full -ml-28"></div>
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-white/5 rounded-full -ml-40 -mb-40"></div>
        
        {/* 内容层 */}
        <div className="relative z-10">
          {/* 状态栏 */}
          <StatusBar />
          
          {/* 顶部导航栏 */}
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={onBack}
              className="touch-manipulation p-1 -ml-1"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={onMessageClick}
                className="touch-manipulation p-1"
              >
                <Bell size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* 个人信息区域 */}
          <div className="px-4 pt-4 pb-6">
            <div className="flex items-start gap-4">
              {/* 头像 - 自己的主页可点击更改，他人主页不可点击 */}
              {isOwnProfile ? (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-20 h-20 rounded-full overflow-hidden bg-white flex-shrink-0 border-3 border-white shadow-lg cursor-pointer touch-manipulation relative group"
                >
                  <img
                    src={avatarUrl}
                    alt="头像"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-400"><span class="text-white text-2xl font-medium">用</span></div>';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Edit size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setAvatarUrl(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </button>
              ) : (
                <div className="w-20 h-20 rounded-full overflow-hidden bg-white flex-shrink-0 border-3 border-white shadow-lg">
                  <img
                    src={displayAvatar}
                    alt="头像"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-400"><span class="text-white text-2xl font-medium">' + (displayUsername.charAt(0) || '用') + '</span></div>';
                      }
                    }}
                  />
                </div>
              )}
              
              {/* 用户信息 */}
              <div className="flex-1 min-w-0 pt-2">
                <div className="flex items-center gap-2 mb-3">
                  {isOwnProfile && isEditingUsername ? (
                    <input
                      ref={usernameInputRef}
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onBlur={() => setIsEditingUsername(false)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setIsEditingUsername(false);
                        }
                      }}
                      className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-1.5 text-white text-base font-medium focus:outline-none focus:border-white/50"
                      autoFocus
                    />
                  ) : (
                    <>
                      <div className="text-white text-base font-medium flex-1">
                        {isOwnProfile ? username : displayUsername}
                      </div>
                      {isOwnProfile && (
                        <button
                          onClick={() => {
                            setIsEditingUsername(true);
                            setTimeout(() => usernameInputRef.current?.focus(), 0);
                          }}
                          className="touch-manipulation p-1 -mr-1"
                        >
                          <Edit size={14} className="text-white/80" />
                        </button>
                      )}
                    </>
                  )}
                </div>
                <div className="flex items-center gap-4 text-white text-sm">
                  <span>{displayFollowers}粉丝</span>
                  <span>{displayFollowing}关注</span>
                  <span>{displayLikes}获赞</span>
                </div>
                {/* 他人主页显示关注按钮 */}
                {!isOwnProfile && (
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        setIsFollowing(!isFollowing);
                        if (onFollow && userInfo) {
                          onFollow(userInfo.id);
                        }
                      }}
                      className={`touch-manipulation px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                        isFollowing
                          ? 'bg-white/20 text-white border border-white/30'
                          : 'bg-[#FB2628] text-white'
                      }`}
                    >
                      {isFollowing ? '已关注' : '关注'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 个性签名 */}
            <div className="mt-4 bg-white/20 backdrop-blur-md rounded-xl px-4 py-3 flex items-center gap-2 border border-white/30 shadow-sm">
              <span className="text-white text-sm flex-1">
                {displayBio}
              </span>
              {isOwnProfile && (
                <button className="touch-manipulation">
                  <Edit size={16} className="text-white/80" />
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="bg-white border-t border-gray-100">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('posts')}
              className={`relative text-sm font-medium touch-manipulation transition-colors ${
                activeTab === 'posts' ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              {isOwnProfile ? '笔记' : '笔记'}
              {activeTab === 'posts' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FB2628] -mb-3"></span>
              )}
            </button>
            {isOwnProfile && (
              <>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`relative text-sm font-medium touch-manipulation transition-colors ${
                    activeTab === 'favorites' ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  我收藏的
                  {activeTab === 'favorites' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FB2628] -mb-3"></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('liked')}
                  className={`relative text-sm font-medium touch-manipulation transition-colors ${
                    activeTab === 'liked' ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  我赞过的
                  {activeTab === 'liked' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FB2628] -mb-3"></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('drafts')}
                  className={`relative text-sm font-medium touch-manipulation transition-colors ${
                    activeTab === 'drafts' ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  草稿
                  {drafts.length > 0 && (
                    <span className="ml-1 text-xs text-gray-400">({drafts.length})</span>
                  )}
                  {activeTab === 'drafts' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FB2628] -mb-3"></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('studysets')}
                  className={`relative text-sm font-medium touch-manipulation transition-colors ${
                    activeTab === 'studysets' ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  学习集
                  {activeTab === 'studysets' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FB2628] -mb-3"></span>
                  )}
                </button>
              </>
            )}
          </div>
          {activeTab === 'posts' && selectedPostId && isOwnProfile && (
            <button
              onClick={() => setShowActionSheet(true)}
              className="touch-manipulation"
            >
              <MoreVertical size={18} className="text-gray-700" />
            </button>
          )}
        </div>

        {/* 内容区域 */}
        <div className="px-4 py-4 bg-gray-50 min-h-[400px]">
            {activeTab === 'posts' && (
              <div className="grid grid-cols-2 gap-3">
                {displayPosts.map((post, index) => (
                  <PlazaContentCard
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    authorAvatar={post.authorAvatar}
                    likes={post.likes}
                    cover={post.cover}
                    learningCount={post.learningCount}
                    variant={index === 0 ? 'special' : 'default'}
                    onClick={() => {
                      // 点击帖子跳转到详情页
                      if (onPostClick) {
                        onPostClick(post.id);
                      }
                    }}
                  />
                ))}
                {displayPosts.length === 0 && (
                  <div className="col-span-2 text-center py-12 text-gray-400">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-sm">{isOwnProfile ? '还没有发布过帖子' : '还没有笔记'}</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'favorites' && (
              <div className="grid grid-cols-2 gap-3">
                {myFavorites.map((post, index) => (
                  <PlazaContentCard
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    authorAvatar={post.authorAvatar}
                    likes={post.likes}
                    cover={post.cover}
                    learningCount={post.learningCount}
                    variant={index === 0 ? 'special' : 'default'}
                    onClick={() => {}}
                  />
                ))}
                {myFavorites.length === 0 && (
                  <div className="col-span-2 text-center py-12 text-gray-400">
                    <Star size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-sm">还没有收藏过帖子</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'liked' && (
              <div className="grid grid-cols-2 gap-3">
                {myLiked.map((post, index) => (
                  <PlazaContentCard
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    authorAvatar={post.authorAvatar}
                    likes={post.likes}
                    cover={post.cover}
                    learningCount={post.learningCount}
                    variant={index === 0 ? 'special' : 'default'}
                    onClick={() => {}}
                  />
                ))}
                {myLiked.length === 0 && (
                  <div className="col-span-2 text-center py-12 text-gray-400">
                    <Heart size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-sm">还没有赞过帖子</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'drafts' && (
              <div className="grid grid-cols-2 gap-3">
                {drafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer active:opacity-90 transition-opacity"
                    onClick={() => {
                      if (onDraftClick) {
                        onDraftClick(draft);
                      }
                    }}
                  >
                    {/* 草稿封面区域 */}
                    {draft.type === 'text' ? (
                      /* 文字类型草稿 - 粉色背景 */
                      <div className="relative aspect-[4/5] bg-pink-50 p-4 flex flex-col">
                        <div className="text-3xl text-pink-300 font-serif leading-none mb-2">"</div>
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-xl font-bold text-gray-800 text-center leading-tight">
                            {draft.content}
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 w-6 h-0.5 bg-pink-200"></div>
                      </div>
                    ) : (
                      /* 图片/视频类型草稿 */
                      <div className="relative aspect-[4/5]">
                        <img
                          src={getImageUrl(draft.cover || '')}
                          alt={draft.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3C/svg%3E';
                          }}
                        />
                        {draft.type === 'video' && (
                          <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                            <Play size={14} className="text-white ml-0.5" fill="white" />
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* 草稿信息 */}
                    <div className="p-3">
                      {draft.title && (
                        <p className="text-sm text-gray-800 line-clamp-2 mb-2">{draft.title}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{draft.createdAt}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // 删除草稿
                            setDrafts(drafts.filter(d => d.id !== draft.id));
                          }}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors touch-manipulation"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {drafts.length === 0 && (
                  <div className="col-span-2 text-center py-12 text-gray-400">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-sm">还没有草稿</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'studysets' && (
              <div className="grid grid-cols-2 gap-3">
                {myStudySets.map((set) => (
                  <div
                    key={set.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full"
                  >
                    <div className="relative aspect-[4/3]">
                      <img
                        src={getImageUrl(set.cover)}
                        alt={set.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md rounded-full px-2 py-1 text-[10px] text-white">
                        {set.cardCount} 卡片
                      </div>
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 leading-tight">
                        {set.title}
                      </h4>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Play size={10} />
                          <span className="text-[10px]">{set.studyCount}次学习</span>
                        </div>
                        <button className="text-[#FB2628] text-xs font-medium">去学习</button>
                      </div>
                    </div>
                  </div>
                ))}
                {myStudySets.length === 0 && (
                  <div className="col-span-2 text-center py-12 text-gray-400">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-sm">还没有学习集</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      {/* 操作抽屉 - 编辑、分享、删除 */}
      {showActionSheet && (
        <>
          {/* 遮罩层 */}
          <div
            className="fixed inset-0 bg-black/40 z-50 transition-opacity"
            onClick={() => {
              setShowActionSheet(false);
              setSelectedPostId(null);
            }}
          />
          
          {/* 抽屉 */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-w-[480px] mx-auto animate-slide-up">
            <div className="py-2">
              <button
                onClick={() => {
                  if (onEditPost && selectedPostId) {
                    onEditPost(selectedPostId);
                    setShowActionSheet(false);
                    setSelectedPostId(null);
                  }
                }}
                className="w-full px-6 py-4 text-left text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors flex items-center gap-3"
              >
                <Edit size={20} className="text-gray-600" />
                <span className="text-base">编辑</span>
              </button>
              
              <button
                onClick={() => {
                  console.log('分享帖子:', selectedPostId);
                  setShowActionSheet(false);
                  setSelectedPostId(null);
                }}
                className="w-full px-6 py-4 text-left text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors flex items-center gap-3"
              >
                <Share2 size={20} className="text-gray-600" />
                <span className="text-base">分享</span>
              </button>
              
              <button
                onClick={() => {
                  console.log('删除帖子:', selectedPostId);
                  setShowActionSheet(false);
                  setSelectedPostId(null);
                }}
                className="w-full px-6 py-4 text-left text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors flex items-center gap-3"
              >
                <Trash2 size={20} className="text-red-600" />
                <span className="text-base">删除</span>
              </button>
            </div>
            
            {/* 取消按钮 */}
            <div className="border-t border-gray-200 pt-2 pb-safe">
              <button
                onClick={() => {
                  setShowActionSheet(false);
                  setSelectedPostId(null);
                }}
                className="w-full px-6 py-4 text-center text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

