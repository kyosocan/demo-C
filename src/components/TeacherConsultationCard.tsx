import { ChevronRight, Users, Star } from 'lucide-react';

interface TeacherConsultationCardProps {
  onClick: () => void;
  teacherCount?: number;
}

export default function TeacherConsultationCard({
  onClick,
  teacherCount = 0,
}: TeacherConsultationCardProps) {
  return (
    <div
      onClick={onClick}
      className="mx-4 mt-4 mb-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 shadow-lg active:opacity-90 transition-opacity touch-manipulation"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-white">名师咨询</h3>
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
              专业指导
            </span>
          </div>
          <p className="text-white/90 text-sm mb-3">
            咨询问题 · 规划伴学 · 一对一指导
          </p>
          <div className="flex items-center gap-4 text-white/80 text-xs">
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{teacherCount}位名师</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} />
              <span>平均评分9.3</span>
            </div>
          </div>
        </div>
        <ChevronRight size={24} className="text-white/80 flex-shrink-0" />
      </div>
    </div>
  );
}

