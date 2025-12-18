
import React, { useState } from 'react';
import { Bot, Sparkles, Send, Loader2, Anchor } from 'lucide-react';
import { getCareerAdvice } from '../services/geminiService';

const CareerAdvisor: React.FC = () => {
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConsult = async () => {
    if (!skills || !interests) return;
    setLoading(true);
    const result = await getCareerAdvice(skills.split(','), interests);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="bg-navy-deep rounded-2xl border border-gold/20 overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-navy-dark to-navy-deep p-8 border-b border-white/10 flex items-center gap-4">
        <div className="p-3 bg-gold/10 rounded-xl border border-gold/20">
          <Bot className="w-8 h-8 text-gold" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Admiralty AI Career Advisor</h2>
          <p className="text-gray-400 text-sm">Let our artificial intelligence find your perfect fit in the fleet.</p>
        </div>
      </div>

      <div className="p-8">
        {!advice ? (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gold uppercase tracking-widest mb-2">What are your technical skills?</label>
              <input 
                placeholder="e.g. Mechanical engineering, first aid, radio operations..."
                className="w-full bg-navy-dark border border-white/10 rounded-xl px-4 py-4 focus:border-gold outline-none text-white"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gold uppercase tracking-widest mb-2">What interests you most about naval service?</label>
              <textarea 
                placeholder="e.g. Travel, protecting the seas, learning advanced technology..."
                rows={4}
                className="w-full bg-navy-dark border border-white/10 rounded-xl px-4 py-4 focus:border-gold outline-none text-white resize-none"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
            <button 
              onClick={handleConsult}
              disabled={loading || !skills || !interests}
              className="w-full bg-gold text-navy-dark font-black py-4 rounded-xl hover:bg-yellow-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-lg uppercase tracking-widest"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  CONSULTING ADMIRALTY AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  ANALYZE MY POTENTIAL
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="bg-navy-dark p-6 rounded-xl border border-gold/20 mb-8 leading-relaxed text-gray-300">
               {advice.split('\n').map((line, i) => (
                 <p key={i} className="mb-2">{line}</p>
               ))}
            </div>
            <button 
              onClick={() => { setAdvice(null); setSkills(''); setInterests(''); }}
              className="text-gold font-bold flex items-center gap-2 hover:underline"
            >
              <Anchor className="w-4 h-4" /> Start New Consultation
            </button>
          </div>
        )}
      </div>

      <div className="bg-navy-dark p-4 text-center">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest">
          Secured Admiralty AI Connection // Encrypted Session: ACTIVE
        </p>
      </div>
    </div>
  );
};

export default CareerAdvisor;
