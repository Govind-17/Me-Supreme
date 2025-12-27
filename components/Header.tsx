import React from 'react';
import { ViewMode } from '../types';
import { LayoutGrid, BarChart3, PenTool, Bot, Home, CheckSquare } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  
  const navItems = [
    { id: ViewMode.HOME, label: 'Home', icon: Home },
    { id: ViewMode.TODAY, label: 'Today', icon: CheckSquare },
    { id: ViewMode.TRACKER, label: 'Grid', icon: LayoutGrid },
    { id: ViewMode.DASHBOARD, label: 'Stats', icon: BarChart3 },
    { id: ViewMode.REFLECTION, label: 'Journal', icon: PenTool },
    { id: ViewMode.COACH, label: 'Coach', icon: Bot },
  ];

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo - Compact on mobile */}
          <div 
            className="flex items-center gap-2 cursor-pointer flex-shrink-0" 
            onClick={() => setView(ViewMode.HOME)}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-indigo-500/20">
              M
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline text-slate-100">Me Supreme</span>
          </div>

          {/* Navigation - Scrollable on mobile */}
          <nav className="flex space-x-1 overflow-x-auto hide-scrollbar flex-grow sm:flex-grow-0 justify-start sm:justify-end">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  currentView === item.id
                    ? 'bg-slate-800 text-cyan-400 shadow-inner ring-1 ring-white/5'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <item.icon size={16} className={currentView === item.id ? 'stroke-[2.5px]' : ''} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};