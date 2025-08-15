import { useState } from 'react';
import type { DashboardData } from '../types';

// 未來可以將這裡的 useState 換成 API 請求 (如 SWR, React Query)
export const useDashboardData = (): { data: DashboardData | null, isLoading: boolean } => {
  const [data] = useState<DashboardData>({
    user: {
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      completedSkills: 12,
      totalSkills: 28,
      weeklyHours: 15,
      streak: 7
    },
    nextTask: {
      id: 1,
      skill: "React Hooks",
      duration: "2 hours",
      scheduledTime: "Today, 2:00 PM",
      difficulty: "Medium",
      progress: 65
    },
    recentPlans: [
      {
        id: 1,
        name: "Frontend Development Master",
        progress: 68,
        totalSkills: 15,
        completedSkills: 10,
        dueDate: "2024-12-15",
        color: "from-blue-500 to-cyan-400"
      },
      {
        id: 2,
        name: "UI/UX Design Fundamentals",
        progress: 45,
        totalSkills: 12,
        completedSkills: 5,
        dueDate: "2024-11-30",
        color: "from-purple-500 to-pink-400"
      },
      {
        id: 3,
        name: "Data Science with Python",
        progress: 23,
        totalSkills: 20,
        completedSkills: 4,
        dueDate: "2025-01-20",
        color: "from-green-500 to-emerald-400"
      }
    ],
    weeklyProgress: [
      { day: 'Mon', hours: 2.5 },
      { day: 'Tue', hours: 3 },
      { day: 'Wed', hours: 1.5 },
      { day: 'Thu', hours: 4 },
      { day: 'Fri', hours: 2 },
      { day: 'Sat', hours: 1 },
      { day: 'Sun', hours: 1 }
    ],
  });

  // 模擬 API 載入狀態
  const [isLoading] = useState(false); 

  return { data, isLoading };
};