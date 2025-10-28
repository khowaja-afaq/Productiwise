
import React from 'react';
import { Habit } from '../types';
import { HabitItem } from './HabitItem';

interface HabitsScreenProps {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

export const HabitsScreen: React.FC<HabitsScreenProps> = ({ habits, setHabits }) => {
  const updateHabit = (updatedHabit: Habit) => {
    setHabits(prevHabits => prevHabits.map(h => (h.id === updatedHabit.id ? updatedHabit : h)));
  };
  
  const dailyHabits = habits.filter(h => h.frequency === 'daily');
  const weeklyHabits = habits.filter(h => h.frequency === 'weekly');
  
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Habit Tracker</h1>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Daily Habits</h2>
        {dailyHabits.length > 0 ? (
          dailyHabits.map(habit => <HabitItem key={habit.id} habit={habit} onUpdate={updateHabit} />)
        ) : (
          <p className="text-slate-500 dark:text-slate-400 text-sm">No daily habits yet. Add one to get started!</p>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Weekly Habits</h2>
        {weeklyHabits.length > 0 ? (
          weeklyHabits.map(habit => <HabitItem key={habit.id} habit={habit} onUpdate={updateHabit} />)
        ) : (
           <p className="text-slate-500 dark:text-slate-400 text-sm">No weekly habits being tracked.</p>
        )}
      </div>
    </div>
  );
};
