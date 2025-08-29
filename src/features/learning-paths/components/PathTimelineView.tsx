import { CheckCircle, Clock, Lock, BookOpen } from 'lucide-react';
import type { SkillNode, SkillNodeStatus, SkillDifficulty } from '../types';

interface PathTimelineViewProps {
  nodes: SkillNode[];
  onNodeClick: (node: SkillNode) => void;
}

const getStatusIcon = (status: SkillNodeStatus) => {
  switch (status) {
    case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'in-progress': return <Clock className="w-5 h-5 text-blue-500" />;
    case 'locked': return <Lock className="w-5 h-5 text-red-500" />;
    default: return <BookOpen className="w-5 h-5 text-gray-500" />;
  }
};

const getDifficultyColor = (difficulty: SkillDifficulty) => {
    switch (difficulty) {
        case 'Beginner': return 'bg-green-100 text-green-700 border-green-300';
        case 'Intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
        case 'Advanced': return 'bg-red-100 text-red-700 border-red-300';
        default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
};

export const PathTimelineView = ({ nodes, onNodeClick }: PathTimelineViewProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* The timeline bar */}
        <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-8">
          {nodes.map((node) => (
            <div key={node.id} className="relative flex items-start">
              {/* Timeline node circle */}
              <div className="absolute left-3 top-2.5 w-4 h-4 rounded-full border-4 bg-white z-10
                ${node.data.status === 'completed' ? 'border-green-500' : ''}
                ${node.data.status === 'in-progress' ? 'border-blue-500' : ''}
                ${node.data.status === 'not-started' ? 'border-gray-300' : ''}
                ${node.data.status === 'locked' ? 'border-red-300' : ''}
              "></div>

              {/* Skill card */}
              <div 
                className="ml-12 bg-white rounded-lg shadow-md border border-gray-200 p-4 flex-1 hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer"
                onClick={() => onNodeClick(node)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{node.data.name}</h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 mb-2">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        {node.data.estimatedHours}h
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(node.data.difficulty)}`}>
                        {node.data.difficulty}
                      </span>
                    </div>
                    {node.data.prerequisites && node.data.prerequisites.length > 0 && (
                      <div className="text-xs text-gray-500 mt-2">
                        <strong>Prerequisites:</strong> {node.data.prerequisites.join(', ')}
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {getStatusIcon(node.data.status)}
                  </div>
                </div>

                {/* Progress Bar */}
                {node.data.status === 'in-progress' && node.data.progress !== undefined && node.data.progress > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span className="font-medium">{node.data.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${node.data.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};