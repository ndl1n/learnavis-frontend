import type { TaskData } from '../../types';
import { Clock, CheckSquare, Square } from 'lucide-react';
import { getPriorityColor } from '../../utils';

interface OverviewTabProps {
  taskData: TaskData;
  isEditing: boolean;
  onUpdate: <K extends keyof TaskData>(path: K, value: TaskData[K]) => void;
  onToggleSubtask: (subtaskId: number) => void;
}

export const OverviewTab = ({ taskData, isEditing, onUpdate, onToggleSubtask }: OverviewTabProps) => (
  <div className="space-y-6">
    {/* Task Info Card */}
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
    <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Task Overview</h2>
        <div className="flex items-center space-x-2">
        {taskData.tags.map((tag, index) => (
            <span 
            key={index}
            className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-medium"
            >
            #{tag}
            </span>
        ))}
        </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            {isEditing ? (
            <textarea
                value={taskData.description}
                onChange={(e) => onUpdate('description', e.target.value)}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                rows={3}
            />
            ) : (
            <p className="text-gray-700 p-4 bg-white/50 rounded-xl border border-white/20">
                {taskData.description}
            </p>
            )}
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            {isEditing ? (
                <select
                value={taskData.priority}
                onChange={(e) => onUpdate('priority', e.target.value as TaskData['priority'])}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                </select>
            ) : (
                <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getPriorityColor(taskData.priority)}`}></div>
                <span className="font-medium capitalize">{taskData.priority}</span>
                </div>
            )}
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            {isEditing ? (
                <input
                type="text"
                value={taskData.category}
                onChange={(e) => onUpdate('category', e.target.value)}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
            ) : (
                <span className="font-medium text-gray-700">{taskData.category}</span>
            )}
            </div>
        </div>
        </div>

        <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            {isEditing ? (
                <input
                type="date"
                value={taskData.dueDate}
                onChange={(e) => onUpdate('dueDate', e.target.value)}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
            ) : (
                <span className="font-medium text-gray-700">{taskData.dueDate}</span>
            )}
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
            {isEditing ? (
                <input
                type="number"
                value={taskData.estimatedHours}
                onChange={(e) => onUpdate('estimatedHours', parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
            ) : (
                <span className="font-medium text-gray-700">{taskData.estimatedHours}h</span>
            )}
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Time Progress</label>
            <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span>Completed: {taskData.completedHours}h</span>
                <span>Remaining: {taskData.estimatedHours - taskData.completedHours}h</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(taskData.completedHours / taskData.estimatedHours) * 100}%` }}
                ></div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>

    {/* Subtasks Card */}
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
    <h3 className="text-xl font-bold text-gray-900 mb-6">Subtasks</h3>
    <div className="space-y-3">
        {taskData.subtasks.map((subtask) => (
        <div 
            key={subtask.id}
            className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/70 transition-all duration-300"
        >
            <button
            onClick={() => onToggleSubtask(subtask.id)}
            className={`p-1 rounded-lg transition-all duration-300 ${
                subtask.completed 
                ? 'text-green-600 hover:bg-green-100' 
                : 'text-gray-400 hover:bg-gray-100'
            }`}
            >
            {subtask.completed ? (
                <CheckSquare className="w-5 h-5" />
            ) : (
                <Square className="w-5 h-5" />
            )}
            </button>
            <div className="flex-1">
            <div className={`font-medium ${
                subtask.completed ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}>
                {subtask.title}
            </div>
            </div>
            <div className="text-sm text-gray-600 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {subtask.timeSpent}
            </div>
        </div>
        ))}
    </div>
    </div>
  </div>
);