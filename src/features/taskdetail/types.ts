export type Priority = 'low' | 'medium' | 'high';
export type Status = 'not_started' | 'in_progress' | 'completed';
export type TabId = 'overview' | 'notes' | 'progress' | 'timer';

export interface Subtask {
  id: number;
  title: string;
  completed: boolean;
  timeSpent: number;
}

export interface StudySession {
  date: string;
  duration: number;
  notes: string;
}

export interface TaskData {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  estimatedHours: number;
  completedHours: number;
  progress: number;
  tags: string[];
  notes: string;
  subtasks: Subtask[];
  studySessions: StudySession[];
}

export interface StudyTimer {
  active: boolean;
  elapsed: number; // in seconds
}

export interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType;
}