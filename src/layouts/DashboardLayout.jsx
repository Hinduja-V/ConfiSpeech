import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, LayoutDashboard, Brain, MessageSquare, LineChart, Stethoscope, 
  Bell, User, Settings, LogOut, Menu, X, ClipboardCheck, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/UI/Illustrations';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Assessment', path: '/dashboard/assessment', icon: ClipboardCheck },
    { name: 'AI Therapy', path: '/dashboard/therapy', icon: Brain },
    { name: 'Communication Board', path: '/dashboard/board', icon: MessageSquare },
    { name: 'Progress Metrics', path: '/dashboard/progress', icon: LineChart },
    { name: 'My Therapist', path: '/dashboard/therapist', icon: Stethoscope },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const mockNotifications = [
    { id: 1, text: 'Therapist Robert sent you a message.', time: '10m ago', unread: true },
    { id: 2, text: 'Your daily articulation streak is at risk!', time: '1h ago', unread: true },
    { id: 3, text: 'AI Assessment report is ready for download.', time: '1d ago', unread: false }
  ];

  const unreadCount = mockNotifications.filter(n => n.unread).length;

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <Link to="/" className="flex items-center space-x-2">
          <Logo className="w-8 h-8" />
          <span className="font-extrabold text-base bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Silent Comm</span>
        </Link>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-1 text-slate-500 hover:text-primary transition"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-1 text-slate-500 hover:text-primary transition"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* SIDEBAR (Desktop: static, Mobile: slideout) */}
      <AnimatePresence>
        {(sidebarOpen || !sidebarOpen) && (
          <motion.aside
            className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-all duration-300 md:translate-x-0 md:static ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full md:block'
            }`}
          >
            {/* Sidebar Top: Logo + Mobile Close */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3 group">
                <Logo className="w-8 h-8" />
                <span className="font-extrabold text-lg tracking-tight text-white">Silent Comm</span>
              </Link>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar Middle: Menu Items */}
            <div className="flex-grow py-6 overflow-y-auto px-3 space-y-1">
              <span className="block px-3 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-3">Therapy Terminal</span>
              
              <Link
                to="/"
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition text-sm font-semibold mb-4"
              >
                <Home className="w-4 h-4" />
                <span>Go to Landing</span>
              </Link>

              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-white shadow-sm font-bold' 
                        : 'border border-transparent hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-primary" />}
                  </Link>
                );
              })}
            </div>

            {/* Sidebar Bottom: User + Logout */}
            <div className="p-4 border-t border-slate-800">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  {user?.role === 'Therapist' ? '🩺' : '🗣️'}
                </span>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-xs text-white truncate">{user?.name || 'Voice Patient'}</h4>
                  <span className="text-[10px] text-slate-400 font-semibold">{user?.role || 'Patient'}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-slate-400 hover:bg-red-950/20 hover:text-red-400 transition text-sm font-semibold border border-transparent hover:border-red-900/30"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* DESKTOP TOP HEADER */}
        <header className="hidden md:flex bg-white border-b border-slate-100 py-3.5 px-8 items-center justify-between sticky top-0 z-20">
          <div className="flex items-center space-x-4">
            <span className="text-xs text-slate-400 font-bold bg-slate-100 px-3 py-1 rounded-full">{formattedDate}</span>
          </div>

          <div className="flex items-center space-x-5">
            {/* Notification bell */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-full hover:bg-slate-50 transition text-slate-500 hover:text-primary"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification dropdown */}
              <AnimatePresence>
                {notificationsOpen && (
                  <>
                    {/* Backdrop cover for clicking away */}
                    <div className="fixed inset-0 z-30" onClick={() => setNotificationsOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-72 bg-white rounded-premium border border-slate-100 shadow-xl z-40 p-4 text-left"
                    >
                      <h4 className="font-extrabold text-sm text-slate-800 mb-3 flex items-center justify-between">
                        <span>Notifications</span>
                        {unreadCount > 0 && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">{unreadCount} New</span>}
                      </h4>
                      <div className="space-y-3">
                        {mockNotifications.map(notification => (
                          <div 
                            key={notification.id} 
                            className={`p-2.5 rounded-xl border transition text-xs ${
                              notification.unread 
                                ? 'bg-blue-50/50 border-blue-100/50 text-slate-700 font-medium' 
                                : 'bg-white border-slate-50 text-slate-400'
                            }`}
                          >
                            <p>{notification.text}</p>
                            <span className="block text-[10px] text-slate-400 mt-1 font-semibold">{notification.time}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile widget */}
            <div className="flex items-center space-x-3.5 pl-4 border-l border-slate-100">
              <span className="text-2xl w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                {user?.role === 'Therapist' ? '🩺' : '🗣️'}
              </span>
              <div className="text-left leading-none">
                <span className="block text-xs font-bold text-slate-800">{user?.name || 'Voice Patient'}</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{user?.role || 'Patient'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;
