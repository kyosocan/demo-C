import { useState } from 'react';
import { CommunityContent, MaterialContent, StudySetContent, QuestionContent } from './types';
import { mockContents } from './data/mockData';
import PlazaHeader from './components/PlazaHeader';
import PlazaContentCard from './components/PlazaContentCard';
import MaterialDetail from './components/MaterialDetail';
import StudySetDetail from './components/StudySetDetail';
import QuestionDetail from './components/QuestionDetail';
import FileListPage from './components/FileListPage';
import ProfilePage from './components/ProfilePage';
import MessageCenter from './components/MessageCenter';
import PostActionSheet from './components/PostActionSheet';
import WriteIdeaPage from './components/WriteIdeaPage';
import SelectIllustrationPage from './components/SelectIllustrationPage';
import EditPostPage from './components/EditPostPage';
import CreateMaterialModal from './components/CreateMaterialModal';
import CreateStudySetModal from './components/CreateStudySetModal';
import QuestionModal from './components/QuestionModal';
import SearchModal from './components/SearchModal';
import FilterDrawer from './components/FilterDrawer';
import MaterialPage from './components/MaterialPage';
import QAPage from './components/QAPage';
import StudySetPage from './components/StudySetPage';

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
  const [currentTab, setCurrentTab] = useState<'plaza' | 'material' | 'qa' | 'studyset'>('plaza');
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
  const [showMessageCenter, setShowMessageCenter] = useState(false);
  const [showPostActionSheet, setShowPostActionSheet] = useState(false);
  const [showWriteIdeaPage, setShowWriteIdeaPage] = useState(false);
  const [showSelectIllustrationPage, setShowSelectIllustrationPage] = useState(false);
  const [showEditPostPage, setShowEditPostPage] = useState(false);
  const [postText, setPostText] = useState('');
  const [editingPost, setEditingPost] = useState<CommunityContent | null>(null);
  const [editingFolders, setEditingFolders] = useState<Array<{ name: string; files: FileItem[] }>>([]);
  const currentUserId = '我在魔都汇'; // 当前登录用户

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

  return (
    <div className="min-h-screen bg-[#F4F5FA] flex justify-center">
      {/* 移动端容器 */}
      <div className="w-full max-w-[480px] bg-[#F4F5FA] min-h-screen pb-24 shadow-lg relative">
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

        <div 
          id="plaza-scroll-container"
          className="overflow-y-auto pb-20" 
          style={{ maxHeight: 'calc(100vh - 180px)' }}
        >
          {/* 内容卡片 - 两列布局 */}
          <div className="px-4 pb-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              {plazaContents.map((content, index) => {
                if (content.type === 'material') {
                  return (
                    <PlazaContentCard
                      key={content.id}
                      title={content.title}
                      author={content.author}
                      authorAvatar={content.authorAvatar}
                      likes={Math.floor(Math.random() * 200) + 50}
                      cover={content.cover}
                      learningCount={content.downloadCount}
                      variant={index === 0 ? 'special' : 'default'}
                      onClick={() => setSelectedMaterial(content)}
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
                      likes={Math.floor(Math.random() * 200) + 50}
                      learningCount={content.studyCount}
                      onClick={() => setSelectedStudySet(content)}
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
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>


        {/* 悬浮添加按钮 - 靠右位置 */}
        <div className="fixed bottom-32 right-6 z-40 pointer-events-none">
          <button
            onClick={() => setShowPostActionSheet(true)}
            className="w-14 h-14 bg-[#FB2628] rounded-full flex items-center justify-center shadow-lg touch-manipulation active:scale-95 transition-transform pointer-events-auto"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
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
      </div>
    </div>
  );
}

export default App;
