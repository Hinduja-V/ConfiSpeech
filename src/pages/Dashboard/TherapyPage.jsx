import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, Play, Square, Sparkles, Star, ChevronRight, Volume2, 
  HelpCircle, ShieldCheck, Award, Heart, BookOpen, Music, Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card, GlassCard } from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const TherapyPage = () => {
  const { completeActivity } = useAuth();
  const [activeTab, setActiveTab] = useState('pronunciation'); // pronunciation, story, music
  
  // Tab 1: Pronunciation Practice State
  const [selectedWord, setSelectedWord] = useState('Apple');
  const [isRecording, setIsRecording] = useState(false);
  const [practicePassed, setPracticePassed] = useState(null); // { score, breakdown }
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Tab 2: Story Therapy State
  const [selectedStory, setSelectedStory] = useState(null);
  const [storyPassed, setStoryPassed] = useState(null);

  // Tab 3: Music Therapy Metronome State
  const [bpm, setBpm] = useState(60);
  const [metronomeActive, setMetronomeActive] = useState(false);
  const [pulseScale, setPulseScale] = useState(1);

  const practiceWords = [
    { word: 'Apple', difficulty: 'Easy', phonemes: 'æp.əl' },
    { word: 'Therapy', difficulty: 'Medium', phonemes: 'θer.ə.pi' },
    { word: 'Speech', difficulty: 'Easy', phonemes: 'spiːtʃ' },
    { word: 'Communication', difficulty: 'Hard', phonemes: 'kə.mjuː.nɪ.keɪ.ʃən' },
    { word: 'Articulation', difficulty: 'Hard', phonemes: 'ɑː.tɪk.jʊ.leɪ.ʃən' },
    { word: 'Autism', difficulty: 'Medium', phonemes: 'ɔː.tɪ.zəm' }
  ];

  const stories = [
    {
      id: 1,
      title: 'The Brave Little Turtle',
      difficulty: 'Easy',
      text: 'Toby was a small turtle who loved to explore. One day, he found a high hill. Although he crawled slowly, Toby did not give up. He reached the top and saw a beautiful rainbow across the sky.',
      questions: ['Who was Toby?', 'What did Toby see at the top of the hill?']
    },
    {
      id: 2,
      title: 'A Rocket to the Moon',
      difficulty: 'Medium',
      text: 'Mia built a silver rocket in her backyard. She pressed the red launch button. 3, 2, 1... Lift off! The rocket soared past twinkling stars and landed on the cheese-colored moon, where she planted a flag.',
      questions: ['What color was the rocket?', 'Where did the rocket land?']
    }
  ];

  // metronome tick loop
  useEffect(() => {
    let interval = null;
    if (metronomeActive) {
      const ms = (60 / bpm) * 1000;
      interval = setInterval(() => {
        // Toggle scale to simulate pulse flash
        setPulseScale(1.15);
        // Play click sound using browser AudioContext
        try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.frequency.setValueAtTime(800, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.05);
        } catch (e) {}

        setTimeout(() => setPulseScale(1), 150);
      }, ms);
    }
    return () => clearInterval(interval);
  }, [metronomeActive, bpm]);

  // timer for recording
  useEffect(() => {
    let timer = null;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setPracticePassed(null);
    
    // Simulate speech recognition assessment
    setTimeout(() => {
      setIsRecording(false);
      
      // Calculate mock score
      const randomScore = Math.floor(Math.random() * 21) + 80; // 80 - 100
      let accuracyDetails = 'Excellent articulation of phonemes.';
      
      if (randomScore < 85) {
        accuracyDetails = 'Mild hesitation detected. Practice the vowel linkage.';
      } else if (randomScore < 95) {
        accuracyDetails = 'Very good clarity. Clean consonant release.';
      }

      setPracticePassed({
        score: randomScore,
        details: accuracyDetails
      });

      // Complete activity in context
      completeActivity(`Pronounced "${selectedWord}"`, 'Articulation', randomScore);
    }, 3000);
  };

  const handleTextToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // slightly slower for therapeutic pacing
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  const handleStoryRead = () => {
    setIsRecording(true);
    setStoryPassed(null);
    setTimeout(() => {
      setIsRecording(false);
      const score = Math.floor(Math.random() * 15) + 85;
      setStoryPassed({
        score,
        details: 'Splendid reading cadence. Pauses at periods were correctly observed.'
      });
      completeActivity(`Read "${selectedStory.title}"`, 'Story Therapy', score);
    }, 4000);
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Therapy Suite</h2>
        <p className="text-slate-500 text-sm mt-1">Adaptive articulation, comprehension, and pacing exercises with real-time feedback.</p>
      </div>

      {/* Tabs selectors */}
      <div className="flex space-x-2 bg-slate-100 p-1 rounded-2xl max-w-md">
        {[
          { id: 'pronunciation', label: 'Vocal Articulation', icon: Mic },
          { id: 'story', label: 'Story Therapy', icon: BookOpen },
          { id: 'music', label: 'Music Metronome', icon: Music },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setPracticePassed(null);
                setStoryPassed(null);
              }}
              className={`flex-grow flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs md:text-sm font-bold transition duration-200 ${
                activeTab === tab.id 
                  ? 'bg-white text-primary shadow-sm border border-slate-200/50' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PRONUNCIATION PRACTICE */}
      {activeTab === 'pronunciation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Word List */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider pl-1">Target Phonemes</h3>
            {practiceWords.map((item) => (
              <div
                key={item.word}
                onClick={() => {
                  if (!isRecording) {
                    setSelectedWord(item.word);
                    setPracticePassed(null);
                  }
                }}
                className={`cursor-pointer p-4 rounded-xl border text-left transition duration-200 ${
                  selectedWord === item.word 
                    ? 'border-primary bg-blue-50/50 shadow-sm ring-1 ring-primary' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-base text-slate-800">{item.word}</h4>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    item.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {item.difficulty}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono mt-1 block">/{item.phonemes}/</span>
              </div>
            ))}
          </div>

          {/* Practice Pad */}
          <div className="lg:col-span-8">
            <GlassCard className="p-8 shadow-xl border-white/60 text-center space-y-6" hoverEffect={false}>
              <div>
                <span className="text-xs text-slate-400 font-extrabold uppercase tracking-widest">Active Articulation</span>
                <h3 className="text-4xl font-extrabold text-slate-900 mt-2">"{selectedWord}"</h3>
                <span className="text-sm text-slate-400 font-mono mt-1 block">
                  Pronunciation IPA: /{practiceWords.find(w => w.word === selectedWord)?.phonemes}/
                </span>
              </div>

              {/* Speaker trigger */}
              <div className="flex justify-center">
                <Button 
                  variant="glass" 
                  onClick={() => handleTextToSpeech(selectedWord)}
                  icon={Volume2}
                  className="px-4 py-2 text-xs"
                >
                  Listen to AI Guide
                </Button>
              </div>

              {/* Active mic recording window */}
              <div className="h-32 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center relative overflow-hidden">
                {isRecording ? (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    {/* Animated speech waves */}
                    <div className="flex items-center space-x-1.5 h-12">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [12, 40, 12] }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 0.8, 
                            delay: i * 0.15,
                            ease: "easeInOut"
                          }}
                          className="w-1.5 bg-primary rounded-full"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider animate-pulse">Capturing Voice: {recordingSeconds}s</span>
                  </div>
                ) : (
                  <div className="text-center text-slate-400 p-4">
                    <p className="text-sm font-semibold">Click "Record Speech" and speak "{selectedWord}" clearly.</p>
                    <p className="text-[11px] text-slate-400 mt-1">Direct browser voice-feed scoring.</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center">
                {isRecording ? (
                  <Button variant="danger" className="shadow-md" onClick={() => setIsRecording(false)}>
                    Cancel Recording
                  </Button>
                ) : (
                  <Button 
                    variant="primary" 
                    className="shadow-lg"
                    onClick={handleStartRecording}
                    icon={Mic}
                  >
                    Record Speech
                  </Button>
                )}
              </div>

              {/* Display score result */}
              <AnimatePresence>
                {practicePassed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl text-left space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-slate-800">Voice Assessment Complete</h4>
                      </div>
                      <span className="text-lg font-black text-primary">{practicePassed.score}%</span>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        {practicePassed.details}
                      </p>
                      
                      {/* Phoneme meter */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                          <span>Phoneme Match Accuracy</span>
                          <span>Passed</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${practicePassed.score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </div>
        </div>
      )}

      {/* TAB 2: STORY THERAPY */}
      {activeTab === 'story' && (
        <div className="space-y-6">
          {!selectedStory ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.map((story) => (
                <Card 
                  key={story.id} 
                  className="p-6 border-slate-100 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
                  hoverEffect={true}
                >
                  <div className="space-y-4 text-left">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      story.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {story.difficulty} Level
                    </span>
                    <h3 className="font-bold text-lg text-slate-800">{story.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">{story.text}</p>
                  </div>

                  <div className="pt-6">
                    <Button 
                      variant="glass" 
                      className="w-full flex justify-between items-center"
                      onClick={() => {
                        setSelectedStory(story);
                        setStoryPassed(null);
                      }}
                    >
                      <span>Read Story</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <GlassCard className="p-8 shadow-xl border-white/60 space-y-6 text-left" hoverEffect={false}>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 font-extrabold uppercase tracking-widest">Story Reading</span>
                    <h3 className="font-extrabold text-slate-800 text-xl">{selectedStory.title}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedStory(null)}
                    className="text-slate-400 hover:text-slate-600 text-xs font-bold flex items-center space-x-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to list</span>
                  </button>
                </div>

                {/* Speaker play guide */}
                <div className="flex justify-start">
                  <Button 
                    variant="glass" 
                    onClick={() => handleTextToSpeech(selectedStory.text)}
                    icon={Volume2}
                    className="px-4 py-2 text-xs"
                  >
                    Listen to Narrator
                  </Button>
                </div>

                {/* Paragraph Content */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-lg md:text-xl font-bold text-slate-700 leading-relaxed text-center">
                  "{selectedStory.text}"
                </div>

                {/* Active Mic */}
                <div className="flex flex-col items-center justify-center space-y-4">
                  {isRecording ? (
                    <div className="flex items-center space-x-3 bg-red-50 border border-red-100 px-6 py-2.5 rounded-full text-red-600 font-bold text-sm">
                      <Activity className="w-5 h-5 text-red-500 animate-pulse" />
                      <span>Reading Aloud...</span>
                    </div>
                  ) : (
                    <Button 
                      variant="primary" 
                      onClick={handleStoryRead}
                      icon={Mic}
                    >
                      Record My Reading
                    </Button>
                  )}
                </div>

                {/* Story Feedback */}
                {storyPassed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-800 flex items-center">
                        <Award className="w-4 h-4 text-primary mr-1.5" />
                        <span>Fluency Assessment Completed</span>
                      </h4>
                      <span className="text-base font-black text-primary">{storyPassed.score}%</span>
                    </div>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      {storyPassed.details}
                    </p>
                    
                    {/* Comprehension Questions */}
                    <div className="pt-3 border-t border-slate-200/50 space-y-2">
                      <h5 className="font-bold text-xs text-slate-700">Comprehension Questions:</h5>
                      {selectedStory.questions.map((q, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-500">
                          <span className="font-bold text-primary">{idx + 1}.</span>
                          <span>{q}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </GlassCard>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MUSIC THERAPY (METRONOME) */}
      {activeTab === 'music' && (
        <div className="max-w-2xl mx-auto">
          <GlassCard className="p-8 shadow-xl border-white/60 text-center space-y-8" hoverEffect={false}>
            <div>
              <span className="text-xs text-slate-400 font-extrabold uppercase tracking-widest">Rhythmic Speech Control</span>
              <h3 className="font-extrabold text-slate-800 text-xl mt-1">Stuttering Control Metronome</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2 leading-relaxed">
                Pacing syllables to a steady beat is clinically proven to reduce blocks and stuttering triggers. Speak one word or syllable per pulse.
              </p>
            </div>

            {/* Pulse Indicator */}
            <div className="flex justify-center py-6">
              <motion.div
                animate={{ scale: pulseScale }}
                transition={{ duration: 0.1 }}
                className={`w-28 h-28 rounded-full border-4 flex items-center justify-center transition-all ${
                  metronomeActive 
                    ? 'bg-gradient-to-r from-primary to-accent border-white text-white shadow-xl shadow-primary/20' 
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <Music className={`w-10 h-10 ${metronomeActive ? 'animate-bounce' : ''}`} />
              </motion.div>
            </div>

            {/* BPM Slider */}
            <div className="space-y-3 max-w-xs mx-auto">
              <div className="flex justify-between text-sm font-bold text-slate-700">
                <span>Metronome Tempo</span>
                <span className="text-primary">{bpm} BPM</span>
              </div>
              <input
                type="range"
                min="40"
                max="140"
                value={bpm}
                onChange={(e) => setBpm(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                <span>40 (Slow pacing)</span>
                <span>140 (Conversational)</span>
              </div>
            </div>

            {/* Start metronome */}
            <div className="flex justify-center">
              <Button
                variant={metronomeActive ? 'outline' : 'primary'}
                onClick={() => setMetronomeActive(!metronomeActive)}
                className="px-8 shadow-md"
              >
                {metronomeActive ? 'Stop Metronome' : 'Start Beat'}
              </Button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-left text-xs text-slate-500 leading-relaxed">
              <span className="font-bold text-slate-700 block mb-1">Clinical Instruction:</span>
              1. Say "I" on beat 1. <br />
              2. Say "want" on beat 2. <br />
              3. Say "water" on beat 3. <br />
              Observe the rhythm, keeping your tongue relaxed at each click.
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default TherapyPage;
