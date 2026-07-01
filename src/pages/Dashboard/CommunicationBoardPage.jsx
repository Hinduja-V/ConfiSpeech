import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Trash2, ArrowLeft, Plus, Play, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card, GlassCard } from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const CommunicationBoardPage = () => {
  const { completeActivity } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [phrase, setPhrase] = useState([]); // Array of word objects

  const categories = ['All', 'Basic Needs', 'Emotions', 'Food', 'Daily Activities', 'Emergency'];

  const boardItems = [
    // Basic Needs
    { emoji: '🙋‍♂️', label: 'I want', spoken: 'I want', category: 'Basic Needs' },
    { emoji: '🙅‍♂️', label: 'I do not want', spoken: 'I do not want', category: 'Basic Needs' },
    { emoji: '💧', label: 'Water', spoken: 'water', category: 'Basic Needs' },
    { emoji: '🚽', label: 'Toilet', spoken: 'toilet', category: 'Basic Needs' },
    { emoji: '🛏️', label: 'Sleep', spoken: 'sleep', category: 'Basic Needs' },
    { emoji: '🚶‍♂️', label: 'Go outside', spoken: 'go outside', category: 'Basic Needs' },
    { emoji: '🤝', label: 'Help', spoken: 'help', category: 'Basic Needs' },
    { emoji: '🙏', label: 'Please', spoken: 'please', category: 'Basic Needs' },
    { emoji: '✅', label: 'Yes', spoken: 'yes', category: 'Basic Needs' },
    { emoji: '❌', label: 'No', spoken: 'no', category: 'Basic Needs' },

    // Emotions
    { emoji: '😊', label: 'Happy', spoken: 'happy', category: 'Emotions' },
    { emoji: '😢', label: 'Sad', spoken: 'sad', category: 'Emotions' },
    { emoji: '😡', label: 'Angry', spoken: 'angry', category: 'Emotions' },
    { emoji: '😴', label: 'Tired', spoken: 'tired', category: 'Emotions' },
    { emoji: '🤒', label: 'Sick', spoken: 'sick', category: 'Emotions' },
    { emoji: '😨', label: 'Scared', spoken: 'scared', category: 'Emotions' },

    // Food
    { emoji: '🍽️', label: 'Eat', spoken: 'eat', category: 'Food' },
    { emoji: '🍎', label: 'Apple', spoken: 'apple', category: 'Food' },
    { emoji: '🍌', label: 'Banana', spoken: 'banana', category: 'Food' },
    { emoji: '🍞', label: 'Bread', spoken: 'bread', category: 'Food' },
    { emoji: '🥛', label: 'Milk', spoken: 'milk', category: 'Food' },
    { emoji: '🍪', label: 'Cookie', spoken: 'cookie', category: 'Food' },

    // Daily Activities
    { emoji: '🧸', label: 'Play', spoken: 'play', category: 'Daily Activities' },
    { emoji: '📚', label: 'Read', spoken: 'read', category: 'Daily Activities' },
    { emoji: '🎨', label: 'Draw', spoken: 'draw', category: 'Daily Activities' },
    { emoji: '📺', label: 'Watch TV', spoken: 'watch TV', category: 'Daily Activities' },
    { emoji: '🎧', label: 'Music', spoken: 'music', category: 'Daily Activities' },
    { emoji: '🧼', label: 'Wash hands', spoken: 'wash hands', category: 'Daily Activities' },

    // Emergency
    { emoji: '🚨', label: 'Emergency', spoken: 'emergency', category: 'Emergency' },
    { emoji: '🩹', label: 'Hurt', spoken: 'hurt', category: 'Emergency' },
    { emoji: '🔥', label: 'Hot', spoken: 'hot', category: 'Emergency' },
    { emoji: '❄️', label: 'Cold', spoken: 'cold', category: 'Emergency' },
    { emoji: '💊', label: 'Medicine', spoken: 'medicine', category: 'Emergency' }
  ];

  const handleCardClick = (item) => {
    // Append to built phrase
    setPhrase(prev => [...prev, item]);
    // Speak word immediately
    speakText(item.spoken);
  };

  const handleClear = () => {
    setPhrase([]);
  };

  const handleBackspace = () => {
    setPhrase(prev => prev.slice(0, -1));
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSpeakPhrase = () => {
    if (phrase.length === 0) return;
    const fullSentence = phrase.map(item => item.spoken).join(' ');
    speakText(fullSentence);

    // Save as communication practice
    completeActivity(`Built sentence: "${fullSentence}"`, 'Communication', 100);
  };

  const filteredItems = selectedCategory === 'All' 
    ? boardItems 
    : boardItems.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-8 text-left">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">AAC Communication Board</h2>
        <p className="text-slate-500 text-sm mt-1">Tap cards to assemble sentences and speak them aloud using built-in speech synthesis.</p>
      </div>

      {/* Phrase Builder Console */}
      <GlassCard className="p-5 shadow-lg border-white/60 text-left space-y-4" hoverEffect={false}>
        <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
          <span>Active Sentence Builder</span>
          {phrase.length > 0 && <span>{phrase.length} Cards Selected</span>}
        </div>

        {/* Assembled Phrase output */}
        <div className="min-h-[70px] bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-wrap gap-2 items-center">
          {phrase.length === 0 ? (
            <span className="text-slate-400 text-sm font-semibold italic">Sentence is empty. Tap cards below to build communication.</span>
          ) : (
            phrase.map((item, idx) => (
              <motion.span 
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center space-x-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm font-bold text-slate-800 text-sm"
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </motion.span>
            ))
          )}
        </div>

        {/* Phrase Console Actions */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            onClick={handleSpeakPhrase}
            disabled={phrase.length === 0}
            icon={Volume2}
            className="px-6 py-2.5 text-sm"
          >
            Speak Sentence
          </Button>

          <Button
            variant="outline"
            onClick={handleBackspace}
            disabled={phrase.length === 0}
            className="px-4 py-2.5 text-xs text-slate-600 border-slate-200"
          >
            Backspace
          </Button>

          <Button
            variant="glass"
            onClick={handleClear}
            disabled={phrase.length === 0}
            icon={Trash2}
            className="px-4 py-2.5 text-xs text-red-500 border-red-100 hover:bg-red-50/50"
          >
            Clear All
          </Button>
        </div>
      </GlassCard>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 pb-1 border-b border-slate-100">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`py-2 px-4 rounded-xl text-xs md:text-sm font-bold transition duration-200 ${
              selectedCategory === cat 
                ? 'bg-primary text-white shadow-sm' 
                : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* AAC Grid cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCardClick(item)}
            className={`cursor-pointer rounded-xl p-4 bg-white border border-slate-100 text-center flex flex-col items-center justify-between shadow-premium transition duration-200 min-h-[110px] ${
              item.category === 'Emergency' ? 'hover:border-red-200 hover:bg-red-50/10' : 'hover:border-primary/20 hover:bg-blue-50/10'
            }`}
          >
            <span className="text-3xl md:text-4xl mb-3">{item.emoji}</span>
            <div className="space-y-0.5">
              <h4 className="font-extrabold text-xs md:text-sm text-slate-800 leading-tight">{item.label}</h4>
              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wide">{item.category}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunicationBoardPage;
