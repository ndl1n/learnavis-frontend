export interface User {
  name: string;
  avatar: string;
  completedSkills: number;
  totalSkills: number;
  weeklyHours: number;
  streak: number;
}

export interface NextTask {
  id: number;
  skill: string;
  duration: string;
  scheduledTime: string;
  difficulty: "Easy" | "Medium" | "Hard"; // 使用聯合型別更精準
  progress: number;
}

export interface LearningPlan {
  id: number;
  name: string;
  progress: number;
  totalSkills: number;
  completedSkills: number;
  dueDate: string;
  color: string;
}

export interface WeeklyProgress {
  day: string;
  hours: number;
}

// 包含所有儀表板資料的型別
export interface DashboardData {
    user: User;
    nextTask: NextTask;
    recentPlans: LearningPlan[];
    weeklyProgress: WeeklyProgress[];
}