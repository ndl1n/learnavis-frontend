import type { TaskData } from './types';

export const initialTaskData: TaskData = {
  id: 'task-001',
  title: 'Master React Hooks & Context API',
  description: 'Complete understanding of React Hooks, Context API, and modern state management patterns',
  category: 'Frontend Development',
  priority: 'high',
  status: 'in_progress',
  dueDate: '2024-09-15',
  estimatedHours: 20,
  completedHours: 12.5,
  progress: 62,
  tags: ['React', 'JavaScript', 'Frontend', 'Hooks'],
  notes: `# React Hooks Learning Journey
  
  ## Key Concepts Learned
  - **useState**: Managing component state
  - **useEffect**: Side effects and lifecycle
  - **useContext**: Sharing state across components
  - **useReducer**: Complex state logic

  ## Important Points
  1. Always use hooks at the top level
  2. Don't call hooks inside loops, conditions, or nested functions
  3. Custom hooks should start with "use"

  ## Next Steps
  - [ ] Practice with useCallback and useMemo
  - [ ] Build a complex app using Context API
  - [ ] Learn about useRef and useImperativeHandle

  ## Resources
  - [React Docs - Hooks](https://react.dev/reference/react)
  - Course: "Complete React Developer in 2024"
  `,
  subtasks: [
      { id: 1, title: 'Learn useState and useEffect basics', completed: true, timeSpent: 3 },
      { id: 2, title: 'Understand useContext and Context API', completed: true, timeSpent: 4 },
      { id: 3, title: 'Master useReducer for complex state', completed: false, timeSpent: 2.5 },
      { id: 4, title: 'Practice with custom hooks', completed: false, timeSpent: 1 },
      { id: 5, title: 'Build project using all learned hooks', completed: false, timeSpent: 2 }
  ],
  studySessions: [
      { date: '2024-08-10', duration: 2.5, notes: 'Learned useState basics, built simple counter' },
      { date: '2024-08-11', duration: 3, notes: 'Deep dive into useEffect, understood cleanup' },
      { date: '2024-08-13', duration: 2, notes: 'Context API introduction, simple theme switcher' },
      { date: '2024-08-14', duration: 2, notes: 'useContext with complex data structures' },
      { date: '2024-08-15', duration: 3, notes: 'Started useReducer, compared with useState' }
  ]
};