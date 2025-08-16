import type { Priority, Status } from './types';

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'high': return 'from-red-500 to-pink-500';
    case 'medium': return 'from-yellow-500 to-orange-500';
    case 'low': return 'from-green-500 to-emerald-500';
    default: return 'from-gray-400 to-gray-500';
  }
};

export const getStatusColor = (status: Status): string => {
  switch (status) {
    case 'completed': return 'text-green-600 bg-green-100';
    case 'in_progress': return 'text-blue-600 bg-blue-100';
    case 'not_started': return 'text-gray-600 bg-gray-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};