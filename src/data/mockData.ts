import { CommunityContent, Tag, StudySetContent } from '../types';

// 标签分类
export interface TagCategory {
  id: string;
  name: string;
  tags: Tag[];
}

// 年级标签
export const gradeTags: Tag[] = [
  { id: 'grade-1', name: '小学', color: '#FF6B6B' },
  { id: 'grade-2', name: '初中', color: '#4ECDC4' },
  { id: 'grade-3', name: '高中', color: '#45B7D1' },
  { id: 'grade-4', name: '一年级', color: '#FFA07A' },
  { id: 'grade-5', name: '二年级', color: '#98D8C8' },
  { id: 'grade-6', name: '三年级', color: '#F7DC6F' },
  { id: 'grade-7', name: '四年级', color: '#BB8FCE' },
  { id: 'grade-8', name: '五年级', color: '#85C1E2' },
  { id: 'grade-9', name: '六年级', color: '#F8B739' },
];

// 科目标签
export const subjectTags: Tag[] = [
  { id: 'subject-1', name: '数学', color: '#FFA07A' },
  { id: 'subject-2', name: '语文', color: '#98D8C8' },
  { id: 'subject-3', name: '英语', color: '#F7DC6F' },
  { id: 'subject-4', name: '物理', color: '#4ECDC4' },
  { id: 'subject-5', name: '化学', color: '#45B7D1' },
  { id: 'subject-6', name: '生物', color: '#BB8FCE' },
  { id: 'subject-7', name: '历史', color: '#85C1E2' },
  { id: 'subject-8', name: '地理', color: '#F8B739' },
  { id: 'subject-9', name: '政治', color: '#E74C3C' },
];

// 难度标签
export const difficultyTags: Tag[] = [
  { id: 'difficulty-1', name: '基础', color: '#4ECDC4' },
  { id: 'difficulty-2', name: '中等', color: '#45B7D1' },
  { id: 'difficulty-3', name: '提高', color: '#F8B739' },
  { id: 'difficulty-4', name: '竞赛', color: '#E74C3C' },
  { id: 'difficulty-5', name: '入门', color: '#98D8C8' },
  { id: 'difficulty-6', name: '进阶', color: '#BB8FCE' },
];

// 类型标签
export const typeTags: Tag[] = [
  { id: 'type-1', name: '练习题', color: '#FFA07A' },
  { id: 'type-2', name: '试卷', color: '#4ECDC4' },
  { id: 'type-3', name: '课件', color: '#45B7D1' },
  { id: 'type-4', name: '视频', color: '#BB8FCE' },
  { id: 'type-5', name: '笔记', color: '#85C1E2' },
  { id: 'type-6', name: '教材', color: '#F8B739' },
  { id: 'type-7', name: '真题试卷', color: '#FB2628' },
  { id: 'type-8', name: '思维导图', color: '#FB2628' },
  { id: 'type-9', name: '错题集', color: '#FB2628' },
  { id: 'type-10', name: '专项练习题', color: '#FB2628' },
];

// 其他标签
export const otherTags: Tag[] = [
  { id: 'other-1', name: '学习方法', color: '#BB8FCE' },
  { id: 'other-2', name: '教育心得', color: '#85C1E2' },
  { id: 'other-3', name: '升学指导', color: '#F8B739' },
  { id: 'other-4', name: '心理辅导', color: '#E74C3C' },
];

// 标签分类
export const tagCategories: TagCategory[] = [
  { id: 'grade', name: '年级', tags: gradeTags },
  { id: 'subject', name: '学科', tags: subjectTags },
  { id: 'difficulty', name: '难度', tags: difficultyTags },
  { id: 'type', name: '类型', tags: typeTags },
  { id: 'other', name: '其他', tags: otherTags },
];

// 所有标签（用于向后兼容）
export const commonTags: Tag[] = [
  ...gradeTags.slice(0, 3), // 小学、初中、高中
  ...subjectTags.slice(0, 3), // 数学、语文、英语
  ...otherTags,
];

