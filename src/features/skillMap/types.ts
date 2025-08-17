// 定義各種狀態的聯合型別，增加程式碼健壯性
export type SkillNodeStatus = 'completed' | 'in-progress' | 'not-started' | 'locked';
export type SkillDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type SkillCategory = 'Frontend' | 'Backend' | 'Programming' | 'Framework' | 'Project' | 'Design' | string;
export type ViewMode = 'edit' | 'view';

// 節點內部資料的結構
export interface SkillNodeData {
  name: string;
  status: SkillNodeStatus;
  estimatedHours: number;
  difficulty: SkillDifficulty;
  progress: number;
  description: string;
  prerequisites: string[];
  resources: string[];
  category: SkillCategory;
}

// 座標
export interface Position {
  x: number;
  y: number;
}

// 完整的節點物件結構
export interface SkillNode {
  id: string;
  type: 'skill';
  position: Position;
  data: SkillNodeData;
}

// 邊（連接線）的物件結構
export interface SkillEdge {
  id: string;
  source: string;
  target: string;
  type: 'smoothstep';
}

// 計畫統計資料的結構
export interface PlanStatistics {
  id: number;
  name: string;
  totalNodes: number;
  completedNodes: number;
  inProgressNodes: number;
  totalHours: number;
  completedHours: number;
}

// 用於新增節點的表單資料結構 (部分 SkillNodeData)
export type NewNodeFormData = Omit<SkillNodeData, 'status' | 'progress' | 'prerequisites' | 'resources'>;