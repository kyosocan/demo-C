import { useState, useRef } from 'react';
import { ArrowLeft, Bell, Edit, Search, Lock, FileText, Heart, Star, MoreVertical, Share2, Trash2 } from 'lucide-react';
import StatusBar from './StatusBar';
import PlazaContentCard from './PlazaContentCard';

interface ProfilePageProps {
  onBack: () => void;
  onMessageClick?: () => void;
  onEditPost?: (postId: string) => void;
  onPostClick?: (postId: string) => void;
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
    likes: 345,
    cover: '/image/初中文学常识汇总.jpg',
    learningCount: 2345,
  },
];

export default function ProfilePage({ onBack, onMessageClick, onEditPost, onPostClick }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'favorites' | 'liked'>('posts');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('/image/avatar/我在魔都汇.png');
  const [username, setUsername] = useState('131****0299');
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
              {/* 头像 - 可点击更改 */}
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
              
              {/* 用户信息 */}
              <div className="flex-1 min-w-0 pt-2">
                <div className="flex items-center gap-2 mb-3">
                  {isEditingUsername ? (
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
                        {username}
                      </div>
                      <button
                        onClick={() => {
                          setIsEditingUsername(true);
                          setTimeout(() => usernameInputRef.current?.focus(), 0);
                        }}
                        className="touch-manipulation p-1 -mr-1"
                      >
                        <Edit size={14} className="text-white/80" />
                      </button>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-4 text-white text-sm">
                  <span>0粉丝</span>
                  <span>0关注</span>
                  <span>0获赞</span>
                </div>
              </div>
            </div>

            {/* 个性签名 */}
            <div className="mt-4 bg-white/20 backdrop-blur-md rounded-xl px-4 py-3 flex items-center gap-2 border border-white/30 shadow-sm">
              <span className="text-white text-sm flex-1">
                写下个性签名,让学习的逆流中有更多懂你的人!
              </span>
              <button className="touch-manipulation">
                <Edit size={16} className="text-white/80" />
              </button>
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
              我发过的
              {activeTab === 'posts' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FB2628] -mb-3"></span>
              )}
            </button>
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
          </div>
          {activeTab === 'posts' && selectedPostId ? (
            <button
              onClick={() => setShowActionSheet(true)}
              className="touch-manipulation"
            >
              <MoreVertical size={18} className="text-gray-700" />
            </button>
          ) : (
            <button className="touch-manipulation">
              <Search size={18} className="text-gray-700" />
            </button>
          )}
        </div>

        {/* 内容区域 */}
        <div className="px-4 py-4 bg-gray-50 min-h-[400px]">
            {activeTab === 'posts' && (
              <div className="grid grid-cols-2 gap-3">
                {myPosts.map((post, index) => (
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
                {myPosts.length === 0 && (
                  <div className="col-span-2 text-center py-12 text-gray-400">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-sm">还没有发布过帖子</p>
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

