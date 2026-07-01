import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, Send, Calendar, Clock, Star, MessageSquare, 
  Video, CheckCircle, Check, ArrowRight, UserCheck
} from 'lucide-react';
import { Card, GlassCard } from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const TherapistPage = () => {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Chat simulator state
  const [activeChatTherapist, setActiveChatTherapist] = useState(1); // Default Dr. Robert
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState({
    1: [
      { sender: 'therapist', text: 'Hi! I reviewed your articulation transcripts from yesterday. Outstanding job on the "Apple" pronunciations.', time: '10:00 AM' },
      { sender: 'user', text: 'Thank you, Dr. Chen. I am still struggling with the letter "R" in sentences.', time: '10:02 AM' },
      { sender: 'therapist', text: 'That is completely normal. Keep practicing on the music pacing metronome at 60 BPM. We will adjust it tomorrow.', time: '10:03 AM' }
    ],
    2: [
      { sender: 'therapist', text: 'Hello! Let\'s make sure Leo completes his story therapy daily. Routine is key for Autism speech growth.', time: 'Yesterday' }
    ],
    3: [
      { sender: 'therapist', text: 'Hi! DLD screening results showed moderate risk. Let\'s schedule an intake conversation next Tuesday.', time: '2 days ago' }
    ]
  });

  const therapists = [
    { id: 1, name: 'Dr. Robert Chen, SLP', avatar: '👨‍⚕️', rating: 4.9, reviews: 112, specialty: 'Aphasia & Stuttering Rehab', cost: '$60/session', availability: 'Available Tomorrow' },
    { id: 2, name: 'Dr. Clara Vance, MS-SLP', avatar: '👩‍⚕️', rating: 4.8, reviews: 98, specialty: 'Pediatric Autism Speech', cost: '$65/session', availability: 'Available Friday' },
    { id: 3, name: 'Dr. Marcus Lee, PhD', avatar: '👨‍⚕️', rating: 4.9, reviews: 86, specialty: 'DLD & Grammar Development', cost: '$70/session', availability: 'Available Monday' }
  ];

  const handleBookSession = (e) => {
    e.preventDefault();
    if (bookingDate && bookingTime && selectedTherapist) {
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setSelectedTherapist(null);
        setBookingDate('');
        setBookingTime('');
      }, 5000);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      sender: 'user',
      text: chatInput,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    // Update messages
    setMessages(prev => ({
      ...prev,
      [activeChatTherapist]: [...prev[activeChatTherapist], userMsg]
    }));

    const query = chatInput.toLowerCase();
    setChatInput('');
    setIsTyping(true);

    // Simulated doctor response after 1.5 seconds
    setTimeout(() => {
      let docText = 'I have received your message. Let\'s make sure to review this during our next video consult.';
      if (query.includes('r sound') || query.includes('pronunciation')) {
        docText = 'For the "R" sound, focus on curling the tip of your tongue slightly backward, making sure it doesn\'t touch the roof of your mouth. Practice "Red wagon" five times.';
      } else if (query.includes('stutter') || query.includes('pacing')) {
        docText = 'If you feel a block, stop, take a slow breath, and use the metronome page to space the syllables evenly. Do not rush.';
      } else if (query.includes('schedule') || query.includes('book')) {
        docText = 'Please select a date and slot on our booking widget here, and it will automatically lock into my calendar.';
      }

      const docMsg = {
        sender: 'therapist',
        text: docText,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => ({
        ...prev,
        [activeChatTherapist]: [...prev[activeChatTherapist], docMsg]
      }));
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Therapist Telehealth Portal</h2>
        <p className="text-slate-500 text-sm mt-1">Book virtual consultations, match with clinicians, and securely text speech-language pathologists.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Therapist Directory & Booking */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-bold text-slate-700 text-base">Clinician Directory</h3>
          
          <div className="space-y-4">
            {therapists.map((therapist) => (
              <Card 
                key={therapist.id} 
                className={`p-5 border-slate-100 hover:border-primary/20 transition-all ${
                  selectedTherapist?.id === therapist.id ? 'border-primary ring-1 ring-primary bg-blue-50/20' : ''
                }`}
                hoverEffect={true}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center border border-slate-200 shrink-0">
                      {therapist.avatar}
                    </span>
                    <div>
                      <h4 className="font-bold text-base text-slate-800">{therapist.name}</h4>
                      <span className="text-xs text-slate-400 font-semibold">{therapist.specialty}</span>
                      <div className="flex items-center space-x-1.5 mt-1 text-xs text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{therapist.rating} ({therapist.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0">
                    <div className="text-left sm:text-right text-xs">
                      <span className="block text-slate-400 font-bold">{therapist.cost} / Session</span>
                      <span className="block text-teal-600 font-semibold">{therapist.availability}</span>
                    </div>
                    <Button 
                      variant="glass" 
                      className="px-4 py-2 text-xs"
                      onClick={() => {
                        setSelectedTherapist(therapist);
                        setBookingSuccess(false);
                      }}
                    >
                      Schedule Call
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Booking Modal / Section */}
          <AnimatePresence>
            {selectedTherapist && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <GlassCard className="p-6 shadow-xl border-white/60 text-left space-y-4" hoverEffect={false}>
                  {bookingSuccess ? (
                    <div className="flex flex-col items-center justify-center text-center py-6 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-secondary">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <h4 className="font-extrabold text-slate-800 text-lg">Booking Confirmed!</h4>
                      <p className="text-slate-500 text-xs max-w-sm">
                        Your session with **{selectedTherapist.name}** has been secured. A HIPAA video room link has been dispatched to your email.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleBookSession} className="space-y-4">
                      <h4 className="font-bold text-slate-800 text-sm flex items-center">
                        <Calendar className="w-4 h-4 text-primary mr-1.5" />
                        <span>Schedule Booking: {selectedTherapist.name}</span>
                      </h4>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Select Date</label>
                          <input
                            type="date"
                            required
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary transition"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Select Time</label>
                          <select
                            required
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary transition"
                          >
                            <option value="">Choose slot</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="1:00 PM">1:00 PM</option>
                            <option value="3:30 PM">3:30 PM</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit" variant="primary" className="flex-grow py-2.5 text-xs">
                          Confirm Secure Booking
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedTherapist(null)}
                          className="py-2.5 text-xs text-slate-500 border-slate-200"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  )}
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: SECURE CHAT BOX */}
        <div className="lg:col-span-5">
          <Card className="flex flex-col h-[550px] p-0 overflow-hidden border-slate-100 shadow-xl" hoverEffect={false}>
            {/* Chat header */}
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl w-9 h-9 rounded-full bg-white flex items-center justify-center border border-slate-200 shrink-0">
                  {therapists.find(t => t.id === activeChatTherapist)?.avatar}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 leading-none">
                    {therapists.find(t => t.id === activeChatTherapist)?.name}
                  </h4>
                  <span className="text-[10px] text-teal-600 font-bold uppercase tracking-wider block mt-0.5">Online Clinician</span>
                </div>
              </div>

              {/* Therapist switcher inside chat header */}
              <select 
                value={activeChatTherapist} 
                onChange={(e) => setActiveChatTherapist(parseInt(e.target.value))}
                className="bg-white border border-slate-200 rounded-lg text-[10px] p-1 font-bold text-slate-600 focus:outline-none"
              >
                {therapists.map(t => (
                  <option key={t.id} value={t.id}>{t.name.split(',')[0]}</option>
                ))}
              </select>
            </div>

            {/* Chat thread */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-50/20">
              {messages[activeChatTherapist].map((msg, idx) => {
                const isUser = msg.sender === 'user';
                return (
                  <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      isUser 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm'
                    }`}>
                      <p>{msg.text}</p>
                      <span className={`block text-[9px] mt-1 text-right font-semibold ${isUser ? 'text-white/60' : 'text-slate-400'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 text-slate-400 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs shadow-sm flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Chat input form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 flex items-center space-x-2 bg-white">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about vocal exercises..."
                className="flex-grow bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary transition"
              />
              <button
                type="submit"
                className="p-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default TherapistPage;
