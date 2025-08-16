import { Target, FileText, TrendingUp, Timer } from 'lucide-react';
import type { TaskData, TabId, Tab } from '../types';

interface TaskDetailSidebarProps {
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  taskData: TaskData;
}

const tabs: Tab[] = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'timer', label: 'Study Timer', icon: Timer }
];

export const TaskDetailSidebar = ({ activeTab, onTabChange, taskData }: TaskDetailSidebarProps) => (
  <div className="w-64 p-6">
    <nav className="space-y-2">
        {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
            <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-white/50 hover:shadow-sm'
                }`}
            >
                <Icon/>
                {/* <Icon className="w-5 h-5" /> */}
                <span className="font-medium">{tab.label}</span>
            </button>
            );
        })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 space-y-4">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Progress</h3>
            <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span className="font-semibold">{taskData.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${taskData.progress}%` }}
                ></div>
            </div>
            </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Subtasks</h3>
            <div className="text-2xl font-bold text-gray-900">
            {taskData.subtasks.filter(st => st.completed).length}/{taskData.subtasks.length}
            </div>
            <p className="text-xs text-gray-600">tasks completed</p>
        </div>
        </div>
  </div>
);