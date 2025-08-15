import { Play } from 'lucide-react';
import type { NextTask } from '../types';

export const NextTaskCard = ({ task }: { task: NextTask }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Up Next</h3>
        <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
          <Play className="w-4 h-4 text-blue-600" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{task.skill}</h4>
          <p className="text-sm text-gray-600">{task.scheduledTime}</p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Duration: {task.duration}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            task.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
            task.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {task.difficulty}
          </span>
        </div>

        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-sm hover:shadow-md">
          Continue Learning
        </button>
      </div>
    </div>
  );
};
