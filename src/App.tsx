import { useState } from 'react';
import { CommunityContent, FilterOptions, MaterialContent, StudySetContent } from './types';
import { mockContents } from './data/mockData';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import FilterDrawer from './components/FilterDrawer';
import ContentGrid from './components/ContentGrid';
import MaterialDetail from './components/MaterialDetail';
import StudySetDetail from './components/StudySetDetail';
import CreateMaterialModal from './components/CreateMaterialModal';
import CreateStudySetModal from './components/CreateStudySetModal';
import FloatingActionButton from './components/FloatingActionButton';
import SearchModal from './components/SearchModal';
import UploadModal from './components/UploadModal';
import QuestionModal from './components/QuestionModal';

function App() {
  const [contents, setContents] = useState<CommunityContent[]>(mockContents);
  const [currentType, setCurrentType] = useState<'material' | 'question' | 'studyset'>('material');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialContent | null>(null);
  const [selectedStudySet, setSelectedStudySet] = useState<StudySetContent | null>(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showCreateMaterialModal, setShowCreateMaterialModal] = useState(false);
  const [showCreateStudySetModal, setShowCreateStudySetModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  // 筛选内容
  const filteredContents = contents.filter((content) => {
    // 类型筛选（根据当前 tab）
    if (content.type !== currentType) {
      return false;
    }

    // 标签筛选
    if (filters.tags && filters.tags.length > 0) {
      const contentTagIds = content.tags.map((tag) => tag.id);
      const hasMatchingTag = filters.tags.some((tagId) =>
        contentTagIds.includes(tagId)
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    // 搜索筛选
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesTitle = content.title.toLowerCase().includes(searchLower);
      const matchesDescription =
        'description' in content &&
        content.description?.toLowerCase().includes(searchLower);
      if (!matchesTitle && !matchesDescription) {
        return false;
      }
    }

    return true;
  });

  const handleAddContent = (newContent: CommunityContent) => {
    setContents([newContent, ...contents]);
  };

  const handleTypeChange = (type?: 'material' | 'question' | 'studyset') => {
    setCurrentType(type || 'material');
  };

  // 如果选中了资料，显示详情页
  if (selectedMaterial) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[480px] bg-white min-h-screen shadow-lg">
          <MaterialDetail
            content={selectedMaterial}
            onBack={() => setSelectedMaterial(null)}
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
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      {/* 移动端容器 - 桌面端居中显示，最大宽度限制为手机屏幕 */}
      <div className="w-full max-w-[480px] bg-gray-50 min-h-screen pb-20 shadow-lg">
        <Header
          currentType={currentType}
          onTypeChange={handleTypeChange}
          onSearchClick={() => setShowSearchModal(true)}
          searchValue={filters.search}
        />
        <div className="w-full px-2 py-3">
          <FilterBar
            filters={filters}
            onChange={setFilters}
            onFilterClick={() => setShowFilterDrawer(true)}
          />
          <ContentGrid
            contents={filteredContents}
            currentType={currentType}
            onContentClick={(content) => {
              if (content.type === 'material') {
                setSelectedMaterial(content);
              } else if (content.type === 'studyset') {
                setSelectedStudySet(content);
              }
            }}
          />
        </div>
        <SearchModal
          isOpen={showSearchModal}
          onClose={() => setShowSearchModal(false)}
          value={filters.search || ''}
          onChange={(search) => setFilters({ ...filters, search })}
        />
        <FilterDrawer
          isOpen={showFilterDrawer}
          onClose={() => setShowFilterDrawer(false)}
          selectedTags={filters.tags || []}
          onConfirm={(tags) => setFilters({ ...filters, tags: tags.length > 0 ? tags : undefined })}
        />
        {/* 悬浮操作按钮 */}
        <FloatingActionButton
          onQuestionClick={() => setShowQuestionModal(true)}
          onCreateMaterialClick={() => setShowCreateMaterialModal(true)}
          onCreateStudySetClick={() => setShowCreateStudySetModal(true)}
          showCreateMaterial={currentType === 'material'}
          showCreateStudySet={currentType === 'studyset'}
        />
        <CreateMaterialModal
          isOpen={showCreateMaterialModal}
          onClose={() => setShowCreateMaterialModal(false)}
          onSuccess={(content) => {
            handleAddContent(content);
            setShowCreateMaterialModal(false);
            // 创建成功后跳转到详情页
            setSelectedMaterial(content);
          }}
        />
        {showUploadModal && (
          <UploadModal
            onClose={() => setShowUploadModal(false)}
            onSuccess={(content) => {
              handleAddContent(content);
              setShowUploadModal(false);
            }}
          />
        )}
        {showQuestionModal && (
          <QuestionModal
            onClose={() => setShowQuestionModal(false)}
            onSuccess={(content) => {
              handleAddContent(content);
              setShowQuestionModal(false);
            }}
          />
        )}
        <CreateStudySetModal
          isOpen={showCreateStudySetModal}
          onClose={() => setShowCreateStudySetModal(false)}
          onSuccess={(content) => {
            handleAddContent(content);
            setShowCreateStudySetModal(false);
            // 创建成功后跳转到详情页
            setSelectedStudySet(content);
          }}
        />
      </div>
    </div>
  );
}

export default App;

