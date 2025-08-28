import type { SkillNode, SkillEdge } from '../types';

const mockNodes: SkillNode[] = [
  { id: 'html', data: { id: 'html', name: 'HTML Basics', category: 'Frontend', difficulty: 'Beginner', estimatedHours: 10, status: 'completed', progress: 100, masteryLevel: 95, description: 'Learn the fundamental structure of web pages.', tags: ['html', 'web'], startedDate: '2025-08-01', completedDate: '2025-08-05' }, position: { x: 50, y: 50 } },
  { id: 'css', data: { id: 'css', name: 'CSS Fundamentals', category: 'Frontend', difficulty: 'Beginner', estimatedHours: 15, status: 'in-progress', progress: 60, masteryLevel: 70, description: 'Style your web pages with modern CSS techniques.', tags: ['css', 'design'], prerequisites: ['HTML Basics'], startedDate: '2025-08-06' }, position: { x: 250, y: 50 } },
  { id: 'js', data: { id: 'js', name: 'JavaScript Essentials', category: 'Programming', difficulty: 'Intermediate', estimatedHours: 30, status: 'not-started', description: 'Bring interactivity to your websites.', tags: ['javascript', 'es6'], prerequisites: ['HTML Basics', 'CSS Fundamentals'] }, position: { x: 450, y: 50 } },
  { id: 'react', data: { id: 'react', name: 'React Framework', category: 'Framework', difficulty: 'Intermediate', estimatedHours: 40, status: 'locked', description: 'Build powerful single-page applications with React.', tags: ['react', 'spa'], prerequisites: ['JavaScript Essentials'] }, position: { x: 650, y: 50 } },
  { id: 'nodejs', data: { id: 'nodejs', name: 'Node.js & Express', category: 'Backend', difficulty: 'Advanced', estimatedHours: 35, status: 'not-started', description: 'Create robust server-side applications.', tags: ['nodejs', 'backend'], prerequisites: ['JavaScript Essentials'] }, position: { x: 450, y: 250 } },
  { id: 'project', data: { id: 'project', name: 'Full-Stack Project', category: 'Project', difficulty: 'Advanced', estimatedHours: 50, status: 'locked', description: 'Build a full-stack application to showcase your skills.', tags: ['portfolio', 'fullstack'], prerequisites: ['React Framework', 'Node.js & Express'] }, position: { x: 850, y: 50 } }
];

const mockEdges: SkillEdge[] = [
  { id: 'e1-2', source: 'html', target: 'css', type: 'prerequisite' },
  { id: 'e2-3', source: 'css', target: 'js', type: 'prerequisite' },
  { id: 'e3-4', source: 'js', target: 'react', type: 'prerequisite' },
  { id: 'e3-5', source: 'js', target: 'nodejs', type: 'recommended' },
  { id: 'e4-6', source: 'react', target: 'project', type: 'prerequisite' },
  { id: 'e5-6', source: 'nodejs', target: 'project', type: 'prerequisite' }
];

// 模擬一個非同步的 API 請求
export const fetchSkills = async (): Promise<{ nodes: SkillNode[]; edges: SkillEdge[] }> => {
  console.log('Fetching skills from API...');
  // 模擬網路延遲
  await new Promise(resolve => setTimeout(resolve, 500)); 
  // 實際情況下，這裡會是 fetch('/api/skills') 或使用 axios
  return {
    nodes: mockNodes,
    edges: mockEdges,
  };
};