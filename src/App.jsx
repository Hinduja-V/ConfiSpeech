import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Dashboard Layout & Sub-Pages
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/Dashboard/DashboardHome';
import AssessmentPage from './pages/Dashboard/AssessmentPage';
import TherapyPage from './pages/Dashboard/TherapyPage';
import CommunicationBoardPage from './pages/Dashboard/CommunicationBoardPage';
import ProgressPage from './pages/Dashboard/ProgressPage';
import TherapistPage from './pages/Dashboard/TherapistPage';
import ProfilePage from './pages/Dashboard/ProfilePage';
import SettingsPage from './pages/Dashboard/SettingsPage';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // Wait to check authentication (persisted via localStorage)
  // If not authenticated, redirect to login
  const savedUser = localStorage.getItem('sc_user');
  if (!isAuthenticated && !savedUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public Route Guard (Redirects away from Login/Register if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const savedUser = localStorage.getItem('sc_user');
  if (isAuthenticated || savedUser) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Marketing Route */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication Locks */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            } 
          />

          {/* Private Dashboard Area */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard Sub-Pages */}
            <Route index element={<DashboardHome />} />
            <Route path="assessment" element={<AssessmentPage />} />
            <Route path="therapy" element={<TherapyPage />} />
            <Route path="board" element={<CommunicationBoardPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="therapist" element={<TherapistPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            
            {/* Fallback inside dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>

          {/* General Catch-All Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
