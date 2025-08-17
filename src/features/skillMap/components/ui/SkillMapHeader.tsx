import { ArrowLeft, Save, Share, Settings, RefreshCw } from 'lucide-react';
import type { PlanStatistics } from '../../types';

interface SkillMapHeaderProps {
  plan: PlanStatistics;
  onBack: () => void;
  hasChanges: boolean;
  isSaving: boolean;
  onSave: () => void;
}

export const SkillMapHeader = ({ plan, onBack, hasChanges, isSaving, onSave }: SkillMapHeaderProps) => (
  <header className="bg-white/80 backdrop-blur-md border-b border-white/30 sticky top-0 z-40 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 hover:bg-white/50 rounded-xl transition-all duration-300 hover:shadow-md"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{plan.name}</h1>
            <p className="text-sm text-gray-600">{plan.completedNodes} of {plan.totalNodes} skills completed • {plan.completedHours}h / {plan.totalHours}h</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {hasChanges && (
            <button onClick={onSave} disabled={isSaving} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50">
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          )}
          <button className="p-2 hover:bg-white/50 rounded-xl transition-all duration-300 hover:shadow-md"><Share className="w-5 h-5 text-gray-600" /></button>
          <button className="p-2 hover:bg-white/50 rounded-xl transition-all duration-300 hover:shadow-md"><Settings className="w-5 h-5 text-gray-600" /></button>
        </div>
      </div>
    </div>
  </header>
);