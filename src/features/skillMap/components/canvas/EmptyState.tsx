import { Target } from 'lucide-react';

interface EmptyStateProps {
  onAddNode: () => void;
}

export const EmptyState = ({ onAddNode }: EmptyStateProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Target className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Create Your Learning Path
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Start by adding your first skill node. You can then create connections to build your personalized learning journey.
        </p>
        <button
          onClick={onAddNode}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Add Your First Skill
        </button>
      </div>
    </div>
  );
};
