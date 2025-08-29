import React from 'react';
import { Route, TrendingUp } from 'lucide-react';

type ViewMode = 'tree' | 'timeline';

interface PathControlPanelProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  children?: React.ReactNode; // 用於傳入 RecommendedSteps 元件
}

export const PathControlPanel = ({ viewMode, setViewMode, children }: PathControlPanelProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2 sm:mb-0">Learning Path Visualizer</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('tree')}
            className={`px-3 py-1 rounded-md text-sm transition-colors flex items-center ${
              viewMode === 'tree' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Route className="w-4 h-4 mr-1.5" />
            Path View
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-3 py-1 rounded-md text-sm transition-colors flex items-center ${
              viewMode === 'timeline' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="w-4 h-4 mr-1.5" />
            Timeline
          </button>
        </div>
      </div>

      {/* 這裡會渲染傳入的 RecommendedSteps 元件 */}
      {children}
    </div>
  );
};