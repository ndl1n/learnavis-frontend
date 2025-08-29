import type { SkillNode } from '../types';

interface LearningStatsProps {
  nodes: SkillNode[];
}

export const LearningStats = ({ nodes }: LearningStatsProps) => {
  const completedCount = nodes.filter(n => n.data.status === 'completed').length;
  const inProgressCount = nodes.filter(n => n.data.status === 'in-progress').length;
  const totalHours = nodes.reduce((total, node) => total + node.data.estimatedHours, 0);
  const overallProgress = nodes.length > 0 ? Math.round((completedCount / nodes.length) * 100) : 0;

  return (
    <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{completedCount}</div>
          <div className="text-sm text-green-700">Completed</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{inProgressCount}</div>
          <div className="text-sm text-blue-700">In Progress</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{totalHours}</div>
          <div className="text-sm text-yellow-700">Total Hours</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{overallProgress}%</div>
          <div className="text-sm text-purple-700">Progress</div>
        </div>
      </div>
    </div>
  );
};