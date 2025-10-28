
import React from 'react';
import { Task, TaskStatus, Priority } from '../types';

interface TaskItemProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
}

const priorityColors: { [key in Priority]: string } = {
  [Priority.High]: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700',
  [Priority.Medium]: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700',
  [Priority.Low]: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700',
};


export const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate }) => {
  const isDone = task.status === TaskStatus.Done;

  const handleStatusChange = () => {
    const newStatus = isDone ? TaskStatus.Todo : TaskStatus.Done;
    onUpdate({ ...task, status: newStatus });
  };

  return (
    <div className={`p-4 rounded-xl shadow-sm transition-all duration-200 flex items-start space-x-4 border ${isDone ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700' : 'bg-white dark:bg-slate-800/50 border-white dark:border-slate-700'}`}>
      <input
        type="checkbox"
        checked={isDone}
        onChange={handleStatusChange}
        className="mt-1 h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
      />
      <div className="flex-1">
        <p className={`font-medium text-slate-800 dark:text-slate-100 ${isDone ? 'line-through text-slate-500' : ''}`}>
          {task.title}
        </p>
        <p className={`text-sm text-slate-500 dark:text-slate-400 ${isDone ? 'line-through' : ''}`}>
          {task.description}
        </p>
        <div className="mt-2 flex items-center space-x-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400">{task.deadline}</span>
          <span className={`px-2 py-0.5 rounded-full font-semibold border ${priorityColors[task.priority]}`}>{task.priority}</span>
          {task.tags.map(tag => (
            <span key={tag} className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
