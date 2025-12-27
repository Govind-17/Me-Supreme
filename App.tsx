import React, { useState } from 'react';
import { Habit, ViewMode } from './types';
import { INITIAL_HABITS } from './constants';
import { Header } from './components/Header';
import { HabitGrid } from './components/HabitGrid';
import { Dashboard } from './components/Dashboard';
import { Reflection } from './components/Reflection';
import { AICoach } from './components/AICoach';
import { Landing } from './components/Landing';
import { MobileToday } from './components/MobileToday';

function App() {
  // Global State
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.HOME);
  
  // Date State (Defaults to Oct 2023 for demo matching constants, but practical apps use current date)
  const [currentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // Logic to toggle a habit status
  const toggleHabit = (habitId: string, dateStr: string) => {
    setHabits(prevHabits => prevHabits.map(habit => {
      if (habit.id !== habitId) return habit;

      const isCompleted = habit.completedDates.includes(dateStr);
      let newDates;
      
      if (isCompleted) {
        newDates = habit.completedDates.filter(d => d !== dateStr);
      } else {
        newDates = [...habit.completedDates, dateStr];
      }

      return { ...habit, completedDates: newDates };
    }));
  };

  // Logic to update habit category
  const updateHabitCategory = (habitId: string, newCategory: Habit['category']) => {
    setHabits(prevHabits => prevHabits.map(habit => {
      if (habit.id !== habitId) return habit;
      return { ...habit, category: newCategory };
    }));
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewMode.HOME:
        return <Landing onStart={() => setCurrentView(ViewMode.TODAY)} />;
      case ViewMode.TODAY:
        return <MobileToday habits={habits} toggleHabit={toggleHabit} />;
      case ViewMode.TRACKER:
        return (
          <HabitGrid 
            habits={habits} 
            currentMonth={currentMonth}
            currentYear={currentYear}
            toggleHabit={toggleHabit}
            updateHabitCategory={updateHabitCategory}
          />
        );
      case ViewMode.DASHBOARD:
        return <Dashboard habits={habits} />;
      case ViewMode.REFLECTION:
        return <Reflection />;
      case ViewMode.COACH:
        return <AICoach habits={habits} />;
      default:
        return (
          <HabitGrid 
            habits={habits} 
            currentMonth={currentMonth} 
            currentYear={currentYear} 
            toggleHabit={toggleHabit} 
            updateHabitCategory={updateHabitCategory}
          />
        );
    }
  };

  // Dynamic Viewport Height (dvh) ensures it fits perfectly on mobile browsers with address bars
  return (
    <div className="h-[100dvh] bg-slate-950 flex flex-col font-sans text-slate-100 overflow-hidden">
      <Header currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 w-full mx-auto overflow-hidden relative">
        {/* 
          Container Layout Logic:
          - HOME: Full width, scrollable inside component if needed.
          - TODAY: Full height, NO padding (handled internally), optimized for app-feel.
          - OTHERS: Max width constraint, standard padding, internal scroll.
        */}
        <div className={`h-full w-full flex flex-col ${
          currentView === ViewMode.HOME ? '' : 'max-w-7xl mx-auto'
        } ${
          currentView === ViewMode.TODAY ? 'p-0' : 'px-4 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-y-auto hide-scrollbar'
        }`}>
           {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;