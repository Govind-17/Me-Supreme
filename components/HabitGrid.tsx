import React, { useState } from 'react';
import { Habit } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { Check, Filter, Zap, Flame, Crown } from 'lucide-react';

interface HabitGridProps {
  habits: Habit[];
  currentMonth: number;
  currentYear: number;
  toggleHabit: (habitId: string, date: string) => void;
  updateHabitCategory: (habitId: string, category: Habit['category']) => void;
}

export const HabitGrid: React.FC<HabitGridProps> = ({ 
  habits, 
  currentMonth, 
  currentYear, 
  toggleHabit,
  updateHabitCategory
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [godMode, setGodMode] = useState<boolean>(false);
  
  // Calculate days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const today = new Date().getDate(); // Simplified for demo (assumes current month)

  // Helper to check completion
  const isCompleted = (habit: Habit, day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return habit.completedDates.includes(dateStr);
  };

  // Burn Rate Calculator (Checks last 3 days relative to "today" simulation)
  const getBurnStatus = (habit: Habit) => {
    // Configurable threshold
    const MISSED_DAYS_THRESHOLD = 3;
    let missedCount = 0;
    // Check previous days (e.g., today-1, today-2, ...)
    for (let i = 1; i <= MISSED_DAYS_THRESHOLD; i++) {
      const checkDay = Math.max(1, today - i);
      // If we hit the start of the month and wrap around, logic would need date objects,
      // but for this visual grid demo within single month view:
      if (checkDay === 1 && (today - i) < 1) break; // Don't go into previous month for this simple check
      
      if (!isCompleted(habit, checkDay)) missedCount++;
    }
    return missedCount >= MISSED_DAYS_THRESHOLD; // True if missed consecutive days
  };

  const getDateStr = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const filteredHabits = activeCategory === 'All' 
    ? habits 
    : habits.filter(h => h.category === activeCategory);

  const categories = ['All', ...Object.keys(CATEGORY_COLORS)];

  return (
    <div className="w-full bg-slate-900 rounded-xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col h-full ring-1 ring-white/5">
      {/* Header and Filter Bar */}
      <div className="border-b border-slate-800 bg-slate-950">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="w-2 h-6 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
            Daily Protocols
          </h2>
          
          <div className="flex items-center gap-4">
            {/* God Mode Toggle */}
            <button 
              onClick={() => setGodMode(!godMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 ${
                godMode 
                ? 'bg-fuchsia-950 border-fuchsia-500 text-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.4)]' 
                : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500'
              }`}
            >
              <Crown size={14} className={godMode ? 'fill-current' : ''} />
              GOD MODE: {godMode ? 'ON' : 'OFF'}
            </button>
            
            <div className="text-sm font-mono text-slate-500 hidden sm:block">
              {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>
        
        {/* Category Tabs */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            let styleClass = "bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-600";
            
            if (isSelected) {
               if (cat === 'All') {
                 styleClass = "bg-slate-800 text-white border-slate-700 shadow-md";
               } else {
                 styleClass = `${CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS]} shadow-sm ring-1 ring-inset ring-white/10`;
               }
            }
            
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold font-mono rounded-full transition-all whitespace-nowrap flex-shrink-0 ${styleClass}`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-auto hide-scrollbar relative bg-slate-900">
        <div className="min-w-max">
          {/* Grid Header Row */}
          <div className="flex border-b border-slate-800 bg-slate-950 sticky top-0 z-20">
            <div className="sticky left-0 z-30 w-36 md:w-64 p-3 font-semibold text-slate-400 bg-slate-950 border-r border-slate-800 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.5)]">
              Habit Name
            </div>
            <div className="sticky left-36 md:left-64 z-30 w-16 md:w-24 p-3 font-semibold text-center text-slate-400 bg-slate-950 border-r border-slate-800">
              Goal
            </div>
            {daysArray.map((day) => (
              <div key={day} className="w-10 flex-shrink-0 p-2 text-center text-xs font-medium text-slate-600 border-r border-slate-800/50 flex flex-col justify-center items-center">
                <span>{day}</span>
              </div>
            ))}
            <div className="w-16 md:w-20 flex-shrink-0 p-3 text-center font-semibold text-slate-400 sticky right-0 bg-slate-950 border-l border-slate-800 z-20">
              %
            </div>
          </div>

          {/* Habit Rows */}
          {filteredHabits.length === 0 ? (
             <div className="p-12 text-center text-slate-600">
               <Filter className="mx-auto mb-2 opacity-50" size={32} />
               <p>No protocols found.</p>
             </div>
          ) : (
            filteredHabits.map((habit) => {
              const completionCount = habit.completedDates.length; 
              const percent = Math.round((completionCount / Math.max(1, habit.monthlyGoal)) * 100);
              const isBurnRisk = getBurnStatus(habit);
              
              // God Mode: Dim habits that aren't non-negotiable
              const isDimmed = godMode && !habit.nonNegotiable;
              
              return (
                <div 
                  key={habit.id} 
                  className={`flex border-b border-slate-800/50 transition-all duration-500 group ${
                    isDimmed ? 'opacity-20 grayscale' : 'opacity-100 hover:bg-slate-800/30'
                  } ${habit.nonNegotiable && godMode ? 'bg-fuchsia-900/10' : ''}`}
                >
                  <div className={`sticky left-0 z-10 w-36 md:w-64 p-2 md:p-3 bg-slate-900 group-hover:bg-slate-800/50 border-r border-slate-800 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.5)] flex flex-col justify-center transition-colors duration-300 relative overflow-hidden`}>
                    
                    {/* Burn Rate Indicator (Left Border) */}
                    {isBurnRisk && !isDimmed && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] z-20"></div>
                    )}

                    <div className="flex items-center gap-2">
                       {habit.nonNegotiable && (
                         <Zap size={12} className={godMode ? 'text-fuchsia-400 fill-fuchsia-400 animate-pulse' : 'text-slate-600'} />
                       )}
                       
                       {/* Burn Rate Icon */}
                       {isBurnRisk && !isDimmed && (
                         <Flame size={12} className="text-red-500 fill-red-500 animate-pulse flex-shrink-0" />
                       )}
                       
                       <span className={`font-medium truncate text-xs md:text-sm ${
                         isBurnRisk && !isDimmed ? 'text-red-400 font-bold' : 'text-slate-200'
                       }`}>
                         {habit.name}
                       </span>
                    </div>
                    
                    <div className="relative group/select mt-1 w-fit">
                      <select
                        value={habit.category}
                        onChange={(e) => updateHabitCategory(habit.id, e.target.value as Habit['category'])}
                        className={`appearance-none text-[10px] pl-2 pr-5 py-0.5 rounded-full cursor-pointer outline-none transition-all font-bold uppercase tracking-wider border ${CATEGORY_COLORS[habit.category]}`}
                      >
                         {Object.keys(CATEGORY_COLORS).map((cat) => (
                           <option key={cat} value={cat} className="bg-slate-900 text-slate-300">{cat}</option>
                         ))}
                      </select>
                    </div>

                  </div>
                  <div className="sticky left-36 md:left-64 z-10 w-16 md:w-24 p-2 md:p-3 bg-slate-900 group-hover:bg-slate-800/50 border-r border-slate-800 flex items-center justify-center text-xs text-slate-500 font-mono">
                    {habit.monthlyGoal} <span className="hidden md:inline ml-1">days</span>
                  </div>
                  
                  {daysArray.map((day) => {
                    const completed = isCompleted(habit, day);
                    const dateStr = getDateStr(day);
                    
                    return (
                      <div key={day} className="w-10 flex-shrink-0 border-r border-slate-800/50 flex items-center justify-center relative">
                        <button
                          onClick={() => toggleHabit(habit.id, dateStr)}
                          className={`w-6 h-6 rounded-sm flex items-center justify-center transition-all duration-200 ${
                            completed 
                              ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.6)] scale-100' 
                              : 'bg-slate-800 text-transparent hover:bg-slate-700 scale-75'
                          }`}
                        >
                          <Check size={14} strokeWidth={4} />
                        </button>
                      </div>
                    );
                  })}

                  <div className="w-16 md:w-20 flex-shrink-0 p-3 bg-slate-900 group-hover:bg-slate-800/50 sticky right-0 border-l border-slate-800 z-10 flex items-center justify-center font-bold text-xs md:text-sm text-slate-300 font-mono">
                    {percent}%
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};