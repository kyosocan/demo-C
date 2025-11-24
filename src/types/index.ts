// 内容类型
export type ContentType = 'material' | 'question' | 'studyset';

// 标签
export interface Tag {
  id: string;
  name: string;
  color?: string;
}

// 资料分享内容
export interface MaterialContent {
  id: string;
  type: 'material';
  title: string;
  cover: string;
  tags: Tag[];
  author: string;
  authorAvatar?: string;
  downloadCount: number;
  fileCount: number;
  description?: string;
  createdAt: string;
}

// 答疑互助内容
export interface QuestionContent {
  id: string;
  type: 'question';
  title: string;
  cover?: string;
  tags: Tag[];
  author: string;
  authorAvatar?: string;
  commentCount: number;
  description: string;
  createdAt: string;
}

// 学习卡片
export interface FlashCard {
  id: string;
  term: string;
  definition: string;
  imageUrl?: string;
}

// 学习集内容
export interface StudySetContent {
  id: string;
  type: 'studyset';
  title: string;
  cover?: string;
  tags: Tag[];
  author: string;
  authorAvatar?: string;
  cardCount: number;
  studyCount: number;
  description?: string;
  cards: FlashCard[];
  createdAt: string;
}

// 联合类型
export type CommunityContent = MaterialContent | QuestionContent | StudySetContent;

// 筛选选项
export interface FilterOptions {
  type?: ContentType;
  tags?: string[];
  search?: string;
}