// 学习集数据
export const mockStudySets: StudySetContent[] = [
  {
    id: 'study-1',
    type: 'studyset',
    title: '小学英语基础词汇100词',
    cover: '/image/魔都 1-5 年级.png',
    tags: [gradeTags[0], subjectTags[2], difficultyTags[0]],
    author: '我在魔都汇',
    authorAvatar: '/image/avatar/我在魔都汇.png',
    cardCount: 20,
    studyCount: 2345,
    description: '精选小学英语最基础的100个单词，配合例句和图片，帮助孩子快速记忆',
    createdAt: '2024-01-20',
    cards: [
      { id: 'card-1-1', term: 'Apple', definition: '苹果 - 一种常见的水果，通常是红色或绿色的。例句：I like to eat an apple.' },
      { id: 'card-1-2', term: 'Book', definition: '书 - 用于阅读和学习的物品。例句：This is my favorite book.' },
      { id: 'card-1-3', term: 'Cat', definition: '猫 - 一种常见的宠物，喜欢抓老鼠。例句：My cat is very cute.' },
      { id: 'card-1-4', term: 'Dog', definition: '狗 - 人类最忠诚的朋友。例句：I have a big dog at home.' },
      { id: 'card-1-5', term: 'Elephant', definition: '大象 - 陆地上最大的动物，有长长的鼻子。例句：The elephant is very strong.' },
      { id: 'card-1-6', term: 'Fish', definition: '鱼 - 生活在水里的动物。例句：I can see many fish in the river.' },
      { id: 'card-1-7', term: 'Girl', definition: '女孩 - 年轻的女性。例句：That girl is my sister.' },
      { id: 'card-1-8', term: 'House', definition: '房子 - 人们居住的建筑。例句：We live in a big house.' },
      { id: 'card-1-9', term: 'Ice cream', definition: '冰淇淋 - 一种冷冻的甜品。例句：I love chocolate ice cream.' },
      { id: 'card-1-10', term: 'Jump', definition: '跳 - 用脚蹬地离开地面。例句：The rabbit can jump high.' },
      { id: 'card-1-11', term: 'Kite', definition: '风筝 - 在天空中飞的玩具。例句：Let\'s fly a kite in the park.' },
      { id: 'card-1-12', term: 'Lion', definition: '狮子 - 被称为"森林之王"的大型猫科动物。例句：The lion is sleeping.' },
      { id: 'card-1-13', term: 'Moon', definition: '月亮 - 夜晚天空中明亮的天体。例句：The moon is very bright tonight.' },
      { id: 'card-1-14', term: 'Nurse', definition: '护士 - 在医院照顾病人的人。例句：The nurse is very kind.' },
      { id: 'card-1-15', term: 'Orange', definition: '橙子 - 一种橙色的水果，富含维生素C。例句：Oranges are good for health.' },
      { id: 'card-1-16', term: 'Pen', definition: '钢笔 - 用来写字的工具。例句：I write with a blue pen.' },
      { id: 'card-1-17', term: 'Queen', definition: '女王 - 国家的女性统治者。例句：The queen lives in a palace.' },
      { id: 'card-1-18', term: 'Rain', definition: '雨 - 从天空落下的水滴。例句：It will rain tomorrow.' },
      { id: 'card-1-19', term: 'Sun', definition: '太阳 - 给我们光和热的恒星。例句：The sun rises in the morning.' },
      { id: 'card-1-20', term: 'Tree', definition: '树 - 有树干和树叶的植物。例句：There are many trees in the forest.' },
    ],
  },
  {
    id: 'study-2',
    type: 'studyset',
    title: '初中数学公式大全',
    cover: '/image/七天冲刺.png',
    tags: [gradeTags[1], subjectTags[0], difficultyTags[1]],
    author: '清华徐爸爸',
    authorAvatar: '/image/avatar/清华徐爸爸.png',
    cardCount: 15,
    studyCount: 3421,
    description: '汇总初中数学重要公式，包括代数、几何、函数等各个章节',
    createdAt: '2024-01-19',
    cards: [
      { id: 'card-2-1', term: '完全平方公式', definition: '(a + b)² = a² + 2ab + b²\n(a - b)² = a² - 2ab + b²' },
      { id: 'card-2-2', term: '平方差公式', definition: '(a + b)(a - b) = a² - b²\n两个数的和与这两个数的差的积，等于这两个数的平方差' },
      { id: 'card-2-3', term: '一元二次方程求根公式', definition: 'ax² + bx + c = 0\nx = (-b ± √(b² - 4ac)) / 2a\n其中 b² - 4ac 称为判别式' },
      { id: 'card-2-4', term: '勾股定理', definition: 'a² + b² = c²\n直角三角形中，两条直角边的平方和等于斜边的平方' },
      { id: 'card-2-5', term: '圆的面积公式', definition: 'S = πr²\n其中 r 是圆的半径，π ≈ 3.14159' },
      { id: 'card-2-6', term: '圆的周长公式', definition: 'C = 2πr = πd\n其中 r 是半径，d 是直径' },
      { id: 'card-2-7', term: '一次函数', definition: 'y = kx + b\nk 是斜率，b 是截距\nk > 0 时函数递增，k < 0 时函数递减' },
      { id: 'card-2-8', term: '二次函数标准形式', definition: 'y = ax² + bx + c\n顶点坐标：(-b/2a, (4ac-b²)/4a)\n对称轴：x = -b/2a' },
      { id: 'card-2-9', term: '三角形面积公式', definition: 'S = (底 × 高) / 2 = ah / 2\n或使用海伦公式：S = √[p(p-a)(p-b)(p-c)]，其中 p = (a+b+c)/2' },
      { id: 'card-2-10', term: '平行四边形面积', definition: 'S = 底 × 高 = ah\n平行四边形的面积等于底边长与对应高的乘积' },
      { id: 'card-2-11', term: '梯形面积公式', definition: 'S = (上底 + 下底) × 高 / 2 = (a + b)h / 2' },
      { id: 'card-2-12', term: '正弦定理', definition: 'a/sinA = b/sinB = c/sinC = 2R\n其中 R 是三角形外接圆的半径' },
      { id: 'card-2-13', term: '余弦定理', definition: 'a² = b² + c² - 2bc·cosA\nb² = a² + c² - 2ac·cosB\nc² = a² + b² - 2ab·cosC' },
      { id: 'card-2-14', term: '等差数列通项公式', definition: 'aₙ = a₁ + (n-1)d\n其中 a₁ 是首项，d 是公差，n 是项数' },
      { id: 'card-2-15', term: '等差数列求和公式', definition: 'Sₙ = n(a₁ + aₙ)/2 = na₁ + n(n-1)d/2' },
    ],
  },
  {
    id: 'study-3',
    type: 'studyset',
    title: '中国古诗词名句精选',
    cover: '/image/初中文学常识汇总.jpg',
    tags: [gradeTags[1], subjectTags[1], difficultyTags[1]],
    author: '清华徐爸爸',
    authorAvatar: '/image/avatar/清华徐爸爸.png',
    cardCount: 12,
    studyCount: 1876,
    description: '精选初中必背古诗词名句，包含作者、出处和赏析',
    createdAt: '2024-01-18',
    cards: [
      { id: 'card-3-1', term: '海内存知己，天涯若比邻', definition: '出自：王勃《送杜少府之任蜀州》\n含义：只要在世上有知心朋友，即使远在天涯也如同近在眼前。表达了对友谊的珍视。' },
      { id: 'card-3-2', term: '会当凌绝顶，一览众山小', definition: '出自：杜甫《望岳》\n含义：一定要登上泰山的最高峰，俯瞰群山，感觉它们都变得渺小了。表达了不怕困难、敢于攀登的精神。' },
      { id: 'card-3-3', term: '不畏浮云遮望眼，自缘身在最高层', definition: '出自：王安石《登飞来峰》\n含义：不怕浮云遮住远望的眼光，是因为自己站在最高层。比喻站得高、看得远，不会被眼前的困难所迷惑。' },
      { id: 'card-3-4', term: '山重水复疑无路，柳暗花明又一村', definition: '出自：陆游《游山西村》\n含义：山水重重，怀疑无路可走，忽然柳树繁茂、花朵盛开，又出现了一个村庄。比喻在困境中往往蕴含着希望。' },
      { id: 'card-3-5', term: '长风破浪会有时，直挂云帆济沧海', definition: '出自：李白《行路难》\n含义：相信总有一天能乘长风破万里浪，高高挂起云帆，在沧海中勇往直前。表达了对理想的坚定信念。' },
      { id: 'card-3-6', term: '人生自古谁无死，留取丹心照汗青', definition: '出自：文天祥《过零丁洋》\n含义：自古以来，人终不免一死，但要死得有价值，让忠心永垂青史。表达了诗人的民族气节和舍生取义的决心。' },
      { id: 'card-3-7', term: '问渠那得清如许，为有源头活水来', definition: '出自：朱熹《观书有感》\n含义：要问池塘里的水为什么这样清澈，是因为有源源不断的活水流来。比喻只有不断学习，才能保持思想的活跃和进步。' },
      { id: 'card-3-8', term: '沉舟侧畔千帆过，病树前头万木春', definition: '出自：刘禹锡《酬乐天扬州初逢席上见赠》\n含义：沉船旁边有千帆竞发，病树前头有万木争春。比喻新事物必将战胜旧事物，表达了乐观向上的精神。' },
      { id: 'card-3-9', term: '天生我材必有用，千金散尽还复来', definition: '出自：李白《将进酒》\n含义：上天造就我的才干，必有它的用处；千金花完了，还会再来。表达了诗人对自己才能的自信和积极乐观的人生态度。' },
      { id: 'card-3-10', term: '春蚕到死丝方尽，蜡炬成灰泪始干', definition: '出自：李商隐《无题》\n含义：春蚕直到死时才停止吐丝，蜡烛烧成灰烬时才停止流泪。常用来比喻教师等无私奉献的精神。' },
      { id: 'card-3-11', term: '落红不是无情物，化作春泥更护花', definition: '出自：龚自珍《己亥杂诗》\n含义：凋落的花朵并不是无情的东西，它们化作春天的泥土，还要培育新的花朵。比喻老一辈为新一代无私奉献。' },
      { id: 'card-3-12', term: '横眉冷对千夫指，俯首甘为孺子牛', definition: '出自：鲁迅《自嘲》\n含义：对待敌人要像严冬一样冷酷，对待人民要像春天般温暖，甘愿像牛一样为人民服务。表达了革命者的立场。' },
    ],
  },
  {
    id: 'study-4',
    type: 'studyset',
    title: '高中化学元素周期表',
    cover: '/image/小学 1-6 年级资料汇总.jpg',
    tags: [gradeTags[2], subjectTags[4], difficultyTags[1]],
    author: '我在魔都汇',
    authorAvatar: '/image/avatar/我在魔都汇.png',
    cardCount: 18,
    studyCount: 2109,
    description: '高中化学重要元素及其性质，包括元素符号、原子序数、常见化合价等',
    createdAt: '2024-01-17',
    cards: [
      { id: 'card-4-1', term: 'H - 氢', definition: '原子序数：1\n相对原子质量：1\n化合价：+1\n特点：最轻的元素，易燃气体，是宇宙中最丰富的元素' },
      { id: 'card-4-2', term: 'C - 碳', definition: '原子序数：6\n相对原子质量：12\n化合价：+2、+4、-4\n特点：非金属元素，是有机物的基础元素' },
      { id: 'card-4-3', term: 'N - 氮', definition: '原子序数：7\n相对原子质量：14\n化合价：-3、+2、+3、+4、+5\n特点：空气的主要成分（78%），化学性质不活泼' },
      { id: 'card-4-4', term: 'O - 氧', definition: '原子序数：8\n相对原子质量：16\n化合价：-2\n特点：空气中含量第二（21%），支持燃烧，维持生命必需' },
      { id: 'card-4-5', term: 'Na - 钠', definition: '原子序数：11\n相对原子质量：23\n化合价：+1\n特点：活泼的金属元素，遇水剧烈反应，常温下与氧气反应' },
      { id: 'card-4-6', term: 'Mg - 镁', definition: '原子序数：12\n相对原子质量：24\n化合价：+2\n特点：银白色金属，燃烧发出耀眼白光，是叶绿素的组成元素' },
      { id: 'card-4-7', term: 'Al - 铝', definition: '原子序数：13\n相对原子质量：27\n化合价：+3\n特点：银白色金属，密度小，是地壳中含量最多的金属元素' },
      { id: 'card-4-8', term: 'Si - 硅', definition: '原子序数：14\n相对原子质量：28\n化合价：+4、-4\n特点：半导体材料，地壳中含量第二的元素，沙子的主要成分' },
      { id: 'card-4-9', term: 'P - 磷', definition: '原子序数：15\n相对原子质量：31\n化合价：-3、+3、+5\n特点：有白磷、红磷等同素异形体，白磷有剧毒，易自燃' },
      { id: 'card-4-10', term: 'S - 硫', definition: '原子序数：16\n相对原子质量：32\n化合价：-2、+4、+6\n特点：淡黄色固体，可燃，燃烧产生刺激性气味' },
      { id: 'card-4-11', term: 'Cl - 氯', definition: '原子序数：17\n相对原子质量：35.5\n化合价：-1、+1、+5、+7\n特点：黄绿色气体，有刺激性气味，有毒，强氧化性' },
      { id: 'card-4-12', term: 'K - 钾', definition: '原子序数：19\n相对原子质量：39\n化合价：+1\n特点：银白色金属，比钠更活泼，遇水反应更剧烈' },
      { id: 'card-4-13', term: 'Ca - 钙', definition: '原子序数：20\n相对原子质量：40\n化合价：+2\n特点：银白色金属，是骨骼和牙齿的主要成分' },
      { id: 'card-4-14', term: 'Fe - 铁', definition: '原子序数：26\n相对原子质量：56\n化合价：+2、+3\n特点：银白色金属，是应用最广泛的金属，易生锈' },
      { id: 'card-4-15', term: 'Cu - 铜', definition: '原子序数：29\n相对原子质量：64\n化合价：+1、+2\n特点：紫红色金属，导电导热性好，在潮湿空气中生成铜绿' },
      { id: 'card-4-16', term: 'Zn - 锌', definition: '原子序数：30\n相对原子质量：65\n化合价：+2\n特点：青白色金属，可以和酸反应生成氢气' },
      { id: 'card-4-17', term: 'Ag - 银', definition: '原子序数：47\n相对原子质量：108\n化合价：+1\n特点：银白色金属，导电性最好的金属，化学性质稳定' },
      { id: 'card-4-18', term: 'Au - 金', definition: '原子序数：79\n相对原子质量：197\n化合价：+1、+3\n特点：黄色金属，化学性质最稳定，不与常见酸反应' },
    ],
  },
  {
    id: 'study-5',
    type: 'studyset',
    title: '英语不规则动词变化',
    cover: '/image/三年级思维训练.jpg',
    tags: [gradeTags[1], subjectTags[2], difficultyTags[1]],
    author: '猫老师妈妈',
    authorAvatar: '/image/avatar/猫老师妈妈.png',
    cardCount: 15,
    studyCount: 2567,
    description: '初中英语重要的不规则动词过去式和过去分词变化',
    createdAt: '2024-01-16',
    cards: [
      { id: 'card-5-1', term: 'be (是)', definition: '过去式：was/were\n过去分词：been\n现在分词：being\n例句：I was at home yesterday.' },
      { id: 'card-5-2', term: 'go (去)', definition: '过去式：went\n过去分词：gone\n现在分词：going\n例句：He went to Beijing last week.' },
      { id: 'card-5-3', term: 'do (做)', definition: '过去式：did\n过去分词：done\n现在分词：doing\n例句：I did my homework yesterday.' },
      { id: 'card-5-4', term: 'have (有)', definition: '过去式：had\n过去分词：had\n现在分词：having\n例句：She had a nice car.' },
      { id: 'card-5-5', term: 'see (看见)', definition: '过去式：saw\n过去分词：seen\n现在分词：seeing\n例句：I saw a movie last night.' },
      { id: 'card-5-6', term: 'come (来)', definition: '过去式：came\n过去分词：come\n现在分词：coming\n例句：They came to the party.' },
      { id: 'card-5-7', term: 'take (拿，带)', definition: '过去式：took\n过去分词：taken\n现在分词：taking\n例句：He took his umbrella.' },
      { id: 'card-5-8', term: 'give (给)', definition: '过去式：gave\n过去分词：given\n现在分词：giving\n例句：She gave me a gift.' },
      { id: 'card-5-9', term: 'make (制作)', definition: '过去式：made\n过去分词：made\n现在分词：making\n例句：Mom made a cake for me.' },
      { id: 'card-5-10', term: 'know (知道)', definition: '过去式：knew\n过去分词：known\n现在分词：knowing\n例句：I knew the answer.' },
      { id: 'card-5-11', term: 'write (写)', definition: '过去式：wrote\n过去分词：written\n现在分词：writing\n例句：He wrote a letter.' },
      { id: 'card-5-12', term: 'read (读)', definition: '过去式：read (发音不同)\n过去分词：read\n现在分词：reading\n例句：She read a book yesterday.' },
      { id: 'card-5-13', term: 'eat (吃)', definition: '过去式：ate\n过去分词：eaten\n现在分词：eating\n例句：We ate lunch at noon.' },
      { id: 'card-5-14', term: 'speak (说)', definition: '过去式：spoke\n过去分词：spoken\n现在分词：speaking\n例句：He spoke English very well.' },
      { id: 'card-5-15', term: 'buy (买)', definition: '过去式：bought\n过去分词：bought\n现在分词：buying\n例句：I bought a new phone.' },
    ],
  },
];

