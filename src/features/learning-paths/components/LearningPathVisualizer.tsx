import { useState, useEffect } from 'react';
import type { SkillNode, PathOption } from '../types';
import { fetchPathOptions } from '../services/pathService';
import { useRecommendedSkills } from '../hooks/useRecommendedSkills';

// Import the new components
import { LearningStats } from './LearningStats';
import { RecommendedSteps } from './RecommendedSteps';
import { PathControlPanel } from './PathControlPanel';
import { LearningPathCard } from './LearningPathCard';
import { PathTimelineView } from './PathTimelineView';


interface LearningPathVisualizerProps {
  nodes: SkillNode[];
  onNodeClick: (node: SkillNode) => void;
}

export const LearningPathVisualizer = ({ nodes, onNodeClick }: LearningPathVisualizerProps) => {
  const [viewMode, setViewMode] = useState<'tree' | 'timeline'>('tree');
  const [pathOptions, setPathOptions] = useState<PathOption[]>([]);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  
  // Custom hook for business logic
  const recommendedNext = useRecommendedSkills(nodes);

  // Fetch static data from service
  useEffect(() => {
    const loadPaths = async () => {
      const paths = await fetchPathOptions();
      setPathOptions(paths);
      // Optionally select the first path by default
      if (paths.length > 0) {
        setSelectedPath(paths[0].nodes);
      }
    };
    loadPaths();
  }, []);

  const handlePathSelect = (nodeIds: string[]) => {
    setSelectedPath(nodeIds);
  };
  
  const TreeView = () => (
    <div className="space-y-6">
      {pathOptions.map(path => (
        <LearningPathCard
          key={path.id}
          path={path}
          allNodes={nodes}
          selectedPath={selectedPath}
          onNodeClick={onNodeClick}
          onPathSelect={handlePathSelect}
        />
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <PathControlPanel 
        viewMode={viewMode} 
        setViewMode={setViewMode}
      >
        <RecommendedSteps 
            recommendedNodes={recommendedNext} 
            onNodeClick={onNodeClick} 
        />
      </PathControlPanel>
      
      <div className="space-y-6 mt-6">
        {viewMode === 'tree' && <TreeView />}
        {viewMode === 'timeline' && <PathTimelineView nodes={nodes} onNodeClick={onNodeClick} />}
      </div>

      <LearningStats nodes={nodes} />
    </div>
  );
};