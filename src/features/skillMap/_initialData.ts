import type { SkillNode, SkillEdge } from './types';

export const initialNodes: SkillNode[] = [
    { id: '1', type: 'skill', position: { x: 250, y: 100 }, data: { name: 'HTML Fundamentals', status: 'completed', estimatedHours: 20, difficulty: 'Beginner', progress: 100, description: 'Learn the basics of HTML structure and semantics', prerequisites: [], resources: ['MDN Web Docs', 'freeCodeCamp'], category: 'Frontend' } },
    { id: '2', type: 'skill', position: { x: 250, y: 280 }, data: { name: 'CSS Styling', status: 'completed', estimatedHours: 30, difficulty: 'Beginner', progress: 100, description: 'Master CSS for styling and layout', prerequisites: ['1'], resources: ['CSS Tricks', 'Flexbox Froggy'], category: 'Frontend' } },
    { id: '3', type: 'skill', position: { x: 480, y: 190 }, data: { name: 'JavaScript Basics', status: 'in-progress', estimatedHours: 40, difficulty: 'Intermediate', progress: 65, description: 'Learn JavaScript fundamentals and DOM manipulation', prerequisites: ['1'], resources: ['JavaScript.info', 'Eloquent JavaScript'], category: 'Programming' } },
    { id: '4', type: 'skill', position: { x: 720, y: 120 }, data: { name: 'React Fundamentals', status: 'not-started', estimatedHours: 50, difficulty: 'Intermediate', progress: 0, description: 'Build interactive UIs with React', prerequisites: ['3'], resources: ['React Documentation', 'React Tutorial'], category: 'Framework' } },
    { id: '5', type: 'skill', position: { x: 720, y: 280 }, data: { name: 'Node.js Backend', status: 'locked', estimatedHours: 60, difficulty: 'Advanced', progress: 0, description: 'Server-side JavaScript with Node.js', prerequisites: ['3'], resources: ['Node.js Docs', 'Express.js Guide'], category: 'Backend' } },
    { id: '6', type: 'skill', position: { x: 960, y: 200 }, data: { name: 'Full-Stack Project', status: 'locked', estimatedHours: 80, difficulty: 'Advanced', progress: 0, description: 'Build a complete web application', prerequisites: ['4', '5'], resources: ['Project Ideas', 'Best Practices'], category: 'Project' } },
];

export const initialEdges: SkillEdge[] = [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
    { id: 'e1-3', source: '1', target: '3', type: 'smoothstep' },
    { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' },
    { id: 'e3-4', source: '3', target: '4', type: 'smoothstep' },
    { id: 'e3-5', source: '3', target: '5', type: 'smoothstep' },
    { id: 'e4-6', source: '4', target: '6', type: 'smoothstep' },
    { id: 'e5-6', source: '5', target: '6', type: 'smoothstep' },
];