import { Plus, Map, Calendar, ChevronRight } from 'lucide-react';
import type { LearningPlan } from '../types';

interface LearningPlansProps {
  plans: LearningPlan[];
}

export const LearningPlans = ({ plans }: LearningPlansProps) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Your Learning Plans</h3>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300">
          <Plus className="w-4 h-4" />
          <span>New Plan</span>
        </button>
      </div>
      <div className="space-y-4">
        {plans.map((plan) => (
          <div key={plan.id} className="group p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${plan.color}`}></div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {plan.name}
                    </h4>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span>{plan.completedSkills}/{plan.totalSkills} skills</span>
                    <span>Due: {new Date(plan.dueDate).toLocaleDateString()}</span>
                </div>
                
                <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{plan.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        className={`bg-gradient-to-r ${plan.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${plan.progress}%` }}
                    ></div>
                    </div>
                </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Map className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Calendar className="w-4 h-4 text-gray-600" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
            </div>
            </div>
        ))}
      </div>
    </div>
  );
};