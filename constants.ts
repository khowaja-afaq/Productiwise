import { Task, Habit, Priority, TaskStatus } from './types';

export const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Finalize Q3 Report',
    description: 'Compile all departmental data and finalize the quarterly performance report.',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: TaskStatus.InProgress,
    priority: Priority.High,
    tags: ['reporting', 'finance'],
  },
  {
    id: '2',
    title: 'Design new landing page mockups',
    description: 'Create 3-5 design mockups for the new product landing page.',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: TaskStatus.Todo,
    priority: Priority.Medium,
    tags: ['design', 'marketing'],
  },
  {
    id: '3',
    title: 'Client Follow-up Calls',
    description: 'Call key clients to discuss project updates and satisfaction.',
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: TaskStatus.Todo,
    priority: Priority.High,
    tags: ['sales', 'clients'],
  },
   {
    id: '4',
    title: 'Review team pull requests',
    description: 'Check GitHub for open PRs and provide feedback.',
    deadline: new Date().toISOString().split('T')[0],
    status: TaskStatus.Done,
    priority: Priority.Medium,
    tags: ['dev', 'code'],
  },
];

export const INITIAL_HABITS: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    frequency: 'daily',
    streak: 12,
    completedToday: true,
    history: [true, true, true, false, true, true, true]
  },
  {
    id: '2',
    name: 'Read 20 pages',
    frequency: 'daily',
    streak: 5,
    completedToday: false,
    history: [true, true, true, true, false, true, false]
  },
  {
    id: '3',
    name: 'Weekly Review',
    frequency: 'weekly',
    streak: 4,
    completedToday: false,
    history: [true, true, true, true]
  },
];


export const PRODUCTIWISE_LOGO_B64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQEAQMAAABFqC/OAAAABlBMVEUAAAAbj3f+9XukAAAAAXRSTlMAQObYZgAAADlJREFUeJztwQEBAAAAgiD/r25IQAEAAP8L0QcAAADgLwEAAADgLwEAAADgLwEAAADgLwEAAADgLwEAAADQZwAEgCYDPQADwYMAAAAASUVORK5CYII=';

export const PRODUCTIWISE_WORDMARK_B64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAvQAAAD6AQMAAAC3s0j3AAAABlBMVEUAAAAbj3f+9XukAAAAAXRSTlMAQObYZgAAAIlJREFUeJzt0DENAAAEBEC7v8Y+AbjQJAYiCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0A/efwAB4oFT/QAAAABJRU5ErkJggg==';
