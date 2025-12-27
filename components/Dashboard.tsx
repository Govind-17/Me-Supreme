import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { Habit } from '../types';
import { TrendingUp, Trophy, Zap, Target, Flame, ChevronUp } from 'lucide-react';

interface DashboardProps {
  habits: Habit[];
}

export const Dashboard: React.FC<DashboardProps> = ({ habits }) => {
  
  // -- Calculations --

  // 1. Completion & Leveling
  const totalGoal = habits.reduce((acc, h) => acc + h.monthlyGoal, 0);
  const totalCompleted = habits.reduce((acc, h) => acc + h.completedDates.length, 0);
  const completionRate = totalGoal > 0 ? Math.round((totalCompleted / totalGoal) * 100) : 0;

  // XP System
  let levelName = "Rookie";
  let levelColor = "text-slate-400";
  let levelBg = "bg-slate-800";

  if (completionRate >= 91) {
    levelName = "SUPREME";
    levelColor = "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]";
    levelBg = "bg-cyan-950 border-cyan-500";
  } else if (completionRate >= 71) {
    levelName = "ELITE";
    levelColor = "text-fuchsia-400";
    levelBg = "bg-fuchsia-950 border-fuchsia-600";
  } else if (completionRate >= 41) {
    levelName = "CONTENDER";
    levelColor = "text-lime-400";
    levelBg = "bg-lime-950 border-lime-600";
  }

  // 1% Better Simulation (Comparing to a mock 'previous month' of 45% completion)
  const previousMonthRate = 45; 
  const improvement = completionRate - previousMonthRate;

  const pieData = [
    { name: 'Completed', value: totalCompleted },
    { name: 'Remaining', value: Math.max(0, totalGoal - totalCompleted) },
  ];
  // Dark mode chart colors
  const COLORS = ['#22d3ee', '#1e293b']; // Cyan & Slate-800

  // 2. Top Habits
  const sortedHabits = [...habits].sort((a, b) => b.completedDates.length - a.completedDates.length);
  const topHabits = sortedHabits.slice(0, 5).map(h => ({
    name: h.name.length > 15 ? h.name.substring(0, 15) + '...' : h.name,
    count: h.completedDates.length
  }));

  // 3. Mock Daily Consistency
  const consistencyData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    completed: Math.floor(Math.random() * habits.length * 0.8) + 2 // Mock data
  }));

  return (
    <div className="space-y-6 pb-12">
      {/* XP Level Banner */}
      <div className={`w-full p-8 rounded-2xl border ${levelBg} flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden`}>
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
         
         <div className="relative z-10 flex items-center gap-6">
            <div className={`p-4 rounded-full border-2 ${levelBg.replace('bg-', 'border-')} bg-slate-900`}>
              <Trophy size={48} className={levelColor.split(' ')[0]} />
            </div>
            <div>
              <p className="text-slate-400 font-mono text-sm uppercase tracking-widest mb-1">Current Status</p>
              <h2 className={`text-5xl font-black italic tracking-tighter ${levelColor}`}>
                {levelName}
              </h2>
            </div>
         </div>

         <div className="relative z-10 bg-slate-900/50 p-4 rounded-xl border border-white/10 min-w-[200px]">
            <div className="flex justify-between text-xs text-slate-400 mb-2 font-mono uppercase">
              <span>XP Progress</span>
              <span>{completionRate}/100</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
               <div 
                 className={`h-full transition-all duration-1000 ease-out ${levelName === 'SUPREME' ? 'bg-cyan-400' : levelName === 'ELITE' ? 'bg-fuchsia-400' : levelName === 'CONTENDER' ? 'bg-lime-400' : 'bg-slate-500'}`} 
                 style={{ width: `${completionRate}%` }}
               ></div>
            </div>
         </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1% Better Calculator */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm flex items-center gap-4 relative overflow-hidden">
          <div className={`p-3 bg-slate-800 rounded-lg ${improvement >= 0 ? 'text-lime-400' : 'text-red-400'}`}>
            <ChevronUp size={24} className={improvement < 0 ? 'rotate-180' : ''} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Vs Last Month</p>
            <h3 className={`text-2xl font-bold ${improvement >= 0 ? 'text-lime-400' : 'text-red-400'}`}>
              {improvement > 0 ? '+' : ''}{improvement}%
            </h3>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-800 text-cyan-400 rounded-lg">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Total Actions</p>
            <h3 className="text-2xl font-bold text-slate-100">{totalCompleted}</h3>
          </div>
        </div>
        
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-800 text-fuchsia-400 rounded-lg">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Best Streak</p>
            <h3 className="text-2xl font-bold text-slate-100">5 Days</h3>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-800 text-amber-400 rounded-lg">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Power Habit</p>
            <h3 className="text-lg font-bold text-slate-100 truncate w-32">{sortedHabits[0]?.name || 'N/A'}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart - Weekly Consistency */}
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-100 mb-6">Weekly Consistency</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={consistencyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', color: '#fff'}}
                  itemStyle={{color: '#22d3ee'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#22d3ee" 
                  strokeWidth={3} 
                  dot={{fill: '#0f172a', strokeWidth: 2, r: 4, stroke: '#22d3ee'}} 
                  activeDot={{r: 6, fill: '#22d3ee'}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart - Monthly Goal */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-100 mb-2">Completion Rate</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', color: '#fff'}} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
               <span className="text-4xl font-black text-slate-100">{completionRate}%</span>
               <span className="text-xs text-slate-500 uppercase tracking-wide">Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Habits Bar Chart */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
        <h3 className="text-lg font-bold text-slate-100 mb-6">Top Performing Habits</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topHabits} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
              <XAxis type="number" axisLine={false} tickLine={false} hide />
              <YAxis dataKey="name" type="category" width={120} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 500}} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', color: '#fff'}} />
              <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};