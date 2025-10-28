
export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum TaskStatus {
  Todo = 'Todo',
  InProgress = 'In Progress',
  Done = 'Done',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: TaskStatus;
  priority: Priority;
  tags: string[];
}

export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  completedToday: boolean;
  history: boolean[]; // true for completed, false for missed
}

export enum View {
  Dashboard = 'Dashboard',
  Planner = 'Planner',
  Habits = 'Habits',
  Wisely = 'Wisely',
}

export type ChatRole = 'user' | 'model' | 'system';

export interface ChatMessage {
  role: ChatRole;
  text: string;
  image?: string;
}
