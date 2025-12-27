import { Habit, ReflectionEntry } from './types';

export const INITIAL_HABITS: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation (15m)',
    category: 'Mindfulness',
    monthlyGoal: 25,
    completedDates: ['2023-10-01', '2023-10-02', '2023-10-04', '2023-10-05', '2023-10-06'],
    nonNegotiable: true
  },
  {
    id: '2',
    name: 'Deep Work (2 hrs)',
    category: 'Productivity',
    monthlyGoal: 20,
    completedDates: ['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-05'],
    nonNegotiable: true
  },
  {
    id: '3',
    name: 'No Sugar',
    category: 'Health',
    monthlyGoal: 28,
    completedDates: ['2023-10-01', '2023-10-03', '2023-10-04']
  },
  {
    id: '4',
    name: 'Read 20 Pages',
    category: 'Learning',
    monthlyGoal: 15,
    completedDates: ['2023-10-02', '2023-10-06']
  },
  {
    id: '5',
    name: 'Gym / Workout',
    category: 'Health',
    monthlyGoal: 20,
    completedDates: ['2023-10-01', '2023-10-03', '2023-10-05'],
    nonNegotiable: true
  }
];

export const MOCK_REFLECTION: ReflectionEntry = {
  date: new Date().toISOString().split('T')[0],
  screenTime: {
    morning: 15,
    day: 120,
    evening: 45,
    night: 0
  },
  moodScore: 8,
  achievements: ['Finished project beta', 'Ran 5k in under 25 mins'],
  notes: 'Felt very energetic today. The morning meditation is really helping with focus.'
};

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Updated for Dark Mode / Neon Aesthetic
export const CATEGORY_COLORS = {
  Health: 'bg-emerald-900/40 text-emerald-400 border-emerald-700/50 hover:bg-emerald-900/60',
  Productivity: 'bg-cyan-900/40 text-cyan-400 border-cyan-700/50 hover:bg-cyan-900/60',
  Mindfulness: 'bg-fuchsia-900/40 text-fuchsia-400 border-fuchsia-700/50 hover:bg-fuchsia-900/60',
  Learning: 'bg-amber-900/40 text-amber-400 border-amber-700/50 hover:bg-amber-900/60',
  Other: 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
};