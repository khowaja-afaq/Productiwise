
import React, { useState } from 'react';
import { Task, TaskStatus, Priority } from '../types';
import { TaskItem } from './TaskItem';

interface PlannerScreenProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const PlannerScreen: React.FC<PlannerScreenProps> = ({ tasks, setTasks }) => {
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'status' | 'tags'>>({
    title: '',
    description: '',
    deadline: '',
    priority: Priority.Medium,
  });

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => prevTasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;
    const taskToAdd: Task = {
      ...newTask,
      id: Date.now().toString(),
      status: TaskStatus.Todo,
      tags: [],
    };
    setTasks([taskToAdd, ...tasks]);
    setNewTask({ title: '', description: '', deadline: '', priority: Priority.Medium });
    setShowForm(false);
  };
  
  const todoTasks = tasks.filter(t => t.status === TaskStatus.Todo || t.status === TaskStatus.InProgress);
  const doneTasks = tasks.filter(t => t.status === TaskStatus.Done);

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Planner</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-primary-700 transition-colors"
        >
          {showForm ? 'Cancel' : '+ New Task'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddTask} className="p-4 bg-white dark:bg-slate-800 rounded-lg space-y-4 shadow-md animate-fade-in">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 dark:border-slate-600"
            required
          />
          <textarea
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 dark:border-slate-600"
            rows={2}
          />
          <div className="flex space-x-4">
            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 dark:border-slate-600"
              required
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Priority })}
              className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-700 dark:border-slate-600"
            >
              {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700">Add Task</button>
        </form>
      )}

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">To-Do</h2>
        {todoTasks.length > 0 ? (
          todoTasks.map(task => <TaskItem key={task.id} task={task} onUpdate={updateTask} />)
        ) : (
          <p className="text-slate-500 dark:text-slate-400 text-sm">All tasks completed! Great job.</p>
        )}
      </div>
      
       <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Completed</h2>
        {doneTasks.map(task => <TaskItem key={task.id} task={task} onUpdate={updateTask} />)}
      </div>
    </div>
  );
};
