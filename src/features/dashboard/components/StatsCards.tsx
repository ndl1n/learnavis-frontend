import { CheckCircle, Clock, Star, TrendingUp } from 'lucide-react';
import type { User } from '../types';

interface StatsCardsProps {
  user: User;
}

export const StatsCards = ({ user }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Skills Mastered Card */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Skills Mastered</p>
                <p className="text-3xl font-bold text-gray-900">{user.completedSkills}</p>
                <p className="text-sm text-gray-500">of {user.totalSkills} total</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">This Week</p>
                <p className="text-3xl font-bold text-gray-900">{user.weeklyHours}h</p>
                <p className="text-sm text-green-600">+2h from last week</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Learning Streak</p>
                <p className="text-3xl font-bold text-gray-900">{user.streak}</p>
                <p className="text-sm text-orange-600">days in a row</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Overall Progress</p>
                <p className="text-3xl font-bold text-gray-900">68%</p>
                <p className="text-sm text-blue-600">+12% this month</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
    </div>
  );
};