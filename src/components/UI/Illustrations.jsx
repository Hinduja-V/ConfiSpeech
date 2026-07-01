import React from 'react';
import { motion } from 'framer-motion';

// Logo: Brain + Speech bubble merged
export const Logo = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#14B8A6" />
      </linearGradient>
    </defs>
    {/* Speech Bubble Outline */}
    <path 
      d="M20 50C20 30.67 33.43 15 50 15C66.57 15 80 30.67 80 50C80 69.33 66.57 85 50 85C45.31 85 40.85 83.7 37 81.4L20 87L25.1 71C21.85 64.9 20 57.8 20 50Z" 
      fill="url(#logoGrad)" 
      opacity="0.15" 
    />
    <path 
      d="M20 50C20 30.67 33.43 15 50 15C66.57 15 80 30.67 80 50C80 69.33 66.57 85 50 85C45.31 85 40.85 83.7 37 81.4L20 87L25.1 71" 
      stroke="url(#logoGrad)" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    {/* Brain Nodes */}
    <circle cx="50" cy="35" r="4" fill="#2563EB" />
    <circle cx="38" cy="45" r="4" fill="#8B5CF6" />
    <circle cx="62" cy="45" r="4" fill="#8B5CF6" />
    <circle cx="44" cy="58" r="4" fill="#14B8A6" />
    <circle cx="56" cy="58" r="4" fill="#14B8A6" />
    <circle cx="50" cy="48" r="5" fill="#2563EB" />

    {/* Connections */}
    <line x1="50" y1="35" x2="50" y2="48" stroke="#8B5CF6" strokeWidth="2" opacity="0.6" />
    <line x1="38" y1="45" x2="50" y2="48" stroke="#8B5CF6" strokeWidth="2" opacity="0.6" />
    <line x1="62" y1="45" x2="50" y2="48" stroke="#8B5CF6" strokeWidth="2" opacity="0.6" />
    <line x1="44" y1="58" x2="50" y2="48" stroke="#14B8A6" strokeWidth="2" opacity="0.6" />
    <line x1="56" y1="58" x2="50" y2="48" stroke="#14B8A6" strokeWidth="2" opacity="0.6" />
    <line x1="38" y1="45" x2="44" y2="58" stroke="#14B8A6" strokeWidth="1.5" opacity="0.4" />
    <line x1="62" y1="45" x2="56" y2="58" stroke="#14B8A6" strokeWidth="1.5" opacity="0.4" />
  </svg>
);

