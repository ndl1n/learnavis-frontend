import { Edit, Eye, Plus, Save, Copy, Download, Upload, RefreshCw } from 'lucide-react';
import type { ViewMode, PlanStatistics } from '../../types';

interface SkillMapSidebarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddNode: () => void;
  onSave: () => void;
  hasChanges: boolean;
  isSaving: boolean;
  plan: PlanStatistics;
}

export const SkillMapSidebar = ({ viewMode, onViewModeChange, onAddNode, onSave, hasChanges, isSaving, plan }: SkillMapSidebarProps) => (
    <div className="w-80 bg-white/70 backdrop-blur-sm border-r border-white/20 flex flex-col">
    {/* Mode Toggle */}
    <div className="p-4 border-b border-white/20">
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button onClick={() => onViewModeChange('edit')} className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-300 ${viewMode === 'edit' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}><Edit className="w-4 h-4 inline mr-2" />Edit Mode</button>
        <button onClick={() => onViewModeChange('view')} className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-300 ${viewMode === 'view' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}><Eye className="w-4 h-4 inline mr-2" />View Only</button>
      </div>
    </div>

    {/* Actions */}
    <div className="p-4 space-y-3">
        {viewMode === 'edit' && <button onClick={onAddNode} className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg"><Plus className="w-5 h-5" /><span>Add New Skill</span></button>}
        <div className="grid grid-cols-2 gap-2">
            <button onClick={onSave} disabled={isSaving || !hasChanges} className="flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm border border-white/30 py-2 px-3 rounded-lg text-sm font-medium hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">{isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}<span>Save</span></button>
            <button className="flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm border border-white/30 py-2 px-3 rounded-lg text-sm font-medium hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"><Copy className="w-4 h-4" /><span>Clone</span></button>
            <button className="flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm border border-white/30 py-2 px-3 rounded-lg text-sm font-medium hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"><Download className="w-4 h-4" /><span>Export</span></button>
            <button className="flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm border border-white/30 py-2 px-3 rounded-lg text-sm font-medium hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"><Upload className="w-4 h-4" /><span>Import</span></button>
        </div>
    </div>

    {/* Legend */}
    <div className="p-4 border-t border-white/20">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Status Legend</h3>
        <div className="space-y-3">
            <div className="flex items-center space-x-3"><div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div><span className="text-sm text-gray-600">Completed</span></div>
            <div className="flex items-center space-x-3"><div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div><span className="text-sm text-gray-600">In Progress</span></div>
            <div className="flex items-center space-x-3"><div className="w-4 h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"></div><span className="text-sm text-gray-600">Not Started</span></div>
            <div className="flex items-center space-x-3"><div className="w-4 h-4 bg-gradient-to-r from-red-400 to-pink-400 rounded-full"></div><span className="text-sm text-gray-600">Locked</span></div>
        </div>
    </div>

    {/* Quick Stats */}
    <div className="flex-1 p-4 border-t border-white/20">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Progress Overview</h3>
        <div className="space-y-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex justify-between items-center mb-2"><span className="text-sm text-gray-600">Overall Progress</span><span className="text-sm font-semibold text-gray-900">{Math.round((plan.completedHours / plan.totalHours) * 100)}%</span></div>
                <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full transition-all duration-500" style={{ width: `${(plan.completedHours / plan.totalHours) * 100}%` }}></div></div>
                <div className="flex justify-between text-xs text-gray-500 mt-1"><span>{plan.completedHours}h</span><span>{plan.totalHours}h</span></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20"><div className="text-lg font-bold text-green-600">{plan.completedNodes}</div><div className="text-xs text-gray-600">Completed</div></div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20"><div className="text-lg font-bold text-blue-600">{plan.inProgressNodes}</div><div className="text-xs text-gray-600">In Progress</div></div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20"><div className="text-lg font-bold text-gray-600">{plan.totalNodes - plan.completedNodes - plan.inProgressNodes}</div><div className="text-xs text-gray-600">Remaining</div></div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20"><div className="text-lg font-bold text-purple-600">{plan.totalNodes}</div><div className="text-xs text-gray-600">Total Skills</div></div>
            </div>
        </div>
    </div>
</div>
);