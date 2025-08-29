import { Zap, Target } from 'lucide-react';
import type { SkillNode } from '../types';

interface RecommendedStepsProps {
  recommendedNodes: SkillNode[];
  onNodeClick: (node: SkillNode) => void;
}

export const RecommendedSteps = ({ recommendedNodes, onNodeClick }: RecommendedStepsProps) => {
  if (recommendedNodes.length === 0) {
    return null;
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center mb-3">
        <Zap className="w-5 h-5 text-green-600 mr-2" />
        <h3 className="font-medium text-green-800">Recommended Next Steps</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {recommendedNodes.map(node => (
          <div
            key={node.id}
            className="bg-white border border-green-300 rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNodeClick(node)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm text-gray-900">{node.data.name}</h4>
              <Target className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-xs text-gray-600">
              {node.data.estimatedHours}h • {node.data.difficulty}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};