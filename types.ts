export interface Habit {
  id: string;
  name: string;
  category: 'Health' | 'Productivity' | 'Mindfulness' | 'Learning' | 'Other';
  monthlyGoal: number; // Target number of days
  completedDates: string[]; // ISO date strings YYYY-MM-DD
  nonNegotiable?: boolean; // God Mode flag
}

export interface ReflectionEntry {
  date: string;
  screenTime: {
    morning: number; // minutes
    day: number;
    evening: number;
    night: number;
  };
  moodScore: number; // 1-10
  achievements: string[];
  notes: string;
}

export interface DayStats {
  date: string;
  totalCompleted: number;
}

export enum ViewMode {
  HOME = 'HOME',
  TODAY = 'TODAY',
  TRACKER = 'TRACKER',
  DASHBOARD = 'DASHBOARD',
  REFLECTION = 'REFLECTION',
  COACH = 'COACH'
}