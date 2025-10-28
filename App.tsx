import React, { useState, useEffect } from 'react';
import { View, Task, Habit } from './types';
import { INITIAL_TASKS, INITIAL_HABITS, PRODUCTIWISE_WORDMARK_B64 } from './constants';

import { BottomNav } from './components/BottomNav';
import { DashboardScreen } from './components/DashboardScreen';
import { PlannerScreen } from './components/PlannerScreen';
import { HabitsScreen } from './components/HabitsScreen';
import { WiselyScreen } from './components/WiselyScreen';
import { ThemeToggle } from './components/ThemeToggle';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check for saved theme in localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleSetTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => prevTasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const updateHabit = (updatedHabit: Habit) => {
    setHabits(prevHabits => prevHabits.map(h => (h.id === updatedHabit.id ? updatedHabit : h)));
  };


  const renderView = () => {
    switch (currentView) {
      case View.Dashboard:
        return <DashboardScreen tasks={tasks} habits={habits} setCurrentView={setCurrentView} updateTask={updateTask} updateHabit={updateHabit} />;
      case View.Planner:
        return <PlannerScreen tasks={tasks} setTasks={setTasks} />;
      case View.Habits:
        return <HabitsScreen habits={habits} setHabits={setHabits} />;
      case View.Wisely:
        return <WiselyScreen setTasks={setTasks} />;
      default:
        return <DashboardScreen tasks={tasks} habits={habits} setCurrentView={setCurrentView} updateTask={updateTask} updateHabit={updateHabit}/>;
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-md mx-auto h-screen flex flex-col">
        <header className="p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={PRODUCTIWISE_WORDMARK_B64} alt="Productiwise" className="h-10 dark:invert" />
          </div>
          <ThemeToggle theme={theme} setTheme={handleSetTheme} />
        </header>
        
        <main className={`flex-1 overflow-y-auto pb-20 ${currentView === View.Wisely ? 'p-0' : ''}`}>
          {renderView()}
        </main>

        <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
      </div>
    </div>
  );
};

export default App;
