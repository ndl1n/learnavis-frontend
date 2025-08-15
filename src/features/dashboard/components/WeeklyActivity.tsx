import { BarChart3 } from 'lucide-react';
import type { WeeklyProgress } from '../types';

export const WeeklyActivity = ({ progress }: { progress: WeeklyProgress[] }) => {
    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20">
            <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">This Week's Activity</h3>
            <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                <BarChart3 className="w-4 h-4" />
                <span>View Details</span>
            </button>
            </div>

            <div className="flex items-end justify-between h-32 space-x-2">
            {progress.map((day, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                <div className="w-full bg-gray-200 rounded-t-lg relative h-24 flex items-end">
                    <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(day.hours / 4) * 100}%` }}
                    ></div>
                </div>
                <div className="text-center">
                    <div className="text-xs font-medium text-gray-900">{day.hours}h</div>
                    <div className="text-xs text-gray-500">{day.day}</div>
                </div>
                </div>
            ))}
            </div>
        </div>
    )
}

