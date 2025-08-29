import type { PathOption } from '../types';

// 將預定義的路徑資料移到這裡
const pathOptions: PathOption[] = [
  {
    id: 'frontend-master',
    name: 'Frontend Master',
    description: 'Complete frontend development mastery path',
    nodes: ['html', 'css', 'js', 'react', 'project'],
    estimatedWeeks: 12,
    difficulty: 'Intermediate',
    category: 'Frontend'
  },
  {
    id: 'fullstack-dev',
    name: 'Full-Stack Developer',
    description: 'Become a complete full-stack developer',
    nodes: ['html', 'css', 'js', 'react', 'nodejs', 'project'],
    estimatedWeeks: 16,
    difficulty: 'Advanced',
    category: 'Full-Stack'
  },
  {
    id: 'quick-start',
    name: 'Quick Start',
    description: 'Essential skills to get started quickly',
    nodes: ['html', 'css', 'js'],
    estimatedWeeks: 6,
    difficulty: 'Beginner',
    category: 'Basics'
  }
];

// 模擬 API 請求
export const fetchPathOptions = async (): Promise<PathOption[]> => {
  console.log('Fetching path options...');
  await new Promise(resolve => setTimeout(resolve, 300));
  return pathOptions;
};