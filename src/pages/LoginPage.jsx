import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/UI/Button';
import { GlassCard } from '../components/UI/Card';
import { LoginIllustration } from '../components/UI/Illustrations';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setLoading(true);
    // Simulate slight API lag
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials.');
      }
    }, 800);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login('google.user@example.com', 'googlepassword');
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between relative overflow-hidden">
      {/* Header Link */}
      <div className="absolute top-6 left-6 z-10">
        <Link to="/" className="flex items-center space-x-2 text-slate-500 hover:text-primary transition font-bold text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Premium illustration (hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col items-center text-center space-y-6">
            <LoginIllustration />
          </div>

          {/* Right Column: Glassmorphism Login Card */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            <GlassCard className="p-8 shadow-2xl border-white/80" hoverEffect={false}>
              <div className="text-center mb-8">
                <span className="text-3xl">🧠</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-3">Welcome Back</h2>
                <p className="text-slate-400 text-sm mt-1">Sign in to resume your speech therapy sessions</p>
              </div>

              {error && (
                <div className="mb-4 p-3.5 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-semibold text-left">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div>
                  <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                      placeholder="patient@example.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Password</label>
                    <a href="#" onClick={() => alert("Password reset link simulated.")} className="text-xs text-primary font-bold hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                  {loading ? 'Securing Access...' : 'Sign In'}
                </Button>
              </form>

              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <span className="relative bg-white/70 px-3 text-xs text-slate-400 font-bold uppercase">Or Continue With</span>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full inline-flex justify-center items-center py-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition text-slate-700 font-semibold text-sm shadow-sm"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.22-4.53 2.18-4.53z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google Account
              </button>

              <div className="text-center mt-6">
                <span className="text-xs text-slate-400">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary font-bold hover:underline">
                    Create free account
                  </Link>
                </span>
              </div>
            </GlassCard>
          </div>

        </div>
      </div>

      {/* Footer HIPAA badge */}
      <div className="py-6 border-t border-slate-100 flex items-center justify-center space-x-2 text-xs text-slate-400">
        <Shield className="w-3.5 h-3.5 text-secondary" />
        <span>Fully Encrypted Clinical Session • HIPAA Compliant</span>
      </div>
    </div>
  );
};

export default LoginPage;
