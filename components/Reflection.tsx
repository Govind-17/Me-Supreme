import React, { useState } from 'react';
import { MOCK_REFLECTION } from '../constants';
import { ReflectionEntry } from '../types';
import { Save, Sun, Moon, Smartphone, Battery, Shield, Swords } from 'lucide-react';

export const Reflection: React.FC = () => {
  const [entry, setEntry] = useState<ReflectionEntry>(MOCK_REFLECTION);

  // Helper to handle nested state update
  const updateScreenTime = (period: keyof ReflectionEntry['screenTime'], value: string) => {
    const num = parseInt(value) || 0;
    setEntry(prev => ({
      ...prev,
      screenTime: { ...prev.screenTime, [period]: num }
    }));
  };

  const totalScreenTime = (Object.values(entry.screenTime) as number[]).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-100 font-serif italic">"It's not over until I win."</h2>
        <p className="text-slate-500">The War Room</p>
      </div>

      <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.5)]">
        
        {/* Date Header - Cyber Paper Style */}
        <div className="flex justify-between items-end border-b-2 border-slate-700 pb-4 mb-8">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Log Date</label>
            <input 
              type="date" 
              value={entry.date} 
              onChange={(e) => setEntry({...entry, date: e.target.value})}
              className="text-xl font-mono text-cyan-400 bg-transparent outline-none font-bold uppercase"
            />
          </div>
          <div className="text-right">
             <span className="text-sm font-serif italic text-slate-500">Day No.</span>
             <span className="ml-2 text-xl font-mono font-bold text-slate-100">284</span>
          </div>
        </div>

        {/* Quantified Self Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Screen Time Section */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-bold text-slate-300 uppercase tracking-wide border-b border-slate-800 pb-2">
              <Smartphone size={18} className="text-fuchsia-400" /> Screen Time (Mins)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                  <Sun size={12} className="text-amber-500" /> Morning
                </label>
                <input 
                  type="number" 
                  value={entry.screenTime.morning}
                  onChange={(e) => updateScreenTime('morning', e.target.value)}
                  className="w-full bg-transparent text-xl font-bold text-slate-200 outline-none"
                />
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                  <Sun size={12} className="text-orange-500" /> Day
                </label>
                <input 
                  type="number" 
                  value={entry.screenTime.day}
                  onChange={(e) => updateScreenTime('day', e.target.value)}
                  className="w-full bg-transparent text-xl font-bold text-slate-200 outline-none"
                />
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                  <Moon size={12} className="text-indigo-500" /> Evening
                </label>
                <input 
                  type="number" 
                  value={entry.screenTime.evening}
                  onChange={(e) => updateScreenTime('evening', e.target.value)}
                  className="w-full bg-transparent text-xl font-bold text-slate-200 outline-none"
                />
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                  <Moon size={12} className="text-slate-400" /> Night
                </label>
                <input 
                  type="number" 
                  value={entry.screenTime.night}
                  onChange={(e) => updateScreenTime('night', e.target.value)}
                  className="w-full bg-transparent text-xl font-bold text-slate-200 outline-none"
                />
              </div>
            </div>
            <div className="text-right text-xs font-mono text-slate-500">
              Total: {Math.floor(totalScreenTime / 60)}h {totalScreenTime % 60}m
            </div>
          </div>

          {/* Mood / Energy Chart Simulation */}
          <div className="space-y-4">
             <h3 className="flex items-center gap-2 font-bold text-slate-300 uppercase tracking-wide border-b border-slate-800 pb-2">
              <Battery size={18} className="text-lime-400" /> Energy Levels
            </h3>
            <div className="h-40 bg-slate-950 border border-slate-800 rounded-lg relative flex items-end justify-between px-4 pb-2 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              
              {/* Fake bars for visualization of manual entry */}
              {[4, 6, 5, 8, 7, 8, entry.moodScore].map((val, i) => (
                <div 
                  key={i} 
                  className={`w-6 rounded-t-sm transition-all duration-300 ${i === 6 ? 'bg-lime-500 shadow-[0_0_10px_rgba(132,204,22,0.5)]' : 'bg-slate-800'}`} 
                  style={{ height: `${val * 10}%`, opacity: i === 6 ? 1 : 0.5 }}
                ></div>
              ))}
              
              {/* Slider for today */}
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={entry.moodScore} 
                onChange={(e) => setEntry({...entry, moodScore: parseInt(e.target.value)})}
                className="absolute inset-x-4 bottom-[-10px] accent-lime-500 cursor-pointer opacity-0 hover:opacity-100 h-full"
              />
            </div>
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>Low (1)</span>
              <span className="text-lime-400">Current: {entry.moodScore}/10</span>
              <span>High (10)</span>
            </div>
          </div>
        </div>

        {/* War Chest Section */}
        <div className="mb-8">
           <h3 className="flex items-center gap-2 font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2 mb-4">
              <Swords size={18} className="text-cyan-400" /> Evidence of Greatness (War Chest)
            </h3>
            <ul className="space-y-2">
              {entry.achievements.map((ach, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300">
                  <Shield size={16} className="mt-1 text-slate-600 flex-shrink-0" />
                  {ach}
                </li>
              ))}
              <li className="list-none pt-2">
                 <input 
                  type="text" 
                  placeholder="+ Log a victory..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 placeholder-slate-600"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setEntry(prev => ({...prev, achievements: [...prev.achievements, e.currentTarget.value]}));
                      e.currentTarget.value = '';
                    }
                  }}
                 />
              </li>
            </ul>
        </div>

        {/* Notes / Journal */}
        <div>
           <h3 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-2 mb-4">
              Field Notes
            </h3>
            <textarea
              className="w-full h-32 p-4 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 leading-relaxed focus:outline-none resize-none font-mono text-sm focus:border-slate-600"
              value={entry.notes}
              onChange={(e) => setEntry({...entry, notes: e.target.value})}
              placeholder="Analysis of the day's operations..."
            ></textarea>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="flex items-center gap-2 bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(8,145,178,0.5)] font-bold">
            <Save size={18} /> Secure Data
          </button>
        </div>

      </div>
    </div>
  );
};