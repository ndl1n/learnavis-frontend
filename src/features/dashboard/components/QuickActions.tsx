import { BookOpen, Plus, Map } from 'lucide-react';

export const QuickActions = () => {
    return (
        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 group">
              <div className="p-2 bg-blue-100 group-hover:bg-blue-200 rounded-lg transition-colors">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Start Learning</div>
                <div className="text-sm text-gray-600">Jump into your next task</div>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-300 group">
              <div className="p-2 bg-purple-100 group-hover:bg-purple-200 rounded-lg transition-colors">
                <Map className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">View Skill Map</div>
                <div className="text-sm text-gray-600">Explore your learning path</div>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50/50 transition-all duration-300 group">
              <div className="p-2 bg-green-100 group-hover:bg-green-200 rounded-lg transition-colors">
                <Plus className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Create New Plan</div>
                <div className="text-sm text-gray-600">Start a new learning journey</div>
              </div>
            </button>
          </div>
        </div>
    )
}