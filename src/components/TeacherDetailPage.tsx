import { ArrowLeft, MapPin, Heart, Headphones } from 'lucide-react';
import { Teacher } from '../types';
import StatusBar from './StatusBar';
import { getImageUrl } from '../utils/imageUtils';

interface TeacherDetailPageProps {
  teacher: Teacher;
  onBack: () => void;
  onConsultationClick: () => void;
  onCompanionClick: () => void;
}

export default function TeacherDetailPage({
  teacher,
  onBack,
  onConsultationClick,
  onCompanionClick,
}: TeacherDetailPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* 状态栏 */}
      <StatusBar />

      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-10">
        <button
          onClick={onBack}
          className="touch-manipulation p-1"
        >
          <ArrowLeft size={20} className="text-gray-900" />
        </button>
        <span className="text-lg font-semibold text-gray-900">
          名师详情
        </span>
        <div className="w-8" />
      </div>

      {/* 名师信息区域 - 渐变背景 */}
      <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 pt-8 pb-12">
        {/* 装饰性圆形元素 */}
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />

        {/* 头像和基本信息 */}
        <div className="relative z-10 flex flex-col items-center">
          <img
            src={getImageUrl(teacher.avatar)}
            alt={teacher.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-3"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getImageUrl('/image/avatar/我在魔都汇.png');
            }}
          />
          <h2 className="text-2xl font-bold text-white mb-1">
            {teacher.name}
          </h2>
          <p className="text-sm text-white/90 text-center mb-2">
            {teacher.title}
          </p>
          <div className="flex items-center gap-1 text-white/80 text-xs mb-3">
            <MapPin size={12} />
            <span>{teacher.location}</span>
          </div>
          <div className="flex items-center gap-4 text-white/90 text-xs">
            <span>学员评分{teacher.rating}</span>
            <span>帮助了{teacher.helpedCount}人</span>
            {teacher.responseRate && (
              <span>{teacher.responseRate}</span>
            )}
          </div>
        </div>
      </div>

      {/* 服务项目区域 */}
      <div className="px-4 py-4">
        <h3 className="text-base font-semibold text-gray-900 mb-3">
          服务项目
        </h3>
        <div className="space-y-3">
          {/* 付费答疑 */}
          <div
            onClick={onConsultationClick}
            className="bg-white border border-gray-200 rounded-lg p-4 active:bg-gray-50 transition-colors touch-manipulation"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-base font-medium text-gray-900 flex-1">
                付费答疑
              </h4>
              <span className="text-orange-500 font-semibold text-sm ml-2">
                ¥{teacher.consultationPrice}/次
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
              针对孩子学习中遇到的具体问题，提供专业解答和指导。包含学科知识点讲解、题目思路分析、学习方法建议等。
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {Math.floor(teacher.helpedCount * 0.6)}人咨询过
              </span>
            </div>
          </div>

          {/* 规划伴学 */}
          <div
            onClick={onCompanionClick}
            className="bg-white border border-gray-200 rounded-lg p-4 active:bg-gray-50 transition-colors touch-manipulation"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-base font-medium text-gray-900 flex-1">
                规划伴学
              </h4>
              <span className="text-orange-500 font-semibold text-sm ml-2">
                ¥{teacher.companionPrice}/月
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
              根据孩子的学习情况进行诊断分析，制定个性化学习计划，提供持续的伴学提醒和指导。可先免费体验，满意后再付费。
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {Math.floor(teacher.helpedCount * 0.4)}人体验过
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between max-w-[480px] mx-auto">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-gray-600">
            <Heart size={20} />
            <span className="text-sm">328</span>
          </button>
          <button className="flex items-center gap-1 text-gray-600">
            <Headphones size={20} />
            <span className="text-sm">客服</span>
          </button>
        </div>
        <button
          onClick={onConsultationClick}
          className="flex-1 ml-4 bg-red-500 text-white py-2.5 px-6 rounded-lg font-medium text-sm active:bg-red-600 transition-colors touch-manipulation"
        >
          一键约聊
        </button>
      </div>
    </div>
  );
}

