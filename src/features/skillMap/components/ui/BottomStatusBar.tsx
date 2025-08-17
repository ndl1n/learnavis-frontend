import { CheckCircle, Clock, BookOpen, BarChart3, Calendar, ArrowRight } from 'lucide-react';
import type { PlanStatistics } from '../../types';

interface BottomStatusBarProps {
  plan: PlanStatistics;
}

export const BottomStatusBar = ({ plan }: BottomStatusBarProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-md border-t border-white/20 px-6 py-3 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="font-medium">{plan.completedNodes}</span>
            <span>completed</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{plan.inProgressNodes}</span>
            <span>in progress</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <BookOpen className="w-4 h-4 text-gray-500" />
            <span className="font-medium">{plan.totalNodes - plan.completedNodes - plan.inProgressNodes}</span>
            <span>remaining</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <BarChart3 className="w-4 h-4 text-purple-500" />
            <span className="font-medium">{plan.completedHours}h</span>
            <span>/</span>
            <span>{plan.totalHours}h</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-white/30 py-2 px-4 rounded-lg text-sm font-medium hover:border-blue-300 hover:bg-blue-50 transition-all duration-300">
            <Calendar className="w-4 h-4" />
            <span>View Schedule</span>
          </button>
          
          <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg">
            <span>Generate Schedule</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};