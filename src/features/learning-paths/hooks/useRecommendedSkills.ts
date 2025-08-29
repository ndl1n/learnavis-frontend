import { useMemo } from 'react';
import type { SkillNode } from '../types';

export const useRecommendedSkills = (nodes: SkillNode[]) => {
  const recommendedNext = useMemo(() => {
    const completedNodes = nodes.filter(node => node.data.status === 'completed');
    const availableNodes = nodes.filter(node => {
      if (node.data.status === 'completed' || node.data.status === 'locked') return false;
      if (!node.data.prerequisites || node.data.prerequisites.length === 0) return true;
      
      // 檢查是否所有前置條件都已完成
      return node.data.prerequisites.every(prereq =>
        completedNodes.some(completed => completed.data.name === prereq)
      );
    });

    return availableNodes.slice(0, 3); // 返回前3個推薦技能
  }, [nodes]);

  return recommendedNext;
};