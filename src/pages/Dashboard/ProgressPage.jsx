import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/UI/Card';

const ProgressPage = () => {
  const { progress } = useAuth();

  // Ring coordinates for overall score
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress.overallScore / 100) * circumference;

  return (
    <div className="space-y-8 text-left">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Therapy Progress Analytics</h2>
        <p className="text-slate-500 text-sm mt-1">Detailed performance tracking, vocal milestones, and clinical activity logs.</p>
      </div>

      {/* Grid: Circular Ring & Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* Ring Chart */}
        <Card className="flex flex-col items-center justify-between text-center p-6 border-slate-100" hoverEffect={false}>
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Speech Accuracy Rating</h3>
          
          <div className="relative my-4 flex items-center justify-center">
            <svg height={120} width={120}>
              <circle
                stroke="#f1f5f9"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={60}
                cy={60}
              />
              <motion.circle
                stroke="url(#progressRingGrad)"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={60}
                cy={60}
                strokeLinecap="round"
                className="transform -rotate-90 origin-center transition-all duration-1000"
              />
              <defs>
                <linearGradient id="progressRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#14B8A6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute text-center">
              <span className="block text-2xl font-black text-slate-800">{progress.overallScore}%</span>
              <span className="text-[9px] text-slate-400 font-extrabold uppercase">Accuracy</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-normal max-w-[180px] mx-auto">
            Computed running average across your last {progress.completedActivities} activities.
          </p>
        </Card>

        {/* Numeric Stat Cards */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-5 border-slate-100 flex flex-col justify-between" hoverEffect={false}>
            <div>
              <span className="text-2xl">🔥</span>
              <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mt-3">Practice Streak</h4>
            </div>
            <div className="pt-2">
              <span className="block text-3xl font-extrabold text-slate-900">{progress.streak} Days</span>
              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Top 5% among patient group</span>
            </div>
          </Card>

          <Card className="p-5 border-slate-100 flex flex-col justify-between" hoverEffect={false}>
            <div>
              <span className="text-2xl">⏱️</span>
              <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mt-3">Therapy Practice Time</h4>
            </div>
            <div className="pt-2">
              <span className="block text-3xl font-extrabold text-slate-900">{progress.therapyTime} Mins</span>
              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Across {progress.completedActivities} vocal modules</span>
            </div>
          </Card>

          <Card className="p-5 border-slate-100 flex flex-col justify-between" hoverEffect={false}>
            <div>
              <span className="text-2xl">📋</span>
              <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mt-3">Completed Activities</h4>
            </div>
            <div className="pt-2">
              <span className="block text-3xl font-extrabold text-slate-900">{progress.completedActivities} Items</span>
              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Pronunciation, AAC & stories</span>
            </div>
          </Card>

          <Card className="p-5 border-slate-100 flex flex-col justify-between" hoverEffect={false}>
            <div>
              <span className="text-2xl">🩺</span>
              <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mt-3">Clinical Audits</h4>
            </div>
            <div className="pt-2">
              <span className="block text-3xl font-extrabold text-slate-900">Weekly Sync</span>
              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Direct telemetry shared with therapist</span>
            </div>
          </Card>
        </div>

      </div>

      {/* Custom SVG Bar Chart */}
      <Card className="border-slate-100" hoverEffect={false}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 text-base">Weekly Activity Volume</h3>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Minutes Practiced</span>
        </div>

        {/* Custom SVG bar representation */}
        <div className="h-48 flex items-end justify-between px-4 bg-slate-50/50 rounded-xl border border-slate-100/50 pt-8 pb-4">
          {[
            { day: 'Mon', mins: 35, color: '#2563EB' },
            { day: 'Tue', mins: 45, color: '#2563EB' },
            { day: 'Wed', mins: 25, color: '#8B5CF6' },
            { day: 'Thu', mins: 40, color: '#14B8A6' },
            { day: 'Fri', mins: 15, color: '#14B8A6' },
            { day: 'Sat', mins: 0, color: '#E2E8F0' },
            { day: 'Sun', mins: 0, color: '#E2E8F0' }
          ].map((bar, idx) => {
            const maxVal = 50;
            // Height proportional to minutes. Max height is 100% of container.
            const heightPercent = bar.mins > 0 ? `${(bar.mins / maxVal) * 100}%` : '8px';
            return (
              <div key={idx} className="flex flex-col items-center flex-1 space-y-3">
                <span className="text-[10px] text-slate-400 font-extrabold">{bar.mins}m</span>
                <div className="w-8 sm:w-12 bg-slate-100 rounded-lg h-28 flex items-end overflow-hidden">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: heightPercent }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ backgroundColor: bar.color }}
                    className="w-full rounded-b-lg"
                  />
                </div>
                <span className="text-xs text-slate-400 font-bold">{bar.day}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Activity Log list */}
      <Card className="border-slate-100" hoverEffect={false}>
        <h3 className="font-bold text-slate-800 text-base mb-4">Complete Practice Transcripts</h3>
        <div className="divide-y divide-slate-100">
          {progress.recentActivities.map((act) => (
            <div key={act.id} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0 text-sm">
              <div className="flex items-center space-x-3">
                <span className="text-xl">🗣️</span>
                <div>
                  <h4 className="font-bold text-slate-800">{act.name}</h4>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{act.category} • {act.date}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-slate-800">{act.score}% Score</span>
                <span className="text-[10px] text-teal-600 bg-teal-50 border border-teal-100/50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ml-3">
                  Passed
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProgressPage;
