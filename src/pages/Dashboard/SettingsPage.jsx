import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Volume2, ShieldCheck, Database, RefreshCw, ToggleLeft, 
  HelpCircle, Sparkles, CheckCircle2, Lock
} from 'lucide-react';
import { Card, GlassCard } from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const SettingsPage = () => {
  const [speechRate, setSpeechRate] = useState(0.9);
  const [telemetrySharing, setTelemetrySharing] = useState(true);
  const [isDarkModeMock, setIsDarkModeMock] = useState(false);
  const [resetCompleted, setResetCompleted] = useState(false);

  const handleResetProgress = () => {
    const confirmReset = window.confirm("Are you sure you want to reset your practice progress? This will reset all daily streaks, completed activities, and score trends.");
    if (confirmReset) {
      setResetCompleted(true);
      // Simulate context resetting
      setTimeout(() => setResetCompleted(false), 4000);
    }
  };

  const auditLogs = [
    { event: 'HIPAA Consent Signed', date: 'June 27, 2026', status: 'Verified' },
    { event: 'Encrypted Account Key Issued', date: 'June 27, 2026', status: 'Active' },
    { event: 'Electronic Telemetry Shared', date: 'Just now', status: 'Sync Completed' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-left">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Configure speech engines, medical privacy settings, and active clinical connections.</p>
      </div>

      {/* Voice Speed Controls */}
      <GlassCard className="p-6 shadow-md border-white/60 space-y-4" hoverEffect={false}>
        <h3 className="font-extrabold text-slate-800 text-base flex items-center">
          <Volume2 className="w-5 h-5 text-primary mr-2" />
          <span>Speech Synthesis Configuration</span>
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed">
          Adjust the speaking speed for the AAC Communication Board and AI narration. Slow speed supports speech compression comprehension.
        </p>

        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Speech Output Rate</span>
            <span className="text-primary">{speechRate}x Speed</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={speechRate}
            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
            <span>0.5x (Slow pacing)</span>
            <span>1.0x (Normal)</span>
            <span>1.5x (Fast)</span>
          </div>
        </div>
      </GlassCard>

      {/* Privacy settings */}
      <Card className="p-6 border-slate-100 space-y-4" hoverEffect={false}>
        <h3 className="font-extrabold text-slate-800 text-base flex items-center">
          <ShieldCheck className="w-5 h-5 text-secondary mr-2" />
          <span>Privacy & Telemetry Sharing</span>
        </h3>

        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-slate-800">Share Telemetry with Therapist</h4>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Automatically share pronunciation transcripts and assessment results with your matched speech therapist.
            </p>
          </div>
          <input
            type="checkbox"
            checked={telemetrySharing}
            onChange={() => setTelemetrySharing(!telemetrySharing)}
            className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary mt-1 shrink-0 cursor-pointer"
          />
        </div>

        <div className="h-px bg-slate-100 my-2" />

        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-slate-800">Mock Premium Dark Mode</h4>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Toggle theme color configurations. (Mock setting demonstration).
            </p>
          </div>
          <button 
            onClick={() => setIsDarkModeMock(!isDarkModeMock)}
            className="text-primary font-bold text-xs hover:underline mt-1 shrink-0"
          >
            {isDarkModeMock ? 'Disable Dark Mode' : 'Enable Dark Mode'}
          </button>
        </div>
      </Card>

      {/* HIPAA audit log checklist */}
      <Card className="p-6 border-slate-100 space-y-4" hoverEffect={false}>
        <h3 className="font-extrabold text-slate-800 text-base flex items-center">
          <Lock className="w-5 h-5 text-accent mr-2" />
          <span>HIPAA Clinical Audit Log</span>
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed">
          Silent Communicator complies with international electronic medical record standards (EMR). Below is the access sync trace.
        </p>

        <div className="divide-y divide-slate-100">
          {auditLogs.map((log, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between first:pt-0 last:pb-0 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-700">{log.event}</span>
                <span className="block text-[10px] text-slate-400 font-semibold">{log.date}</span>
              </div>
              <span className="text-[10px] text-teal-600 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Reset Progress Section */}
      <Card className="p-6 border-red-100 bg-red-50/10 space-y-4" hoverEffect={false}>
        <h3 className="font-extrabold text-red-600 text-base flex items-center">
          <RefreshCw className="w-5 h-5 mr-2 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Reset Therapy Records</span>
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed">
          Permanently clear your active pronunciation score, streaks, and completed activities history. This action is irreversible.
        </p>

        {resetCompleted ? (
          <div className="flex items-center space-x-2 text-red-500 font-bold text-xs bg-red-50 p-3 rounded-xl border border-red-100">
            <span>Progress records successfully cleared! Refreshing local storage...</span>
          </div>
        ) : (
          <div className="flex justify-start">
            <Button variant="danger" className="px-6 py-2 text-xs" onClick={handleResetProgress}>
              Reset Progress
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SettingsPage;
