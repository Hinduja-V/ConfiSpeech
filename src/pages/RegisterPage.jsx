import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/UI/Button';
import { GlassCard } from '../components/UI/Card';

const RegisterPage = () => {
  const [role, setRole] = useState('Patient'); // Patient, Caregiver, Therapist, Hospital
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = register({ ...formData, role });
      setLoading(false);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError('Registration failed. Try again.');
      }
    }, 800);
  };

  const roles = [
    { id: 'Patient', title: 'Patient', icon: '🗣️', desc: 'I need therapy support' },
    { id: 'Caregiver', title: 'Caregiver', icon: '❤️', desc: 'Assisting a loved one' },
    { id: 'Therapist', title: 'Therapist', icon: '🩺', desc: 'Licensed practitioner' },
    { id: 'Hospital', title: 'Hospital', icon: '🏢', desc: 'Clinical organization' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between relative py-12">
      {/* Back button */}
      <div className="absolute top-6 left-6 z-10">
        <Link to="/" className="flex items-center space-x-2 text-slate-500 hover:text-primary transition font-bold text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full">
          <GlassCard className="p-8 shadow-2xl border-white/80" hoverEffect={false}>
            <div className="text-center mb-8">
              <span className="text-3xl">🗣️</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-3">Create Voice Account</h2>
              <p className="text-slate-400 text-sm mt-1">Start your adaptive speech therapy path today</p>
            </div>

            {error && (
              <div className="mb-6 p-3.5 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-semibold text-left flex items-start space-x-2">
                <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              {/* Role Selection Grid */}
              <div>
                <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">Select Your Role</label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => handleRoleSelect(r.id)}
                      className={`cursor-pointer rounded-xl p-3 border text-left transition duration-200 ${
                        role === r.id 
                          ? 'border-primary bg-blue-50/50 shadow-sm ring-1 ring-primary' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{r.icon}</span>
                        <input
                          type="radio"
                          name="role"
                          checked={role === r.id}
                          onChange={() => {}}
                          className="w-3.5 h-3.5 text-primary border-slate-300 focus:ring-primary"
                        />
                      </div>
                      <h4 className="font-bold text-xs text-slate-800 mt-2">{r.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Input fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Full Name</label>
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
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                      placeholder="Jane Doe"
                    />
                  </div>
                </div>

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
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Phone Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Password</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Confirm Password</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input
                        type="password"
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <input type="checkbox" required className="rounded border-slate-300 text-primary focus:ring-primary" />
                <span>I agree to HIPAA Privacy Disclosures & clinical terms.</span>
              </div>

              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Creating secure records...' : 'Create Account'}
              </Button>
            </form>

            <div className="text-center mt-6">
              <span className="text-xs text-slate-400">
                Already registered?{' '}
                <Link to="/login" className="text-primary font-bold hover:underline">
                  Sign In
                </Link>
              </span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
