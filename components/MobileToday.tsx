import React from 'react';
import { Habit } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { Check, Flame, Zap, Trophy, Calendar } from 'lucide-react';

interface MobileTodayProps {
  habits: Habit[];
  toggleHabit: (habitId: string, date: string) => void;
}

export const MobileToday: React.FC<MobileTodayProps> = ({ habits, toggleHabit }) => {
  // Get today's date string YYYY-MM-DD
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  // Format for display
  const displayDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  // Calculate Today's Stats
  const totalHabits = habits.length;
  const completedToday = habits.filter(h => h.completedDates.includes(dateStr)).length;
  const winPercentage = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  // Determine header color based on performance
  let statusColor = "text-slate-400";
  if (winPercentage === 100) {
    statusColor = "text-cyan-400";
  } else if (winPercentage >= 50) {
    statusColor = "text-lime-400";
  }

  // Sort: Non-Negotiable first, then by name
  const sortedHabits = [...habits].sort((a, b) => {
    if (a.nonNegotiable && !b.nonNegotiable) return -1;
    if (!a.nonNegotiable && b.nonNegotiable) return 1;
    return 0;
  });

  return (
    <div className="w-full h-full flex flex-col bg-slate-950">
      
      {/* Fixed Header Section (Non-scrolling) */}
      <div className={`flex-shrink-0 bg-slate-950 border-b border-slate-800 px-4 pt-4 pb-4 transition-all duration-500 z-30 ${winPercentage === 100 ? 'border-cyan-500/30' : ''}`}>
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-end mb-3">
             <div>
               <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <Calendar size={12} /> {displayDate}
               </h2>
               <h1 className="text-2xl font-black text-white italic tracking-tighter mt-1">
                 DAILY PROTOCOL
               </h1>
             </div>
             <div className="text-right">
               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Win Rate</div>
               <div className={`text-3xl font-black font-mono leading-none ${statusColor} transition-colors duration-500`}>
                 {winPercentage}%
               </div>
             </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div 
              className={`h-full transition-all duration-700 ease-out ${winPercentage === 100 ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'bg-lime-500'}`}
              style={{ width: `${winPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Scrollable Habit List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 hide-scrollbar">
        <div className="max-w-md mx-auto space-y-3 pb-20"> {/* pb-20 ensures last item clears bottom gestures */}
          {sortedHabits.map((habit) => {
            const isCompleted = habit.completedDates.includes(dateStr);
            const isNonNegotiable = habit.nonNegotiable;
            
            return (
              <div 
                key={habit.id}
                onClick={() => toggleHabit(habit.id, dateStr)}
                className={`
                  relative p-4 rounded-xl border-2 transition-all duration-200 active:scale-[0.98] cursor-pointer overflow-hidden group
                  ${isCompleted 
                    ? 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                    : isNonNegotiable
                      ? 'bg-slate-900 border-fuchsia-900/50 hover:border-fuchsia-500/50' 
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }
                `}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex-1 min-w-0 pr-4"> {/* min-w-0 helps truncate text properly */}
                    <div className="flex items-center gap-2 mb-1.5">
                      {/* Category Chip */}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${CATEGORY_COLORS[habit.category].split('hover')[0]}`}>
                        {habit.category}
                      </span>
                      
                      {/* Non-Negotiable Icon */}
                      {isNonNegotiable && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-fuchsia-400 uppercase tracking-wider">
                          <Zap size={10} className="fill-current" /> Priority
                        </span>
                      )}
                    </div>
                    
                    <h3 className={`text-lg font-bold truncate transition-colors ${isCompleted ? 'text-emerald-400' : 'text-slate-100'}`}>
                      {habit.name}
                    </h3>
                  </div>

                  {/* Large Checkbox Target */}
                  <div className={`
                    w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center border-2 transition-all duration-300
                    ${isCompleted 
                      ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_10px_rgba(16,185,129,0.5)] rotate-0' 
                      : 'bg-slate-950 border-slate-700 text-transparent -rotate-6 group-hover:border-slate-500'
                    }
                  `}>
                    <Check size={28} strokeWidth={4} />
                  </div>
                </div>

                {/* Conditional Glow Effect on Background */}
                {isCompleted && (
                   <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none"></div>
                )}
              </div>
            );
          })}

          {/* Empty State / All Done */}
          {winPercentage === 100 && (
            <div className="py-8 text-center animate-fade-in">
              <div className="inline-flex p-4 rounded-full bg-cyan-950/50 border border-cyan-500/30 mb-4 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                <Trophy size={48} className="text-cyan-400" />
              </div>
              <h3 className="text-2xl font-black text-white italic mb-2">SUPREME VICTORY</h3>
              <p className="text-cyan-400/70 font-mono text-sm">DAY CONQUERED</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};