
import React from 'react';
import { Habit } from '../types';
import { Icon } from './Icon';

interface HabitItemProps {
  habit: Habit;
  onUpdate: (updatedHabit: Habit) => void;
}

export const HabitItem: React.FC<HabitItemProps> = ({ habit, onUpdate }) => {
  const handleToggle = () => {
    onUpdate({
      ...habit,
      completedToday: !habit.completedToday,
      streak: habit.completedToday ? habit.streak - 1 : habit.streak + 1,
      history: habit.history.slice(0, -1).concat(!habit.completedToday),
    });
  };

  const completionPercentage = (habit.history.filter(Boolean).length / habit.history.length) * 100;

  return (
    <div className="p-4 rounded-xl shadow-sm bg-white dark:bg-slate-800/50 border border-white dark:border-slate-700 flex items-center space-x-4">
      <button onClick={handleToggle} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${habit.completedToday ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
        <Icon name="habits" />
      </button>
      <div className="flex-1">
        <p className="font-medium text-slate-800 dark:text-slate-100">{habit.name}</p>
        <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
            <span>🔥 {habit.streak} day streak</span>
            <span>🎯 {completionPercentage.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};
