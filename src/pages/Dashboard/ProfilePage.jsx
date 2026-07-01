import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Tag, CheckCircle2, ShieldCheck, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card, GlassCard } from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || 'Voice Patient',
    email: user?.email || 'patient@example.com',
    phone: user?.phone || '+1 (555) 019-2834',
    role: user?.role || 'Patient'
  });
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-left">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Profile Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Manage your secure personal information and clinical identifiers.</p>
      </div>

      <GlassCard className="p-8 shadow-xl border-white/60 text-left space-y-6" hoverEffect={false}>
        
        {/* Profile Avatar Header */}
        <div className="flex items-center space-x-5 pb-6 border-b border-slate-100">
          <span className="text-4xl bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center border border-slate-200 shrink-0">
            {formData.role === 'Therapist' ? '🩺' : '🗣️'}
          </span>
          <div>
            <h3 className="font-extrabold text-slate-800 text-xl">{formData.name}</h3>
            <span className="text-xs text-primary font-bold uppercase tracking-wider">{formData.role} Profile</span>
          </div>
        </div>

        {/* Success Banner */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-teal-50 border border-teal-100 rounded-xl text-secondary text-xs font-bold flex items-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Secure profile update synchronized to local database!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Display Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition text-slate-700 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Secure Role</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Tag className="w-4 h-4" />
                </span>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition text-slate-700 font-semibold"
                >
                  <option value="Patient">Patient</option>
                  <option value="Caregiver">Caregiver</option>
                  <option value="Therapist">Therapist</option>
                  <option value="Hospital">Hospital</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition text-slate-700 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Mobile Phone</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition text-slate-700 font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <Button type="submit" variant="primary" icon={Save}>
              Save Secure Changes
            </Button>
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>HIPAA Compliant Record</span>
            </div>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default ProfilePage;
