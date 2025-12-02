import { useState } from 'react';
import { MaterialContent } from '../types';

interface MaterialCardProps {
  content: MaterialContent;
  onClick?: () => void;
}

// 模拟文件列表
const mockFileLists: { [key: string]: Array<{ name: string; type: 'pdf' | 'folder' }> } = {
  '1': [ // 魔都 1-5 年级
    { name: '一年级资料', type: 'pdf' },
    { name: '二年级资料', type: 'pdf' },
    { name: '三年级资料', type: 'pdf' },
    { name: '四年级资料', type: 'pdf' },
    { name: '五年级资料', type: 'pdf' },
  ],
  '5': [ // 三年级思维训练
    { name: '数学思维训练', type: 'folder' },
    { name: '逻辑思维训练', type: 'folder' },
    { name: '应用题训练', type: 'folder' },
  ],
  '6': [ // 七天冲刺
    { name: '第一天训练', type: 'pdf' },
    { name: '第二天训练', type: 'pdf' },
    { name: '第三天训练', type: 'pdf' },
  ],
  '7': [ // 小学 1-6 年级资料汇总
    { name: '一年级汇总', type: 'folder' },
    { name: '二年级汇总', type: 'folder' },
    { name: '三年级汇总', type: 'folder' },
  ],
  '9': [ // 初中文学常识汇总
    { name: '古代文学常识', type: 'pdf' },
    { name: '现代文学常识', type: 'pdf' },
    { name: '外国文学常识', type: 'pdf' },
  ],
  '11': [ // 上海课改
    { name: '课改试卷一', type: 'pdf' },
    { name: '课改试卷二', type: 'pdf' },
    { name: '课改试卷三', type: 'pdf' },
  ],
};

// 模拟其他用户头像 - 从localhost服务器引用
const mockOtherUsers = [
  'http://localhost:3667/assets/Group_8_787.png',
  'http://localhost:3667/assets/Group_8_791.png',
  'http://localhost:3667/assets/Group_8_830.png',
  'http://localhost:3667/assets/Group_8_823.png',
  'http://localhost:3667/assets/Group_8_810.png',
];

export default function MaterialCard({ content, onClick }: MaterialCardProps) {
  const [avatarError, setAvatarError] = useState(false);
  const fileList = mockFileLists[content.id] || [];
  const categoryTag = content.tags.find(tag => 
    tag.name === '真题试卷' || 
    tag.name === '思维导图' || 
    tag.name === '错题集' ||
    tag.name === '专项练习题'
  );

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer touch-manipulation active:opacity-90 transition-opacity"
      style={{
        boxShadow: '0px 2px 20px 0px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div className="p-3">
        {/* 标题 */}
        <h3 className="text-sm font-medium text-[#242A31] mb-2 line-clamp-2 leading-6" style={{ fontSize: '14px', lineHeight: '24px' }}>
          {content.title}
        </h3>

        {/* 文件列表 */}
        <div className="bg-[#00000008] rounded-lg p-2 mb-2 space-y-2">
          {fileList.slice(0, 3).map((file, index) => (
            <div key={index} className="flex items-center gap-1.5">
              {file.type === 'pdf' ? (
                <div className="w-4 h-4 flex-shrink-0 relative">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(http://localhost:3667/assets/Vector_5436_12932.png)`,
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></div>
                </div>
              ) : (
                <div className="w-4 h-4 flex-shrink-0 relative">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(http://localhost:3667/assets/Boolean_operation_8_771.png)`,
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></div>
                </div>
              )}
              <span className="text-xs text-[#000000E6] truncate flex-1" style={{ fontSize: '12px', lineHeight: '22px' }}>
                {file.name}
              </span>
            </div>
          ))}
        </div>

        {/* 作者、标签和参与人数 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            {content.authorAvatar && !avatarError ? (
              <img
                src={content.authorAvatar.startsWith('http') ? content.authorAvatar : encodeURI(content.authorAvatar)}
                alt={content.author}
                className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  console.error('头像加载失败:', content.authorAvatar);
                  setAvatarError(true);
                }}
              />
            ) : (
              <div 
                className="w-5 h-5 rounded-full flex-shrink-0"
                style={{
                  backgroundImage: `url(http://localhost:3667/assets/Ellipse_5436_12957.png)`,
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
            )}
            <span className="text-xs text-[#00000066] truncate" style={{ fontSize: '12px', lineHeight: '18px' }}>
              {content.author}
            </span>
            {/* 标签 - 在中间 */}
            {categoryTag && (
              <span 
                className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium text-[#FB2628] flex-shrink-0"
                style={{
                  backgroundColor: 'rgba(251, 38, 40, 0.1)',
                  padding: '3px 6px',
                  borderRadius: '4px',
                }}
              >
                {categoryTag.name}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* 其他用户头像 */}
            <div className="flex items-center -space-x-1">
              {mockOtherUsers.slice(0, 5).map((avatar, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-white flex items-center justify-center flex-shrink-0 relative"
                  style={{ marginRight: index < mockOtherUsers.length - 1 ? '-4px' : '0' }}
                >
                  <div 
                    className="w-full h-full rounded-full"
                    style={{
                      backgroundImage: `url(${avatar})`,
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></div>
                </div>
              ))}
            </div>
            <span className="text-xs text-[#00000066] whitespace-nowrap" style={{ fontSize: '12px', lineHeight: '18px' }}>
              47人加入共享
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
