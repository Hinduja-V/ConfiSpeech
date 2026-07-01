import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Flame, Award, Calendar, ChevronRight, Activity, ArrowUpRight, 
  MessageSquare, Sparkles, ClipboardCheck, Mic, Play
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card, GlassCard } from '../../components/UI/Card';

const DashboardHome = () => {
  const { user, progress } = useAuth();

  // Create SVG path for progress line
  // Let's plot scores of recent weekly activities
  const weeklyScores = [85, 90, 78, 88, 0, 0, 0];
  const chartPoints = weeklyScores
    .map((score, idx) => {
      const x = 50 + idx * 70;
      // SVG height is 150. Map score 0-100 to y=130 to y=20
      const y = 130 - (score / 100) * 110;
      return score > 0 ? `${x},${y}` : null;
    })
    .filter(Boolean)
    .join(' ');

  const quickActions = [
    { name: 'AI Articulation Test', path: '/dashboard/therapy', icon: Mic, color: 'text-primary', bg: 'bg-blue-50', desc: 'Test speech accuracy' },
    { name: 'AAC Speak Board', path: '/dashboard/board', icon: MessageSquare, color: 'text-secondary', bg: 'bg-teal-50', desc: 'Assemble speech cards' },
    { name: 'Autism/DLD Screening', path: '/dashboard/assessment', icon: ClipboardCheck, color: 'text-accent', bg: 'bg-purple-50', desc: 'Identify voice risks' }
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Welcome Card & Streak Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Welcome message */}
        <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-r from-primary to-accent rounded-premium p-8 text-white flex flex-col justify-between shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div className="space-y-3 relative z-10">
            <span className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Clinical Workspace
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">Welcome back, {user?.name || 'Voice Patient'}!</h2>
            <p className="text-white/80 text-sm max-w-md leading-relaxed">
              Your speech exercises are fully customized. Practice 10 minutes today to maintain your therapeutic momentum.
            </p>
          </div>

          <div className="pt-6 relative z-10 flex flex-wrap gap-4 items-center">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/10 flex items-center space-x-3">
              <span className="text-xl">🏆</span>
              <div>
                <span className="block text-[10px] text-white/60 font-bold uppercase tracking-wider">Overall Accuracy</span>
                <span className="font-extrabold text-base">{progress.overallScore}%</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/10 flex items-center space-x-3">
              <span className="text-xl">⏱️</span>
              <div>
                <span className="block text-[10px] text-white/60 font-bold uppercase tracking-wider">Therapy Practice</span>
                <span className="font-extrabold text-base">{progress.therapyTime} Min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Streaks Card */}
        <Card className="flex flex-col justify-between border-slate-100" hoverEffect={false}>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-base">Practice Streaks</h3>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Weekly Goals</span>
          </div>

          <div className="py-6 flex items-center justify-center space-x-4">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shadow-sm"
            >
              <Flame className="w-9 h-9 text-orange-500 fill-orange-500" />
            </motion.div>
            <div className="text-left">
              <span className="block text-3xl font-extrabold text-slate-900">{progress.streak} Days</span>
              <span className="text-xs text-slate-400 font-semibold leading-none">Consistent Practice 🔥</span>
            </div>
          </div>

          {/* Daily completion ticks */}
          <div className="grid grid-cols-7 gap-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
            {progress.weeklyProgress.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-1">
                <span className="text-[10px] text-slate-400 font-bold">{day.day[0]}</span>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition ${
                  day.completed 
                    ? 'bg-orange-500 border-orange-600 text-white shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-400'
                }`}>
                  {day.completed ? '✓' : '•'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h3 className="font-extrabold text-slate-800 text-lg mb-4">Therapy Shortcuts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link key={idx} to={action.path} className="group">
                <Card className="flex items-center justify-between p-5 border-slate-100/80 hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${action.bg} ${action.color} group-hover:bg-primary group-hover:text-white transition duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 group-hover:text-primary transition">{action.name}</h4>
                      <p className="text-xs text-slate-400">{action.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition group-hover:translate-x-1" />
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Layout - Charts & Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Progress Chart */}
        <div className="lg:col-span-2">
          <Card className="space-y-4 border-slate-100" hoverEffect={false}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">Weekly Pronunciation Progress</h3>
              <div className="flex items-center space-x-2 text-xs text-slate-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                <span>Accuracy Trend</span>
              </div>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="relative h-44 bg-slate-50/50 rounded-xl border border-slate-100/50 p-2 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 500 150">
                {/* Horizontal grid lines */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="75" x2="480" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="130" x2="480" y2="130" stroke="#e2e8f0" strokeWidth="1" />
                
                {/* Left labels */}
                <text x="15" y="24" fill="#94a3b8" fontSize="10" fontWeight="bold">100%</text>
                <text x="15" y="79" fill="#94a3b8" fontSize="10" fontWeight="bold">50%</text>
                <text x="20" y="134" fill="#94a3b8" fontSize="10" fontWeight="bold">0%</text>

                {/* Score Line */}
                {chartPoints && (
                  <>
                    <path
                      d={`M ${chartPoints}`}
                      fill="none"
                      stroke="url(#chartGrad)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Shadow mesh */}
                    <path
                      d={`M 50,130 L ${chartPoints} L 260,130 Z`}
                      fill="url(#chartFill)"
                      opacity="0.15"
                    />
                  </>
                )}

                {/* Data Points */}
                {weeklyScores.map((score, idx) => {
                  if (score === 0) return null;
                  const x = 50 + idx * 70;
                  const y = 130 - (score / 100) * 110;
                  return (
                    <g key={idx}>
                      <circle cx={x} cy={y} r="5" fill="#2563EB" stroke="white" strokeWidth="2" />
                      <text x={x} y={y - 10} fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">{score}%</text>
                    </g>
                  );
                })}

                {/* X Axis Labels */}
                {progress.weeklyProgress.map((day, idx) => (
                  <text key={idx} x={50 + idx * 70} y="146" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">
                    {day.day}
                  </text>
                ))}

                <defs>
                  <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                  <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#FFFFFF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </Card>
        </div>

        {/* Sessions & Recommendations */}
        <div className="space-y-6">
          {/* Upcoming Session */}
          <Card className="border-slate-100 p-5 space-y-4" hoverEffect={false}>
            <h3 className="font-bold text-slate-800 text-base">Next Virtual Session</h3>
            <div className="flex items-center space-x-3.5 bg-slate-50 p-3 rounded-xl border border-slate-100/50">
              <span className="text-2xl bg-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-slate-200">🩺</span>
              <div>
                <h4 className="font-bold text-sm text-slate-800">Robert Chen, SLP</h4>
                <span className="text-xs text-slate-400 font-semibold">Speech Pathologist</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-slate-500 font-semibold">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <span>Tomorrow at 10:00 AM (45 Mins)</span>
            </div>

            <Link to="/dashboard/therapist" className="block">
              <button className="w-full text-center py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-semibold text-xs transition">
                Open Telehealth Portal
              </button>
            </Link>
          </Card>

          {/* AI Clinical recommendation */}
          <div className="glass-card rounded-premium p-5 border-white/50 shadow-glass text-left space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-xl -mr-6 -mt-6"></div>
            <div className="flex items-center space-x-2 text-secondary">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Clinical Tip</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed italic">
              "We noticed mild articulation hesitation on the sound 'R'. Focus on the 'Pronunciation Suite' exercises today for 5 minutes."
            </p>
          </div>
        </div>

      </div>

      {/* Recent activity log */}
      <Card className="border-slate-100" hoverEffect={false}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 text-base">Recent Activities</h3>
          <Link to="/dashboard/progress" className="text-xs text-primary font-bold hover:underline flex items-center">
            <span>View All Log</span> <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {progress.recentActivities.map((act) => (
            <div key={act.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
              <div className="flex items-center space-x-3.5">
                <span className="text-xl bg-slate-50 w-9 h-9 rounded-xl flex items-center justify-center border border-slate-100 shrink-0">
                  {act.category === 'Articulation' ? '🗣️' : act.category === 'Communication' ? '💬' : '📋'}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">{act.name}</h4>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{act.category} • {act.date}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-extrabold text-sm text-slate-800">{act.score}% Score</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Passed</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardHome;
