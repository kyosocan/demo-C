import { useState, useCallback, useEffect } from 'react';
import { CommunityContent, MaterialContent, StudySetContent, QuestionContent, Teacher } from './types';
import { mockContents, mockTeachers } from './data/mockData';
import PlazaHeader from './components/PlazaHeader';
import PlazaContentCard from './components/PlazaContentCard';
import MaterialDetail from './components/MaterialDetail';
import StudySetDetail from './components/StudySetDetail';
import QuestionDetail from './components/QuestionDetail';
import FileListPage from './components/FileListPage';
import ProfilePage from './components/ProfilePage';
import MessageCenter from './components/MessageCenter';
import MessageBubble from './components/MessageBubble';
import PostActionSheet from './components/PostActionSheet';
import WriteIdeaPage from './components/WriteIdeaPage';
import SelectIllustrationPage from './components/SelectIllustrationPage';
import EditPostPage from './components/EditPostPage';
import LearningSpacePage from './components/LearningSpacePage';
import CreateMaterialModal from './components/CreateMaterialModal';
import CreateStudySetModal from './components/CreateStudySetModal';
import QuestionModal from './components/QuestionModal';
import SearchModal from './components/SearchModal';
import FilterDrawer from './components/FilterDrawer';
import MaterialPage from './components/MaterialPage';
import QAPage from './components/QAPage';
import StudySetPage from './components/StudySetPage';
import TeacherDetailPage from './components/TeacherDetailPage';
import ConsultationPage from './components/ConsultationPage';
import StudyCompanionPage from './components/StudyCompanionPage';
import TeacherPage from './components/TeacherPage';
import CardActionPopup from './components/CardActionPopup';
import ReportPage from './components/ReportPage';
import Toast from './components/Toast';
import BottomNav from './components/BottomNav';
import CheckInChallengePage from './components/CheckInChallengePage';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'file';
  date: string;
  size?: string;
  title?: string;
  cover?: string;
}

