import { Target, Sparkles, TrendingUp, Map } from 'lucide-react';

export const AuthBranding = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700"></div>
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      
      <div className="relative z-10 flex flex-col justify-start items-start w-full h-full p-16 pt-16 text-white">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3 mb-20">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
            <Target className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold ml-2">LearnAvis</h1>
        </div>
        
        {/* Features */}
        <div className="space-y-8 max-w-md">
          <div>
            <h2 className="text-3xl font-bold mb-4">Master Your Learning Journey</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Visualize your skills, optimize your learning path, and track your progress with AI-powered insights.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0"><Map className="w-5 h-5" /></div>
              <div>
                <h3 className="font-semibold">Interactive Skill Maps</h3>
                <p className="text-blue-100 text-sm">Visualize dependencies and learning paths</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0"><Sparkles className="w-5 h-5" /></div>
              <div>
                <h3 className="font-semibold">AI-Optimized Scheduling</h3>
                <p className="text-blue-100 text-sm">Smart algorithms for maximum efficiency</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0"><TrendingUp className="w-5 h-5" /></div>
              <div>
                <h3 className="font-semibold">Progress Analytics</h3>
                <p className="text-blue-100 text-sm">Track your growth with detailed insights</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-3 gap-8 w-full max-w-md">
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">10K+</div>
            <div className="text-blue-200 text-sm">Active Learners</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">50K+</div>
            <div className="text-blue-200 text-sm">Skills Mastered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">95%</div>
            <div className="text-blue-200 text-sm">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};