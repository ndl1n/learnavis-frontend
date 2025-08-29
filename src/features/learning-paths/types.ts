export interface PathOption {
  id: string;
  name: string;
  description: string;
  nodes: string[];
  estimatedWeeks: number;
  difficulty: SkillDifficulty;
  category: string;
}

export type SkillNodeStatus = 'completed' | 'in-progress' | 'not-started' | 'locked';
export type SkillDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type SkillCategory = 'Frontend' | 'Backend' | 'Programming' | 'Framework' | 'Project' | 'Design';
export type ResourceType = 'video' | 'article' | 'course' | 'exercise';

export interface Position {
  x: number;
  y: number;
}

export interface SkillResource {
  title: string;
  url: string;
  type: ResourceType;
  duration?: string;
  difficulty?: SkillDifficulty;
  provider?: string;
}

export interface SkillNodeData {
  id: string;
  name: string;
  description?: string;
  status: SkillNodeStatus;
  difficulty: SkillDifficulty;
  category: SkillCategory;
  estimatedHours: number;
  progress?: number;
  resources?: SkillResource[];
  prerequisites?: string[];
  learningPath?: string[];
  masteryLevel?: number;
  tags?: string[];
  completedDate?: string;
  startedDate?: string;
  notes?: string;
}

export interface SkillNode {
  id: string;
  data: SkillNodeData;
  position: Position;
}

export interface SkillEdge {
  id: string;
  source: string;
  target: string;
  type?: 'prerequisite' | 'recommended' | 'related';
}