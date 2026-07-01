import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Play, Award, CheckCircle, Star, MessageSquare, 
  Sparkles, ShieldCheck, HeartHandshake, Compass, Brain, 
  HelpCircle, UserCheck, Stethoscope, Video, Mail, Phone, MapPin, Check
} from 'lucide-react';
import Navbar from '../components/Landing/Navbar';
import Footer from '../components/Landing/Footer';
import Button from '../components/UI/Button';
import { Card, GlassCard } from '../components/UI/Card';
import Accordion from '../components/UI/Accordion';
import { HeroIllustration, AboutIllustration, BenefitsIllustration } from '../components/UI/Illustrations';

const LandingPage = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email) {
      setFormSubmitted(true);
      setContactForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  const aboutCards = [
    { 
      icon: ShieldCheck, 
      color: 'text-primary', 
      bg: 'bg-blue-50', 
      title: 'Early Screening', 
      desc: 'Identify communication challenges early using our advanced, non-diagnostic AI screening questionnaires.' 
    },
    { 
      icon: Sparkles, 
      color: 'text-secondary', 
      bg: 'bg-teal-50', 
      title: 'Personalized AI Therapy', 
      desc: 'Adaptive pathways tailored specifically for Autism, Aphasia, DLD, and Social Communication needs.' 
    },
    { 
      icon: HeartHandshake, 
      color: 'text-accent', 
      bg: 'bg-purple-50', 
      title: 'Affordable Healthcare', 
      desc: 'Premium speech therapy access at a fraction of standard clinical costs, putting support in reach.' 
    },
    { 
      icon: Compass, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50/50', 
      title: 'Accessible Anywhere', 
      desc: 'Perform activities, build speech skills, and connect with therapists directly from your browser.' 
    },
    { 
      icon: MessageSquare, 
      color: 'text-teal-600', 
      bg: 'bg-teal-50/50', 
      title: '24/7 Support', 
      desc: 'Immediate access to the AAC speech board and AI practice companion whenever inspiration strikes.' 
    }
  ];

  const features = [
    { 
      icon: Brain, 
      title: 'AI Assessment', 
      desc: 'Take tailored screening tests for Autism, Aphasia, and DLD. Receive a comprehensive risk report instantly.' 
    },
    { 
      icon: Sparkles, 
      title: 'AI Therapy Companion', 
      desc: 'Practice vocabulary with interactive exercises. Speak aloud and receive real-time pronunciation scoring.' 
    },
    { 
      icon: MessageSquare, 
      title: 'AAC Communication Board', 
      desc: 'A robust Picture Communication Board with browser-enabled Speech Synthesis for non-verbal expression.' 
    },
    { 
      icon: Award, 
      title: 'Pronunciation Practice', 
      desc: 'Targeted articulation phoneme coaching, helping users practice vowels and consonants with visual cues.' 
    },
    { 
      icon: UserCheck, 
      title: 'Story Therapy', 
      desc: 'Build narrative comprehension and social communication skills using engaging visual storytelling.' 
    },
    { 
      icon: Stethoscope, 
      title: 'Music Therapy', 
      desc: 'Leverage rhythm and auditory pacing to overcome stuttering, apraxia, and language initiation blocks.' 
    },
    { 
      icon: CheckCircle, 
      title: 'Progress Tracking', 
      desc: 'Detailed dashboard with streak metrics, completed therapy minutes, and milestone analytics.' 
    },
    { 
      icon: HeartHandshake, 
      title: 'Caregiver Support', 
      desc: 'Access downloadable guides, activities, and progress reporting to assist your loved ones at home.' 
    }
  ];

  const timelineSteps = [
    { number: '1', title: 'Register Account', desc: 'Sign up as a Patient, Caregiver, or Therapist to set up your custom voice profile.' },
    { number: '2', title: 'Take AI Assessment', desc: 'Complete clinical-grade screening questionnaires to identify speech strengths and gaps.' },
    { number: '3', title: 'Get Adaptive Plan', desc: 'Our AI engine compiles dynamic speech, story, and articulation exercises.' },
    { number: '4', title: 'Practice Daily', desc: 'Devote 10 minutes a day to pronunciation challenges and communication board assembly.' },
    { number: '5', title: 'Track Milestones', desc: 'Review speech score enhancements, streak meters, and diagnostic trends.' },
    { number: '6', title: 'Consult Therapist', desc: 'Seamlessly schedule tele-practice video calls and share your AI transcripts with professionals.' }
  ];

  const benefitsList = [
    'Improve articulation and speech clarity in weeks',
    'Increase conversational confidence and reduce anxiety',
    'Reduce annual speech therapy expenses by up to 80%',
    'Exercise speech muscles and practice speech anywhere, anytime',
    'Full support for multi-language speech assessment',
    'Daily reporting keep parents and therapists fully aligned'
  ];

  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Mother of Leo (Age 7, Autism)',
      quote: 'Silent Communicator changed how Leo connects with us. The AAC communication board helped him state his needs without tantrums. He loves the daily streaks!',
      avatar: '👩',
      rating: 5
    },
    {
      name: 'Dr. Robert Chen, SLP',
      role: 'Clinical Speech-Language Pathologist',
      quote: 'As a therapist, I find this platform invaluable. My patients practice pronunciation at home, and I can review their automated scores during our check-ins. Highly recommended.',
      avatar: '👨‍⚕️',
      rating: 5
    },
    {
      name: 'Marcus Vance',
      role: 'Stroke Survivor (Recovering from Aphasia)',
      quote: 'After my stroke, words felt trapped. The AI pronunciation suite is like a patient tutor that never tires. My speech clarity has improved from 40% to over 80%.',
      avatar: '👨',
      rating: 5
    }
  ];

  const faqItems = [
    {
      question: 'How does the AI speech screening work?',
      answer: 'Our screening uses researched clinical questionnaires for Autism, Aphasia, and DLD. It evaluates social communication markers and language patterns to deliver a detailed risk level report, complete with advice for consulting a speech-language pathologist (SLP).'
    },
    {
      question: 'What is an AAC Communication Board?',
      answer: 'Augmentative and Alternative Communication (AAC) boards allow non-verbal users to construct sentences by clicking picture cards (representing needs, foods, emotions). Silent Communicator uses the browser Speech Synthesis API to read the assembled sentence aloud.'
    },
    {
      question: 'Can this replace traditional speech therapy?',
      answer: 'Silent Communicator is designed to augment traditional speech therapy by providing accessible, low-cost home practice. It enables continuous care between sessions and can act as a primary tool for those awaiting clinical appointments.'
    },
    {
      question: 'How is pricing structured?',
      answer: 'We offer free basic access to the AAC board and initial screening. Premium subscriptions grant unlimited access to the AI pronunciation engine, story therapy, and data sync with licensed speech therapists.'
    },
    {
      question: 'Are my voice recordings secure?',
      answer: 'Absolutely. Silent Communicator adheres to HIPAA standards. We process speech directly in the browser using secure, private protocols to ensure patient confidentiality.'
    }
  ];

  return (
    <div className="bg-white min-h-screen relative">
      <Navbar />

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-premium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs text-primary font-bold"
              >
                <Sparkles className="w-4 h-4 text-accent animate-spin" style={{ animationDuration: '3s' }} />
                <span>Empowering Every Voice Through AI</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight"
              >
                Helping Every Voice <br />
                <span className="text-gradient">Be Heard</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-slate-500 max-w-xl leading-relaxed"
              >
                An AI-powered speech therapy platform helping children and adults with Autism, Aphasia, DLD, and Social Communication Disorder improve communication through personalized, clinical-grade home exercises.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/register">
                  <Button variant="primary" className="shadow-lg">
                    Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => setVideoModalOpen(true)}
                  icon={Play}
                >
                  Watch Demo
                </Button>
              </motion.div>

              {/* Statistics Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-100"
              >
                {[
                  { value: '1.3B+', label: 'Need Support' },
                  { value: '95%', label: 'Daily Completion' },
                  { value: '500+', label: 'Therapists' },
                  { value: '10K+', label: 'Activities' },
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <span className="block text-2xl md:text-3xl font-extrabold text-slate-900">{stat.value}</span>
                    <span className="block text-xs text-slate-400 font-semibold uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <HeroIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Why Silent Communicator?</h2>
            <p className="text-slate-500 text-base md:text-lg">
              We bridge the gap between expensive speech clinics and everyday communication needs, providing modern tools to support speech progress.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Graphic */}
            <div className="lg:col-span-5">
              <AboutIllustration />
            </div>

            {/* Right Side Cards */}
            <div className="lg:col-span-7 space-y-5">
              {aboutCards.map((card, i) => {
                const IconComponent = card.icon;
                return (
                  <Card key={i} className="flex gap-5 items-start p-5 text-left border border-slate-50">
                    <div className={`p-3 rounded-xl shrink-0 ${card.bg}`}>
                      <IconComponent className={`w-6 h-6 ${card.color}`} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg text-slate-800">{card.title}</h3>
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed">{card.desc}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 bg-slate-50/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Comprehensive Therapy Tools</h2>
            <p className="text-slate-500 text-base md:text-lg">
              Explore custom clinical features built in partnership with pediatric speech experts and neurologists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, i) => {
              const IconComponent = feat.icon;
              return (
                <div key={i} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-secondary rounded-premium opacity-0 group-hover:opacity-100 transition duration-300 blur-sm"></div>
                  <div className="relative bg-white rounded-premium p-6 h-full flex flex-col justify-between border border-slate-100/80 shadow-premium transition duration-300 text-left">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-primary group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:text-white transition-all duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-800">{feat.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">How It Works</h2>
            <p className="text-slate-500 text-base md:text-lg">
              Get started with our speech therapy pathway in six simple, clinical-aligned steps.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="relative">
            {/* Timeline center line */}
            <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-primary via-accent to-secondary transform -translate-x-1/2 opacity-20" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-16 relative">
              {timelineSteps.map((step, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div key={i} className={`flex flex-col ${isEven ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'} text-left space-y-4 relative`}>
                    {/* Circle Pin indicator on center line */}
                    <div className="hidden lg:flex absolute top-2 w-8 h-8 rounded-full bg-white border-4 border-primary items-center justify-center font-bold text-sm text-slate-800 shadow-md"
                         style={{ 
                           left: isEven ? 'calc(100% + 20px)' : '-44px',
                         }}
                    >
                      {step.number}
                    </div>

                    <div className="w-full max-w-md p-6 bg-slate-50 rounded-premium border border-slate-100 hover:shadow-md transition-all duration-300">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-primary font-bold mb-4 lg:hidden">
                        {step.number}
                      </span>
                      <h3 className="font-bold text-lg text-slate-800 mb-2">{step.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section id="benefits" className="py-24 bg-slate-50/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                Designed to Support Development & Recovery
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                By offering daily accessible voice and communication tracking, we lower thresholds, help increase confidence, and ease the burden of traditional therapeutic costs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefitsList.map((benefit, i) => (
                  <div key={i} className="flex items-center space-x-3 text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-secondary stroke-[3]" />
                    </div>
                    <span className="text-sm font-semibold">{benefit}</span>
                  </div>
                ))}
              </div>

              <div>
                <Link to="/register">
                  <Button variant="secondary" className="shadow-lg">
                    Start AI Assessment
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="lg:col-span-5">
              <BenefitsIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Success Stories</h2>
            <p className="text-slate-500 text-base md:text-lg">
              Hear from our clinical partners, parents, and patient community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <GlassCard key={i} className="text-left flex flex-col justify-between p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(test.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed italic">
                    "{test.quote}"
                  </p>
                </div>
                
                <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-slate-100/50">
                  <span className="text-3xl bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    {test.avatar}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{test.name}</h4>
                    <span className="text-xs text-slate-400 font-semibold">{test.role}</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 bg-slate-50/50 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-base md:text-lg">
              Got questions? We have answers to help you navigate your journey.
            </p>
          </div>

          <Accordion items={faqItems} />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details */}
            <div className="lg:col-span-5 text-left space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">Get In Touch</h2>
                <p className="text-slate-500 text-sm md:text-base mt-3 leading-relaxed">
                  Have questions about integrating Silent Communicator into your clinic or hospital? We are here to support your team.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email Support', detail: 'support@silentcommunicator.com' },
                  { icon: Phone, label: 'Phone Line', detail: '+1 (555) 304-9283' },
                  { icon: MapPin, label: 'Clinical HQ', detail: '100 Medical Plaza, Suite 400, San Francisco, CA' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start space-x-4">
                      <div className="p-3 rounded-xl bg-blue-50 text-primary">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">{item.label}</h4>
                        <span className="text-slate-500 text-sm">{item.detail}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="glass-card rounded-premium p-8 shadow-glass border border-white/50 text-left">
                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center text-secondary border border-teal-100">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl text-slate-800">Message Received!</h3>
                    <p className="text-slate-500 text-sm max-w-sm">
                      Thank you for contacting us. A clinical representative will review your inquiry and follow up within 24 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Name</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Email Address</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Phone Number (Optional)</label>
                      <input
                        type="text"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Inquiry / Message</label>
                      <textarea
                        required
                        rows="4"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <Button type="submit" variant="primary" className="w-full">
                      Send Secure Message
                    </Button>
                  </form>
                )}

                {/* Google Map Placeholder */}
                <div className="mt-8 relative h-48 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <MapPin className="w-8 h-8 text-primary mb-2 animate-bounce" />
                    <span className="font-bold text-sm text-slate-800">HQ Location Map</span>
                    <span className="text-xs text-slate-400">Google Maps Platform Placeholder</span>
                  </div>
                  {/* Styled mock grid representing map */}
                  <div className="w-full h-full opacity-10 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:16px_16px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO DEMO MODAL */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-3xl bg-white rounded-premium overflow-hidden shadow-2xl border border-slate-200"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg">Silent Communicator Clinical Overview</h3>
              <button 
                onClick={() => setVideoModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>
            {/* Simulated premium medical video */}
            <div className="aspect-video bg-slate-950 flex flex-col items-center justify-center text-slate-200 p-6 relative">
              <Video className="w-16 h-16 text-primary mb-4 animate-pulse" />
              <span className="font-bold text-lg text-white">Silent Communicator System Tour</span>
              <span className="text-sm text-slate-400 mt-1 max-w-md text-center">
                This simulated video tour details voice synthesis, screen articulation calibration, and SLP telehealth synchronization tools.
              </span>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-500">
                <span>0:00 / 2:30</span>
                <span>HD 1080p</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default LandingPage;
