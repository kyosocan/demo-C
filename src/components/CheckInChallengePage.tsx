import React, { useState } from 'react';
import { ChevronLeft, Gift, CheckCircle2 } from 'lucide-react';

interface CheckInChallengePageProps {
  onBack: () => void;
}

export default function CheckInChallengePage({ onBack }: CheckInChallengePageProps) {
  const [checkedDays, setCheckedDays] = useState<number[]>([1, 2, 3]); // 模拟已打卡 3 天
  const [hasClaimed, setHasClaimed] = useState(false);

  const totalDays = 7;
  const currentDay = 4; // 模拟今天是第 4 天

  const handleCheckIn = () => {
    if (!checkedDays.includes(currentDay)) {
      setCheckedDays([...checkedDays, currentDay]);
    }
  };

  const isCompleted = checkedDays.length === totalDays;

  return (
    <div className="fixed inset-0 z-[100] bg-[#F4F5FA] flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
      {/* 顶部状态栏背景 */}
      <div className="h-[44px] bg-[#FB2628]" />
      
      {/* 头部导航 */}
      <div className="flex items-center justify-between px-4 h-[44px] bg-[#FB2628] text-white">
        <button onClick={onBack} className="p-1 active:opacity-60 transition-opacity">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-medium" style={{ fontFamily: 'PingFang SC, sans-serif' }}>7天打卡挑战</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        {/* 顶部横幅 */}
        <div className="bg-[#FB2628] h-[120px] rounded-b-[40px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
        </div>

        <div className="px-4 -mt-[80px]">
          {/* 奖励展示卡片 */}
          <div className="bg-white rounded-2xl p-6 shadow-md mb-6 flex items-center gap-4">
            <div className="w-20 h-24 bg-[#FFF5F5] rounded-lg border border-red-50 flex flex-col items-center justify-center p-2 shadow-inner">
              <Gift size={32} className="text-[#FB2628] mb-1" />
              <div className="text-[10px] text-[#FB2628] font-bold text-center leading-tight">精选必读书</div>
            </div>
            <div className="flex-1">
              <div className="inline-block px-2 py-0.5 bg-red-50 text-[#FB2628] text-[10px] rounded-full font-medium mb-1">
                通关大奖
              </div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight mb-1">《哈利·波特与魔法石》</h2>
              <p className="text-xs text-gray-500">全部打卡完成后即可免费兑换</p>
            </div>
          </div>

          {/* 打卡进度面板 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#FB2628] rounded-full" />
                <h3 className="text-base font-bold text-gray-900">打卡进度</h3>
              </div>
              <span className="text-sm font-medium text-gray-400">
                已打卡 <span className="text-[#FB2628]">{checkedDays.length}</span> / {totalDays} 天
              </span>
            </div>

            {/* 打卡日历/进度条 */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                const isChecked = checkedDays.includes(day);
                const isCurrent = day === currentDay;
                
                return (
                  <div key={day} className="flex flex-col items-center gap-2">
                    <div 
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-base font-bold transition-all duration-300 ${
                        isChecked 
                          ? 'bg-[#FB2628] text-white shadow-lg shadow-red-100' 
                          : isCurrent 
                            ? 'bg-white border-2 border-[#FB2628] text-[#FB2628] scale-110' 
                            : 'bg-[#F8F9FA] border border-gray-100 text-gray-300'
                      }`}
                    >
                      {isChecked ? <CheckCircle2 size={24} /> : day}
                    </div>
                    <span className={`text-[11px] font-medium ${isChecked || isCurrent ? 'text-[#FB2628]' : 'text-gray-400'}`}>
                      Day {day}
                    </span>
                  </div>
                );
              })}
              {/* 最后一个占位奖励图标 */}
              <div className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isCompleted ? 'bg-yellow-400 text-white' : 'bg-gray-50 text-gray-200'} border border-dashed border-gray-200`}>
                  <Gift size={20} />
                </div>
                <span className="text-[11px] text-gray-300 font-medium">终点</span>
              </div>
            </div>

            {/* 交互按钮 */}
            {!isCompleted ? (
              <button
                onClick={handleCheckIn}
                disabled={checkedDays.includes(currentDay)}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.97] ${
                  checkedDays.includes(currentDay)
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-[#FB2628] text-white shadow-xl shadow-red-100 animate-pulse'
                }`}
              >
                {checkedDays.includes(currentDay) ? '今日已完成打卡' : '立即打卡签到'}
              </button>
            ) : (
              <button
                onClick={() => {
                  setHasClaimed(true);
                  alert('兑换成功！书籍将寄往您的默认地址。');
                }}
                disabled={hasClaimed}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.97] ${
                  hasClaimed
                    ? 'bg-green-50 text-green-500 border border-green-100'
                    : 'bg-gradient-to-r from-[#FF6B6B] to-[#FB2628] text-white shadow-xl shadow-red-100'
                }`}
              >
                {hasClaimed ? '已成功兑换书籍' : '立即领取奖励'}
              </button>
            )}
          </div>

          {/* 规则说明 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-1 bg-gray-400 rounded-full" />
              挑战规则
            </h4>
            <ul className="text-xs text-gray-500 space-y-3">
              <li className="flex gap-2">
                <span className="text-[#FB2628] font-bold">01</span>
                <span>活动期间，每日进入页面点击“立即打卡”即可计入进度。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FB2628] font-bold">02</span>
                <span>需累计完成 7 次打卡（无需连续），完成后兑换按钮将解锁。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FB2628] font-bold">03</span>
                <span>兑换的书籍为随机发放的精选读物，每个用户仅限参与一次。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FB2628] font-bold">04</span>
                <span>如有任何疑问，请咨询社区官方小助手。</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

