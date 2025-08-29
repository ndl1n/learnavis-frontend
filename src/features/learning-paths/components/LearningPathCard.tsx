import { ChevronRight, CheckCircle, Clock, Lock, BookOpen } from 'lucide-react';
import type { PathOption, SkillNode, SkillNodeStatus, SkillDifficulty } from '../types';

interface LearningPathCardProps {
  path: PathOption;
  allNodes: SkillNode[];
  selectedPath: string[];
  onNodeClick: (node: SkillNode) => void;
  onPathSelect: (nodeIds: string[]) => void;
}

// 將輔助函式放在元件內部或獨立的 utils 檔案中
const getStatusIcon = (status: SkillNodeStatus) => {
  switch (status) {
    case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'in-progress': return <Clock className="w-5 h-5 text-blue-500" />;
    case 'locked': return <Lock className="w-5 h-5 text-red-500" />;
    default: return <BookOpen className="w-5 h-5 text-gray-500" />;
  }
};

const getDifficultyColor = (difficulty: SkillDifficulty | string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-100 text-green-700 border-green-300';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    case 'Advanced': return 'bg-red-100 text-red-700 border-red-300';
    default: return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

export const LearningPathCard = ({ path, allNodes, selectedPath, onNodeClick, onPathSelect }: LearningPathCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all hover:shadow-xl">
      <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{path.name}</h3>
            <p className="text-gray-300 text-sm">{path.description}</p>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <div className="text-sm text-gray-300">Est. Time</div>
            <div className="text-lg font-semibold">{path.estimatedWeeks}w</div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(path.difficulty)} bg-white/10 text-white border-white/20`}>
            {path.difficulty}
          </span>
          <button
            onClick={() => onPathSelect(path.nodes)}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-1 rounded-full text-sm font-medium transition-colors"
          >
            Select Path
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center overflow-x-auto space-x-5 pb-2 pt-2 pl-2 pr-2">
          {path.nodes.map((nodeId, index) => {
            const node = allNodes.find(n => n.id === nodeId);
            if (!node) return null;

            const isSelected = selectedPath.includes(nodeId);
            const isCompleted = node.data.status === 'completed';
            const isPreviousCompleted = index === 0 || allNodes.find(n => n.id === path.nodes[index - 1])?.data.status === 'completed';
            const isActive = isCompleted || isPreviousCompleted;

            return (
              <div key={nodeId} className="flex items-center flex-shrink-0">
                <div
                  className={`relative p-3 rounded-xl border-2 cursor-pointer transition-all min-w-[150px] ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                      : isActive
                        ? 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-md'
                        : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => isActive && onNodeClick(node)}
                >
                  <div className="flex items-center justify-between mb-2">
                    {getStatusIcon(node.data.status)}
                    <span className="text-xs text-gray-500">{node.data.estimatedHours}h</span>
                  </div>
                  {/* <h4 className="font-semibold text-sm text-gray-900 mb-1 truncate">{node.data.name}</h4>
                  <div className="text-xs text-gray-600 capitalize">{node.data.category}</div> */}
                  <h4 className="font-medium text-sm text-gray-900 mb-1">{node.data.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">{node.data.category}</span>
                        {node.data.progress && node.data.progress > 0 && (
                          <div className="flex items-center">
                            <div className="w-8 bg-gray-200 rounded-full h-1 mr-1">
                              <div
                                className="bg-blue-500 h-1 rounded-full"
                                style={{ width: `${node.data.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-blue-600">{node.data.progress}%</span>
                          </div>
                        )}
                      </div>
                </div>
                {index < path.nodes.length - 1 && (
                  <ChevronRight className="w-6 h-6 text-gray-300 mx-2 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};