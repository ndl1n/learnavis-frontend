import { useState, useEffect } from 'react';
import type { SkillNode, SkillEdge } from '../types';
import { fetchSkills } from '../services/skillService';

export const useSkills = () => {
  const [nodes, setNodes] = useState<SkillNode[]>([]);
  const [edges, setEdges] = useState<SkillEdge[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { nodes, edges } = await fetchSkills();
        setNodes(nodes);
        setEdges(edges);
      } catch (err) {
        setError("Failed to fetch skill data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []); // 空依賴陣列確保只在 Hook 首次掛載時執行

  return { nodes, edges, isLoading, error, setNodes };
};