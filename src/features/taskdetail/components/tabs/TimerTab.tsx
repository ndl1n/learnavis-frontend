import {
  CheckCircle2,
  Save,
  Star,
  Play,
  Pause,
  StopCircle,
  Zap,
  AlertCircle,
} from 'lucide-react';
import { formatTime } from '../../utils';
import type { TaskData, StudyTimer } from '../../types';

interface TimerTabProps {
  taskData: TaskData;
  studyTimer: StudyTimer;
  onTimerAction: (action: 'toggle' | 'reset' | 'save', notes?: string) => void;
}

export const TimerTab = ({ taskData, studyTimer, onTimerAction }: TimerTabProps) => {
  return (
    <div className="space-y-6">
        {/* Timer Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Timer</h2>
        
        <div className="text-center mb-8">
            <div className="text-6xl font-mono font-bold text-gray-900 mb-4">
            {formatTime(studyTimer.elapsed)}
            </div>
            <div className="flex items-center justify-center space-x-4">
            <button
                // onClick={() => onTimerAction(prev => ({ ...prev, active: !prev.active }))}
                onClick={() => onTimerAction('toggle')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg ${
                studyTimer.active
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                }`}
            >
                {studyTimer.active ? (
                <>
                    <Pause className="w-5 h-5" />
                    <span>Pause</span>
                </>
                ) : (
                <>
                    <Play className="w-5 h-5" />
                    <span>Start</span>
                </>
                )}
            </button>
            
            <button
                // onClick={() => onTimerAction({ active: false, elapsed: 0 })}
                onClick={() => onTimerAction('reset')}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg"
            >
                <StopCircle className="w-5 h-5" />
                <span>Reset</span>
            </button>
            </div>
        </div>

        {/* Timer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
            <div className="text-2xl font-bold text-gray-900">
                {Math.floor(studyTimer.elapsed / 3600)}h {Math.floor((studyTimer.elapsed % 3600) / 60)}m
            </div>
            <div className="text-sm text-gray-600">Current Session</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="text-2xl font-bold text-gray-900">{taskData.completedHours}h</div>
            <div className="text-sm text-gray-600">Total Time</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <div className="text-2xl font-bold text-gray-900">{taskData.studySessions.length}</div>
            <div className="text-sm text-gray-600">Sessions</div>
            </div>
        </div>

        {/* Session Save */}
        {studyTimer.elapsed > 0 && !studyTimer.active && (
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
            <h4 className="font-semibold text-gray-900 mb-3">Save this study session</h4>
            <div className="space-y-4">
                <textarea
                placeholder="What did you accomplish in this session?"
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                rows={3}
                />
                <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                    Session Duration: {formatTime(studyTimer.elapsed)}
                </span>
                <button
                    onClick={() => {
                    // Here you would save the session
                    console.log('Saving session:', { duration: studyTimer.elapsed });
                    // onTimerAction({ active: false, elapsed: 0 });
                    onTimerAction('save', taskData.notes);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md"
                >
                    <Save className="w-4 h-4" />
                    <span>Save Session</span>
                </button>
                </div>
            </div>
            </div>
        )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
                <div className="font-medium text-gray-900">Focus Mode</div>
                <div className="text-sm text-gray-600">25min focused study session</div>
            </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:from-green-100 hover:to-emerald-100 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
                <div className="font-medium text-gray-900">Quick Review</div>
                <div className="text-sm text-gray-600">5min review session</div>
            </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
                <div className="font-medium text-gray-900">Practice Session</div>
                <div className="text-sm text-gray-600">Hands-on practice time</div>
            </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200 hover:from-orange-100 hover:to-red-100 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
                <div className="font-medium text-gray-900">Challenge Mode</div>
                <div className="text-sm text-gray-600">Test your knowledge</div>
            </div>
            </button>
        </div>
        </div>
    </div>
  );
};