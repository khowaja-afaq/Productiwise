
import React from 'react';
import { View } from '../types';
import { Icon } from './Icon';

interface BottomNavProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { view: View.Dashboard, icon: 'dashboard', label: 'Dashboard' },
    { view: View.Planner, icon: 'planner', label: 'Planner' },
    { view: View.Habits, icon: 'habits', label: 'Habits' },
    { view: View.Wisely, icon: 'wisely', label: 'Wisely' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 shadow-t-lg z-50">
      <div className="max-w-md mx-auto h-full flex justify-around items-center px-2">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => setCurrentView(item.view)}
              className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ease-in-out rounded-lg p-2 ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon name={item.icon} className="h-6 w-6 mb-1" />
              <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
