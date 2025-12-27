import React from 'react';
import { ViewMode } from '../types';
import { 
  ArrowRight, CheckCircle2, Smartphone, Monitor, PenTool, 
  BarChart3, Calendar, Zap, Shield, Crown 
} from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="bg-slate-950 min-h-full pb-12 animate-fade-in text-slate-100">
      {/* Hero Section */}
      <div className="relative bg-black overflow-hidden rounded-2xl shadow-2xl mb-12 border border-slate-900">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-fuchsia-600 rounded-full blur-[100px] opacity-20 -ml-20 -mb-20"></div>
        
        <div className="relative z-10 px-8 py-20 text-center max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 text-sm font-bold tracking-widest uppercase mb-6 shadow-glow">
            Own the Data. Win the Day.
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
            ME SUPREME
            <span className="block text-2xl md:text-3xl font-light text-slate-500 mt-4 font-serif italic">
              "It's not over until I win."
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Stop settling for "busy." Start demanding growth. This isn't just a tracker; it's your personal command center for engineering reality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onStart}
              className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] flex items-center justify-center gap-2 transform hover:-translate-y-1"
            >
              Start Command <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="mt-12 text-sm text-slate-600 font-mono uppercase tracking-widest">
             /// System Ready ///
          </div>
        </div>
      </div>

      {/* The Philosophy Grid */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Digital Column */}
          <div className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800 hover:border-cyan-500/50 transition-colors group">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-900/30">
              <Zap size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Raw Power of Data</h3>
            <p className="text-slate-400 mb-6">
              Track 99 habits with zero lag. Watch your life turn into a high-performance dashboard. If it isn't measured, it isn't managed.
            </p>
            <ul className="space-y-3">
              {[
                "God Mode: Focus on the non-negotiables",
                "Burn Rate: Visual warnings for stalled habits",
                "Live Analytics: XP & Leveling System",
                "Mobile Command Center"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 size={18} className="text-cyan-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Analog Column */}
          <div className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800 hover:border-fuchsia-500/50 transition-colors group">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-fuchsia-400 mb-6 group-hover:bg-fuchsia-900/30">
              <Shield size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">The Focus of a Warrior</h3>
            <p className="text-slate-400 mb-6">
              Put the phone away. Grab a pen. The "Me Supreme" PDF is where you look yourself in the eye and log the truth.
            </p>
            <ul className="space-y-3">
              {[
                "Daily Protocol check-offs",
                "Quantified Self: Screen Time logging",
                "Energy Level Charting (1-10)",
                "The War Chest: Evidence of greatness"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 size={18} className="text-fuchsia-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Built for the Relentless</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <Crown className="text-amber-400 mb-4" size={32} />
            <h4 className="font-bold text-lg mb-2 text-white">XP Leveling</h4>
            <p className="text-sm text-slate-400">Gamify your discipline. Move from Rookie to Supreme status based on raw consistency.</p>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <BarChart3 className="text-lime-400 mb-4" size={32} />
            <h4 className="font-bold text-lg mb-2 text-white">1% Better</h4>
            <p className="text-sm text-slate-400">Track your monthly improvement velocity. Small gains compound into massive wins.</p>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <Smartphone className="text-cyan-400 mb-4" size={32} />
            <h4 className="font-bold text-lg mb-2 text-white">Mobile Optimized</h4>
            <p className="text-sm text-slate-400">A slick, dark-mode interface designed for quick inputs in the chaos of daily life.</p>
          </div>
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="text-center py-12 border-t border-slate-900">
        <h2 className="text-2xl font-bold text-white mb-6">Ready to engineer your reality?</h2>
        <button 
          onClick={onStart}
          className="px-8 py-3 bg-cyan-600 text-white rounded-lg font-bold hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(8,145,178,0.5)]"
        >
          Launch Tracker
        </button>
        <div className="flex justify-center gap-6 mt-12 text-xs text-slate-600 font-mono">
          <span>CONTACT: gulshanitsyou@gmail.com</span>
          <span>PRIVACY_PROTOCOL</span>
          <span>TERMS_INIT</span>
        </div>
      </div>
    </div>
  );
};