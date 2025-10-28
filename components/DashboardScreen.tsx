
import React from 'react';
import { Task, Habit, View } from '../types';
import { TaskItem } from './TaskItem';
import { HabitItem } from './HabitItem';
import { Icon } from './Icon';

interface DashboardScreenProps {
  tasks: Task[];
  habits: Habit[];
  setCurrentView: (view: View) => void;
  updateTask: (updatedTask: Task) => void;
  updateHabit: (updatedHabit: Habit) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ tasks, habits, setCurrentView, updateTask, updateHabit }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => task.deadline === today);
  const overdueTasks = tasks.filter(task => task.deadline < today && task.status !== 'Done');
  const upcomingTasks = tasks.filter(task => task.deadline > today).slice(0, 2);

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Welcome to Productiwise</h1>
        <p className="text-slate-500 dark:text-slate-400">Here's your productivity snapshot.</p>
      </div>

      <div
        onClick={() => setCurrentView(View.Wisely)}
        className="cursor-pointer bg-primary-50 dark:bg-primary-900/50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4"
      >
        <div className="bg-primary-500 p-3 rounded-full">
            <Icon name="wisely" className="h-6 w-6 text-white"/>
        </div>
        <div>
            <h3 className="font-semibold text-primary-800 dark:text-primary-200">Chat with Wisely</h3>
            <p className="text-sm text-primary-600 dark:text-primary-300">Get tips, add tasks, or get a motivation boost.</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Today's Focus</h2>
        {todayTasks.length > 0 ? (
          todayTasks.map(task => <TaskItem key={task.id} task={task} onUpdate={updateTask} />)
        ) : (
          <p className="text-slate-500 dark:text-slate-400 text-sm">No tasks due today. Plan ahead!</p>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Your Habits</h2>
        {habits.slice(0, 3).map(habit => (
            <HabitItem key={habit.id} habit={habit} onUpdate={updateHabit}/>
        ))}
      </div>

       {overdueTasks.length > 0 && (
        <div className="p-4 bg-red-50 dark:bg-red-900/50 rounded-lg">
            <h3 className="font-semibold text-red-700 dark:text-red-300">Overdue Tasks ({overdueTasks.length})</h3>
            <p className="text-sm text-red-600 dark:text-red-400">Catch up on these tasks in the Planner.</p>
        </div>
      )}
    </div>
  );
};
