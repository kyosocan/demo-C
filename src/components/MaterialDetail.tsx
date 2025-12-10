import { useState } from 'react';
import { MaterialContent } from '../types';
import { ArrowLeft, Share2, Star, Image as ImageIcon, MessageCircle, Heart, Edit, File, MoreVertical } from 'lucide-react';
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

// 模拟评论数据
const mockComments: CommentItem[] = [
  {
    id: '1',
    author: '数学老师',
    authorAvatar: '/image/avatar/我在魔都汇.png',
    content: '这套试卷很不错，题目难度适中，适合三年级学生练习。',
    time: '2小时前',
    likes: 12,
    replies: [
      {
        id: '1-1',
        author: '家长小李',
        content: '谢谢老师推荐！',
        time: '1小时前',
        likes: 3,
      },
      {
        id: '1-2',
        author: '学生家长',
        content: '确实很好用，孩子做完了。',
        time: '30分钟前',
        likes: 2,
      },
    ],
  },
  {
    id: '2',
    author: '家长小王',
    authorAvatar: '/image/avatar/猫老师妈妈.png',
    content: '感谢分享！已经下载给孩子做了，很有帮助。',
    time: '5小时前',
    likes: 8,
    replies: [
      {
        id: '2-1',
        author: '我在魔都汇',
        content: '不客气，希望对您有帮助！',
        time: '4小时前',
        likes: 5,
      },
    ],
  },
  {
    id: '3',
    author: '教育工作者',
    content: '内容很全面，涵盖了所有重点知识点。',
    time: '1天前',
    likes: 15,
  },
];

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
  const [likeCount, setLikeCount] = useState(1236);
  const [favoriteCount, setFavoriteCount] = useState(1083);
  const [commentCount] = useState(192);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [coverError, setCoverError] = useState(false);
  const [showMenuDrawer, setShowMenuDrawer] = useState(false);

  // 判断是否是自己的帖子
  const isMyPost = content.author === currentUserId;

  // 获取年级标签
  const gradeTag = content.tags.find(tag => tag.id.startsWith('grade-'));

  // 根据标题生成资料说明
  const getMaterialDescription = (title: string): string => {
    if (title.includes('魔都') || title.includes('1-5年级') || title.includes('小数')) {
      return '本资料包包含上海地区1-5年级数学学习重点内容，涵盖各年级核心知识点、常见题型和解题技巧。适合家长辅导和孩子自主学习使用，帮助孩子系统掌握小学数学基础知识，为后续学习打下坚实基础。\n 点击下方卡片下载';
    }
    if (title.includes('三年级') && title.includes('思维训练')) {
      return '专为三年级学生设计的数学思维训练题集，通过趣味性的题目设计，培养孩子的逻辑思维能力、空间想象能力和问题解决能力。题目由浅入深，循序渐进，适合不同水平的学生使用。';
    }
    if (title.includes('七天冲刺')) {
      return '考前七天冲刺训练资料，精选高频考点和易错题型，帮助学生在短时间内快速提升成绩。包含每日训练计划、重点知识点梳理和模拟测试，是考前复习的必备资料。';
    }
    if (title.includes('小学') && title.includes('1-6') && title.includes('资料汇总')) {
      return '小学1-6年级全科资料大汇总，涵盖语文、数学、英语等各学科的重点内容。包含知识点总结、练习题、试卷和复习资料，是小学阶段学习的完整资料库。';
    }
    if (title.includes('初中') && title.includes('文学常识')) {
      return '初中语文文学常识全面汇总，系统梳理古代文学、现代文学和外国文学的重要知识点。包含作家作品、文学流派、名句名篇等内容，适合复习备考和日常学习使用。';
    }
    if (title.includes('上海课改')) {
      return '上海新课改政策解读及相关教学资料，紧跟教育改革步伐。包含新课改背景、课程设置变化、教学方法和评价体系等内容，帮助教师和家长了解最新教育政策。';
    }
    // 默认说明
    return '这是一份精心整理的学习资料，包含丰富的学习内容和实用的学习工具，适合学生和家长使用。资料内容全面，结构清晰，是学习和复习的好帮手。';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航栏 - 参考小红书布局 */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              onClick={onBack}
              className="touch-manipulation p-1 -ml-1"
            >
              <ArrowLeft size={20} className="text-gray-900" />
            </button>
            {content.authorAvatar && (
              <button
                onClick={() => {
                  if (onAvatarClick && !isMyPost) {
                    onAvatarClick(content.author, content.author, content.authorAvatar);
                  }
                }}
                className={isMyPost ? '' : 'touch-manipulation'}
              >
                <img
                  src={getImageUrl(content.authorAvatar)}
                  alt={content.author}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              </button>
            )}
            <span className="text-sm font-medium text-gray-900 truncate">{content.author}</span>
          </div>
          <div className="flex items-center gap-2">
            {isMyPost ? (
              <button 
                onClick={() => setShowMenuDrawer(true)}
                className="touch-manipulation p-1"
              >
                <MoreVertical size={18} className="text-gray-900" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`touch-manipulation px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    isFollowing
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-[#FB2628] text-white'
                  }`}
                >
                  {isFollowing ? '已关注' : '关注'}
                </button>
                <button className="touch-manipulation p-1">
                  <Share2 size={18} className="text-gray-900" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 封面区域 - 参考小红书布局 */}
      <div className="relative w-full h-[400px] overflow-hidden bg-gray-100">
        {/* 封面图片 */}
        {content.cover && !coverError ? (
          <img
            src={getImageUrl(content.cover)}
            alt={content.title}
            className="w-full h-full object-cover"
                      onError={() => {
                        console.error('封面图片加载失败:', content.cover);
                        setCoverError(true);
                      }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <ImageIcon size={40} className="text-gray-400" />
          </div>
        )}
      </div>

      {/* 内容信息区域 */}
      <div className="px-4 pt-4 pb-3 bg-white">
        {/* 标题 - 参考小红书样式 */}
        <h1 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
          {content.title}
        </h1>
        
        {/* 资料说明 */}
        <div className="mb-3">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {getMaterialDescription(content.title)}
          </p>
        </div>

        {/* 文件入口卡片 - 放到日期上边，使用icon代替封面，只在有文件时显示 */}
        {content.fileCount && content.fileCount > 0 && (
          <div className="mb-4">
            {mockFiles.length > 0 && (
              <div
                onClick={() => {
                  if (onFileListClick) {
                    onFileListClick(mockFiles, content.title);
                  }
                }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer touch-manipulation active:opacity-90 transition-opacity"
              >
                <div className="flex gap-3 p-2.5">
                  {/* 文件图标 */}
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <File size={24} className="text-gray-500" />
                  </div>
                  
                  {/* 文件信息 - 使用第一个文件的标题 */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1 mb-0.5">
                      {mockFiles[0].title || mockFiles[0].name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      包含 {content.fileCount} 个文件
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 时间和位置信息 */}
        <div className="text-xs text-gray-400 mb-4">
          {content.createdAt || '昨天 21:26'} {gradeTag && gradeTag.name}
        </div>
      </div>

      {/* 评论区域 - 常驻显示 */}
      <div className="px-4 pb-24 bg-white border-t border-gray-100">
        {/* 评论数量 */}
        <div className="text-sm text-gray-600 mb-4 pt-4">
          共{commentCount}条评论
        </div>

        {/* 评论列表 */}
        {mockComments.map((comment, index) => (
          <div
            key={comment.id}
            className={`py-4 ${index < mockComments.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <div className="flex items-start gap-3">
                {comment.authorAvatar ? (
                <img
                  src={getImageUrl(comment.authorAvatar)}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">
                    {comment.author.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                  <span className="text-xs text-gray-400">{comment.time}</span>
                  {index === 0 && (
                    <span className="text-xs text-[#FB2628] bg-[#FB2628]/10 px-2 py-0.5 rounded">首评</span>
                  )}
                </div>
                <p className="text-sm text-gray-700 mb-2 leading-relaxed">{comment.content}</p>
                <div className="flex items-center gap-4 mb-2">
                  <button className="flex items-center gap-1 text-gray-500 touch-manipulation">
                    <Heart size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-400">{comment.likes}</span>
                  </button>
                  <button className="text-xs text-gray-400 touch-manipulation">
                    回复
                  </button>
                </div>
                
                {/* 回复列表 */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-0 mt-2 space-y-2 pl-3 border-l-2 border-gray-100">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">{reply.author}</span>
                            <span className="text-xs text-gray-400">{reply.time}</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{reply.content}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <button className="flex items-center gap-1 text-gray-500 touch-manipulation">
                              <Heart size={12} className="text-gray-400" />
                              <span className="text-xs text-gray-400">{reply.likes}</span>
                            </button>
                            <button className="text-xs text-gray-400 touch-manipulation">
                              回复
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="text-center py-4 text-sm text-gray-400">
          没有更多了
        </div>
      </div>
      
      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-40">
        <div className="max-w-[480px] mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            {/* 左侧评论输入框 */}
            <div className="flex-1 min-w-0 bg-gray-100 rounded-lg px-3 py-2 flex items-center gap-2">
              <Edit size={16} className="text-gray-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="说点什么..."
                className="flex-1 min-w-0 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
            
            {/* 右侧操作按钮 */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => {
                  setIsLiked(!isLiked);
                  setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
                }}
                className="flex items-center gap-0.5 touch-manipulation"
              >
                <Heart size={20} className={isLiked ? 'text-[#FB2628] fill-[#FB2628]' : 'text-gray-600'} />
                <span className="text-xs text-gray-600 whitespace-nowrap">{likeCount}</span>
              </button>
              <button
                onClick={() => {
                  setIsFavorited(!isFavorited);
                  setFavoriteCount(prev => isFavorited ? prev - 1 : prev + 1);
                }}
                className="flex items-center gap-0.5 touch-manipulation"
              >
                <Star size={20} className={isFavorited ? 'text-[#FB2628] fill-[#FB2628]' : 'text-gray-600'} />
                <span className="text-xs text-gray-600 whitespace-nowrap">{favoriteCount}</span>
              </button>
              <button className="flex items-center gap-0.5 touch-manipulation">
                <MessageCircle size={20} className="text-gray-600" />
                <span className="text-xs text-gray-600 whitespace-nowrap">{commentCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

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
  );
}