function App() {
  const [contents, setContents] = useState<CommunityContent[]>(mockContents);
  const [currentTab, setCurrentTab] = useState<'plaza' | 'material' | 'qa' | 'studyset' | 'teacher'>('plaza');
  const [currentSubTab, setCurrentSubTab] = useState<'follow' | 'all' | 'hot'>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialContent | null>(null);
  const [selectedStudySet, setSelectedStudySet] = useState<StudySetContent | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionContent | null>(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showCreateMaterialModal, setShowCreateMaterialModal] = useState(false);
  const [showCreateStudySetModal, setShowCreateStudySetModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>('全部');
  const [selectedSubject, setSelectedSubject] = useState<string>('全部');
  const [fileListData, setFileListData] = useState<{ files: FileItem[]; title: string } | null>(null);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [viewingOtherProfile, setViewingOtherProfile] = useState<{ id: string; username: string; avatar?: string } | null>(null);
  const [showMessageCenter, setShowMessageCenter] = useState(false);
  const [showPostActionSheet, setShowPostActionSheet] = useState(false);
  const [showWriteIdeaPage, setShowWriteIdeaPage] = useState(false);
  const [showSelectIllustrationPage, setShowSelectIllustrationPage] = useState(false);
  const [showEditPostPage, setShowEditPostPage] = useState(false);
  const [showLearningSpace, setShowLearningSpace] = useState(false);
  const [postText, setPostText] = useState('');
  const [editingPost, setEditingPost] = useState<CommunityContent | null>(null);
  const [editingFolders, setEditingFolders] = useState<Array<{ name: string; files: FileItem[] }>>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showConsultation, setShowConsultation] = useState(false);
  const [showCompanion, setShowCompanion] = useState(false);
  const [showCardActionPopup, setShowCardActionPopup] = useState(false);
  const [cardActionPosition, setCardActionPosition] = useState({ x: 0, y: 0 });
  const [longPressedContent, setLongPressedContent] = useState<CommunityContent | null>(null);
  const [showReportPage, setShowReportPage] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showMessageBubble, setShowMessageBubble] = useState(false);
  const [showCheckInChallenge, setShowCheckInChallenge] = useState(false);
  const currentUserId = '我在魔都汇'; // 当前登录用户
  
  // 消息数量（模拟数据，实际应该从API获取）
  const messageCount = 5; // 从 MessageCenter 的 mockMessages 获取，这里暂时写死

  // 检查是否第一次进入广场
  useEffect(() => {
    if (currentTab === 'plaza') {
      // 开发测试：如果需要测试气泡显示，可以在浏览器控制台执行：
      // localStorage.removeItem('hasVisitedPlaza');
      const hasVisitedPlaza = localStorage.getItem('hasVisitedPlaza');
      if (!hasVisitedPlaza && messageCount > 0) {
        setShowMessageBubble(true);
        // 4秒后自动消失
        const timer = setTimeout(() => {
          setShowMessageBubble(false);
          localStorage.setItem('hasVisitedPlaza', 'true');
        }, 4000);
        return () => clearTimeout(timer);
      } else {
        setShowMessageBubble(false);
      }
    } else {
      setShowMessageBubble(false);
    }
  }, [currentTab, messageCount]);

  // 处理消息气泡点击
  const handleMessageBubbleClick = useCallback(() => {
    setShowMessageBubble(false);
    setShowMessageCenter(true);
    localStorage.setItem('hasVisitedPlaza', 'true');
  }, []);

  // 处理消息气泡关闭
  const handleMessageBubbleClose = useCallback(() => {
    setShowMessageBubble(false);
    localStorage.setItem('hasVisitedPlaza', 'true');
  }, []);

  // 处理长按卡片
  const handleCardLongPress = useCallback((content: CommunityContent, position: { x: number; y: number }) => {
    setLongPressedContent(content);
    setCardActionPosition(position);
    setShowCardActionPopup(true);
  }, []);

  // 处理不喜欢
  const handleDislike = useCallback(() => {
    setShowCardActionPopup(false);
    setToastMessage('反馈成功，将帮您优化推荐结果');
    setShowToast(true);
    setLongPressedContent(null);
  }, []);

  // 处理举报
  const handleReport = useCallback(() => {
    setShowCardActionPopup(false);
    setShowReportPage(true);
  }, []);

  // 处理举报提交
  const handleReportSubmit = useCallback((data: { mainReason: string; subReason: string; content: string; images: string[] }) => {
    console.log('举报提交:', data, '被举报内容:', longPressedContent);
    setShowReportPage(false);
    setToastMessage('举报已提交，我们会尽快处理');
    setShowToast(true);
    setLongPressedContent(null);
  }, [longPressedContent]);

  // 根据帖子信息生成文件列表（模拟数据）
  const getFilesForPost = (post: CommunityContent): FileItem[] => {
    if (post.type === 'material') {
      const material = post as MaterialContent;
      if (material.fileCount && material.fileCount > 0) {
        // 根据fileCount生成模拟文件
        const files: FileItem[] = [];
        for (let i = 0; i < Math.min(material.fileCount, 5); i++) {
          files.push({
            id: `${post.id}-file-${i + 1}`,
            name: `${material.title} - 文件${i + 1}.pdf`,
            type: 'pdf',
            date: material.createdAt,
            size: '2.5MB',
            title: `${material.title} - 文件${i + 1}`,
            cover: material.cover,
          });
        }
        return files;
      }
    }
    return [];
  };

  // 将文件列表转换为文件夹格式
  const convertFilesToFolders = (files: FileItem[], postTitle: string): Array<{ name: string; files: FileItem[] }> => {
    if (files.length === 0) return [];
    // 将所有文件放在一个文件夹中，文件夹名称为帖子标题
    return [{
      name: postTitle,
      files: files,
    }];
  };

  // 筛选内容 - 广场页显示热门内容
  const plazaContents = contents
    .filter(() => {
      if (currentSubTab === 'hot') {
        // 热门：按下载量或评论数排序
        return true;
      }
      return true;
    })
    .slice(0, 6); // 只显示前6个

  // 筛选不同类型的内容
  const materialContents = contents.filter(
    (c) => c.type === 'material'
  ) as MaterialContent[];
  const questionContents = contents.filter(
    (c) => c.type === 'question'
  ) as QuestionContent[];
  const studySetContents = contents.filter(
    (c) => c.type === 'studyset'
  ) as StudySetContent[];

  // 如果显示了打卡挑战页面
  if (showCheckInChallenge) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg relative">
          <CheckInChallengePage
            onBack={() => setShowCheckInChallenge(false)}
          />
        </div>
      </div>
    );
  }

  // 如果显示了举报页面
  if (showReportPage) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <ReportPage
            onBack={() => {
              setShowReportPage(false);
              setLongPressedContent(null);
            }}
            onSubmit={handleReportSubmit}
          />
        </div>
      </div>
    );
  }

  // 如果显示了规划伴学页面
  if (showCompanion && selectedTeacher) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <StudyCompanionPage
            teacher={selectedTeacher}
            onBack={() => {
              setShowCompanion(false);
              setSelectedTeacher(null);
            }}
            onPayment={() => {
              console.log('支付伴学费用:', selectedTeacher.companionPrice);
            }}
          />
        </div>
      </div>
    );
  }

  // 如果显示了咨询问题页面
  if (showConsultation && selectedTeacher) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <ConsultationPage
            teacher={selectedTeacher}
            onBack={() => {
              setShowConsultation(false);
              setSelectedTeacher(null);
            }}
            onPayment={() => {
              console.log('支付咨询费用:', selectedTeacher.consultationPrice);
            }}
          />
        </div>
      </div>
    );
  }

  // 如果显示了名师详情页
  if (selectedTeacher && !showConsultation && !showCompanion) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <TeacherDetailPage
            teacher={selectedTeacher}
            onBack={() => setSelectedTeacher(null)}
            onConsultationClick={() => setShowConsultation(true)}
            onCompanionClick={() => setShowCompanion(true)}
          />
        </div>
      </div>
    );
  }


  // 如果显示了学习空间页面
  if (showLearningSpace) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <LearningSpacePage
            mode="select"
            onBack={() => setShowLearningSpace(false)}
            onSelectFiles={(selectedFiles) => {
              // 将选中的文件和文件夹添加到编辑页面的文件夹中
              const newFiles: FileItem[] = selectedFiles.map(f => ({
                id: f.id,
                name: f.name,
                type: f.type === 'pdf' ? 'pdf' : f.type === 'folder' ? 'folder' : 'file',
                date: f.date,
                size: f.size,
                title: f.name,
              }));
              
              // 添加到编辑文件夹列表
              if (newFiles.length > 0) {
                setEditingFolders([...editingFolders, { name: '', files: newFiles }]);
              }
              
              setShowLearningSpace(false);
            }}
          />
        </div>
      </div>
    );
  }

  // 如果显示了编辑页面
  if (showEditPostPage) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <EditPostPage
            text={postText}
            initialTitle={editingPost?.type === 'material' ? (editingPost as MaterialContent).title : editingPost?.type === 'question' ? (editingPost as QuestionContent).title : editingPost?.type === 'studyset' ? (editingPost as StudySetContent).title : ''}
            initialBody={editingPost?.type === 'material' ? (editingPost as MaterialContent).description || '' : editingPost?.type === 'question' ? (editingPost as QuestionContent).description || '' : editingPost?.type === 'studyset' ? (editingPost as StudySetContent).description || '' : ''}
            initialFolders={editingFolders}
            onBack={() => {
              setShowEditPostPage(false);
              setEditingPost(null);
              setEditingFolders([]);
              setPostText('');
            }}
            onPublish={(data) => {
              console.log('发布笔记', editingPost, data);
              // 更新帖子内容
              if (editingPost && data) {
                const updatedContents = contents.map(c => {
                  if (c.id === editingPost.id) {
                    if (c.type === 'material') {
                      return { ...c, title: data.title, description: data.body } as MaterialContent;
                    } else if (c.type === 'question') {
                      return { ...c, title: data.title, description: data.body } as QuestionContent;
                    } else if (c.type === 'studyset') {
                      return { ...c, title: data.title, description: data.body } as StudySetContent;
                    }
                  }
                  return c;
                });
                setContents(updatedContents);
                
                // 如果当前正在查看被编辑的帖子，更新显示
                if (selectedMaterial && selectedMaterial.id === editingPost.id) {
                  const updated = updatedContents.find(c => c.id === editingPost.id) as MaterialContent;
                  if (updated) setSelectedMaterial(updated);
                } else if (selectedQuestion && selectedQuestion.id === editingPost.id) {
                  const updated = updatedContents.find(c => c.id === editingPost.id) as QuestionContent;
                  if (updated) setSelectedQuestion(updated);
                } else if (selectedStudySet && selectedStudySet.id === editingPost.id) {
                  const updated = updatedContents.find(c => c.id === editingPost.id) as StudySetContent;
                  if (updated) setSelectedStudySet(updated);
                }
              }
              setShowEditPostPage(false);
              setEditingPost(null);
              setEditingFolders([]);
              setPostText('');
            }}
            onSaveDraft={() => {
              console.log('保存草稿');
              setShowEditPostPage(false);
              setEditingPost(null);
              setEditingFolders([]);
            }}
            onOpenLearningSpace={() => {
              setShowLearningSpace(true);
            }}
          />
        </div>
      </div>
    );
  }

  // 如果显示了选择配图页面
  if (showSelectIllustrationPage) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <SelectIllustrationPage
            text={postText}
            onBack={() => setShowSelectIllustrationPage(false)}
            onNext={(_card) => {
              setShowSelectIllustrationPage(false);
              setShowEditPostPage(true);
            }}
          />
        </div>
      </div>
    );
  }

  // 如果显示了写想法页面
  if (showWriteIdeaPage) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <WriteIdeaPage
            onClose={() => {
              setShowWriteIdeaPage(false);
              setPostText('');
            }}
            onNext={(text) => {
              setPostText(text);
              setShowWriteIdeaPage(false);
              setShowSelectIllustrationPage(true);
            }}
          />
        </div>
      </div>
    );
  }

  // 如果显示了消息中心
  if (showMessageCenter) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <MessageCenter
            onBack={() => setShowMessageCenter(false)}
            onMessageClick={(message) => {
              setShowMessageCenter(false);
              
              if (message.targetType === 'post' && message.targetId) {
                // 跳转到帖子详情页
                const post = contents.find(c => c.id === message.targetId);
                if (post) {
                  if (post.type === 'material') {
                    setSelectedMaterial(post as MaterialContent);
                  } else if (post.type === 'question') {
                    setSelectedQuestion(post as QuestionContent);
                  } else if (post.type === 'studyset') {
                    setSelectedStudySet(post as StudySetContent);
                  }
                }
              } else if (message.targetType === 'user' && message.targetUserId) {
                // 跳转到用户主页
                const userPost = contents.find(c => c.author === message.targetUserId);
                const userAvatar = userPost?.authorAvatar;
                setViewingOtherProfile({
                  id: message.targetUserId,
                  username: message.targetUserId,
                  avatar: userAvatar,
                });
              } else if (message.targetType === 'profile') {
                // 跳转到个人资料页
                setShowProfilePage(true);
              }
            }}
          />
        </div>
      </div>
    );
  }

  // 如果显示了他人主页
  if (viewingOtherProfile) {
    // 根据用户ID过滤出该用户的笔记
    const otherUserPosts = contents
      .filter(c => c.author === viewingOtherProfile.username || c.author === viewingOtherProfile.id)
      .map(c => ({
        id: c.id,
        title: c.type === 'material' ? (c as MaterialContent).title : 
               c.type === 'question' ? (c as QuestionContent).title :
               (c as StudySetContent).title,
        author: c.author,
        authorAvatar: c.authorAvatar,
        likes: c.type === 'material' ? (c as MaterialContent).downloadCount :
                c.type === 'question' ? (c as QuestionContent).commentCount :
                (c as StudySetContent).studyCount || 0,
        cover: c.cover,
        learningCount: c.type === 'material' ? (c as MaterialContent).downloadCount :
                       c.type === 'studyset' ? (c as StudySetContent).studyCount : undefined,
      }));

    return (
      <div className="min-h-screen bg-white flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <ProfilePage
            onBack={() => setViewingOtherProfile(null)}
            isOwnProfile={false}
            userInfo={{
              id: viewingOtherProfile.id,
              username: viewingOtherProfile.username,
              avatar: viewingOtherProfile.avatar,
              followers: 123,
              following: 45,
              likes: 567,
              bio: '这是一个学习分享者',
            }}
            userPosts={otherUserPosts}
            onFollow={(userId) => {
              console.log('关注用户:', userId);
            }}
            onPostClick={(postId) => {
              // 根据postId在contents中查找对应的内容
              const post = contents.find(c => c.id === postId);
              if (post) {
                setViewingOtherProfile(null);
                if (post.type === 'material') {
                  setSelectedMaterial(post as MaterialContent);
                } else if (post.type === 'question') {
                  setSelectedQuestion(post as QuestionContent);
                } else if (post.type === 'studyset') {
                  setSelectedStudySet(post as StudySetContent);
                }
              }
            }}
          />
        </div>
      </div>
    );
  }

  // 如果显示了个人资料页
  if (showProfilePage) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg overflow-hidden">
          <ProfilePage
            onBack={() => setShowProfilePage(false)}
            isOwnProfile={true}
            onMessageClick={() => {
              setShowProfilePage(false);
              setShowMessageCenter(true);
            }}
            onEditPost={() => {
              setShowProfilePage(false);
              setShowEditPostPage(true);
              // 可以根据postId加载对应的帖子内容
              setPostText('我的帖子内容');
            }}
            onPostClick={(postId) => {
              // 根据postId在contents中查找对应的内容
              const post = contents.find(c => c.id === postId);
              if (post) {
                setShowProfilePage(false);
                if (post.type === 'material') {
                  setSelectedMaterial(post as MaterialContent);
                } else if (post.type === 'question') {
                  setSelectedQuestion(post as QuestionContent);
                } else if (post.type === 'studyset') {
                  setSelectedStudySet(post as StudySetContent);
                }
              }
            }}
            onDraftClick={(draft) => {
              // 点击草稿进入编辑页面
              setShowProfilePage(false);
              setPostText(draft.content || draft.title || '');
              setShowEditPostPage(true);
            }}
          />
        </div>
      </div>
    );
  }

  // 如果显示了文件列表页
  if (fileListData) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <FileListPage
            files={fileListData.files}
            title={fileListData.title}
            onBack={() => setFileListData(null)}
          />
        </div>
      </div>
    );
  }

  // 处理编辑帖子
  const handleEditPost = (post: CommunityContent) => {
    setEditingPost(post);
    
    // 根据帖子类型设置编辑内容
    if (post.type === 'material') {
      const material = post as MaterialContent;
      // 获取文件列表并转换为文件夹格式
      const files = getFilesForPost(post);
      const folders = convertFilesToFolders(files, material.title);
      setEditingFolders(folders);
    } else {
      setEditingFolders([]);
    }
    
    setPostText(post.title);
    setShowEditPostPage(true);
  };

  // 处理删除帖子
  const handleDeletePost = (post: CommunityContent) => {
    if (window.confirm('确定要删除这条帖子吗？')) {
      setContents(contents.filter(c => c.id !== post.id));
      // 如果当前正在查看被删除的帖子，返回上一页
      if (selectedMaterial && selectedMaterial.id === post.id) {
        setSelectedMaterial(null);
      } else if (selectedQuestion && selectedQuestion.id === post.id) {
        setSelectedQuestion(null);
      } else if (selectedStudySet && selectedStudySet.id === post.id) {
        setSelectedStudySet(null);
      }
    }
  };

  // 处理分享到微信
  const handleShareToWeChat = (post: CommunityContent) => {
    // 生成分享链接
    const shareUrl = `${window.location.origin}/post/${post.id}`;
    
    // 复制链接到剪贴板
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('链接已复制到剪贴板，可以分享到微信了！');
      }).catch(() => {
        // 降级方案：使用传统方法
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('链接已复制到剪贴板，可以分享到微信了！');
      });
    } else {
      // 降级方案
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('链接已复制到剪贴板，可以分享到微信了！');
    }
  };

  const [mainTab, setMainTab] = useState<'learn' | 'community' | 'mall' | 'device' | 'love'>('community');

  // 如果显示了学习空间页面
  if (mainTab === 'learn') {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg relative overflow-hidden">
          <LearningSpacePage
            onBack={() => setMainTab('community')}
          />
          <BottomNav currentTab="learn" onTabChange={setMainTab} />
        </div>
      </div>
    );
  }

  // 如果选中了资料，显示详情页
  if (selectedMaterial) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <MaterialDetail
            content={selectedMaterial}
            onBack={() => setSelectedMaterial(null)}
            onFileListClick={(files, title) => {
              setFileListData({ files, title });
            }}
            onEdit={() => handleEditPost(selectedMaterial)}
            onShare={() => handleShareToWeChat(selectedMaterial)}
            onDelete={() => handleDeletePost(selectedMaterial)}
            currentUserId={currentUserId}
            onAvatarClick={(authorId, authorName, authorAvatar) => {
              setViewingOtherProfile({
                id: authorId,
                username: authorName,
                avatar: authorAvatar,
              });
            }}
          />
        </div>
      </div>
    );
  }

  // 如果选中了答疑，显示答疑详情页
  if (selectedQuestion) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <QuestionDetail
            content={selectedQuestion}
            onBack={() => setSelectedQuestion(null)}
            onEdit={() => handleEditPost(selectedQuestion)}
            onShare={() => handleShareToWeChat(selectedQuestion)}
            onDelete={() => handleDeletePost(selectedQuestion)}
            currentUserId={currentUserId}
            onAvatarClick={(authorId, authorName, authorAvatar) => {
              setViewingOtherProfile({
                id: authorId,
                username: authorName,
                avatar: authorAvatar,
              });
            }}
          />
        </div>
      </div>
    );
  }

  // 如果选中了学习集，显示学习集详情页
  if (selectedStudySet) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <StudySetDetail
            content={selectedStudySet}
            onBack={() => setSelectedStudySet(null)}
            onEdit={() => handleEditPost(selectedStudySet)}
            onShare={() => handleShareToWeChat(selectedStudySet)}
            onDelete={() => handleDeletePost(selectedStudySet)}
            currentUserId={currentUserId}
          />
        </div>
      </div>
    );
  }

  // 根据当前标签显示不同页面
  if (currentTab === 'material') {
    return (
      <div className="min-h-screen bg-white flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <MaterialPage
            contents={materialContents}
            onMaterialClick={setSelectedMaterial}
            onSearchClick={() => setShowSearchModal(true)}
            onCreateMaterialClick={() => setShowCreateMaterialModal(true)}
            onQuestionClick={() => setShowQuestionModal(true)}
            onTabChange={setCurrentTab}
          />
        </div>
      </div>
    );
  }

  if (currentTab === 'qa') {
    return (
      <div className="min-h-screen bg-white flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <QAPage
            contents={questionContents}
            onSearchClick={() => setShowSearchModal(true)}
            onQuestionSubmit={() => setShowQuestionModal(true)}
            onTabChange={setCurrentTab}
          />
        </div>
      </div>
    );
  }

  if (currentTab === 'studyset') {
    return (
      <div className="min-h-screen bg-white flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <StudySetPage
            contents={studySetContents}
            onStudySetClick={setSelectedStudySet}
            onSearchClick={() => setShowSearchModal(true)}
            onCreateStudySetClick={() => setShowCreateStudySetModal(true)}
            onQuestionClick={() => setShowQuestionModal(true)}
            onTabChange={setCurrentTab}
          />
        </div>
      </div>
    );
  }

  if (currentTab === 'teacher') {
    return (
      <div className="min-h-screen bg-white flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <TeacherPage
            teachers={mockTeachers}
            currentTab={currentTab}
            onTeacherClick={(teacher) => {
              setSelectedTeacher(teacher);
              setCurrentTab('plaza'); // 切换到详情页时，先切换回plaza，然后通过selectedTeacher显示详情
            }}
            onTabChange={setCurrentTab}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F5FA] flex justify-center">
      {/* 移动端容器 - 375px 宽度 */}
      <div className="w-full max-w-[375px] bg-[#F4F5FA] min-h-screen pb-24 shadow-lg relative overflow-hidden">
        {/* 背景渐变层 - 274px 高度 */}
        <div className="absolute top-0 left-0 right-0 h-[274px] pointer-events-none z-0 overflow-hidden">
          {/* 底层渐变背景 - 温暖的橙粉色调 */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #FFE4D6 0%, #FFF0E8 40%, #F7F9FC 70%, #F4F5FA 100%)',
            }}
          />
          {/* 毛玻璃效果层 */}
          <div 
            className="absolute inset-0"
            style={{
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              background: 'rgba(255, 180, 150, 0.15)',
            }}
          />
          {/* 装饰性流星/星点效果 */}
          <div className="absolute top-[15px] right-[20px] opacity-40">
            <svg width="172" height="86" viewBox="0 0 172 86" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="30" r="1.5" fill="white" fillOpacity="0.8"/>
              <circle cx="120" cy="45" r="1" fill="white" fillOpacity="0.6"/>
              <circle cx="80" cy="50" r="1.8" fill="white" fillOpacity="0.5"/>
              <circle cx="140" cy="35" r="0.8" fill="white" fillOpacity="0.9"/>
              <circle cx="60" cy="25" r="1.2" fill="white" fillOpacity="0.6"/>
              <circle cx="50" cy="40" r="0.6" fill="white" fillOpacity="0.7"/>
              <circle cx="150" cy="55" r="1" fill="white" fillOpacity="0.5"/>
              <path d="M85 18L115 33" stroke="white" strokeOpacity="0.4" strokeWidth="0.8" strokeLinecap="round"/>
              <path d="M105 38L140 58" stroke="white" strokeOpacity="0.3" strokeWidth="0.6" strokeLinecap="round"/>
              <path d="M70 30L95 45" stroke="white" strokeOpacity="0.25" strokeWidth="0.5" strokeLinecap="round"/>
            </svg>
          </div>
          {/* 底部渐变过渡 */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[120px]"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, #F4F5FA 100%)',
            }}
          />
        </div>
        
        <div className="relative z-10">
          <PlazaHeader
            currentTab={currentTab}
            currentSubTab={currentSubTab}
            onTabChange={setCurrentTab}
            onSubTabChange={setCurrentSubTab}
            onSearchClick={() => setShowSearchModal(true)}
            onFilterClick={() => setShowFilterDrawer(true)}
            onProfileClick={() => setShowProfilePage(true)}
            selectedGrade={selectedGrade}
            selectedSubject={selectedSubject}
          />

          {/* 消息气泡 - 显示在筛选项条中间下方 */}
          {showMessageBubble && currentTab === 'plaza' && (
            <div className="relative z-50 -mt-1 mb-2">
              <MessageBubble
                messageCount={messageCount}
                onClose={handleMessageBubbleClose}
                onClick={handleMessageBubbleClick}
              />
            </div>
          )}

          <div 
            id="plaza-scroll-container"
            className="overflow-y-auto pb-20" 
            style={{ maxHeight: 'calc(100vh - 180px)' }}
          >
            {/* 打卡挑战入口 Banner */}
            {currentTab === 'plaza' && (
              <div className="px-4 mt-2">
                <div 
                  onClick={() => setShowCheckInChallenge(true)}
                  className="bg-gradient-to-r from-[#FF6B6B] to-[#FB2628] rounded-xl p-4 flex items-center justify-between shadow-lg shadow-red-100 cursor-pointer active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="white"/>
                        <path d="M12 3V5M12 19V21M21 12H19M5 12H3M18.36 5.64L16.95 7.05M7.05 16.95L5.64 18.36M18.36 18.36L16.95 16.95M7.05 7.05L5.64 5.64" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">7天打卡挑战 · 赢好礼</h4>
                      <p className="text-white/80 text-[10px]">全部完成后可免费兑换精选图书</p>
                    </div>
                  </div>
                  <div className="bg-white text-[#FB2628] text-xs px-3 py-1.5 rounded-full font-bold">
                    立即参与
                  </div>
                </div>
              </div>
            )}

            {/* 内容卡片 - 两列瀑布流布局 */}
            <div className="px-4 pb-4 pt-2">
              <div className="grid grid-cols-2 gap-[7px]">
              {plazaContents.map((content, index) => {
                if (content.type === 'material') {
                  return (
                    <PlazaContentCard
                      key={content.id}
                      title={content.title}
                      author={content.author}
                      authorAvatar={content.authorAvatar}
                      likes={content.downloadCount || Math.floor(Math.random() * 200) + 50}
                      cover={content.cover}
                      learningCount={content.downloadCount}
                      variant={index === 0 ? 'special' : 'default'}
                      onClick={() => setSelectedMaterial(content)}
                      onLongPress={(position) => handleCardLongPress(content, position)}
                    />
                  );
                } else if (content.type === 'studyset') {
                  return (
                    <PlazaContentCard
                      key={content.id}
                      title={content.title}
                      subtitle={`${content.cardCount}张卡片`}
                      author={content.author}
                      authorAvatar={content.authorAvatar}
                      likes={content.studyCount || Math.floor(Math.random() * 200) + 50}
                      cover={content.cover}
                      learningCount={content.studyCount}
                      onClick={() => setSelectedStudySet(content)}
                      onLongPress={(position) => handleCardLongPress(content, position)}
                    />
                  );
                } else {
                  // 答疑类型 - 点击查看详情
                  return (
                    <PlazaContentCard
                      key={content.id}
                      title={content.title}
                      author={content.author}
                      authorAvatar={content.authorAvatar}
                      likes={content.commentCount || 0}
                      cover={content.cover}
                      onClick={() => setSelectedQuestion(content as QuestionContent)}
                      onLongPress={(position) => handleCardLongPress(content, position)}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
        </div>

        {/* 悬浮添加按钮 - 右下角位置 */}
        <div className="fixed bottom-[100px] z-40" style={{ right: 'calc(50% - 187.5px + 16px)' }}>
          <button
            onClick={() => setShowPostActionSheet(true)}
            className="w-14 h-14 bg-[#FB2628] rounded-full flex items-center justify-center touch-manipulation active:scale-95 transition-transform"
            style={{
              boxShadow: '0px 4px 12px rgba(251, 38, 40, 0.4)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 1V17M1 9H17" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* 发帖操作抽屉 */}
        <PostActionSheet
          isOpen={showPostActionSheet}
          onClose={() => setShowPostActionSheet(false)}
          onSelectFromAlbum={() => {
            setShowPostActionSheet(false);
            // 可以添加相册选择逻辑
            console.log('从相册选择');
          }}
          onCamera={() => {
            setShowPostActionSheet(false);
            // 可以添加相机逻辑
            console.log('打开相机');
          }}
          onWriteText={() => {
            setShowPostActionSheet(false);
            setShowWriteIdeaPage(true);
          }}
        />

        {/* 搜索模态框 */}
        <SearchModal
          isOpen={showSearchModal}
          onClose={() => setShowSearchModal(false)}
          value=""
          onChange={() => {}}
        />

        {/* 创建资料模态框 */}
        <CreateMaterialModal
          isOpen={showCreateMaterialModal}
          onClose={() => setShowCreateMaterialModal(false)}
          onSuccess={(content) => {
            setSelectedMaterial(content);
            setShowCreateMaterialModal(false);
          }}
        />

        {/* 创建学习集模态框 */}
        <CreateStudySetModal
          isOpen={showCreateStudySetModal}
          onClose={() => setShowCreateStudySetModal(false)}
          onSuccess={(content) => {
            setSelectedStudySet(content);
            setShowCreateStudySetModal(false);
          }}
        />

        {/* 提问模态框 */}
        {showQuestionModal && (
          <QuestionModal
            onClose={() => setShowQuestionModal(false)}
            onSuccess={() => {
              setShowQuestionModal(false);
            }}
          />
        )}

        {/* 筛选抽屉 */}
        <FilterDrawer
          isOpen={showFilterDrawer}
          onClose={() => setShowFilterDrawer(false)}
          selectedTags={selectedTags}
          selectedGrade={selectedGrade}
          selectedSubject={selectedSubject}
          onConfirm={(tags, grade, subject) => {
            setSelectedTags(tags);
            if (grade) setSelectedGrade(grade);
            if (subject) setSelectedSubject(subject);
            setShowFilterDrawer(false);
          }}
        />

        {/* 长按弹出菜单 */}
        <CardActionPopup
          isOpen={showCardActionPopup}
          position={cardActionPosition}
          onClose={() => {
            setShowCardActionPopup(false);
            setLongPressedContent(null);
          }}
          onDislike={handleDislike}
          onReport={handleReport}
        />

        {/* Toast 提示 */}
        <Toast
          message={toastMessage}
          isVisible={showToast}
          duration={1000}
          onClose={() => setShowToast(false)}
        />

        {/* 底部导航栏 */}
        <BottomNav currentTab={mainTab} onTabChange={setMainTab} />
      </div>
    </div>
  );
}

export default App;
