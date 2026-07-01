import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardCheck, ArrowRight, ArrowLeft, ShieldAlert, CheckCircle, 
  HelpCircle, AlertCircle, Calendar, Download, RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card, GlassCard } from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const AssessmentPage = () => {
  const { addAssessmentResult, progress } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null); // 'Autism', 'Aphasia', 'DLD', 'Social'
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [responses, setResponses] = useState({}); // { questionId: value }
  const [assessmentResult, setAssessmentResult] = useState(null);

  const categories = [
    {
      id: 'Autism',
      title: 'Autism Spectrum (M-CHAT based)',
      desc: 'Assesses speech articulation delays, repetitive vocal patterns, and social communication preferences.',
      icon: '🧠',
      questions: [
        { id: 1, text: 'Does your child/loved one make eye contact when communicating needs?' },
        { id: 2, text: 'Do they respond when their name is called, or do they appear deaf?' },
        { id: 3, text: 'Do they use gestures (e.g. pointing, waving) to represent words or requests?' },
        { id: 4, text: 'Do they repeat phrases exactly as heard (echolalia) instead of responding naturally?' },
        { id: 5, text: 'Do they show unusual interest in toys or objects (e.g. spinning wheel) instead of social play?' }
      ]
    },
    {
      id: 'Aphasia',
      title: 'Aphasia (Stroke/Injury Recovery)',
      desc: 'Evaluates word-finding blocks, speech hesitation, and language compression issues.',
      icon: '🗣️',
      questions: [
        { id: 1, text: 'Do you experience word-finding difficulties (e.g. knowing what you want to say but can\'t find the word)?' },
        { id: 2, text: 'Do you swap syllables or use incorrect words in sentences (e.g. saying "table" instead of "chair")?' },
        { id: 3, text: 'Is your speech effortful, halting, or limited to short 2-3 word phrases?' },
        { id: 4, text: 'Do you find it difficult to follow multi-step spoken instructions from others?' },
        { id: 5, text: 'Is reading comprehension or writing sentences significantly harder than before?' }
      ]
    },
    {
      id: 'DLD',
      title: 'Developmental Language Disorder (DLD)',
      desc: 'Screening for grammar acquisition difficulties and vocabulary construction barriers in youth.',
      icon: '🏫',
      questions: [
        { id: 1, text: 'Does the child struggle to construct grammatically correct sentences?' },
        { id: 2, text: 'Is their vocabulary smaller than peers of the same age?' },
        { id: 3, text: 'Do they find it hard to retell a simple story or describe an event?' },
        { id: 4, text: 'Do they have trouble understanding abstract words or figurative language?' },
        { id: 5, text: 'Do they make persistent errors with pronouns (e.g. mixing "he" and "she")?' }
      ]
    },
    {
      id: 'Social',
      title: 'Social Communication Disorder',
      desc: 'Screens for pragmatic language challenges, conversational pacing, and body language cues.',
      icon: '💬',
      questions: [
        { id: 1, text: 'Do you/they struggle to take turns during conversation, frequently interrupting others?' },
        { id: 2, text: 'Do you find it hard to understand jokes, sarcasm, or double meanings?' },
        { id: 3, text: 'Do you have difficulty adjusting your tone of voice depending on the listener?' },
        { id: 4, text: 'Do you struggle to read other people\'s facial expressions or body language?' },
        { id: 5, text: 'Do you find initiating conversations with new people highly stressful or exhausting?' }
      ]
    }
  ];

  const currentCategoryObj = categories.find(c => c.id === selectedCategory);
  const currentQuestions = currentCategoryObj ? currentCategoryObj.questions : [];

  const handleStart = (id) => {
    setSelectedCategory(id);
    setCurrentQuestionIdx(0);
    setResponses({});
    setAssessmentResult(null);
  };

  const handleAnswer = (value) => {
    const questionId = currentQuestions[currentQuestionIdx].id;
    setResponses(prev => ({ ...prev, [questionId]: value }));

    if (currentQuestionIdx < currentQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Score computation
    // Options: Never (0), Sometimes (1), Often (2), Always (3)
    const values = Object.values(responses);
    const totalScore = values.reduce((sum, val) => sum + val, 0);
    const maxScore = currentQuestions.length * 3;
    const ratio = totalScore / maxScore;

    let riskLevel = 'Low';
    let recommendation = '';
    
    if (ratio > 0.6) {
      riskLevel = 'High Risk';
      recommendation = 'Strongly recommend scheduling an evaluation with a licensed Speech-Language Pathologist (SLP). Daily practice in our AI Therapy suite is recommended to prepare.';
    } else if (ratio > 0.3) {
      riskLevel = 'Moderate Risk';
      recommendation = 'Suggest consulting with a speech professional. Engage in daily AI story therapy and pronunciation activities to support growth.';
    } else {
      riskLevel = 'Low Risk';
      recommendation = 'Your scores suggest standard developmental ranges. We recommend using the AAC Communication Board and occasional vocal exercises for maintenance.';
    }

    const scoreDetails = {
      score: totalScore,
      maxScore,
      percentage: Math.round(ratio * 100)
    };

    // Save result to Context
    addAssessmentResult(currentCategoryObj.title, responses, riskLevel, scoreDetails);

    setAssessmentResult({
      category: currentCategoryObj.title,
      riskLevel,
      score: totalScore,
      maxScore,
      percentage: Math.round(ratio * 100),
      recommendation
    });
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setCurrentQuestionIdx(0);
    setResponses({});
    setAssessmentResult(null);
  };

  const options = [
    { label: 'Never / Not At All', value: 0 },
    { label: 'Sometimes / Mildly', value: 1 },
    { label: 'Often / Frequently', value: 2 },
    { label: 'Always / Severely', value: 3 }
  ];

  return (
    <div className="space-y-8 text-left">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Screening Center</h2>
        <p className="text-slate-500 text-sm mt-1">Clinical questionnaire sets designed to identify communication risks and guide therapeutic focus.</p>
      </div>

      <AnimatePresence mode="wait">
        
        {/* VIEW 1: SELECT CATEGORY */}
        {!selectedCategory && (
          <motion.div
            key="categorySelect"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat) => (
                <Card 
                  key={cat.id} 
                  className="p-6 border-slate-100 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
                  hoverEffect={true}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">{cat.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mt-1">{cat.desc}</p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button 
                      variant="glass" 
                      className="w-full flex justify-between items-center"
                      onClick={() => handleStart(cat.id)}
                    >
                      <span>Begin Questionnaire</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Assessment History */}
            {progress.assessments.length > 0 && (
              <Card className="border-slate-100" hoverEffect={false}>
                <h3 className="font-bold text-slate-800 text-base mb-4">Past Assessment Reports</h3>
                <div className="divide-y divide-slate-100">
                  {progress.assessments.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0 text-sm">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">📋</span>
                        <div>
                          <h4 className="font-bold text-slate-800">{item.type}</h4>
                          <span className="text-xs text-slate-400 font-semibold">{item.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          item.riskLevel.includes('High') ? 'bg-red-50 text-red-600 border border-red-100' :
                          item.riskLevel.includes('Mod') ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          'bg-green-50 text-green-600 border border-green-100'
                        }`}>
                          {item.riskLevel}
                        </span>
                        <span className="text-slate-500 font-bold">{item.scoreDetails.percentage}% Score</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </motion.div>
        )}

        {/* VIEW 2: ACTIVE QUESTIONNAIRE */}
        {selectedCategory && !assessmentResult && (
          <motion.div
            key="questionnaire"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-2xl mx-auto"
          >
            <GlassCard className="p-8 shadow-xl border-white/60 text-left" hoverEffect={false}>
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-xs text-slate-400 font-extrabold uppercase tracking-widest">Active Screening</span>
                  <h3 className="font-extrabold text-slate-800 text-lg">{currentCategoryObj.title}</h3>
                </div>
                <button 
                  onClick={handleReset}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Quit</span>
                </button>
              </div>

              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-slate-400 font-bold mb-2">
                  <span>Question {currentQuestionIdx + 1} of {currentQuestions.length}</span>
                  <span>{Math.round(((currentQuestionIdx + 1) / currentQuestions.length) * 100)}% Complete</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / currentQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-8 min-h-[80px]">
                <h4 className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed">
                  {currentQuestions[currentQuestionIdx].text}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-left p-4 border border-slate-200 hover:border-primary hover:bg-blue-50/20 rounded-xl transition duration-200 text-sm font-semibold text-slate-700 focus:outline-none"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentQuestionIdx === 0}
                >
                  Previous
                </Button>

                {currentQuestionIdx === currentQuestions.length - 1 && (
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={Object.keys(responses).length !== currentQuestions.length}
                  >
                    Submit Assessment
                  </Button>
                )}
              </div>

            </GlassCard>
          </motion.div>
        )}

        {/* VIEW 3: RESULTS REPORT */}
        {assessmentResult && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto"
          >
            <GlassCard className="p-8 shadow-xl border-white/60 space-y-6" hoverEffect={false}>
              
              {/* Check Header */}
              <div className="flex flex-col items-center justify-center text-center space-y-3 pb-6 border-b border-slate-100">
                <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-secondary">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-extrabold uppercase tracking-widest">Report Generated</span>
                  <h3 className="font-extrabold text-slate-800 text-2xl">{assessmentResult.category}</h3>
                </div>
              </div>

              {/* Risk Level Badge */}
              <div className="grid grid-cols-2 gap-4 items-center bg-slate-50 p-4.5 rounded-xl border border-slate-100/50">
                <div className="text-left">
                  <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Computed Risk Level</span>
                  <span className={`text-xl font-black mt-1 inline-block ${
                    assessmentResult.riskLevel.includes('High') ? 'text-red-600' :
                    assessmentResult.riskLevel.includes('Mod') ? 'text-amber-600' :
                    'text-green-600'
                  }`}>
                    {assessmentResult.riskLevel}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Response Ratio</span>
                  <span className="text-xl font-black text-slate-800 mt-1 inline-block">{assessmentResult.percentage}% Score</span>
                </div>
              </div>

              {/* Clinical recommendations */}
              <div className="text-left space-y-2">
                <h4 className="font-bold text-sm text-slate-800">Therapy Recommendations</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{assessmentResult.recommendation}</p>
              </div>

              {/* Interactive buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/dashboard/therapist" className="flex-grow">
                  <Button variant="primary" className="w-full">
                    Schedule SLP Consultation
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => alert("Simulating Report PDF Download... Completed!")}
                  icon={Download}
                >
                  Download Report PDF
                </Button>
                <Button 
                  variant="glass" 
                  onClick={handleReset}
                  icon={RefreshCw}
                >
                  Retake Test
                </Button>
              </div>

              {/* WARNING MEDICAL DISCLAIMER */}
              <div className="p-4 bg-red-50/50 border border-red-100 rounded-xl flex items-start space-x-3 text-left">
                <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-xs text-red-700">Important Medical Disclaimer</h4>
                  <p className="text-[11px] text-red-600 leading-relaxed">
                    This screening tool uses questionnaires to evaluate speech patterns. It is **not** a clinical diagnostic instrument. Only a licensed Speech-Language Pathologist (SLP) or medical doctor can provide an official medical diagnosis.
                  </p>
                </div>
              </div>

            </GlassCard>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default AssessmentPage;
