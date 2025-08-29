import { useState } from 'react';
import { LearningPathVisualizer } from '../features/learning-paths/components/LearningPathVisualizer';
import { SkillDetailPanel } from '../features/skillTree/components/SkillDetailPanel';
import { useSkills } from '../features/skillTree/hooks/useSkills';
import type { SkillNode } from '../features/skillTree/types';

const LearningPathPage = () => {
  const { nodes, isLoading, error } = useSkills();
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);

  const handleNodeClick = (node: SkillNode) => {
    setSelectedNode(node);
  };

  const handleClosePanel = () => {
    setSelectedNode(null);
  };

  if (isLoading) return <div className="flex items-center justify-center h-screen"><h1>Loading Learning Paths...</h1></div>;
  if (error) return <div className="flex items-center justify-center h-screen"><h1>{error}</h1></div>;

  return (
     <div className="relative w-full min-h-screen bg-gray-50 font-sans">
        <LearningPathVisualizer
            nodes={nodes}
            onNodeClick={handleNodeClick}
        />
        {selectedNode && (
            <SkillDetailPanel
              skill={selectedNode.data}
              onClose={handleClosePanel}
              onUpdateProgress={() => {}}
              viewMode="view"
              onEdit={()=>{}}
              onDelete={()=>{}}
              onStartLearning={()=>{}}
              onMarkComplete={()=>{}}
            />
        )}
     </div>
  );
};

export default LearningPathPage;