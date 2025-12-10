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

// 名师咨询相关类型
export interface Teacher {
  id: string;
  name: string;
  avatar: string;
  title: string; // 职称/专业
  location: string; // 位置
  helpedCount: number; // 帮助人数
  rating: number; // 评分
  consultationPrice: number; // 咨询问题价格
  companionPrice: number; // 规划伴学价格
  services: string[]; // 服务标签(hashtags)
  keywords: string[]; // 关键词标签
  responseRate?: string; // 响应率
}

// 咨询消息
export interface ConsultationMessage {
  id: string;
  type: 'user' | 'teacher';
  content: string;
  timestamp: string;
  isRead?: boolean;
}

// 伴学计划
export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  tasks: StudyTask[];
  createdAt: string;
}

// 伴学任务
export interface StudyTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
}

