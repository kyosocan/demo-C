/**
 * HomePage Demo - 展示 Figma 1:1 还原的首页组件
 * 
 * 此文件作为独立演示页面，展示严格按照 Figma 设计稿还原的首页
 * 设计稿: https://www.figma.com/design/QokpqoxRQjwjJOQgQLZC9o/Untitled?node-id=69-4192
 */

import HomePage from './components/HomePage';
import { useMemo, useState } from 'react';
import MaterialDetail from './components/MaterialDetail';
import type { MaterialContent } from './types';
import FileListPage from './components/FileListPage';

export default function HomePageDemo() {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialContent | null>(null);
  const [fileListData, setFileListData] = useState<{ files: Array<{ id: string; name: string; type: 'folder' | 'pdf' | 'file'; date: string; size?: string }>; title: string } | null>(null);

  // 用于 Demo：把首页卡片数据映射成 MaterialContent，点击后可进入详情页
  const materialById = useMemo(() => {
    const now = new Date();
    const createdAt = `${Math.max(1, Math.floor((now.getTime() / 1000) % 7))}天前`;
    // HomePage 内部 mockContents 的 id 与展示卡片一致（1-8）
    // 这里构造一个最小可用的 MaterialContent 供详情页渲染
    const base = (id: string): MaterialContent => ({
      id,
      type: 'material',
      title: '家长这样规划，助力孩子轻松拿捏一年级',
      cover: 'https://www.figma.com/api/mcp/asset/48f68cc7-75a7-4525-8b9e-3fb8acf72a50',
      tags: [],
      author: '猫老师妈妈圈',
      authorAvatar: 'https://www.figma.com/api/mcp/asset/01b58077-dc5a-4ec9-9068-0bf2ce357e4e',
      downloadCount: 150,
      fileCount: 8,
      description: '一年快开学轻松拿捏一年级，提前快规划好几个方向，梳理孩子学习方向👶开学不迷茫',
      createdAt,
    });
    return new Map<string, MaterialContent>([
      ['1', base('1')],
      ['2', { ...base('2'), title: '上海徐汇区逸夫小学，期末7天冲刺计划', author: '我在魔都川...', authorAvatar: 'https://www.figma.com/api/mcp/asset/4c855adf-395b-492c-b389-39b6c136251c', cover: 'https://www.figma.com/api/mcp/asset/af6863c2-59bb-4342-92b4-f82138afb2bf', fileCount: 8 }],
      ['3', { ...base('3'), title: 'AI口算练习太方便了', author: '我在魔都...', authorAvatar: 'https://www.figma.com/api/mcp/asset/4c855adf-395b-492c-b389-39b6c136251c', cover: 'https://www.figma.com/api/mcp/asset/df959d4c-9caa-46bb-ba51-5a7ede127f85', fileCount: 3 }],
      ['4', { ...base('4'), title: '上海新课改，减轻学生负担，培养综合素质的全面', author: '清华徐爸爸', authorAvatar: 'https://www.figma.com/api/mcp/asset/cd52d2e5-5b2d-4f1a-aedf-b75273759b42', cover: 'https://www.figma.com/api/mcp/asset/9f085eac-0b0a-4483-a7eb-8df2af9b0466', fileCount: 6 }],
      ['5', { ...base('5'), title: 'AI口算练习太方便了', author: '我在魔都川汇区', authorAvatar: 'https://www.figma.com/api/mcp/asset/4c855adf-395b-492c-b389-39b6c136251c', cover: 'https://www.figma.com/api/mcp/asset/df959d4c-9caa-46bb-ba51-5a7ede127f85', fileCount: 3 }],
      ['6', { ...base('6'), title: '上海新课改，减轻学生负担，培养综合素质的全面', author: '清华徐爸爸', authorAvatar: 'https://www.figma.com/api/mcp/asset/cd52d2e5-5b2d-4f1a-aedf-b75273759b42', cover: 'https://www.figma.com/api/mcp/asset/9f085eac-0b0a-4483-a7eb-8df2af9b0466', fileCount: 6 }],
      ['7', { ...base('7'), title: '上海徐汇区逸夫小学，期末7天冲刺计划', author: '我在魔都川汇区', authorAvatar: 'https://www.figma.com/api/mcp/asset/4c855adf-395b-492c-b389-39b6c136251c', cover: 'https://www.figma.com/api/mcp/asset/af6863c2-59bb-4342-92b4-f82138afb2bf', fileCount: 8 }],
      ['8', { ...base('8'), title: 'AI口算练习太方便了', author: '我在魔都川汇区', authorAvatar: 'https://www.figma.com/api/mcp/asset/4c855adf-395b-492c-b389-39b6c136251c', cover: 'https://www.figma.com/api/mcp/asset/df959d4c-9caa-46bb-ba51-5a7ede127f85', fileCount: 3 }],
    ]);
  }, []);

  if (fileListData) {
    return (
      <div className="min-h-screen bg-gray-200 flex justify-center items-start py-4">
        <div className="relative">
          <FileListPage
            files={fileListData.files}
            title={fileListData.title}
            onBack={() => setFileListData(null)}
          />
        </div>
      </div>
    );
  }

  if (selectedMaterial) {
    return (
      <div className="min-h-screen bg-gray-200 flex justify-center items-start py-4">
        <div className="relative">
          <MaterialDetail
            content={selectedMaterial}
            onBack={() => setSelectedMaterial(null)}
            onFileListClick={(files, title) => setFileListData({ files, title })}
            onShare={() => console.log('Share clicked')}
            onEdit={() => console.log('Edit clicked')}
            onDelete={() => console.log('Delete clicked')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-start py-4">
      {/* 手机模拟框 */}
      <div className="relative">
        {/* 手机边框装饰（可选） */}
        <div
          className="absolute -inset-3 rounded-[50px] bg-gray-800 shadow-2xl"
          style={{ display: 'none' }} // 取消注释可显示手机边框
        />
        
        {/* 首页组件 */}
        <HomePage
          onSearchClick={() => console.log('Search clicked')}
          onFilterClick={() => console.log('Filter clicked')}
          onFabClick={() => console.log('FAB clicked')}
          onCardClick={(id) => {
            const material = materialById.get(id);
            if (material) setSelectedMaterial(material);
          }}
        />
      </div>
    </div>
  );
}