// 模拟数据
export const mockContents: CommunityContent[] = [
  {
    id: '1',
    type: 'material',
    title: '不废妈！魔都1-5年级小数学习重点来啦！',
    cover: '/image/魔都 1-5 年级.png',
    tags: [gradeTags[0], subjectTags[0], typeTags[6]], // 真题试卷
    author: '我在魔都汇',
    authorAvatar: '/image/avatar/我在魔都汇.png',
    downloadCount: 2345,
    fileCount: 8,
    description: '魔都1-5年级精选资料汇总，包含各科重点内容',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    type: 'question',
    title: '孩子青春期叛逆，沟通困难怎么办？',
    cover: '/image/青春期叛逆.png',
    tags: [gradeTags[1], otherTags[3]],
    author: '猫老师妈妈',
    authorAvatar: '/image/avatar/猫老师妈妈.png',
    commentCount: 89,
    description: '孩子进入青春期后变得很叛逆，不愿意和家长沟通，有什么好的方法吗？',
    createdAt: '2024-01-14',
  },
  {
    id: '4',
    type: 'question',
    title: '小学阅读理解答题模板，如何提高得分？',
    cover: '/image/小学阅读理解答题模板.png',
    tags: [gradeTags[0], subjectTags[1], otherTags[0]],
    author: '猫老师妈妈',
    authorAvatar: '/image/avatar/猫老师妈妈.png',
    commentCount: 67,
    description: '孩子语文阅读理解总是失分，想请教有经验的家长分享答题技巧',
    createdAt: '2024-01-12',
  },
  {
    id: '5',
    type: 'material',
    title: '三年级思维训练',
    cover: '/image/三年级思维训练.jpg',
    tags: [gradeTags[5], subjectTags[0], typeTags[7]], // 思维导图
    author: '我在魔都汇',
    authorAvatar: '/image/avatar/我在魔都汇.png',
    downloadCount: 1890,
    fileCount: 0, // 没有文件
    description: '三年级数学思维训练题集，培养逻辑思维能力',
    createdAt: '2024-01-11',
  },
  {
    id: '6',
    type: 'material',
    title: '上海徐汇区逸夫小学，期末7天冲刺计划',
    cover: '/image/七天冲刺.png',
    tags: [gradeTags[1], subjectTags[0], typeTags[9]], // 专项练习题
    author: '清华徐爸爸',
    authorAvatar: '/image/avatar/清华徐爸爸.png',
    downloadCount: 4567,
    fileCount: 7,
    description: '考前七天冲刺训练，快速提升成绩',
    createdAt: '2024-01-10',
  },
  {
    id: '7',
    type: 'material',
    title: '小学 1-6 年级资料汇总',
    cover: '/image/小学 1-6 年级资料汇总.jpg',
    tags: [gradeTags[0], subjectTags[0], typeTags[6]], // 真题试卷
    author: '我在魔都汇',
    authorAvatar: '/image/avatar/我在魔都汇.png',
    downloadCount: 5234,
    fileCount: 15,
    description: '小学1-6年级全科资料汇总，涵盖各年级重点内容',
    createdAt: '2024-01-09',
  },
  {
    id: '8',
    type: 'question',
    title: '如何选择适合的课外辅导班？',
    cover: '/image/小学阅读理解答题模板.png',
    tags: [otherTags[2]],
    author: '猫老师妈妈',
    authorAvatar: '/image/avatar/猫老师妈妈.png',
    commentCount: 45,
    description: '想给孩子报辅导班，但不知道如何选择，求有经验的家长建议',
    createdAt: '2024-01-08',
  },
  {
    id: '9',
    type: 'material',
    title: '初中文学常识汇总',
    cover: '/image/初中文学常识汇总.jpg',
    tags: [gradeTags[1], subjectTags[1], typeTags[5]], // 笔记
    author: '清华徐爸爸',
    authorAvatar: '/image/avatar/清华徐爸爸.png',
    downloadCount: 3123,
    fileCount: 0, // 没有文件
    description: '初中语文文学常识全面汇总，适合复习备考',
    createdAt: '2024-01-07',
  },
  {
    id: '10',
    type: 'question',
    title: '孩子注意力不集中，上课容易走神',
    cover: '/image/三年级思维训练.jpg',
    tags: [gradeTags[0], otherTags[3]],
    author: '猫老师妈妈',
    authorAvatar: '/image/avatar/猫老师妈妈.png',
    commentCount: 78,
    description: '老师反映孩子上课注意力不集中，有什么方法可以改善？',
    createdAt: '2024-01-06',
  },
  {
    id: '11',
    type: 'material',
    title: '上海新课改，减轻学生负担，培养综合素质',
    cover: '/image/上海课改.png',
    tags: [gradeTags[1], subjectTags[0], typeTags[6]], // 真题试卷
    author: '我在魔都汇',
    authorAvatar: '/image/avatar/我在魔都汇.png',
    downloadCount: 2789,
    fileCount: 6,
    description: '上海新课改相关试卷和资料',
    createdAt: '2024-01-05',
  },
  {
    id: '12',
    type: 'question',
    title: '如何培养孩子的阅读习惯？',
    cover: '/image/初中文学常识汇总.jpg',
    tags: [gradeTags[0], subjectTags[1], otherTags[0]],
    author: '清华徐爸爸',
    authorAvatar: '/image/avatar/清华徐爸爸.png',
    commentCount: 56,
    description: '想让孩子爱上阅读，但不知道从何入手，求经验分享',
    createdAt: '2024-01-04',
  },
  // 添加学习集数据
  ...mockStudySets,
];