// HeroIllustration: Premium animated medical illustration showing AI analysis, speech waves
export const HeroIllustration = () => (
  <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
    {/* Floating Blobs */}
    <div className="absolute w-72 h-72 rounded-full bg-primary/10 blur-3xl -top-10 -left-10 animate-pulse-slow"></div>
    <div className="absolute w-72 h-72 rounded-full bg-secondary/10 blur-3xl -bottom-10 -right-10 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
    <div className="absolute w-60 h-60 rounded-full bg-accent/10 blur-3xl top-1/3 left-1/4 animate-pulse-slow" style={{ animationDelay: '3s' }}></div>

    <svg viewBox="0 0 500 500" className="relative z-10 w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
        <linearGradient id="sphereGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#2563EB" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Background circles */}
      <circle cx="250" cy="250" r="180" stroke="#F1F5F9" strokeWidth="2" strokeDasharray="5 5" />
      <circle cx="250" cy="250" r="140" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* Main Therapeutic Sphere (Core AI) */}
      <motion.circle 
        cx="250" 
        cy="250" 
        r="70" 
        fill="url(#sphereGrad)" 
        opacity="0.85"
        filter="url(#shadow)"
        animate={{
          scale: [1, 1.05, 0.95, 1],
          rotate: 360
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Inner graphic representing audio processing */}
      <circle cx="250" cy="250" r="50" fill="white" opacity="0.2" />
      
      {/* Speech therapist bubble / Therapist avatar representation */}
      <motion.g 
        transform="translate(100, 110)"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="0" y="0" width="130" height="60" rx="20" fill="white" filter="url(#shadow)" className="shadow-lg" />
        <rect x="1" y="1" width="128" height="58" rx="19" stroke="#E2E8F0" strokeWidth="1" />
        <circle cx="30" cy="30" r="16" fill="#2563EB" opacity="0.1" />
        <path d="M26 38C26 34.68 28.68 32 32 32C35.32 32 38 34.68 38 38" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="24" r="5" stroke="#2563EB" strokeWidth="2" />
        <text x="56" y="35" fill="#334155" fontSize="13" fontWeight="bold" fontFamily="system-ui">Therapist</text>
        {/* Connection line to center */}
        <path d="M110 60 L140 100" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 4" />
      </motion.g>

      {/* Child Speech bubble representation */}
      <motion.g 
        transform="translate(280, 330)"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <rect x="0" y="0" width="130" height="60" rx="20" fill="white" filter="url(#shadow)" />
        <rect x="1" y="1" width="128" height="58" rx="19" stroke="#E2E8F0" strokeWidth="1" />
        <circle cx="30" cy="30" r="16" fill="#14B8A6" opacity="0.1" />
        <path d="M26 38C26 34.68 28.68 32 32 32C35.32 32 38 34.68 38 38" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="24" r="5" stroke="#14B8A6" strokeWidth="2" />
        <text x="56" y="35" fill="#334155" fontSize="13" fontWeight="bold" fontFamily="system-ui">Patient</text>
        {/* Connection line to center */}
        <path d="M20 0 L-20 -40" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 4" />
      </motion.g>

      {/* Speech Waves */}
      <motion.path 
        d="M 120 250 Q 180 200 250 250 T 380 250" 
        stroke="url(#waveGrad)" 
        strokeWidth="4" 
        strokeLinecap="round"
        fill="none" 
        animate={{
          d: [
            "M 120 250 Q 180 210 250 250 T 380 250",
            "M 120 250 Q 180 290 250 250 T 380 250",
            "M 120 250 Q 180 210 250 250 T 380 250"
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.path 
        d="M 150 250 Q 200 280 250 250 T 350 250" 
        stroke="#8B5CF6" 
        strokeWidth="2" 
        strokeLinecap="round"
        fill="none" 
        opacity="0.5"
        animate={{
          d: [
            "M 150 250 Q 200 290 250 250 T 350 250",
            "M 150 250 Q 200 210 250 250 T 350 250",
            "M 150 250 Q 200 290 250 250 T 350 250"
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      {/* Floating elements */}
      {/* Speech bubbles */}
      <motion.g 
        transform="translate(370, 160)"
        animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="20" cy="20" r="20" fill="white" filter="url(#shadow)" />
        <text x="11" y="26" fontSize="16">🗣️</text>
      </motion.g>

      <motion.g 
        transform="translate(80, 290)"
        animate={{ y: [0, 8, 0], scale: [1, 0.95, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <circle cx="20" cy="20" r="20" fill="white" filter="url(#shadow)" />
        <text x="12" y="26" fontSize="16">🌟</text>
      </motion.g>

      {/* Floating Card (Quick Stats) */}
      <motion.g 
        transform="translate(300, 60)"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <rect x="0" y="0" width="110" height="50" rx="12" fill="white" filter="url(#shadow)" />
        <text x="12" y="22" fill="#14B8A6" fontSize="12" fontWeight="bold" fontFamily="system-ui">AI Accuracy</text>
        <text x="12" y="40" fill="#1E293B" fontSize="16" fontWeight="bold" fontFamily="system-ui">98.4%</text>
      </motion.g>

      <motion.g 
        transform="translate(60, 400)"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      >
        <rect x="0" y="0" width="120" height="50" rx="12" fill="white" filter="url(#shadow)" />
        <text x="12" y="22" fill="#8B5CF6" fontSize="12" fontWeight="bold" fontFamily="system-ui">Weekly Streak</text>
        <text x="12" y="40" fill="#1E293B" fontSize="16" fontWeight="bold" fontFamily="system-ui">5 Days 🔥</text>
      </motion.g>
    </svg>
  </div>
);

// AboutIllustration: Mandala design with nodes representing connectivity, clinical care, progress
export const AboutIllustration = () => (
  <div className="relative w-full aspect-square max-w-[400px] mx-auto flex items-center justify-center">
    <div className="absolute w-64 h-64 rounded-full bg-secondary/5 blur-3xl"></div>
    <svg viewBox="0 0 400 400" className="relative z-10 w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      <circle cx="200" cy="200" r="160" stroke="#F1F5F9" strokeWidth="2" />
      <circle cx="200" cy="200" r="120" stroke="#E2E8F0" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="80" stroke="#CBD5E1" strokeWidth="1" />

      {/* Rotating Nodes */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="origin-center"
      >
        {/* Core items */}
        <circle cx="200" cy="40" r="18" fill="url(#circleGrad)" />
        <text x="194" y="45" fill="white" fontSize="13" fontWeight="bold">🤖</text>

        <circle cx="200" cy="360" r="18" fill="url(#circleGrad)" />
        <text x="193" y="365" fill="white" fontSize="13" fontWeight="bold">💬</text>

        <circle cx="40" cy="200" r="18" fill="url(#circleGrad)" />
        <text x="33" y="205" fill="white" fontSize="13" fontWeight="bold">❤️</text>

        <circle cx="360" cy="200" r="18" fill="url(#circleGrad)" />
        <text x="353" y="205" fill="white" fontSize="13" fontWeight="bold">📈</text>

        {/* Lines connecting nodes */}
        <line x1="200" y1="40" x2="200" y2="360" stroke="#E2E8F0" strokeWidth="1.5" />
        <line x1="40" y1="200" x2="360" y2="200" stroke="#E2E8F0" strokeWidth="1.5" />
      </motion.g>

      {/* Core Center Brain */}
      <circle cx="200" cy="200" r="45" fill="white" filter="drop-shadow(0 10px 15px rgba(37,99,235,0.15))" />
      <circle cx="200" cy="200" r="44" stroke="#2563EB" strokeWidth="2" />
      <text x="187" y="207" fontSize="24">🧠</text>

      {/* Floating words around the illustration */}
      <g opacity="0.75" fontSize="11" fontWeight="600" fontFamily="system-ui" fill="#64748B">
        <text x="230" y="90">Assessment</text>
        <text x="80" y="140">Autism</text>
        <text x="280" y="290">Aphasia</text>
        <text x="90" y="270">DLD Support</text>
      </g>
    </svg>
  </div>
);

// BenefitsIllustration: Visualization of clinical benefits (growth, speech, therapy schedule)
export const BenefitsIllustration = () => (
  <div className="relative w-full aspect-square max-w-[400px] mx-auto flex items-center justify-center">
    <div className="absolute w-64 h-64 rounded-full bg-accent/5 blur-3xl"></div>
    <svg viewBox="0 0 400 400" className="relative z-10 w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background grid */}
      <path d="M 50 100 L 350 100 M 50 180 L 350 180 M 50 260 L 350 260 M 50 340 L 350 340" stroke="#F1F5F9" strokeWidth="1.5" />
      <path d="M 100 50 L 100 350 M 200 50 L 200 350 M 300 50 L 300 350" stroke="#F1F5F9" strokeWidth="1.5" />

      {/* Benefit Progress Bar */}
      <rect x="70" y="120" width="260" height="28" rx="14" fill="#F1F5F9" />
      <motion.rect 
        x="70" 
        y="120" 
        height="28" 
        rx="14" 
        fill="url(#circleGrad)"
        initial={{ width: 0 }}
        animate={{ width: 220 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>
        </defs>
      </motion.rect>
      <text x="85" y="138" fill="white" fontSize="11" fontWeight="bold" fontFamily="system-ui">Progress 85%</text>

      {/* Floating Card (Engagement Score) */}
      <motion.g 
        transform="translate(70, 200)"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="0" y="0" width="110" height="90" rx="16" fill="white" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.06))" />
        <rect x="1" y="1" width="108" height="88" rx="15" stroke="#F1F5F9" strokeWidth="1" />
        <circle cx="35" cy="35" r="18" fill="#E0F2FE" />
        <text x="27" y="41" fontSize="16">📈</text>
        <text x="14" y="68" fill="#64748B" fontSize="10" fontWeight="bold" fontFamily="system-ui">Confidence</text>
        <text x="14" y="80" fill="#0369A1" fontSize="12" fontWeight="bold" fontFamily="system-ui">+40% Raise</text>
      </motion.g>

      {/* Floating Card (Therapy Cost savings) */}
      <motion.g 
        transform="translate(210, 220)"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <rect x="0" y="0" width="120" height="90" rx="16" fill="white" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.06))" />
        <rect x="1" y="1" width="118" height="88" rx="15" stroke="#F1F5F9" strokeWidth="1" />
        <circle cx="35" cy="35" r="18" fill="#F0FDF4" />
        <text x="27" y="41" fontSize="16">💵</text>
        <text x="14" y="68" fill="#64748B" fontSize="10" fontWeight="bold" fontFamily="system-ui">Saved Expenses</text>
        <text x="14" y="80" fill="#15803D" fontSize="12" fontWeight="bold" fontFamily="system-ui">Save $250/wk</text>
      </motion.g>

      {/* Success Badge */}
      <motion.circle 
        cx="200" 
        cy="70" 
        r="28" 
        fill="#EEF2FF"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <circle cx="200" cy="70" r="27" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="187" y="78" fontSize="22">🎉</text>
    </svg>
  </div>
);

// LoginIllustration: Modern clinical login artwork
export const LoginIllustration = () => (
  <div className="relative w-full aspect-square max-w-[450px] mx-auto flex items-center justify-center p-4">
    <div className="absolute w-72 h-72 rounded-full bg-primary/5 blur-3xl"></div>
    <svg viewBox="0 0 400 400" className="relative z-10 w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="loginGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      {/* Decorative items */}
      <circle cx="200" cy="200" r="130" stroke="#EEF2FF" strokeWidth="3" />
      <circle cx="200" cy="200" r="90" stroke="#E0E7FF" strokeWidth="2" strokeDasharray="6 6" />

      {/* Padlock / Speech key graphic */}
      <motion.g
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="140" y="150" width="120" height="100" rx="20" fill="url(#loginGrad)" filter="drop-shadow(0 15px 30px rgba(37,99,235,0.2))" />
        {/* Shackle */}
        <path d="M165 150 V115 C165 95.56 180.67 80 200 80 C219.33 80 235 95.56 235 115 V150" stroke="#8B5CF6" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
        <path d="M165 150 V115 C165 95.56 180.67 80 200 80 C219.33 80 235 95.56 235 115 V150" stroke="white" strokeWidth="5" strokeLinecap="round" />
        
        {/* Heart/Keyhole shape */}
        <circle cx="200" cy="190" r="10" fill="white" />
        <polygon points="195,190 205,190 202,220 198,220" fill="white" />

        {/* Micro sparkles */}
        <motion.circle cx="110" cy="120" r="6" fill="#14B8A6" animate={{ scale: [0.5, 1.2, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="290" cy="260" r="8" fill="#2563EB" animate={{ scale: [1.2, 0.5, 1.2] }} transition={{ duration: 2.5, repeat: Infinity }} />
      </motion.g>

      <text x="145" y="320" fill="#475569" fontSize="15" fontWeight="bold" fontFamily="system-ui">Secure Patient Access</text>
      <text x="155" y="340" fill="#94A3B8" fontSize="12" fontFamily="system-ui">HIPAA Compliant Protocol</text>
    </svg>
  </div>
);
