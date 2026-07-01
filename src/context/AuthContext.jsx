import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Progress states
  const [progress, setProgress] = useState({
    streak: 4,
    completedActivities: 14,
    therapyTime: 215, // in minutes
    overallScore: 82, // percentage
    weeklyProgress: [
      { day: 'Mon', completed: true, score: 85 },
      { day: 'Tue', completed: true, score: 90 },
      { day: 'Wed', completed: true, score: 78 },
      { day: 'Thu', completed: true, score: 88 },
      { day: 'Fri', completed: false, score: 0 },
      { day: 'Sat', completed: false, score: 0 },
      { day: 'Sun', completed: false, score: 0 },
    ],
    recentActivities: [
      { id: 1, name: 'AAC Sentence Building', category: 'Communication', date: 'Today', score: 100 },
      { id: 2, name: 'Word Pronunciation: "Apple"', category: 'Articulation', date: 'Yesterday', score: 92 },
      { id: 3, name: 'Word Pronunciation: "Water"', category: 'Articulation', date: '2 days ago', score: 78 },
      { id: 4, name: 'Autism Screening Assessment', category: 'Screening', date: '3 days ago', score: 100 },
    ],
    assessments: []
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('sc_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    // Basic mock authentication
    const mockUser = {
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      role: 'Patient', // default role
      phone: '+1 (555) 019-2834',
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('sc_user', JSON.stringify(mockUser));
    return { success: true };
  };

  const register = (formData) => {
    const mockUser = {
      name: formData.name,
      email: formData.email,
      role: formData.role || 'Patient',
      phone: formData.phone || '+1 (555) 000-0000',
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('sc_user', JSON.stringify(mockUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('sc_user');
  };

  const updateProfile = (updatedDetails) => {
    const updated = { ...user, ...updatedDetails };
    setUser(updated);
    localStorage.setItem('sc_user', JSON.stringify(updated));
  };

  // Add activity logs dynamically
  const completeActivity = (activityName, category, score) => {
    setProgress(prev => {
      const newActivities = [
        {
          id: Date.now(),
          name: activityName,
          category,
          date: 'Just now',
          score
        },
        ...prev.recentActivities.slice(0, 5) // Keep last 6
      ];

      // Update score and time
      const newTotalActivities = prev.completedActivities + 1;
      const newTherapyTime = prev.therapyTime + 5; // assume 5 mins per activity
      const newOverallScore = Math.min(100, Math.round((prev.overallScore * 9 + score) / 10)); // running avg

      // Mark Friday as completed if we do something
      const dayIndex = new Date().getDay(); // 0 is Sun, 1 is Mon, etc.
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const currentDayName = days[dayIndex];

      const newWeeklyProgress = prev.weeklyProgress.map(d => {
        if (d.day === currentDayName) {
          return { ...d, completed: true, score };
        }
        return d;
      });

      return {
        ...prev,
        completedActivities: newTotalActivities,
        therapyTime: newTherapyTime,
        overallScore: newOverallScore,
        weeklyProgress: newWeeklyProgress,
        recentActivities: newActivities
      };
    });
  };

  // Add assessment results
  const addAssessmentResult = (type, responses, riskLevel, scoreDetails) => {
    setProgress(prev => {
      const newAssessment = {
        id: Date.now(),
        type,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        riskLevel,
        scoreDetails
      };
      
      return {
        ...prev,
        assessments: [newAssessment, ...prev.assessments],
        recentActivities: [
          {
            id: Date.now(),
            name: `${type} Screening`,
            category: 'Screening',
            date: 'Today',
            score: 100
          },
          ...prev.recentActivities
        ]
      };
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      progress,
      login,
      register,
      logout,
      updateProfile,
      completeActivity,
      addAssessmentResult
    }}>
      {children}
    </AuthContext.Provider>
  );
};
