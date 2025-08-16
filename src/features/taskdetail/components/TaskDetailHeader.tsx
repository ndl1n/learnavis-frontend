import { ArrowLeft, Calendar, Clock, Edit3, X, Save, RefreshCw } from 'lucide-react';
import type { TaskData } from '../types';
import { getPriorityColor, getStatusColor } from '../utils';

interface TaskDetailHeaderProps {
  taskData: TaskData;
  onBack: () => void;
  isEditing: boolean;
  onToggleEdit: () => void;
  hasChanges: boolean;
  onSave: () => void;
  isSaving: boolean;
}

export const TaskDetailHeader = ({ taskData, onBack, isEditing, onToggleEdit, hasChanges, onSave, isSaving }: TaskDetailHeaderProps) => (
  <header className="bg-white/80 backdrop-blur-md border-b border-white/30 sticky top-0 z-40 shadow-sm">
    <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-4">
            <button 
            onClick={onBack}
            className="p-2 hover:bg-white/50 rounded-xl transition-all duration-300 hover:shadow-md"
            >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getPriorityColor(taskData.priority)}`}></div>
            <div>
                <h1 className="text-xl font-bold text-gray-900">{taskData.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(taskData.status)}`}>
                    {taskData.status.replace('_', ' ').toUpperCase()}
                </span>
                <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Due {taskData.dueDate}
                </span>
                <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {taskData.completedHours}h / {taskData.estimatedHours}h
                </span>
                </div>
            </div>
            </div>
        </div>

        <div className="flex items-center space-x-3">
            {hasChanges && (
            <button
                onClick={onSave}
                disabled={isSaving}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
            >
                {isSaving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                <Save className="w-4 h-4" />
                )}
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
            )}
            
            <button
            onClick={onToggleEdit}
            className={`p-2 rounded-xl transition-all duration-300 ${
                isEditing 
                ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' 
                : 'hover:bg-white/50 text-gray-600'
            }`}
            >
            {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
            </button>
        </div>
        </div>
    </div>
  </header>
);