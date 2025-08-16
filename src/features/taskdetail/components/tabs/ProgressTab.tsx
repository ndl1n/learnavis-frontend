import { BookOpen, Clock, Target, Award } from 'lucide-react';
import type { TaskData } from '../../types';

interface ProgressTabProps {
  taskData: TaskData;
}

export const ProgressTab = ({ taskData }: ProgressTabProps) => {
    return (
        <div className="space-y-6">
            {/* Progress Overview */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Progress Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{taskData.progress}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{taskData.completedHours}h</div>
                <div className="text-sm text-gray-600">Hours Completed</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                    {taskData.subtasks.filter(st => st.completed).length}
                </div>
                <div className="text-sm text-gray-600">Tasks Completed</div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Task Completion</span>
                <span className="text-lg font-bold text-blue-600">{taskData.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6">
                <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${taskData.progress}%` }}
                >
                    {taskData.progress > 20 && (
                    <span className="text-white text-xs font-medium">{taskData.progress}%</span>
                    )}
                </div>
                </div>
            </div>
            </div>

            {/* Study Sessions */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Study Sessions</h3>
            <div className="space-y-4">
                {taskData.studySessions.map((session, index) => (
                <div 
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20"
                >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{session.date}</span>
                        <span className="text-sm text-gray-600 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {session.duration}h
                        </span>
                    </div>
                    <p className="text-sm text-gray-700">{session.notes}</p>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>

    );
}